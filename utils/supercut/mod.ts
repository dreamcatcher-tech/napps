import ytdl from '@distube/ytdl-core'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

export const createSupercut = async (
  youtubeUrl: string,
  segments: Array<{ start: string; end: string }>,
) => {
  // 1) Download full YouTube video data into memory
  const videoData = await (await ytdl(youtubeUrl, { filter: 'audioandvideo' }))
    .arrayBuffer()

  // 2) Prepare ffmpeg in-memory (wasm)
  const ffmpeg = new FFmpeg()
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  })

  // 3) Write the main input to ffmpeg's virtual FS
  await ffmpeg.writeFile('input.mp4', new Uint8Array(videoData))

  // 4) Extract each segment into a separate clip
  for (let i = 0; i < segments.length; i++) {
    const { start, end } = segments[i]
    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-ss',
      start,
      '-to',
      end,
      '-c',
      'copy',
      `clip_${i}.mp4`,
    ])
  }

  // 5) Write a concat list to stitch clips into a final supercut
  const concatText = segments
    .map((_, i) => `file 'clip_${i}.mp4'`)
    .join('\n')
  await ffmpeg.writeFile('clips.txt', new TextEncoder().encode(concatText))

  // 6) Concat all clips into 'supercut.mp4'
  await ffmpeg.exec([
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    'clips.txt',
    '-c',
    'copy',
    'supercut.mp4',
  ])

  // 7) Retrieve the final MP4 from the virtual FS
  const supercutData = await ffmpeg.readFile('supercut.mp4')

  // Return as a Blob (you can serve or store this Blob as needed)
  return new Blob([supercutData.buffer], { type: 'video/mp4' })
}
