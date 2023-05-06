const express = require("express");
const path = require("path");
const { default: mongoose } = require("mongoose");
const { AllRoutes } = require("./router/index.router");

module.exports = class Application {
  #app = express();
  #DB_URL;
  #PORT;
  constructor(PORT, DB_URL) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.configApplication();
    this.connectToMongoDb();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }

  configApplication() {
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("server is running on port http://localhost:" + this.#PORT);
    });
  }
  connectToMongoDb() {
    mongoose.set("strictQuery", true);

    mongoose
      .connect(this.#DB_URL)
      .then(() => console.log("connect to chat db"))
      .catch(() => console.log("can not connect to db"));
  }
  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        statusCode: 404,
        message: "آدرس مورد نظر یافت نشد",
      });
    });

    this.#app.use((error, req, res, next) => {
      const statusCode = error.status || 500;
      const message = error.message || "InternalServerError";
      return res.status(statusCode).json({
        statusCode,
        message,
      });
    });
  }
};
