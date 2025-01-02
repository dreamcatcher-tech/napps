# Transcriber

A CLI tool for transcribing audio or video content from YouTube or local files.\
It uses the Deepgram API to convert speech to text with optional speaker
diarization.

## Features

- Supports YouTube videos (`youtube` command) or local audio files (`file`
  command).
- Optionally specify output paths for transcripts.
- Automatically checks for your Deepgram API key (prompts you if not found).
- CLI usage patterns similar to other Deno-based tools.
- Uses modern ES modules and Commander for command parsing.

## Usage

```bash
transcriber [command] [options]
```

### Commands

- **youtube**\
  Transcribe a YouTube video.
  ```bash
  transcriber youtube --url <URL> [--path <FILE>]
  ```
  - **--url** (or `-u`): YouTube video URL (required)
  - **--path** (or `-p`): Output transcript path (default: `transcript.txt`)

- **file**\
  Transcribe a local audio file.
  ```bash
  transcriber file --input <FILE> [--output <FILE>]
  ```
  - **--input** (or `-i`): Path to the audio file (required)
  - **--output** (or `-o`): Output transcript path (default: `transcript.txt`)

## Example

```bash
# Transcribe a YouTube video to transcript.txt
transcriber youtube -u "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

# Transcribe a local audio file to myTranscript.txt
transcriber file --input ./recording.mp3 --output myTranscript.txt
```

## Requirements

- Deno (latest stable)
- Permissions:
  - `--allow-read` for reading local files
  - `--allow-env` or local storage for storing/retrieving your Deepgram API key
  - `--allow-net` if transcribing from YouTube or any network-related work

## Installing as a CLI command

```bash
deno install --global -A jsr:@dreamcatcher/transcriber/cli
```

After this, `transcriber` is available as a system-wide command.

## Upgrading the CLI command

```bash
deno install --global --force -A jsr:@dreamcatcher/transcriber/cli
```

## Uninstallation

```bash
deno uninstall transcriber
```

This will remove the `transcriber` command from your system.
