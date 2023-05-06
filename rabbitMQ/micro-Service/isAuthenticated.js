const jwt = require("jsonwebtoken");

async function isAuthenticated(req, res, next) {
  try {
    const token = req.headers?.["authorization"]?.split(" ")[1];
    const payload = jwt.verify(token, "secretKey");
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  isAuthenticated,
};
