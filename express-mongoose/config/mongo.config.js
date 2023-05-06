const { default: mongoose } = require("mongoose");

DB_URL = "mongodb://localhost:27017/mongoose-tutorials";

mongoose.set("strictQuery", true);
mongoose.connect(DB_URL, (err) => {
  console.log(err ? err.message : "server connected to mongodb");
});
