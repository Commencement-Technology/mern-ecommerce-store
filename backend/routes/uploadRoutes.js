const path = require("path");
const multer = require("multer");
const express = require("express");
const { uploadImage } = require("../utils/upload");

const router = express.Router();

const uploader = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetype = file.mimetype;
    const extname = path.extname(file.originalname).toLowerCase();

    if (filetypes.test(extname) && filetypes.test(mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Images only!", false));
    }
  },
});

const uploadSingleImage = uploader.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    if (req.file) {
      try {
        const result = await uploadImage(req.file.path);
        res.status(200).send({
          message: "Image uploaded succesfully",
          image: result.secure_url,
        });
      } catch (error) {
        res.status(500).send({
          message: "Failed to upload image to cloudinary",
          error: error.message,
        });
      }
    } else {
      res.status(400).send({ message: "No image file provided!" });
    }
  });
});

module.exports = router;
