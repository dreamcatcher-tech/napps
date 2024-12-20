# XML Data Sync (MoneyWorks → Artifact)

priority: 2

## Situation

- Need to regularly pull MoneyWorks XML data, convert it, and store in
  Artifact’s Git-based system.

## Background

- Stuck raised to provide real-time, read-only customer data visibility for CRM
  usage.

## Done

- MoneyWorks XML data automatically imports into Artifact and updates are
  reflected without manual intervention.

### Evals

- Validate XML parsing correctness. Check data integrity in Artifact after
  import.

## Assessment

### Capabilities

- Parse XML, map to internal format, commit changes to Git.

### Inputs & Trigger Conditions

- Triggered by scheduled sync or a webhook event. Input: XML files.

### Expected Behaviour

- Regular updates from MoneyWorks appear in Artifact, versioned and ready for UI
  display.

### Key Functionalities

- XML parsing, JSON conversion if needed, Git commit operations.

### Potential Impact

- Provides a foundation for CRM visibility, enabling quick data lookup.

### Constraints

#### Known Limitations

- Dependent on stable Git integration.

#### Unknown Limitations

- Potential XML schema changes in MoneyWorks.

## Current Situation

### Cost

- Moderate; XML parsing and Git commit steps must be reliable.

#### Effort Expended

- Preliminary XML parsing tests done.

#### Future Estimate

- 1 sprint to implement and test.

### Progress

- Basic parsing logic drafted.

## Recommendation

- Finalize parsing logic, implement a scheduled sync, confirm data integrity in
  test runs.
