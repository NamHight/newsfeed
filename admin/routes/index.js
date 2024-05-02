const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */

router.get('/',IndexController.index);

module.exports = router;
