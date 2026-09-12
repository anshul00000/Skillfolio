require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//  extra routes
const cors = require("cors");
const bodyParser = require('body-parser');
// error handler
const errormiddleware = require("./middlewares/error_middleware");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// const react_url = "http://localhost:5173";    //✔️
const react_url = "https://skillfolioo.netlify.app"     //✔️

const corsOptions = {
  origin: react_url ,  // ✅ Your React dev server
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true                 // ✅ Fix this spelling!
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/', indexRouter);

// app.use('/users', usersRouter);
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(errormiddleware);
module.exports = app;