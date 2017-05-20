var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');

var app = express();

mongoose.connect("localhost:27017/shopping");

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


//cdn cloudinary
/*
cloudinary.config({ 
  cloud_name: 'tessthomas', 
  api_key: '144361676153932', 
  api_secret: '0gpIwiozgBSU_hspBdZiy3pWh2A' 
});

cloudinary.uploader.upload("http://www.recipe4living.com/assets/itemimages/400/400/3/ad730dd48323034c1a93239549f98561_78364997.jpg", function(result){ 
 console.log(result) 
});
cloudinary.uploader.upload("http://a1.cdn.whatstrending.com/posts/promo_images/000/022/862/original/Fries.jpg", function(result) {
 console.log(result) 
});
cloudinary.uploader.upload("https://thumbs.dreamstime.com/z/fried-fish-fingers-16426572.jpg", function(result)  { 
  console.log(result) 
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


//Implementing Redis cache

var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 6379});

redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function() {
 console.log("Error in Redis");
});

redisClient.set("title","Chicken Biryani",function(err,reply)
{
  
});
redisClient.get("title",function(err,reply) {
 console.log(reply);
});



module.exports = app;


