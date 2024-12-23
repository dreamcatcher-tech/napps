import { transcribe } from './mod.ts'

Deno.test('transcribes spacewalk.wav', async () => {
  const raw = await transcribe('../../spacewalk.wav', {
    profanityFilter: true,
    diarization: true,
  })
  console.log('Raw data:', raw)
  await Deno.writeTextFile(
    'example-transcript.json',
    JSON.stringify(raw, null, 2),
  )
})
