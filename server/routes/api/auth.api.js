const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require("../../models/user");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateForgotPasswordInput = require("../../validation/forgotPassword");

// @route     POST api/auth/register
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
                process.env.JWT_TOKEN_KEY,
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

// @route     Get api/auth/register
// @desc      Get user data
// @access    Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

// @route     POST api/auth/login
// @desc      Login user and return JWT token
// @access    Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ message: "User does not exist" });

    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
          };

          jwt.sign(
            payload,
            process.env.JWT_TOKEN_KEY,
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
        } else return res.status(400).json({ message: "Invalid credentials" });
      })
      .catch((err) => console.log(err));
  });
});

router.put("/forgotPassword", (req, res) => {
  const { errors, isValid } = validateForgotPasswordInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;

  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({
        message: "This email does not exist, please enter a valid email",
      });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: "10m",
      }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset link`,
      html: `
                    <h3>Please use the following link to reset your password</h3>
                    <p>${process.env.CLIENT_URL}/resetPassword/${token}</p>
                `,
    };

    return user.updateOne(
      {
        resetPasswordLink: token,
      },
      (err, success) => {
        if (err) {
          console.log("RESET PASSWORD LINK ERROR", err);
          return res.status(400).json({
            message:
              "There is a database connection error, please try again later",
          });
        } else {
          sgMail
            .send(emailData)
            .then((sent) => {
              return res.json({
                message: `A link has been sent to to your email, ${email}. Please check your email to reset your password`,
              });
            })
            .catch((err) => console.log(err));
        }
      }
    );
  });
});

module.exports = router;
