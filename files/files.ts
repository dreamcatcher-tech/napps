// import { Debug } from '@utils'
// import { Functions, print } from '@/constants.ts'
// import { type Api, parameters, returns } from '@/api/isolates/files.ts'
// export { type Api, parameters, returns }

// const log = Debug('AI:files')

// export const functions: Functions<Api> = {
//   // TODO this should be a full mirror of the IsolateApi functions
//   write: ({ path, content = '' }, api) => {
//     log('add', path, content)
//     api.write(path, content)
//     return { charactersWritten: content.length }
//   },
//   ls: async ({ path = '.', count, all }, api) => {
//     log('ls', path)
//     let result = await api.ls(path)
//     if (!all) {
//       result = result.filter((name) => !name.startsWith('.'))
//     }
//     if (count) {
//       return result.length
//     }
//     return result
//   },
//   read: async ({ path }, api) => {
//     log('read', path, print(api.pid))
//     const result = await api.read(path)
//     log('read result', result)
//     return result
//   },
//   // TODO migrate this to be linecount updates, not regex
//   update: async ({ expectedMatches, path, regex, replacement }, api) => {
//     log('update', expectedMatches, path, regex, replacement)
//     const contents = await api.read(path)
//     const { matches, result } = replace(contents, regex, replacement)
//     if (matches.length !== expectedMatches) {
//       throw new Error(
//         `Expected ${expectedMatches} matches but found ${matches.length}`,
//       )
//     }
//     api.write(path, result)
//     return { matchesUpdated: matches.length }
//   },
//   // TODO make a json update tool that specifies a path in the object to change
//   // by using a standard json path specification
//   rm: ({ path }, api) => {
//     log('rm', path)
//     api.delete(path)
//   },
//   mv: ({ from, to }, api) => {
//     log('mv', from, to)
//     return api.mv(from, to)
//   },
//   cp: ({ from, to }, api) => {
//     log('cp', from, to)
//     return api.cp(from, to)
//   },
//   search: async ({ query }, api) => {
//     log('search', query, print(api.pid))

//     // to start with, this function should just return all the file paths ?
//     // or, read everything in, and make a call based on the contents of all ?

//     // read all files and then pump into context, who cares about the price ?
//     // or vector store them all based on dir hashes ?
//     const ls = await api.ls()
//     return ls.map((path) => ({ path, description: '' }))
//   },
// }
// export const replace = (
//   contents: string,
//   regex: string,
//   replacement: string,
// ) => {
//   const matches = contents.match(new RegExp(regex, 'g')) || []
//   const result = contents.replace(new RegExp(regex, 'g'), replacement)
//   return { matches, result }
// }

/**
 * This is a comment
 */
export const m = 43;
