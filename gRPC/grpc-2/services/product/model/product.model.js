const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  price: { type: String },
});

ProductSchema.pre("save", async function (next) {
  const self = this;

  const count = await self.constructor.countDocuments({}).exec();

  data = count + 1;
  self.set({ id: data });
  next();
});

module.exports = {
  ProductModel: mongoose.model("product", ProductSchema),
};
