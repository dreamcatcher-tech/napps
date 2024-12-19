# Web-to-Artifact Auth Bridge

priority: 6

## Situation

- After Privy auth on the web, ensure secure authenticated calls to Artifact
  data.

## Background

- Maintains a trusted chain of authentication from UI to Artifact layer.

## Done

- Secure tokens/credentials passed from web layer to Artifact so user-level
  permissions are respected.

### Evals

- Validate only authenticated requests reach Artifact. Check token integrity.

## Assessment

### Capabilities

- Translate web auth sessions into Artifact-recognized credentials.

### Inputs & Trigger Conditions

- Triggered on data requests. Inputs: user token.

### Expected Behaviour

- Artifact operations only allowed if user’s token is valid.

### Key Functionalities

- Token exchange, auth middleware, request signing.

### Potential Impact

- Enhances overall security and trust in the data pipeline.

### Constraints

#### Known Limitations

- Requires stable Artifact auth integration.

#### Unknown Limitations

- Handling token expiration and refresh flows.

## Current Situation

### Cost

- Moderate; involves coordinating web and Artifact auth models.

#### Effort Expended

- Conceptual design of token flow.

#### Future Estimate

- 1 sprint to implement and test thoroughly.

### Progress

- Still in planning.

## Recommendation

- Establish a standardized token/key exchange process, test with sample
  requests, refine as needed.
