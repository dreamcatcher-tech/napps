import { exists } from '@std/fs/exists'

const ENV_FILE = '.env'

export interface EnvKeyConfig {
  key: string
  friendlyName?: string
}

export const promptForEnvKeys = async (
  keys: EnvKeyConfig[],
): Promise<Record<string, string>> => {
  const envValues: Record<string, string> = {}

  // Try to read from .env file first
  if (await exists(ENV_FILE)) {
    const envText = await Deno.readTextFile(ENV_FILE)
    for (const line of envText.split('\n')) {
      const [k, v] = line.split('=')
      const trimmedKey = k?.trim()
      if (trimmedKey && keys.some((config) => config.key === trimmedKey)) {
        envValues[trimmedKey] = v?.trim() ?? ''
      }
    }
  }

  // Try localStorage for any missing keys
  for (const { key } of keys) {
    if (!envValues[key]) {
      const storedValue = localStorage.getItem(key)
      if (storedValue) {
        envValues[key] = storedValue
      }
    }
  }

  // Prompt for any remaining missing keys
  for (const { key, friendlyName } of keys) {
    if (!envValues[key]) {
      const displayName = friendlyName ?? key
      const value = prompt(`Enter ${displayName}:`)?.trim()
      if (!value) {
        throw new Error(`No value provided for ${displayName}`)
      }
      envValues[key] = value
      localStorage.setItem(key, value)
    }
  }

  // Set environment variables
  for (const [key, value] of Object.entries(envValues)) {
    Deno.env.set(key, value)
  }

  return envValues
}
