const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// const bcrypt = require("bcryptjs");
const multer = require("multer");
var cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile",
    format: async (req, file) => {
      "png", "jpg", "jpeg";
    },
    public_id: (req, file) => {
      return Date.now() + file.fieldname;
    },
  },
});

let parser = multer({ storage: storage });

// @route     POST api/user/profile
// @desc      Post user profile data (updated data)
// @access    Private
router.post("/profile", auth, parser.single("picture"), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findById(req.user.id).then((user) => {
    user.username = req.body.username;
    user.gender = req.body.gender;
    user.yearOfBirth = req.body.yearOfBirth;
    user.occupation = req.body.occupation;
    if (req.file === undefined) user.picture = req.body.picture;
    else user.picture = req.file.path;
    user.imagePosX = req.body.imagePosX;
    user.imagePosY = req.body.imagePosY;
    user.imageScale = req.body.imageScale;

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