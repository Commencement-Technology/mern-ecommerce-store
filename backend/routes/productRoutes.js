const express = require("express");
const formidable = require("express-formidable");
const validateToken = require("../middleware/validateToken");
const {
  addProduct,
  updateProductDetails,
  fetchProductById,
  fetchProducts,
  removeProduct,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} = require("../controllers/productController");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const checkId = require("../middleware/checkId");

const router = express.Router();

router.post("/add", validateToken, authorizeAdmin, formidable(), addProduct);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router
  .route("/:id")
  .put(validateToken, authorizeAdmin, formidable(), updateProductDetails)
  .get(validateToken, authorizeAdmin, fetchProductById)
  .delete(validateToken, authorizeAdmin, removeProduct);
router.get("/", validateToken, authorizeAdmin, fetchProducts);
router.route("/:id/reviews").post(validateToken, checkId, addProductReview);

module.exports = router;
