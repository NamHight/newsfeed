const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayout = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const contactRouter = require('./routes/contact');
const cors = require("cors");

const port = 3000
dotenv.config();
const app = express();

// view engine setup
app.use(expressLayout);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.options("*", cors());

app.use(indexRouter);
app.use(userRouter);
app.use(contactRouter);
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

