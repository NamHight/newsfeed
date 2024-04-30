
const IndexModel = require('../models/index.js');

class IndexController {
    // hallder callback 
    index(req,res){
        let title = 'News Feeds' ;
        res.render('user/index', { title:title });
    }

}

module.exports = new IndexController;
