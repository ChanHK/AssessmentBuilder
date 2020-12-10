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
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "",
  },
  yearOfBirth: {
    type: Number,
    default: "",
  },
  occupation: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("user", UserSchema);
