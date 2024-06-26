const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  getCategory,
} = require("../controllers/categoryController");
const validateToken = require("../middleware/validateToken");
const authorizeAdmin = require("../middleware/authorizeAdmin");

router.route("/").post(validateToken, authorizeAdmin, createCategory);
router.route("/:categoryId").put(validateToken, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(validateToken, authorizeAdmin, removeCategory);
router.route("/categories").get(listCategory);
router.route("/:id").get(getCategory);

module.exports = router;
