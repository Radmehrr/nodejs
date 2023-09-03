const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");
const {
  deleteInvalidPropertyInObject,
} = require("../../../../utils/functions");

class ChapterController extends Controller {
  async addChapter(req, res, next) {
    try {
      const { courseId, title, text } = req.body;
      await CourseController.findCourseById(courseId);
      const saveChapter = await CourseModel.updateOne(
        { _id: courseId },
        {
          $push: {
            chapters: { title, text, episodes: [] },
          },
        }
      );

      if (saveChapter.modifiedCount == 0)
        throw createHttpError.InternalServerError("فصل افروده نشد");

      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "فصل با موفقیت ایجاد شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async chaptersOfCourse(req, res, next) {
    try {
      const { courseID } = req.params;

      const course = await this.getChaptersOfCourse(courseID);
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

  async getChaptersOfCourse(id) {
    const chapters = await CourseModel.findOne(
      { _id: id },
      { chapters: 1, title: 1 }
    );
    if (!chapters)
      throw createHttpError.NotFound("دوره ای با این شناسه یافت نشد");
    return chapters;
  }

  async removeChapterById(req, res, next) {
    try {
      const { chapterId } = req.params;
      const chapter = await this.getOneChapter(chapterId);
      const removeChapterResult = await CourseModel.updateOne(
        {
          "chapters._id": chapterId,
        },
        {
          $pull: {
            chapters: {
              _id: chapterId,
            },
          },
        }
      );

      if (removeChapterResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("خطای داخلی");

      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "حذف فصل با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateChaoterById(req, res, next) {
    try {
      const { chapterId } = req.params;
      await this.getOneChapter(chapterId);
      const data = req.body;
      deleteInvalidPropertyInObject(data, ["_id"]);
      const updateResult = await CourseModel.updateOne(
        { "chapters._id": chapterId },
        {
          $set: {
            "chapters.$": data,
          },
        }
      );

      if (updateResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("به روزرسانی انجام نشد");

      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "به روزرسانی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneChapter(chapterId) {
    const chapter = await CourseModel.findOne(
      { "chapters._id": chapterId },
      { "chapters.$": 1 }
    );

    if (!chapter) throw createHttpError.NotFound("فصلی با این شناسه یافت نشد");
    return chapter;
  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
