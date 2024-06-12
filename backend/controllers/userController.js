const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = require("../utils/createToken");

const registerUser = asyncHandler(async (req, res) => {
  // get the req body
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be 8 characters long.");
  }
  // get current user
  const availableUser = await User.findOne({ email });
  if (availableUser) {
    res.status(400);
    throw new Error("User already registered");
  }
  // create user
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data..");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // get the body
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const availableUser = await User.findOne({ email });
  if (
    availableUser &&
    (await bcrypt.compare(password, availableUser.password))
  ) {
    createToken(res, availableUser._id);
    res.status(200).json({
      _id: availableUser._id,
      username: availableUser.username,
      email: availableUser.email,
    });
  } else {
    res.status(401);
    throw new Error("Email or password isn't valid");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  // setting the cookie to empty
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out successfully" });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};
