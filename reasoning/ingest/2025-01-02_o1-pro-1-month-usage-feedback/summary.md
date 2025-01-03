# Title

**“One Month with O1 Pro: Lessons Learned in AI-Driven Development”**

## Overview

The conversation focuses on real-world experiences using O1 Pro intensively for
software development over the past month. Tom and Scott share detailed feedback
on the model’s behavior with large token payloads, its near-elimination of
blatant hallucinations, and subtle issues like “soft” or “sticky” suggestions.
They contrast O1 Pro with simpler models, noting how best to feed context,
manage partial outputs, and structure tasks. They also explore broader
implications of AI in software workflows—covering incremental development,
discussion modes, new forms of “toil” from constant AI oversight, and a glimpse
at future automation via “Commander,” which orchestrates tasks, updates code,
and integrates new features. They end with next steps on transcriptions,
“longitudinal topics,” and tracking attributions.

## Breakdown of Topics

- **O1 Pro’s High-Load Usage**\
  Tom and Scott have both been pushing O1 Pro to handle large context windows
  (50k tokens or more). They confirm it handles them well but occasionally omits
  or shortens content if it “thinks” something is non-essential.

- **Hallucinations and Edge Cases**\
  Tom spotted only a few minor errors—like a mis-typed XML tag. Otherwise, O1
  Pro rarely hallucinates. They see “well-reasoned” but sometimes off-target
  responses if given incomplete instructions.

- **Smart vs. Over-Smart Output**\
  The model can be “too helpful,” merging branches or summarizing beyond user
  intent. They must carefully prompt or refine instructions to keep O1 Pro in
  line.

- **Incremental Approach**\
  They discuss the need to break tasks into narrower scope. Throwing many tasks
  at once leads the model to produce partial, incomplete, or summarized results.
  Smaller tasks yield better, more focused replies.

- **“Commander” Concept**\
  The ongoing plan is to develop a “Commander” system that manages updates to
  code, documentation, priorities, solutions, etc. They mention using a
  high-level prompt for each discrete file or domain, then letting the Commander
  unify them.

- **Human Workflow Shifts**\
  Both mention “new toil”: the AI is so fast that they must juggle multiple
  threads simultaneously, almost like managing a large, instant-response dev
  team. This demands discipline in naming conversation threads, clarifying
  scope, and reviewing outputs.

- **Context Merging & Tools**\
  Tom demonstrates generating architecture docs and passing them into O1 Pro or
  another AI (like Claude) to auto-create or modify the codebase. He highlights
  the synergy of using a single “master file” with all relevant context.

- **Longitudinal Topics & Solutions**\
  Toward the end, they raise the idea of capturing cross-conversation threads.
  “Longitudinal topics” could be extracted and processed in a “batch mode,” so
  that recurring ideas across transcripts become actionable.

- **Next Steps**
  - Refining the transcription pipeline, possibly with a small fix Tom can
    deliver in ~30 minutes.
  - Continuing to expand the “Commander” approach, but focusing on immediate
    needs for a simple CRM.
  - Considering metrics and “attribution dashboards” for measuring user or AI
    contributions.

---

## 3. Reference (Timestamped Summary)

Below are minute-by-minute summaries from **[0:00]** up through **[1:06]** (67
minutes total), covering each integral moment of the conversation. The
approximate timestamps align to one-minute intervals in the audio, which runs
about 67 minutes (4059.63 seconds).

### [0:00]

- Tom says “alright buddy you’re on.”
- Scott references starting the recording, wants to talk about O1 Pro usage and
  table a few updates around transcriber, a summarizer, and the Commander.

### [0:01]

- Tom and Scott confirm they’ll handle “O1 Pro usage” first because it’s a
  shared priority.
- Tom lists items: delivering the simplest possible read-only CRM, updates on O1
  Pro experiences, broader AI ecosystem impacts, and a commercialization idea.

### [0:02]

- Scott suggests they jump into O1 Pro feedback.
- Tom clarifies the conversation mode is “Commander synchronizing,” focusing on
  exchanging information.
- Tom mentions he’s been running O1 Pro nearly all day with 50k-token loads,
  describing the experience like “managing a dev team” with zero downtime.

### [0:03]

- Tom explains the new “toil” of always guiding or reviewing the AI.
- He notes a single minor “hallucination”: the AI repeated an XML tag
  incorrectly four times out of 50k tokens.
- Overall, extremely good results with few mistakes.

### [0:04]

- Scott shares similar experiences with large context payloads.
- He sees O1 Pro sometimes “hides” or omits data it deems irrelevant.
- Mentions an attempt to get minute-by-minute transcript summaries that it
  refused to fully produce.

### [0:05]

