
const CommentModel = require('../models/Comments');

class CommentsController {
  
    index = async (req, res)=>{
        const result = await CommentModel.find()
        console.log(result)
        res.render('pages/comments/comments',{data:result, title:"Comment Managements"})
    }

    active = async (req, res) =>{
        let ids = req.query.id
        let result = await CommentModel.findOneStatus({Id: ids})
        let status = result['Status']
        console.log("status la", status)
        if(status ==0){
            let result = await CommentModel.update({'Status':1}, ids);
        }else{
            let result = await CommentModel.update({'Status':0}, ids);
        }
        console.log("da active")
        res.redirect('/comments');
    }
}

module.exports = new CommentsController;
