# S28-unify-code-and-knowledge-repositories.md

## Stuck ID & Name

- **ID**: S28
- **Name**: unify-code-and-knowledge-repositories

## Rationale

Multiple repos cause fragmentation. A single unified repository simplifies
integration, referencing, QA, and reduces confusion, speeding collaboration and
onboarding.

## Description

Merge code and knowledge into one repository, ensuring all project elements
(code, docs, definitions) reside together for easier navigation and maintenance.

## Context & References

- **Transcripts**: (26:09, 28:16), (39:54) mention need for unified historical
  record and stable referencing.
- **Domains/Definitions**: Centralizes all domain definitions and code.
- **External References**: Common best practices in monorepo approaches.

## Dependencies

- **Stuck Dependencies**: None strictly required, but stable stuck structures
  (S16) and NApp format (S8) help organize content.
- **Resource/Domain Dependencies**: Decide on repo structure and branching
  strategy.

## Desired Outcome (Definition of Done)

All code and documentation in a single repo, confirmed by CI/CD pipelines
running smoothly and developers finding resources easily.

## QA/Evals

- **Tests & Verifications**:
  - Validate CI/CD in unified repo.
  - Check dev feedback on resource location ease.
- **Metrics for Success**:
  - Reduced confusion, quicker onboarding, streamlined QA checks.

## Tasks & Key Functionalities

- **Subtasks**:
  1. Migrate code and docs into one repo
  2. Adjust CI/CD pipelines
  3. Test developer workflows
- **Capabilities Needed**: Git reorganization, CI adjustments.

## Constraints & Risks

- **Known Limitations**: Migration effort required.
- **Potential Risks**: Potential reorg as project scales further.

## Progress & Effort

- **Effort Expended**: Initial planning.
- **Future Estimate**: 1-2 sprints for migration.
- **Current Status**: Ready to proceed once stuck structures stable.

## Next Steps & Recommendations

Unify repos post task structure finalization. Establish clear folder/branch
strategies, then proceed with migration.
