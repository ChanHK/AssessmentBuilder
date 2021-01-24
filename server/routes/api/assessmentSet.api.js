const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     POST api/user/assessment/sets/question_ids/update/:assessmentID
// @desc      POST sets to assessmentsets collection
// @access    Private
router.post(
  "/assessment/sets/question_ids/update/:assessmentID",
  auth,
  (req, res) => {
    db.AssessmentSet.findOneAndUpdate(
      { assessments_id: req.params.assessmentID },
      {
        $set: {
          generatedSets: req.body.generatedSets,
        },
      },
      { new: true }
    )
      .then((response) => {
        return res.status(200).json(response.generatedSets);
      })
      .catch(() => {
        return res.status(400).json({
          message: "Error, failed to update set, please retry agian",
        });
      });
  }
);

// @route     GET api/user/assessment/sets/question_ids/fetch/:assessmentID
// @desc      GET sets from assessmentsets collection
// @access    Private
router.get(
  "/assessment/sets/question_ids/fetch/:assessmentID",
  auth,
  (req, res) => {
    db.AssessmentSet.findOne({ assessments_id: req.params.assessmentID })
      .then((response) => {
        return res.status(200).json(response.generatedSets);
      })
      .catch(() => {
        return res.status(400).json({
          message: "Error, failed to obtain set, please retry agian",
        });
      });
  }
);

// @route     GET api/user/assessment/sets/fetch/:setNum/:assessmentID
// @desc      GET question sets from assessmentsets collection
// @access    Private
router.get("/assessment/sets/fetch/:setNum/:assessmentID", auth, (req, res) => {
  db.AssessmentSet.findOne({ assessments_id: req.params.assessmentID })
    .then((response) => {
      db.AssessmentQuestion.findOne({
        assessments_id: req.params.assessmentID,
      })
        .then((response2) => {
          let AS = response.generatedSets[req.params.setNum];
          let AQ = response2.questions;

          let result = [];
          let filtered_result = [];

          AQ.forEach((item, index) => {
            if (AS.includes(item._id.toString())) {
              result.push(item);
            }
          });

          AS.forEach((item, index) => {
            result.forEach((item2, index2) => {
              if (item === item2._id.toString()) {
                filtered_result.push(item2);
              }
            });
          });

          return res.status(200).json(filtered_result);
        })
        .catch(() => {
          return res.status(400).json({
            message: "Error, failed to obtain set, please retry agian",
          });
        });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
