const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController')
/* GET home page. */

router.get('/Posts',newsController.news);

module.exports = router;
