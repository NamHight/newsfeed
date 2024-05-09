
const CommentModel = require('../models/comment');

class CommentsController {


    postComment = async (req, res)=>{
        let idPost= req.query.id
        var input = req.body
        var data = {
            Content: input.content,
            Id: idPost,
            CreateAt: new Date()
        }
        var result = await CommentModel.create(data)
        res.redirect('/')
    }
    
}

module.exports = new CommentsController;
