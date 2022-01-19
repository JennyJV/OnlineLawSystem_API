const Law = require("../Models/Law");
const validateLawInput = require("../Validation/law");


exports.addLaw = (req, res) => {
  console.log("inside addLaw");
  console.log("chapter: "+req.body.chapter);
  console.log("ipc: "+req.body.ipc);
  const { errors, isValid } = validateLawInput(req.body);
  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  }else{
    Law.findOne({$and:[{"chapter":req.body.chapter},{"ipc": req.body.ipc}]}).then(result => {
    if (result) {
      console.log("Result found: " + result.length);
      res.status(400).json({ error: "Law already exists" });
    } else {
      const newLaw = new Law({
        chapter: req.body.chapter,
        ipc: req.body.ipc
       });
       newLaw
            .save()
            .then(law => res.json(law))
            .catch(err => console.log(err));
          
    }});}}

    exports.getAllLaw = (req, res) => {
      console.log("inside getAllLaw");
        Law.find({},{ "chapter": 1, "ipc": 1,"_id":0}).then(result => {
          if (result.length > 0) {
            console.log("Result found: " + result.length);
            res.status(200).json({
              laws: result
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
        });}