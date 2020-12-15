const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");

const User = require("../../models/user");

const validateProfileInput = require("../../validation/updateProfile");

// @route     GET api/user/profile
// @desc      Get user profile data
// @access    Private
router.get("/profile", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-resetPasswordLink")
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => console.log(err));
});

// @route     POST api/user/profile
// @desc      Post user profile data (updated data)
// @access    Private
router.post("/profile", auth, (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findById(req.user.id).then((user) => {
    user.username = req.body.username;
    user.gender = req.body.gender;
    user.yearOfBirth = req.body.yearOfBirth;
    user.occupation = req.body.occupation;
    user
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Profile updated successfully" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Error, failed to update profile, please retry agian",
        });
      });
  });
});

module.exports = router;
