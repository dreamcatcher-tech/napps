import { Debug } from '@utils'
import git from '$git'
import http from '$git/http/web'
import { memfs } from 'https://esm.sh/memfs@4.6.0'
import {
  ENTRY_BRANCH,
  InternalReply,
  InternalRequest,
  IsolateFunctions,
  IsolateLifecycle,
  Params,
  Request,
} from '@/artifact/constants.ts'
import IsolateApi from '../isolate-api.ts'
import Compartment from '../io/compartment.ts'
import IO from '@io/io.ts'
import DB from '../db.ts'
import FS from '../fs.ts'
import Cradle from '@/artifact/cradle.ts'
import { assert } from 'https://deno.land/std@0.203.0/assert/assert.ts'
import { Outcome } from '@/artifact/constants.ts'
import { serializeError } from 'https://esm.sh/serialize-error'
import { pidFromRepo } from '@/artifact/keys.ts'

const log = Debug('AI:artifact')
const repo = {
  type: 'object',
  required: ['repo'],
  properties: {
    repo: {
      type: 'string',
      pattern: '^[a-zA-Z0-9][a-zA-Z0-9-_]*\/[a-zA-Z0-9][a-zA-Z0-9-_]*$',
    },
  },
}
const request = {
  type: 'object',
  required: ['isolate'],
  properties: {
    isolate: {
      type: 'string',
    },
    pid: {
      type: 'object',
      required: ['account', 'repository', 'branches'],
      additionalProperties: false,
      properties: {
        account: {
          type: 'string',
        },
        repository: {
          type: 'string',
        },
        branches: {
          type: 'array',
          items: {
            type: 'string',
          },
          minItems: 1,
        },
      },
    },
  },
}

export const api = {
  ping: {
    type: 'object',
    description: 'Check queue processing system is alive',
    properties: {},
  },
  probe: repo,
  init: repo,
  clone: repo,
  pull: repo,
  push: repo,
  apiSchema: {
    type: 'object',
    required: ['isolate'],
    properties: {
      isolate: {
        type: 'string',
      },
    },
  },
  pierce: request,
  request: {
    type: 'object',
    required: ['request'],
    properties: {
      request,
      prior: { type: 'number' },
    },
  },
  logs: repo,
  // subscribe to json by filepath and pid
  // subscribe to path in json, so we can subscribe to the output of io.json
  // subscribe to binary by filepath and pid - done by commit watching

  // requesting a patch would be done with the last known patch as cursor
}

export type C = { db: DB; io: IO; fs: FS; self: Cradle }

export const functions: IsolateFunctions = {
  ping: (params?: Params) => {
    log('ping', params)
    return params
  },
  async probe(params, api: IsolateApi<C>) {
    const pid = pidFromRepo(params.repo as string)
    const head = await api.context.db!.getHead(pid)
    if (head) {
      return { pid, head }
    }
  },
  // need to split the git functions out to be an isolate
  async init(params, api: IsolateApi<C>) {
    const start = Date.now()
    const pid = pidFromRepo(params.repo as string)
    const probe = await functions.probe(params, api)
    if (probe) {
      throw new Error('repo already exists: ' + params.repo)
    }

    const { fs } = memfs()
    const dir = '/'
    await git.init({ fs, dir, defaultBranch: ENTRY_BRANCH })

    const lockId = await api.context.db!.getHeadlock(pid)
    const head = 'INIT'
    const result = await api.context.fs!.update(pid, fs, head, lockId)
    await api.context.db!.releaseHeadlock(pid, lockId)
    log('snapshot size:', result.prettySize)
    return { pid, head, size: result.prettySize, elapsed: Date.now() - start }
  },
  async clone(params, api: IsolateApi<C>) {
    const start = Date.now()
    const pid = pidFromRepo(params.repo as string)
    const probe = await functions.probe(params, api)
    if (probe) {
      throw new Error('repo already exists: ' + params.repo)
    }

    // TODO use the fs option in the context, by loading an asserted blank fs

    const { fs } = memfs()
    const dir = '/'
    const url = `https://github.com/${pid.account}/${pid.repository}.git`
    log('cloning %s', url)
    // TODO make an index file without doing a full checkout
    // https://github.com/dreamcatcher-tech/artifact/issues/28
    await git.clone({ fs, http, dir, url })
    const [{ oid: head }] = await git.log({ fs, dir, depth: 1 })
    log('cloned', head)
    const lockId = await api.context.db!.getHeadlock(pid)
    const result = await api.context.fs!.update(pid, fs, head, lockId)
    await api.context.db!.releaseHeadlock(pid, lockId)

    log('snapshot size:', result.prettySize)
    return { pid, head, size: result.prettySize, elapsed: Date.now() - start }
  },
  pull() {
    throw new Error('not implemented')
  },
  push() {
    throw new Error('not implemented')
  },
  apiSchema: (params: Params) => {
    // when it loads from files, will benefit from being close to the db
    const isolate = params.isolate as string
    const compartment = Compartment.create(isolate)
    return compartment.api
  },
  pierce: (params, api: IsolateApi<C>) => {
    log('pierce %o %o', params.isolate, params.functionName)
    return api.context.io!.induct(params as Request)
  },
  request: async (params, api: IsolateApi<C>) => {
    const request = params.request as InternalRequest
    const commit = params.commit as string
    const prior = params.prior as number | undefined
    // TODO wait for the prior to complete using prior key
    log('request %o %o', request.isolate, request.functionName, prior)
    const compartment = Compartment.create(request.isolate)

    // TODO load up the fs based on the current commit, not latest commit
    const fs = await api.context.fs!.load(request.target)
    const isolateApi = IsolateApi.create(fs, commit)
    const functions = compartment.functions(isolateApi)
    const outcome: Outcome = {}
    try {
      outcome.result = await functions[request.functionName](request.params)
      log('self result: %o', outcome.result)
    } catch (errorObj) {
      log('self error', errorObj)
      outcome.error = serializeError(errorObj)
    }
    const { target, sequence } = request
    const reply: InternalReply = { target, sequence, outcome }
    await api.context.io!.induct(reply)
  },
  logs: async (params, api: IsolateApi<C>) => {
    log('logs')
    const pid = pidFromRepo(params.repo as string)
    const fs = await api.context.fs!.load(pid)
    const logs = await git.log({ fs, dir: '/' })
    return logs
  },
}

export const lifecycles: IsolateLifecycle = {
  async '@@mount'(api: IsolateApi<C>) {
    assert(api.context.self, 'self not found')
    const db = await DB.create()
    const io = IO.create(db, api.context.self)
    const fs = FS.create(db)
    // in testing, alter the context to support ducking the queue
    api.context = { db, io, fs }
  },
  '@@unmount'(api: IsolateApi<C>) {
    return api.context.db!.stop()
  },
}