import type { SyncPrerecordedResponse } from '@deepgram/sdk'
import { speechToJson, type TranscriptionOptions } from './speech-to-json.ts'

Deno.test('transcribes spacewalk.wav', async () => {
  const path = '../../spacewalk.wav'
  const raw = await mockTranscribe({
    path,
    profanityFilter: true,
    diarization: true,
  })
  await Deno.writeTextFile(
    'example-transcript.json',
    JSON.stringify(raw, null, 2),
  )
})

const cacheFile = './test-cassettes.json'
let cassettes: Record<string, SyncPrerecordedResponse> = {}

try {
  cassettes = JSON.parse(await Deno.readTextFile(cacheFile))
} catch {
  // no-op if file doesn't exist yet
}

export const mockTranscribe = async (options: TranscriptionOptions) => {
  const key = btoa(JSON.stringify(options))
  if (cassettes[key]) {
    return cassettes[key]
  }
  const realResponse = await speechToJson(options)
  cassettes[key] = realResponse
  await Deno.writeTextFile(cacheFile, JSON.stringify(cassettes, null, 2))
  return realResponse
}
