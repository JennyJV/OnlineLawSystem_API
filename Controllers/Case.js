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
        casestatus: "New",
        caseID:generateID(req.body.petitionerName,req.body.accusedName),
        year: new Date().getFullYear()
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
        console.log("inside lawyer");
        console.log(userId);
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

    exports.getnewCases = (req, res) => {
      console.log("inside getnewCases");
      const userId=req.body.userId;
        Case.find({"lawyer":userId, "casestatus":"New"}).then(result => {
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
      exports.verifyCase = (req, res) => {
        console.log("inside verifyCase");
        const caseID=req.body.caseId;
        const status=req.body.status;
        console.log(caseID);
          Case.updateOne({"caseID" : caseID},{ $set: { casestatus:status }}).then(result => {
            if (result.length > 0) {
              console.log("Result found: " + result.length);
              res.status(200).json({
                cases: result
              });
            } else {
              res.status(400).json({
                message: 'Case cannot be updated',
              });
            }
          }).catch(error => {
            res.status(500).json({
              message: 'Error in Database',
              error: error
            });
          });
        }
      


        function generateID(strOne, strTwo) {
          str1=strOne.substring(0,2);
          str2=strTwo.substring(0,2);
          ran=Math.floor(Math.random() * (999999999 - 111111111 + 1) ) + 111111111;
          return str1+str2+ran;
        }