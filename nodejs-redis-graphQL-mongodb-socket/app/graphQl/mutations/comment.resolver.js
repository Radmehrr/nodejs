const { GraphQLString } = require("graphql");
const { BlogModel } = require("../../models/blog");
const createHttpError = require("http-errors");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verify-access-token");
const { ResponseType } = require("../typeDefs/public.type");
const { copyObject } = require("../../utils/functions");
const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../../models/course");
const { ProductModel } = require("../../models/product");

const CreateCommentForBlog = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    blogId: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { comment, blogId, parent } = args;
    if (!mongoose.isValidObjectId(blogId))
      throw createHttpError.BadGateway("شناسه بلاگ ارسال شده صحیح نمیباشد");
    await checkExistBlog(blogId);
    if (parent && mongoose.isValidObjectId(parent)) {
      const commentDocument = await getComment(BlogModel, parent);
      if (commentDocument && !commentDocument?.openToReply)
        throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
      const createAnswerResult = await BlogModel.updateOne(
        {
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToReply: false,
            },
          },
        }
      );
      if (!createAnswerResult.modifiedCount) {
        throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");
      }
      return {
        statusCode: 201,
        data: {
          message: "پاسخ شما با موفقیت ثبت شد",
        },
      };
    } else {
      await BlogModel.updateOne(
        { _id: blogId },
        {
          $push: {
            comments: {
              comment,
              user: user._id,
              show: false,
              openToReply: true,
            },
          },
        }
      );
    }
    return {
      statusCode: 201,
      data: {
        message: "ثبت نظر با موفقیت انجام شد پس از تایید در وبسایت قرار میگیرد",
      },
    };
  },
};

const CreateCommentForCourse = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    courseId: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { comment, courseId, parent } = args;
    if (!mongoose.isValidObjectId(courseId))
      throw createHttpError.BadGateway("شناسه دوره ارسال شده صحیح نمیباشد");
    await checkExistCourse(courseId);
    if (parent && mongoose.isValidObjectId(parent)) {
      const commentDocument = await getComment(CourseModel, parent);
      if (commentDocument && !commentDocument?.openToReply)
        throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
      const createAnswerResult = await CourseModel.updateOne(
        {
          _id: courseId,
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToReply: false,
            },
          },
        }
      );
      if (!createAnswerResult.modifiedCount) {
        throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");
      }
      return {
        statusCode: 201,
        data: {
          message: "پاسخ شما با موفقیت ثبت شد",
        },
      };
    } else {
      await CourseModel.updateOne(
        { _id: courseId },
        {
          $push: {
            comments: {
              comment,
              user: user._id,
              show: false,
              openToReply: true,
            },
          },
        }
      );
    }
    return {
      statusCode: 201,
      data: {
        message: "ثبت نظر با موفقیت انجام شد پس از تایید در وبسایت قرار میگیرد",
      },
    };
  },
};

const CreateCommentForProduct = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    productId: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { req } = context;
    const user = await VerifyAccessTokenInGraphQL(req);
    const { comment, productId, parent } = args;
    if (!mongoose.isValidObjectId(productId))
      throw createHttpError.BadGateway("شناسه محصول ارسال شده صحیح نمیباشد");
    await checkExistProduct(productId);
    if (parent && mongoose.isValidObjectId(parent)) {
      const commentDocument = await getComment(ProductModel, parent);
      if (commentDocument && !commentDocument?.openToReply)
        throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
      const createAnswerResult = await ProductModel.updateOne(
        {
          _id: productId,
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToReply: false,
            },
          },
        }
      );
      if (!createAnswerResult.modifiedCount) {
        throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");
      }
      return {
        statusCode: 201,
        data: {
          message: "پاسخ شما با موفقیت ثبت شد",
        },
      };
    } else {
      await ProductModel.updateOne(
        { _id: productId },
        {
          $push: {
            comments: {
              comment,
              user: user._id,
              show: false,
              openToReply: true,
            },
          },
        }
      );
    }
    return {
      statusCode: 201,
      data: {
        message: "ثبت نظر با موفقیت انجام شد پس از تایید در وبسایت قرار میگیرد",
      },
    };
  },
};

async function checkExistBlog(id) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw createHttpError.NotFound("بلاگ یافت نشد");
  return blog;
}
async function checkExistCourse(id) {
  const Course = await CourseModel.findById(id);
  if (!Course) throw createHttpError.NotFound("دوره یافت نشد");
  return Course;
}
async function checkExistProduct(id) {
  const product = await ProductModel.findById(id);
  if (!product) throw createHttpError.NotFound("محصول یافت نشد");
  return product;
}

async function getComment(model, id) {
  const findedComment = await model.findOne(
    { "comments._id": id },
    { "comments.$": 1 }
  );
  const comment = copyObject(findedComment);
  if (!comment?.comments?.[0])
    throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
  return comment?.comments?.[0];
}

module.exports = {
  CreateCommentForBlog,
  CreateCommentForCourse,
  CreateCommentForProduct,
};
