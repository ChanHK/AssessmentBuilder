const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     POST api/user/assessment/question/update/:assessmentID
// @desc      POST question from newly created question
// @access    Private
router.post("/assessment/question/update/:assessmentID", auth, (req, res) => {
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
      db.Assessment.findOneAndUpdate(
        {
          "assessments._id": req.params.assessmentID,
        },
        {
          $inc: {
            "assessments.$.totalQuestionNum": 1,
          },
        }
      )
        .then(() => {
          return res
            .status(200)
            .json(response.questions[response.questions.length - 1]);
        })
        .catch((err) => {
          return res.status(400).json({
            message: "Error, failed to add question, please retry agian",
          });
        });
    })
    .catch((err) => console.log(err));
});

// @route     GET api/user/assessment/question/:assessmentID
// @desc      GET all a question to edit in assessment
// @access    Private
router.get(
  "/assessment/question/:assessmentID/:questionID",
  auth,
  (req, res) => {
    db.AssessmentQuestion.findOne({ assessments_id: req.params.assessmentID })
      .then((x) => {
        x.questions.forEach((item, index) => {
          if (JSON.stringify(item._id) === '"' + req.params.questionID + '"') {
            return res.json(x.questions[index]);
          }
        });
      })
      .catch((err) => console.log(err));
  }
);

// @route     GET api/user/assessment/questions/fetch/:assessmentID
// @desc      GET all questions from assessment
// @access    Private
router.get("/assessment/questions/fetch/:assessmentID", auth, (req, res) => {
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
      db.AssessmentQuestion.findOneAndUpdate(
        { assessments_id: req.params.assessmentID },
        {
          $push: {
            questions: req.body.questions,
          },
        },
        { upsert: true, new: true }
      )
        .then((response) => {
          db.Assessment.findOneAndUpdate(
            {
              "assessments._id": req.params.assessmentID,
            },
            {
              $set: {
                "assessments.$.totalQuestionNum": req.body.totalQuestionNum,
              },
            }
          )
            .then(() => {
              db.AssessmentSet.findOne({
                assessments_id: req.params.assessmentID,
              })
                .then((sets) => {
                  if (sets.generatedSets.length !== 0) {
                    db.AssessmentQuestion.findOne({
                      assessments_id: req.params.assessmentID,
                    })
                      .then((AQ) => {
                        let questionIDArray = [];

                        AQ.questions.forEach((item, index) => {
                          questionIDArray.push(JSON.stringify(item._id));
                        });

                        let need_to_throw_index = [];
                        sets.generatedSets.forEach((item, index) => {
                          item.forEach((item2, index2) => {
                            if (!questionIDArray.includes(`"` + item2 + `"`)) {
                              need_to_throw_index.push(index);
                            }
                          });
                        });

                        let new_set = [];
                        sets.generatedSets.forEach((item, index) => {
                          if (!need_to_throw_index.includes(index)) {
                            new_set.push(item);
                          }
                        });

                        db.AssessmentSet.updateOne(
                          { _id: sets._id },
                          { generatedSets: new_set },
                          { new: true }
                        )
                          .then(() => {
                            return res.status(200).json(response.questions);
                          })
                          .catch(() => {
                            return res
                              .status(200)
                              .json({ message: "failed in updating" });
                          });
                      })
                      .catch((err) => console.log(err));
                  } else return res.status(200).json(response.questions);
                })
                .catch(() => {
                  return res
                    .status(200)
                    .json({ message: "failed in updating" });
                });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/assessment/questions/edit/:questionID
// @desc      POST question to questionBank
// @access    Private
router.post("/assessment/questions/edit/:questionID", auth, (req, res) => {
  db.AssessmentQuestion.updateOne(
    {
      questions: { $elemMatch: { _id: req.params.questionID } },
    },
    {
      $set: {
        "questions.$.questionDescription": req.body.questionDescription,
        "questions.$.score": req.body.score,
        "questions.$.questionChoices": req.body.questionChoices,
        "questions.$.questionAnswers": req.body.questionAnswers,
      },
    }
  )
    .then(() => {
      return res.status(200).json({ message: "Question updated successfully" });
    })
    .catch(() => {
      return res.status(400).json({
        message: "Question update fail",
      });
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
            .then(() => {
              db.User.updateOne(
                { _id: req.user.id },
                {
                  $inc: { totalQuestionsCreated: 1 },
                }
              ).then(() => {
                return res
                  .status(200)
                  .json({ message: "Add question to question bank success" });
              });
            })
            .catch((err) => {
              return res
                .status(400)
                .json({ message: "Add question to question bank fail" });
            });
        }
      });
    });
  }
);

// @route     POST api/user/assessment/questions/delete/:assessmentID/:questionID
// @desc      POST ($pull) delete question in assessment
// @access    Private
router.post(
  "/assessment/questions/delete/:assessmentID/:questionID",
  auth,
  (req, res) => {
    db.AssessmentQuestion.findOne({
      assessments_id: req.params.assessmentID,
    })
      .then((assessment) => {
        db.AssessmentQuestion.findByIdAndUpdate(
          assessment._id,
          {
            $pull: { questions: { _id: req.params.questionID } },
          },
          {
            safe: true,
            new: true,
          }
        )
          .then((response) => {
            db.Assessment.findOneAndUpdate(
              {
                "assessments._id": req.params.assessmentID,
              },
              {
                $inc: {
                  "assessments.$.totalQuestionNum": -1,
                },
              }
            )
              .then(() => {
                db.AssessmentSet.findOne({
                  assessments_id: req.params.assessmentID,
                })
                  .select("-__v")
                  .select("-assessments_id")
                  .then((sets) => {
                    let temp = [];
                    sets.generatedSets.forEach((item, index) => {
                      let count = 0;
                      item.forEach((item2, index2) => {
                        if (item2 !== req.params.questionID) {
                          count++;
                        }
                      });
                      if (count === item.length) {
                        temp.push(item);
                      }
                    });

                    db.AssessmentSet.updateOne(
                      { _id: sets._id },
                      { generatedSets: temp },
                      { new: true }
                    )
                      .then(() => {
                        return res.status(200).json(response.questions);
                      })
                      .catch((err) => {
                        return res
                          .status(400)
                          .json({ message: "Question fail to delete" });
                      });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

// @route     POST api/user/assessment/questions/add_many/:assessmentID
// @desc      POST from QB to assessment question
// @access    Private
router.post(
  "/assessment/questions/add_many/:assessmentID",
  auth,
  (req, res) => {
    db.AssessmentQuestion.updateOne(
      {
        assessments_id: req.params.assessmentID,
      },
      {
        $push: {
          questions: {
            $each: req.body.array,
          },
        },
      }
    )
      .then(() => {
        return res
          .status(200)
          .json({ message: "Question updated successfully" });
      })
      .catch(() => {
        console.log(req.body.array);
        return res.status(400).json({
          message: "Question update fail",
        });
      });
  }
);

module.exports = router;
