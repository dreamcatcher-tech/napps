import { expect } from '@utils'
import { addBranches, CradleMaker } from '@/constants.ts'
import { Api } from '@/isolates/session.ts'
import { Api as IoApi } from '@/isolates/io-fixture.ts'

export default (name: string, cradleMaker: CradleMaker) => {
  const prefix = name + ':branching: '
  Deno.test(prefix + 'session', async (t) => {
    const { backchat, engine } = await cradleMaker()
    const repo = 'process/session'

    const { pid } = await backchat.init({ repo })
    const testBranch1Pid = addBranches(pid, 'session-1')

    const { create } = await backchat.actions<Api>('session', { target: pid })
    await t.step('create', async () => {
      const branchPid = await create({ prefix: 'session' })
      expect(branchPid).toEqual(testBranch1Pid)

      const opts = { target: testBranch1Pid }
      const { local } = await backchat.actions<IoApi>('io-fixture', opts)
      const result = await local({})
      expect(result).toEqual('local reply')
    })
    await t.step('second session', async () => {
      const branchPid = await create({ prefix: 'session' })
      const testBranch3Pid = addBranches(pid, 'session-3')
      expect(branchPid).toEqual(testBranch3Pid)
      const opts = { target: testBranch3Pid }
      const { local } = await backchat.actions<IoApi>('io-fixture', opts)
      const result = await local({})
      expect(result).toEqual('local reply')
    })
    await engine.stop()
  })
  Deno.test(prefix + 'internal requests', async (t) => {
    const { backchat, engine } = await cradleMaker()
    const repo = 'process/session'

    const { pid } = await backchat.init({ repo })

    await t.step('ping', async () => {
      const opts = { target: pid }
      const { branch } = await backchat.actions<IoApi>('io-fixture', opts)
      const result = await branch({})
      expect(result).toEqual('remote pong')
    })

    await engine.stop()
  })
  Deno.test(prefix + 'larger than 65k messages', async (t) => {
    const { backchat, engine } = await cradleMaker()
    const repo = 'process/session'

    const { pid } = await backchat.init({ repo })
    const ten = '0123456789'
    const data = ten.repeat(100000)
    expect(data.length).toBeGreaterThan(65535)

    await t.step('big branch', async () => {
      const opts = { target: pid }
      const { branch } = await backchat.actions<IoApi>('io-fixture', opts)
      const result = await branch({ data })
      expect(result).toEqual(data)
    })

    await engine.stop()
  })
}
