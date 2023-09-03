const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
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
    count: { type: Number },
    type: { type: String, required: true },
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    feature: {
      type: Object,
      default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        madein: "",
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

ProductSchema.index({ title: "text", short_text: "text", text: "text" });
ProductSchema.virtual("imagesURL").get(function () {
  return this.images.map(
    (image) =>
      `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`
  );
});

module.exports = {
  ProductModel: mongoose.model("product", ProductSchema),
};
