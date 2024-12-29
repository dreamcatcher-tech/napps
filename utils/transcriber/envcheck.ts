import { exists } from '@std/fs/exists'

const ENV_FILE = '.env'
const API_KEY = 'DEEPGRAM_API_KEY'

export const getApiKey = async (): Promise<string> => {
  let apiKey = ''

  if (await exists(ENV_FILE)) {
    const envText = await Deno.readTextFile(ENV_FILE)
    for (const line of envText.split('\n')) {
      const [k, v] = line.split('=')
      if (k?.trim() === API_KEY) {
        apiKey = v?.trim() ?? ''
        break
      }
    }
    if (apiKey) {
      return apiKey
    }
  }

  apiKey = localStorage.getItem(API_KEY) ?? ''
  if (apiKey) {
    return apiKey
  }

  Deno.stdout.writeSync(new TextEncoder().encode('Enter DeepgramAPI key: '))
  const buf = new Uint8Array(1024)
  const n = <number> await Deno.stdin.read(buf)
  apiKey = new TextDecoder().decode(buf.subarray(0, n)).trim()

  localStorage.setItem(API_KEY, apiKey)
  return apiKey
}
