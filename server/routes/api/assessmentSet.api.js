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

module.exports = router;
