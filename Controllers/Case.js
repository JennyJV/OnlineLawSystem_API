const Case = require("../Models/Case");
const validateCaseInput = require("../Validation/case");

exports.fileCase = (req, res) => {
  console.log("came inside fileCase");
  const { errors, isValid } = validateCaseInput(req.body);
  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  }else{
    Case.findOne({$and:[{"petitionerEmail":req.body.petitionerEmail},{"accusedName": req.body.accusedName},{"court": req.body.court},{"lawyer": req.body.lawyer},{"ipc": req.body.ipc}]}).then(result => {
    if (result) {
      console.log("Result found: " + result.length);
      res.status(400).json({ message: "Case already exists!" });
    } else {
      const newCase = new Case({
        petitionerName: req.body.petitionerName,
        petitionerEmail: req.body.petitionerEmail,
        accusedName: req.body.accusedName,
        accusedAddress: req.body.accusedAddress,
        court: req.body.court,
        lawyer: req.body.lawyer,
        ipc: req.body.ipc,
        caseType: req.body.caseType,
        casestatus: "New",
        caseID:generateID(req.body.petitionerName,req.body.accusedName),
        year: new Date().getFullYear()
       });
       newCase
            .save()
            .then(result=>
              res.status(400).json({
                message: 'Case added Successfully!!'
              }))
            .catch(err => res.status(400).json({ message: "Something went wrong!" }));
          
    }});}}

    exports.getCaseByUser = (req, res) => {
      console.log("inside getCaseByUser");
      const userId=req.body.userId;
      console.log();
      if(req.body.role == 'admin'){
        Case.find().then(result => {
          if (result.length > 0) {
            console.log("Result found in getCaseByUser: " + result.length);
            const yearList = Array.from(new Set(result.map(obj => obj.year)));
            res.status(200).json({
              cases: result,
              years:yearList
            });
          } else {
            res.status(400).json({
              message: 'No cases to display!'
            });
          }
        }).catch(error => {
          res.status(500).json({
            message: 'Error in Database!',
            error: error
          });
        });
      }else if(req.body.role == 'lawyer'){
        console.log("inside lawyer");
        console.log(userId);
        Case.find({"lawyer":userId, "casestatus":"New"}).then(result => {
          if (result.length > 0) {
            console.log("Result found: " + result.length);
            res.status(200).json({
              cases: result
            });
          } else {
            res.status(400).json({
              message: 'No cases to display!'
            });
          }
        }).catch(error => {
          res.status(500).json({
            message: 'Error in Database!',
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
              message: 'No cases to display!'
            });
          }
        }).catch(error => {
          res.status(500).json({
            message: 'Error in Database!',
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
              message: 'No cases to display!'
            });
          }
        }).catch(error => {
          res.status(500).json({
            message: 'Error in Database!',
            error: error
          });
        });
      }
      exports.getAcceptedCases = (req, res) => {
        console.log("inside getAcceptedCases");
        const userId=req.body.userId;
          Case.find({"lawyer":userId, "casestatus":"Accepted"}).then(result => {
            if (result.length > 0) {
              console.log("Result found: " + result.length);
              res.status(200).json({
                cases: result
              });
            } else {
              res.status(400).json({
                message: 'No cases to display!'
              });
            }
          }).catch(error => {
            res.status(500).json({
              message: 'Error in Database!',
              error: error
            });
          });
        }
      
        exports.filterCase = (req, res) => {
          console.log("inside filterCase");
          console.log(typeof req.body.caseByType);
          console.log(typeof req.body.caseByYear);
          var jsonData = {};
          if(req.body.caseByType){
            jsonData.caseType=req.body.caseByType;
          }
          if(req.body.caseByYear){
            jsonData.year=req.body.caseByYear;
          }
          console.log(jsonData);
            Case.find(jsonData).then(result => {
              if (result.length > 0) {
                console.log("Result found in filterCase: " + result.length);
                res.status(200).json({
                  cases: result
                });
              } else {
                console.log("empty response");
                res.status(400).json({
                  err: result,
                  message: 'No cases to display!'
                });
              }
            }).catch(error => {
              res.status(500).json({
                message: 'Error in Database!',
                error: error
              });
            });
          }

      exports.updateCaseStatus = (req, res) => {
        console.log("inside updateCaseStatus");
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
                message: 'Case cannot be updated at this moment!'
              });
            }
          }).catch(error => {
            res.status(500).json({
              message: 'Error in Database!',
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