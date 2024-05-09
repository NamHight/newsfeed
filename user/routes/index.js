const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/indexController')
const ContactController = require('../controllers/contactController')

/* GET home page. */
router.get('/',IndexController.index);
router.post('/contactModal',IndexController.performCreateModal)
<<<<<<< HEAD
router.get('/login',IndexController.getLogin);
router.get('/signup',IndexController.getSignup);
router.get('/logout',IndexController.logout);
router.get('/news',IndexController.getSingle_page);

router.post('/login',IndexController.Login);
router.post('/signup',IndexController.Signup);
router.post('/commemt-posts',IndexController.commentPosts);
=======
router.post('/',IndexController.createNewsLetter )
>>>>>>> origin

module.exports = router;
