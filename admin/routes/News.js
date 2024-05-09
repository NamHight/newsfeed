const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController')

/* GET home page. */

// router.get('/news',newsController.news);
router.get('/news',newsController.new2);
router.get('/add', newsController.getAdd)
router.post('/add', newsController.postAdd)
router.get('/delete', newsController.postDelete)
router.get('/update', newsController.getUpdate)
router.post('/update', newsController.postUpdate)
router.get('/active', newsController.active)
router.get('/search', newsController.search)

module.exports = router;
