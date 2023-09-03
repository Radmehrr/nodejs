const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS, ROLES } = require("../../utils/constans");
const { AdminBlogRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { AdminChapterRoutes } = require("./chapter");
const { AdminCourseRoutes } = require("./course");
const { AdminEpisodeRoutes } = require("./episode");
const { AdminPermissionRoutes } = require("./permission");
const { AdminProductRoutes } = require("./product");
const { AdminRoleRoutes } = require("./role");
const { AdminUserRoutes } = require("./user");

const router = require("express").Router();

router.use(
  "/category",
  checkPermission([PERMISSIONS.CONTENT_MANAGER]),
  CategoryRoutes
);
router.use(
  "/blog",
  checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.TEACHER]),
  AdminBlogRoutes
);
router.use(
  "/product",
  checkPermission([PERMISSIONS.SUPERADMIN, PERMISSIONS.CONTENT_MANAGER]),
  AdminProductRoutes
);
router.use(
  "/course",
  checkPermission([PERMISSIONS.TEACHER]),
  AdminCourseRoutes
);
router.use(
  "/chapter",
  checkPermission([PERMISSIONS.TEACHER]),
  AdminChapterRoutes
);
router.use(
  "/episode",
  checkPermission([PERMISSIONS.TEACHER]),
  AdminEpisodeRoutes
);
router.use("/user", AdminUserRoutes);
router.use("/role", checkPermission([PERMISSIONS.ADMIN]), AdminRoleRoutes);
router.use(
  "/permission",
  checkPermission([PERMISSIONS.ADMIN]),
  AdminPermissionRoutes
);

module.exports = {
  AdminRoutes: router,
};
