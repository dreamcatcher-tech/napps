# Plain-Text NApp-to-NApp Calls

priority: 17

## Situation

- Enable NApps to interact with each other via a plain-text protocol.

## Background

- Increases modularity, allowing NApps to request services from peers.

## Done

- A NApp can send a plain-text query/command to another and get a response.

### Evals

- Test two NApps in loop, verify correct request/response.

## Assessment

### Capabilities

- Inter-NApp communication, request/response pattern.

### Inputs & Trigger Conditions

- Triggered by a NApp invoking another.

### Expected Behaviour

- Target NApp processes request, returns response.

### Key Functionalities

- Text parsing, routing, stable interface.

### Potential Impact

- Composable NApps, complex tasks solved by chaining.

### Constraints

#### Known Limitations

- Risk of misunderstandings without schema.

#### Unknown Limitations

- Scalability under many calls.

## Current Situation

### Cost

- Moderate; need protocol definition and implementation.

#### Effort Expended

- Concept only.

#### Future Estimate

- 1-2 sprints post NApp schema finalization.

### Progress

- None.

## Recommendation

- Define minimal protocol, test with a simple NApp pair, expand as needed.
