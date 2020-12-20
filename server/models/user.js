const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  image: {
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dityuyf5q/image/upload/v1608194169/profile/dummyUser_ccehfi.png",
    },
    posX: {
      type: String,
      default: "0.5",
    },
    posY: {
      type: String,
      default: "0.5",
    },
    scale: {
      type: String,
      default: "1",
    },
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

  // questionBank: [
  //   {
  //     questionType: {
  //       type: String,
  //       default: "",
  //     },
  //     questionDescription: {
  //       type: String,
  //       default: "",
  //     },
  //     questionChoices: [
  //       {
  //         choice: {
  //           type: String,
  //           default: "",
  //         },
  //       },
  //     ],
  //     questionAnswers: [
  //       {
  //         answer: {
  //           type: String,
  //           default: "",
  //         },
  //       },
  //     ],
  //   },
  // ],
});

module.exports = mongoose.model("User", UserSchema);
