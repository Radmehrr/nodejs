const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
  },
  { timestamps: true }
);

productModel = mongoose.model("product", productSchema);
module.exports = {
  productModel,
};
