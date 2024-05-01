const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController')
/* GET home page. */

router.get('/',newsController.news);
router.get('/active/:id', newsController.active)

module.exports = router;
