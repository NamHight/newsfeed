const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/indexController')
const ContactController = require('../controllers/contactController')
/* GET home page. */

router.get('/',IndexController.index);
router.post('/contactModal',IndexController.performCreateModal)
router.post('/',IndexController.createNewsLetter )

module.exports = router;
