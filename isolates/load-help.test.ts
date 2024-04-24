import { expect } from '@utils'
import { Engine } from '../engine.ts'
import { Help } from '@/constants.ts'
import { Api } from '@/isolates/load-help.ts'
import { Home } from '@/api/web-client-home.ts'
Deno.test('loadAll', async (t) => {
  const engine = await Engine.create()
  const { pid: enginePid } = await engine.initialize()
  const home = Home.create(engine, enginePid)
  const artifact = await home.createSession()
  const { pid } = await artifact.clone({ repo: 'dreamcatcher-tech/HAL' })
  const { loadAll, load } = await artifact.actions<Api>('load-help', pid)
  await t.step('loadAll', async () => {
    expect(loadAll).toBeInstanceOf(Function)
    const helps = await loadAll() as Help[]
    expect(helps.length).toBeGreaterThan(5)
  })
  await t.step('load', async () => {
    const help = await load({ help: 'help-fixture' })
    expect(help).toHaveProperty('runner', 'ai-prompt')
    expect(help).toHaveProperty('instructions')
  })
  await artifact.stop()
})