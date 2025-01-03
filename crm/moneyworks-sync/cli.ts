import { Command } from 'npm:commander'
import denoJson from './deno.json' with { type: 'json' }
import { clearEnvStorage, promptForEnvKeys } from '@dreamcatcher/helpers'
// import { syncMoneyWorks } from './mod.ts'

const requiredEnvKeys = [
  { key: 'MONEYWORKS_SECURE_URL', friendlyName: 'MoneyWorks Secure URL' },
  { key: 'GIT_REPO_URL', friendlyName: 'Git Repository URL' },
  { key: 'GIT_REPO_KEY', friendlyName: 'Git Repository Key' },
]

const program = new Command()

program
  .name('moneyworks-sync')
  .description(
    'Continuously polls MoneyWorks for new/updated records, commits them to a ' +
      '`moneyworks` branch, and monitors a `changes` branch to apply edits back ' +
      'into MoneyWorks for full two-way sync.',
  )
  .version(denoJson.version)
  .option('--clear', 'Clear stored environment variables before running')
  .action(async (options) => {
    try {
      if (options.clear) {
        clearEnvStorage()
        // deno-lint-ignore no-console
        console.log('Cleared stored environment variables')
      }
      await promptForEnvKeys(requiredEnvKeys)
      // await syncMoneyWorks()
      Deno.exit(0)
    } catch (err) {
      // deno-lint-ignore no-console
      console.error('❌ Sync failed:', err instanceof Error ? err.message : err)
      Deno.exit(1)
    }
  })

program.parse(Deno.args, { from: 'user' })
