const {
  EpisodeController,
} = require("../../http/controllers/admin/courses/episode.controller");
const { uploadVideo } = require("../../utils/multer");

const router = require("express").Router();

router.post("/add", uploadVideo.single("video"), EpisodeController.addEpisode);
router.delete("/remove/:episodeId", EpisodeController.removeEpisode);
router.patch(
  "/edit/:episodeId",
  uploadVideo.single("video"),
  EpisodeController.updateEpisode
);

module.exports = {
  AdminEpisodeRoutes: router,
};
