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

// @route     GET api/user/assessment/question_bank/:assessmentID
// @desc      GET all questions from assessment
// @access    Private
router.get("/assessment/question_bank/:assessmentID", auth, (req, res) => {
  db.AssessmentQuestion.findOne({ assessments_id: req.params.assessmentID })
    .select("-_id")
    .select("-assessments_id")
    .select("-__v")

    .then((x) => {
      return res.json(x.questions);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
