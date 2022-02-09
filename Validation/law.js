const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLawInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
console.log("inside validatelaw");
  data.chapter = !isEmpty(data.chapter.trim()) ? data.chapter.trim() : "";
  data.ipc = !isEmpty(data.ipc.trim()) ? data.ipc.trim() : "";
  
  if (Validator.isEmpty(data.chapter)) {
    errors.chapter = "Chapter field is required";
  }
  if (Validator.isEmpty(data.ipc)) {
    errors.ipc = "IPC field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};