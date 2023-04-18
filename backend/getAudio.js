const ytdl = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const videoUrl = "https://www.youtube.com/watch?v=Sec8srgS7ZQ";
// const videoUrl = "https://www.youtube.com/watch?v=oL1uem6-3m4";
const videoStream = ytdl(videoUrl, {
  quality: "highestaudio",
  filter: "audioonly",
});
ffmpeg(videoStream)
  .toFormat("mp3")
  .saveToFile("audio1.mp3", (stdout, stderr) => {})
  .on("end", () => {
    console.log("Finished converting video to MP3!");
  })
  .on("progress", (frames) => {
    console.log(frames.timemark);
  })
  .on("error", (err) => {
    console.error(err);
  })
  .run();