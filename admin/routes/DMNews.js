const express = require('express');
const router = express.Router();
const CatetoryController = require('../controllers/DMNewsController')
/* GET home page. */

router.get('/catetorys',CatetoryController.news);
router.get('/addCatetory', CatetoryController.catetoryAdd)
router.post('/addCatetory', CatetoryController.catetoryAdd)
router.get('/delete2', CatetoryController.catetoryDelete)
router.get('/update2', CatetoryController.getUpdate)
router.post('/update2', CatetoryController.postUpdate)
router.get('/active2', CatetoryController.active)


module.exports = router;
