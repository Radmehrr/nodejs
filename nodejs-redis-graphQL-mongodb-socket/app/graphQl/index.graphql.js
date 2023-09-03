const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const {
  CategoryResolver,
  CategoryChildResolver,
} = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const {
  CreateCommentForBlog,
  CreateCommentForCourse,
  CreateCommentForProduct,
} = require("./mutations/comment.resolver");
const {
  LikeProduct,
  LikeBlog,
  LikeCourse,
} = require("./mutations/like.resolver");
const {
  DisLikeProduct,
  DisLikeBlog,
  DisLikeCourse,
} = require("./mutations/dislike.resolver");
const {
  bookmarkProduct,
  bookmarkBlog,
  bookmarkCourse,
} = require("./mutations/bookmark.resolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    products: ProductResolver,
    categories: CategoryResolver,
    childOfCategory: CategoryChildResolver,
    courses: CourseResolver,
  },
});
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateCommentForBlog,
    CreateCommentForCourse,
    CreateCommentForProduct,
    LikeProduct,
    LikeCourse,
    LikeBlog,
    DisLikeProduct,
    DisLikeBlog,
    DisLikeCourse,
    bookmarkProduct,
    bookmarkBlog,
    bookmarkCourse,
  },
});

const graphQlSchema = new GraphQLSchema({
  query: RootQuery,

  // GUD: Generate, Update, Delete
  mutation: RootMutation,
});

module.exports = {
  graphQlSchema,
};
