const User = require("../models/Users");
const {convertDate} = require("../helpers/commom.ulti");
const bcrypt = require('bcrypt')
const multer = require('multer');
const {validationResult} = require("express-validator");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/') // Thư mục lưu trữ tệp tải lên
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Sử dụng tên gốc của tệp cho tên lưu trữ
    }
});
const upload = multer({ storage: storage });


class UserController {
    // hallder callback

    index = async (req,res) => {
        try{
            let result = await User.findDesc();
            if (!result.length) {
                throw new HttpException(404, 'news not found');
            }
            res.render('pages/users',{
                title: 'User management',
                datas: result,
                dated: convertDate,
            });
        }catch (err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    }

    create = async (req, res) => {
        res.render('pages/users/create',{
            title: 'Create User',
            errors: '',
        });
    }
    edit = async (req, res) => {
        var id = req.query.id;
        var result = await User.findOne({id:id});
        if(!result){
            res.status(404).send('Not found');
        }
        res.render('pages/users/edit',{
            title: 'Edit User',
            errors: '',
            datas:result
        })
    }

    performEdit = async (req, res) => {
        try{
            await upload.single('image')(req, res, async function (err){
                if (err instanceof multer.MulterError) {
                    console.log(err);
                    res.status(500).send('Lỗi khi tải lên tệp.');
                    return;
                } else if (err) {
                    console.log(err);
                    res.status(500).send('Lỗi máy chủ.');
                    return;
                }
                var id = req.body.id;
                console.log("show user id", id);
                const pass = bcrypt.hashSync(req.body.password, 10);
                const data = {
                    username: String(req.body.username),
                    name: req.body.name,
                    tel: req.body.phone,
                    password: pass,
                    mail: req.body.email,
                    description: req.body.description,
                    role: req.body.role,
                    image: req.file ? req.file.originalname : req.body.currentImage,
                    updateAt: new Date(),
                }
                var result = await User.update(data,id);console.log("show th ruk", result);
                if(result.length > 0){
                    res.redirect('/users');
                }else{
                    res.redirect('/edituser?id='+id);
                }
            });
        }catch (error){
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    performCreate = async (req, res)=> {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('pages/users/create', {
                    title: 'Create User',
                    errors: errors.mapped()
                });
            }
            await upload.single('image')(req, res, async function (err){
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
                const pass = bcrypt.hashSync(req.body.password, 10);
                const data = {
                    Username: req.body.username,
                    Name: req.body.name,
                    Phone: req.body.phone,
                    Password: pass,
                    Email: req.body.email,
                    Description: req.body.description,
                    Role: req.body.role,
                    Image: req.file ? req.file.originalname : null,
                    createAt: new Date(),
                }
                const result = await User.create(data);
                if(result > 0){
                    res.redirect('/users');
                }else{
                    res.redirect('/createuser');
                }
            });
        }catch (err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    }

    performDelete = async (req, res) => {
        try{
            const id = req.body.id;
            const result = await User.delete(id);
            if(result > 0){
                res.redirect('/users');
            }else{
                res.redirect('/users');
            }
        }catch (err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    }

}
module.exports = new UserController;