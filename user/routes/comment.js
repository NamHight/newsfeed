const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController')
/* GET home page. */


router.post('/', CommentController.postComment) // ae sua lai duong dan post


module.exports = router;
