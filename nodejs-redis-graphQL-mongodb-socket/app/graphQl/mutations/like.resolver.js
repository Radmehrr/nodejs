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

const LikeProduct = {
  type: ResponseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productId } = args;

    await checkExistProduct(productId);
    let likedProduct = await ProductModel.findOne({
      _id: productId,
      likes: user._id,
    });

    let dislikedProduct = await ProductModel.findOne({
      _id: productId,
      discountlikes: user._id,
    });

    const updateQuery = likedProduct
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };
    let message;
    await ProductModel.updateOne({ _id: productId }, updateQuery);
    if (dislikedProduct && !likedProduct) {
      await ProductModel.updateOne(
        { _id: productId },
        { $pull: { dislikes: user._id } }
      );
      message = "پسندیدن مقاله با موفقیت انجام شد";
    } else message = "پسندیدن مقاله لفو شد";

    return {
      statusCode: 201,
      data: {
        message: "پسندیدن محصول با موفقیت انجام شد",
      },
    };
  },
};

const LikeCourse = {
  type: ResponseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { courseId } = args;

    await checkExistCourse(courseId);
    let likeCourse = await CourseModel.findOne({
      _id: courseId,
      likes: user._id,
    });

    let dislikeCourse = await CourseModel.findOne({
      _id: courseId,
      dislikes: user._id,
    });

    const updateQuery = likeCourse
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };

    let message;
    await CourseModel.updateOne({ _id: courseId }, updateQuery);
    if (dislikeCourse && !likeCourse) {
      await CourseModel.updateOne(
        { _id: courseId },
        { $pull: { dislikes: user._id } }
      );
      message = "پسندیدن مقاله با موفقیت انجام شد";
    } else message = "پسندیدن مقاله لفو شد";

    return {
      statusCode: 201,
      data: {
        message: "پسندیدن دوره با موفقیت انجام شد",
      },
    };
  },
};

const LikeBlog = {
  type: ResponseType,
  args: {
    blogId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { blogId } = args;

    await checkExistBlog(blogId);
    let likedBlog = await BlogModel.findOne({
      _id: blogId,
      likes: user._id,
    });

    let dislikedBlog = await BlogModel.findOne({
      _id: blogId,
      dislikes: user._id,
    });

    const updateQuery = likedBlog
      ? { $pull: { likes: user._id } }
      : { $push: { likes: user._id } };

    await BlogModel.updateOne({ _id: blogId }, updateQuery);
    let message;
    if (dislikedBlog && !likedBlog) {
      await BlogModel.updateOne(
        { _id: blogId },
        { $pull: { dislikes: user._id } }
      );

      message = "پسندیدن مقاله با موفقیت انجام شد";
    } else message = "پسندیدن مقاله لفو شد";

    return {
      statusCode: 201,
      data: {
        message,
      },
    };
  },
};

module.exports = {
  LikeProduct,
  LikeBlog,
  LikeCourse,
};
