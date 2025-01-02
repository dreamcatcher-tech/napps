# Process Overview

This module coordinates and enforces a two-way sync between:

- **MoneyWorks Server**: The authoritative data store (exposed via REST).
- **`moneyworks`**: A Git branch mirroring MoneyWorks data.
- **`changes`**: A Git branch where external processes submit XML updates.
- **Application Processes**: Other modules or services creating new or modified
  XML records that eventually must be pushed into MoneyWorks.

Below is a refined version with the **exact** steps for writing into MoneyWorks,
pausing polling, verifying data, and merging.

---

## 1. MoneyWorks Branch

- Reflects the official state of the MoneyWorks server at any given time.
- Updated exclusively by this module during normal polling cycles or after
  applying changes from the `changes` branch.

**Key points**

- **No external commits** should ever go directly to `moneyworks`.
- Polling runs on a configured interval to detect new or updated records on the
  MoneyWorks server.
- Committed changes always include a _sync marker_ (the last modified timestamp)
  in the commit message or config file.

---

## 2. Changes Branch

- This branch is where external applications place new or modified XML files
  that must be written into MoneyWorks.
- **Never** merges into the `moneyworks` branch, but whenever changes occur in
  the moneyworks branch, the moneyworks branch is merged into the changes branch
  by outside processes.
- The module will watch for commits here. When it detects them, it begins a
  **write** workflow.

---

## 3. Synchronizing Changes Branch to MoneyWorks

When new commits appear on `changes`, the module initiates the following
sequence:

1. **Suspend Polling**\
   Temporarily pause the regular fetch-from-MoneyWorks cycle to avoid
   concurrency conflicts.

2. **Ensure `moneyworks` Is Current**\
   Run one final polling cycle from MoneyWorks to confirm the `moneyworks`
   branch is fully up to date. This ensures there are no unaccounted-for changes
   on MoneyWorks’s side.

3. **Compare Commits**\
   Identify exactly which XML records in `changes` differ from `moneyworks`.
   (These diffs represent pending edits to be applied to the MoneyWorks server.)

4. **Import Changes into MoneyWorks**\
   Use MoneyWorks’s REST API (`import`) to insert or update the relevant
   records. Any mismatch in sequence numbers, collisions, or major data
   conflicts will halt the process and require manual resolution.

---

## 4. Verification

- The module checks that the newly updated MoneyWorks data **matches** the
  edited XML from `changes`.
- If a mismatch arises (e.g. data was altered by another user in MoneyWorks),
  the sync process will fail, logging a conflict for manual resolution.

---

## 5. Completion

- If no conflicts, the now-merged `moneyworks` branch is the single source of
  truth reflecting every change from MoneyWorks _and_ from `changes`.
- External processes know the update succeeded when the corresponding XML commit
  appears (with identical content) in `moneyworks`.
- Normal polling continues at the configured interval.

---

### Conflict Handling

- **Non-trivial conflicts** (e.g. the record changed in MoneyWorks after last
  poll, or the branch diverged unexpectedly) cause the module to halt further
  writes and log an error.
- A human operator or external conflict resolution process must decide how to
  handle these discrepancies before resuming normal operations.

---

### Summary

This process ensures safe, reliable synchronization between MoneyWorks (via
REST) and the Git repository’s two branches (`moneyworks`, `changes`),
protecting against conflicts and preserving a complete audit trail of all XML
changes.
