const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  res.cookie("name", "value");
  res.send("cookie have been saved");
});

app.get("/get-cookie", (req, res) => {
  const cookies = req.cookies;
  res.send(cookies);
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("name");
  res.send("cookie was removed");
});

app.listen(process.env.PORT);
