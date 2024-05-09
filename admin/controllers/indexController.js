
const IndexModel = require('../models/index.js');

class IndexController {
    // hallder callback 

    index = (req,res) =>{
        res.render('pages/index',{ title: 'Dashboard' });
    }

}

module.exports = new IndexController;
