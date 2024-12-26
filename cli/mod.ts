import { program } from 'commander'

// 1) Hard-coded registry of CLI command => bare import name
//    Adjust as needed to map your actual NAPP packages.
const nappRegistry: Record<string, string> = {
  'my-napp1': '@artifact/my-napp1',
  'my-napp2': '@artifact/my-napp2',
}

// Because dynamic imports are async, we wrap our setup in an async function.
async function setupCommands() {
  // For each command name, import the corresponding napp.json
  for (const [cmdName, importName] of Object.entries(nappRegistry)) {
    try {
      // 2) Import that napp’s config
      //    - This assumes the package actually has "napp.json" at its root
      //    - and that your import map or environment can resolve "bare import"/napp style
      const { default: config } = await import(`${importName}/napp.json`, {
        // "with: { type: 'json' }" is a Deno option; for Node you might do something else or use a bundler.
        with: { type: 'json' },
      })

      // 3) Create a top-level command named after cmdName
      //    We'll default the description to config.description or a fallback
      const topCommand = program
        .command(cmdName)
        .description(
          config.description ?? `NAPP: ${config.name} (v${config.version})`,
        )

      // 4) If the NAPP has "tools", we’ll create a subcommand for each
      if (config.tools && typeof config.tools === 'object') {
        for (const [toolName, toolDef] of Object.entries(config.tools)) {
          // toolDef might be a string referencing a napp or an object containing details
          if (typeof toolDef === 'string') {
            // e.g. "some-other-napp" if referencing another agent or napp.
            topCommand
              .command(toolName)
              .description(`(Passthrough to NAPP: ${toolDef})`)
              .action(() => {
                console.log(
                  `[${cmdName}/${toolName}] This tool references another NAPP: "${toolDef}"`,
                )
              })
          } else {
            // A normal object with description, parameters, etc.
            const desc = typeof toolDef.description === 'string'
              ? toolDef.description
              : `(No description)`

            topCommand
              .command(toolName)
              .description(desc)
              .action(() => {
                // In a real scenario, you'd parse user args, validate parameters, etc.
                console.log(
                  `[${cmdName}/${toolName}] Running tool with config:`,
                  toolDef,
                )
                console.log(`(Mock) Execution complete.`)
              })
          }
        }
      } else {
        // If no tools, we can just log or do nothing
        topCommand.action(() => {
          console.log(`NAPP "${config.name}" does not define any tools.`)
        })
      }
    } catch (err) {
      // If the napp.json import failed, set up a dummy command that warns the user.
      program
        .command(cmdName)
        .description(`Failed to load NAPP from ${importName}`)
        .action(() => {
          console.error(`Error loading napp.json from ${importName}:\n`, err)
        })
    }
  }
}

if (import.meta.main) {
  console.log('Running napp')
  await setupCommands()
  program.parseAsync(Deno.args, { from: 'user' })
}
