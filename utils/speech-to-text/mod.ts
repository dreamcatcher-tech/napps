import { speechToJson } from './speech-to-json.ts'
export { selfCheckApiKey } from './speech-to-json.ts'
import { transcriptToText } from './json-to-text.ts'
export type TranscriptionOptions = {
  /** Path to the audio file to transcribe */
  path: string
  /** Whether to filter out profanity */
  profanityFilter?: boolean
  /** Whether to enable diarization */
  diarization?: boolean
  /** Whether to include filler words */
  fillerWords?: boolean
}

export const transcribe = async (
  options: TranscriptionOptions,
): Promise<string> => {
  const json = await speechToJson(options)
  const text = transcriptToText(json)

  const outputPath = options.path.replace(/\.[^/.]+$/, '') + '.txt'
  await Deno.writeTextFile(outputPath, text)
  return outputPath
}
