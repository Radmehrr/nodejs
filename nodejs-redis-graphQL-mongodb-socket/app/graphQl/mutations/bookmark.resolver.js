const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.type");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verify-access-token");
const { ProductModel } = require("../../models/product");
const { CourseModel } = require("../../models/course");
const { BlogModel } = require("../../models/blog");
const {
  checkExistBlog,
  checkExistCourse,
  checkExistProduct,
} = require("../utils");

const bookmarkProduct = {
  type: ResponseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productId } = args;

    await checkExistProduct(productId);
    let bookmarkedProduct = await ProductModel.findOne({
      _id: productId,
      bookmarks: user._id,
    });

    const updateQuery = bookmarkedProduct
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };
    let message;
    await ProductModel.updateOne({ _id: productId }, updateQuery);
    if (!bookmarkedProduct) {
      message = " محصول با موفقیت اضافه شد";
    } else message = " محصول لفو شد";

    return {
      statusCode: 201,
      data: {
        message,
      },
    };
  },
};

const bookmarkCourse = {
  type: ResponseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { courseId } = args;

    await checkExistCourse(courseId);
    let bookmarkedCourse = await CourseModel.findOne({
      _id: courseId,
      bookmarks: user._id,
    });

    const updateQuery = bookmarkedCourse
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };

    let message;
    await CourseModel.updateOne({ _id: courseId }, updateQuery);
    if (!bookmarkedCourse) {
      message = " دوره با موفقیت اضافه شد";
    } else message = "دوره لفو شد";

    return {
      statusCode: 201,
      data: {
        message,
      },
    };
  },
};

const bookmarkBlog = {
  type: ResponseType,
  args: {
    blogId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { blogId } = args;

    await checkExistBlog(blogId);
    let bookmarkedBlog = await BlogModel.findOne({
      _id: blogId,
      bookmarks: user._id,
    });

    const updateQuery = bookmarkedBlog
      ? { $pull: { bookmarks: user._id } }
      : { $push: { bookmarks: user._id } };

    await BlogModel.updateOne({ _id: blogId }, updateQuery);
    let message;

    if (!bookmarkedBlog) {
      message = " مقاله با موفقیت دخیره شد";
    } else message = "مقاله لفو شد";

    return {
      statusCode: 201,
      data: {
        message,
      },
    };
  },
};

module.exports = {
  bookmarkProduct,
  bookmarkBlog,
  bookmarkCourse,
};
