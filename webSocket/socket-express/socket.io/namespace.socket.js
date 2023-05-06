const { ConversationModel } = require("../model/conversation");
const moment = require("moment-jalali");

function NamespaceSocketHandle(io) {
  io.on("connection", async (socket) => {
    const namespaces = await ConversationModel.find(
      {},
      { title: 1, endpoint: 1 }
    ).sort({ _id: -1 });

    socket.emit("namespacesList", namespaces);
  });
}

async function createNameSpacesConnection(io) {
  const namespaces = await ConversationModel.find(
    {},
    { title: 1, endpoint: 1, rooms: 1 }
  ).sort({ _id: -1 });

  for (const namespace of namespaces) {
    const conversation = await ConversationModel.findOne(
      { endpoint: namespace.endpoint },
      { rooms: 1 }
    ).sort({ _id: -1 });

    io.of(`/${namespace.endpoint}`).on("connection", (socket) => {
      socket.emit("roomList", namespace.rooms);
      socket.on("joinRoom", async (roomName) => {
        const lastRoom = [...socket.rooms][1];
        if (lastRoom) {
          socket.leave(lastRoom);
        }
        socket.join(roomName);
        await getCountOfOnlineUsers(io, conversation.endpoint, roomName);
        const roomInfo = conversation.rooms.find(
          (item) => item.name == roomName
        );

        socket.emit("roomInfo", roomInfo);
        getNewMessage(socket);
      });
    });
  }
}

async function getCountOfOnlineUsers(io, endpoint, roomName) {
  const onlineUsers = await io.of(`/${endpoint}`).in(roomName).allSockets();
  console.log(io.of(`/${endpoint}`).sockets);
  io.of(`/${endpoint}`)
    .in(roomName)
    .emit("countOfOnlineUsers", Array.from(onlineUsers).length);
}

function getNewMessage(socket) {
  socket.on("newMessage", async (data) => {
    const { message, roomName, endpoint } = data;
    await ConversationModel.updateOne(
      { endpoint, "rooms.name": roomName },
      {
        $push: {
          "rooms.$.messages": {
            sender: "644ef0ae37f2e2f35bbf45c7",
            message,
            dateTime: Date.now(),
          },
        },
      }
    );

    io.of(`/${endpoint}`).in(roomName).emit("confirmMessage", data);
  });
}

module.exports = {
  NamespaceSocketHandle,
  createNameSpacesConnection,
};
