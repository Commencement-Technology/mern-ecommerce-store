const multer = require("multer");
const express = require("express");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types and MIME types
  const fileTypes = /jpe?g|png|webp/;
  const mimeTypes = /image\/jpeg|image\/png|image\/webp/;

  // Check file extension
  const extName = path.extname(file.originalname).toLowerCase();

  // Check MIME type
  const mimeType = file.mimetype.toLowerCase();

  // Test if both extension and MIME type are valid
  if (fileTypes.test(extName) && mimeTypes.test(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Single file upload route
router.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  } else {
    res.status(400).send({ message: "No image file provided" });
  }
});

module.exports = router;
