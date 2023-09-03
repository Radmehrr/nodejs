const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLScalarType,
  Kind,
  GraphQLList,
} = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const anyType = new GraphQLScalarType({
  name: "anyType",
  parseValue: toObject,
  serialize: toObject,
  parseLiteral: parseLiteral,
});

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  },
});
const PublicCategoryType = new GraphQLObjectType({
  name: "PublicCategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    children: { type: new GraphQLList(anyType) },
  },
});
const ResponseType = new GraphQLObjectType({
  name: "ResponseType",
  fields: {
    statusCode: { type: GraphQLString },
    data: { type: anyType },
  },
});

module.exports = {
  UserType,
  PublicCategoryType,
  anyType,
  ResponseType,
};
