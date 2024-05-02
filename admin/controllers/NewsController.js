const IndexModel = require('../models/index.js');
const NewModel = require('../models/News.js');
const {convertDate} = require('../helpers/commom.ulti.js')
const moment = require('moment')


class NewsController {
    // hallder callback
    news = async (req,res) =>{
        let stt_page = req.params.id
        let result = await NewModel.find({'Status':1});
        let so_trang = parseInt(result.length/10) +1
        if(!stt_page){
            res.render('pages/posts', { title: 'News Management', posts: result, formatTime:moment, sotrang:so_trang });
        }else{
            res.render('pages/posts2', { title: 'News Management', posts: result, formatTime:moment, sotrang:so_trang, stt:stt_page });
        }
       
    }

    active = async (req, res) =>{
        let ids = req.params['id']
        console.log("id la", ids)
        let status = await NewModel.findOneField({Id: ids})
        console.log("status la", status)
        if(status ==0){
            let result = await NewModel.update({'Status':1}, ids);
        }else{
            let result = await NewModel.update({'Status':0}, ids);
        }
        res.redirect('/news');
    }

    // getUpdate = async(req, res) =>{
    //     let ids = req.params['id']
    //     res.render('pages/updatePosts',{id:ids})
    // }

    postUpdate = async(req, res) =>{
        let id = req.query.id;
        console.log(id)
        if(!req.body['title']){
            res.render('pages/updatePosts.ejs', {ma: id})
        }else{
            var up = req.body
            var ob_update = {'Title': up.title, 'Description':up['description'], 'Author':up.author, 'View':up.view,
            'ID_DM':up.catetory, 'CreateAt':up.createAt,'UpdateAt':up.updateAt, 'Status':up.status}
            var result = await NewModel.update(ob_update, id)
            res.redirect('/')
        }
       
    }

}

module.exports = new NewsController;