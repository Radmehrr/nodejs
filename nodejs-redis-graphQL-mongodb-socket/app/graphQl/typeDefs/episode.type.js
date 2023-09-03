const { GraphQLObjectType, GraphQLString } = require("graphql");

const EpisodeType = new GraphQLObjectType({
  name: "EpisodeType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    type: { type: GraphQLString },
    time: { type: GraphQLString },
    videoAddress: { type: GraphQLString },
    videoUrl: { type: GraphQLString },
  },
});

module.exports = {
  EpisodeType,
};
