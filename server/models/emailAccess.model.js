const mongoose = require("mongoose");

const EmailAccessSchema = new mongoose.Schema({
  assessments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment.assessments",
  },

  emailAccess: [
    {
      accessCode: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("EmailAccess", EmailAccessSchema);
