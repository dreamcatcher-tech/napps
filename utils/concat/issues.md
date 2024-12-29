Does not ignore .pdf by default

Default is not recursive, but maybe that is correct, and maybe it should have a
-r flag to make it recursive.

Use https://www.npmjs.com/package/git-diff to pull up diffs. Allow arbitrarily
many diffs to be compared, with each other, or with a single commit. Used with
concat to ask the model to reason about what has changed between different
things. Takes advantage of the snapshots history that is part of the napp
format.

concat **/so-what.md does not recurse into subdirectories unless you quote the
glob. The shell is actually our problem, and we should work around it.

passing in a folder path does not recurse it - this might be the shell problem
tho.

concat should show what its args were at the start, so we can see what the shell
processed.

ignore concat.txt since this is the output of a previous run of this tool.

allow --tokens to only count the tokens and not write an actual concat.txt file.

should allow a preselection of purposes to include some base prompts with the
concat as well as the project contents.

optionally pull in the import map if in a monorepo, and the base rules. If we
have a format for putting rules in somewhere known, it can navigate appropriate
files and pull them in. Be like .concat-rules which gives it some command line
options when it runs.

.concat-rules should say what should specially be ignored as well ?

honour .gitignore all the way up to the root of the repo.

BEGIN FILE should maybe be a single name, and end in a colon, making it plain
that it is a key attribute, and separate from the file name.

If I run `concat . ../../reasoner/PROJECT_MAP_INSTRUCTIONS.md` then it does not
pull in everything recursively from . however seems to be shell globbing again

Should supply a file system overview in the concat, optionally

nested concat.txt files specified by glob are not being ignored

ignore .env files, or any . files at all

Each file output should indicate how many tokens it is.

Each folder that was processed with more than one file should indicate how many
tokens it is.

Files should be output in a filesystem tree

ignore .png or other binary files.

ignore .gitignore files ?

ignore package-lock.json - basically should honour .gitignore

When working in a monorepo or workspace, can use the import map, and the shared
vendor-docs folders

Vendor docs would be a configurable param for the concat file and can have
multiple locations

select a prompt to go with the concat, which is based on purpose - probably
better as a separate package that combines with the concat

include a tree listing at the end optionally in case the bot needs to ask for
more information.

.svg files should be ignored

In each output, indicate how many tokens it is, and how many bytes.

If the context window is exceeded, then concat should error.

No uninstall instructions in the README.
