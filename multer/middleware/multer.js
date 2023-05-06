const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir("public/upload", { recursive: true });
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const whiteListFormat = [".png", ".jpg", ".webp", ".jpeg"];
    if (whiteListFormat.includes(ext)) {
      const fileName = Date.now() + ext;
      cb(null, fileName);
    }
    cb(new Error("only .png, .jpeg, .jpg, .webp format accepted."));
  },
});

const uploadFile = multer({ storage, limits: { fileSize: 10000000 } });

module.exports = {
  uploadFile,
};
