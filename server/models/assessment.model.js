const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  all_subjects: [String],
  assessments: [
    {
      settings: {
        testName: {
          type: String,
          default: "",
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
          type: String,
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
        tabCheckType_WARN: {
          type: Boolean,
          default: false,
        },
        tabCheckType_END: {
          type: Boolean,
          default: false,
        },
        warn_num: {
          type: Number,
          default: 1,
        },
      },
      access: {
        link: {
          type: String,
          default: "",
        },
        noAuthenticationSelected: {
          type: Boolean,
          default: true,
        },
        withAuthenticationSelected: {
          type: Boolean,
          default: false,
        },
        attemptNum: {
          type: String,
          default: "1",
        },
        accessEmail: [String],
      },
      sets: {
        fixedSelected: {
          type: Boolean,
          default: true,
        },
        randomSelected: {
          type: Boolean,
          default: false,
        },
        manualSelected: {
          type: Boolean,
          default: false,
        },
        manualRandomSelected: {
          type: Boolean,
          default: false,
        },
        randomTakeFromTotalSelected: {
          type: Boolean,
          default: false,
        },
        definedTakeFromSectionSelected: {
          type: Boolean,
          default: false,
        },
        randomQuestionNum: {
          type: Number,
          default: 0,
        },
        sectionFilterNum: [String],
      },
      timer: {
        assessmentTimeSelected: {
          type: Boolean,
          default: false,
        },
        questionTimeSelected: {
          type: Boolean,
          default: false,
        },
        noLimitSelected: {
          type: Boolean,
          default: true,
        },
        time: {
          type: String,
          default: "",
        },
        startDate: {
          type: Date,
          default: "",
        },
        endDate: {
          type: Date,
          default: "",
        },
      },
      status: {
        type: String,
        default: "Setup in progress",
      },
      totalQuestionNum: {
        type: Number,
        default: 0,
      },
      subject: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("Assessment", AssessmentSchema);
