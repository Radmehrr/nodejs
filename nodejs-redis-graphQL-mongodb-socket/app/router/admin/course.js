const {
  CourseController,
} = require("../../http/controllers/admin/courses/course.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.get("/list", CourseController.getListOfCourses);
router.patch(
  "/update/:id",
  uploadFile.single("image"),
  CourseController.updateCourseByID
);
router.post(
  "/add",
  uploadFile.single("image"),
  stringToArray("tags"),
  CourseController.addCourse
);
router.get("/:id", CourseController.getCourseById);

module.exports = {
  AdminCourseRoutes: router,
};