- Scott references “it’s like a good PA” that decides what you need.
- They encountered an issue with “pistol-whipping it” to provide more detail,
  but it sometimes stays terse.
- They suspect partial cause: O1 Pro not in an API with a sys-prompt yet.

### [0:06]

- Tom says O1 Pro is indeed superior to older O1 plus “high reasoning.”
- Scott anticipates improvements once O1 Pro is in the API.
- They compare wanting markdown output vs. the AI deciding not to.

### [0:07]

- Tom suggests the model’s “opinions” can be beneficial if harnessed correctly.
- He noticed when the AI updates a README, it references old constraints instead
  of rewriting them fully.

### [0:08]

- Scott says similarly, O1 Pro often “summarizes diffs” or “explains changes”
  when asked simply to do them.
- They suspect partial user error or incomplete instructions about the exact
  final format.

### [0:09]

- Tom proposes a technique: let O1 Pro do top-level reasoning, then switch to a
  “dumb model” or narrower approach for mechanical edits.
- He references a merge conflict scenario with Git branches the AI insisted on
  merging.

### [0:10]

- Scott wonders if repeated references to “git” in prompts bias O1 Pro toward
  merges.
- They discuss attempts like “forget everything about git,” which partially
  helps but not always.

### [0:11]

- Tom says the best quality is from the first reply. After that, the AI “sticks”
  to prior assumptions.
- Re-initializing threads is time-consuming but yields fresh results.

### [0:12]

- Scott describes an approach: literally typing “forget everything I said” can
  wipe the memory.
- Tom sees potential design issues in the code that lead O1 Pro to keep
  suggesting merges.

### [0:13]

- They talk about incremental design. Possibly they tried to do too many
  features at once, leading the AI to combine them incorrectly.
- The solution: do narrower tasks, then refine.

### [0:14]

- Scott reaffirms “Yes, a single shot approach with fewer requests at once works
  better.”
- Tom calls the AI “really smart in a weird way,” yet can degrade if
  overburdened.

### [0:15]

- Scott sees fewer hallucinations than older models.
- Tom says O1 Pro rarely fails or breaks.
- They note it’s possible the AI goes “off-piste” if it lacks certain
  definitions.

### [0:16]

- Tom relates an anecdote of the AI quoting files as justification.
- That’s fair: the file told it to use merges. They see it’s not random but
  internally consistent.

### [0:17]

- Scott says if the AI lacks data, it tries to fill the gap with training data.
  The burden is on humans to notice.
- Tom declares you still must read carefully, “like code reviews.”

### [0:18]

- Tom shares a demonstration: a top-level “project map” at an architectural
  level. He lumps it into O1 Pro, then drills into subfiles.
- Mentions iterative “high-level reason, then implement folder by folder.”

### [0:19]

- He describes an “inhale-exhale” approach: big architecture, then narrower
  coding, then back to high-level again.
- Compares it to a “Merkle tree” building out changes.

### [0:20]

- Scott says he’s doing something similar but sets certain files as AI-generated
  vs. certain files humans-only.
- He never directly edits the AI’s output; he corrects it by adjusting the
  prompt, so it won’t get overwritten next time.

### [0:21]

- Tom wonders if that’s always optimal—some minor edits might be faster.
- Scott replies that if you edit it manually, next AI pass might overwrite. So
  you must feed it to the AI again.

### [0:22]

- Tom nods: it’s an art to decide which changes are better done by the prompt
  vs. manual.
- He references a demonstration with Claude 3.5 that auto-creates or updates
  file structures from a spec.

### [0:23]

- Scott clarifies he likes the approach: “You have a big file of instructions,
  the AI acts on them.”
- Tom acknowledges the code might be incomplete, but the skeleton is there.

### [0:24]

- They see a future where a model can directly build the entire directory tree
  from a high-level design.
- Scott calls it a new skill set.

### [0:25]

- Tom says it’s “harder than ever,” especially mental overhead.
- They confirm it’s still faster than old methods, though.

### [0:26]

- Scott points out it’s like managing a “smart team.” Juggling multiple tasks in
  parallel is intense.
- He’s even labeling each O1 Pro tab with an intention, so he can come back
  without confusion.

### [0:27]

- Tom mentions naming threads is crucial. O1 Pro “randomly” labels them if busy.
- They might open with “I want this conversation to be about X” so it sticks.

### [0:28]

- Scott suggests a naming convention for threads. Tom is not fond of rigid
  naming, but sees value in labeling.
- They move on, Tom is about to show something else he’s doing with architecture
  docs.

### [0:29]

- Tom demonstrates converting vendor docs into “helpful markdown” for
  concatenation.
