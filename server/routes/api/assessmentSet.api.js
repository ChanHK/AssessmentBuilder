const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

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
