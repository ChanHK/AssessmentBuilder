const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for user
const UserSchema = new Schema({
  picture: {
    type: String,
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
  },
  yearOfBirth: {
    type: Number,
  },
  Occupation: {
    type: String,
  },
});

//create model for user
const User = mongoose.model("user", UserSchema);

module.exports = User;
