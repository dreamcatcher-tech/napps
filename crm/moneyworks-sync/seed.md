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

- **On disk format**\
  Inside of git, having folders with large numbers of files can be slow, so we
  should test how this system performs with different filesystem layouts. We
  might need some sharding based on a hash of the PK of the xml record. Just do
  a hash of the name code and use the first 2 characters as the folder name,
  just like git does for its own internal objects.
