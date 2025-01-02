import { Command } from "npm:commander";
import { promptForEnvKeys } from "../../utils/helpers/envcheck.ts";
import { syncMoneyWorks } from "./mod.ts";
import { version } from "./deno.json" with { type: "json" };

const program = new Command();

// Define required environment variables
const requiredEnvKeys = [
  { key: "MONEYWORKS_API_KEY", friendlyName: "MoneyWorks API Key" },
  { key: "MONEYWORKS_URL", friendlyName: "MoneyWorks Server URL" },
];

program
  .name("moneyworks-sync")
  .description("CLI for syncing MoneyWorks XML data with Git storage.")
  .version(version);

program
  .command("sync")
  .description(
    "Run a sync cycle (prompts for environment variables if missing).",
  )
  .option("--poll-interval <seconds>", "Override poll interval", "60")
  .action(async ({ pollInterval }: { pollInterval: string }) => {
    try {
      // Verify or prompt for required env vars, then store them in localStorage
      const envData = await promptForEnvKeys(requiredEnvKeys);

      // Now run the sync cycle
      await syncMoneyWorks({ pollInterval: parseInt(pollInterval, 10) });
      Deno.exit(0);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("❌ Sync failed:", msg);
      Deno.exit(1);
    }
  });

program.parse(Deno.args, { from: "user" });
