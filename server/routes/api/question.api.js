const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     POST api/user/question
// @desc      POST question to questionBank
// @access    Private
router.post("/question", auth, (req, res) => {
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
              subject: req.body.subject,
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
        .catch((err) => console.log(err));
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
    .select("-__v")
    .then((allQuestions) => {
      return res.json(allQuestions.questions);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/question
// @desc      POST ($pull) delete question from question bank based on id
// @access    Private
router.post("/question/delete", auth, (req, res) => {
  db.QuestionBank.findOne({ user_id: req.user.id }).then((questionBank) => {
    db.User.updateOne(
      { _id: req.user.id },
      {
        $inc: { totalQuestionsCreated: -1 },
      }
    ).then(() => {
      db.QuestionBank.findByIdAndUpdate(
        questionBank._id,
        {
          $pull: { questions: { _id: req.body.questionID } },
        },
        { safe: true, new: true }
      )
        .then((response) => {
          return res.status(200).json(response.questions);
        })
        .catch(() => {
          return res.status(400).json({
            message: "Error, failed to delete question, please retry agian",
          });
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

// @route     GET api/user/question/subject
// @desc      GET all question from question bank
// @access    Private
router.get("/question/subject", auth, (req, res) => {
  db.QuestionBank.findOne({ user_id: req.user.id })
    .select("-_id")
    .select("-user_id")
    .select("-__v")
    .select("-questions")
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/question/update/subjects
// @desc      POST create new question bank
// @access    Private
router.post("/question/update/subjects", auth, (req, res) => {
  db.QuestionBank.findOneAndUpdate(
    {
      user_id: req.user.id,
    },
    {
      totalSubjects: req.body.totalSubjects,
    },
    { new: true }
  )
    .select("-_id")
    .select("-user_id")
    .select("-__v")
    .select("-questions")
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/question/delete/subjects
// @desc      POST (delete) remove a question bank
// @access    Private
router.post("/question/delete/subjects", auth, (req, res) => {
  db.QuestionBank.findOneAndUpdate(
    {
      user_id: req.user.id,
    },
    {
      $pullAll: { totalSubjects: [req.body.subject] },
      $pull: { questions: { subject: req.body.subject } },
    },
    { new: true }
  )
    .select("-_id")
    .select("-user_id")
    .select("-__v")
    .select("-questions")
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => console.log(err));
});

// @route     GET api/user/question/subject/fetch
// @desc      GET question from question bank based on subjects
// @access    Private
router.get("/question/subject/fetch/:subject", auth, (req, res) => {
  db.QuestionBank.findOne({ user_id: req.user.id })
    .select("-_id")
    .select("-user_id")
    .select("-__v")
    .select("-totalSubjects")
    .then((results) => {
      let temp = [];
      results.questions.forEach((item, index) => {
        if (item.subject === req.params.subject) {
          temp.push(item);
        }
      });

      return res.json(temp);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/question/change/subjects
// @desc      POST change question subject
// @access    Private
router.post("/question/change/subjects", auth, (req, res) => {
  db.QuestionBank.findOneAndUpdate(
    {
      "questions._id": req.body.questionID,
    },
    {
      $set: {
        "questions.$.subject": req.body.subject,
      },
    },
    { new: true }
  )
    .select("-_id")
    .select("-user_id")
    .select("-__v")
    .select("-totalSubjects")
    .then((results) => {
      let temp = [];
      results.questions.forEach((item, index) => {
        if (item.subject === req.body.main_sub) {
          temp.push(item);
        }
      });
      return res.json(temp);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
