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

    exports.getCaseByUser = (req, res) => {
      console.log("inside getCaseByUser");
      const userId=req.body.userId;
      if(req.body.role == 'admin'){
        Case.find().then(result => {
          if (result.length > 0) {
            console.log("Result found: " + result.length);
            res.status(200).json({
              cases: result
            });
          } else {
            res.status(400).json({
              message: 'Cases cannot be loaded',
            });
          }
        }).catch(error => {
          res.status(500).json({
            message: 'Error in Database',
            error: error
          });
        });
      }else if(req.body.role == 'lawyer'){
        Case.find({"lawyer":userId}).then(result => {
          if (result.length > 0) {
            console.log("Result found: " + result.length);
            res.status(200).json({
              cases: result
            });
          } else {
            res.status(400).json({
              message: 'Cases cannot be loaded',
            });
          }
        }).catch(error => {
          res.status(500).json({
            message: 'Error in Database',
            error: error
          });
        });
      }
      else if(req.body.role == 'public'){
        Case.find({"petitionerEmail":userId}).then(result => {
          if (result.length > 0) {
            console.log("Result found: " + result.length);
            res.status(200).json({
              cases: result
            });
          } else {
            res.status(400).json({
              message: 'Cases cannot be loaded',
            });
          }
        }).catch(error => {
          res.status(500).json({
            message: 'Error in Database',
            error: error
          });
        });

      }
    
    
    }

