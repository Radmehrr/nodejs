const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/product");
const {
  deleteFileInPublic,
  listOfImagesFromRequest,
  copyObject,
  setFeature,
  deleteInvalidPropertyInObject,
} = require("../../../utils/functions");
const {
  createProductSchema,
} = require("../../validators/admin/product.schema");
const { ObjectIdValidator } = require("../../validators/public.validator");
const Controller = require("../controller");
const path = require("path");

const ProductBlackList = {
  BOOKMARKS: "bookmarks",
  LIKES: "likes",
  DISLIKES: "dislikes",
  COMMENTS: "comments",
  SUPPLIER: "supplier",
  WIDTH: "width",
  HEIGHT: "height",
  WEIGHT: "weight",
  LENGTH: "length",
  COLORS: "colors",
};
Object.freeze(ProductBlackList);

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );
      const productBody = await createProductSchema.validateAsync(req.body);

      const {
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        type,
      } = productBody;

      const feature = setFeature(req.body);
      const supplier = req.user._id;

      await ProductModel.create({
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        images,
        feature,
        supplier,
        type,
      });
      return res.json({
        data: {
          statusCode: 201,
          message: "ثبت محصول با موفقیت انجام شد",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const data = copyObject(req.body);
      data.images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath
      );

      data.feature = setFeature(req.body);

      let blackListFields = Object.values(ProductBlackList);
      deleteInvalidPropertyInObject(data, blackListFields);
      const updateProductResult = await ProductModel.updateOne(
        { _id: product._id },
        { $set: data }
      );
      if (updateProductResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("خطای داخلی");

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "محصول با موفقیت به روزرسانی شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const removeProductResult = await ProductModel.deleteOne({
        _id: product._id,
      });

      if (removeProductResult.deletedCount == 0)
        throw createHttpError.InternalServerError("خطای داخلی");

      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "محصول با موفقیت حذف شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProducts(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let products;
      if (search) {
        products = await ProductModel.find({
          $text: {
            $search: new RegExp(search, "ig"),
          },
        });
      } else {
        products = await ProductModel.find({});
      }

      return res.status(200).json({
        data: {
          statusCode: 200,
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      return res.status(200).json({
        data: {
          statusCode: 200,
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findProductById(productId) {
    const { id } = await ObjectIdValidator.validateAsync({ id: productId });
    const product = await ProductModel.findById(id);
    if (!product) throw createHttpError.NotFound("محصول یافت نشد");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};
