We cannot use the isomorphic-git custom fs feature since we are purposefully
removing the index concept and we are allowing multiple concurrent HEADs to be
used, with one per process, so we can share the storage costs.

Consistency is less required in the blob store, since it is all hash based
storage, so it never changes. This means that if we expect something and it
isn't there, we can try again up to some point.

The atomic guarantees of the git refs are handled by deno kv, and so we tolerate
writing git objects that end up as orphans, since this is how we achieve
atomicity without requiring strong consistency from the blob store.

The deno deploy cache can save a lot of latench for fetching objects from the
blob store.
