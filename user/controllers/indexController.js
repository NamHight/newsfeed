
const IndexModel = require('../models/index.js');
const {validationResult} = require("express-validator");
const Contact = require("../models/Contacts");
const indexModel = require('../models/index.js')

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

    createNewsLetter = async(req, res)=>{
        let mail = req.body.email
        console.log("mail đã nhận" , req.body) 
        console.log("đã vào được thêm newsletter")
        var result = indexModel.create({Mail:mail})
        res.redirect('/')
    }
}

module.exports = new IndexController;
