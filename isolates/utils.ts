import validator from '@/io/validator.ts'
import * as completions from './ai-completions.ts'
import { ApiFunctions, Functions, IA } from '@/constants.ts'
import { Isolate } from '@/isolates/index.ts'
import { assert, Debug, expect } from '@utils'

const log = Debug('AI:utils')

export const api = {
  delay: {
    description:
      `Delays the execution of the next command by the specified number of milliseconds and then returns the current date and time in the format used by the system locale.  For example the following function input parameters:
    
      const milliseconds = 1000

      would result in the call:

      await new Promise(resolve => setTimeout(resolve, milliseconds))

      which would delay the execution of the next command by 1 second, and then would return the result of calling:

      new Date().toLocaleString()
      `,
    type: 'object',
    additionalProperties: false,
    required: ['milliseconds'],
    properties: {
      milliseconds: { type: 'integer', minimum: 1 },
    },
  },
  relay: {
    description:
      `Returns the last tool call results and ends the AI conversation.  Useful where one AI is calling another AI and you want to relay the results back to the original caller without consuming any extra tokens or effect from the executing AI.`,
    type: 'object',
    additionalProperties: false,
    properties: {},
  },
  trueOrFalse: {
    description:
      `Make a tool call with either true or false as the value.  Used as a way to trigger exit calls from an AI model, rather than relying on text based results which can be unreliable`,
    type: 'object',
    additionalProperties: false,
    required: ['value'],
    properties: {
      value: { type: 'boolean' },
    },
  },
}
export type Api = {
  delay: (params: { milliseconds: number }) => Promise<string>
  relay: () => string
  trueOrFalse: (params: { value: boolean }) => void
}
export const functions: Functions<Api> = {
  delay: async ({ milliseconds }) => {
    await new Promise((resolve) => setTimeout(resolve, milliseconds))
    return new Date().toLocaleString()
  },
  relay: () => {
    return '@@ARTIFACT_RELAY@@'
  },
  trueOrFalse: (params: { value: boolean }) => {
    throw new Error('Never execute this function: ' + params.value)
  },
}

export const halt = async <T extends ApiFunctions>(
  content: string,
  path: string,
  isolate: Isolate,
  name: keyof T,
  api: IA,
) => {
  const { once } = await api.actions<completions.Api>('ai-completions')
  const assistant = await once({ path, content })
  assert(assistant.tool_calls, 'tool_calls missing from once call')
  assert(assistant.tool_calls.length === 1, 'tool_calls length is not 1')
  const result = assistant.tool_calls[0]
  log('result', result)
  assert(typeof name === 'string', 'name is not a string')

  expect(result.function.name).toEqual(`${isolate}_${name}`)
  const schema = await api.apiSchema(isolate)
  const parsed = JSON.parse(result.function.arguments)

  assert(typeof parsed === 'object', 'parsed is not an object')
  validator(schema, name)(parsed)
  return parsed
}
