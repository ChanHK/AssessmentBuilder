const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const db = require("../../models");

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

// @route     POST api/user/assessment/sets/update/:assessmentID
// @desc      POST sets to assessment collection
// @access    Private
router.post("/assessment/sets/update/:assessmentID", auth, (req, res) => {
  db.Assessment.findOneAndUpdate(
    { assessments: { $elemMatch: { _id: req.params.assessmentID } } },
    {
      $set: {
        "assessments.$.sets.fixedSelected": req.body.fixedSelected,
        "assessments.$.sets.randomSelected": req.body.randomSelected,
        "assessments.$.sets.manualSelected": req.body.manualSelected,
        "assessments.$.sets.manualRandomSelected":
          req.body.manualRandomSelected,
        "assessments.$.sets.randomTakeFromTotalSelected":
          req.body.randomTakeFromTotalSelected,
        "assessments.$.sets.definedTakeFromSectionSelected":
          req.body.definedTakeFromSectionSelected,
        "assessments.$.sets.randomQuestionNum": req.body.randomQuestionNum,
        "assessments.$.sets.sectionFilterNum": req.body.sectionFilterNum,
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
      let count = 0;
      response.assessments.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.assessmentID + `"`) {
          count = index;
        }
      });

      return res.status(200).json(response.assessments[count].sets);
    })
    .catch(() => {
      return res.status(400).json({
        message: "Error, failed to update sets, please retry agian",
      });
    });
});

// @route     GET api/user/assessment/sets/fetch/:assessmentID
// @desc      GET set from assessment collection
// @access    Private
router.get("/assessment/sets/fetch/:assessmentID", auth, (req, res) => {
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
      return res.json(array.assessments[i].sets);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/assessment/timer/update/:assessmentID
// @desc      POST timer to assessment collection
// @access    Private
router.post("/assessment/timer/update/:assessmentID", auth, (req, res) => {
  db.Assessment.findOneAndUpdate(
    { assessments: { $elemMatch: { _id: req.params.assessmentID } } },
    {
      $set: {
        "assessments.$.timer.assessmentTimeSelected":
          req.body.assessmentTimeSelected,
        "assessments.$.timer.questionTimeSelected":
          req.body.questionTimeSelected,
        "assessments.$.timer.noLimitSelected": req.body.noLimitSelected,
        "assessments.$.timer.time": req.body.time,
        "assessments.$.timer.startDate": req.body.startDate,
        "assessments.$.timer.endDate": req.body.endDate,
      },
    },
    {
      new: true,
    }
  )
    .then((response) => {
      let count = null;
      response.assessments.forEach((item, index) => {
        if (JSON.stringify(item._id) === `"` + req.params.assessmentID + `"`) {
          count = index;
        }
      });

      return res.status(200).json(response.assessments[count].timer);
    })
    .catch(() => {
      return res.status(400).json({
        message: "Error, failed to update timer, please retry agian",
      });
    });
});

// @route     GET api/user/assessment/timer/fetch/:assessmentID
// @desc      GET timer from assessment collection
// @access    Private
router.get("/assessment/timer/fetch/:assessmentID", auth, (req, res) => {
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
      return res.json(array.assessments[i].timer);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
