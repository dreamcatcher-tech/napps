# Artifact-Based NApp Execution

priority: 9

## Situation

- Execute NApps directly from Artifact’s Git-based data store.

## Background

- Integrates code/data tightly, letting NApps run where their data lives.

## Done

- NApps can be triggered and run using data/code in Artifact’s Git repo.

### Evals

- Confirm a NApp can be invoked from Artifact commits, test outputs stored as
  commits.

## Assessment

### Capabilities

- Fetch NApp code from Git, run it, commit results.

### Inputs & Trigger Conditions

- Triggered by commit events or user commands.

### Expected Behaviour

- Smooth execution pipeline without external tooling.

### Key Functionalities

- Execution runtime, branching, rollback.

### Potential Impact

- Dynamic pipelines, deeper integration.

### Constraints

#### Known Limitations

- Complexity in streaming outputs.

#### Unknown Limitations

- Scaling issues under load.

## Current Situation

### Cost

- High; complex integration.

#### Effort Expended

- Preliminary design only.

#### Future Estimate

- Several sprints for stable execution.

### Progress

- Conceptual phase.

## Recommendation

- Start with simple NApp runs, measure performance, iterate execution model.
