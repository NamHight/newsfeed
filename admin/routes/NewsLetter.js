const express = require('express')
const NewLetterConTroller = require('../controllers/NewsLetterController')
const router = express.Router();


router.get('/newsletter',NewLetterConTroller.newletter)

module.exports = router;