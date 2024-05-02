var express = require('express');
const UserController = require("../controllers/UserController");
var router = express.Router();
const {check, validationResult} = require('express-validator');

/* GET users listing. */
router.get('/users',UserController.index);
router.get('/createuser',UserController.create);
router.get('/edituser',UserController.edit);
router.post('/edituser',UserController.performEdit);
router.post('/createuser',[
    check('name').not().isEmpty().withMessage('Name cannot be empty'),
    check('email').not().isEmpty().withMessage('Email cannot be empty'),
    check('phone').not().isEmpty().withMessage('Phone cannot be empty'),
    check('password').not().isEmpty().withMessage('Password cannot be empty'),
    check('username').not().isEmpty().withMessage('Username cannot be empty'),
],UserController.performCreate);
router.post('/deleteuser',UserController.performDelete);

module.exports = router;
