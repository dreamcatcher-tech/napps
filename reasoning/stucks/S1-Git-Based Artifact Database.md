# Git-Based Artifact Database

priority: 1

## Situation

- Artifact currently relies on a traditional database; we want to store and
  version data in Git.
- References: Existing Git repos, Artifact’s current storage mechanism.

## Background

- Raised to leverage Git’s versioning and branching for data management,
  aligning Artifact storage with a developer-friendly workflow.

## Done

- Artifact data can be stored, retrieved, and version-controlled entirely via
  Git without data loss or integrity issues.

### Evals

- Tests: Confirm commit/branch integrity, ensure no data corruption, and
  validate read/write operations from Git storage.

## Assessment

### Capabilities

- Enable read/write of structured data through Git commits and branches.

### Inputs & Trigger Conditions

- Triggered when saving or retrieving data from Artifact.

### Expected Behaviour

- Data is stored as a series of commits, easily revertible or branchable.

### Key Functionalities

- Git commit on write, Git checkout on read, branch and merge support.

### Potential Impact

- Improves data auditability, rollback, and collaboration.

### Constraints

#### Known Limitations

- Requires stable Git integration layer.

#### Unknown Limitations

- Potential performance issues at scale.

## Current Situation

### Cost

- Moderate complexity; similar to previous Git integrations.

#### Effort Expended

- Some initial exploration of Git APIs.

#### Future Estimate

- 1-2 sprints for stable integration.

### Progress

- Early planning done, prototype pending.

## Recommendation

- Implement a proof-of-concept Git integration and run tests on small datasets.
  Iterate from there.
