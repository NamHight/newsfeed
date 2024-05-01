const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/ImagesController')
/* GET home page. */

router.get('/',ImageController.index);


module.exports = router;
