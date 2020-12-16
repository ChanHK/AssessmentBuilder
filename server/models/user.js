const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  picture: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "Empty",
  },
  yearOfBirth: {
    type: String,
    default: "Empty",
  },
  occupation: {
    type: String,
    default: "Empty",
  },
  resetPasswordLink: {
    data: String,
    default: "",
  },
});

module.exports = mongoose.model("User", UserSchema);
