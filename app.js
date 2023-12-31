var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');


var indexRouter = require('./routes/index');
var classRouter = require('./routes/classes');
var usersRouter = require('./routes/users');
var galleryRouter = require('./routes/gallery');
var classes = require('./public/scripts/classes');
var gallery = require('./public/scripts/gallery');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet.frameguard({action: "SAMEORIGIN"}));

app.use('/users', usersRouter);
app.use('/class', classRouter);
app.use('/upload', galleryRouter);


//Klassen in db laden
classes.init();


//Datenübertragung
app.get('/raid', function(req, res) {
  res.render('raidGuide.jade', { title: 'Raiding' });
});

app.use('/', 
  async function (req, res) {
    let tempClasses = await classes.get();
    var tempGallery = await gallery.get();
    res.render('index', {classes: tempClasses, bilder: tempGallery});
  }
);




// catch 404 and forward to error handler
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




module.exports = app;
