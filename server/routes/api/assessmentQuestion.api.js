const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     POST api/user/assessment/question_bank/update/:assessmentID
// @desc      POST question from question bank to assessment collection
// @access    Private
router.post(
  "/assessment/question_bank/update/:assessmentID",
  auth,
  (req, res) => {
    db.AssessmentQuestion.findOneAndUpdate(
      { assessments_id: req.params.assessmentID },
      {
        $push: {
          questions: {
            questionType: req.body.questionType,
            questionDescription: req.body.questionDescription,
            score: req.body.score,
            section: req.body.section,
            questionChoices: req.body.questionChoices,
            questionAnswers: req.body.questionAnswers,
          },
        },
      },
      {
        new: true,
      }
    )
      .then((response) => {
        return res
          .status(200)
          .json(response.questions[response.questions.length - 1]);
      })
      .catch((err) => {
        console.log(req.body);
        return res.status(400).json({
          message: "Error, failed to add question, please retry agian",
        });
      });
  }
);

module.exports = router;
