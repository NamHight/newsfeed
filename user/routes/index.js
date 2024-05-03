const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/indexController')
const ContactController = require('../controllers/contactController')
/* GET home page. */

router.get('/',IndexController.index);
router.post('/contactModal',IndexController.performCreateModal)
router.get('/login',IndexController.getLogin);

router.get('/signup',IndexController.getSignup);

router.post('/login',IndexController.Login);

router.get('/logout',IndexController.logout);
module.exports = router;
