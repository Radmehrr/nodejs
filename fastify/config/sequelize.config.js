import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://postgres:root@localhost:5433/fastify"
);
// const DBConnection = async () => {
//   await sequelize.authenticate();
//   console.log("connect to pg admin");
// };

// DBConnection();
