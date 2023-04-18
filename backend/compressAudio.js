const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const inputFile = "audio.mp3";
const outputFile = "compressedAudio.mp3";
const command = ffmpeg();
command.input(inputFile);

// Set the audio codec to libmp3lame
command.audioCodec("libmp3lame");

// Set the audio bitrate to 128 kbps
command.audioBitrate("32k");
command.output(outputFile);
command
  .on("error", (err) => {
    console.error(`An error occurred: ${err.message}`);
  })
  .run();
