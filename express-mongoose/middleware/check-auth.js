async function checkAuth(req, res, next) {
  try {
    const authorization = req?.headers?.authorization;
    const [bearer, token] = authorization?.split(" ");
    if (bearer && bearer.toLowerCase() === "bearer") {
      if (token) {
        const verifyResult = verifyJwtToken(token);
        // request to user model db
        // req.user = user;
        //return next()
      }
    }
  } catch (error) {
    next();
  }
}

module.exports = {
  checkAuth,
};
