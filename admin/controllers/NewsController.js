const NewModel = require('../models/News.js');
const CatetoryModel = require("../models/DMNews.js")
const moment = require('moment')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({storage:storage});
class NewsController {
    // hallder callback

    // news = async (req,res) =>{
    //     var result =[] // result là 1 mảng chứa các phần tử, mỗi phần tử là 1 đối tượng = 1 dòng trong bảng
    //     var noPage = 0 // theo dõi trang hiện tại
    //     if(req.query.page){ // xét biến page nếu tồn tại tức là ng dùng đg chọn trang 2-> vô cực
    //         noPage = req.query.page
    //     }else{
    //         noPage =1 // nếu req.query.page k tồn tại thì tôi đang ở trang 1
    //     }
    //     var now_page = parseInt(noPage) // trang hiện tại về kiểu int
    //     var kq = await NewModel.find(); // kq là đối tượng => duyệt bằng for in k sài dc for of, kq.title hoặc kq['title']
    //     if (now_page==1){ // nếu trang hiện tại là trang 1 - lấy từ bài số 0 đến 9 = 10 bài 
    //         let i =0
    //         for (let value  in kq){
    //             if(i>=0 && i<=9){
    //                 result[value] = kq[value] // thêm giá trị vào mảng result
    //             }
    //             i++
    //         }
    //     }else{ // nếu trang hiện tại là trang 2 đổ lên
    //         let i =0, min = (now_page-1)*10, max = now_page*10 -1
    //         for (let value  in kq){
    //             if(i>=min && i<=max){ // ví dụ trang 2 thì chỉ lấy từ bài số 10 đến 19 
    //                 console.log("gia tri la", value)
    //                 result[value] = kq[value]
    //             }else if(i >max){
    //                 break;
    //             }
    //             i++
    //         }
    //     }
    //     let allNews = kq.length // lấy tất cả tổng bài viết trong csdl
    //     let totalPage = parseInt(result.length/10) +1 // số trang 
    //     res.render('pages/news/posts', { title: 'News Management', posts: result, formatTime:moment, sotrang:totalPage, page: now_page,allNews:allNews });
    // }

    new2 = async (req, res)=>{
        let nowPage = req.query.page ?  req.query.page : 1 // nếu req.query.page tồn tại gán chính nó, nếu k gán 1 là trang đầu tiên lun
        let queryToTalRow = await NewModel.findNumRow()  //  truy vấn lấy ra tổng số dòng
        let allNews = queryToTalRow.numRow // co 21 dong thi co 3 trang 
        let totalPage = parseInt((allNews/10))+1 // tính tổng số trang 
        let startRow = (nowPage-1)*10 // xác định dòng bắt đầu lấy khi truy vấn
        var result = await  NewModel.findOfPage(startRow)
        // trước khi đưa trang hiện tại xún ejs cần chuyển đổi về kiểu int tránh hiểu thành chuỗi
        res.render('pages/news/posts', { title: 'News Management', posts: result, formatTime:moment, sotrang:totalPage, page: parseInt(nowPage),allNews:allNews });
    }

    active = async (req, res) =>{
        let ids = req.query.id
        let result = await NewModel.findOneStatus({Id: ids})
        let status = result['status']
        console.log("status la", status)
        if(status ==0){
            let result = await NewModel.update({'status':1}, ids);
        }else{
            let result = await NewModel.update({'status':0}, ids);
        }
        res.redirect('/news');
    }

    getUpdate = async(req, res) =>{
        let ma = req.query.id
        let result = await NewModel.findOne({'Id':ma})
        console.log("show result",result)
        res.render('pages/news/update',{id: ma, data: result, title: 'Update News'})
    }

    postUpdate = async(req, res, next) =>{
        let ids = req.query.id
        var up = req.body
        var ob_update = {
            title: up['title'], 
            description:up['description'], 
            author:up['author'], 
            view:up['view'],
            catetory:up['catetory'], 
            updateAt: new Date(), 
            status:up['status']
        }
        var result = await NewModel.update(ob_update, up['id'])
        res.redirect('/news')
    }
    
    postDelete = async (req, res, next)=>{
        let ma = req.query.id
        let result = await NewModel.delete(ma)
        res.redirect('/news')
    }

    getAdd = async (req,res) =>{
        res.render('pages/news/add');
    }
    postAdd = async (req, res, next)=>{

        try{
            await upload.single('image')(req, res, async function(err){
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
                    let fileImage = req.file.originalname
                    var up = req.body
                    var ob_add = {
                    'title':up['title'], 
                    'description':up['description'],
                    'author':up['author'],
                    'view':up['view'],
                    'catetory':up['catetory'],
                    'createAt': new Date(),
                    'image': fileImage,
                    'status':up['status']
                    }
                    console.log("show",ob_add)
                    var result = await NewModel.create(ob_add)
                    res.redirect('/news')

            })
        }catch(err){
            console.log(err);
        }
    }

    search = async (req, res)=>{
        var noPage =0
        if(req.query.page){ // xét biến page nếu tồn tại tức là ng dùng đg chọn trang 2-> vô cực
            noPage = req.query.page
        }else{
            noPage =1
        }
        var now_page = parseInt(noPage) // trang hiện tại 
        let filter = req.query.filter
        let key = req.query.key
        var result = {}
        console.log("fliter la", filter)
        console.log("key la", key)
        if(!filter && key==""){ // mac dinh tim kiem theo thoi gian bai viet view nhieu nhat
            console.log("tim kiem theo view ")
            result = await NewModel.findByView()
        }else if(filter=="catetory" && key!=""){ // tim kiem theo danh muc bai viet
            console.log("tim kiem theo danh muc bai viet")
            let ID_post = await CatetoryModel.findOneID({Name:key}) // tim object chua id danh muc dua tren ten danh muc
            console.log("id danh muc posst", ID_post.Id)
            result = await NewModel.find({catetory:ID_post.Id})
        }else if (filter=="time"){ // xuat bai viet theo thoi gian nhat nhat
            console.log("tim kiem theo time")
            result = await NewModel.findByTime();
        }
        let allNews = result.length
        let totalPage = parseInt(result.length/10) +1
        var data = { title: 'News Management', posts: result, formatTime:moment, sotrang:totalPage, page: now_page, allNews:allNews }
        res.render('pages/news/posts',data)
    }

}


module.exports = new NewsController;