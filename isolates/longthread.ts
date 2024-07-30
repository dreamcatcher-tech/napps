import { assert, Debug } from '@utils'
import { actorIdRegex, IA, PID, Thread, threadIdRegex } from '@/constants.ts'
import { Functions } from '@/constants.ts'
import { executeTools } from '@/isolates/ai-execute-tools.ts'
import * as completions from '@/isolates/ai-completions.ts'
const log = Debug('AI:longthread')

export const api = {
  start: {
    description: 'start a new thread for the given agent',
    type: 'object',
    additionalProperties: false,
    required: ['threadId'],
    properties: {
      threadId: {
        description: 'the id of the thread to execute',
        type: 'string',
      },
    },
  },
  run: {
    type: 'object',
    required: ['threadId', 'path', 'content', 'actorId'],
    properties: {
      threadId: { type: 'string' },
      path: { type: 'string' },
      content: { type: 'string' },
      actorId: { type: 'string' },
    },
    additionalProperties: false,
  },
  switchboard: {
    type: 'object',
    required: ['threadId', 'content', 'actorId'],
    properties: {
      threadId: { type: 'string', pattern: threadIdRegex.source },
      content: { type: 'string' },
      actorId: { type: 'string', pattern: actorIdRegex.source },
    },
    additionalProperties: false,
  },
}
export interface Api {
  start: (params: { threadId: string }) => Promise<PID>
  run: (params: {
    threadId: string
    /** Path to the agent to instantiate */
    path: string
    content: string
    actorId: string
  }) => Promise<void>
  switchboard: (
    params: { threadId: string; content: string; actorId: string },
  ) => Promise<void>
}

export const functions: Functions<Api> = {
  start: async ({ threadId }, api) => {
    log('start', threadId)
    const threadPath = `threads/${threadId}.json`
    assert(!await api.exists(threadPath), `thread exists: ${threadPath}`)
    const thread: Thread = {
      messages: [],
      toolCommits: {},
    }
    api.writeJSON(threadPath, thread)
    return api.pid
  },
  run: async ({ threadId, path, content, actorId }, api) => {
    const threadPath = `threads/${threadId}.json`
    const thread = await api.readJSON<Thread>(threadPath)
    thread.messages.push({ name: actorId, role: 'user', content })
    api.writeJSON(threadPath, thread)

    const { complete } = await api.actions<completions.Api>('ai-completions')
    while (!await isDone(threadPath, api)) {
      await complete({ threadId, path })
      if (await isDone(threadPath, api)) {
        return
      }
      // TODO check tool responses come back correct
      await executeTools(threadPath, api)
    }
  },
  switchboard: async ({ threadId, content, actorId }, api) => {
    const threadPath = `threads/${threadId}.json`
    const thread = await api.readJSON<Thread>(threadPath)
    thread.messages.push({ name: actorId, role: 'user', content })
    api.writeJSON(threadPath, thread)

    // make the switchboard call.
    const path = `agents/switchboard.md`
    const { once } = await api.actions<completions.Api>('ai-completions')
    const assistant = await once({ path, content })

    throw new Error('not implemented')
    // ? what is the formula for ending on a function of a guaranteed type ?
    // basically, pass in the schema, and expect to get the function call params
    // object out of it, with the name being set
  },
}

const isDone = async (threadPath: string, api: IA) => {
  const thread = await api.readJSON<Thread>(threadPath)
  const last = thread.messages[thread.messages.length - 1]
  if (!last || last.role !== 'assistant') {
    return false
  }
  if ('tool_calls' in last) {
    return false
  }
  if ('tool_call_id' in last) {
    return false
  }
  return true
}
