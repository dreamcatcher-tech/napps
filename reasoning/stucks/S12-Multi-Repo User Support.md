# Multi-Repo User Support

priority: 12

## Situation

- A single user may manage multiple Artifact repos.

## Background

- Allows flexible data partitioning and organization.

## Done

- A single user can switch between multiple repos seamlessly.

### Evals

- Test repo navigation, data retrieval across multiple repos.

## Assessment

### Capabilities

- Repo listing, selection, context switching.

### Inputs & Trigger Conditions

- Triggered by user selecting a repo.

### Expected Behaviour

- User can view/edit/commit to chosen repo.

### Key Functionalities

- Repo registry, permissions per repo.

### Potential Impact

- Enhances organization, modularity.

### Constraints

#### Known Limitations

- UI/UX complexity.

#### Unknown Limitations

- Naming/ID scheme for repos.

## Current Situation

### Cost

- Moderate.

#### Effort Expended

- Idea stage.

#### Future Estimate

- 1-2 sprints basic support.

### Progress

- Conceptual only.

## Recommendation

- Implement simple repo selector, test read-only, then add write ops.
