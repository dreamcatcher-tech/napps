# S9-artifact-based-napp-execution.md

## Stuck ID & Name

- **ID**: S9
- **Name**: artifact-based-napp-execution

## Rationale

Integrating NApp execution directly from Artifact’s Git-based data store ties
code and data seamlessly, enabling dynamic pipelines.

## Description

Trigger and run NApps using data/code in Artifact’s Git repo, ensuring no
external tooling needed and allowing branching/versioning of both code and data
together.

## Context & References

- **Transcripts**: Mentioned as deeper integration after S1.
- **Domains/Definitions**: Relates to `artifact.md` and NApp schema (S8).
- **External References**: Git-based CI/CD concepts.

## Dependencies

- **Stuck Dependencies**: S1 (Git-based data), S8 (NApp format).
- **Resource/Domain Dependencies**: Execution runtime stable.

## Desired Outcome (Definition of Done)

NApps invoked directly from Artifact commits, outputs stored as commits. Tests
confirm reliable execution without external setups.

## QA/Evals

- **Tests & Verifications**: Invoke a NApp from Artifact, check output commits.
- **Metrics for Success**: Reliable runs, easy rollback, consistent state.

## Tasks & Key Functionalities

- **Subtasks**:
  1. Integrate NApp runtime with Artifact data
  2. Test sample NApp execution from commits
- **Capabilities Needed**: Execution runtime tied to Git data.

## Constraints & Risks

- **Known Limitations**: Complexity in streaming outputs from Artifact states.
- **Potential Risks**: Scaling issues under heavy usage.

## Progress & Effort

- **Effort Expended**: Preliminary design only.
- **Future Estimate**: Several sprints for stability.
- **Current Status**: Conceptual phase.

## Next Steps & Recommendations

Start with simple NApp runs, measure performance, refine execution model.
