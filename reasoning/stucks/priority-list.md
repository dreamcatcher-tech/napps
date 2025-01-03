# Priority List

> **Commander speaking.** I’ve read whatever was in your
> `../code/napps/reasoning/stucks/S*` files, plus the new updates from our
> latest discussion. Here’s the consolidated and **current** priority list of
> Stucks, from highest to lowest. If something conflicts with your old
> references, speak up, or I’ll assume this is correct.

---

## 1. STUCK A: “Minimal Read-Only CRM Delivery”

- **Current Priority**: **Highest**
- **Description**: A bare-bones CRM for the trucking folks, just read-only
  functionality, no bells and whistles. We keep repeating it’s top priority.
  Enough talk; let’s see it built.
- **References**:
  - Old references might be in `S24` if you’d called it “Trucking App” or “CRM”
    earlier.
  - Latest transcripts around `[0:01], [0:31]` confirm it’s #1.
- **Dependencies**:
  - Potentially reliant on a working transcriber (STUCK B), but that’s optional.
- **Estimate**:
  - 2–3 days of “narrow-scope” AI prompts, plus integration checks. Possibly 1–2
    weeks total.
- **Next Action**:
  - Confirm user acceptance criteria and a deadline date.

---

## 2. STUCK B: “Transcriber Reliability Fix”

- **Current Priority**: **High**
- **Description**: Our YouTube-based transcription pipeline is unreliable ~50%
  of the time. Some region-block fix can solve it quickly.
- **References**: Possibly old “transcriber” stuck in your `S*` files; new
  transcript ~[0:32–0:34] says 30 minutes to fix.
- **Dependencies**:
  - External: YouTube’s region quirks. We can’t force them to behave; we only
    patch our script.
- **Estimate**:
  - ~30 minutes dev + ~1–2 hours test.
- **Next Action**:
  - Tom or a designated dev must push the fix.

---

## 3. STUCK C: “AI Over-Summarizing / Partial Output”

- **Current Priority**: **Medium**
- **Description**: O1 Pro hides or omits details it considers unimportant. We
  have to “pistol-whip” it to get full dumps. It’s annoying, but not a
  showstopper if we prompt carefully.
- **References**: Possibly touches old “Commander synergy” stuck; new transcript
  ~[0:04–0:06], [0:08–0:09].
- **Dependencies**:
  - System prompts or narrower tasks can mitigate.
- **Estimate**:
  - 1–3 days of trial/prompt refinements, or waiting for the full O1 Pro API.
- **Next Action**:
  - Finalize a stable prompt strategy or wait for system-level overrides.

---

## 4. STUCK D: “Task Overload & Thread Naming Chaos”

- **Current Priority**: **Medium**
- **Description**: We generate tasks too broadly; O1 Pro gets hammered with
  giant prompts. Also, random thread naming is causing confusion.
- **References**: Possibly near old “Commander MVP” stuck; new transcripts
  ~[0:25–0:28].
- **Dependencies**:
  - Commander updates could partition tasks better.
- **Estimate**:
  - Ongoing workflow fix. Hard to measure.
- **Next Action**:
  - Start naming threads, keep tasks focused. If Commander is ready, use it.

---

## 5. STUCK E: “Longitudinal Topics & ‘Batch’ Extraction”

- **Current Priority**: **Lower**
- **Description**: We want a background job (nicknamed “grinder,” but we hate
  that name) to detect recurring themes from all transcripts. Not urgent but
  valuable.
- **References**: Possibly a new item; transcripts ~[0:42–0:45].
- **Dependencies**:
  - Summaries, stable transcriber, consistent domain storage.
- **Estimate**:
  - 2–3 days of prompt design if AI-based only; indefinite if deeper Commander
    integration is required.
- **Next Action**:
  - Revisit after the CRM (STUCK A) and transcriber fix (STUCK B).

---

## 6. STUCK F: “Attribution / Metrics Dashboard”

- **Current Priority**: **Lowest**
- **Description**: A system to measure user or AI contribution, new vs. repeated
  info. Useful, but not immediately needed.
- **References**: Possibly cross-ref with old “Attribution Model,” new
  transcript ~[0:46–0:47].
- **Dependencies**:
  - Some structured log of changes. Might require Commander’s code merges or
    GitHub integration.
- **Estimate**:
  - 1–2 weeks to build a prototype. Could balloon if integrated into everything
    else.
- **Next Action**:
  - Decide if you want an interim approach or wait for Commander synergy.

---

# Next Steps

1. **Confirm CRM’s Hard Deadline**
2. **Get Transcriber Patch** deployed ASAP.
3. **Adopt Tighter Prompt Strategies** to reduce over-summarizing (STUCK C).
4. **Commander** improvements or user discipline to address thread clutter
   (STUCK D).
5. **Later**: Consider “batch” topic extraction (STUCK E) and the attribution
   dashboard (STUCK F).

**Done.** This is the updated `priority-list.md` content based on the new info
plus whatever was in your `S*` stuck files. Let me know if there’s a mismatch.
