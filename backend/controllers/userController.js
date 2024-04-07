const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  // get the req body
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  // get current user
  const availableUser = await User.findOne({ email });
  if (availableUser) {
    res.status(400);
    throw new Error("User already registered");
  }
  // create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(200);
    res.json(newUser);
  } else {
    res.status(400);
    throw new Error("User data isn't valid");
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
    const accessToken = jwt.sign(
      {
        user: {
          username: availableUser.username,
          email: availableUser.email,
          password: availableUser.password,
          id: availableUser.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // delete old tokens
    let oldTokens = availableUser.tokens || [];

    // only filter out the tokens which are not expired yet
    if (oldTokens.length) {
      oldTokens.filter((t) => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        return timeDiff < 86400;
      });
    }

    // add all the non-expiry tokens into the db
    await User.findByIdAndUpdate(availableUser._id, {
      tokens: [...oldTokens, { accessToken, signedAt: Date.now().toString() }],
    });
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password isn't valid");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const tokens = req.user.tokens;
  if (tokens.length > 0) {
    res.json(req.user);
  } else {
    res.json({ message: "User has been signed out." });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Authorization failed!" });
    }

    // get the tokens of the verified user
    const tokens = req.user.tokens;

    // delete the new token from the tokens
    const newTokens = tokens.filter((t) => t.accessToken !== token);
    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.status(200).json({ message: "User signed out successfully" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};
