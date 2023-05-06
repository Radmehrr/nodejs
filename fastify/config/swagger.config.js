export const FastifySwaggerConfig = {
  swagger: {
    info: {
      title: "Fastify Swagger",
      description: "Swageer: documentation of my application",
      version: "0.1.0",
    },
    tags: [
      {
        name: "products",
        description: "admin can write and user can read products",
      },
    ],
    schemes: ["http"],
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        in: "header",
        name: "authorization",
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
  },
};

export const fastifySwaggerUiConfig = {
  prefix: "api",
  exposeRoute: true,
};
