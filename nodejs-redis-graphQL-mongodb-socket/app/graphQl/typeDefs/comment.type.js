const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const { UserType, anyType } = require("./public.type");

const AnswerType = new GraphQLObjectType({
  name: "AnswerType",
  fields: {
    _id: { type: GraphQLString },
    user: { type: UserType },
    comment: { type: GraphQLString },
    show: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
  },
});
const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: {
    _id: { type: GraphQLString },
    user: { type: UserType },
    comment: { type: GraphQLString },
    answers: { type: new GraphQLList(AnswerType) },
    show: { type: GraphQLBoolean },
    openToReply: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
  },
});

module.exports = {
  CommentType,
};
