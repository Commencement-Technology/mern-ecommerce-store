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
  fetchAllProducts,
  filterProducts,
} = require("../controllers/productController");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const checkId = require("../middleware/checkId");

const router = express.Router();

// admin route
router.post("/add", validateToken, authorizeAdmin, formidable(), addProduct);
// user routes
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.get("/all-products", fetchAllProducts);
// admin routes
router
  .route("/:id")
  .put(validateToken, authorizeAdmin, formidable(), updateProductDetails)
  .get(validateToken, authorizeAdmin, fetchProductById);
router
  .route("/delete/:id")
  .delete(validateToken, authorizeAdmin, removeProduct);
router.get("/", validateToken, authorizeAdmin, fetchProducts);
// user route
router.route("/:id/reviews").post(validateToken, checkId, addProductReview);

router.route("/filtered-products").post(filterProducts);

module.exports = router;
