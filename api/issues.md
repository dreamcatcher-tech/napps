processes and snapshots seem blended too much, whereas we might want to read and
write from a branch without having anything to do with a process.

? are processes separated from snapshots and have their own filesystem
equivalent ? or is it just their state ?

Processes should have their own filesystems.
