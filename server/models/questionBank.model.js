const mongoose = require("mongoose");

const QuestionBankSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalSubjects: {
    type: Array,
    default: ["Others"],
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
      subject: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("QuestionBank", QuestionBankSchema);
