const amqp = require("amqplib");
const exchangeMessage = "directMessage";

const logTypes = process.argv.slice(2); // example: *.nodejs.* , #.message , error.*.message
console.log(logTypes);

const receiveData = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeMessage, "topic");
  const assertQueue = await channel.assertQueue("", { exclusive: true });
  for (const pattern of logTypes) {
    channel.bindQueue(assertQueue.queue, exchangeMessage, pattern);
  }
  channel.consume(assertQueue.queue, (msg) => {
    console.log(msg.content.toString());
  });
};

receiveData();
