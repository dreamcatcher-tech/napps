import { audio, video } from './mod.ts'
import { expect } from '@std/expect'
const opts = { sanitizeResources: false, sanitizeOps: false }

Deno.test('audio download', opts, async () => {
  const url = 'https://www.youtube.com/watch?v=0o3t35Nt8HI'
  const prefix = './test-audio'

  const tempFile = await audio(url, prefix)
  registerCleanup(tempFile)
  const fileInfo = await Deno.stat(tempFile)
  expect(fileInfo.isFile).toBe(true)
  expect(fileInfo.size).toBeGreaterThan(0)
  expect(tempFile.endsWith('.webm')).toBe(true)
})

Deno.test('video download', opts, async () => {
  const url = 'https://www.youtube.com/watch?v=0o3t35Nt8HI'
  const prefix = './test-video'

  const tempFile = await video(url, prefix)
  registerCleanup(tempFile)
  const fileInfo = await Deno.stat(tempFile)
  expect(fileInfo.isFile).toBe(true)
  expect(fileInfo.size).toBeGreaterThan(0)
  expect(tempFile.endsWith('.webm')).toBe(true)
})

function registerCleanup(file: string) {
  globalThis.addEventListener('unload', async () => {
    try {
      await Deno.remove(file)
    } catch {
      // ignore errors
    }
  })
}
