const {
  BlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/", BlogController.getListOfBlogs);
router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  BlogController.createBlog
);
router.patch(
  "/update/:id",
  uploadFile.single("image"),
  stringToArray("tags"),
  BlogController.updateBlogById
);
router.get("/:id", BlogController.getOneBlogById);
router.delete("/:id", BlogController.deleteBlogById);
module.exports = {
  AdminBlogRoutes: router,
};
