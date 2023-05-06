require("./config/db.connection");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
// const {
//   listProduct,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("./functions/product.grpc");

const protoPath = path.join(__dirname, "..", "..", "protos", "blog.proto");
const blogProto = protoLoader.loadSync(protoPath);
const { blogPackage } = grpc.loadPackageDefinition(blogProto);
const blogServiceUrl = "localhost:4002";

function main() {
  const server = new grpc.Server();
  server.addService(blogPackage.BlogService.service, {
    listBlog,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
  });

  server.bindAsync(
    blogServiceUrl,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) return console.log(err.message);
      console.log("gRPC BlogService on port " + port);
      server.start();
    }
  );
}

main();
