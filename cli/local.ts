#!/usr/bin/env -S deno run -A

import { parse } from 'https://deno.land/std@0.203.0/flags/mod.ts'
import { readNappConfig } from '@artifact/napp-tools'

const main = async () => {
  if (Deno.args.length < 2) {
    console.error('Usage: local.ts <napp> <tool> [--params ...]')
    Deno.exit(1)
  }

  // first arg = path to the local NAPP, e.g. "."
  const nappPath = Deno.args[0]
  // second arg = tool name to call, e.g. "youtube"
  const toolName = Deno.args[1]
  // remaining args (e.g. --url=...)
  const subArgs = Deno.args.slice(2)

  // load napp.json from the given path/package
  const config = await readNappConfig(nappPath)
  if (!config.tools || !config.tools[toolName]) {
    console.error(`Tool not found: "${toolName}"`)
    Deno.exit(1)
  }

  // parse command line flags
  const parsed = parse(subArgs)
  console.log(`NAPP: ${nappPath}`)
  console.log(`Tool: ${toolName}`)
  console.log(`Parameters:`, parsed)

  // In a real script, you'd now invoke the actual code that implements the tool.
  // For instance, run the transcriber logic using parsed.url, etc.
}

if (import.meta.main) {
  await main()
}
