const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     POST api/user/home2/assessment/delete/subject
// @desc      POST (delete) remove a question bank
// @access    Private
router.post("/assessment/delete/subject", auth, (req, res) => {
  db.Assessment.findOneAndUpdate(
    {
      user_id: req.user.id,
    },
    {
      $pullAll: { all_subjects: [req.body.subject] },
      $pull: { assessments: { subject: req.body.subject } },
    },
    { new: true }
  )
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

    .select("-__v")
    .select("-_id")
    .select("-user_id")
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
