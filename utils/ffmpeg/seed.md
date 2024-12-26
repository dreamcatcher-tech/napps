Makes a napp wrapper around ffmpeg.

Useful because we can use process management to run multiple instances of ffmpeg
in parallel, to do heavy processing in a serverless environment.

Can also use the artifact filesystem to reduce the peak memory usage of ffmpeg.
