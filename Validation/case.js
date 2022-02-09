const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCaseInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
 
  data.petitionerName = !isEmpty(data.petitionerName.trim()) ? data.petitionerName.trim() : "";
  data.petitionerEmail = !isEmpty(data.petitionerEmail.trim()) ? data.petitionerEmail.trim() : "";
  data.accusedName = !isEmpty(data.accusedName.trim()) ? data.accusedName.trim() : "";
  data.accusedAddress = !isEmpty(data.accusedAddress.trim()) ? data.accusedAddress.trim() : "";
  data.court = !isEmpty(data.court.trim()) ? data.court.trim() : "";
  data.lawyer = !isEmpty(data.lawyer.trim()) ? data.lawyer.trim() : "";
  data.ipc = !isEmpty(data.ipc.trim()) ? data.ipc.trim() : "";
  data.caseType = !isEmpty(data.caseType.trim()) ? data.caseType.trim() : "";

  if (Validator.isEmpty(data.petitionerName)) {
    errors.petitionerName = "Petitioner Name is required";
  }
  if (Validator.isEmpty(data.petitionerEmail)) {
    errors.petitionerEmail = "Email is required";
  } else if (!Validator.isEmail(data.petitionerEmail)) {
    errors.petitionerEmail = "Email is invalid";
  }
  if (Validator.isEmpty(data.accusedName)) {
    errors.accusedName = "Accused Name is required";
  }
  if (Validator.isEmpty(data.accusedAddress)) {
    errors.accusedAddress = "Accused Address is required";
  }
  if (Validator.isEmpty(data.court)) {
    errors.court = "Court is required";
  }
  if (Validator.isEmpty(data.lawyer)) {
    errors.lawyer = "Lawyer is required";
  } else if (!Validator.isEmail(data.lawyer)) {
    errors.lawyer = "Lawyer Email is invalid";
  }
  if (Validator.isEmpty(data.ipc)) {
    errors.ipc = "IPC is required";
  }
  if (Validator.isEmpty(data.caseType)) {
    errors.caseType = "Case Type is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};