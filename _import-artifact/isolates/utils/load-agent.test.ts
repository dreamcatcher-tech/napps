import { expect } from '@utils'
import { assert } from '@std/assert'
import { createMockApi } from '@/tests/fixtures/mock-api.ts'
import { loadAgent } from '@/isolates/utils/load-agent.ts'

Deno.test('format checking', async (t) => {
  const { api, stop } = await createMockApi('agent/format')

  const path = 'agents/agent-fixture.md'
  await t.step('fixture', async () => {
    api.write(path, agentMd)
    const agent = await loadAgent(path, api)
    assert(agent.config)
    expect(agent.config.model).toBe('gpt-3.5-turbo')
    expect(agent.runner).toBe('ai-runner')
    expect(agent.commands).toEqual(['io-fixture:local', 'io-fixture:error'])
    expect(agent.instructions).toEqual('ALWAYS be as brief as possible')
  })
  await t.step('no front-matter', async () => {
    api.write(path, 'HELLO')
    const agent = await loadAgent(path, api)
    expect(agent.config).toBeDefined()
  })
  await t.step('erroneous config', async () => {
    api.write(path, '---\nconfig: 123\n---')
    await expect(loadAgent(path, api))
      .rejects.toThrow('Error parsing agent: ' + path)
  })
  await t.step('missing agent', async () => {
    await expect(loadAgent('agents/missing.md', api))
      .rejects.toThrow('Could not find agents/missing.md')
  })

  stop()
})

const agentMd = `
---
config:
  model: gpt-3.5-turbo
commands:
  - io-fixture:local
  - io-fixture:error
---

ALWAYS be as brief as possible

`

Deno.test('expand md links', async (t) => {
  const { api, stop } = await createMockApi('agent/format')
  const path = 'agents/agent-fixture.md'

  await t.step('linked agent', async () => {
    api.write(path, linkedAgent)
    api.write('testFile.md', testFile)

    const agent = await loadAgent(path, api)
    expect(agent.instructions).toEqual(testFile)
  })
  await t.step('nested links', async () => {
    api.write(path, nested)
    api.write('nested.md', linkedAgent)
    api.write('testFile.md', testFile)

    const agent = await loadAgent(path, api)
    expect(agent.instructions).toEqual(testFile)
  })
  await t.step('multiple links', async () => {
    api.write(path, multiple)
    api.write('testFile.md', testFile)

    const agent = await loadAgent(path, api)
    expect(agent.instructions).toEqual(testFile + testFile)
  })
  await t.step('recursive links', async () => {
    // if a loop is detected,
    const A = `[](B.md)`
    api.write(path, A)
    const B = `[](${path})`
    api.write('B.md', B)
    await expect(loadAgent(path, api)).rejects.toThrow('circular reference')
  })
  // TODO test special chars messing up the link regex
  // TODO test paths are relative to the loaded path
  stop()
})

const linkedAgent = `
[something](testFile.md)
`
const nested = `[](nested.md)`
const testFile = `THIS IS A TEST`
const multiple = `[](testFile.md)[](./testFile.md)`

Deno.test('load agents', async () => {
  const { api, stop } = await createMockApi('agent/format')
  api.read = (path: string) =>
    Promise.resolve(
      Deno.readTextFileSync('./HAL/' + path),
    )
  api.exists = async (path: string) => {
    try {
      await Deno.stat('./HAL/' + path)
      return true
    } catch {
      return false
    }
  }

  const all = Deno.readDirSync('./HAL/agents')
  for (const entry of all) {
    if (!entry.isFile) {
      throw new Error('not a file: ' + entry.name)
    }
    await loadAgent('agents/' + entry.name, api)
  }

  stop()
})
