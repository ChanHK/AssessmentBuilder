const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Assessment", AssessmentSchema);
