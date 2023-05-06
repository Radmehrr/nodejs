import { getAllProducts } from "../handler/products.handler.js";

// mesle middleware
const product = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
  },
};

const getOneProductItem = {
  schema: {
    tags: ["products"],
    security: [{ apiKey: [] }],
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "id for product",
        },
      },
    },
    response: {
      200: product,
    },
  },
  handler: () => {},
};
const getProductsItem = {
  schema: {
    tags: ["products"],
    security: [{ apiKey: [] }],
    response: {
      200: {
        type: "array",
        items: product,
      },
    },
  },
  handler: getAllProducts,
};

export default function productRoutes(fastify, options, done) {
  fastify.addHook("onRequest", (request) => request.jwtVerify());
  fastify.get("/", getProductsItem);
  done();
}
