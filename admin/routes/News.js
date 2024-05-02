const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController')
/* GET home page. */

router.get('/',newsController.news);
router.get('/page/:id',newsController.news);
router.get('/active/:id', newsController.active)
// router.get('/update/:id', newsController.getUpdate)
router.post('/update', newsController.postUpdate)

module.exports = router;
