const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.aadhar = !isEmpty(data.aadhar) ? data.aadhar : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  } else {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(data.name)) {
      errors.name = "Name is invalid";
    }
    if (!Validator.isLength(data.name, { min: 5, max: 30 })) {
      errors.password = "Name is invalid length";
    }
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  if (Validator.isEmpty(data.aadhar)) {
    errors.aadhar = "Aadhar number is required";
  } else {
    if ((data.aadhar < 111111111111) || (data.aadhar > 999999999999)) {
      errors.aadhar = "Aadhar number is invalid";
    }
    if (isNaN(data.aadhar)) {
      errors.aadhar = "Aadhar number is invalid";
    }
  }
  if (Validator.isEmpty(data.role)) {
    errors.role = "User role is required";
  } else {
    if ((data.role.toUpperCase() != "ADMIN") && (data.role.toUpperCase() != "LAWYER") && (data.role.toUpperCase() != "PUBLIC")) {
      errors.role = "User role is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};