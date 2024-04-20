const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController')
/* GET home page. */

router.get('/',newsController.news);

module.exports = router;
