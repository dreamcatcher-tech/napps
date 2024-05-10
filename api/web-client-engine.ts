import { pushable } from 'it-pushable'
import { EventSourceParserStream } from 'eventsource-parser/stream'
import { deserializeError } from 'serialize-error'
import {
  EngineInterface,
  freezePid,
  JSONSchemaType,
  JsonValue,
  Params,
  PID,
  PierceRequest,
  Splice,
} from './web-client.types.ts'

export class WebClientEngine implements EngineInterface {
  readonly #aborts = new Set<AbortController>()
  readonly #fetcher: (
    input: URL | RequestInfo,
    init?: RequestInit,
  ) => Promise<Response>
  readonly #homeAddress: PID
  readonly #schemas = new Map<string, JSONSchemaType<object>>()
  private constructor(url: string, fetcher: typeof fetch, homeAddress: PID) {
    if (url.endsWith('/')) {
      throw new Error('url should not end with "/": ' + url)
    }
    this.#fetcher = fetcher
    this.#homeAddress = homeAddress
  }
  static async start(url: string, fetcher?: typeof fetch) {
    if (!fetcher) {
      fetcher = (path, opts) => fetch(`${url}${path}`, opts)
    }
    // get the home address from the server
    const homeAddress = await request('homeAddress', {}, fetcher)
    freezePid(homeAddress)
    return new WebClientEngine(url, fetcher, homeAddress)
  }
  get homeAddress() {
    return this.#homeAddress
  }
  async createMachineSession(pid: PID) {
    // somehow need to get the home address out too
  }
  async provision() {
    return await this.#request('provision', {})
  }
  stop() {
    for (const abort of this.#aborts) {
      abort.abort()
    }
  }
  async ping(data?: JsonValue) {
    const payload: { data?: JsonValue } = { data }
    return await this.#request('ping', payload)
  }
  async pierce(pierce: PierceRequest) {
    await this.#request('pierce', pierce)
  }
  async apiSchema(isolate: string) {
    if (!isolate || typeof isolate !== 'string') {
      throw new Error('isolate string is required')
    }
    if (this.#schemas.has(isolate)) {
      return this.#schemas.get(isolate)
    }
    const result = await this.#request('apiSchema', { isolate })
    this.#schemas.set(isolate, result)
    return result
  }

  async transcribe(audio: File) {
    const formData = new FormData()
    formData.append('audio', audio)

    const response = await this.#fetcher(`/api/transcribe`, {
      method: 'POST',
      body: formData,
    })

    return await response.json()
  }

  // #region: Splice Reading
  read(pid: PID, path?: string, after?: string, signal?: AbortSignal) {
    const abort = new AbortController()
    this.#aborts.add(abort)
    if (signal) {
      signal.addEventListener('abort', () => {
        abort.abort()
      })
    }

    const source = pushable<Splice>({ objectMode: true })
    abort.signal.addEventListener('abort', () => source.return())

    const pipe = async () => {
      let lastSplice: Splice | undefined
      while (!abort.signal.aborted) {
        try {
          const response = await this.#fetcher(`/api/read`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pid,
              path,
              after: lastSplice?.oid || after,
            }),
            signal: abort.signal,
            keepalive: true,
          })
          if (!response.ok) {
            throw new Error('response not ok')
          }
          if (!response.body) {
            throw new Error('response body is missing')
          }
          const spliceStream = toEvents(response.body)
          for await (const value of toIterable(spliceStream, abort.signal)) {
            if (value.event === 'splice') {
              const splice: Splice = JSON.parse(value.data)
              lastSplice = splice
              source.push(splice)
            } else {
              console.error('unexpected event', value.event, value)
            }
          }
        } catch (error) {
          console.log('stream error:', error)
        }
        if (!abort.signal.aborted) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }
    }
    pipe().catch(source.throw)
    return source
  }
  async readJSON<T>(path: string, pid: PID) {
    const result = await this.#request('readJSON', { path, pid })
    return result as T
  }
  async exists(path: string, pid: PID) {
    const result = await this.#request('exists', { path, pid })
    return result as boolean
  }
  #request(path: string, params: Params) {
    return request(path, params, this.#fetcher)
  }
}
const request = async (path: string, params: Params, fetcher: typeof fetch) => {
  const response = await fetcher(`/api/${path}?pretty`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!response.ok) {
    await response.body?.cancel()
    const { status, statusText } = response
    const msg = `${path} ${JSON.stringify(params)} ${status} ${statusText}`
    throw new Error(msg)
  }
  const outcome = await response.json()
  if (outcome.error) {
    throw deserializeError(outcome.error)
  }
  return outcome.result
}
const toEvents = (stream: ReadableStream) =>
  stream.pipeThrough(new TextDecoderStream())
    .pipeThrough(new EventSourceParserStream())

async function* toIterable(stream: ReadableStream, signal: AbortSignal) {
  const reader = stream.getReader()
  signal.addEventListener('abort', () => reader.cancel())
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      yield value
    }
  } finally {
    reader.releaseLock()
  }
}