const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");
const { getCourseTime } = require("../utils/functions");

const EpisodesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "open" /* open , lock*/ },
    time: { type: String, required: true },
    videoAddress: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// yek field jadid ijad konim va yek meghdar jadid tosh mirizam
EpisodesSchema.virtual("videoUrl").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`;
});

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episodes: { type: [EpisodesSchema], default: [] },
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    type: {
      type: String,
      default: "free" /* free , cash, special*/,
      required: true,
    },
    teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    chapters: { type: [ChapterSchema], default: [] },
    students: { type: [mongoose.Types.ObjectId], ref: "user", default: [] },
    status: {
      type: String,
      default: "notStarted" /* notStarted, campleted, Holding */,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

CourseSchema.index({ title: "text", short_text: "text", text: "text" });

// yek field jadid ijad konim va yek meghdar jadid tosh mirizam
CourseSchema.virtual("imageUrl").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
});

CourseSchema.virtual("totalTime").get(function () {
  return getCourseTime(this.chapters || []);
});

module.exports = {
  CourseModel: mongoose.model("course", CourseSchema),
};
