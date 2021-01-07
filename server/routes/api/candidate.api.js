const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../../models");

// @route     GET api/candidate/start/assessment/fetch/:assessmentID
// @desc      GET assessment name and instructions
// @access    Private
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
    .select("-assessments.access.attemptNum")
    .select("-assessments.access.link")

    .select("-assessments.timer.startDate")
    .select("-assessments.timer.endDate")

    .select("-assessments._id")

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
// @desc      register user and return JWT token
// @access    Public
router.post(
  "/start/assessment/register/with_auth/:assessmentID",
  (req, res) => {
    db.Assessment.findOne({
      assessments: { $elemMatch: { _id: req.params.assessmentID } },
    })
      .then((array) => {
        let i = 0;
        array.assessments.forEach((item, index) => {
          if (
            JSON.stringify(item._id) ===
            `"` + req.params.assessmentID + `"`
          ) {
            i = index;
          }
        });
        let temp = false;
        array.assessments[i].access.accessEmail.forEach((item, index) => {
          if (
            item === req.body.email &&
            array.assessments[i].access.accessCode[index] ===
              req.body.accessCode
          ) {
            temp = true;
            const newCand = {
              assessments_id: req.params.assessmentID,
              name: req.body.name,
              email: req.body.email,
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
          }
        });
        if (!temp)
          return res.status(400).json({ message: "Invalid credentials" });
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
