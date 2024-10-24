import { cradleMaker } from '@/cradle-maker.ts'
import { type CradleMaker, getRoot, Provisioner } from '@/constants.ts'

export const actorId = 'testerActorId'

export const infoPath = 'info/test-format.md'
export const requesterPath = 'agents/test-requester.md'
export const assessorPath = 'agents/test-assessor.md'
export const fileRunnerPath = 'agents/test-file-runner.md'
export const meetingsPath = 'agents/meetings.md'
export const routerPath = 'agents/router.md'
export const reasonerPath = 'agents/reasoner.md'

export const firstTestPath = 'tests/fixtures/test-file-runner.test.md'
export const secondTestPath = 'tests/fixtures/second.test.md'
export const meetingTestPath = 'tests/meetings.test.md'
export const routerTestPath = 'tests/router.test.md'
export const testFixturePath = 'tests/test-fixture.test.md'
export const testRunnterTestPath = 'tests/test-file-runner.test.md'
export const reasonerTestPath = 'tests/reasoner.test.md'

export const info = await Deno.readTextFile('./HAL/' + infoPath)
export const requester = await Deno.readTextFile('./HAL/' + requesterPath)
export const assessor = await Deno.readTextFile('./HAL/' + assessorPath)
export const fileRunner = await Deno.readTextFile('./HAL/' + fileRunnerPath)
export const meetings = await Deno.readTextFile('./HAL/' + meetingsPath)
export const router = await Deno.readTextFile('./HAL/' + routerPath)
export const testFixture = await Deno.readTextFile('./HAL/' + testFixturePath)
export const reasoner = await Deno.readTextFile('./HAL/' + reasonerPath)

export const firstTest = await Deno.readTextFile(firstTestPath)
export const secondTest = await Deno.readTextFile(secondTestPath)
export const meetingTest = await Deno.readTextFile('./HAL/' + meetingTestPath)
export const routerTest = await Deno.readTextFile('./HAL/' + routerTestPath)
export const testRunnerTest = await Deno.readTextFile(
  './HAL/' + testRunnterTestPath,
)
export const reasonerTest = await Deno.readTextFile('./HAL/' + reasonerTestPath)

const init: Provisioner = async (backchat) => {
  // TODO be able to write a large number of files and do a single commit
  // possibly by calling commit directly
  // or by allowing an array of writes as in writeMany

  const promises = []
  const target = getRoot(backchat.pid)

  promises.push(backchat.write(infoPath, info, target))
  promises.push(backchat.write(requesterPath, requester, target))
  promises.push(backchat.write(assessorPath, assessor, target))
  promises.push(backchat.write(fileRunnerPath, fileRunner, target))
  promises.push(backchat.write(meetingsPath, meetings, target))
  promises.push(backchat.write(routerPath, router, target))
  promises.push(backchat.write(reasonerPath, reasoner, target), target)

  // seems to overload the atomic mutations limit if all at once
  await Promise.all(promises)
  promises.length = 0

  promises.push(backchat.write(firstTestPath, firstTest, target))
  promises.push(backchat.write(secondTestPath, secondTest, target))
  promises.push(backchat.write(meetingTestPath, meetingTest, target))
  promises.push(backchat.write(routerTestPath, routerTest, target))
  promises.push(backchat.write(testFixturePath, testFixture, target))
  promises.push(backchat.write(testRunnterTestPath, testRunnerTest, target))
  promises.push(backchat.write(reasonerTestPath, reasonerTest, target))

  await Promise.all(promises)
}

export const fixture: CradleMaker = async (
  t: Deno.TestContext,
  url: string,
  update?: 'updateSnapshots',
) => {
  return await cradleMaker(t, url, update, init)
}

// Ideally we would get rid of HAL and just have napps.
