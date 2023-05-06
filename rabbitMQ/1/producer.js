// darkhast mifreste

const amqp = require("amqplib");

async function sendMsgToTask() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  const queueName = "task";
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from("Hello RabbitMQ"), {
    persistent: true,
  });
  console.log("message send to service 1");

  setTimeout(() => {
    connection.close();
  }, 1000);
}

setInterval(() => sendMsgToTask(), 2000);
