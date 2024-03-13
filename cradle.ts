import Compartment from './io/compartment.ts'
import git from '$git'
import {
  Cradle,
  DispatchFunctions,
  Params,
  PID,
  PierceRequest,
  Request,
} from './constants.ts'
import { pidFromRepo } from '@/keys.ts'
import { getProcType } from '@/constants.ts'
import { memfs } from 'https://esm.sh/memfs@4.6.0'
import IsolateApi from './isolate-api.ts'
import { assert } from 'std/assert/assert.ts'
import { Debug } from '@utils'
import { ulid } from 'std/ulid/mod.ts'
import Queue from './queue.ts'
import { C } from './isolates/artifact.ts'
import { transcribe } from '@/runners/runner-chat.ts'
import { ProcessOptions } from '@/constants.ts'
const log = Debug('AI:cradle')

export class QueueCradle implements Cradle {
  #compartment!: Compartment
  #api!: IsolateApi<C>
  #queue!: Queue
  static async create() {
    const cradle = new QueueCradle()
    cradle.#compartment = await Compartment.create('artifact')
    const { fs } = memfs()
    // TODO pass a dispatch function in so it can call out to other pids
    // TODO use a super PID as the cradle PID for all system actions
    cradle.#api = IsolateApi.createFS(fs)
    cradle.#api.context.self = cradle
    await cradle.#compartment.mount(cradle.#api)
    assert(cradle.#api.context.db, 'db not found')

    const functions = cradle.#compartment.functions(cradle.#api)
    assert(!functions.stop, 'stop is a reserved action')
    assert(!functions.dispatches, 'dispatches is a reserved action')
    cradle.#queue = Queue.create(functions, cradle.#api)
    return cradle
  }
  async stop() {
    await this.#compartment.unmount(this.#api)
    await this.#queue.quiesce()
  }
  async pierces(isolate: string, target: PID) {
    // cradle side, since functions cannot be returned from isolate calls
    const apiSchema = await this.apiSchema({ isolate })
    const pierces: DispatchFunctions = {}
    for (const functionName of Object.keys(apiSchema)) {
      pierces[functionName] = (
        params?: Params,
        options?: ProcessOptions,
      ) => {
        log('pierces %o', functionName)
        const proctype = getProcType(options)
        const pierce: PierceRequest = {
          target,
          ulid: ulid(),
          isolate,
          functionName,
          params: params || {},
          // TODO pass the process options straight thru ?
          proctype,
        }
        return this.pierce(pierce)
      }
    }
    log('dispatches:', isolate, Object.keys(pierces))
    return pierces
  }
  async ping(params?: Params) {
    params = params || {}
    type K = ReturnType<Cradle['ping']>
    const result = await this.#queue.push<K>('ping', params)
    return result
  }
  async probe(params: { repo: string }) {
    type K = ReturnType<Cradle['probe']>
    const result = await this.#queue.push<K>('probe', params)
    return result as { pid: PID; head: string } | void
  }
  async init(params: { repo: string }) {
    type K = ReturnType<Cradle['init']>
    const result = await this.#queue.push<K>('init', params)
    return result as { pid: PID; head: string }
  }
  async clone(params: { repo: string }) {
    type K = ReturnType<Cradle['clone']>
    const result = await this.#queue.push<K>('clone', params)
    assert(result, 'clone result not found')
    return result
  }
  async rm(params: { repo: string }) {
    type K = ReturnType<Cradle['rm']>
    const result = await this.#queue.push<K>('rm', params)
    return result
  }
  async apiSchema(params: { isolate: string }) {
    type K = ReturnType<Cradle['apiSchema']>
    const result = await this.#queue.push<K>('apiSchema', params)
    return result as Record<string, object>
  }
  async pierce(params: PierceRequest) {
    try {
      type K = ReturnType<Cradle['pierce']>
      return await this.#queue.push<K>('pierce', params)
    } catch (error) {
      throw error
    } finally {
      // if we are in test mode, quiesce the queue before returning
      if (this.#api.context.db!.isTestMode) {
        await this.#queue.quiesce()
      }
    }
  }
  async transcribe(params: { audio: File }) {
    const text = await transcribe(params.audio)
    return { text }
  }
  request(params: { request: Request; commit: string; prior?: number }) {
    const detach = true
    return this.#queue.push('request', params, detach)
  }
  branch(params: { branch: PID; commit: string }) {
    return this.#queue.push('branch', params)
  }
  async logs(params: { repo: string }) {
    log('logs', params.repo)
    const pid = pidFromRepo(params.repo)
    const fs = await this.#api.context.fs!.load(pid)
    const logs = await git.log({ fs, dir: '/' })
    return logs
  }
}

export default QueueCradle