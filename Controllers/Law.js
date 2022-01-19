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