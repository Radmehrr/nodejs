const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constans");
const redisClient = require("./init_redis");
const fs = require("fs");
const path = require("path");

function randomNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}

function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      phone: user.phone,
    };
    const options = {
      expiresIn: "4d",
    };

    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options);
    if (token) {
      resolve(token);
    }
    reject(createError.InternalServerError("خطای سروری"));
  });
}

function signRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      phone: user.phone,
    };
    const options = {
      expiresIn: "1y",
    };

    const token = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options);
    if (!token) {
      reject(createError.InternalServerError("خطای سروری"));
    }

    // token ro ba expire 1sal zakhre mikonim.
    await redisClient.SETEX(String(userId), 365 * 24 * 60 * 60, token);
    resolve(token);
  });
}

function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
}

function listOfImagesFromRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath + file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
}

function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

function setFeature(body) {
  const { colors, width, weight, length, height } = body;
  let feature = {};

  feature.colors = colors;
  if (!isNaN(+width) || !+isNaN(weight) || !isNaN(+length) || !isNaN(+height)) {
    if (!width) feature.width = 0;
    else feature.width = +width;
    if (!height) feature.height = 0;
    else feature.height = +height;
    if (!weight) feature.weight = 0;
    else feature.weight = +weight;
    if (!length) feature.length = 0;
    else feature.length = +length;
  }

  return feature;
}

function deleteInvalidPropertyInObject(data = {}, blackListFields) {
  let nullishData = ["", " ", 0, "0", null, undefined, NaN];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length == 0)
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];

    if (nullishData.includes(data[key])) delete data[key];
  });
}

function getTime(time) {
  let total = Math.round(time) / 60;
  let [min, percentage] = String(total).split(".");
  if (percentage == undefined) percentage = "0";
  let sec = Math.round((percentage.substring(0, 2) * 60) / 100);
  let hour = 0;
  if (min > 59) {
    total = min / 60;
    [hour, percentage] = String(total).split(".");
    if (percentage == undefined) percentage = "0";
    min = Math.round((percentage.substring(0, 2) * 60) / 100);
  }
  if (hour < 10) hour = `0${hour}`;
  if (min < 10) min = `0${min}`;
  if (sec < 10) sec = `0${sec}`;
  return hour + ":" + min + ":" + sec;
}

function getCourseTime(chapters = []) {
  let time,
    hour,
    minute,
    second = 0;
  for (const chapter of chapters) {
    if (Array.isArray(chapter?.episodes)) {
      for (const episode of chapter.episodes) {
        if (episode?.time)
          time = episode.time.split(":"); // [hour, min, second]
        else time = "00:00:00".split(":");
        if (time.length == 3) {
          second += Number(time[0]) * 3600; // convert hour to second
          second += Number(time[1]) * 60; // convert minute to second
          second += Number(time[2]); //sum second with seond
        } else if (time.length == 2) {
          //05:23
          second += Number(time[0]) * 60; // convert minute to second
          second += Number(time[1]); //sum second with seond
        }
      }
    }
  }
  hour = Math.floor(second / 3600); //convert second to hour
  minute = Math.floor(second / 60) % 60; //convert second to mintutes
  second = Math.floor(second % 60); //convert seconds to second
  if (String(hour).length == 1) hour = `0${hour}`;
  if (String(minute).length == 1) minute = `0${minute}`;
  if (String(second).length == 1) second = `0${second}`;
  return hour + ":" + minute + ":" + second;
}

module.exports = {
  randomNumberGenerator,
  signAccessToken,
  signRefreshToken,
  deleteFileInPublic,
  listOfImagesFromRequest,
  copyObject,
  setFeature,
  deleteInvalidPropertyInObject,
  getTime,
  getCourseTime,
};
