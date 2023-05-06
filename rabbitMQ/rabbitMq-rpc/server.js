const amqp = require("amqplib");

async function ProcessTask() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertQueue("rpc");
  console.log("i wait for get new Task to process");

  channel.consume("rpc", (msg) => {
    console.log("received data: ", msg.content.toString());
    const data = parseInt(msg.content.toString());
    let temp = 0;

    for (let index = 1; index <= data; index++) {
      temp += data * index;
    }

    channel.sendToQueue(msg.properties.replyTo, Buffer.from(temp.toString()), {
      correlationId: msg.properties.correlationId,
    });
    channel.ack(msg);
  });
}

ProcessTask();
