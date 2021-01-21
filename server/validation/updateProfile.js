const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.yearOfBirth = !isEmpty(data.yearOfBirth) ? data.yearOfBirth : "";
  data.occupation = !isEmpty(data.occupation) ? data.occupation : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } else if (!Validator.isLength(data.username, 3, 10)) {
    errors.username = "Username field minimum 3 and maximum 10 characters";
  }

  if (
    !Validator.isEmpty(data.occupation) &&
    !Validator.isLength(data.occupation, 3, 25)
  ) {
    errors.occupation = "Occupation field minimum 3 and maximum 25 characters";
  } else if (!Validator.isAlpha(data.occupation)) {
    errors.occupation = "Please enter only letters a-zA-Z";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
