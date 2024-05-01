
const IndexModel = require('../models/index.js');

class IndexController {
    // hallder callback 
    index(req,res){
        res.render('index');
    }

}

module.exports = new IndexController;
