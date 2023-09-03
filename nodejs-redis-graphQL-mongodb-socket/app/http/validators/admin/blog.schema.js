const Joi = require("joi");
const { MongoDbObjectIdPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");

const createBlogSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان بلاگ صحیح نمیباشد")),

  short_text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد.")
  ),
  text: Joi.string().error(
    createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد.")
  ),
  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jepg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(createHttpError.BadRequest("برچسب نمیتواند بیش از 20 آیتم باشد.")),
  category: Joi.string()
    .regex(MongoDbObjectIdPattern)
    .error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد")),

  fileUploadPath: Joi.allow(),
});

module.exports = {
  createBlogSchema,
};
