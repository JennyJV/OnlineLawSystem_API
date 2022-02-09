const StateDistrict = require("../Models/Districts");
const Court = require("../Models/Court");
const validateCourtInput = require("../Validation/court");

exports.states = (req, res) => {
  // Form validation
  StateDistrict.find({}, { "state": 1}).then(result => {
    if (result.length > 0) {
      res.status(200).json({
        states: result
      });
    } else {
      res.status(400).json({
        error: 'No state found!',
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Error in Database!',
      error: error
    });
  });
}

exports.districts = (req, res) => {
  // Form validation
const state=req.body.state;
  StateDistrict.find({"state":state},{ "district": 1}).then(result => {
    if (result.length > 0) {
      res.status(200).json({
        districts: result
      });
    } else {
      res.status(400).json({
        error: 'No district found!',
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Error in Database!',
      error: error
    });
  });
}

exports.getCourtsByArea = (req, res) => {
const district=req.body.district;
Court.find({"district":district},{ "court": 1}).then(result => {
    if (result.length > 0) {
      res.status(200).json({
        courts: result
      });
    } else {
      res.status(400).json({
        error: 'No court found!',
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Error in Database!',
      error: error
    });
  });
}

exports.addCourt = (req, res) => {
  const { errors, isValid } = validateCourtInput(req.body);
  
  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  }else{
    Court.findOne({"court": req.body.court}).then(result => {
    if (result) {
      res.status(400).json({ message: "Court already exists!" });
    } else {
      const newCourt = new Court({
        state: req.body.state,
        district: req.body.district,
        court: req.body.court
      });
      newCourt
            .save()
            .then(result=>
              res.status(400).json({
                message: 'Court added Successfully!!'
              }))
            .catch(err => res.status(400).json({ message: "Something went wrong!" }));
    }});}}