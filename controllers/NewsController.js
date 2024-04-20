const IndexModel = require('../models/index.js');
const News = require('../models/news.js');


class NewsController {
    // hallder callback
    news = async (req,res) =>{
        let result = await News.find({id:5});
        if (!result.length) {
            throw new HttpException(404, 'Users not found');
        }
        console.log(result);
        res.render('index', { title: 'News Feeds' });
    }

    new(req, res) {
        IndexModel.new();
    }

}

module.exports = new NewsController;