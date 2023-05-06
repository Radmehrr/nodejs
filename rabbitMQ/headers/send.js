const amqp = require("amqplib");
const exchangeMessage = "headersMessage";

const sendData = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeMessage, "headers");
  channel.publish(exchangeMessage, "", Buffer.from("any message"), {
    headers: {
      author: "radmehr",
      car: "benz",
      price: 5000000,
      comment: [],
    },
  });

  setTimeout(() => {
    process.exit(0);
  });
};

sendData();
