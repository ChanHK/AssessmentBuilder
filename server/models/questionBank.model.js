const mongoose = require("mongoose");

const QuestionBankSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questions: [
    {
      questionType: {
        type: String,
        default: "",
      },
      questionDescription: {
        type: String,
        default: "",
      },
      questionChoices: [String],
      questionAnswers: [String],
    },
  ],
});

module.exports = mongoose.model("QuestionBank", QuestionBankSchema);