- He inspects HTML elements, copies them, and tells O1 Pro “make this a Markdown
  doc,” which works well.

### [0:30]

- Scott likes the idea.
- Tom says the main difficulty is juggling too many tasks at once, losing track
  mentally.
- He only has ~25 minutes left before he must sleep.

### [0:31]

- Tom clarifies he’s building up doc after doc, so the AI can reference them
  all.
- He notes it revealed new tasks and points for the Commander.
- They confirm the CRM remains top priority.

### [0:32]

- Tom wonders if focusing on the CRM is correct or if they should fix the
  transcriber first.
- Scott says transcriber is 50% working and might be a small fix.

### [0:33]

- Tom says YouTube blocks some downloads regionally. He can fix it in 30
  minutes.
- That’s worth doing. He’ll push changes soon.

### [0:34]

- They talk about how Tom reworked images or diagrams using ASCII or sequence
  diagrams with multiple prompts to get them “bot-friendly.”
- That approach is somewhat time-consuming.

### [0:35]

- Scott suggests they close “speakeasy” mode and move to “table mode.”
- Tom affirms. They have ~21 minutes left in total.

### [0:36]

- Scott wants to “report on” changes: summarizer, commander, solutions, etc.
- Summarizer identifies topics in transcripts. He’s now building a smaller
  iteration of that tool.

### [0:37]

- Tom clarifies if that’s a “tabled” or “reported” item. Scott says it’s a
  “report.”
- Summarizer is basically a NAP that pre-processes transcripts.
- No code changes needed from Tom.

### [0:38]

- Next, “Commander” uses the same approach but with different context files.
- They confirm no immediate actions for Tom.

### [0:39]

- They mention “Solutions” (or “Remedies”), referencing an older transcript.
  Scott calls them “solutions,” Tom says “remedies.”
- Scott clarifies the folder is empty for now.

### [0:40]

- Tom has no immediate questions.
- They shift to next items: “Attribution model” and “Longitudinal topics” that
  Scott wants to table.

### [0:41]

- Scott clarifies he’s “tabling” these new concepts for them to consider.
- Tom is slightly confused about which mode: “report” vs. “table.”

### [0:42]

- They proceed: “Longitudinal topics” means a concept that recurs across
  multiple transcripts. The “grinder” or “batch commander” might unify them.
- Tom references the need for a separate background job to find these recurring
  themes.

### [0:43]

- Scott jokes about not liking the “grinder” name.
- Tom sees it as a valid approach but possibly time-intensive.

### [0:44]

- Scott asks if it’s worth implementing now or later.
- Tom remarks on how everything is a Commander scheduling question. Possibly
  wait until the core platform is more automated.

### [0:45]

- They confirm the idea is now tabled. They see no immediate next steps unless
  the commander prioritizes it.
- They talk about not mixing the scheduling discussion into the tabling of the
  idea.

### [0:46]

- They move to “Attribution” concept.
- Tom says it’s more of a “metrics dashboard” than pure “attribution.” Could
  measure who or what contributed new info vs. repeated.
- They see it as valuable but not the same as “who wrote what lines of code.”

### [0:47]

- Scott agrees. They might mark it as a “remedy” or potential future solution.
- Time is nearly up.

### [0:48]

- They confirm Tom must leave soon.
- Scott says “That’s time; you must not be late.”

### [0:49]–[1:06]

- _(No further content; the conversation effectively wraps up. Tom ends by
  saying he’ll do the upload, concluding the call.)_

---

## Proposed Next Steps

1. **Refine the Transcription Pipeline**
   - Tom will push a quick fix (~30 minutes) to improve regional YouTube pulling
     reliability.

2. **Focus on CRM Delivery**
   - Keep a narrow scope; build the simplest read-only CRM for trucking as top
     priority.
   - Any new features or expansions should be incremental to avoid AI
     “over-summarizing.”

3. **Commander Maturation**
   - Continue evolving the “Commander” idea, letting it manage code updates,
     “stucks,” solutions, and context.
   - Integrate smaller sub-prompts for each discrete file or domain to maintain
     clarity.

4. **Explore Longitudinal Topics**
   - Later, create a background or “batch” approach that discovers recurring
     threads across transcripts.
   - Possibly rename “grinder” to a more neutral term.

5. **Metrics & Attribution**
   - Consider building dashboards or logs that track who contributed which
     portion of data or code.
   - Recognize it’s more about measuring “new info” or “contribution level” than
     literal line-by-line ownership.

6. **Incremental Workflow**
   - Keep tasks small, context sets narrower, and rely on O1 Pro’s first pass
     for the best quality.
   - Keep conversation threads clearly named to avoid confusion or “sticky”
     references to old discussions.
