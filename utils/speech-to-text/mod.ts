import { createClient, type TranscriptionSchema } from '@deepgram/sdk'
import { load } from '@std/dotenv'

// Load environment variables from .env file
const env = await load()
console.log(env)
const deepgram = createClient(env['DEEPGRAM_API_KEY'] || '')

// needs to be able to take in an object.
// should check it against a schema ?

export const transcribe = async (path: string, {
  service = 'deepgram',
  profanityFilter = true,
  diarization = true,
  fillerWords = false,
} = {}) => {
  const isRemote = path.startsWith('http')
  const transcribeOptions: TranscriptionSchema = {
    'profanity_filter': profanityFilter,
    diarize: diarization,
    fillers: fillerWords,
    model: 'nova-2-meeting',
  }

  try {
    let result
    if (isRemote) {
      const { result: r } = await deepgram.listen.prerecorded.transcribeUrl(
        { url: path },
        transcribeOptions,
      )
      result = r
    } else {
      const fileBytes = await Deno.readFile(path)
      const { result: r } = await deepgram.listen.prerecorded.transcribeFile(
        fileBytes,
        transcribeOptions,
      )
      result = r
    }

    return result
  } catch (error) {
    console.error('Transcription error:', error)
    throw error
  }
}
