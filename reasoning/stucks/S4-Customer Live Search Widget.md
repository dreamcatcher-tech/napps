# Customer Live Search Widget

priority: 4

## Situation

- Need a fast, responsive search tool to find customer records quickly.

## Background

- Emerged to rapidly locate customer data from MoneyWorks now stored in
  Artifact, supporting CRM visibility.

## Done

- A widget that returns relevant customer records as the user types, integrated
  into the UI.

### Evals

- Test queries against known datasets, measure latency and accuracy.

## Assessment

### Capabilities

- Incremental search over stored data, display results in real-time.

### Inputs & Trigger Conditions

- Triggered by user typing; inputs are search strings.

### Expected Behaviour

- Results appear instantly with each keystroke.

### Key Functionalities

- Efficient indexing, responsive UI updates, highlighting matches.

### Potential Impact

- Improves user experience, reduces time to locate customer info.

### Constraints

#### Known Limitations

- Depends on stable Git-based data availability.

#### Unknown Limitations

- Handling fuzzy matches or partial information.

## Current Situation

### Cost

- Low-medium; search algorithms are well-known.

#### Effort Expended

- Preliminary code snippet for string matching done.

#### Future Estimate

- <1 sprint with a stable data source.

### Progress

- Prototype ready, awaiting integrated data.

## Recommendation

- Integrate with finalized UI widget framework and artifact data store, optimize
  for speed.
