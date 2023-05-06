function login(req, res, next) {}
function register(req, res, next) {
  try {
    const { fullName, email, password } = req.body;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  register,
};
