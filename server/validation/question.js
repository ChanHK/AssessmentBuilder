const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateQuestion(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.questionType = !isEmpty(data.questionType) ? data.questionType : "";
  data.questionDescription = !isEmpty(data.questionDescription)
    ? data.questionDescription
    : "";

  if (Validator.isEmpty(data.questionType)) {
    errors.questionType = "Question type field is required";
  }

  if (Validator.isEmpty(data.questionDescription)) {
    errors.questionDescription = "Question description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
