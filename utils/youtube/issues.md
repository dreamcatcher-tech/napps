due to youtube blocking multiple requests for the same file, we should store
some kind of local cache to ensure we don't make any repeat requests.

If youtube blocks a request, we should make a helpful error message.
