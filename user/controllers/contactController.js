const Contact = require('../models/Contacts');
const {validationResult} = require('express-validator')
class ContactController {
    index = async (req,res) =>{
        res.render('pages/contact', { title:'Contact',errors:'' });
    }

    performCreate = async (req,res) =>{
        try{
            let loginName = req.session.username || '';
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
                res.render('pages/contact', { title: 'Contact', errors: '' ,loginName:loginName,successMessage:successMessage});
            }else{
                res.redirect('/contact');
            }
        }catch (e){
            console.log("error",e);
        }
    }


}

module.exports = new ContactController;
