# MoneyWorks Git Sync

Continuously synchronizes data between a MoneyWorks server and a Git-based file
store, supporting multiple configurable tables. Changes in Git get pushed back
to MoneyWorks, ensuring a fully auditable two-way sync.

> **Canonical Reference**\
> The actual synchronization steps (including batch pulling and collision
> checks) are defined in [SPEC.md](./SPEC.md). This README presents an overview
> of how the system operates, but **SPEC.md** governs the exact logic.

## Overview

- **MoneyWorks Mirror Branch**\
  Keeps a live mirror of the server’s records. Updated via batched pulls from
  MoneyWorks at regular intervals.

- **Changes Branch**\
  Monitors for new or modified records. When changes appear here, polling is
  temporarily paused, the updates are pushed to MoneyWorks, and then the mirror
  branch is refreshed and synchronized.

- **Batching & Large Data**\
  Pulls and pushes occur in segments to avoid performance bottlenecks. The
  highest timestamp from each batch is tracked to ensure no duplicate or missed
  records.

- **Conflict Handling**\
  If a mismatch is detected after pushing to MoneyWorks, the process logs the
  error and halts further writes until resolved by an operator.

## CLI Usage

This module can be installed and run as a CLI using Deno. It requires
environment variables (described below) for server credentials and Git repo
access.

### Installation

```bash
deno install --allow-read --allow-write --allow-env --allow-net \
  "jsr:@dreamcatcher/moneyworks-sync/cli"
```

This will create a `moneyworks-sync` executable in your Deno bin folder (e.g.,
`~/.deno/bin`).

### Running the CLI

```bash
moneyworks-sync
```

1. Prompts for missing environment data if not already set (e.g., MoneyWorks
   credentials).
2. Stores them securely in `localStorage` for reuse.
3. Enters a continuous sync loop:
   - Periodically polls the MoneyWorks server for new or updated data.
   - Commits changes to the mirror branch.
   - Detects any new commits on the changes branch; if found, merges them into
     MoneyWorks and updates the mirror branch accordingly.
   - Waits before polling again.

## Environment Variables

- **MONEYWORKS_SECURE_URL**\
  The MoneyWorks server URL (including credentials if needed), e.g.
  `https://user:pass@host:port`
- **GIT_REPO_URL**\
  The remote Git repository where XML records are pushed and pulled
- **GIT_REPO_KEY**\
  The API key or token with permissions to access the Git repository

You can override these at runtime. If not provided, the CLI will prompt for
them.

## Anonymization (Optional)

A lightweight script can be used to replace sensitive data fields with random
placeholders for testing. This feature is optional and should not be used in
production syncs.
