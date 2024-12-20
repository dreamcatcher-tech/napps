# Local-to-Cloud NApp Sync

priority: 13

## Situation

- Local NApps run on premises need to sync data with cloud-based Artifact.

## Background

- Supports hybrid architectures with edge computing scenarios.

## Done

- Local NApps can securely push/pull data to/from the cloud, keeping systems in
  sync.

### Evals

- Test local→cloud and cloud→local sync, validate data integrity.

## Assessment

### Capabilities

- Local processing, secure transfer, conflict resolution.

### Inputs & Trigger Conditions

- Triggered by scheduled sync or command.

### Expected Behaviour

- Seamless data flow between on-prem and cloud.

### Key Functionalities

- Authenticated APIs, sync protocols, partial updates.

### Potential Impact

- Edge computing, reduced latency.

### Constraints

#### Known Limitations

- Requires stable auth and repo structure.

#### Unknown Limitations

- Version conflicts between local and remote.

## Current Situation

### Cost

- Moderate-high; networking and version complexity.

#### Effort Expended

- Basic planning.

#### Future Estimate

- Several sprints for robust sync.

### Progress

- Conceptual only.

## Recommendation

- Start with one-way sync (pull-only), then add bi-directional syncing.
