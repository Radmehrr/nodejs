const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { UserType, PublicCategoryType } = require("./public.type");
const { CommentType } = require("./comment.type");

const FeaturesType = new GraphQLObjectType({
  name: "FeaturesType",
  fields: {
    height: { type: GraphQLString },
    length: { type: GraphQLString },
    weight: { type: GraphQLString },
    colors: { type: new GraphQLList(GraphQLString) },
    width: { type: GraphQLString },
    madein: { type: GraphQLString },
  },
});

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    short_text: { type: GraphQLString },
    text: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    imageUrl: { type: new GraphQLList(GraphQLString) },
    tags: { type: new GraphQLList(GraphQLString) },
    category: {
      type: PublicCategoryType,
    },
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    count: { type: GraphQLInt },
    type: { type: GraphQLString },
    supplier: { type: UserType },
    feature: { type: FeaturesType },
    imagesURL: { type: new GraphQLList(GraphQLString) },
    comments: { type: new GraphQLList(CommentType) },
  },
});

module.exports = {
  ProductType,
};
