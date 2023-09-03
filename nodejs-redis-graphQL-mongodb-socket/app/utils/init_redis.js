const redisDB = require("redis");
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("connect to redis"));
redisClient.on("ready", () =>
  console.log("connected to redis and ready to use...")
);
redisClient.on("error", (err) => console.log("redisError: ", err.message));
redisClient.on("end", () => console.log("disconnected from redis..."));

module.exports = redisClient;

// rah andazi redis dar docker: =>
// docker pull redis
// docker run -d -p 6363:6379 --name redis1 redis
// docker ps

//dastresi be shell or bash redis: =>
//docker exec -it redis1 sh
//redis_cli
