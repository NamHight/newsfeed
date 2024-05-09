const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/indexController')
const ContactController = require('../controllers/contactController')

/* GET home page. */
router.get('/',IndexController.index);
router.post('/contactModal',IndexController.performCreateModal)
router.get('/login',IndexController.getLogin);
router.get('/signup',IndexController.getSignup);
router.get('/logout',IndexController.logout);
router.get('/detail:id',IndexController.getSingle_page);

router.post('/login',IndexController.Login);
router.post('/signup',IndexController.Signup);
router.post('/',IndexController.createNewsLetter)
router.post('/commemt-posts',IndexController.createComment)

module.exports = router;
