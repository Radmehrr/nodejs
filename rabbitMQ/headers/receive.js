const amqp = require("amqplib");
const exchangeMessage = "headersMessage";

const receiveData = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeMessage, "headers");
  const assertQueue = await channel.assertQueue("", { exclusive: true });
  channel.bindQueue(assertQueue.queue, exchangeMessage, "", {
    author: "radmehr",
    car: "benz",
    "x-match": "all", // "x-match": "any"
  });
  channel.consume(assertQueue.queue, (msg) => {
    console.log(msg.content.toString());
    console.log(msg.properties.headers);
  });
};

receiveData();
