const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/cand.auth");

const db = require("../../models");
const validateCandidate = require("../../validation/candidate");

// @route     GET api/candidate/start/assessment/fetch/:assessmentID
// @desc      GET assessment settings, set, timer, access
// @access    Public
router.get("/start/assessment/fetch/:assessmentID", (req, res) => {
  db.Assessment.findOne({
    assessments: { $elemMatch: { _id: req.params.assessmentID } },
  })
    .select("-assessments.settings.gradeRange")
    .select("-assessments.settings.gradeValue")
    .select("-assessments.settings.gradeUnit")
    .select("-assessments.settings.addGradingSelected")
    .select("-assessments.settings.unit")
    .select("-assessments.settings.score")
    .select("-assessments.settings.passOrFailSelected")
    .select("-assessments.settings.testDescription")

    .select("-assessments.access.accessCode")
    .select("-assessments.access.accessEmail")
    .select("-assessments.access.link")
    .select("-assessments.access.noAuthenticationSelected")
    .then((array) => {
      let i = 0;
      array.assessments.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.assessmentID + `"`) {
          i = index;
        }
      });
      return res.json(array.assessments[i]);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/candidate/start/assessment/register/with_auth/:assessmentID
// @desc      register user and return JWT token (with code)
// @access    Public
router.post(
  "/start/assessment/register/with_auth/:assessmentID",
  (req, res) => {
    const { errors, isValid } = validateCandidate(req.body);

    if (!isValid) return res.status(400).json(errors);

    db.Assessment.findOne({
      assessments: { $elemMatch: { _id: req.params.assessmentID } },
    })
      .then((array) => {
        db.Candidate.find({ email: req.body.email }).then((result) => {
          if (result.length >= req.body.attemptNum) {
            return res.status(400).json({
              message: "You have reach the maximum number of attempts",
            });
          } else {
            let i = 0;
            array.assessments.forEach((item, index) => {
              if (
                JSON.stringify(item._id) ===
                `"` + req.params.assessmentID + `"`
              ) {
                i = index;
              }
            });

            if (
              array.assessments[i].access.accessEmail.includes(req.body.email)
            ) {
              const newCand = {
                assessments_id: req.params.assessmentID,
                name: req.body.name,
                email: req.body.email,
                response: req.body.response,
              };
              db.Candidate.create(newCand)
                .then((Cand) => {
                  jwt.sign(
                    { id: Cand.id },
                    process.env.JWT_TOKEN_KEY_CAND,
                    {
                      expiresIn: 86400, //1 day
                    },
                    (err, token) => {
                      if (err) throw err;
                      res.json({
                        role: "Candidate",
                        token: token,
                      });
                    }
                  );
                })
                .catch((err) => console.log(err));
            } else {
              return res.status(400).json({
                message:
                  "Invalid credentials! Please check your input and enter authorised email",
              });
            }
          }
        });
      })
      .catch((err) => console.log(err));
  }
);

// @route     POST api/candidate/start/assessment/register/without_auth/:assessmentID
// @desc      register user and return JWT token (without code)
// @access    Public
router.post(
  "/start/assessment/register/without_auth/:assessmentID",
  (req, res) => {
    const { errors, isValid } = validateCandidate(req.body);

    if (!isValid) return res.status(400).json(errors);

    db.Assessment.findOne({
      assessments: { $elemMatch: { _id: req.params.assessmentID } },
    })
      .then(() => {
        db.Candidate.find({ email: req.body.email }).then((result) => {
          if (result.length >= req.body.attemptNum) {
            return res.status(400).json({
              message: "You have reach the maximum number of attempts",
            });
          } else {
            const newCand = {
              assessments_id: req.params.assessmentID,
              name: req.body.name,
              email: req.body.email,
              response: req.body.response,
            };

            db.Candidate.create(newCand)
              .then((Cand) => {
                jwt.sign(
                  { id: Cand.id },
                  process.env.JWT_TOKEN_KEY_CAND,
                  {
                    expiresIn: 86400, //1 day
                  },
                  (err, token) => {
                    if (err) throw err;
                    res.json({
                      role: "Candidate",
                      token: token,
                    });
                  }
                );
              })
              .catch(() => {
                return res.status(400).json({ message: "Invalid credentials" });
              });
          }
        });
      })
      .catch((err) => console.log(err));
  }
);

// @route     GET api/candidate/attempt/assessment/fetch/all_questions/:assessmentID
// @desc      GET all questions for candidate
// @access    Private (candidate)
router.get(
  "/attempt/assessment/fetch/all_questions/:assessmentID",
  (req, res) => {
    db.AssessmentQuestion.findOne({
      assessments_id: req.params.assessmentID,
    })
      .then((array) => {
        return res.json(array.questions);
      })
      .catch((err) => console.log(err));
  }
);

// @route     POST api/candidate/attempt/assessment/submit/:assessmentID
// @desc      POST candidate response
// @access    Private (candidate)
router.post("/attempt/assessment/submit/:assessmentID", auth, (req, res) => {
  db.Candidate.updateOne(
    { _id: req.cand.id, assessments_id: req.params.assessmentID },
    {
      $push: {
        response: req.body.response,
      },
    },
    { new: true }
  )
    .then(() => {
      db.Candidate.updateOne(
        { _id: req.cand.id, assessments_id: req.params.assessmentID },
        {
          $set: {
            submissionDate: req.body.submissionDate,
            totalScore: req.body.totalScore,
            grade: req.body.grade,
            maxScore: req.body.maxScore,
          },
        },
        { new: true }
      )
        .then(() => {
          return res.status(200).json("Update success");
        })
        .catch(() => {
          return res.status(200).json({ message: "failed in updating" });
        });
    })
    .catch((err) => console.log(err));
});

// @route     GET api/candidate/assessment/fetch/grades/:assessmentID
// @desc      GETfetch passing score and grades
// @access    Private
router.get("/assessment/fetch/grades/:assessmentID", auth, (req, res) => {
  db.Assessment.find({ "assessments._id": req.params.assessmentID })
    .select("-user_id")
    .select("-_id")
    .select("-assessments.access")
    .select("-assessments.sets")
    .select("-assessments.timer")
    .select("-assessments.status")
    .select("-assessments.settings.testName")
    .select("-assessments.settings.testDescription")
    .select("-assessments.settings.testInstruction")
    .select("-__v")
    .select("-_id")

    .then((result) => {
      let temp = [];
      result[0].assessments.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.assessmentID + `"`) {
          temp.push(item.settings);
        }
      });
      return res.json(temp);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
