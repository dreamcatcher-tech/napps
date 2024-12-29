import { audio } from '@dreamcatcher/youtube'
import {
  transcribe,
  type TranscriptionOptions,
} from '@dreamcatcher/speech-to-text'

interface YoutubeOptions {
  url: string
  /** Path to the output transcript file */
  path: string
}

export const youtube = async ({ url, path }: YoutubeOptions) => {
  // first download the video using the youtube tool
  // set the location of the path of the video audio

  const prefix = path.endsWith('.txt') ? path.slice(0, -4) : path
  console.log('fetching audio', prefix)
  const audioPath = await audio(url, prefix)

  const options: TranscriptionOptions = {
    path: audioPath,
    diarization: true,
    fillerWords: false,
    profanityFilter: true,
  }
  const transcript = await transcribe(options)
  console.log(transcript)
  await Deno.writeTextFile(path, transcript)
}

// need this to be mocked, so if we have the test file, just keep using that
