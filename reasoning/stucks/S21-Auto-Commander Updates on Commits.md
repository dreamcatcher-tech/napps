# S21-auto-commander-updates-on-commits.md

## Stuck ID & Name

- **ID**: S21
- **Name**: auto-commander-updates-on-commits

## Rationale

Automatically updating the Commander after certain repo commits ensures the
Commander’s insights remain current, improving responsiveness to code and stuck
changes.

## Description

Implement hooks or triggers so that whenever commits occur, the Commander
re-runs analysis or refreshes summaries, maintaining up-to-date project
intelligence.

## Context & References

- **Transcripts**: Discussed as a step towards fully automated complexity
  management.
- **Domains/Definitions**: Depends on stable Commander (S25) and unified repo
  (S28).
- **External References**: Git hooks, CI pipelines for triggering updates.

## Dependencies

- **Stuck Dependencies**: S25 (Commander), S28 (Unified code/knowledge repos).
- **Resource/Domain Dependencies**: Requires a stable environment where
  Commander runs automatically.

## Desired Outcome (Definition of Done)

Commits trigger Commander re-assessment, confirmed by tests showing updated
reports or priorities post-commit without manual intervention.

## QA/Evals

- **Tests & Verifications**:
  - Commit code changes and verify Commander output updates.
- **Metrics for Success**:
  - Timely Commander updates, no stale data after commits.

## Tasks & Key Functionalities

- **Subtasks**:
  1. Implement commit hooks or CI triggers
  2. Invoke Commander on new commits
  3. Validate updated outputs
- **Capabilities Needed**: Hook integration, Commander CLI/API calls.

## Constraints & Risks

- **Known Limitations**: Performance if Commander is slow.
- **Potential Risks**: Handling complex merges or large commit batches.

## Progress & Effort

- **Effort Expended**: Idea stage.
- **Future Estimate**: 1-2 sprints after Commander stable.
- **Current Status**: None.

## Next Steps & Recommendations

Wait until Commander matures, then add commit hooks and test auto-updates on
sample commits.
