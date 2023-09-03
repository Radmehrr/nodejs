const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/user");
const { deleteInvalidPropertyInObject } = require("../../../utils/functions");
const Controller = require("../controller");

class UserController extends Controller {
  async getAllUsers(req, res, next) {
    try {
      const { search } = req.query;
      const databaseQuery = {};
      if (search) databaseQuery["$text"] = { $search: search };
      console.log(databaseQuery);
      const users = await UserModel.find({});
      return res.status(200).json({
        statusCode: 200,
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserProfile(req, res, next) {
    try {
      const userId = req.user._id;
      const data = req.body;
      const blackListFields = [
        "phone",
        "otp",
        "bills",
        "discount",
        "roles",
        "courses",
      ];
      deleteInvalidPropertyInObject(data, blackListFields);
      const updatedUserProfile = await UserModel.updateOne(
        { _id: userId },
        {
          $set: data,
        }
      );
      if (!updatedUserProfile.modifiedCount)
        throw createHttpError.InternalServerError("به روزرسانی انجام نشد");
      return res.status(200).json({
        statusCode: 200,
        data: {
          message: "به روزرسانی پروفایل با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async userProfile(req, res, next) {
    try {
      const user = req.user;
      return res.status(200).json({
        statusCode: 200,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
