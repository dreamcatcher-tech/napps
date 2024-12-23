Take in a youtube url, and then return a diarized transcript with timestamps.

v1 will not have timestamps, but will have a diarized transcript.

this napp is just an orchestrator, and does the following steps:

1. download the youtube video
2. transcribe the youtube video
3. diarize the transcript
4. return the transcript
5. ask the user what the speaker names are
6. return the transcript with speaker names

It may allow some format changing for the transcript, like with or without
timestamps.

Or we can require that, if you want to rename the speakers, you have to pass
that in as a parameter

We can optionally modify a transcript that was returned to change the speaker
names.

So there is a base json object, which comes back from the stt napp, and then we
process that to generate the final transcript.

If the json file is passed in, then we use that to generate the final
transcript.

We would have options for output file names.
