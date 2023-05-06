// darkhast ha ro migire

const amqp = require("amqplib");

async function receiveFromProducer() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  const queueName = "task";
  await channel.assertQueue(queueName, { durable: true });
  await channel.consume(queueName, (msg) => {
    setInterval(() => {
      console.log(msg.content.toString());

      // daryafte message taiiiid shod.
      channel.ack(msg);
    }, 2000);
  });
}

receiveFromProducer();
