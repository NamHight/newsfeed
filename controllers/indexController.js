
const IndexModel = require('../models/index.js');

class IndexController {
    // hallder callback 
    index(req,res){
        res.render('index', { title: 'News Feeds' });
    }

    new(req, res) {
        IndexModel.new();
    }

}

module.exports = new IndexController;
