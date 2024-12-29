import { Command } from 'commander'
import { youtube } from './mod.ts'
import { getApiKey } from './envcheck.ts'

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
      const apiKey = await getApiKey()
      Deno.env.set('DEEPGRAM_API_KEY', apiKey)
      console.log('Using API Key:', apiKey.slice(0, 4) + '...')

      await youtube({ url, path })
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
    // TODO: implement file transcription
    console.log(
      `File transcription not implemented. Input: ${input}, Output: ${output}`,
    )
  })

program.parse(Deno.args, { from: 'user' })
