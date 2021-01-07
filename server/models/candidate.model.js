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
  assessment_set: [[String]],
  response: [[String]],
});

module.exports = mongoose.model("Candidate", CandidateSchema);
