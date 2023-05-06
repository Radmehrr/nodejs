const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const echoProto = protoLoader.loadSync("echo.proto", {});
const echoDefinition = grpc.loadPackageDefinition(echoProto);
const { echoPackage } = echoDefinition;

const serverUrl = "localhost:5000";

// create server
const server = new grpc.Server();

function EchoUnary(call, callback) {
  console.log("Call: ", call.request);

  callback(null, {
    message: "receive",
  });
}

function EchoClientStream(call, callback) {
  call.on("data", (data) => console.log("server: ", data));
  call.on("end", (err) => console.log(err));
}
function EchoServerStream(call, callback) {
  for (let index = 0; index < 10; index++) {
    call.write({
      value: index,
    });
  }
  call.on("end", (error) => {
    console.log(error);
  });
}
function DateTime(call, callback) {
  call.on("data", (data) => {
    console.log("server dateTime: ", data);

    call.write({ value: new Date().toLocaleString() });
  });
  call.on("end", (error) => {
    console.log(error);
  });
}
server.addService(echoPackage.EchoService.service, {
  EchoUnary,
  EchoClientStream,
  EchoServerStream,
  DateTime,
});

server.bindAsync(serverUrl, grpc.ServerCredentials.createInsecure(), () => {
  console.log("running on localhost:5000");

  server.start();
});
