import { audio } from '@dreamcatcher/youtube'
import {
  selfCheckApiKey,
  transcribe,
  type TranscriptionOptions,
} from '@dreamcatcher/speech-to-text'

interface YoutubeOptions {
  url: string
  /** Path to the output transcript file */
  path: string
}

export const youtube = async ({ url, path }: YoutubeOptions): Promise<void> => {
  if (!(await selfCheckApiKey())) {
    throw new Error('Invalid Deepgram API key')
  }
  console.log('📂 current directory:', Deno.cwd())
  const prefix = path.endsWith('.txt') ? path.slice(0, -4) : path

  console.log(`🎬  Downloading audio from: ${url}`)
  const audioPath = await audio(url, prefix)
  console.log(`✅  Audio download complete: ${audioPath}`)

  console.log('💿  Starting transcription…')
  const options: TranscriptionOptions = {
    path: audioPath,
    diarization: true,
    fillerWords: false,
    profanityFilter: true,
  }
  const transcriptPath = await transcribe(options)
  console.log('📝  Transcription finished')
  console.log(`🎉  Done. Transcript saved to: ${transcriptPath}`)
}
