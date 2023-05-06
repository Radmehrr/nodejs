const express = require("express");
const { uploadFile } = require("./middleware/multer");
const { NotFoundError, ErrorHandler } = require("./utils/errorHandler");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/upload-single", uploadFile.single("image"), (req, res) => {
  res.send(req.file);
});

app.post("/upload-array", uploadFile.array("image", 3), (req, res) => {
  res.send(req.files);
});

app.post(
  "/upload-fields",
  uploadFile.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  (req, res) => {
    res.send(req.files);
  }
);

app.use(NotFoundError);
app.use(ErrorHandler);

app.listen(300, () => {
  console.log("running in port 3000");
});
