const { default: mongoose } = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/product-service")
  .then(() => console.log("conncet to product-service DB!"))
  .catch((error) => console.log(error));
