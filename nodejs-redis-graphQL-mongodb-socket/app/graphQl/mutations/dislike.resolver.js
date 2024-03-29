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

const DisLikeProduct = {
  type: ResponseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { productId } = args;
    await checkExistProduct(productId);
    let likedproduct = await ProductModel.findOne({
      _id: productId,
      likes: user._id,
    });
    let disLikedproduct = await ProductModel.findOne({
      _id: productId,
      dislikes: user._id,
    });
    const updateQuery = disLikedproduct
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    await ProductModel.updateOne({ _id: productId }, updateQuery);
    let message;
    if (!disLikedproduct) {
      if (likedproduct)
        await ProductModel.updateOne(
          { _id: productId },
          { $pull: { likes: user._id } }
        );
      message = "نپسندیدن محصول با موفقیت انجام شد";
    } else message = "نپسندیدن محصول لغو شد";
    return {
      statusCode: 201,
      data: {
        message,
      },
    };
  },
};
const DisLikeCourse = {
  type: ResponseType,
  args: {
    courseID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { courseID } = args;
    await checkExistCourse(courseID);
    let likedcourse = await CourseModel.findOne({
      _id: courseID,
      likes: user._id,
    });
    let disLikedCourse = await CourseModel.findOne({
      _id: courseID,
      dislikes: user._id,
    });
    const updateQuery = disLikedCourse
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    await CourseModel.updateOne({ _id: courseID }, updateQuery);
    let message;
    if (!disLikedCourse) {
      if (likedcourse)
        await CourseModel.updateOne(
          { _id: courseID },
          { $pull: { likes: user._id } }
        );
      message = "نپسندیدن دوره با موفقیت انجام شد";
    } else message = "نپسندیدن دوره لغو شد";
    return {
      statusCode: 201,
      data: {
        message,
      },
    };
  },
};
const DisLikeBlog = {
  type: ResponseType,
  args: {
    blogID: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { blogID } = args;
    await checkExistBlog(blogID);
    let likedBlog = await BlogModel.findOne({
      _id: blogID,
      likes: user._id,
    });
    let disLikedBlog = await BlogModel.findOne({
      _id: blogID,
      dislikes: user._id,
    });
    const updateQuery = disLikedBlog
      ? { $pull: { dislikes: user._id } }
      : { $push: { dislikes: user._id } };
    await BlogModel.updateOne({ _id: blogID }, updateQuery);
    let message;
    if (!disLikedBlog) {
      if (likedBlog)
        await BlogModel.updateOne(
          { _id: blogID },
          { $pull: { likes: user._id } }
        );
      message = "نپسندیدن مقاله با موفقیت انجام شد";
    } else message = "نپسندیدن مقاله لغو شد";
    return {
      statusCode: 201,
      data: {
        message,
      },
    };
  },
};
module.exports = {
  DisLikeProduct,
  DisLikeBlog,
  DisLikeCourse,
};
