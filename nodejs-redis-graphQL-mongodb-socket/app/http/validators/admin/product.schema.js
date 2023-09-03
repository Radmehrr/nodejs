const Joi = require("joi");
const { MongoDbObjectIdPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");

const createProductSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(createHttpError.BadRequest("عنوان محصول صحیح نمیباشد")),

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

  height: Joi.number()
    .empty()
    .error(createHttpError.BadRequest("ارتفاع وارد شده صحیح نمیباشد")),
  weight: Joi.number()
    .empty()
    .error(createHttpError.BadRequest("ورن وارد شده صحیح نمیباشد")),
  width: Joi.number()
    .empty()
    .error(createHttpError.BadRequest("عرض وارد شده صحیح نمیباشد")),
  length: Joi.number()
    .empty()
    .error(createHttpError.BadRequest("طول وارد شده صحیح نمیباشد")),

  filename: Joi.string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
  fileUploadPath: Joi.allow(),

  type: Joi.string().regex(/(virtual|phisical)/i),
  colors: Joi.array()
    .min(0)
    .max(20)
    .error(createHttpError.BadRequest("رنگ ها نمیتواند بیش از 20 تا باشه")),
});

module.exports = {
  createProductSchema,
};
