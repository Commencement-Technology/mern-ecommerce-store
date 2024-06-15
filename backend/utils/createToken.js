const jwt = require("jsonwebtoken");

const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  // set jwt as an http-cookie only
  // these types of cookies can't be accessed by the client side
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  });

  return token;
};

module.exports = createToken;
