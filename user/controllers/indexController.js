
const IndexModel = require('../models/index.js');
const {validationResult} = require("express-validator");
const Contact = require("../models/Contacts");

class IndexController {
    // hallder callback 
    index(req,res){
        res.render('pages/index', { title:'News Feeds',errors:'' });
    }

    performCreateModal = async (req,res) =>{
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('pages/contact', {
                    title: 'Contact',
                    errors: errors.mapped()
                });
            }
            const data ={
                title: req.body.title,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                content: req.body.content,
                createAt: new Date()
            }
            const result = await Contact.create(data);
            if(result > 0){
                res.locals.successMessage = 'Gửi thành công!';
                res.render('pages/index', { title: 'News Feed', errors: '' });
            }else{
                res.redirect('/index');
            }
        }catch (e){
            console.log("error",e);
        }
    }
}

module.exports = new IndexController;
