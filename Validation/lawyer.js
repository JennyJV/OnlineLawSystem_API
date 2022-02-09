const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLawyerInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions

  data.name = !isEmpty(data.name.trim()) ? data.name.trim() : "";
  data.email = !isEmpty(data.email.trim()) ? data.email.trim() : "";
  data.regno = !isEmpty(data.regno.trim()) ? data.regno.trim() : "";
  data.expertise = !isEmpty(data.expertise.trim()) ? data.expertise.trim() : "";
  
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