const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const redis = require("redis");
const redisClient = redis.createClient();
const app = express();
app.set("view engine", "ejs");
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

function sendMessages(socket) {
  redisClient.lrange("messages", 0, -1, (err, data) => {
    data.map((item) => {
      const [username, message] = item.split(":");
      socket.emit("message", {
        username,
        message,
      });
    });
  });
}

io.on("connection", (socket) => {
  sendMessages(socket);
  socket.on("message", (data) => {
    const { username, message } = data;
    redisClient.rpush("messages", `${username}:${message}`);

    io.emit("message", { username, message });
  });
});

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/chat", (req, res) => {
  const { username } = req.query;
  io.emit("joined", username);
  res.render("chat", { username });
});

const PORT = 4001;
server.listen(PORT, () => console.log("server running at port " + PORT));
