const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController')
/* GET home page. */
const {check} = require('express-validator')

router.get('/contacts',ContactController.index);
router.post('/activecontact',ContactController.performActive);

module.exports = router;
