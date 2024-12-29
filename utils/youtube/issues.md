due to youtube blocking multiple requests for the same file, we should store
some kind of local cache to ensure we don't make any repeat requests.

If youtube blocks a request, we should make a helpful error message.

If the file exists, silently send a message to the user that the file exists,
and its size. If zero bytes, remote it and begin the download.
