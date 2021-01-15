const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  assessments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment.assessments",
  },
  cand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AssessmentQuestion",
  },
  feedback: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
