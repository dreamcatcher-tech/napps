// THIS IS SYCNED FROM THE ARTIFACT PROJECT
// TODO publish to standalone repo
import {
  Cradle,
  DispatchFunctions,
  getProcType,
  Params,
  PID,
  PierceRequest,
  ProcessOptions,
} from './web-client.types.ts'

type toError = (object: object) => Error
export default class WebClient implements Cradle {
  private readonly fetcher: (
    input: URL | RequestInfo,
    init?: RequestInit,
  ) => Promise<Response>
  private readonly url: string
  private readonly toError: toError
  constructor(url: string, toError: toError, fetcher?: typeof fetch) {
    if (url.endsWith('/')) {
      throw new Error('url should not end with "/": ' + url)
    }
    this.url = url
    if (fetcher) {
      this.fetcher = fetcher
    } else {
      this.fetcher = (path, opts) => fetch(`${url}${path}`, opts)
    }
    this.toError = toError
  }
  ping(params = {}) {
    return this.request('ping', params)
  }
  apiSchema(params: { isolate: string }) {
    return this.request('apiSchema', params)
  }
  pierce(params: PierceRequest) {
    return this.request('pierce', params)
  }
  async transcribe(params: { audio: File }) {
    // this is a special one that uses a blob arg
    // if all used formdata, then we don't care the type of the args
    const response = await fetch(`${this.url}/api/transcribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    return await response.json()
  }
  logs(params: { repo: string }) {
    return this.request('logs', params)
  }
  async pierces(isolate: string, target: PID) {
    // cradle side, since functions cannot be returned from isolate calls
    const apiSchema = await this.apiSchema({ isolate })
    const pierces: DispatchFunctions = {}
    for (const functionName of Object.keys(apiSchema)) {
      pierces[functionName] = (
        params: Params = {},
        options?: ProcessOptions,
      ) => {
        const proctype = getProcType(options)
        const pierce: PierceRequest = {
          target,
          ulid: 'calculated-server-side',
          isolate,
          functionName,
          params,
          proctype,
        }
        return this.pierce(pierce)
      }
    }
    return pierces
  }
  probe(params: { repo: string }) {
    return this.request('probe', params)
  }
  init(params: { repo: string }) {
    return this.request('init', params)
  }
  clone(params: { repo: string }) {
    return this.request('clone', params)
  }
  rm(params: { repo: string }) {
    return this.request('rm', params)
  }
  stop() {
  }
  private async request(path: string, params: Params) {
    const response = await this.fetcher(`/api/${path}?pretty`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    if (!response.ok) {
      await response.body?.cancel()
      throw new Error(
        path + ' ' + JSON.stringify(params) + ' ' + response.status + ' ' +
          response.statusText,
      )
    }
    const outcome = await response.json()
    if (outcome.error) {
      throw this.toError(outcome.error)
    }
    return outcome.result
  }
}