const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     POST api/user/assessment/create
// @desc      POST create new assessment obj
// @access    Private
router.post("/assessment/create", auth, (req, res) => {
  db.Assessment.findOne({ user_id: req.user.id })
    .then((assessment) => {
      db.Assessment.findByIdAndUpdate(
        assessment._id,
        {
          $push: {
            assessments: {
              settings: {
                testName: "New assessment",
              },
            },
          },
        },
        { new: true }
      )
        .then(() => {
          return res
            .status(200)
            .json({ message: "Assessment created successfully" });
        })
        .catch((err) => {
          return res.status(400).json({
            message: "Error, failed to create assessment, please retry agian",
          });
        });
    })
    .catch((err) => console.log(err));
});

// @route     GET api/user/assessment/getCreated
// @desc      GET new assessment obj id that is newly created
// @access    Private
router.get("/assessment/getCreate", auth, (req, res) => {
  db.Assessment.findOne({ user_id: req.user.id })
    .then((assessment) => {
      return res.json({
        assessmentID:
          assessment.assessments[assessment.assessments.length - 1]._id,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Error, failed to retrieve assessment ID, please retry agian",
      });
    });
});

// @route     POST api/user/assessment/settings
// @desc      POST settings to assessment collection
// @access    Private
router.post("/assessment/settings/update/:assessmentID", auth, (req, res) => {
  db.Assessment.findOneAndUpdate(
    { assessments: { $elemMatch: { _id: req.params.assessmentID } } },
    {
      $set: {
        "assessments.$.settings.testName": req.body.testName,
        "assessments.$.settings.testDescription": req.body.testDescription,
        "assessments.$.settings.testInstruction": req.body.testInstruction,
        "assessments.$.settings.passOrFailSelected":
          req.body.passOrFailSelected,
        "assessments.$.settings.score": req.body.score,
        "assessments.$.settings.unit": req.body.unit,
        "assessments.$.settings.addGradingSelected":
          req.body.addGradingSelected,
        "assessments.$.settings.gradeUnit": req.body.gradeUnit,
        "assessments.$.settings.gradeRange": req.body.gradeRange,
        "assessments.$.settings.gradeValue": req.body.gradeValue,
      },
    },
    {
      new: true,
    }
  )
    .select("-__v")
    .select("-_id")
    .select("-user_id")

    .then((response) => {
      let count = null;
      response.assessments.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.assessmentID + `"`) {
          count = index;
        }
      });

      return res.status(200).json(response.assessments[count].settings);
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Error, failed to update settings, please retry agian",
      });
    });
});

// @route     GET api/user/assessment/settings
// @desc      GET settings from assessment collection
// @access    Private
router.get("/assessment/settings/fetch/:assessmentID", auth, (req, res) => {
  db.Assessment.findOne(
    { user_id: req.user.id },
    {
      assessments: { $elemMatch: { _id: req.params.assessmentID } },
    }
  )
    .select("-_id")
    .select("-user_id")
    .select("-__v")
    .then((assessment) => {
      return res.json(assessment.assessments[0].settings);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
