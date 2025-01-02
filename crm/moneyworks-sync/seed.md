## Requirements

- **Deno Deploy Bulk Upload**\
  Accept incoming git objects in bulk and commit only after all uploads finish.

- **Conflict Handling**\
  Halt on unexpected changes to the main (`moneyworks`) branch that occur
  outside this module’s control—require human intervention.

- **Sync Marker**\
  Store a last-modified timestamp in the config for tracking incremental
  updates. Include this timestamp (and other relevant config) in each commit to
  `moneyworks`.

## Questions

- **Terse XML Consistency**\
  Investigate whether MoneyWorks’s `xml-terse` output consistently produces the
  same content for identical data.
