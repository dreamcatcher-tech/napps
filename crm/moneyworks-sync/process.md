# Process Overview

This module coordinates synchronization between:

- **MoneyWorks Server**: The authoritative data store (via REST).
- **`moneyworks`**: A git branch mirroring MoneyWorks state.
- **`changes`**: A git branch where external application processes submit
  pending updates for MoneyWorks.
- **Application Processes**: Other modules or services that create/modify
  records in the `changes` branch.

Only this module updates the `moneyworks` branch after polling the MoneyWorks
Server and applies changes coming from the `changes` branch if prerequisites are
met.

## 1. MoneyWorks Branch

- Reflects a faithful snapshot of the MoneyWorks Server.
- Updated by this module whenever the polling cycle detects new changes from
  MoneyWorks.

## 2. Changes Branch

- Holds edits queued by external processes for insertion into MoneyWorks.
- The `changes` branch does **not** need to reference the exact commit of the
  `moneyworks` branch; it just needs to be based on a point where `changes` was
  last synchronized with `moneyworks`.

## 3. Synchronizing Changes Branch to MoneyWorks

1. The module polls the `changes` branch for new commits.
2. If the `moneyworks` branch has progressed since the last time `changes` was
   synchronized, the module looks back to that last synchronization point.
3. As long as the changes on `changes` aren’t invalidated by subsequent
   `moneyworks` commits, the new edits are applied to MoneyWorks.
4. In rare cases, a conflict might arise if the `moneyworks` branch is altered
   between the time we pull the latest from MoneyWorks and the moment we commit
   new data. In that case, the commit will fail, and the user will be alerted.

> **Note**: External processes know their changes have been applied by watching
> for corresponding updates in the main branch. If they see the exact file
> changes appear, they confirm success. If they see unexpected modifications,
> they should raise a conflict warning.

## 4. Verification

- After pushing new edits into MoneyWorks, the module polls again to confirm the
  remote database state matches the changes.
- The module **commits** these new changes into the `moneyworks` branch as the
  canonical representation.

## 5. Completion

- If the `moneyworks` branch now reflects the same changes that were in the
  `changes` branch, the updates have been successfully recorded in MoneyWorks.
- The `changes` branch remains available for subsequent edits.
