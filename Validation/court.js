const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCourtInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions

  data.court = !isEmpty(data.court) ? data.court : "";
  // Name checks
  if (Validator.isEmpty(data.court)) {
    errors.court = "Court field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};