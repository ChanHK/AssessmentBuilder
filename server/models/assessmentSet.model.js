const mongoose = require("mongoose");

const AssessmentGeneratedSetSchema = new mongoose.Schema({
  assessments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment.assessments",
  },
  generatedSets: [
    {
      questionIDs: [String],
    },
  ],
});

module.exports = mongoose.model("AssessmentSet", AssessmentGeneratedSetSchema);
