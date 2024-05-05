const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/searchController')

/* GET home page. */

router.get('/search',SearchController.performSearch);


module.exports = router;
