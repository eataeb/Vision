var express = require('express');
var router = express.Router();
const path = require('node:path'); 
const fs = require('node:fs');
var multer = require("multer");


const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};
const upload = multer({
    dest: "uploads/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });



router.post(
  "/",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = "public/images/Galery/"  + req.file.originalname;
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);
        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);


    module.exports = router;