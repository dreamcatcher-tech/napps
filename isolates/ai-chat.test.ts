import merge from 'npm:lodash.merge'
import { Engine } from '../engine.ts'
import { expect, log } from '@utils'
import IsolateApi from '../isolate-api.ts'
import { Help, pidFromRepo, PROCTYPE, RUNNERS } from '../constants.ts'
import { prepare } from './ai-prompt.ts'
import * as completions from './ai-completions.ts'
import FS from '@/git/fs.ts'
import DB from '@/db.ts'
import Accumulator from '@/exe/accumulator.ts'
import { Api } from '@/isolates/engage-help.ts'
import { assert } from '@std/assert'
import OpenAI from 'openai'
import { Machine } from '@/api/web-client-machine.ts'
type Messages = OpenAI.ChatCompletionMessageParam

Deno.test('ai-chat', async (t) => {
  const helpBase: Help = {
    config: {
      model: 'gpt-3.5-turbo',
    },
    runner: RUNNERS.CHAT,
    commands: ['io-fixture:local', 'io-fixture:error'],
    instructions: ['Only reply with a SINGLE word'],
  }
  const db = await DB.create()
  const pid = pidFromRepo('t', 'runner/test')
  const fs = await FS.init(pid, db)
  const accumulator = Accumulator.create(dummyOrigin, [], fs)
  const api = IsolateApi.create(accumulator)
  accumulator.activate(Symbol())

  await t.step('hello world', async () => {
    const help = merge({}, helpBase, { commands: [] })
    const text = 'cheese emoji'
    await prepare(help, text, api)
    await completions.functions.create(help, api)
    const session = await api.readJSON<Messages[]>('session.json')
    log('session', session)
    expect(session).toHaveLength(3)
    expect(session[2].content).toBe('🧀')
  })
  await t.step('tool call', async () => {
    const text = 'call the "local" function'
    const help = merge({}, helpBase, {
      instructions: ['return the function call results verbatim'],
    })
    api.delete('session.json')
    await prepare(help, text, api)
    await completions.functions.create(help, api)
    const session = await api.readJSON<Messages[]>('session.json')
    assert('tool_calls' in session[2], 'tool calls missing')
    log('session', session[2].tool_calls)
    assert(session[2].tool_calls)
    expect(session[2].tool_calls).toHaveLength(1)
    const fn = session[2].tool_calls[0]
    expect(fn.function).toEqual({ name: 'local', arguments: '{}' })
  })
  await t.step('tool error', async () => {
    const text = 'call the "error" function with message: salami'
    const help = merge({}, helpBase, {
      instructions: ['return the function call error message'],
    })
    api.delete('session.json')
    await prepare(help, text, api)
    await completions.functions.create(help, api)
    const session = await api.readJSON<Messages[]>('session.json')
    assert('tool_calls' in session[2], 'tool calls missing')
    log('session', session[2].tool_calls)
    assert(session[2].tool_calls)
    expect(session[2].tool_calls).toHaveLength(1)
    const fn = session[2].tool_calls[0]
    expect(fn.function).toEqual({
      name: 'error',
      arguments: '{"message":"salami"}',
    })
  })
  db.stop()
})

Deno.test('engage-help', async (t) => {
  const engine = await Engine.start()
  await engine.provision()
  const machine = Machine.load(engine)
  const session = machine.openSession()

  const { pid } = await session.clone({ repo: 'dreamcatcher-tech/HAL' })

  let latest = {}
  const splices = async () => {
    for await (const splice of session.read(pid, 'session.json')) {
      if (!Object.keys(splice.changes).length) {
        continue
      }
      if (splice.changes['session.json']) {
        const { patch } = splice.changes['session.json']
        assert(patch, 'patch missing')
        latest = JSON.parse(patch)
        log('splice', splice.oid, latest)
      }
    }
  }
  splices()
  await t.step('say the word "hello"', async () => {
    const isolate = 'engage-help'
    const { engage } = await session.actions<Api>(isolate, pid)
    await engage({
      help: 'help-fixture',
      text: 'say the word: "hello" without calling any functions',
    })

    log('result', latest)
    assert(Array.isArray(latest))
    expect(latest[2].content.toLowerCase()).toBe('hello')
  })
  await t.step('what is your name ?', async () => {
    const isolate = 'engage-help'
    const { engage } = await session.actions<Api>(isolate, pid)
    await engage({
      help: 'help-fixture',
      text: 'what is your name ?',
    })
    assert(Array.isArray(latest))
  })

  await t.step('repeat your last', async () => {
    const isolate = 'engage-help'
    const { engage } = await session.actions<Api>(isolate, pid)
    await engage({
      help: 'help-fixture',
      text: 'repeat your last, without calling any functions',
    })

    log('result', latest)
    assert(Array.isArray(latest))
  })

  await session.engineStop()
})
const dummyOrigin = {
  target: {
    repoId: '0',
    account: 'system',
    repository: 'system',
    branches: ['main'],
  },
  isolate: 'repo',
  functionName: 'rm',
  params: { repo: 'test/test' },
  proctype: PROCTYPE.SERIAL,
  sequence: 1,
  source: {
    repoId: '0',
    account: 'system',
    repository: 'system',
    branches: ['main'],
  },
}
