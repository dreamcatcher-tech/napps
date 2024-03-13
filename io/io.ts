import * as git from '../git/mod.ts'
import { assert, Debug } from '@utils'
import { MergeReply, PID, PierceReply, Poolable, Reply } from '@/constants.ts'
import DB from '@/db.ts'
import { IFs } from 'https://esm.sh/v135/memfs@4.6.0/lib/index.js'
import FS from '@/fs.ts'
import Cradle from '@/cradle.ts'
const log = Debug('AI:io')

export default class IO {
  #db!: DB
  #fs!: FS
  #self!: Cradle
  static create(db: DB, self: Cradle) {
    const io = new IO()
    io.#db = db
    io.#fs = FS.create(db)
    io.#self = self
    return io
  }

  async induct(poolable: Poolable) {
    log('induct %o', poolable)
    await this.#db.addToPool(poolable)
    const lockId = await this.#db.getHeadlockMaybe(poolable)
    if (lockId) {
      const pid = poolable.target
      await this.#execute(pid, lockId)
    }
  }
  async #execute(pid: PID, lockId: string) {
    const fs = await this.#fs.load(pid)
    const solids = await this.#solidifyPool(pid, fs)

    log('solids %o', solids)
    const { commit, request, branches, replies } = solids
    await this.#fs.update(pid, fs, commit, lockId)

    if (request) {
      log('request %o', request)
      // WARNING detaches from queue
      await this.#self.request({ request, commit })
    }
    for (const branch of branches) {
      log('branch %o', branch)
      await this.#self.branch({ branch, commit })
    }
    for (const reply of replies) {
      if (isPierceReply(reply)) {
        log('pierce reply %o', reply)
        await this.#db.settleReply(pid, reply)
      } else {
        log('solid reply %o', reply)
        await this.induct(reply)
      }
    }
    await this.#db.releaseHeadlock(pid, lockId)
  }
  async #solidifyPool(pid: PID, fs: IFs) {
    const { poolKeys, pool } = await this.#db.getPooledActions(pid)
    log('solidifyPool %o %i', pid, poolKeys.length)

    for (const key in pool) {
      const poolable = pool[key]
      if (isMergeReply(poolable)) {
        const { source } = poolable
        const from = await this.#fs.load(source)
        FS.copyObjects(from, fs)
      }
    }

    const solids = await git.solidify(fs, pool)
    await this.#db.deletePool(poolKeys)
    return solids
  }
  async branch(pid: PID, baseCommit: string) {
    const lockId = await this.#db.getHeadlock(pid)
    const parent = getParent(pid)
    const fs = await this.#fs.load(parent)

    const { commit, request } = await git.branch(fs, baseCommit, pid)
    await this.#fs.update(pid, fs, commit, lockId)
    assert(request, 'branch must have a single request')
    await this.#self.request({ request, commit })
    await this.#db.releaseHeadlock(pid, lockId)
  }
}

const isMergeReply = (poolable: Poolable): poolable is MergeReply => {
  return 'commit' in poolable
}
const isPierceReply = (reply: Reply): reply is PierceReply => {
  return 'ulid' in reply
}

const getParent = (pid: PID) => {
  // get all but the last item of the branches array
  const branches = pid.branches.slice(0, -1)
  return { ...pid, branches }
}