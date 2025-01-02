# Project Map Instructions

**Purpose:**\
`PROJECT_MAP.md` provides a high-level map of the project’s structure, purpose,
and key components. It helps new contributors quickly understand the overall
layout and logic without too much detail.

**Key Rules:**

- Start at `📦 PROJECT_ROOT/`.
- Organize top-level folders and files first, with important items at the top.
- Place `dependencies` at the bottom, with `vendor-docs` above it if it exists.
- Notation:
  - `📦` for the root project
  - `📂` for directories
  - `📄` for files
  - `🧩` for dependent projects
- Under each file, list:
  - Exported functions for code files, including their TS parameter/return
    types. Do not include functions that are not exported.
  - Top-level headings for knowledge files such as markdown documents.
  - All tests for test files using the description of the test, but only the top
    level tests. Do not include sub-steps inside the test. Tests do not need an
    info note due to the description of the test being informative enough.
- Add a short rationale note (`ℹ`) beneath each item.
- Skip low-level internal files that aren’t architecturally important.
- Exclude `PROJECT_MAP.md` from its own map.
- Exclude `vendor-docs` details deeper than just the folder names, as the
  details are not within our control, being vendor supplied..
- Never mention anything about any files that have been omitted from the map.
- always use kebab-case for file names except for top level .md files like
  README.md
- test filenames must follow the format `<name>.test.<extension>`
- dependencies are pulled out from the deno.json file and a primarily used to
  link relevant vendor-docs documentation to the usage of the vendor module.

**Structure Example:**

```text
📦 /
├─ 📂 src
│  ├─ 📄 main.ts
│  │   ℹ Entry point for CLI
│  │   1. runCLI(args: string[]): Promise<number>
│  │      ℹ Parses CLI arguments, executes workflow, returns exit code
│  ├─ 📄 utils.ts
│  │   ℹ Shared utilities
│  │   1. formatOutput(input: string): string
│  │      ℹ Formats CLI output for readability
│  │   2. handleError(error: Error): void
│  │      ℹ Centralized error handling
│  └─ (Internal helper files omitted)
├─ 📂 tests
│  ├─ 📄 main.test.ts
│  │   ℹ Tests runCLI()
│  │   1. CLI runs with Valid args
│  │   2. CLI runs with Invalid args
│  ├─ 📄 utils.test.ts
│  │   ℹ Tests utils.ts functions
│  │   1. Correct string formatting
│  │   2. Logs error details as expected
├─ 📄 README.md
│   ℹ Quick start and top-level overview
│   1. Introduction
│   │  ℹ Brief project summary
│   2. Installation
│   │  ℹ Setup steps
│   3. Usage
│      ℹ Basic runtime instructions
├─ 📂 vendor-docs
│  ℹ External dependency documentation
│  └─ 📄 commander/
│     ℹ Docs for the `commander` CLI library
└─ 📂 dependencies
   ├─ 📦 @babel/parser
   │   ℹ Parses embedded JSON in scripts
   ├─ 📦 commander
   │   ℹ CLI argument parsing library
   └─ 🧩 subproject1
       ℹ Integrated dependent project
```

**Why This Format?**

- Using `ℹ` notes and uniform structure allows automated extraction and
  filtering of both structural and rationale information.
- Explicit TS types for functions clarify inputs and outputs.
- Listing all tests under each test file ensures a complete snapshot of the
  project’s verification points.
- This approach keeps the overview clean, easy to maintain, and useful at any
  level of detail.
