# S27-implement-robust-task-stuck-structure-with-estimates-and-retrospectives.md

## Stuck ID & Name

- **ID**: S27
- **Name**:
  implement-robust-task-stuck-structure-with-estimates-and-retrospectives

## Rationale

Structured stucks with time estimates and retrospectives improve predictability,
help learn from past efforts, and continuously refine planning accuracy.

## Description

Define a robust format for stucks that includes time estimates and a
retrospective process, enabling better forecasting, scheduling, and incremental
improvements over time.

## Context & References

- **Transcripts**: References at (42:05, 57:05) emphasize the need for better
  forecasting and continuous improvement.
- **Domains/Definitions**: Ties into the formal stuck schema (S16) and
  Commander’s decision-making.
- **External References**: Agile retrospectives, project estimation best
  practices.

## Dependencies

- **Stuck Dependencies**: S16 (formal stuck schema) to integrate fields like
  estimates and retrospective notes.
- **Resource/Domain Dependencies**: Stable environment to record and track these
  new fields.

## Desired Outcome (Definition of Done)

Each stuck includes time estimates and a retrospective record upon completion.
Tests confirm improved estimation accuracy over multiple cycles and positive
user feedback on the process.

## QA/Evals

- **Tests & Verifications**:
  - Validate stucks can store estimates and retrospective data.
  - Check if retrospective insights lead to adjustments in future estimates.
- **Metrics for Success**:
  - Improved estimation accuracy over time, reduced variance between estimated
    and actual times.

## Tasks & Key Functionalities

- **Subtasks**:
  1. Extend stuck schema to include estimate and retrospective fields.
  2. Implement a workflow to fill retrospective notes upon stuck completion.
  3. Analyze historical data for continuous improvement.
- **Capabilities Needed**: Schema extension, logging and analysis tools.

## Constraints & Risks

- **Known Limitations**: Accuracy depends on user discipline in recording
  retrospectives.
- **Potential Risks**: Initial estimates may be off until pattern emerges.

## Progress & Effort

- **Effort Expended**: Conceptual stage.
- **Future Estimate**: ~1 sprint to implement initial structure.
- **Current Status**: Requirements known, waiting for schema completion.

## Next Steps & Recommendations

Implement once S16 is finalized. Start simple with estimates, gather
retrospectives, and refine the process over a few cycles.
