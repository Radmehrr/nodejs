const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;

  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.initRedis();
    this.connectToMongoDB();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }

  configApplication() {
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    // vase inke az samte client data json ersal konim.
    this.#app.use(express.json());

    // vase inke data az tarighe form ersal beshe.
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));

    this.#app.use(
      "/api-doc",
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "Radmehr Store",
              version: "2.0.0",
              description: "بزرگترین مرجع آموزش برنامه نویسی",
            },
            servers: [
              {
                url: "http://localhost:5000",
              },
            ],
            components: {
              securitySchemes: {
                bearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            security: [
              {
                bearerAuth: [],
              },
            ],
          },

          apis: ["./app/router/**/*.js"],
        }),
        { explorer: true }
      )
    );
  }

  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("run http:localhost:" + this.#PORT);
    });
  }

  connectToMongoDB() {
    mongoose.set("strictQuery", true);
    mongoose.connect(this.#DB_URI);
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to db");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("disconnect");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }

  initRedis() {
    require("./utils/init_redis");
  }

  createRoutes() {
    this.#app.use(AllRoutes);
  }

  errorHandling() {
    // age route ro peyda nkard:
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد."));
      // return res.status(404).json({
      //   statusCode: 404,
      //   message: "آدرس مورد نظر یافت نشد.",
      // });
    });

    // age errori vojod dasht:
    this.#app.use((error, req, res, next) => {
      const servetError = createError.InternalServerError();
      const statusCode = error.status || servetError.status;
      const message = error.message || servetError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
