const express = require('express');
const router = express.Router();
const IndexController = require('../../controllers/user/IndexController')


/* GET home page. */
router.get('/',IndexController.index);

/* GET login page. */
router.get('/login',IndexController.login);

/* GET register page. */
router.get('/register',IndexController.register);

module.exports = router;
