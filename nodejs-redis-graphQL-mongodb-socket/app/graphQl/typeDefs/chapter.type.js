const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { UserType, PublicCategoryType } = require("./public.type");
const { EpisodeType } = require("./episode.type");

const ChapterType = new GraphQLObjectType({
  name: "ChapterType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    episodes: { type: new GraphQLList(EpisodeType) },
  },
});

module.exports = {
  ChapterType,
};
