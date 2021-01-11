const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     GET api/user/home/assessment/fetch
// @desc      GET all assessments
// @access    Private
router.get("/assessment/fetch", auth, (req, res) => {
  db.Assessment.findOne({ user_id: req.user.id })
    .select("-assessments.access")
    .select("-assessments.sets")
    .select("-assessments.timer")

    .select("-assessments.settings.testDescription")
    .select("-assessments.settings.testInstruction")
    .select("-assessments.settings.passOrFailSelected")
    .select("-assessments.settings.score")
    .select("-assessments.settings.unit")
    .select("-assessments.settings.addGradingSelected")
    .select("-assessments.settings.gradeUnit")
    .select("-assessments.settings.gradeRange")
    .select("-assessments.settings.gradeValue")

    .then((result) => {
      return res.json(result.assessments);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/home/assessment/create
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
        .then((assessment) => {
          const data = {
            assessments_id:
              assessment.assessments[assessment.assessments.length - 1]._id,
          };

          db.AssessmentQuestion.create(data);
          db.AssessmentSet.create(data);
          db.User.updateOne(
            { _id: req.user.id },
            {
              $inc: { totalAssessmentsCreated: 1 },
            }
          );
          return res.json({
            assessmentID:
              assessment.assessments[assessment.assessments.length - 1]._id,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            message: "Error, failed to create assessment, please retry agian",
          });
        });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
