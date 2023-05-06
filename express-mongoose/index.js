const express = require("express");
const morgan = require("morgan");
const { NotFoundError, ErrorHandler } = require("./utils/errorHandler");
const { allRouters } = require("./router/index.routes");
const app = express();

require("./config/mongo.config");

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(allRouters);

app.use(NotFoundError);
app.use(ErrorHandler);
app.listen(3000, () => {
  console.log("server run on port 3000");
});
