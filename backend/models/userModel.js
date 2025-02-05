const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide the username"],
    },
    email: {
      type: String,
      required: [true, "Please provide the email address."],
      unique: [true, "Email address already taken."],
    },
    password: {
      type: String,
      required: [true, "Please provide the password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
