const Law = require("../Models/Law");
const validateLawInput = require("../Validation/law");


exports.addLaw = (req, res) => {
  const { errors, isValid } = validateLawInput(req.body);
  // Check validation
  if (!isValid) {
    res.status(400).json(errors);
  }else{
    Law.findOne({$and:[{"chapter":req.body.chapter},{"ipc": req.body.ipc}]}).then(result => {
    if (result) {
      res.status(400).json({ message: "Law already exists!" });
    } else {
      const newLaw = new Law({
        chapter: req.body.chapter,
        ipc: req.body.ipc
       });
       newLaw
            .save()
            .then(result=>
              res.status(400).json({
                message: 'Law added Successfully!!'
              }))
            .catch(err => res.status(400).json({ message: "Something went wrong!" }));
    }});}}

    exports.getAllLaw = (req, res) => {
        Law.find({},{ "chapter": 1, "ipc": 1,"_id":0}).then(result => {
          if (result.length > 0) {
            res.status(200).json({
              laws: result
            });
          } else {
            res.status(400).json({
              error: 'No Law found!',
            });
          }
        }).catch(error => {
          res.status(500).json({
            message: 'Error in Database!',
            error: error
          });
        });}