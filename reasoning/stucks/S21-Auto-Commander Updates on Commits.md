# Auto-Commander Updates on Commits

priority: 21

## Situation

- Trigger Commander updates whenever certain repo commits occur.

## Background

- Keeps Commander insights in sync with latest code/stuck states.

## Done

- Committing changes triggers Commander to re-run analysis or update summaries
  automatically.

### Evals

- Test commit hooks, confirm Commander outputs after new commits.

## Assessment

### Capabilities

- Git hooks calling Commander, updated metadata generation.

### Inputs & Trigger Conditions

- Triggered by commit events.

### Expected Behaviour

- Fresh Commander updates post-commit.

### Key Functionalities

- Hooks, Commander CLI/API calls.

### Potential Impact

- Always up-to-date project intelligence.

### Constraints

#### Known Limitations

- Performance if Commander slow.

#### Unknown Limitations

- Handling complex merges.

## Current Situation

### Cost

- Moderate; setting up hooks and integration.

#### Effort Expended

- Idea stage.

#### Future Estimate

- 1-2 sprints after Commander stable.

### Progress

- None yet.

## Recommendation

- After Commander stabilizes, add commit hooks and test auto-updates.
