import { transcriptToText } from './json-to-text.ts'
import { assert, assertStringIncludes } from '@std/assert'
import exampleTranscript from './example-transcript.json' with { type: 'json' }

Deno.test('transcriptToText returns expected output', () => {
  // Minimal mock data

  const output = transcriptToText(exampleTranscript)

  console.log(output)

  assert(output.length > 0, 'Output should not be empty.')

  assertStringIncludes(output, 'Speaker 0 (0.08s):')
})
