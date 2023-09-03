const {
  UserController,
} = require("../../http/controllers/admin/user.controller");
const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS, ROLES } = require("../../utils/constans");

const router = require("express").Router();

router.get("/list", checkPermission([ROLES.USER]), UserController.getAllUsers);
router.patch("/update-profile", UserController.updateUserProfile);
router.get("/profile", checkPermission([]), UserController.userProfile);
module.exports = {
  AdminUserRoutes: router,
};
