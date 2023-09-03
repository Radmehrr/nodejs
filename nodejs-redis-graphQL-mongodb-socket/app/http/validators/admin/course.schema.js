const Joi = require("joi");
const { MongoDbObjectIdPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");

const createCourseSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان دوره صحیح نمیباشد")),

  short_text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد.")
  ),
  text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد.")
  ),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(createHttpError.BadRequest("برچسب نمیتواند بیش از 20 آیتم باشد.")),

  category: Joi.string()
    .regex(MongoDbObjectIdPattern)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),

  price: Joi.number().error(
    createHttpError.BadRequest("قیمت وارد شده صحیح نمیباشد")
  ),
  count: Joi.number().error(
    createHttpError.BadRequest("تعداد وارد شده صحیح نمیباشد")
  ),
  discount: Joi.number().error(
    createHttpError.BadRequest("تخفیف وارد شده صحیح نمیباشد")
  ),

  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),

  type: Joi.string().regex(/(free|cash|special)/i),
});

const createEpisodeSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان دوره صحیح نمیباشد")),

  text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد.")
  ),

  type: Joi.string().regex(/(open|lock)/i),

  courseId: Joi.string()
    .regex(MongoDbObjectIdPattern)
    .error(createHttpError.BadRequest(" شماسه دوره مورد نظر یافت نشد")),

  chapterId: Joi.string()
    .regex(MongoDbObjectIdPattern)
    .error(createHttpError.BadRequest(" شناسه فصل مورد نظر یافت نشد")),

  filename: Joi.string()
    .regex(/(\.mp4|\.mov|\.mkv|\.mpg|\.avi)$/)
    .error(createHttpError.BadRequest("فرمت ویدیو ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),
});

module.exports = {
  createCourseSchema,
  createEpisodeSchema,
};
