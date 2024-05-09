const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentsController')
/* GET home page. */

router.get('/comments',CommentController.index);
router.get('/activeComment', CommentController.active)

module.exports = router;
