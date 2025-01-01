This conversation outlines a structured, iterative approach to managing complex
projects using napps (modular AI-driven units) and stuck items (clearly defined
tasks or issues). Scott and Tom plan to evolve a “commander” system that will
maintain dynamic priorities, help identify contradictions, and produce
stakeholder-friendly reports. They’ll store priority lists and historical data
in the repository, continually refine their approach to formatting stucks and
generating automated summaries, and eventually integrate these capabilities with
code generation and domain-specific napps.

Key Points:

- Store priority lists in the repo for historical tracking (around 0:05–0:06).
- Provide generative stakeholder reports focusing on outcomes rather than
  internal tooling details (0:06–0:08).
- Use a stable napp format and refine stuck items iteratively, starting simple
  and adding detail as code and reasoning develop (0:14–0:16).
- Maintain clear naming, American spelling, and kebab-case to improve machine
  parsing and consistency (0:10, 0:33).
- Integrate dependencies into each stuck, enabling the model to infer Gantt
  charts and reverse dependencies (0:21–0:22).
- The commander should eventually highlight contradictions, guide priority
  adjustments, and break large goals into drops (0:20, 0:45).
- Move toward automated workflows, where commits trigger GitHub actions running
  napps to check integrity and rebuild reports (0:26–0:27, 1:19).
- Domains can each become a separate napp for clarity, and concepts like the
  inventor’s notebook napp will help manage innovation (1:09–1:10).
- Iterative improvements mean starting manually, then gradually automating, thus
  avoiding complexity overload upfront (0:22–0:24).

Next Steps:

1. Finalize a stable napp format and define stuck item structures clearly.
2. Maintain dynamic priority lists in the repo, referencing stucks by ID.
3. Begin producing stakeholder summaries at a set cadence (e.g., daily/weekly,
   monthly), focusing on relevant tasks and hurdles.
4. Add dependency data in stucks and experiment with model-generated Gantt
   charts and reverse dependency mappings.
5. Enhance the commander iteratively to spot contradictions, guide task
   selection, and automate parts of the workflow.
6. Break large goals into smaller, iterative deliverables, updating and refining
   them as more data and code are integrated.
7. Move toward integrated code generation and continuous automation, ultimately
   letting commits trigger napps that update all reports and metrics.
