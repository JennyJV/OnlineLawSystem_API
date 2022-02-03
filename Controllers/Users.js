const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../Config/keys");
const validateRegisterInput = require("../Validation/register");
const validateLoginInput = require("../Validation/login");
const User = require("../Models/User");

exports.register = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  }else{
  User.findOne({$or:[{"email":req.body.email},{"aadhar": req.body.aadhar}]}).then(user => {
    if (user) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        aadhar: req.body.aadhar,
        role: req.body.role.toLowerCase()
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });}
};

exports.login = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
    console.log(errors);
  }else{
  const email = req.body.email;
  const password = req.body.password;
  console.log("inside login");
  console.log(email+ " "+password);
  // Find user by email
  User.findOne({ email }).then(result => {
    // Check if user exists
    if (!result) {
      res.status(404).json({ message: "User not found" });
    }else{
    // Check password
    bcrypt.compare(password, result.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: result.id,
          name: result.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            console.log("logged in successfully")
            res.status(200).json({
              success: true,
              token: "Bearer " + token,
              message: 'User logged in Successfully !!',
              isLoggedIn: true,
              user: result,
              role:result.role
            });
          }
        );
      } else {
        console.log("Incorrect login credentials");
        res
          .status(400)
          .json({ message: "Incorrect login credentials" });
      }
    });}
  });}
};