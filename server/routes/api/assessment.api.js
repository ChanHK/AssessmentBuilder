const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

// @route     POST api/user/assessment/create
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
          );
          return res.json({
            assessmentID:
              assessment.assessments[assessment.assessments.length - 1]._id,
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

// @route     POST api/user/assessment/settings/update/:assessmentID
// @desc      POST settings to assessment collection
// @access    Private
router.post("/assessment/settings/update/:assessmentID", auth, (req, res) => {
  db.Assessment.findOneAndUpdate(
    { assessments: { $elemMatch: { _id: req.params.assessmentID } } },
    {
      $set: {
        "assessments.$.settings.testName": req.body.testName,
        "assessments.$.settings.testDescription": req.body.testDescription,
        "assessments.$.settings.testInstruction": req.body.testInstruction,
        "assessments.$.settings.passOrFailSelected":
          req.body.passOrFailSelected,
        "assessments.$.settings.score": req.body.score,
        "assessments.$.settings.unit": req.body.unit,
        "assessments.$.settings.addGradingSelected":
          req.body.addGradingSelected,
        "assessments.$.settings.gradeUnit": req.body.gradeUnit,
        "assessments.$.settings.gradeRange": req.body.gradeRange,
        "assessments.$.settings.gradeValue": req.body.gradeValue,
      },
    },
    {
      new: true,
    }
  )
    .select("-__v")
    .select("-_id")
    .select("-user_id")

    .then((response) => {
      let count = null;
      response.assessments.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.assessmentID + `"`) {
          count = index;
        }
      });

      return res.status(200).json(response.assessments[count].settings);
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Error, failed to update settings, please retry agian",
      });
    });
});

// @route     GET api/user/assessment/settings/fetch/:assessmentID
// @desc      GET settings from assessment collection
// @access    Private
router.get("/assessment/settings/fetch/:assessmentID", auth, (req, res) => {
  db.Assessment.findOne({
    assessments: { $elemMatch: { _id: req.params.assessmentID } },
  })
    .select("-_id")
    .select("-user_id")
    .select("-__v")
    .then((array) => {
      let i = 0;
      array.assessments.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.assessmentID + `"`) {
          i = index;
        }
      });
      return res.json(array.assessments[i].settings);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/assessment/access/update/:assessmentID
// @desc      POST access to assessment collection
// @access    Private
router.post("/assessment/access/update/:assessmentID", auth, (req, res) => {
  db.Assessment.findOneAndUpdate(
    { assessments: { $elemMatch: { _id: req.params.assessmentID } } },
    {
      $set: {
        "assessments.$.access.link": req.body.link,
        "assessments.$.access.noAuthenticationSelected":
          req.body.noAuthenticationSelected,
        "assessments.$.access.withAuthenticationSelected":
          req.body.withAuthenticationSelected,
        "assessments.$.access.attemptNum": req.body.attemptNum,
        "assessments.$.access.accessCode": req.body.accessCode,
        "assessments.$.access.accessEmail": req.body.accessEmail,
      },
    },
    {
      new: true,
    }
  )
    .select("-__v")
    .select("-_id")
    .select("-user_id")

    .then((response) => {
      let count = null;
      response.assessments.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.assessmentID + `"`) {
          count = index;
        }
      });

      return res.status(200).json(response.assessments[count].access);
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Error, failed to update access, please retry agian",
      });
    });
});

// @route     GET api/user/assessment/access/fetch/:assessmentID
// @desc      GET access from assessment collection
// @access    Private
router.get("/assessment/access/fetch/:assessmentID", auth, (req, res) => {
  db.Assessment.findOne({
    assessments: { $elemMatch: { _id: req.params.assessmentID } },
  })
    .select("-_id")
    .select("-user_id")
    .select("-__v")
    .then((array) => {
      let i = 0;
      array.assessments.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.assessmentID + `"`) {
          i = index;
        }
      });
      return res.json(array.assessments[i].access);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
