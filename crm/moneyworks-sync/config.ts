import { z } from 'zod'

/**
 * The Config for MoneyWorks Sync.  This file is stored in the moneyworks
 * branch, and is used to track the state of the sync process.
 */
export const configSchema = z.object({
  /** The list of tables to poll for changes on, as well as the last modified
   * time of the latest item we received from the table, or -1 if nothing has
   * been received yet */
  tables: z.object({
    Name: z.number().default(-1),
    Transaction: z.number().default(-1),
  }),
  /** The interval to poll the tables at */
  pollInterval: z.number(),

  /** The last sync time with the MoneyWorks server */
  lastSync: z.number().default(-1),
})

export type Config = z.infer<typeof configSchema>

export interface Git {
}

export const CONFIG_PATH = 'config.json'
