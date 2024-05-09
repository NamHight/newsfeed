const IndexModel = require('../../models/user/index.js');
const News = require('../../models/user/News.js');
const {convertDate} = require('../../helpers/commom.ulti.js')


class NewsController {
    // hallder callback
<<<<<<< HEAD
    // async news(req, res) {
    //     try {
    //        // let TheThao = await News.dmBaiViet('thethao');
    //         res.render('pages/index', { TheThao: TheThao});
    //     } catch (error) {
    //         console.error('Error:', error);
    //         res.status(500).send('Internal Server Error');
    //     }
    // }
=======
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
        res.render('user/index', { title: 'News Feeds' ,result:result, converDate:dated});
    }


>>>>>>> origin
}

module.exports = new NewsController;