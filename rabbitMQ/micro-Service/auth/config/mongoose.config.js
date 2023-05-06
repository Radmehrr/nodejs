const { default: mongoose } = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/auth-service")
  .then(() => console.log("conncet to auth-service DB!"))
  .catch((error) => console.log(error));
