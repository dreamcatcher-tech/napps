// Copyright 2023-2024 the Deno authors. All rights reserved. MIT license.
/**
 * This script is used to restore a KV database by a file generated by the dump
 * script.
 *
 * @example
 * ```bash
 * deno task db:restore backup.json
 * ```
 */
import { kv } from '@/utils/db.ts'

interface StoredKvU64 {
  value: string
}

function isStoredKvU64(value: unknown): value is StoredKvU64 {
  return (value as StoredKvU64).value !== undefined &&
    typeof (value as StoredKvU64).value === 'string'
}

function reviver(_key: unknown, value: unknown) {
  return isStoredKvU64(value) ? new Deno.KvU64(BigInt(value.value)) : value
}

if (!confirm('WARNING: The database will be restored. Continue?')) Deno.exit()

const [filePath] = Deno.args
if (filePath === undefined) throw new Error('File path must be defined')

const rawEntries = Deno.readTextFileSync(filePath)
const entries = JSON.parse(rawEntries, reviver) as Omit<
  Deno.KvEntry<unknown>,
  'versionstamp'
>[]

const promises = []
for (const { key, value } of entries) promises.push(kv.set(key, value))
await Promise.all(promises)

kv.close()
