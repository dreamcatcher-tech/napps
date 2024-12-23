start with deepgram, but allow other transcription services, which are specified
in the passed parameters.

allow options:

1. profanity filter
1. diarization
1. filler words

We might do a second pass thru an intelligent bot, like o1, to clean up the
transcript.

We should pass in corrections to allow the transcript to have more correct words

To start with, we just output the transcript, but then we will figure out
timestamps and how they are best included.

Whats good about this, in the future, is that it can run on our serverless
platform, so you won't need your own api key with the services you use, you just
need to log in with our platform.

use keyword boosting, so we can include common words from the definitions.

allow keyword suppression, if we have commonly misinterpreted words.

Ultimately we want a feedback loop where we know what got transcribed wrong, so
that it gets automatically fed into the boosting process.

Declare the balance of the deepgram account each call, and the cost incurred
plus time taken to do the call
