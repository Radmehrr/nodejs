const {
  createEpisodeSchema,
} = require("../../../validators/admin/course.schema");
const { getVideoDurationInSeconds } = require("get-video-duration");
const Controller = require("../../controller");
const path = require("path");
const {
  getTime,
  deleteInvalidPropertyInObject,
} = require("../../../../utils/functions");
const { CourseModel } = require("../../../../models/course");
const createHttpError = require("http-errors");
const { ObjectIdValidator } = require("../../../validators/public.validator");

class EpisodeController extends Controller {
  async addEpisode(req, res, next) {
    try {
      const {
        title,
        text,
        type,
        chapterId,
        courseId,
        filename,
        fileUploadPath,
      } = await createEpisodeSchema.validateAsync(req.body);

      const fileAddress = path.join(fileUploadPath, filename);
      const videoAddress = fileAddress.replace(/\\/g, "/");
      const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
      const seconds = await getVideoDurationInSeconds(videoURL);
      const time = getTime(seconds);

      const episode = {
        title,
        text,
        type,
        time,
        videoAddress,
      };
      const createEpisodeResult = await CourseModel.updateOne(
        {
          _id: courseId,
          "chapters._id": chapterId,
        },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );

      if (createEpisodeResult.modifiedCount == 0)
        throw createHttpError.InternalServerError(
          "افزودن اپیزود با خطا روبه رو شد"
        );
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "اپیزود با موفقیت اضافه شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeEpisode(req, res, next) {
    try {
      const { id: episodeId } = await ObjectIdValidator.validateAsync({
        id: req.params.episodeId,
      });

      const removeResult = await CourseModel.updateOne(
        {
          "chapters.episodes._id": episodeId,
        },
        {
          $pull: {
            "chapters.$.episodes": {
              _id: episodeId,
            },
          },
        }
      );

      if (removeResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("حذف نشد");

      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "حذف شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateEpisode(req, res, next) {
    try {
      const { id: episodeId } = await ObjectIdValidator.validateAsync({
        id: req.params.episodeId,
      });
      const episode = this.getOneEpisode(episodeId);
      const { filename, fileUploadPath } = req.body;
      const blackListFields = ["_id"];
      if (filename && fileUploadPath) {
        const fileAddress = path.join(fileUploadPath, filename);
        req.body.videoAddress = fileAddress.replace(/\\/g, "/");
        const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
        const seconds = await getVideoDurationInSeconds(videoURL);
        req.body.time = getTime(seconds);
        blackListFields.push("filename");
        blackListFields.push("fileUploadPath");
      } else {
        blackListFields.push("time");
        blackListFields.push("videoAddress");
      }

      const data = req.body;
      deleteInvalidPropertyInObject(data, blackListFields);
      const newEpisode = {
        ...episode,
        ...data,
      };
      console.log(newEpisode);
      // const updateEpisodeResult = await CourseModel.updateOne(
      //   {
      //     "chapters.episodes._id": episodeId,
      //   },
      //   {
      //     $set: {
      //       "chapters.$.episodes._id": data,
      //     },
      //   }
      // );

      // if (!updateEpisodeResult.modifiedCount)
      //   throw createHttpError.InternalServerError(
      //     "ویرایش اپیزود با خطا روبه رو شد"
      //   );
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "اپیزود با موفقیت ویرایش شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneEpisode(episodeId) {
    const course = await CourseModel.findOne(
      {
        "chapters.episodes._id": episodeId,
      },
      { "chapters.$.episodes": 1 }
    );

    if (!course) throw createHttpError.NotFound("اپیزود یافت نشد");
    const episode = course?.chapters?.[0].episodes?.[0];
    if (!episode) throw createHttpError.NotFound("اپیزود یافت نشد");
    return episode;
  }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};
