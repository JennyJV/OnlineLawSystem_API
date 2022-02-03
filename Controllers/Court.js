const StateDistrict = require("../Models/Districts");
const Court = require("../Models/Court");
const validateCourtInput = require("../Validation/court");

exports.states = (req, res) => {
  // Form validation
  console.log("inside state");
  StateDistrict.find({}, { "state": 1}).then(result => {
    if (result.length > 0) {
      console.log("Result found: " + result.length);
      res.status(200).json({
        states: result
      });
    } else {
      res.status(400).json({
        message: 'States cannot be loaded',
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Error in Database',
      error: error
    });
  });
}

exports.districts = (req, res) => {
  // Form validation
  console.log("inside districts");
const state=req.body.state;
  StateDistrict.find({"state":state},{ "district": 1}).then(result => {
    if (result.length > 0) {
      console.log("Result found: " + result.length);
      res.status(200).json({
        districts: result
      });
    } else {
      res.status(400).json({
        message: 'States cannot be loaded',
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Error in Database',
      error: error
    });
  });
}

exports.getCourtsByArea = (req, res) => {
  console.log("inside getCourtsByArea");
const district=req.body.district;
Court.find({"district":district},{ "court": 1}).then(result => {
    if (result.length > 0) {
      console.log("Result found: " + result.length);
      res.status(200).json({
        courts: result
      });
    } else {
      res.status(400).json({
        message: 'Courts cannot be loaded',
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Error in Database',
      error: error
    });
  });
}

exports.addCourt = (req, res) => {
  console.log("inside addCourt");
  console.log("state: "+req.body.state);
  console.log("district: "+req.body.district);
  console.log("court: "+req.body.court);
  const { errors, isValid } = validateCourtInput(req.body);
  
  // Check validation
  if (!isValid) {
    console.log(errors);
    res.status(400).json(errors);
  }else{
    Court.findOne({"court": req.body.court}).then(result => {
    if (result) {
      console.log("Result found: " + result.length);
      res.status(400).json({ message: "Court already exists" });
    } else {
      const newCourt = new Court({
        state: req.body.state,
        district: req.body.district,
        court: req.body.court
      });
      newCourt
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          
    }});}}