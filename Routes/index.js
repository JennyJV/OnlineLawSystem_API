const express = require('express');
const router = express.Router();

// import the controllers
const userController = require('../Controllers/Users');
const courtController = require('../Controllers/Court');
const lawController = require('../Controllers/Law');
const lawyerController = require('../Controllers/Lawyer');

// declare the routes and bind to the controller methods
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/states',courtController.states);
router.post('/districts',courtController.districts);
router.post('/addCourt',courtController.addCourt);
router.post('/addLaw',lawController.addLaw);
router.post('/addLawyer',lawyerController.addLawyer);
router.get('/expertise',lawyerController.expertise);
// export the router
module.exports = router;