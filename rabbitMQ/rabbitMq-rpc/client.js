const amqp = require("amqplib");
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();
const args = process.argv.slice(2);

async function sendTaskToProcess() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  const assetredQueue = await channel.assertQueue("", { exclusive: true });
  channel.sendToQueue("rpc", Buffer.from(args[0]), {
    replyTo: assetredQueue.queue,
    correlationId: uuid,
  });

  channel.consume(assetredQueue.queue, (msg) => {
    if (msg.properties.correlationId == uuid) {
      console.log("process done: ", msg.content.toString());
      channel.ack(msg);

      setTimeout(() => {
        process.exit(0);
      }, 1000);
    }
  });
}

sendTaskToProcess();
