# S17-plain-text-napp-to-napp-calls.md

## Stuck ID & Name

- **ID**: S17
- **Name**: plain-text-napp-to-napp-calls

## Rationale

Allow NApps to interact simply via plain-text protocols, increasing modularity
and enabling chains of NApps to solve complex tasks together.

## Description

Implement a minimal plain-text request/response protocol so one NApp can call
another and receive results.

## Context & References

- **Transcripts**: Modularity and chaining tasks discussed.
- **Domains/Definitions**: NApp execution and communication domain.
- **External References**: Simple RPC or text-based protocols.

## Dependencies

- **Stuck Dependencies**: S8 (NApp format) beneficial for consistent NApp
  definitions.
- **Resource/Domain Dependencies**: Execution environment that supports calling
  another NApp.

## Desired Outcome (Definition of Done)

A NApp can send a text query to another NApp and receive a coherent response,
tested with sample pairs of NApps.

## QA/Evals

- **Tests & Verifications**:
  - Two NApps in a loop, verifying correct request/response.
- **Metrics for Success**:
  - High success rate in message interpretation.

## Tasks & Key Functionalities

- **Subtasks**:
  1. Define a minimal text protocol
  2. Implement sending/receiving logic
  3. Test with a sample NApp pair
- **Capabilities Needed**: Simple text parsing, stable addressing of NApps.

## Constraints & Risks

- **Known Limitations**: Without a schema, text misunderstandings may occur.
- **Potential Risks**: Scalability under many calls.

## Progress & Effort

- **Effort Expended**: Concept only.
- **Future Estimate**: 1-2 sprints post NApp schema.
- **Current Status**: None.

## Next Steps & Recommendations

Define minimal protocol, test on simple NApps, and expand as needed.
