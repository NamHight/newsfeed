const IndexModel = require('../models/index.js');
const NewModel = require('../models/News.js');
const {convertDate} = require('../helpers/commom.ulti.js')
const moment = require('moment')


class NewsController {
    // hallder callback
    news = async (req,res) =>{
        let result = await NewModel.find({'Status':1});
        res.render('pages/posts', { title: 'News Management', posts: result, formatTime:moment});
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

}

module.exports = new NewsController;