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

// @route     POST api/auth/candidate/join
// @desc      register user and return JWT token
// @access    Public
// router.post("/start/assessment/register/:assessmentID");

module.exports = router;
