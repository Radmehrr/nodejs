const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.type");
const { CommentType } = require("./comment.type");

const BlogType = new GraphQLObjectType({
  name: "blogType",
  fields: {
    _id: { type: GraphQLString },
    author: { type: UserType },
    title: { type: GraphQLString },
    short_text: { type: GraphQLString },
    text: { type: GraphQLString },
    image: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    comments: { type: new GraphQLList(CommentType) },
    category: {
      type: PublicCategoryType,
    },
    likes: { type: new GraphQLList(UserType) },
    dislikes: { type: new GraphQLList(UserType) },
    bookmarks: { type: new GraphQLList(UserType) },
  },
});

module.exports = {
  BlogType,
};
