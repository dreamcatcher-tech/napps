# S16-formal-stucks-schema.md

## Stuck ID & Name

- **ID**: S16
- **Name**: formal-stucks-schema

## Rationale

A formal schema ensures stuck definitions are machine-readable, consistent, and
easily parsable, supporting automation and tooling.

## Description

Define a stable schema for stucks, including fields like ID, name, dependencies,
status, estimates, and retrospectives.

## Context & References

- **Transcripts**: Mentioned need for structured stucks.
- **Domains/Definitions**: Aligns with overall stuck management process.
- **External References**: Schema design best practices.

## Dependencies

- **Stuck Dependencies**: None critical, but beneficial if basic NApp format
  (S8) is done.
- **Resource/Domain Dependencies**: Agreement from stakeholders on required
  fields.

## Desired Outcome (Definition of Done)

A documented schema that all stucks must follow, validated against sample stuck
sets, ensuring no ambiguity.

## QA/Evals

- **Tests & Verifications**:
  - Validate a set of known stucks against the schema.
- **Metrics for Success**:
  - All test stucks conform, no parsing errors.

## Tasks & Key Functionalities

- **Subtasks**:
  1. Draft schema (JSON/YAML)
  2. Validate sample stucks
  3. Document schema usage
- **Capabilities Needed**: Schema validation tools.

## Constraints & Risks

- **Known Limitations**: Future changes may require schema updates.
- **Potential Risks**: Overly rigid schema might limit future flexibility.

## Progress & Effort

- **Effort Expended**: Early draft proposed.
- **Future Estimate**: ~1 sprint to finalize.
- **Current Status**: Draft under review.

## Next Steps & Recommendations

Finalize schema, run sample stucks through it, then enforce schema in workflows.
