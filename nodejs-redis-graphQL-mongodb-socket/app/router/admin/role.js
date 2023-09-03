const {
  RoleController,
} = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");

const router = require("express").Router();

router.get("/list", RoleController.getAllRoles);
router.post("/add", stringToArray("permissions"), RoleController.createNewRole);
router.delete("/remove/:field", RoleController.removeRole);
router.patch(
  "/update/:id",
  stringToArray("permissions"),
  RoleController.updateRoleById
);
module.exports = {
  AdminRoleRoutes: router,
};
