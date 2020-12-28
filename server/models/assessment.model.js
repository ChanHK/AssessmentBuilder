const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assessments: [
    {
      settings: {
        testName: {
          type: String,
          default: "New test",
        },
        testDescription: {
          type: String,
          default: "",
        },
        testInstruction: {
          type: String,
          default: "",
        },
        passOrFailSelected: {
          type: Boolean,
          default: true,
        },
        score: {
          type: Number,
          default: "",
        },
        unit: {
          type: String,
          default: "",
        },
        addGradingSelected: {
          type: Boolean,
          default: false,
        },
        gradeUnit: {
          type: String,
          default: "",
        },
        gradeRange: [String],
        gradeValue: [String],
      },
    },
  ],
});

module.exports = mongoose.model("Assessment", AssessmentSchema);
