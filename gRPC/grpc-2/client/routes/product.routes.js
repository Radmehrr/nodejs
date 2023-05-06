const {
  listProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const router = require("express").Router();

router.get("/list", listProduct);
router.get("/create", createProduct);
router.get("/update", updateProduct);
router.get("/:id", getProduct);
router.get("/delete/:id", deleteProduct);
module.exports = {
  ProductRouter: router,
};
