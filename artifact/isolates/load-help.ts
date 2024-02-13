import * as posix from 'https://deno.land/std@0.213.0/path/posix/mod.ts'
import { IsolateApi } from '@/artifact/constants.ts'
import { Help } from '@/artifact/constants.ts'

export const api = {
  load: {
    description:
      'load the help by name.  Will convert the help to a path using `/helps/${name}.json`, and then will return the json object from loading and parsing this file',
    type: 'object',
    additionalProperties: false,
    required: ['help'],
    properties: {
      help: {
        description: 'the name of the help',
        type: 'string',
      },
    },
  },
  loadAll: {
    description: 'load all the helps',
    type: 'object',
    additionalProperties: false,
    properties: {},
  },
}

export const functions = {
  load: async ({ help }: { help: string }, api: IsolateApi) => {
    const object = await api.readJSON(`helps/${help}.json`) as Help
    // TODO do some format checking
    return object
  },
  loadAll: async (_: object, api: IsolateApi) => {
    // TODO provide a glob as first arg
    const helps = []
    const files = await api.ls('helps')
    for (const file of files) {
      if (file.endsWith('.json')) {
        const name = posix.basename(file, posix.extname(file))
        const help = await functions.load({ help: name }, api)
        helps.push({ name, help })
      }
    }
    return helps
  },
}
