const Case = require("../Models/Case");
const validateCaseInput = require("../Validation/case");


exports.fileCase = (req, res) => {
  console.log("came inside fileCase");
  const { errors, isValid } = validateCaseInput(req.body);
  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  }else{
    Case.findOne({$and:[{"petitionerName":req.body.petitionerName},{"accusedName": req.body.accusedName},{"court": req.body.court},{"lawyer": req.body.lawyer},{"ipc": req.body.ipc}]}).then(result => {
    if (result) {
      console.log("Result found: " + result.length);
      res.status(400).json({ error: "Case already exists" });
    } else {
      console.log(req.body.petitionerName);
      console.log(req.body.petitionerEmail);
      console.log(req.body.accusedName);
      console.log(req.body.accusedAddress);
      console.log(req.body.court);
      console.log(req.body.lawyer);
      console.log(req.body.ipc);
      console.log(req.body.casestatus);
      const newCase = new Case({
        petitionerName: req.body.petitionerName,
        petitionerEmail: req.body.petitionerEmail,
        accusedName: req.body.accusedName,
        accusedAddress: req.body.accusedAddress,
        court: req.body.court,
        lawyer: req.body.lawyer,
        ipc: req.body.ipc,
        casestatus: req.body.casestatus
       });
       newCase
            .save()
            .then(cases => res.json(cases))
            .catch(err => console.log(err));
          
    }});}}

