# Multi-User Shared Artifact Repos

priority: 11

## Situation

- Multiple users need to collaborate on the same Artifact data repo.

## Background

- Enables team versioning, branching, and shared data access.

## Done

- Participants can access and contribute to the same repo without conflict.

### Evals

- Test multiple user edits, merging branches, resolving conflicts gracefully.

## Assessment

### Capabilities

- Multi-user write access, permission controls, branch merges.

### Inputs & Trigger Conditions

- Triggered when multiple users commit changes.

### Expected Behaviour

- Smooth collaboration with no data corruption.

### Key Functionalities

- Permissions, branching workflows, conflict resolution.

### Potential Impact

- Scales platform for teams.

### Constraints

#### Known Limitations

- Complex conflict scenarios.

#### Unknown Limitations

- Performance under concurrency.

## Current Situation

### Cost

- Moderate-high; Git supports it but integration careful.

#### Effort Expended

- Conceptual planning.

#### Future Estimate

- Several sprints for stable multi-user flows.

### Progress

- Ideas only.

## Recommendation

- Start read-only shared repos, then add write permissions and test merges.
