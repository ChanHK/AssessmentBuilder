const mongoose = require("mongoose");

//response
const CandidateSchema = new mongoose.Schema({
  assessments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment.assessments",
  },
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  totalScore: {
    type: String,
    default: "",
  },
  grade: {
    type: String,
    default: "",
  },
  submissionDate: {
    type: String,
    default: "",
  },
  response: [
    {
      question_id: {
        type: String,
        default: "",
      },
      questionType: {
        type: String,
        default: "",
      },
      questionAnswers: [String],
      questionChoices: [String],
      questionDescription: {
        type: String,
        default: "",
      },
      response: [String],
      score: {
        type: Number,
        default: 0,
      },
      graded: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Candidate", CandidateSchema);
