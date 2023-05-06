//socket dar server ijad mishe
const socket = io("http://localhost:3000");

// On: mire on data ha ro mikhone va daryaft mikone
// Emit: data ro ersal mikone
socket.on("connect", (data) => {
  const sendBtn = document.getElementById("sendBtn");
  sendBtn.addEventListener("click", (e) => {
    const textBox = document.getElementById("text");
    const message = textBox.value;
    if (!message) return alert("text box can not be empty!");
    socket.emit("clientMessage", message);
    textBox.value = "";
  });
});

socket.on("serverMessage", (message) => {
  const paragraphElement = document.createElement("p");
  paragraphElement.innerText = message;
  const chatBox = document.querySelector(".chatBox");
  chatBox.appendChild(paragraphElement);
});
