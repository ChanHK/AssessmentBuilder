const mongoose = require("mongoose");

//response
const CandidateSchema = new mongoosse.Schema({
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
  assessment: [[String]],
  response: [[String]],
});

module.exports = mongoose.model("Candidate", CandidateSchema);
