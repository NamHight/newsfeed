
const IndexModel = require('../../models/user/Index');

class IndexController {
    // hallder callback 
    index(req,res){
        let title = 'News Feeds' ;
        res.render('user/index');
    }

    login(req,res){
        res.render('user/login');
    }

    register(req,res){
        res.render('user/register');
    }
}

module.exports = new IndexController;
