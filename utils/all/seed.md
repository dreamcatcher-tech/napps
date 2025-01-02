take a collection of napps, and install all of them as individual CLI commands.

Possibly let the user + and AI manage which ones are installed.

Manage all the update statuses of each napp.

Install and managed using spawned deno processes

```ts
// install_all.ts
const PACKAGES = [
  { name: 'cli1', url: 'https://example.com/cli1.ts' },
  { name: 'cli2', url: 'https://example.com/cli2.ts' },
  // ...
]

for (const { name, url } of PACKAGES) {
  const process = new Deno.Command('deno', {
    args: ['install', '-A', '-f', '-n', name, url],
    stdout: 'piped',
    stderr: 'piped',
  }).spawn()
  const status = await process.status
  if (!status.success) throw new Error(`Failed to install ${name}`)
}
```
