const productRouter = require("express").Router();
const { productModel } = require("../model/product.model");
const { pushToQueue, createQueue } = require("../config/rabbitmq");
const { isAuthenticated } = require("../../isAuthenticated");

productRouter.post("/create", async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = new productModel({
      name,
      description,
      price,
    });

    await newProduct.save();
    return res.json({ message: "new product created!", product: newProduct });
  } catch (error) {
    next(error);
  }
});
productRouter.post("/buy", isAuthenticated, async (req, res, next) => {
  try {
    const { productIds = [] } = req.body;
    const products = await productModel.find({ _id: { $in: productIds } });
    const { email } = req.user;
    await pushToQueue("ORDER", { products, userEmail: email });
    const channel = await createQueue("PRODUCT");

    channel.consume("PRODUCT", (msg) => {
      console.log(JSON.parse(msg.content.toString()));
      channel.ack(msg);
    });
    return res.json({ message: "order created" });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  productRouter,
};
