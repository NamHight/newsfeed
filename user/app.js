const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const moment = require('moment');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayout = require('express-ejs-layouts');
const cors = require("cors");
const session = require('express-session')

//router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactRouter = require('./routes/contact');
const searchRouter = require('./routes/search');
const newsRouter = require('./routes/News');

const port = 8099
dotenv.config();
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.use(expressLayout);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());
app.options("*", cors());
app.use(session({
  resave: false,//ko lưu session khi không có sự biến đổi j
  saveUninitialized: false, //không tạo session cho đến khi có thứ gì đó được lưu trữ
  secret: 'keyboard cat'//chuỗi bí mật được sử dụng để ký và mã hóa cookie của session để bảo mật session và tránh việc giả mạo.
  //có thể dùng chuỗi ngẫu nhiên phức tạp hơn để bảo mật
}))

app.use(indexRouter);
app.use(usersRouter);
app.use(contactRouter);
app.use(searchRouter);
app.use(newsRouter);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, ()=>{
  console.log(`server running is port ${port}`)
})

module.exports = app;

