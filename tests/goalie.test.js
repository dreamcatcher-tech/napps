import { expect, goal, debug } from '../src/test-context'

goal('what files do I have ?', async ({ result }) => {
  debug(result)
  const files = ['.git', 'helps', '.io.json', 'chat-1.session.json']
  files.forEach((file) => {
    expect(result).toContain(file)
  })
})
goal.only('add a file named "hello.txt"', async ({ result, task }) => {
  debug(result)
  expect(result).toContain('hello')
})
