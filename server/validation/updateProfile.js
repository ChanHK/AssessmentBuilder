const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, 3, 10)) {
    errors.username = "Username field minimum 3 and maximum 10 characters";
  } else if (!Validator.isAlpha(data.username)) {
    errors.username = "Please enter alphabets only";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
