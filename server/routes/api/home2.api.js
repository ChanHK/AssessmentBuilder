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
      db.Assessment.findOne({ user_id: req.user.id })
        .then((data) => {
          let length = data.assessments.length;
          db.User.findByIdAndUpdate(
            { _id: req.user.id },
            { totalAssessmentsCreated: length }
          )
            .then(() => {
              return res.json(results);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @route     GET api/user/home2/assessment/fetch/assessment/:subject
// @desc      GET fetch assessments, questions, sets
// @access    Private
router.get("/assessment/fetch/assessment/:subject", auth, (req, res) => {
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
      let temp = [];
      result.assessments.forEach((item, index) => {
        if (item.subject === req.params.subject) temp.push(item);
      });

      return res.json(temp);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/home2/assessment/reuse/:assessmentID
// @desc      POST (delete) remove a question bank
// @access    Private
router.post("/assessment/reuse/:assessmentID", auth, (req, res) => {
  db.Assessment.findOneAndUpdate(
    { user_id: req.user.id, "assessments._id": req.params.assessmentID },
    {
      $set: {
        "assessments.$.status": "Setup in progress",
        "assessments.$.timer.startDate": "",
        "assessments.$.timer.endDate": "",
      },
    },
    { new: true }
  )
    .then((results) => {
      db.Candidate.deleteMany({
        assessments_id: req.params.assessmentID,
      })
        .then(() => {
          db.Feedback.deleteMany({
            assessments_id: req.params.assessmentID,
          })
            .then(() => {
              let temp = [];
              results.assessments.forEach((item, index) => {
                if (item.subject === req.body.subject) temp.push(item);
              });
              return res.status(200).json(temp);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
