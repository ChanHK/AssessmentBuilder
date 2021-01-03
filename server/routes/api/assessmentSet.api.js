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

module.exports = router;
