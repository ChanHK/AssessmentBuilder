const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateQuestion(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.questionType = !isEmpty(data.questionType) ? data.questionType : "";
  data.questionDescription = !isEmpty(data.questionDescription)
    ? data.questionDescription
    : "";

  console.log(data);
  if (Validator.isEmpty(data.questionType)) {
    errors.questionType = "Question type field is required";
  }

  if (data.questionType === "Single Choice") {
    if (data.questionChoices.length < 2) {
      errors.questionChoices = "Please enter at least two choices";
    } else if (data.questionAnswers.length === 0) {
      errors.questionAnswers = "Please select one answer";
    }
  }

  if (data.questionType === "Multiple Choice") {
    if (data.questionChoices.length < 2) {
      errors.questionChoices = "Please enter at least two choices";
    } else if (data.questionAnswers.length === 0) {
      errors.questionAnswers = "Please select at least one answer";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
