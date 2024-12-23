import type { SyncPrerecordedResponse } from '@deepgram/sdk'

export const transcriptToText = (data: SyncPrerecordedResponse): string => {
  const words = data?.results?.channels?.[0]?.alternatives?.[0]?.words
  if (!words || !Array.isArray(words) || words.length === 0) {
    throw new Error('No words found in the transcript')
  }

  const firstWord = words[0]
  if (firstWord?.speaker === undefined || firstWord?.start === undefined) {
    throw new Error('No speaker or start found in the transcript')
  }

  const output: string[] = []
  let currentSpeaker = firstWord.speaker
  let currentStart = firstWord.start
  let currentText: string[] = []

  for (let i = 0; i < words.length; i++) {
    const { word = '', speaker = 0, start = 0 } = words[i] || {}

    // If speaker changes, finalize the previous segment
    if (speaker !== currentSpeaker) {
      output.push(
        `Speaker ${currentSpeaker} (${currentStart}s): ${
          currentText.join(' ')
        }`,
      )
      currentSpeaker = speaker
      currentStart = start
      currentText = []
    }

    currentText.push(word)
  }

  // Finalize the last segment
  output.push(
    `Speaker ${currentSpeaker} (${currentStart}s): ${currentText.join(' ')}`,
  )

  return output.join('\n')
}
