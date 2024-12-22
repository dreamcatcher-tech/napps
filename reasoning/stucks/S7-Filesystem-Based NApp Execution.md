# S7-filesystem-based-napp-execution.md

## Stuck ID & Name

- **ID**: S7
- **Name**: filesystem-based-napp-execution

## Rationale

Speeds dev/testing by running NApps locally via the filesystem, independent of
complex infrastructure or Artifact integration.

## Description

Execute NApps directly from local files, enabling quick iteration, debugging,
and validation before Artifact integration.

## Context & References

- **Transcripts**: Mentioned as a simpler dev workflow.
- **Domains/Definitions**: NApp execution environments.
- **External References**: Standard file I/O operations.

## Dependencies

- **Stuck Dependencies**: None strictly required.
- **Resource/Domain Dependencies**: Basic NApp format (S8) might help.

## Desired Outcome (Definition of Done)

NApps run locally with file inputs/outputs, no external dependencies. Tests
confirm correct behavior in a local environment.

## QA/Evals

- **Tests & Verifications**: Run sample NApps locally, check correct output.
- **Metrics for Success**: Quick dev cycles, easy debugging.

## Tasks & Key Functionalities

- **Subtasks**:
  1. Implement file I/O runtime
  2. Run a test NApp locally
- **Capabilities Needed**: Basic file handling, error reporting.

## Constraints & Risks

- **Known Limitations**: Purely local, no concurrency.
- **Potential Risks**: Path issues across different OSes.

## Progress & Effort

- **Effort Expended**: Basic scripts tested.
- **Future Estimate**: <1 sprint.
- **Current Status**: Early prototype working.

## Next Steps & Recommendations

Finalize local execution scripts, test with a small set of NApps, then integrate
into broader workflow.
