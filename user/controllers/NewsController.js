const IndexModel = require('../models/index.js');
const News = require('../models/News.js');
const {convertDate} = require('../helpers/commom.ulti.js')


class NewsController {
    // hallder callback
    news = async (req,res) =>{
        let result = await News.findOneTitle({id:8});
        console.log("show result", result);
        // if (!result.length) {
        //     throw new HttpException(404, 'news not found');
        // }
        console.log("show date ",convertDate(new Date()));
        let dated = convertDate(new Date())
        let data = {
            
        }
        res.render('index', { title: 'News Feeds' ,result:result, converDate:dated});
    }
    latestNews = async (req,res) =>{
        let result1 = await News.selectTitle();
        
        res.render('pages/index', { latestNew:result1});
    }

}

module.exports = new NewsController;