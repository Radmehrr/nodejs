import { products } from "../db/products.js";

export const getAllProducts = function (req, reply) {
  reply.send(products);
};
