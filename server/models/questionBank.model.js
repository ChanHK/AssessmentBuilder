const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  questionBank: [
    {
      questionType: {
        type: String,
        default: "",
      },
      questionDescription: {
        type: String,
        default: "",
      },
      questionChoices: [
        {
          choice: {
            type: String,
            default: "",
          },
        },
      ],
      questionAnswers: [
        {
          answer: {
            type: String,
            default: "",
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("QuestionBank", UserSchema);
