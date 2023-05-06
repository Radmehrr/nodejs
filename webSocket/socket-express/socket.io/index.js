const {
  NamespaceSocketHandle,
  createNameSpacesConnection,
} = require("./namespace.socket");

module.exports = {
  socketHandle: (io) => {
    NamespaceSocketHandle(io);
    createNameSpacesConnection(io);
  },
};
