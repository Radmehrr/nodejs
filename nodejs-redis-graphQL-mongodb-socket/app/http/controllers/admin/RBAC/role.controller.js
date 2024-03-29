const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../models/role");
const Controller = require("../../controller");
const { createRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../../utils/functions");

class RoleController extends Controller {
  async getAllRoles(req, res, next) {
    try {
      const roles = await RoleModel.find({});
      return res.status(200).json({
        statusCode: 200,
        data: {
          roles,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async createNewRole(req, res, next) {
    try {
      const { title, permissions } = await createRoleSchema.validateAsync(
        req.body
      );

      await this.findRoleWithTitle(title);
      const role = await RoleModel.create({ title, permissions });
      if (!role) throw createHttpError.InternalServerError("نقش ایجاد نشد");
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "نقش باموفقیت ایجاد شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeRole(req, res, next) {
    try {
      const { field } = req.params;
      const role = await this.findRoleWithIdOrTitle(field);
      const removeResult = await RoleModel.deleteOne({ _id: role._id });
      if (!removeResult.deletedCount)
        throw createHttpError.InternalServerError("حذف نقش انجام نشد");
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "حذف نقش با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateRoleById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findRoleWithIdOrTitle(id);
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data, ["_id"]);
      const updateResult = await RoleModel.updateOne(
        { _id: id },
        { $set: data }
      );
      if (!updateResult.modifiedCount)
        throw createHttpError.InternalServerError("خطای داخلی");
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "ویرایش دسترسی انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findRoleWithTitle(title) {
    const role = await RoleModel.findOne({ title });
    if (role) throw createHttpError.NotFound("نقش از قبل وجود داشته است");
  }

  async findRoleWithIdOrTitle(field) {
    let findQuery;

    findQuery = mongoose.isValidObjectId(field)
      ? { _id: field }
      : { title: field };

    console.log(findQuery);
    if (!findQuery) throw createHttpError.BadRequest("پارامتری ارسال نشد");
    const role = await RoleModel.findOne(findQuery);
    if (!role) throw createHttpError.NotFound("نقشی یافت نشد");
    return role;
  }
}

module.exports = {
  RoleController: new RoleController(),
};
