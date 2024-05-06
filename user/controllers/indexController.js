
const IndexModel = require('../models/index.js');
const {validationResult} = require("express-validator");
const Contact = require("../models/Contacts");
const User = require('../models/Users.js');
const News = require('../models/News.js');
const session = require('express-session');
const multer = require('multer');
//upload Img
const storage = multer.diskStorage({//diskStorage hàm lưu trữ 
    destination:(req, file, res) => {//destination nơi lưu file
        res(null, './public/images')//nếu ko có file trả về null, có file lưu vào './public/images'
    },
    filename: (req, file, res) => {//tên file
        res(null, file.originalname)//originalname tên file đó
    }
})
const upload = multer({ storage: storage })

class IndexController {
    // hallder callback 

    async index(req, res) {
        try {
            //biến truyền vào
            let thethao = 'thethao'
            let thoitiet = 'thoitiet'
            let thucPham = 'thucPham'
            let nhac = 'nhac'
            let phimanh = 'phimanh'
            let dienvien = 'dienvien'

            //biến được truyền vào ham
            //thethao
            let sports = await News.dmBaiViet(thethao);
            let sportMostViews = await News.dmMostViews(thethao);
            //thoitiet
            let weather = await News.dmBaiViet(thoitiet);
            let weatherMostViews = await News.dmMostViews(thoitiet);
            //thucPham
            let food = await News.dmBaiViet(thucPham);
            let foodsMostViews = await News.dmMostViews(thucPham);
            //nhac
            let music = await News.dmBaiViet(nhac);
            let musicMostViews = await News.dmMostViews(nhac);
            //phimanh
            let movie = await News.dmBaiViet(phimanh);
            let movieMostViews = await News.dmMostViews(phimanh);
            //dienvien
            let actor = await News.dmBaiViet(dienvien);
            let actorMostViews = await News.dmMostViews(dienvien);

            let Photography =  await News.Photography();
            let mostViews = await News.mostviews();
            let latestPost = await News.latestPost();
            let latestNew = await News.latestNews();
            let postNews =  await News.postNews()
            let loginName = req.session.username || '';
            let img = req.session.Image;

            res.render('pages/index', { title: 'News Feeds', errors: '',
            loginName: loginName, img: img, latestNew:latestNew, latestPost:latestPost, mostViews:mostViews,
            sports:sports, sportMostViews:sportMostViews, postNews:postNews, weather:weather, weatherMostViews:weatherMostViews,
            food:food, foodsMostViews:foodsMostViews, music: music, musicMostViews:musicMostViews,
            movie:movie, movieMostViews:movieMostViews, actor:actor, actorMostViews:actorMostViews, Photography:Photography
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
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
        let role = await User.findOneRole({username: user})
        let result = await User.findOne({username: user, password: pass})
        console.log("role: ",role.Role)
        console.log("result: ",result.Status, result.Image)
        if(result.Status == 1){
            if(role.Role == 0){
                req.session.username = username
                req.session.Image = result.Image
                res.redirect('/')
            }
            else
                res.redirect('http://localhost:3000')
        }
        else 
            res.render('pages/login')
    }
    Signup = async (req, res)=> {
        try{
            await upload.single('Image')(req, res, async function (err){
                if (err instanceof multer.MulterError) {
                    // Xử lý lỗi Multer
                    console.log(err);
                    res.status(500).send('Lỗi khi tải lên tệp.');
                    return;
                } else if (err) {
                    // Xử lý lỗi khác
                    console.log(err);
                    res.status(500).send('Lỗi máy chủ.');
                    return;
                }
                console.log('file:',req.file);//thông báo server
                const {name,tel,Mail,username,password,Image,Description,CreateAt} = req.body
                let result = await User.createUser({name: name,tel:tel,Mail:Mail,username:username,
                    password:password,Image:Image,Description:Description,CreateAt:CreateAt})
                console.log("result: ",result)
                if(result){
                    req.session.username = username
                    res.redirect('http://localhost:8099/login')
                }
                else 
                    res.render('http://localhost:8099/signup')
            });
        }catch (err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    }
    getLogin(req,res){
        const loginName = req.session.username || ''; 
        res.render('pages/login', { title:'Login',errors:'',loginName:loginName});
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
