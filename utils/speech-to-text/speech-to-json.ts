import { createClient, type TranscriptionSchema } from '@deepgram/sdk'

export type TranscriptionOptions = {
  path: string
  profanityFilter?: boolean
  diarization?: boolean
  fillerWords?: boolean
}

export const speechToJson = async (
  { path, profanityFilter = true, diarization = true, fillerWords = false }:
    TranscriptionOptions,
) => {
  const apiKey = Deno.env.get('DEEPGRAM_API_KEY')
  if (!apiKey) {
    throw new Error('DEEPGRAM_API_KEY is not set')
  }
  const deepgram = createClient(apiKey)

  const transcribeOptions: TranscriptionSchema = {
    'profanity_filter': profanityFilter,
    diarize: diarization,
    fillers: fillerWords,
    model: 'nova-2-meeting',
  }

  try {
    let result
    const isRemote = path.startsWith('http')
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
    if (!result) {
      throw new Error('No result from transcription')
    }
    return result
  } catch (error) {
    // deno-lint-ignore no-console
    console.error('Transcription error:', error)
    throw error
  }
}

export const selfCheckApiKey = async (): Promise<boolean> => {
  console.log('🔑  Checking Deepgram API key…')
  try {
    const apiKey = Deno.env.get('DEEPGRAM_API_KEY')
    if (!apiKey) {
      throw new Error('DEEPGRAM_API_KEY is not set')
    }
    const deepgram = createClient(apiKey)
    await deepgram.manage.getProjects()
    console.log('✅  Deepgram API key is valid')
    return true
  } catch (_) {
    console.error('❌  Deepgram API key is invalid')
    console.error('was loading from: ', Deno.cwd() + '/.env')
    return false
  }
}
