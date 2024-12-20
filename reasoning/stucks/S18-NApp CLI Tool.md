# NApp CLI Tool

priority: 18

## Situation

- Provide a CLI for interacting with NApps (running, listing, logs).

## Background

- Improves developer productivity and accessibility without a UI.

## Done

- A CLI to discover, run, and manage NApps from terminal.

### Evals

- Test `napp list`, `napp run <name>`, `napp status`.

## Assessment

### Capabilities

- CLI operation, quick debugging, scripting.

### Inputs & Trigger Conditions

- User terminal commands.

### Expected Behaviour

- Shows available NApps, runs them, outputs results.

### Key Functionalities

- Argument parsing, NApp API calls.

### Potential Impact

- Faster dev workflows.

### Constraints

#### Known Limitations

- OS compatibility.

#### Unknown Limitations

- Dependencies.

## Current Situation

### Cost

- Low-medium; standard CLI patterns.

#### Effort Expended

- None.

#### Future Estimate

- 1 sprint after core NApp APIs stable.

### Progress

- Concept only.

## Recommendation

- Wait for NApp format/execution stability, then build CLI incrementally.
