const router = require("express").Router();
const { SupportController } = require("../controller/soppurt.controller");
const { namespaceRouter } = require("./namespace.router");
const { roomRouter } = require("./room.router");

router.use("/namespace", namespaceRouter);
router.use("/room", roomRouter);
router.get("/", SupportController.renderChatRoom);

module.exports = {
  supportRouter: router,
};
