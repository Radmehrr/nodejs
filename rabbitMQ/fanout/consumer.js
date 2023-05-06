const amqp = require("amqplib");
const exchangeName = "logs";
async function receiveMsg() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName);

  // baraye queue esmi entekhab nmikonm va exclusive miad be sorate monhaser be fard ye esme unique entekhab mikone
  const assertedQueue = await channel.assertQueue("", { exclusive: true });
  console.log("binding Queue with queueName: ", assertedQueue.queue);
  channel.bindQueue(assertedQueue.queue, exchangeName, "");
  channel.consume(assertedQueue.queue, (msg) => {
    if (msg.content) {
      console.log(msg.content.toString());
      channel.ack(msg);
    }
  });
}

receiveMsg();
