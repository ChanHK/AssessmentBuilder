const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

const validateQuestion = require("../../validation/question");

// @route     POST api/user/question
// @desc      POST question to questionBank
// @access    Private
router.post("/question", auth, (req, res) => {
  const { errors, isValid } = validateQuestion(req.body);

  if (!isValid) return res.status(400).json(errors);

  db.QuestionBank.findOne({ user_id: req.user.id })
    .then((questionBank) => {
      db.QuestionBank.findByIdAndUpdate(
        questionBank._id,
        {
          $push: {
            questions: {
              questionType: req.body.questionType,
              questionDescription: req.body.questionDescription,
              questionChoices: req.body.questionChoices,
              questionAnswers: req.body.questionAnswers,
            },
          },
        },
        { new: true }
      )
        .then(() => {
          db.User.updateOne(
            { _id: req.user.id },
            {
              $inc: { totalQuestionsCreated: 1 },
            }
          )
            .then(() => {
              return res
                .status(200)
                .json({ message: "Question updated successfully" });
            })
            .catch((err) => {
              return res
                .status(200)
                .json({ message: "Update question count fail" });
            });
        })
        .catch((err) => {
          return res.status(400).json({
            message: "Error, failed to update question, please retry agian",
          });
        });
    })
    .catch((err) => console.log(err));
});

// @route     GET api/user/question
// @desc      GET all question from question bank
// @access    Private
router.get("/question", auth, (req, res) => {
  db.QuestionBank.findOne({ user_id: req.user.id })
    .select("-_id")
    .select("-user_id")
    .select("-questions.questionChoices")
    .select("-questions.questionAnswers")
    .select("-__v")
    .then((allQuestions) => {
      return res.json(allQuestions);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/question
// @desc      POST ($pull) delete question from question bank based on id
// @access    Private
router.post("/question/delete", auth, (req, res) => {
  db.QuestionBank.findOne({ user_id: req.user.id }).then((questionBank) => {
    db.QuestionBank.findByIdAndUpdate(
      questionBank._id,
      {
        $pull: { questions: { _id: req.body.questionID } },
      },
      { safe: true }
    )
      .then(() => {
        db.User.updateOne(
          { _id: req.user.id },
          {
            $inc: { totalQuestionsCreated: -1 },
          }
        )
          .then(() => {
            return res
              .status(200)
              .json({ message: "Question deleted successfully" });
          })
          .catch((err) => {
            return res
              .status(200)
              .json({ message: "Update question count fail" });
          });
      })
      .catch(() => {
        return res.status(400).json({
          message: "Error, failed to delete question, please retry agian",
        });
      });
  });
});

// @route     GET api/user/question/view
// @desc      GET a question from question bank
// @access    Private
router.get("/question/view/:questionID", auth, (req, res) => {
  db.QuestionBank.find(
    { user_id: req.user.id },
    {
      questions: { $elemMatch: { _id: req.params.questionID } },
    }
  )
    .then((question) => {
      return res.json(question);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/question
// @desc      POST question to questionBank
// @access    Private
router.post("/question/edit/:questionID", auth, (req, res) => {
  // const { errors, isValid } = validateQuestion(req.body);

  // if (!isValid) return res.status(400).json(errors);

  db.QuestionBank.updateOne(
    {
      questions: { $elemMatch: { _id: req.params.questionID } },
    },
    {
      $set: {
        "questions.$.questionDescription": req.body.questionDescription,
        "questions.$.questionChoices": req.body.questionChoices,
        "questions.$.questionAnswers": req.body.questionAnswers,
      },
    }
  )
    .then(() => {
      return res.status(200).json({ message: "Question updated successfully" });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Error, failed to update question, please retry agian",
      });
    });
});

module.exports = router;
