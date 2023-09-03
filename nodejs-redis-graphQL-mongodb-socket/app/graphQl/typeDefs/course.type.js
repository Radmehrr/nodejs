const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { UserType, PublicCategoryType } = require("./public.type");
const { ChapterType } = require("./chapter.type");
const { CommentType } = require("./comment.type");

const CourseType = new GraphQLObjectType({
  name: "CourseType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    short_text: { type: GraphQLString },
    text: { type: GraphQLString },
    image: { type: new GraphQLList(GraphQLString) },
    imageUrl: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: {
      type: PublicCategoryType,
    },
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    count: { type: GraphQLInt },
    type: { type: GraphQLString },
    teacher: { type: UserType },
    status: { type: GraphQLString },
    chapters: { type: new GraphQLList(ChapterType) },
    comments: { type: new GraphQLList(CommentType) },
    likes: { type: new GraphQLList(UserType) },
    dislikes: { type: new GraphQLList(UserType) },
    bookmarks: { type: new GraphQLList(UserType) },
  },
});

module.exports = {
  CourseType,
};
