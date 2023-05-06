import Fastify from "fastify";
import productRoutes from "./routes/product.router.js";
import indexRouter from "./routes/index.router.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  FastifySwaggerConfig,
  fastifySwaggerUiConfig,
} from "./config/swagger.config.js";
import "./config/sequelize.config.js";
import authRoutes from "./routes/auth.router.js";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyJwt from "@fastify/jwt";
import fastifyExpress from "@fastify/express";
import cors from "cors";
import fastifyMiddie from "@fastify/middie";
export const fastify = Fastify({
  logger: true,
});

const main = async () => {
  // register == use
  await fastify.register(fastifyMiddie);
  fastify.register(fastifyBcrypt, {
    saltWorkFactor: 12,
  });
  fastify.register(fastifyJwt, {
    secret: "radmehrSecret",
  });
  fastify.register(fastifySwagger, FastifySwaggerConfig);
  fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig);
  fastify.register(indexRouter);
  fastify.use(cors());
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(productRoutes, { prefix: "/products" });
  fastify.listen(
    {
      port: 5000,
    },
    (err) => {
      if (err) console.log(err);
      console.log("server running on port 5000");
    }
  );
};
main();
