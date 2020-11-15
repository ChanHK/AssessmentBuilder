const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/user", (req, res, next) => {
  //this will return all the data
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
});


//work
router.delete("/user/:id", function (req, res, next) {
  User.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => res.json(data))
    .catch(next);
});

router.route("/update/:id").post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user) res.status(404).send("data is not found");
    else user.picture = req.body.picture;
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      user.gender = req.body.gender;
      user.yearOfBirth = req.body.yearOfBirth;
      user.occupation = req.body.occupation;
    user
      .save()
      .then((user) => {
        res.json("Profile updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

// //work
router.route("/add").post(function (req, res) {
  let user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.status(200).json({ user: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});

// router.route("/:id").get(function (req, res) {
//   let id = req.params.id;
//   User.findById(id, function (err, user) {
//     res.json(user);
//   });
// });

module.exports = router;
