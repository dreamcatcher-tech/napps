# S18-napp-cli-tool.md

## Stuck ID & Name

- **ID**: S18
- **Name**: napp-cli-tool

## Rationale

A CLI tool eases developer interaction with NApps, allowing listing, running,
and inspecting them from the terminal, improving productivity.

## Description

Provide a CLI for discovering, running, and managing NApps without a UI,
streamlining dev workflows.

## Context & References

- **Transcripts**: Mentioned need for faster dev cycles.
- **Domains/Definitions**: NApp definitions (S8).
- **External References**: CLI best practices, standard command-line interfaces.

## Dependencies

- **Stuck Dependencies**: S8 (NApp format) for consistent discovery.
- **Resource/Domain Dependencies**: Execution environment stable.

## Desired Outcome (Definition of Done)

A CLI command `napp` that can list available NApps, run a selected NApp, and
show logs/status, tested with sample NApps.

## QA/Evals

- **Tests & Verifications**:
  - `napp list`, `napp run <name>`, `napp status` commands tested.
- **Metrics for Success**:
  - Seamless dev experience, positive developer feedback.

## Tasks & Key Functionalities

- **Subtasks**:
  1. Implement `napp list`
  2. Implement `napp run <name>`
  3. Implement `napp status`
- **Capabilities Needed**: API access to NApps, command parsing.

## Constraints & Risks

- **Known Limitations**: OS compatibility differences.
- **Potential Risks**: Dependencies required for advanced features.

## Progress & Effort

- **Effort Expended**: None yet.
- **Future Estimate**: 1 sprint after NApp APIs stable.
- **Current Status**: Conceptual.

## Next Steps & Recommendations

Wait for stable NApp execution environment, then build CLI incrementally.
