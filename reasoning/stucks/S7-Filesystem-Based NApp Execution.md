# Filesystem-Based NApp Execution

priority: 7

## Situation

- Need a local environment for executing NApps without relying on Artifact or
  complex infrastructure.

## Background

- Simplifies dev/testing by running NApps directly on the filesystem.

## Done

- NApps run locally using files as inputs/outputs, enabling quick iteration and
  debugging.

### Evals

- Test with sample NApps, confirm no external dependencies required.

## Assessment

### Capabilities

- Execute NApp logic from a filesystem context.

### Inputs & Trigger Conditions

- Triggered by a CLI call or script. Inputs: local files.

### Expected Behaviour

- NApp reads input files, processes them, writes output files.

### Key Functionalities

- File I/O, runtime environment, error handling.

### Potential Impact

- Faster dev cycles, easier debugging before Artifact integration.

### Constraints

#### Known Limitations

- Purely local, no concurrency features.

#### Unknown Limitations

- Path issues across OSes.

## Current Situation

### Cost

- Low; simpler than Artifact integration.

#### Effort Expended

- Basic scripts tested.

#### Future Estimate

- <1 sprint to finalize.

### Progress

- Early prototype working locally.

## Recommendation

- Finalize local execution scripts, test with a small set of NApps, then
  integrate into the larger workflow.
