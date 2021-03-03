const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCandidateSignUp(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (!Validator.isLength(data.name, 3, 30)) {
    errors.name = "Please enter within 3 and 30 characters";
  } else if (!/^[a-z ,.'-]+$/i.test(data.name)) {
    errors.name = "Please enter valid name";
  }

  if (Validator.isEmpty(data.email)) errors.email = "Email field is required";
  else if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter valid email";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
