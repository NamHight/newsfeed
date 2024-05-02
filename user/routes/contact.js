const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController')
/* GET home page. */
const {check} = require('express-validator')

router.get('/contact',ContactController.index);
router.post('/contact',[
    check('title').not().isEmpty().withMessage('title cannot be empty'),
    check('name').not().isEmpty().withMessage('name cannot be empty'),
    check('phone').not().isEmpty().withMessage('Phone cannot be empty'),
    check('email').not().isEmpty().withMessage('email cannot be empty'),
    check('content').not().isEmpty().withMessage('content cannot be empty'),
],ContactController.performCreate);

module.exports = router;
