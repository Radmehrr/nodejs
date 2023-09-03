const {
  ProductController,
} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/string-to-array");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post(
  "/add",
  uploadFile.array("images", 10),
  stringToArray("tags", "colors"),
  ProductController.addProduct
);
router.patch(
  "/edit/:id",
  uploadFile.array("images", 10),
  stringToArray("tags", "colors"),
  ProductController.editProduct
);
router.delete("/remove/:id", ProductController.removeProduct);
router.get("/list", ProductController.getAllProducts);

router.get("/:id", ProductController.getOneProduct);

module.exports = {
  AdminProductRoutes: router,
};
