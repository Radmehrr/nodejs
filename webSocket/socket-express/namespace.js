// server side code
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io");

app.use(express.static("./"));

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
  serverClient: true,
});

io.of("/teacher").on("connection", (socket) => {
  socket.on("teacherClient", (data) => {
    console.log(data);
  });

  socket.emit("teacherServer", "Hello im your server");
});

io.of("/student").on("connection", (socket) => {
  socket.on("Hi student", (data) => {
    console.log(data);
  });

  socket.emit("studentServer", "Hello im your server");
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});

// client side code

const socket = io("http://localhost:3000");

// On: mire on data ha ro mikhone va daryaft mikone
// Emit: data ro ersal mikone
socket.on("connect", (data) => {
  socket.emit("welcome", "Hello server");
  socket.on("welcome-client", (data) => console.log(data));
});

const teacherSocket = io("http://localhost:3000/teacher");

// On: mire on data ha ro mikhone va daryaft mikone
// Emit: data ro ersal mikone
teacherSocket.on("connect", (data) => {
  teacherSocket.emit("teacherClient", "Hello server");
  teacherSocket.on("teacherServer", (data) => console.log(data));
});
