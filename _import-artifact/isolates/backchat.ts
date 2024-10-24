import {
  backchatIdRegex,
  backchatStateSchema,
  Functions,
  getActorId,
  getActorPid,
  getThreadPath,
  type IA,
  pidSchema,
  print,
  threadIdRegex,
  threadSchema,
  ToApiType,
  unsequencedRequest,
} from '@/constants.ts'
import * as actor from '@/api/isolates/actor.ts'
import { assert, Debug, equal } from '@utils'
import * as longthread from './longthread.ts'
import { z } from 'zod'
import { fixedRandomness } from '@/api/randomness.ts'
const log = Debug('AI:backchat')

export const parameters = {
  newThreadSignal: z.object({}).describe(
    'Signal to create a new thread and set it as the current target thread',
  ),
  newThread: z.object({}).describe(
    'Create a new thread and set it as the current target thread',
  ),
  changeThreadSignal: pidSchema.describe(
    'Signal to change the current target thread',
  ),
  changeThread: pidSchema.describe('Change the current target thread'),
  changeRemote: z.object({ remote: pidSchema.optional() }).describe(
    'Change the remote of the current target thread',
  ),
  prompt: z.object({
    content: z.string(),
    target: pidSchema.optional(),
    attachments: z.array(z.string()).optional(),
  }).describe(
    'Send a prompt to the backchat target thread',
  ),
  relay: z.object({
    request: unsequencedRequest,
  }).describe('Relay a request to the given target PID'),
}
export const returns = {
  /** stopOnTool command */
  newThreadSignal: z.null(),
  /** The threadId of the new thread */
  newThread: z.string().regex(threadIdRegex),
  /** stopOnTool command */
  changeThreadSignal: z.null(),
  /** The new target thread */
  changeThread: z.void(),
  /** The new target thread */
  changeRemote: z.void(),
  prompt: z.void(),
  relay: z.unknown(),
}
export type Api = ToApiType<typeof parameters, typeof returns>

export const functions: Functions<Api> = {
  newThreadSignal: () => null,
  newThread: async (_, api) => {
    log('newThread', print(api.pid))
    // TODO generate randomness each execution with incrementation
    const { threadCount } = await api.state(backchatStateSchema, {
      threadCount: 0,
      target: api.pid,
    })

    const backchatId = getBackchatId(api)
    const threadId = generateThreadId(threadCount, backchatId)

    const target = getActorPid(api.pid)
    const { thread } = await api.actions<actor.Api>('actor', { target })
    const pid = await thread({ threadId })
    log('thread started:', print(pid))
    await api.updateState(() => {
      return { target: pid, threadCount: threadCount + 1 }
    }, backchatStateSchema)
    return threadId
  },
  changeThreadSignal: () => null,
  changeThread: async (target, api) => {
    log('changeThread', print(target))
    const thread = await api.readJSON(getThreadPath(target), { target })
    threadSchema.parse(thread)
    // TODO check other parameters of the thread are suitable as a base target

    await api.updateState((state) => {
      return { ...state, target }
    }, backchatStateSchema)
  },
  changeRemote: async ({ remote }, api) => {
    assertBackchatThread(api)
    log('changeRemote', print(remote))

    const { target } = await api.state(backchatStateSchema, {
      threadCount: 0,
      target: api.pid,
    })
    if (equal(target, remote)) {
      throw new Error('Remote is same as current target')
    }

    const { changeRemote } = await api.actions<longthread.Api>('longthread', {
      target,
    })
    await changeRemote({ remote })
  },
  async prompt({ content, target, attachments }, api) {
    // TODO handle attachments and empty content
    // TODO hit this thread with the topic router
    log('prompt: %o', content)
    log('threadId: %o attachments: %o', attachments)
    assertBackchatThread(api)

    if (!target) {
      const state = await api.state(backchatStateSchema, {
        threadCount: 0,
        target: api.pid,
      })
      target = state.target
    }

    const actorId = getActorId(api.pid)

    const { route } = await api.actions<longthread.Api>('longthread', {
      target,
    })
    const { newThread, changeThread } = await route({ content, actorId })
    if (newThread) {
      await functions.newThread({}, api)
    }
    if (changeThread) {
      await functions.changeThread(changeThread, api)
    }
  },
  relay: ({ request }, api) => {
    // TODO replace this with native relay ability
    return api.action(request)
  },
}
const assertBackchatThread = (api: IA) => {
  assert(api.pid.branches.length === 3, 'Invalid pid')
  return getBackchatId(api)
}
const getBackchatId = (api: IA) => {
  const backchatId = api.pid.branches[2]
  assert(backchatIdRegex.test(backchatId), 'Invalid backchat id')
  return backchatId
}

const generateThreadId = (count: number, backchatId: string) => {
  return 'the_' + fixedRandomness(backchatId + '_' + count)
}

// setting the ID from the state is the only way to generate a deterministic id

// unless we require the caller to supply it, otherwise it will come out
// different each time.

// or we could use the branch prefix method to just count updwards, however this
// makes the numbers look noisy, since the gap.

// RNG is actually in the state / io for any given execution, and has the same
// problem as the state, to make sure it is always current for the given
// snapshot in the fs

// this can be the same kind of storage as what commits were observed by the
// system when running reads for remote systems, and listing branches.

// sampling the date would be the same, as we would set the start time of the
// commit at commencement of the execution, and then increment it units of 10ms
// as we go along, so that upon replay, we should get the same results ?
// or, at the start, just make it return the same result every time.
