const express = require("express");
require("./config/mongoose.config");

require("dotenv").config();

const { orderRouter } = require("./handler/order");
const { createOrderWithQueue } = require("./config/rabbitmq");
const app = express();
const { PORT } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
createOrderWithQueue("ORDER");
app.use("/order", orderRouter);
app.use((req, res, next) => {
  return res.json({ error: "NotFound" });
});
app.use((req, res, next) => {
  return res.json({ error: error.message });
});
app.listen(PORT, () => {
  console.log("order-service is running on port:" + PORT);
});
