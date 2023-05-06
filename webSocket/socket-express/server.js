const http = require("http");
const path = require("path");
const express = require("express");
const { supportRouter } = require("./router/support.router");
const { initialSocket } = require("./socket.io/initialSocket");
const { socketHandle } = require("./socket.io");
require("./db/mongoose.config");
const app = express();
const server = http.createServer(app);
const io = initialSocket(server);
socketHandle(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(ExpressEjsLayouts);
app.use(express.static("public"));

app.set("view engine", "ejs");
// app.set("views", "resource/views");
// app.set("layout extractStyles", true);
// app.set("layout extractScripts", true);
// app.set("layout", "./layouts/master");
app.use("/support", supportRouter);

// app.get("/", (req, res, next) => {
//   res.render("index");
// });

server.listen(3000, () => {
  console.log("server running on port 3000");
});
