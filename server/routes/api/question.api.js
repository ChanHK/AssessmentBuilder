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
          return res
            .status(200)
            .json({ message: "Question updated successfully" });
        })
        .catch((err) => {
          return res.status(400).json({
            message: "Error, failed to update question, please retry agian",
          });
        });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
