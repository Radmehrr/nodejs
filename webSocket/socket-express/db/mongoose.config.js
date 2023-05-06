const { default: mongoose } = require("mongoose");

DB_URL = "mongodb://127.0.0.1:27017/chat-app";

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_URL)
  .then(() => console.log("connect to chat db"))
  .catch(() => console.log("can not connect to db"));
