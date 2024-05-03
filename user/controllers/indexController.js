
const IndexModel = require('../models/index.js');
const {validationResult} = require("express-validator");
const Contact = require("../models/Contacts");
const Login = require('../models/Users.js');
const News = require('../models/News.js');
const session = require('express-session');

class IndexController {
    // hallder callback 
    index(req,res){
        const loginName = req.session.username || ''; // Lấy tên người dùng từ session, nếu ko được định nghĩa nó sẽ gán cho ''
        res.render('pages/index', { title:'News Feeds',errors:'', loginName: loginName});
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
    Login = async (req,res) =>{
        let user = req.body.username
        let pass = req.body.password
        const { username } = req.body;//username lấy giá trị từ req.body
        let role = await Login.findOneRole({username: user})
        let result = await Login.findOne({username: user, password: pass})
        console.log("role: ",role.Role)
        console.log("result: ",result.Status)
        if(result.Status == 1){
            if(role.Role == 0){
                req.session.username = username
                res.redirect('/')
            }
            else
                res.redirect('http://localhost:3000')
        }
        else 
            res.render('pages/login')
    }
    Signup = async (req,res) =>{
        let result = await Signup.createUser(req.body)
        console.log("result: ",result.Status)
        if(result){
            res.redirect('http://localhost:8099/login')
        }
        else 
            res.render('http://localhost:8099/signup')
    }
    getLogin(req,res){
        res.render('pages/login', { title:'Login',errors:'' });
    }

    getSignup (req,res){
        res.render('pages/signup', { title:'Signup',errors:'' });
    }
    logout (req,res){
        req.session.destroy((err) => { //destroy huỷ bỏ session
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/');
            }
        });
    }
}

module.exports = new IndexController;
