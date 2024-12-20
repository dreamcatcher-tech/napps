# Standard NApp Format Definition

priority: 8

## Situation

- Need a canonical schema defining NApps (metadata, inputs, outputs, tools).

## Background

- Ensures consistency and interoperability between different NApps.

## Done

- A documented, agreed-upon format that all NApps follow (e.g., JSON/YAML
  schema).

### Evals

- Validate test NApps against the schema, check that tools/params fit the
  format.

## Assessment

### Capabilities

- Structured definition makes NApps portable and understandable.

### Inputs & Trigger Conditions

- Triggered when creating/loading a NApp.

### Expected Behaviour

- Any NApp adhering to the format is runnable and integrable.

### Key Functionalities

- Schema validation, standard fields.

### Potential Impact

- Reduces confusion, improves tooling automation.

### Constraints

#### Known Limitations

- Requires consensus on fields and format.

#### Unknown Limitations

- Future features may require schema revisions.

## Current Situation

### Cost

- Moderate; requires design and agreement.

#### Effort Expended

- Draft schema proposed.

#### Future Estimate

- 1 sprint to finalize and document.

### Progress

- Initial draft under review.

## Recommendation

- Finalize schema with stakeholders, run sample NApps through it.
