const express = require('express');
const router = express.Router();
const newsController = require('../../controllers/user/NewsController')
/* GET home page. */

router.get('news/',newsController.news);

module.exports = router;
