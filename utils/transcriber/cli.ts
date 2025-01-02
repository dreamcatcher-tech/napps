import { Command } from 'commander'
import { youtube } from './mod.ts'
import { promptForEnvKeys } from '../helpers/envcheck.ts'

const program = new Command()

program
  .name('transcriber')
  .description('A CLI for transcribing audio or video content.')
  .version('0.0.1')

program
  .command('youtube')
  .description('Transcribe a YouTube video.')
  .requiredOption('-u, --url <url>', 'YouTube video URL')
  .option('-p, --path <path>', 'Output transcript path', 'transcript.txt')
  .action(async ({ url, path }) => {
    try {
      const values = await promptForEnvKeys([{
        key: 'DEEPGRAM_API_KEY',
      }])
      if (!values['DEEPGRAM_API_KEY']) {
        throw new Error('Failed to get Deepgram API key')
      }
      console.log(
        'Using API Key:',
        values['DEEPGRAM_API_KEY'].slice(0, 4) + '...',
      )

      await youtube({ url, path })

      // TODO do the speaker name prompting here, so that inside the CLI is
      // where all the CLI interaction logic is
      // this would break up the export into two calls, one to download the
      // youtube audio and transcribe it, then the other to name the speakers
      // and output in a given format

      Deno.exit(0)
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error)
      console.error('❌ Transcription failed:', msg)
      Deno.exit(1)
    }
  })

program
  .command('file')
  .description('Transcribe a local audio file.')
  .requiredOption('-i, --input <path>', 'Path to audio file')
  .option('-o, --output <path>', 'Output transcript path', 'transcript.txt')
  .action(({ input, output }) => {
    // TODO implement file transcription
    console.log(
      `File transcription not implemented. Input: ${input}, Output: ${output}`,
    )
  })

program.parse(Deno.args, { from: 'user' })
