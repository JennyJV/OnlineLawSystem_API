const Lawyer = require("../Models/Lawyer");
const Expertise = require("../Models/Expertise");

const validateLawyerInput = require("../Validation/lawyer");


exports.addLawyer = (req, res) => {
  console.log("inside addLawyer");
  console.log("name: "+req.body.name);
  const { errors, isValid } = validateLawyerInput(req.body);
  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  }else{
    Lawyer.findOne({$and:[{"name":req.body.name},{"email": req.body.email}]}).then(result => {
    if (result) {
      console.log("Result found: " + result.length);
      res.status(400).json({ error: "Lawyer already exists" });
    } else {
      const newLawyer = new Lawyer({
        name: req.body.name,
        regno: req.body.regno,
        email: req.body.email,
        expertise: req.body.expertise,
       });
       newLawyer
            .save()
            .then(lawyer => res.json(lawyer))
            .catch(err => console.log(err));
          
    }});}}

    exports.getLawyerByExpertise = (req, res) => {
      console.log("inside getLawyerByExpertise");
    const expertise=req.body.expertise;
    Lawyer.find({"expertise":expertise},{ "name": 1,"email":1}).then(result => {
        if (result.length > 0) {
          console.log("Result found: " + result.length);
          res.status(200).json({
            lawyers: result
          });
        } else {
          res.status(400).json({
            message: 'Lawyers cannot be loaded',
          });
        }
      }).catch(error => {
        res.status(500).json({
          message: 'Error in Database',
          error: error
        });
      });
    }

    exports.expertise = (req, res) => {
      console.log("inside expertise");
      Expertise.find({}, {"expertise": 1}).then(result => {
        if (result.length > 0) {
          console.log("Result found: " + result.length);
          res.status(200).json({
            expertise: result
          });
        } else {
          res.status(400).json({
            message: 'Expertise cannot be loaded',
          });
        }
      }).catch(error => {
        res.status(500).json({
          message: 'Error in Database',
          error: error
        });
      });
    }