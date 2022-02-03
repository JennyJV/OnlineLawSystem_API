const express = require('express');
const router = express.Router();

// import the controllers
const userController = require('../Controllers/Users');
const courtController = require('../Controllers/Court');
const lawController = require('../Controllers/Law');
const lawyerController = require('../Controllers/Lawyer');
const caseController = require('../Controllers/Case');

// declare the routes and bind to the controller methods
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/states',courtController.states);
router.post('/districts',courtController.districts);
router.post('/addCourt',courtController.addCourt);
router.post('/getCourtsByArea',courtController.getCourtsByArea);
router.post('/addLaw',lawController.addLaw);
router.get('/getAllLaw',lawController.getAllLaw);
router.post('/addLawyer',lawyerController.addLawyer);
router.get('/expertise',lawyerController.expertise);
router.post('/getLawyerByExpertise',lawyerController.getLawyerByExpertise);
router.post('/fileCase',caseController.fileCase);
router.post('/getCaseByUser',caseController.getCaseByUser);
router.post('/getnewCases',caseController.getnewCases);
router.post('/filterCase',caseController.filterCase);
router.post('/getAcceptedCases',caseController.getAcceptedCases);
router.post('/updateCaseStatus',caseController.updateCaseStatus);



// export the router
module.exports = router;