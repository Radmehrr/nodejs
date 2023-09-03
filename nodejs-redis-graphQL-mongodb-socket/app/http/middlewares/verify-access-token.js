const createError = require("http-errors");
const { UserModel } = require("../../models/user");
const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("../../utils/constans");
const redisClient = require("../../utils/init_redis");
const createHttpError = require("http-errors");

function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["bearer", "Bearer"].includes(bearer)) return token;
  throw createError.Unauthorized("وارد حساب خود شوید");
}

async function verifyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    const { phone } = payload || {};
    const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
    if (!user) return next(createError.Unauthorized("کاربری یافت نشد"));
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
}
async function VerifyAccessTokenInGraphQL(req) {
  try {
    const token = getToken(req.headers);
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    const { phone } = payload || {};

    const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
    if (!user) throw new createHttpError.Unauthorized("حساب کاربری یافت نشد");
    console.log(user);
    return user;
  } catch (error) {
    throw new createHttpError.Unauthorized();
  }
}

function verifyRefreshToken(token) {
  return new Promise(async (resolve, reject) => {
    const payload = await jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
    if (!payload) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
    const { phone } = payload || {};
    const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
    if (!user) return next(createError.Unauthorized("کاربری یافت نشد"));
    // token dar redis vojod dare ya na
    const refreshToken = await redisClient.get(String(user?._id));
    if (!refreshToken)
      reject(createError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"));
    if (token === refreshToken) return resolve(user);
    reject(createError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"));
  });
}

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
  getToken,
  VerifyAccessTokenInGraphQL,
};
