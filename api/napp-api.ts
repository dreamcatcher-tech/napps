import type { ZodRecord, ZodTypeAny } from 'zod'
import { z } from 'zod'
import type { NappTypes } from './napps-list.ts'
import { type Action, jsonSchema, type JsonValue } from './actions.ts'
import type { Outcome } from './actions.ts'
import { deserializeError } from 'serialize-error'

export type TreeEntry = {
  /** the 6 digit hexadecimal mode */
  readonly mode: string
  /** the name of the file or directory */
  readonly path: string
  /** the hash identifier of the blob or tree */
  readonly oid: string
  /** the type of object, where commit indicates a submodule */
  readonly type: 'blob' | 'tree' | 'commit'
  /** the snapshot identifier, since lookup by oid alone cannot cheaply
   * determine permissions */
  readonly snapshot: string
}

export type Upsert =
  // TODO could this be a TreeEntry ?
  | { readonly meta: { readonly snapshot: string; readonly path: string } }
  | { readonly json: JsonValue } // TODO implement object cache using structured clone
  | { readonly text: string }
  | { readonly binary: Uint8Array }

export const processAddressSchema = z
  .object({
    /** Posix style path that locates what process thread we want to communicate
     * with. In git, this would be branch names, for example:
     * `exe/proc-1/child-2`.  If an action is addressed to a branch where there
     * is no process manager running, the action will be rejected */
    processPath: z.string(),

    /** The cryptographic identifier of the whole repository. This would be the
     * chainId in conventional blockchains, but could be a group of public keys,
     * or some other root of trust */
    crypto: z.string(),

    /** Whatever snapshot model is used, the branch concept represents an
     * isolated line of changes. In git, this would be a branch.  Naming should
     * follow posix relative path conventions */
    branch: z.string(),

    /** Depending on the snapshot format being used, represents the state at a
     * specific point in the history. For write commands, snapshot is used to
     * guarantee the state being changed has not been altered since it was read */
    snapshot: z.string(),
  })
  /**
   * Any omitted fields will be filled in by the current process address.
   */
  .partial()

export type ProcessAddress = z.infer<typeof processAddressSchema>

export interface Snapshots<ReadOptions = ProcessAddress> {
  /**
   * Get the latest snapshot identifier.  Throws if no snapshot is found.
   */
  readonly latest: (options?: Omit<ReadOptions, 'snapshot'>) => Promise<string>

  /**
   * Get the parent(s) snapshot identifiers.  Throws if given snapshot is not
   * found. If the snapshot has no parents, an empty array is returned. If no
   * snapshot is provided, the latest snapshot is used.
   */
  readonly parents: (options?: ReadOptions) => Promise<string[]>

  /**
   * Get the history of snapshot identifiers.  Throws if no snapshot is found.
   * Multiple parents are returned in reverse chronological order.  Throws if
   * the given snapshot is not found.  If there are no parents, an empty array
   * is returned.  If no snapshot is provided, the latest snapshot is used.
   */
  readonly history: (
    options?: ReadOptions & { limit?: number },
  ) => Promise<string[]>
  readonly diff: (
    // TODO handle diffing actual paths too
    from: ReadOptions & { path: string },
    to: ReadOptions & { path: string },
  ) => Promise<TreeEntry[]>
}

type BranchAddress = Omit<ProcessAddress, 'processPath'>
type FromBranch = BranchAddress & { branch: string }
type ToBranch = BranchAddress & { branch: string; snapshot: never }
/**
 * Branching manages multiple lines of data modification.  It is separate from
 * processes as it provides the ability to modify the data of a branch
 * separately from a process that does it on the branch.
 */
interface Graph {
  /**
   * Fork a new branch that is named as the given path.  Fork can only be done
   * within the same repository it is being called from.
   */
  readonly fork: (
    newBranchPath: string,
    options?: BranchAddress,
  ) => Promise<Required<BranchAddress>>
  /**
   * Merge the given branch into the current branch, or if the 'to' branch is
   * given, merge the 'from' branch into the 'to' branch.
   */
  readonly merge: (from: FromBranch, to?: ToBranch) => Promise<void>
  readonly commit: () => Promise<void>
  readonly reset: () => Promise<void>
  readonly push: () => Promise<void>
  readonly pull: () => Promise<void>
  readonly getRemote: () => Promise<void>
  readonly setRemote: () => Promise<void>
  /**
   * Given a name, some crypto config, and a remote clone address, clone the
   * repo into the current home directory.
   */
  readonly clone: (options?: { alias?: string }) => Promise<void>
  readonly rm: (branch: BranchAddress) => Promise<void>
  readonly rmRepo: () => Promise<void>
  // ?? should remote writes be part of branching ?
}

export interface SnapshotsProvider<ReadOptions = ProcessAddress> {
  readonly snapshots: Snapshots<ReadOptions>
  readonly read: Read<ReadOptions>
  /**
   * Commit the changes to the snapshot.  Throws if the snapshot is not found.
   */
  readonly commit: (
    upserts: Map<string, Upsert>,
    deletes: Set<string>,
    options?: ReadOptions,
  ) => Promise<string>
}

