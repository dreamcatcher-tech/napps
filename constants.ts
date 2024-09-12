import IA from './isolate-api.ts'
export type { IA }
export const IO_PATH = '.io.json'
import {
  Backchat,
  Change,
  CommitObject,
  EngineInterface,
  IsolateReturn,
  MetaPromise,
  Outcome,
  Params,
  PID,
  PierceRequest,
  RemoteRequest,
  Request,
  SolidRequest,
  UnsequencedRequest,
} from './api/types.ts'
import FS from '@/git/fs.ts'
import type DB from '@/db.ts'
import type Executor from '@/exe/exe.ts'
import { assert, equal } from '@utils'
import { JsonSchema7ObjectType, zodToJsonSchema } from 'zod-to-json-schema'
import { z, ZodObject, ZodSchema, ZodUnknown } from 'zod'

export const REPO_LOCK_TIMEOUT_MS = 5000

/** Artifact Context, including the db and executor */
export type C = {
  db: DB
  exe: Executor
  aesKey?: string
  seed?: Deno.KvEntry<unknown>[]
}

/** Extends the actions api to be the isolate api */
export type Functions<Api> = {
  [K in keyof Api]: Function<Api[K]>
}

type Function<T> = T extends (...args: infer Args) => infer R
  ? (...args: [...Args, IA]) => R
  : never

export type IsolateFunction = {
  (): unknown | Promise<unknown>
  (...args: [Params]): unknown | Promise<unknown>
  (...args: [Params, IA]): unknown | Promise<unknown>
}

export type IsolateFunctions = {
  [key: string]: IsolateFunction
}
export type IsolateLifecycle = {
  '@@mount'?: (api: IA) => Promise<IsolateReturn> | IsolateReturn
  '@@unmount'?: (api: IA) => Promise<IsolateReturn> | IsolateReturn
}
export type Isolate = {
  parameters: Record<string, ZodObject<Record<string, ZodUnknown>>>
  returns: Record<string, ZodSchema>
  functions: IsolateFunctions
  lifecycles?: IsolateLifecycle
}

export type Poolable = MergeReply | RemoteRequest | PierceRequest
export type Reply = SolidReply | MergeReply
export type EffectRequest = {
  target: PID
  /**
   * The hash of the function that was called, to ensure repeatability
   */
  fingerprint: string
  sequence: number
}
export type SolidReply = {
  target: PID
  sequence: number
  outcome: Outcome
}
export type MergeReply = SolidReply & {
  /**
   * Where did this merge reply come from?
   */
  source: PID
  /**
   * The commit that solidified this merge reply, which is used as a merge
   * parent in the recipient branch, so that any changes to the fs can be
   * accessed and so the provenance of the action is included.
   */
  commit: string
}
export type IsolatePromise =
  | BareIsolatePromise
  | PromisedIsolatePromise
  | SettledIsolatePromise
type BareIsolatePromise = {
  request: UnsequencedRequest
}
export type PromisedIsolatePromise<T = unknown> = BareIsolatePromise & {
  promise: MetaPromise<T>
  resolve: (value: T) => void
  reject: (error: Error) => void
}
export type SettledIsolatePromise<T = unknown> =
  & (BareIsolatePromise | PromisedIsolatePromise<T>)
  & {
    outcome: Outcome
    /** if an outcome is given, there must be a commit associated with it, so
     * that the execution filesystem can be ticked forwards */
    commit: string
    /** If the outcome was the result of a branch returning, then the parent
     * commit of that branch is given here */
    parent?: string
  }
export const isSettledIsolatePromise = (
  p: IsolatePromise,
): p is SettledIsolatePromise => {
  return 'outcome' in p
}
export type Solids = {
  oid: string
  commit: CommitObject
  /** Changed files in this commit.  Empty change signals deletion. */
  changes: { [key: string]: Change }
  exe?: { request: SolidRequest; sequence: number }
  branches: number[]
  poolables: (MergeReply | RemoteRequest)[]
  deletes: { pid: PID; commit: string }[]
}
export type Branched = {
  /** The first request in the new branch */
  origin: SolidRequest
  /** The branch PID that needs to be created in /.git/refs */
  pid: PID
  /** The head of the new branch that needs to be created in /.git/refs */
  head: string
}
export type ExeResult = ExeSettled | ExePending
type ExeResultBase = {
  /**
   * The last filesystem that was modified during the execution run.  The FS
   * might have been bumped forwards if accumulations occurred.
   */
  fs: FS
  /** If this is a side effect request, this is the lock held by for it */
  effectsLock?: Deno.KvEntry<string>
}
type ExeSettled = ExeResultBase & {
  reply: SolidReply
}
type ExePending = ExeResultBase & {
  pending: Pending
}
export type Pending = {
  /** The commit that caused the requests to be generated */
  commit: string
  /** The requests that were generated by the latest round of execution */
  requests: UnsequencedRequest[]
  /** The sequence number to accumulate the pending requests against */
  sequence: number
}

export const isMergeReply = (
  poolable: Poolable | SolidReply,
): poolable is MergeReply => {
  return 'commit' in poolable && 'outcome' in poolable
}
export const isReply = (poolable: Poolable | SolidReply): poolable is Reply => {
  return 'outcome' in poolable
}
export const isRemoteRequest = (
  poolable: Request,
): poolable is RemoteRequest => {
  return 'commit' in poolable && 'proctype' in poolable
}
/**
 * Messages that go on the queue are one of three types.  Each one is an
 * operation that will result in a new commit, atomically.  Each operation is
 * able to detect when it is a duplicate task due to duplicate message delivery.
 * Each task will continue to retry until it is successful, as long as its check
 * for duplication reassures it to keep trying.
 */
export type QueueMessage = QueuePool | QueueExe | QueueBranch
export enum QueueMessageType {
  POOL = 'pool',
  EXECUTION = 'exe',
  BRANCH = 'branch',
}
export type QueuePool = {
  type: QueueMessageType.POOL
  pid: PID
}
export type QueueExe = {
  type: QueueMessageType.EXECUTION
  request: SolidRequest
  commit: string
  sequence: number
}
export type QueueBranch = {
  type: QueueMessageType.BRANCH
  parentCommit: string
  parentPid: PID
  sequence: number
}
export const isQueuePool = (m: QueueMessage): m is QueuePool => {
  return m.type === QueueMessageType.POOL
}
export const isQueueExe = (m: QueueMessage): m is QueueExe => {
  return m.type === QueueMessageType.EXECUTION
}
export const isQueueBranch = (m: QueueMessage): m is QueueBranch => {
  return m.type === QueueMessageType.BRANCH
}
export const isChildOf = (child: PID, parent: PID) => {
  const childParent = { ...child, branches: child.branches.slice(0, -1) }
  return equal(childParent, parent)
}
export const isBaseRepo = (pid: PID) => pid.branches.length === 1

export type Provisioner = (superBackchat: Backchat) => Promise<void>

export type CradleMaker = (
  init?: Provisioner,
) => Promise<{ backchat: Backchat; engine: EngineInterface }>

export const toApi = (parameters: Record<string, ZodSchema>) => {
  const api: Record<keyof typeof parameters, JsonSchema7ObjectType> = {}
  for (const key of Object.keys(parameters)) {
    const schema = zodToJsonSchema(parameters[key])
    delete schema.$schema
    assert('properties' in schema, 'schema must have properties')
    api[key] = schema
  }
  return api
}

export type Returns<T> = {
  [K in keyof T]: z.ZodSchema
}

export * from './api/types.ts'
