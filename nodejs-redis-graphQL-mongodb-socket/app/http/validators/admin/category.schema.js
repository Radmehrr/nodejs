const Joi = require("joi");
const { MongoDbObjectIdPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");

const createCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی باید بین سه تا سی کاراکتر باشد.")),

  parent: Joi.string()
    .allow("")
    .regex(MongoDbObjectIdPattern)
    .allow("")
    .error(createHttpError.BadRequest("شناسه ارسال شده صحیح نمیباشد")),
});

const updateCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان دسته بندی باید بین سه تا سی کاراکتر باشد.")),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
