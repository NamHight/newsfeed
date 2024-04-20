var express = require('express');
var router = express.Router();
var indexRouter = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexRouter.index);

module.exports = router;
