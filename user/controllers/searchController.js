const News = require('../models/News');
const {validationResult} = require('express-validator')
const {convertDate} = require('../helpers/commom.ulti')
const moment = require("moment")
class SearchController {
    performSearch = async (req,res) =>{
        const query = req.query.search;
        const filter = req.query.filter;
        const username = req.session.username;
        const perPage = 10;
        const [mostViews,latestNew] = await Promise.all([
            News.mostviews(), News.latestNews()
        ])
       const page = parseInt(req.query.page) || 0
        let result = await News.search({title:query, description:query},page,perPage);
        console.log("filter",filter);
        if(filter !== undefined){
            result = await News.searchAndFilter({title:query, description:query},page,perPage,filter);
        }
        const count = await News.count({title:query, description:query});
        const totalPages= Math.ceil(count/perPage);
        console.log("show result",result);
        res.render('pages/search', {
            title:'Search',
            Data:result,
            currentPage:page,
            totalPages:totalPages,
            dated: convertDate,
            query:query,
            errors:'',
            loginName:username,
            mostViews:mostViews,
            latestNew:latestNew,moment: moment
        });
    }
}

module.exports = new SearchController;
