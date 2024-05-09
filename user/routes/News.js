const express = require('express');
const router = express.Router();
const newsController = require('../../controllers/user/NewsController')
/* GET home page. */

<<<<<<< HEAD
//router.get('/Post',newsController.news);
=======
router.get('news/',newsController.news);
>>>>>>> origin

module.exports = router;
