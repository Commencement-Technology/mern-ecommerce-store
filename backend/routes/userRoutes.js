const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, getCurrentUser);

router.post("/logout", validateToken, logoutUser);

module.exports = router;
