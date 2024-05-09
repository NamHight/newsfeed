const NewsLetterModel = require('../models/NewsLetter')
const {convertDate} = require('../helpers/commom.ulti')


class NewsLetterController {

    newletter = async (req, res)=>{
        var result = await NewsLetterModel.find({Role: 2})
        let allNewsLetter = result.length
        let totalPage = parseInt(result.length/10) +1
        res.render('pages/newsletter/newsletter', {title: "NewsLetter Management", data: result, totalPage:totalPage, allNewsLetter:allNewsLetter, date:convertDate})
    }

}


module.exports = new NewsLetterController;

