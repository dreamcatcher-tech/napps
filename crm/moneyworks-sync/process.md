# Process Overview

This module enforces a two-way sync between:

- **MoneyWorks Server** (via REST)
- **`moneyworks`** Git branch (mirrors server data)
- **`changes`** Git branch (external XML submissions)
- **External Apps** (create/edit XML to push into MoneyWorks)

```mermaid
sequenceDiagram
    participant MW as MoneyWorks Server (REST)
    participant MWBranch as Git “moneyworks” Branch
    participant CHBranch as Git “changes” Branch
    participant Ext as External Apps
    participant Mod as Sync Module

    Note over Mod,MWBranch: **1. Clean Poll & Initial Sync**
    Mod->>MW: Poll for latest data (REST)
    MW->>Mod: Return updated data
    Mod->>MWBranch: Update **moneyworks** branch with server data

    Note over Ext,CHBranch: **2. External Edits**
    Ext->>CHBranch: Commit new/updated XML into **changes** branch

    Note over MWBranch,CHBranch: **3. Merge Updates**
    Ext->>CHBranch: Merge **moneyworks** branch into **changes** branch<br/>(keeping **changes** up-to-date)

    Note over Mod,CHBranch: **4. Applying `changes` to MoneyWorks**
    Mod->>Mod: **Suspend polling** to avoid conflicts
    Mod->>MW: **Sync `moneyworks`** again to confirm latest server data
    Mod->>Mod: **Compare** diffs (between `changes` & `moneyworks`)
    Mod->>MW: **Import** diffs into MoneyWorks via REST

    alt Conflict or Sequence Mismatch
        MW->>Mod: Collision info returned
        Note right of Mod: **Stop** for manual intervention
    else Successful Import
        MW->>Mod: Confirm changes
    end

    Note over Mod,MW: **5. Verification & Completion**
    Mod->>MW: Verify MoneyWorks matches `changes`
    alt Verification Mismatch
        MW->>Mod: Log conflict<br/>Stop process
    else Conflict-Free
        Mod->>MWBranch: **moneyworks** now reflects all updates
        Mod->>Mod: **Resume polling**
    end
```

## 1. `moneyworks` Branch

- Mirrors MoneyWorks server data.
- Updated only by this module (polling intervals or post-update).
- Never accept direct external commits here.

## 2. `changes` Branch

- Receives new/modified XML files from external apps.
- Triggers a write workflow if commits are detected.
- External processes will merge the `moneyworks` branch into the `changes`
  branch to keep it up to date.

## 3. Applying `changes` to MoneyWorks

1. **Suspend Polling** to prevent conflicts.
2. **Sync `moneyworks`** to ensure it’s up-to-date.
3. **Compare** diffs between `changes` and `moneyworks`.
4. **Import** diffs into MoneyWorks via REST.
   - Halt if collisions or sequence mismatches appear.

## 4. Verification

- Check MoneyWorks matches the updates from `changes`.
- On mismatch, log conflict and stop.

## 5. Completion

- If conflict-free, `moneyworks` now reflects both server updates and external
  edits.
- Polling resumes.

### Conflict Handling

- Major conflicts require manual intervention before proceeding.

### Summary

A safe, auditable sync flow between MoneyWorks and Git:

- Poll and update `moneyworks`,
- When new commits appear in `changes`, pause polling,
- Insert from `changes` into the MoneyWorks server,
- Verify the changes were applied correctly,
- Resume polling.
