const IndexModel = require('../models/index.js');
const News = require('../models/News.js');
const {convertDate} = require('../helpers/commom.ulti.js')


class NewsController {
    // hallder callback
    // async news(req, res) {
    //     try {
    //        // let TheThao = await News.dmBaiViet('thethao');
    //         res.render('pages/index', { TheThao: TheThao});
    //     } catch (error) {
    //         console.error('Error:', error);
    //         res.status(500).send('Internal Server Error');
    //     }
    // }
}

module.exports = new NewsController;