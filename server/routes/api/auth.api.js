const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const db = require("../../models");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateForgotPasswordInput = require("../../validation/forgotPassword");
const validateResetPasswordInput = require("../../validation/resetPassword");

// @route     POST api/auth/register
// @desc      Register user and return JWT token
// @access    Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  db.User.findOne({ email: req.body.email })
    .then((user) => {
      if (user)
        return res.status(400).json({ message: "Email already exists" });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hash,
          };

          db.User.create(newUser)
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

              const newQuestionBank = {
                user_id: user.id,
              };

              db.QuestionBank.create(newQuestionBank);
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
});

// @route     POST api/auth/login
// @desc      Login user and return JWT token
// @access    Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  db.User.findOne({ email }).then((user) => {
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

// @route     PUT api/auth/forgotPassword
// @desc      validate email and sent user an email containing a link to reset password
// @access    Public
router.put("/forgotPassword", (req, res) => {
  const { errors, isValid } = validateForgotPasswordInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;

  db.User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({
        message: "This email does not exist, please enter a valid email",
      });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: 7200,
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

// @route     PUT api/auth/resetPassword
// @desc      validate password and token, reset password
// @access    Private
router.put("/resetPassword", (req, res) => {
  const { errors, isValid } = validateResetPasswordInput(req.body);

  if (!isValid) return res.status(400).json(errors);
  const { resetPasswordLink, password } = req.body;

  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      (err, decoded) => {
        if (err) {
          return res.status(400).json({
            message:
              "The link is expired, please regenerate an email from the forgot password section",
          });
        }

        db.User.findOne({ resetPasswordLink }).then((user) => {
          if (!user) {
            return res.status(400).json({
              message:
                "This url does not exist, please regenerate an email from the forgot password section",
            });
          }

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              user.resetPasswordLink = "";
              user.password = hash;
              user
                .save()
                .then(() => {
                  return res
                    .status(200)
                    .json({ message: "Password reset successful" });
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(400).json({
                    message:
                      "Error, failed to reset password, please retry agian",
                  });
                });
            });
          });
        });
      }
    );
  }
});

module.exports = router;
