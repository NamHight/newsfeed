var express = require('express');
const UserController = require("../controllers/UserController");
var router = express.Router();

/* GET users listing. */
router.get('/user-management',UserController.index);

module.exports = router;
