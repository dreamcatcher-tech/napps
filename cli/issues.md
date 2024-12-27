must specify either --params or individual params, not both

should generate a shortcut single letter command for each command, as well as
the full string being the key of the param

explicit help mention of if nested params are present, can use json string to
pass the json object to the key in the command, or use the --params flag

The names of the command should be automatically extracted from the napp.json

ajv should be used to validate the params against the schema, and should do this
lazily

default tools should be supported, so no need to specify the tool name

if there is a default tool, then we should allow it to be called by name as well
as by default

when running local, should be able to set it to use a ramdisk for the fs

booleans should be true if present, false if not, or explicitly set