export interface Read<ReadOptions = ProcessAddress> {
  readonly meta: (path: string, options?: ReadOptions) => Promise<TreeEntry>
  readonly json: <T extends ZodTypeAny = typeof jsonSchema>(
    path: string,
    options?: ReadOptions & { schema?: T },
  ) => Promise<z.infer<T>>
  readonly text: (path: string, options?: ReadOptions) => Promise<string>
  readonly binary: (path: string, options?: ReadOptions) => Promise<Uint8Array>
  readonly exists: (path: string, options?: ReadOptions) => Promise<boolean>
  readonly ls: (path?: string, options?: ReadOptions) => Promise<TreeEntry[]>
}

export interface Write<WriteOptions = ProcessAddress> {
  readonly json: (
    path: string,
    content: JsonValue,
    options?: WriteOptions,
  ) => Promise<void>
  readonly text: (
    path: string,
    content: string,
    options?: WriteOptions,
  ) => Promise<void>
  readonly binary: (
    path: string,
    content: Uint8Array,
    options?: WriteOptions,
  ) => Promise<void>
  readonly rm: (path: string, options?: WriteOptions) => Promise<void>
  readonly mv: (
    from: WriteOptions & { path: string },
    to: WriteOptions & { path: string },
  ) => Promise<void>
  readonly cp: (
    from: WriteOptions & { path: string },
    to: WriteOptions & { path: string },
  ) => Promise<void>
}

type SpawnOptions =
  & ProcessAddress
  & (
    | { readonly name: string; prefix?: never }
    | { name?: never; readonly prefix: string }
  )
  & {
    /** List of glob patterns for files to copy into the process */
    readonly files?: string[]

    /** Priority of the process */
    readonly nice?: number
  }

type MetaResult = {
  readonly meta: Required<ProcessAddress>
  readonly outcome: Outcome
}

interface Processes {
  /** start a new process and install the given napp. */
  readonly spawn: (
    napp: keyof NappTypes,
    options: SpawnOptions,
  ) => Promise<Required<ProcessAddress>>

  /** tear down the specified process, and return the result of teardown */
  readonly rm: (options: ProcessAddress) => Promise<JsonValue>

  /** spawns a new process, installs the napp specified in the action, awaits
   * the execution, and then returns, killing the process */
  readonly async: (action: Action, options: SpawnOptions) => Promise<JsonValue>

  /** move a process to another parent.  Can be used to daemonize a running
   * process by moving it to be a child of init.  Allows moving between branches
   * and even different repositories */
  readonly mv: (to: ProcessAddress, from?: ProcessAddress) => Promise<void>

  /** copy a process to another parent.  Can be used to daemonize a running
   * process by moving it to be a child of init.  Allows moving between branches
   * and even different repositories */
  readonly cp: (to: ProcessAddress, from?: ProcessAddress) => Promise<void>

  /** change the priority of a process */
  readonly nice: (level: number, options: ProcessAddress) => void

  /** dispatch an action to the given process and await the result */
  readonly dispatch: (
    action: Action,
    options: ProcessAddress,
  ) => Promise<JsonValue | void>

  /** dispatch an action to the given process and await the result, returning
   * the metadata of the action as well as the result */
  readonly dispatchWithMeta: (
    action: Action,
    options: ProcessAddress,
  ) => Promise<MetaResult>
}

export const stateSchema = z.record(jsonSchema)

/** State is stored in the process json files */
interface State<ReadOptions = ProcessAddress> {
  readonly get: <T extends ZodRecord = typeof stateSchema>(
    options: ReadOptions & { schema?: T; fallback?: z.infer<T> },
  ) => Promise<z.infer<T>>
  // TODO return metadata of the state so we know if a part remains unchanged
  // TODO allow fetching paths within the state
  readonly set: <T extends ZodRecord = typeof stateSchema>(
    state: z.infer<T>,
    options: ReadOptions & { schema?: T },
  ) => Promise<void>
}

interface Effects {
  /** Side effects can listen to this signal to abort their activities */
  readonly signal: AbortSignal

  /** If the side effect lock was broken in order to start this instance.
   * Implies the previous executing instance was aborted */
  readonly isEffectRecovered: boolean

  /** The context of the current side effect, which acts like a React ref, and
   * is a mutable store of any value at all */
  set context(value: unknown)

  get context(): unknown
}

export interface NappApi {
  readonly state: State
  readonly read: Read
  readonly write: Write
  readonly processes: Processes
  readonly effects: Effects
  readonly snapshots: Snapshots
  readonly graph: Graph
}

/**
 * Use this to unwrap the results of a dispatch that came back with metadata as
 * well as an outcome.  Calling this function makes it behave the same as
 * calling `dispatch` directly.
 * @param meta the result of calling `dispatchWithMeta`
 * @returns a promise that resolves or rejects to the result of the action
 */
export const settle = (meta: MetaResult) => {
  const { outcome } = meta
  if (outcome.error) {
    return Promise.reject(deserializeError(outcome.error))
  } else {
    return Promise.resolve(outcome.result)
  }
}

export class FileNotFoundError extends Error {
  code = 'ENOENT'
  constructor(path: string) {
    super('Could not find file or directory: ' + path)
    this.name = 'FileNotFoundError'
  }
}
export class LineageError extends Error {
  code = 'EINVALID'
  constructor(id: string) {
    super('Lineage fault for: ' + id)
    this.name = 'LineageError'
  }
}
