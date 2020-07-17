// call all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { format } = require("date-fns");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//ROUTES WILL GO HERE
app.get("/", function (req, res) {
  res.json({ message: "WELCOME" });
});

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log("writing!");
    console.log("------::", JSON.stringify(req.test));
    cb(
      null,
      file.originalname +
        "-" +
        format(Date.now(), "yyyy-MM-dd-HH:mm:ss") +
        "-" +
        path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

app.post(
  "/upload",
  function (req, res, next) {
    console.log("------::", JSON.stringify(req.body));
    const { test } = req.body;
    next(test);
  },
  upload.single("myFile"),
  (req, res, next) => {
    const file = req.file;

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  }
);

app.listen(3000, () => console.log("Server started on port 3000"));
