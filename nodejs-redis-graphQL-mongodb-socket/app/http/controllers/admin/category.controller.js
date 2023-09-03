const category = require("../../../models/category");
const { CategoryModel } = require("../../../models/category");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const createError = require("http-errors");
const mongoose = require("mongoose");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await createCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createError.InternalServerError("خطای داخلی");
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "دسته بندی با موفقیت افزوده شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const cat = await this.checkExistCategory(id);
      const deleteResult = await CategoryModel.deleteMany({
        $or: [{ _id: cat._id }, { parent: cat._id }],
      });
      if (deleteResult.deletedCount == 0)
        throw createError.InternalServerError("حذف دسته بندی انجام نشد");

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "حذف دسته بندی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategoryTitle(req, res, next) {
    try {
      await updateCategorySchema.validateAsync(req.body);
      const { id } = req.params;
      const { title } = req.body;
      const category = await this.checkExistCategory(id);
      const result = await CategoryModel.updateOne(
        { _id: id },
        { $set: { title } }
      );

      if (result.modifiedCount == 0)
        throw createError.InternalServerError("به روز رسانی انجام نشد");

      return res.status(200).json({
        data: {
          message: "به روز رسانی با موفقیت انجام شد",
          statusCode: 200,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCategory(req, res, next) {
    try {
      //   const categories = await CategoryModel.aggregate([
      //     {
      //       $lookup: {
      //         from: "categories",
      //         localField: "_id",
      //         foreignField: "parent",
      //         as: "children",
      //       },
      //     },
      //     {
      //       $project: {
      //         __v: 0,
      //         "children.__v": 0,
      //         "children.parent": 0,
      //       },
      //     },
      //     {
      //       $match: {
      //         parent: undefined,
      //       },
      //     },
      //   ]);

      //   const categories = await CategoryModel.aggregate([
      //     {
      //       $graphLookup: {
      //         from: "categories",
      //         startWith: "$_id",
      //         connectFromField: "_id",
      //         connectToField: "parent",
      //         maxDepth: 5,
      //         depthField: "depth",
      //         as: "children",
      //       },
      //     },
      //     {
      //       $project: {
      //         __v: 0,
      //         "children.__v": 0,
      //         "children.parent": 0,
      //       },
      //     },
      //     {
      //       $match: {
      //         parent: undefined,
      //       },
      //     },
      //   ]);

      const categories = await CategoryModel.find({ parent: undefined });
      return res.status(200).json({
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const categories = await CategoryModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);

      return res.status(200).json({
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const parents = await CategoryModel.find({ parent: undefined });
      return res.status(200).json({
        data: {
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParent(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await CategoryModel.find({ parent }, { title: 1 });
      return res.status(200).json({
        data: {
          children,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCategoriesWithoutPopulate(req, res, next) {
    try {
      const categories = await CategoryModel.aggregate([
        {
          $match: {},
        },
      ]);
      return res.status(200).json({
        data: {
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkExistCategory(catId) {
    const category = await CategoryModel.findById(catId);
    if (!category) throw createError.NotFound("دسته بندی یافت نشد");
    return category;
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
