import { speechToJson } from './speech-to-json.ts'
export { selfCheckApiKey } from './speech-to-json.ts'
import { transcriptToText } from './json-to-text.ts'
export type TranscriptionOptions = {
  path: string
  profanityFilter?: boolean
  diarization?: boolean
  fillerWords?: boolean
}

export const transcribe = async (options: TranscriptionOptions) => {
  const json = await speechToJson(options)
  return transcriptToText(json)
}
