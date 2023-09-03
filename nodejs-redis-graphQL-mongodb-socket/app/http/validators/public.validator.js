const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoDbObjectIdPattern } = require("../../utils/constans");

const ObjectIdValidator = Joi.object({
  id: Joi.string()
    .regex(MongoDbObjectIdPattern)
    .error(createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")),
});

module.exports = {
  ObjectIdValidator,
};
