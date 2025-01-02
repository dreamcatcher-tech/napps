# MoneyWorks XML Git Sync

This module continuously synchronizes the `Name` and `Transaction` tables (and
eventually others) from a MoneyWorks server into a git-based file store. It also
watches a dedicated `changes` branch to apply any external edits back into
MoneyWorks, ensuring full two-way synchronization with a reliable audit trail.

## Overview

- **MoneyWorks Branch (`moneyworks`)**\
  Mirrors the authoritative state of the MoneyWorks server. Updated exclusively
  by this module after polling the remote MoneyWorks REST API.

- **Changes Branch (`changes`)**\
  Holds new or modified XML files submitted by other processes for insertion
  into MoneyWorks.\
  This module periodically checks `changes` for edits:
  1. Temporarily **pauses** polling from the MoneyWorks server.
  2. Applies those record changes to MoneyWorks via the REST API.
  3. Polls again to confirm the server now matches.
  4. Merges `changes` back into `moneyworks` so both branches match.
  5. **Resumes** normal polling.

- **Audit Trail in Git**\
  Every XML record has its own version history, so any changes (including those
  coming from MoneyWorks or user edits) are recorded in commits.

- **Batching & Large Data**\
  This module handles large data sets in chunks. Both polling from MoneyWorks
  and pushing updates back is done in manageable batches, preventing timeouts or
  giant commits.

- **Anonymization Tool**\
  An optional `anonymize.ts` can randomize sensitive data for local testing or
  demos. **Never** commit anonymized data to the main repo.

## High-Level Flow

1. **Startup / Configuration**
   - Loads MoneyWorks server connection info (URL, credentials) and git repo
     details (branch names, polling intervals, etc.).
   - By default, only the `Name` and `Transaction` tables are synced. Future
     expansions could include more tables.

2. **Polling (Default Cycle)**
   - At each poll interval, fetches newly updated or created MoneyWorks records
     since the last sync.
   - Commits those changes to the `moneyworks` branch, preserving a full diff.

3. **Watching `changes`**
   - If external edits or config changes appear on `changes`, the module
     temporarily stops polling.
   - It merges those changes into MoneyWorks via REST, then re-polls to confirm
     the database matches.
   - If no conflicts, merges everything back into `moneyworks`.

4. **Conflict Handling**
   - In rare cases where MoneyWorks changes conflict with `changes`, the commit
     to MoneyWorks fails.
   - A human or external conflict-resolution process would step in. This module
     will log the conflict and halt further writes until resolved.

5. **Completion / Resume**
   - Once the `moneyworks` branch fully reflects any new changes, polling
     resumes at the configured interval.

## CLI Usage

You can run this module from the command line with Deno. It requires environment
variables like MoneyWorks credentials, the git repo URL, and poll intervals.

### Prerequisites

- **Deno** (latest stable)
- **Git** repo accessible to this module
- Appropriate permissions for environment variables, file I/O, and network

### Environment Variables

1. **MONEYWORKS_SECURE_URL** – e.g.
   `https://user:pass@example.moneyworks.net:6710`
2. **GIT_REPO_URL** – the remote Git repository where XMLs are pushed/pulled
3. **GIT_REPO_KEY** - the API key for the Git repository

If these aren’t found at startup (from `localStorage` or OS env), the CLI will
prompt for them.

### Example Run

```bash
deno run --allow-read --allow-write --allow-env --allow-net main.ts
```

The script will:

1. Prompt for any missing environment data (MoneyWorks credentials, etc.).
2. Store them securely in `localStorage` for next time.
3. Enter a loop:
   - Poll MoneyWorks server for updated records.
   - Commit changes to `moneyworks`.
   - Check the `changes` branch for new commits; if found, reconcile with
     MoneyWorks.
   - Sleep until the next interval.

### Overriding Stored Variables

Use standard environment variable overrides if you need to switch servers or
credentials:

```bash
MONEYWORKS_URL=https://another.server.net deno run --allow-env --allow-net --allow-read --allow-write main.ts
```

## Anonymization

- `anonymize.ts` replaces sensitive XML fields with pseudo-random placeholders.
- Useful for local testing or demos—**never** commit anonymized files to the
  shared repo.

## Future Enhancements

- Automatic conflict detection/resolution strategies.
- More robust anonymization.
- Mock modes for both the MoneyWorks server and file storage backends.
- CLI/REST endpoints to trigger manual re-sync or partial re-sync.
