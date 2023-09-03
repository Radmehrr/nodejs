const router = require("express").Router();
const { graphqlHTTP } = require("express-graphql");
const {
  verifyAccessToken,
} = require("../http/middlewares/verify-access-token");
const redisClient = require("../utils/init_redis");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");
const { graphqlConfig } = require("../utils/graphql.config");

(async () => {
  await redisClient.set("name", "radmehr");
  const name = await redisClient.get("name");
  console.log(name);
})();

router.use("/user", UserAuthRoutes);
router.use("/admin", verifyAccessToken, AdminRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig));
router.use("/", HomeRoutes);

module.exports = {
  AllRoutes: router,
};
