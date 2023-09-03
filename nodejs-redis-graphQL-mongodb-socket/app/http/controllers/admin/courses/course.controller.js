const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../models/course");
const {
  createCourseSchema,
} = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { default: mongoose } = require("mongoose");
const {
  deleteInvalidPropertyInObject,
  deleteFileInPublic,
  copyObject,
  getCourseTime,
} = require("../../../../utils/functions");
const { domainToASCII } = require("url");

class CourseController extends Controller {
  async getListOfCourses(req, res, next) {
    try {
      const { search } = req.query;
      let courses;
      if (search) {
        courses = await CourseModel.find({
          $text: {
            $search: search,
          },
        })
          .populate([
            {
              path: "teacher",
              select: {
                first_name: 1,
                username: 1,
                last_name: 1,
                email: 1,
                phone: 1,
              },
            },
            { path: "category", select: { children: 0, parent: 0 } },
          ])
          .sort({ _id: -1 });
      } else
        courses = await CourseModel.find({})
          .populate([
            { path: "category", select: { title: 1 } },
            {
              path: "teacher",
              select: {
                first_name: 1,
                username: 1,
                last_name: 1,
                email: 1,
                phone: 1,
              },
            },
          ])
          .sort({ _id: -1 });
      return res.status(200).json({
        data: {
          statusCode: 200,
          courses,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async addCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);
      const { fileUploadPath, filename } = req.body;
      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const { title, text, short_text, category, tags, price, discount, type } =
        req.body;

      if (Number(price) > 0 && type === "free")
        throw createHttpError.BadRequest(
          "برای دوره رایگان نمیتوانید فیمت ثبت کنید"
        );
      await CourseModel.create({
        title,
        text,
        short_text,
        category,
        tags,
        price,
        discount,
        image,
        teacher: req.user._id,
        type,
      });

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "دوره با موفقیت اضافه شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await CourseModel.findById(id);
      if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
      return res.status(200).json({
        statusCode: 200,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCourseByID(req, res, next) {
    try {
      const { id } = req.params;
      const { fileUploadPath, filename } = req.body;
      const course = await this.findCourseById(id);
      const data = copyObject(req.body);
      let blackListFields = [
        "time",
        "chapters",
        "episodes",
        "students",
        "bookmarks",
        "likes",
        "dislikes",
        "comments",
        "fileUploadPath",
        "filename",
      ];

      deleteInvalidPropertyInObject(data, blackListFields);
      if (req.file) {
        data.image = path.join(fileUploadPath, filename);
        deleteFileInPublic(course.image);
      }

      const updateCourseResult = await CourseModel.updateOne(
        { _id: id },
        { $set: data }
      );

      if (!updateCourseResult.modifiedCount)
        throw createHttpError.NotFound("به روزرسانی دوره انجام نشد");

      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "به روز رسانی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findCourseById(id) {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد");
    const course = await CourseModel.findById(id);
    if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
    return course;
  }
}

module.exports = {
  CourseController: new CourseController(),
};
