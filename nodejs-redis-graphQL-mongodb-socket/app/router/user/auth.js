const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
router.post("/getOtp", UserAuthController.getOtp);
router.post("/checkOtp", UserAuthController.checkOtp);
router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
  UserAuthRoutes: router,
};
