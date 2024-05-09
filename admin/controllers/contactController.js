const Contact = require('../models/Contact');
const {validationResult} = require('express-validator')
const { convertDate } = require("../helpers/commom.ulti");
class ContactController {
    index = async (req,res) =>{
        const result = await Contact.findDesc();
        if (!result.length) {
            throw new HttpException(404, 'news not found');
        }
        console.log(" ket qua truy van day nay", result)
        res.render('pages/contact',{
            title: 'Contact management',
            datas: result,
            dated: convertDate,
        });
    }

    performActive = async (req,res) =>{
        try{
            const id = req.body.id;
            const result = await Contact.update({status: 1},id);
            if(result){
                res.redirect('/contacts')
            }
        }catch (e){
            console.log("error",e);
        }
    }
}

module.exports = new ContactController;
