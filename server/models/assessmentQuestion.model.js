const mongoose = require("mongoose");

const AssessmentQuestionSchema = new mongoose.Schema({
  assessments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment.assessments",
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
      score: {
        type: Number,
        default: "",
      },
      section: {
        type: Number,
        default: 1,
      },
      questionChoices: [String],
      questionAnswers: [String],
    },
  ],
});

module.exports = mongoose.model("AssessmentQuestion", AssessmentQuestionSchema);
