import { test, expect, debug } from '../test-context'
debug.enable('AI:engage-help, AI:runner-chat')
const isolate = 'engage-help'
const help = 'help.fixture'

test('tool call', async function ({ artifact }) {
  const { engage } = await artifact.actions(isolate)
  const text = 'call the "local" function'
  const result = await engage({ help, text })
  expect(result).toContain('function was called')
})
test('error tool call', async function ({ artifact }) {
  const { engage } = await artifact.actions(isolate)
  const text = 'call the "error" function with the message: "bob"'
  await engage({ help, text })
  const io = await artifact.readIO()
  expect(io.inputs[1].name).toBe('error')
  expect(io.outputs[1].error.message).toBe('bob')
})
test('chat', async ({ artifact }) => {
  const { engage } = await artifact.actions(isolate)
  const text = 'say a single "x" character and do not call any functions'
  const result = await engage({ help, text })
  expect(result).toEqual('x')
})
test('calling another help file', async ({ artifact }) => {
  // this is where one executing help file needs to call another on, in another
  // branch.
  const text = 'ask the calculator tool what five time five is'

  // give it the command to find suitable helps
  // give it the command to execute the helps it finds in a new branch only
  // this would be 'spawn-help' vs 'self-help'
})
test('multi step', async ({ artifact }) => {
  // when the help hasn't finished, but it sends back a message to the parent
  // that it can't continue on without the response.
  // like if adding a customer, and the request is missing name info.
})
test.skip('add a file to the database')
test.skip('editing the help and rerunning it')

// get the GUI back up to parity
// make some manual helps to ensure the calling is correct, like db add
// implement stuck finder crudely, using a big ass GPT call
// create stucks using stuckloop
// use embeddings to do help finds

// make some tools to write helps, so it stores them in json, so we can load
// from fs directly
