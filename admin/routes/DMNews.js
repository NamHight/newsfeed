const express = require('express');
const router = express.Router();
const CatetoryController = require('../controllers/DMNewsController')
/* GET home page. */

router.get('/',CatetoryController.index);


module.exports = router;
