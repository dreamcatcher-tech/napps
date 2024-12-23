## Meeting Modes

1. **Tabling Mode** (“Commander, we table ideas”)
   - **Goal**: Introduce ideas without immediate criticism.
   - **Commander Actions**: Records each idea as separate items.
   - **Human Role**: State the idea succinctly, address the commander only.
   - **Forbidden**: In-depth feasibility or solution design.

2. **Clarification Mode** (“Commander, clarify”)
   - **Goal**: Gather quick clarifications on tabled ideas.
   - **Commander Actions**: Calls on humans in turn; logs clarifications.
   - **Human Role**: May pose short questions for better understanding. No
     criticism yet.

3. **Critical Analysis Mode** (“Commander, analyze”)
   - **Goal**: AI (commander) performs structured, logical critique (like
     **Black Hat**).
   - **Commander Actions**: Runs feasibility checks, identifies conflicts/gaps.
   - **Human Role**: Provide additional angles for the AI to analyze, but
     **avoid human-based criticism**—the AI is better at it.

4. **Voting Mode** (“Commander, vote”)
   - **Goal**: Decide which tabled item(s) to prioritize.
   - **Commander Actions**: Calls each human in turn for a vote, compiles
     results.
   - **Human Role**: Cast votes, propose if an item is done or needs more
     scrutiny.

5. **Speak-Easy Mode** (“Commander, speakeasy”)
   - **Goal**: Allow unstructured brainstorming or casual talk.
   - **Commander Actions**: Times the discussion, extracts possible new items at
     end.
   - **Human Role**: Freely discuss.
   - **Transition**: Commander ends with “Commander, endex” to re-enter a
     structured mode.

---

## Protocol Outline

1. **Opening (Identification Mode)**
   - Commander identifies each participant (voice or login).
   - Agenda is displayed/confirmed.

2. **Tabling Mode**
   - Each human addresses the commander: “Commander, I propose…”
   - Commander logs each proposal as a discrete item. No discussion or
     solutioning here.

3. **Clarification Mode**
   - Commander cycles through proposals, prompting clarifying questions.
   - Any question or confusion is strictly for understanding, not critique.

4. **Critical Analysis Mode**
   - Commander uses AI-based logic/feasibility checks on each proposal,
     capturing potential issues, conflicts, or expansions.
   - Humans can feed angles (“Commander, also check for cost impacts”), but
     humans do not do the critique.

5. **Voting Mode**
   - Commander calls each human to rank or vote on next steps for each item.
   - Final results become the official plan or backlog.
   - If disagreements remain, the commander can break ties with its own vote.

6. **Implementation Dispatch**
   - For items that pass, the commander sets them on a timeline and tasks
     offline reasoning (parallel concurrency with AI).
   - Humans that want deeper involvement coordinate with the commander offline.

7. **Speak-Easy Mode (Optional)**
   - At any point, a human can say: “Commander, speakeasy.”
   - Timer starts; freeform discussion.
   - After time expires or “endex” is called, the commander extracts any new
     tabled items.

8. **Enforcement & Interruptions**
   - Commander can mute or temporarily remove a participant for protocol
     violations.
   - Uncommon keywords like “endex” or “vote mode” trigger state changes.
   - If multiple humans talk simultaneously, the commander serializes them.

9. **Recording & Replay**
   - All utterances are stored as JSON blocks for quick replay.
   - If a statement is unclear, a participant may request a single replay
     (“Commander, replay segment…”) for correction.

10. **Closing**

- Commander reviews final tasks, next milestones, and any to-do items.
- The meeting ends with a confirmation that all participants are clear on
  assignments.

---

### Notes on Measuring Efficiency

- Commander tracks wasted time (off-topic or repeated content) vs. progress
  toward agenda.
- Over time, the system can generate an “efficiency score” based on how quickly
  items are tabled, clarified, critically analyzed, and voted.
- Groups can compete for minimal wastage—improving protocols iteratively.

---

This ensures minimal human-critical thinking time on each topic (the AI does the
heavy lifting) while giving humans enough room to propose ideas, clarify them,
and vote on priorities.
