import type { SyncPrerecordedResponse } from '@deepgram/sdk'

export const transcriptToText = (data: SyncPrerecordedResponse): string => {
  const words = data?.results?.channels?.[0]?.alternatives?.[0]?.words
  if (!words || !Array.isArray(words) || words.length === 0) {
    throw new Error('No words found in the transcript')
  }

  const { created, duration, channels } = data?.metadata || {}
  if (!created || !duration || !channels) {
    throw new Error('Missing required metadata fields')
  }
  const firstWord = words[0]
  if (firstWord?.speaker === undefined || firstWord?.start === undefined) {
    throw new Error('No speaker or start found in the transcript')
  }

  const conversationStart = firstWord.start
  const conversationEnd = words[words.length - 1]?.end ??
    words[words.length - 1]?.start ?? 0
  const conversationDuration = (conversationEnd - conversationStart).toFixed(2)
  const speakers = new Set(words.map(({ speaker }) => speaker))

  const header = [
    `Date: ${created}`,
    `Transcription Duration: ${duration.toFixed(2)} seconds`,
    `Conversation Duration: ${conversationDuration} seconds`,
    `Channels: ${channels}`,
    `Number of Speakers: ${speakers.size}`,
  ].join('\n')

  const output: string[] = []
  let currentSpeaker = firstWord.speaker
  let currentStart = firstWord.start
  let currentText: string[] = []

  for (let i = 0; i < words.length; i++) {
    const { word = '', speaker = 0, start = 0 } = words[i] || {}
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

  output.push(
    `Speaker ${currentSpeaker} (${currentStart}s): ${currentText.join(' ')}`,
  )

  return `${header}\n\n${output.join('\n')}`
}
