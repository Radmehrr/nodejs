import { loginHandler, registerHandler } from "../handler/auth.handler.js";

const registerRoute = {
  schema: {
    tags: ["authentication"],
    consumes: ["application/json", "application/x-www-urlencoded"],
    body: {
      type: "object",
      properties: {
        username: {
          type: "string",
        },
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    response: {
      201: {
        type: "object",
      },
    },
  },
  handler: registerHandler,
};
const loginRoute = {
  schema: {
    tags: ["authentication"],
    consumes: ["application/json", "application/x-www-urlencoded"],
    body: {
      type: "object",
      properties: {
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    response: {
      201: {
        type: "object",
      },
    },
  },
  handler: loginHandler,
};

export default function authRoutes(fastify, options, done) {
  fastify.post("/register", registerRoute);
  fastify.post("/login", loginRoute);

  // naghshe next() ro dare.
  done();
}
