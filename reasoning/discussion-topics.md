1. repo rules should go into the definitions of the commander.

2. The concept of a key set of generated files that get updated when new
   information changes, which is an architectural patten:

> The core structure of the project is maintained by a set of key files, each
> backed by a “reasons to change” document. These documents define the purpose
> and the conditions under which their associated files should be updated. When
> new information—such as a transcript or data feed—arrives, the system inspects
> each file against its “reasons to change.” If conditions are met, the file is
> updated accordingly, ensuring that the project’s foundational materials remain
> accurate and relevant.

> This update process is not isolated. Each file’s change may trigger downstream
> modifications in related artifacts—such as tasks, reports, or other project
> management docs—that depend on the altered file. By systematically cascading
> updates through the network of related files, the process ensures that each
> piece of input data propagates consistently, maintaining a coherent and fully
> synchronized project state.

3. define what the name is of the type of rule that makes new rules, like a
   subprocess in the commander

4. How can I get a prize from the commander ? like a medal or a badge of honour
   ? and how can I be punished for not doing the recommended actions ?

5. define consensus level stucks, things that we quickly need to reach agreement
   on, since this affects the smooth flow of communications, such as defining
   what a solution is, how I would split some stucks, or merge them, and the
   same with solutions, plus indicate expected solution delivery, like non napp,
   new napp, or patched napp.
