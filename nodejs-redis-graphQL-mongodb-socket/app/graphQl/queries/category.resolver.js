const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryModel } = require("../../models/category");
const { CategoryType } = require("../typeDefs/category.type");

const CategoryResolver = {
  type: new GraphQLList(CategoryType),
  resolve: async () => {
    return await CategoryModel.find({ parent: undefined });
  },
};

const CategoryChildResolver = {
  type: new GraphQLList(CategoryType),
  args: {
    parent: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => {
    const { parent } = args;
    if (!parent) return {};
    return await CategoryModel.find({ parent });
  },
};

module.exports = {
  CategoryResolver,
  CategoryChildResolver,
};
