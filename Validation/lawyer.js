const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLawyerInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.regno = !isEmpty(data.regno) ? data.regno : "";
  data.expertise = !isEmpty(data.expertise) ? data.expertise : "";
  
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.regno)) {
    errors.regno = "Registration number field is required";
  }
  if (Validator.isEmpty(data.expertise)) {
    errors.expertise = "Expertise field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};