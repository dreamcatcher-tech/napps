# PROJECT_MAP.md

📦 **api/** ├─ 📄 **README.md**\
│ ℹ High-level overview of the NAPPS API package\
│ 1. _Addressability_\
│ ℹ Explains dimensions: history, branch, process, repo

├─ 📄 **actions.ts**\
│ ℹ Defines typed action schemas and creators for NAPPS\
│ 1. `actionSchema: ZodSchema<Action>`\
│ ℹ Validates an action’s shape\
│ 2.`actionCreators<T>(name: T): Promise<Record<string, (params: object) => Action>>`\
│ ℹ Generates specialized action objects for a given napp\
│ 3. `serializableError: ZodSchema<SerializableError>`\
│ ℹ Defines error serialization structure\
│ 4. `outcomeSchema: ZodSchema<Outcome>`\
│ ℹ Ensures result and error exclusivity

├─ 📄 **actions.test.ts**\
│ ℹ Tests for `actions.ts`\
│ 1. `test('functions')`\
│ ℹ Validates `actionCreators` and resulting actions

├─ 📄 **client-backchat.ts**\
│ ℹ Implements the `Backchat` class for interactive backchat sessions\
│ 1. `Backchat.upsert(engine, key, resume?) => Promise<Backchat>`\
│ ℹ Resumes or creates a backchat branch\
│ 2. `Backchat.superuser(engine, crypto) => Backchat`\
│ ℹ Creates a superuser backchat instance\
│ 3. `prompt(content, target?, attachments?) => Promise<Outcome>`\
│ ℹ Sends text and files to backchat\
│ 4. `newThread() => Promise<Outcome>`\
│ ℹ Creates a fresh conversation thread\
│ 5. `changeRemote(remote?) => Promise<Outcome>`\
│ ℹ Redirects the remote branch\
│ 6. `actions<T>(isolate, opts?) => Promise<T>`\
│ ℹ Prepares typed isolate calls\
│ 7. `ping(params?) => Promise<Outcome>`\
│ ℹ Checks connectivity\
│ 8. `apiSchema(isolate) => Promise<object>`\
│ ℹ Fetches dynamic schema for an isolate\
│ 9. `transcribe({ audio }) => Promise<{ text: string }>`\
│ ℹ Audio transcription\
│ 10. `init/clone/pull/push/rm/lsRepos() => Promise<Outcome>`\
│ ℹ Repo management actions\
│ 11. `read/write/delete/ls(...) => Promise<...>`\
│ ℹ File operations\
│ 12. `splices(target, opts?) => Promise<Splice[]>`\
│ ℹ Fetches commit splices\
│ 13. `state(pid, schema) => Promise<...>`\
│ ℹ Retrieves typed state\
│ 14. `lsChildren() => Promise<PID[]>`\
│ ℹ Lists child processes

├─ 📄 **client-engine.ts**\
│ ℹ Provides `WebClientEngine` for HTTP-based engine operations\
│ 1. `WebClientEngine.start(url, fetcher?) => Promise<WebClientEngine>`\
│ ℹ Creates an engine instance, fetches home address\
│ 2. `stop() => void`\
│ ℹ Cancels all ongoing requests\
│ 3. `ping(data?) => Promise<any>`\
│ ℹ Ping to check connectivity\
│ 4. `pierce(pierce) => Promise<void>`\
│ ℹ Sends a "pierce" request\
│ 5. `apiSchema(isolate) => Promise<object>`\
│ ℹ Retrieves schema metadata\
│ 6. `transcribe(audio) => Promise<{ text: string }>`\
│ ℹ For audio processing\
│ 7. `watch(pid, path?, after?, signal?) => AsyncIterable<Splice>`\
│ ℹ Watches for changes in real-time\
│ 8. `read/readJSON/readTree/readBinary/exists/splice(...) => Promise<...>`\
│ ℹ Standard file-like APIs

├─ 📄 **crypto.ts**\
│ ℹ Manages cryptographic keys and machine ID generation\
│ 1. `Crypto.load(privateKey) => Crypto`\
│ ℹ Constructs with existing key\
│ 2. `Crypto.generatePrivateKey() => string`\
│ ℹ Creates new private key\
│ 3. `Crypto.assert(machineId: string) => boolean`\
│ ℹ Validates machine ID format\
│ 4. `machineIdRegex`\
│ ℹ Pattern for verifying machine IDs

├─ 📄 **deno.json**\
│ ℹ Deno configuration for this API package

├─ 📄 **mod.ts**\
│ ℹ Re-exports items from `napps-list.ts`

├─ 📄 **napp-api.ts**\
│ ℹ Defines core NAPP interfaces and errors\
│ 1. `NappSnapshots, NappRead, NappWrite, NappProcesses, NappApi`\
│ ℹ Organize the API’s reading/writing/processing layers\
│ 2. `settle(meta) => Promise<JsonValue>`\
│ ℹ Converts dispatch metadata into a resolved or rejected result\
│ 3. `FileNotFoundError, LineageError`\
│ ℹ Specialized error classes

├─ 📄 **napp.json**\
│ ℹ Placeholder JSON for NAPPS metadata

├─ 📄 **napps-list.ts**\
│ ℹ Maps local Napp references (`@artifact/files`, `@artifact/fixture`) to
`NappTypes`

├─ 📄 **randomness.ts**\
│ ℹ Provides deterministic or random string generation\
│ 1. `_enableDeterministicMockMode(), _disableDeterministicMockMode()`\
│ ℹ Toggles test-friendly mode\
│ 2. `peekRandomnessCount() => number`\
│ ℹ Tracks deterministic calls\
│ 3. `randomness() => string`\
│ ℹ Returns a random or deterministic string\
│ 4. `fixedRandomness(seed) => string`\
│ ℹ Hashes a seed into a stable random

├─ 📄 **types.ts**\
│ ℹ Shared types and definitions for the API\
│ 1. `EngineInterface, Splice, CommitObject, etc.`\
│ ℹ Data shapes for cross-module usage\
│ 2. `generateBackchatId() => string`\
│ ℹ Creates a unique backchat branch ID

└─ 📄 **watcher.ts**\
ℹ Implements `PierceWatcher` to handle backchat requests

1. `PierceWatcher.create(signal, engine, pid) => PierceWatcher`
2. `watch(ulid) => Promise<unknown>`
3. `watchPierces() => Promise<void>`
