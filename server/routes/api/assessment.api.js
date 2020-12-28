const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     POST api/user/assessment/settings
// @desc      POST settings to assessment collection
// @access    Private
router.post("/assessment/settings", auth, (req, res) => {
  db.Assessment.findOne({ user_id: req.user.id }).then((assessment) => {
    db.Assessment.findByIdAndUpdate(
      assessment._id,
      {
        $push: {
          assessments: {
            settings: {
              testName: req.body.testName,
              testDescription: req.body.testDescription,
              testInstruction: req.body.testInstruction,
              passOrFailSelected: req.body.passOrFailSelected,
              score: req.body.score,
              unit: req.body.unit,
              addGradingSelected: req.body.addGradingSelected,
              gradeUnit: req.body.gradeUnit,
              gradeRange: req.body.gradeRange,
              gradeValue: req.body.gradeValue,
            },
          },
        },
      },
      { new: true }
    )
      .then(() => {
        return res
          .status(200)
          .json({ message: "Settings updated successfully" });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Error, failed to update settings, please retry agian",
        });
      });
  });
});

module.exports = router;
