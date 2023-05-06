const { default: mongoose } = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/order-service")
  .then(() => console.log("conncet to order-service DB!"))
  .catch((error) => console.log(error));
