const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route     POST api/user/register
// @desc      Register user and return JWT token
// @access    Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              jwt.sign(
                { id: user.id },
                keys.secretOrKey,
                {
                  expiresIn: 7200, //2 hours in second
                },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token: token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
});

// @route     Get api/user/register
// @desc      Get user data
// @access    Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

// @route     POST api/user/login
// @desc      Login user and return JWT token
// @access    Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 7200, //2 hours in second
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
              });
            }
          );
        } else {
          return res.status(400).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
