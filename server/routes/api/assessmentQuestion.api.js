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
            score: 0,
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

// @route     POST api/user/assessment/questions/update/:assessmentID
// @desc      POST questions from question container, assessment
// @access    Private
router.post("/assessment/questions/update/:assessmentID", auth, (req, res) => {
  db.AssessmentQuestion.updateOne(
    { assessments_id: req.params.assessmentID },
    { $set: { questions: [] } }
  )
    .then(() => {
      console.log(req.body);
      db.AssessmentQuestion.findOneAndUpdate(
        { assessments_id: req.params.assessmentID },
        {
          $push: {
            questions: req.body,
          },
        },
        { upsert: true, new: true }
      )
        .then((response) => {
          return res.status(200).json(response.questions);
        })
        .catch(() => {
          return res.status(200).json({ message: "failed in updating" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route     POST api/user/assessment/questions/add/question_bank/:assessmentID/:questionID
// @desc      POST questions from question container, assessment to question bank
// @access    Private
router.post(
  "/assessment/questions/add/question_bank/:assessmentID/:questionID",
  auth,
  (req, res) => {
    db.AssessmentQuestion.findOne({
      assessments_id: req.params.assessmentID,
    }).then((assessment) => {
      assessment.questions.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.questionID + `"`) {
          db.QuestionBank.findOneAndUpdate(
            { user_id: req.user.id },
            {
              $push: {
                questions: {
                  questionType: item.questionType,
                  questionDescription: item.questionDescription,
                  questionChoices: item.questionChoices,
                  questionAnswers: item.questionAnswers,
                },
              },
            },
            { new: true }
          )
            .then((response) => {
              return res
                .status(200)
                .json(response.questions[response.questions.length - 1]);
            })
            .catch((err) => {
              return res
                .status(200)
                .json({ message: "Add question to question bank fail" });
            });
        }
      });
    });
  }
);

module.exports = router;
