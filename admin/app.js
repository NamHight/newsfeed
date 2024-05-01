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
const indexRouter = require('./routes/index');
const newsRouter = require('./routes/News');
// const catetoryRouter = require('./routes/DMNews');
// const contactRouter = require('./routes/Contacts');
// const imageRouter = require('./routes/image');
// const commentRouter = require('./routes/Comments');
const cors = require("cors");

const port = 3000
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
app.use(cookieParser());
app.use(cors());
app.options("*", cors());

app.use('/', indexRouter);
app.use('/news', newsRouter);
// app.use('/catetory', catetoryRouter);
// app.use('/comment', commentRouter);
// app.use('/contact', contactRouter);
// app.use('/image', imageRouter);
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

