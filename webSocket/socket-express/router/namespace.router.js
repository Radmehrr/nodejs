const { NamespaceController } = require("../controller/namespace.controller");
const router = require("express").Router();

router.post("/add", NamespaceController.addNamespace);
router.get("/list", NamespaceController.getNamespacesList);

module.exports = {
  namespaceRouter: router,
};
