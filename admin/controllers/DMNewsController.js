
const DMNewsModel = require('../models/DMNews');


class DMNewsController {
    news = async (req,res) =>{
        let key = req.query.key
        var result ={}
        if(key){
            result = await DMNewsModel.find({name:key})
        }else{
            result = await DMNewsModel.find()
        }
        let allCatetory = result.length
        let totalPage = parseInt(result.length/10) +1
        res.render('pages/catetorys/catetorys',{ title: 'Catetory Management', catetorys: result, totalPage:totalPage, allCatetory:allCatetory });
    }

    active = async (req, res) =>{
        let ids = req.query.id
        let result = await DMNewsModel.findOneField({Id: ids})
        let status = result['status']
        console.log("status la", status)
        if(status ==0){
            let result = await DMNewsModel.update({'status':1}, ids);
        }else{
            let result = await DMNewsModel.update({'status':0}, ids);
        }
        res.redirect('/catetorys');
    }

    getUpdate = async(req, res) =>{
        let ma = req.query.id
        let result = await DMNewsModel.findOne({Id:ma})
        console.log("show result",result)
        res.render('pages/catetorys/update',{id: ma, data: result, title: 'Update Catetorys'})
    }

    postUpdate = async(req, res, next) =>{
        var up = req.body
        var ob_update = {
            name: up['name'], 
            status:up['status']
        }
        var result = await DMNewsModel.update(ob_update, up['id'])
        res.redirect('/catetorys')
    }
    
    catetoryDelete = async (req, res, next)=>{
        let ma = req.query.id
        let result = await DMNewsModel.delete(ma)
        res.redirect('/catetorys')
    }

    catetoryAdd = async (req, res, next)=>{ 
        if(!req.body.status){
            console.log("vao if roi nha")
            res.render('pages/catetorys/addCatetory')
        }else{
            console.log("vao else roi nha")
            var up = req.body
            var result = await DMNewsModel.create( { name: up['name'], status: up['status']})
            res.redirect('/catetorys')
        } 
    }

}

module.exports = new DMNewsController;
