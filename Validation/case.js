const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCaseInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
 
  data.petitionerName = !isEmpty(data.petitionerName) ? data.petitionerName : "";
  data.petitionerEmail = !isEmpty(data.petitionerEmail) ? data.petitionerEmail : "";
  data.accusedName = !isEmpty(data.accusedName) ? data.accusedName : "";
  data.accusedAddress = !isEmpty(data.accusedAddress) ? data.accusedAddress : "";
  data.court = !isEmpty(data.court) ? data.court : "";
  data.lawyer = !isEmpty(data.lawyer) ? data.lawyer : "";
  data.ipc = !isEmpty(data.ipc) ? data.ipc : "";
  data.casestatus = !isEmpty(data.casestatus) ? data.casestatus : "";
  data.caseType = !isEmpty(data.caseType) ? data.caseType : "";

  if (Validator.isEmpty(data.petitionerName)) {
    errors.petitionerName = "Petitioner Name field is required";
  }
  if (Validator.isEmpty(data.petitionerEmail)) {
    errors.petitionerEmail = "Email field is required";
  } else if (!Validator.isEmail(data.petitionerEmail)) {
    errors.petitionerEmail = "Email is invalid";
  }
  if (Validator.isEmpty(data.accusedName)) {
    errors.accusedName = "Accused Name field is required";
  }
  if (Validator.isEmpty(data.accusedAddress)) {
    errors.accusedAddress = "Accused Address field is required";
  }
  if (Validator.isEmpty(data.court)) {
    errors.court = "Court field is required";
  }
  if (Validator.isEmpty(data.lawyer)) {
    errors.lawyer = "Lawyer field is required";
  } else if (!Validator.isEmail(data.lawyer)) {
    errors.lawyer = "Lawyer Email is invalid";
  }
  if (Validator.isEmpty(data.ipc)) {
    errors.ipc = "IPC field is required";
  }
  if (Validator.isEmpty(data.casestatus)) {
    errors.casestatus = "Status field is required";
  }
  if (Validator.isEmpty(data.caseType)) {
    errors.caseType = "Case Type field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};