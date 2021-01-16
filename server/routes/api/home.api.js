const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     GET api/user/home/assessment/fetch
// @desc      GET all assessments
// @access    Private
router.get("/assessment/fetch", auth, (req, res) => {
  db.Assessment.findOne({ user_id: req.user.id })
    .select("-assessments.access")
    .select("-assessments.sets")
    .select("-assessments.timer")

    .select("-assessments.settings.testDescription")
    .select("-assessments.settings.testInstruction")
    .select("-assessments.settings.passOrFailSelected")
    .select("-assessments.settings.score")
    .select("-assessments.settings.unit")
    .select("-assessments.settings.addGradingSelected")
    .select("-assessments.settings.gradeUnit")
    .select("-assessments.settings.gradeRange")
    .select("-assessments.settings.gradeValue")

    .then((result) => {
      return res.json(result.assessments);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/home/assessment/create
// @desc      POST create new assessment obj
// @access    Private
router.post("/assessment/create", auth, (req, res) => {
  db.Assessment.findOne({ user_id: req.user.id })
    .then((assessment) => {
      db.Assessment.findByIdAndUpdate(
        assessment._id,
        {
          $push: {
            assessments: {
              settings: {
                testName: "New assessment",
              },
            },
          },
        },
        { new: true }
      )
        .then((assessment) => {
          const data = {
            assessments_id:
              assessment.assessments[assessment.assessments.length - 1]._id,
          };

          db.AssessmentQuestion.create(data);
          db.AssessmentSet.create(data);
          db.User.updateOne(
            { _id: req.user.id },
            {
              $inc: { totalAssessmentsCreated: 1 },
            }
          ).then(() => {
            return res.json({
              assessmentID:
                assessment.assessments[assessment.assessments.length - 1]._id,
            });
          });
        })
        .catch((err) => {
          return res.status(400).json({
            message: "Error, failed to create assessment, please retry agian",
          });
        });
    })
    .catch((err) => console.log(err));
});

// @route     GET api/user/home/profile/fetch/image
// @desc      GET user profile pic
// @access    Private
router.get("/profile/fetch/image", auth, (req, res) => {
  db.User.findOne({ _id: req.user.id })
    .then((result) => {
      return res.json(result.image);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/home/assessment/delete/:assessmentID
// @desc      POST delete assessment
// @access    Private
router.post("/assessment/delete/:assessmentID", auth, (req, res) => {
  db.Assessment.findOne({ user_id: req.user.id }).then((result) => {
    db.User.updateOne(
      { _id: req.user.id },
      {
        $inc: { totalAssessmentsCreated: -1 },
      }
    ).then(() => {
      db.Assessment.findByIdAndUpdate(
        result._id,
        {
          $pull: { assessments: { _id: req.params.assessmentID } },
        },
        { safe: true, new: true }
      )
        .then((response) => {
          db.AssessmentQuestion.deleteOne({
            assessments_id: req.params.assessmentID,
          })
            .then(() => {
              db.AssessmentSet.deleteOne({
                assessments_id: req.params.assessmentID,
              })
                .then(() => {
                  db.Candidate.deleteMany({
                    assessments_id: req.params.assessmentID,
                  })
                    .then(() => {
                      return res.status(200).json(response.assessments);
                    })
                    .catch(() => {
                      return res.status(400).json({
                        message: "Delete failed",
                      });
                    });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  });
});

// @route     GET api/user/home/assessment/fetch/descriptive_questions/:assessmentID
// @desc      GET all descriptive question in an assessment
// @access    Private
router.get(
  "/assessment/fetch/descriptive_questions/:assessmentID",
  auth,
  (req, res) => {
    db.AssessmentQuestion.findOne({ assessments_id: req.params.assessmentID })
      .then((result) => {
        let temp = [];

        result.questions.forEach((item, index) => {
          if (item.questionType === "Descriptive") temp.push(item);
        });

        return res.json(temp);
      })
      .catch((err) => console.log(err));
  }
);

// @route     GET api/user/home/assessment/fetch/grade_questions/:questionID
// @desc      GET questions to mark
// @access    Private
router.get(
  "/assessment/fetch/grade_questions/:questionID",
  auth,
  (req, res) => {
    db.Candidate.find({ "response.question_id": req.params.questionID })
      .select("-__v")
      .select("-response.questionAnswers")
      .select("-response.questionChoices")
      .then((result) => {
        let temp = [];

        result.forEach((item, index) => {
          let data = new Object();
          item.response.forEach((item2, index2) => {
            if (item2.question_id === req.params.questionID && !item2.graded) {
              data.name = item.name;
              data.email = item.email;
              data._id = item._id;
              data.assessments_id = item.assessments_id;
              data.response = item2;
              temp.push(data);
            }
          });
        });

        return res.json(temp);
      })
      .catch((err) => console.log(err));
  }
);

// @route     POST api/user/home/assessment/create/feedback
// @desc      POST create new feedback
// @access    Private
router.post("/assessment/create/feedback", auth, (req, res) => {
  const data = {
    assessments_id: req.body.assessments_id,
    cand_id: req.body.cand_id,
    feedback: req.body.feedback,
    question_id: req.body.question_id,
  };
  db.Feedback.create(data)
    .then(() => {
      db.Candidate.updateOne(
        {
          _id: req.body.cand_id,
          assessments_id: req.body.assessments_id,
          "response.question_id": req.body.question_id,
        },
        {
          $set: { "response.$.graded": true },
          $inc: { totalScore: req.body.score },
        },
        { new: true }
      )
        .then(() => {
          db.Candidate.find({ "response.question_id": req.body.question_id })
            .select("-__v")
            .select("-response.questionAnswers")
            .select("-response.questionChoices")
            .then((result) => {
              let temp = [];

              result.forEach((item, index) => {
                let data = new Object();
                item.response.forEach((item2, index2) => {
                  if (
                    item2.question_id === req.body.question_id &&
                    !item2.graded
                  ) {
                    data.name = item.name;
                    data.email = item.email;
                    data._id = item._id;
                    data.assessments_id = item.assessments_id;
                    data.response = item2;
                    temp.push(data);
                  }
                });
              });

              return res.json(temp);
            })
            .catch(() => {
              return res.json({ message: "fail to update" });
            });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @route     GET api/user/home/assessment/fetch/results/:assessmentID
// @desc      GET all results
// @access    Private
router.get("/assessment/fetch/results/:assessmentID", auth, (req, res) => {
  db.Candidate.find({ assessments_id: req.params.assessmentID })
    .select("-__v")
    .select("-assessments_id")
    .select("-response._id")
    .select("-response.questionDescription")
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
});

// @route     GET api/user/home/assessment/fetch/single_result/:assessmentID/:candID
// @desc      GET a cand result
// @access    Private
router.get("/assessment/fetch/single_result/:candID", auth, (req, res) => {
  db.Candidate.findOne({
    _id: req.params.candID,
  })
    .select("-__v")
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
