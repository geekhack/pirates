const express = require('express')
const PirateController = require('../controllers/piratecontroller');
const UserController = require('../controllers/usercontroller')
const withAuth = require('../middelware/middleware')

//create a router
const router = express.Router();

router.post('/pirate', PirateController.createPirate);
router.get('/pirate/:id', PirateController.getOnePirate);
router.post('/pirate/captain', PirateController.captainExistence);

router.get('/pirates',PirateController.getPirates);
router.put('/pirate/:id', PirateController.updatePirate)
router.delete('/pirate/:id', PirateController.deletePirate);



//register user
router.post('/auth/register',UserController.register);
router.post('/auth/sign_in', UserController.sign_in);

router.get('/user/profile', UserController.profile)


module.exports = router



