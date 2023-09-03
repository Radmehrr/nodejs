const createHttpError = require("http-errors");
const { PermissionModel } = require("../../../../models/permission");
const {
  createPermissionSchema,
} = require("../../../validators/admin/RBAC.schema");
const Controller = require("../../controller");
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../../utils/functions");

class PermissionController extends Controller {
  async getAllPermissions(req, res, next) {
    try {
      const permissions = await PermissionModel.find({});
      return res.status(200).json({
        statusCode: 200,
        data: {
          permissions,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async removePermission(req, res, next) {
    try {
      const { id } = req.params;
      await this.findPermissionWithId(id);
      const removeResult = await PermissionModel.deleteOne({ _id: id });
      if (!removeResult.deletedCount)
        throw createHttpError.InternalServerError("خطای داخلی");
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "حذف دسترسی انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePermissionById(req, res, next) {
    try {
      const { id } = req.params;
      await this.findPermissionWithId(id);
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data, ["_id"]);
      const updateResult = await PermissionModel.updateOne(
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

  async createNewPermission(req, res, next) {
    try {
      const { name, description } = await createPermissionSchema.validateAsync(
        req.body
      );
      await this.findPermissionWithName(name);
      const permission = await PermissionModel.create({ name, description });
      if (!permission)
        throw createHttpError.InternalServerError("دسترسی ایجاد نشد");
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "دسترسی باموفقیت ایجاد شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async findPermissionWithName(name) {
    const permission = await PermissionModel.findOne({ name });
    if (permission) throw createHttpError.BadRequest("دسترسی از قبل وجود دارد");
  }
  async findPermissionWithId(id) {
    const permission = await PermissionModel.findOne({ _id: id });
    if (!permission) throw createHttpError.NotFound("دسترسی یافت نشد");
    return permission;
  }
}

module.exports = {
  PermissionController: new PermissionController(),
};
