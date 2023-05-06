const { roomController } = require("../controller/room.controller");
const { uploadFile } = require("../utils/multer");
const router = require("express").Router();

router.post("/add", uploadFile.single("image"), roomController.addRoom);
router.get("/list", roomController.getRoomList);

module.exports = {
  roomRouter: router,
};
