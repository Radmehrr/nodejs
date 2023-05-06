const express = require("express");
require("./config/mongoose.config");
require("dotenv").config();
const { authRouter } = require("./handler/auth");
const app = express();
const { PORT } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use((req, res, next) => {
  return res.json({ error: "NotFound" });
});
app.use((req, res, next) => {
  return res.json({ error: error.message });
});
app.listen(PORT, () => {
  console.log("auth-service is running on port:" + PORT);
});
