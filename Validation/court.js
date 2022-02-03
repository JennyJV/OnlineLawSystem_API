const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCourtInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.state = !isEmpty(data.state) ? data.state : "";
  data.district = !isEmpty(data.district) ? data.district : "";
  data.court = !isEmpty(data.court) ? data.court : "";

  if (Validator.isEmpty(data.state)) {
    errors.state = "State is required";
  }
  if (Validator.isEmpty(data.district)) {
    errors.district = "District is required";
  }
  if (Validator.isEmpty(data.court)) {
    errors.court = "Court is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};