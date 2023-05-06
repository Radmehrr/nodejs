// har zaban dg ham mitone inja bashe
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const echoProto = protoLoader.loadSync("echo.proto", {});
const echoDefinition = grpc.loadPackageDefinition(echoProto);
const { echoPackage } = echoDefinition;

const serverUrl = "localhost:5000";
const client = new echoPackage.EchoService(
  serverUrl,
  grpc.credentials.createInsecure()
);

const echoData = {
  value: "my echo value for test",
};

client.EchoUnary(echoData, (err, response) => {
  if (err) return console.log("Error: ", err.message);

  console.log("response: ", response);
});

const serverStream = client.EchoServerStream();
serverStream.on("data", (data) => {
  console.log(data);
});
serverStream.on("end", (error) => {
  console.log(error);
});

const echos = [
  { value: "value1" },
  { value: "value2" },
  { value: "value3" },
  { value: "value4" },
];

const clientStream = client.EchoClientStream({}, (err, res) => {});

let index = 0;
setInterval(function () {
  clientStream.write(echos[index]);
  index++;
  if (index == echos.length) {
    clearInterval(this);
  }
}, 300);

const dateTime = client.DateTime();
setInterval(() => {
  dateTime.write({ value: new Date().toLocaleString() });
}, 1000);

dateTime.on("data", (data) => {
  console.log("client DateTime: ", data);
});
