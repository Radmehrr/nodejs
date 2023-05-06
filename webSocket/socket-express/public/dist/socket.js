// const { stringToHTML } = require("../../utils/stringToHtml");

const socket = io("http://localhost:3000");
let namespaceSocket;

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
}

function initNamespaceConnection(endpoint) {
  if (namespaceSocket) namespaceSocket.close();

  namespaceSocket = io("http://localhost:3000/" + endpoint);
  namespaceSocket.on("connect", () => {
    namespaceSocket.on("roomList", (rooms) => {
      console.log(rooms);
      const roomsElement = document.querySelector("#contact ul");
      rooms.innerHTML = "";
      for (const room of rooms) {
        getRoomInfo(rooms[0]?.name);
        const html = stringToHTML(
          `<li class="contact" roomName="${room.name}">
          <div >
            <p>${room.name}</p>
            <p>${room.description}</p>
        </div></li>
        `
        );
        roomsElement.appendChild(html);
      }

      const roomNodes = document.querySelectorAll("ul li.contact");
      for (const room of roomNodes) {
        room.addEventListener("click", () => {
          const roomName = room.getAttribute("roomName");
          getRoomInfo(endpoint, roomName);
        });
      }
    });
  });
}

function getRoomInfo(endpoint, roomName) {
  document.querySelector("#roomName h3").setAttribute("roomName", roomName);
  document.querySelector("#roomName h3").setAttribute("endpoint", endpoint);
  namespaceSocket.emit("joinRoom", roomName);
  namespaceSocket.off("roomInfo");
  namespaceSocket.on("roomInfo", (roomInfo) => {
    document.querySelector("#roomName h3").innerText = roomInfo.description;
  });

  namespaceSocket.on("countOfOnlineUsers", (count) => {
    console.log(count);
  });
}

function sendMessage() {
  const roomName = document
    .querySelector("#roomName h3")
    .getAttribute("roomName");
  const endpoint = document
    .querySelector("#roomName h3")
    .getAttribute("endpoint");

  let message = document.querySelector(
    ".message-input input#messageInput"
  ).value;

  if (message.trim() == "") {
    return alert("input message can not be empty!");
  }

  namespaceSocket.emit("newMessage", { message, roomName, endpoint });
  namespaceSocket.off("confirmMessage");
  namespaceSocket.on("confirmMessage", (data) => {
    // namespaceSocket.on("confirmMessage", (data) => {
    //   console.log(data);
    // });

    const li = document.createElement("li");
    li.innerText = data.message;
    document.querySelector(".messages ul").appendChild(li);
    document.querySelector(".message-input input#messageInput").value = "";
    const messagesElement = document.querySelector("div.messages");
    messagesElement.scrollTo(0, messagesElement.scrollHeight);
  });
}

socket.on("connect", () => {
  socket.on("namespacesList", (namespaces) => {
    const namespacesElement = document.getElementById("namespaces");
    namespacesElement.innerHTML = "";

    for (const namespace of namespaces) {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.setAttribute("class", "namespaceTitle");
      p.setAttribute("endpoint", namespace.endpoint);
      p.innerText = namespace.title;
      li.appendChild(p);
      namespacesElement.appendChild(li);
    }

    const namespaceNodes = document.querySelectorAll(
      "#namespaces li p.namespaceTitle"
    );

    for (const namespace of namespaceNodes) {
      namespace.addEventListener("click", () => {
        const endpoint = namespace.getAttribute("endpoint");
        initNamespaceConnection(endpoint);
      });
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      sendMessage();
    }
  });

  document.querySelector("button.submit").addEventListener("click", () => {
    sendMessage();
  });
});
