const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/indexController')
const UserController = require('../controllers/userController')
/* GET home page. */

router.get('/',IndexController.index);
router.get('/users',UserController.index)
module.exports = router;
