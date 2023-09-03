const Joi = require("joi");
const { MongoDbObjectIdPattern } = require("../../../utils/constans");

const createRoleSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان نقش باید بین سه تا سی کاراکتر باشد.")),

  description: Joi.string()
    .min(0)
    .max(100)
    .error(new Error("توضیحات نقش باید بین صفر تا صد کاراکتر باشد.")),

  permissions: Joi.array()
    .items(Joi.string().pattern(MongoDbObjectIdPattern))
    .error(new Error("شناسه وارد شده صحیح نمیباشد")),
});

const createPermissionSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .error(new Error("عنوان نقش باید بین سه تا سی کاراکتر باشد.")),

  description: Joi.string()
    .min(0)
    .max(100)
    .error(new Error("توضیحات دسترسی باید بین صفر تا صد کاراکتر باشد.")),
});

module.exports = {
  createRoleSchema,
  createPermissionSchema,
};
