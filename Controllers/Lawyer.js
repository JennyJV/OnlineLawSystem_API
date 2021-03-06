const Lawyer = require("../Models/Lawyer");
const Expertise = require("../Models/Expertise");

const validateLawyerInput = require("../Validation/lawyer");


exports.addLawyer = (req, res) => {
  const { errors, isValid } = validateLawyerInput(req.body);
  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  }else{
    Lawyer.findOne({$or:[{"regno":req.body.regno},{"email": req.body.email}]}).then(result => {
    if (result) {
      res.status(400).json({ message: "Lawyer already exists!" });
    } else {
      const newLawyer = new Lawyer({
        name: req.body.name,
        regno: req.body.regno,
        email: req.body.email,
        expertise: req.body.expertise,
       });
       newLawyer
            .save()
            .then(result=>
              res.status(400).json({
                message: 'Lawyer added Successfully !!'
              }))
            .catch(err => res.status(400).json({ message: "Something went wrong!" }));
          
    }});}}

    exports.getLawyerByExpertise = (req, res) => {
    const expertise=req.body.expertise;
    Lawyer.find({"expertise":expertise},{ "name": 1,"email":1}).then(result => {
        if (result.length > 0) {
          res.status(200).json({
            lawyers: result
          });
        } else {
          res.status(400).json({
            error: 'No Lawyer found!',
          });
        }
      }).catch(error => {
        res.status(500).json({
          message: 'Error in Database!',
          error: error
        });
      });
    }

    exports.expertise = (req, res) => {
      Expertise.find({}, {"expertise": 1}).then(result => {
        if (result.length > 0) {
          res.status(200).json({
            expertise: result
          });
        } else {
          res.status(400).json({
            error: 'No expertise found!',
          });
        }
      }).catch(error => {
        res.status(500).json({
          message: 'Error in Database!',
          error: error
        });
      });
    }