takes any given napp, downloads it, turns its napp.json into commander cli
commands, and then runs that command with the given parameters. The results are
then translated back into a return, most likely a string, as well as some
filesystem changes, which it will print out.

Manages the latest versions of the napp, so checks if it has a local version,
and will run that first, but will give a warning about the latest version,
requiring a specific actions to do an update, which can be all.

Can be configured to auto update on run first, or to check periodically for
updates.

To start with, we won't download anything, but we just run the napp.json from a
local project.

So we'll need a mock napp to call, and a mock api that just acts like the
filesystem

Specially, this napp has no tool export, since it never gets called as a tool
napp, but might still be asked questions via test about how it works.

A special flag would call a napp not as a tool but as an NL agent

I think to start with, we want to supply a mapping of names to napps, use
imports that are programmatically calculated, and generate the validators for
them if they get called using ajv.
