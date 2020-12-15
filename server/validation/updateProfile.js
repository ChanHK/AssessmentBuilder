const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.yearOfBirth = !isEmpty(data.yearOfBirth) ? data.yearOfBirth : "";
  data.occupation = !isEmpty(data.occupation) ? data.occupation : "";

  if (Validator.isEmpty(data.username))
    errors.username = "Username field is required";

  //   if (Validator.isEmpty(data.gender))
  //     errors.gender = "Gender field is required";

  //   if (Validator.isEmpty(data.yearOfBirth))
  //     errors.yearOfBirth = "Year of birth field is required";

  //   if (Validator.isEmpty(data.occupation))
  //     errors.occupation = "Occupation field is required";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
