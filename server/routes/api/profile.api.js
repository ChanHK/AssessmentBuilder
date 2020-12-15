const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/user");

// @route     Get api/user/profile
// @desc      Get user profile data
// @access    Private
router.get("/profile", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-resetPasswordLink")
    .then((user) => {
      return res.json(user);
    });
});

module.exports = router;
