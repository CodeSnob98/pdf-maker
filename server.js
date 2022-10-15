var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs=require('hbs');
const livereload=require('livereload')
const connectLiveReload=require('connect-livereload');
const app = express()
const liveReloadServer=livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'views'))


liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

var indexRouter = require('./routes/index');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'views'))

hbs.registerPartials(__dirname+'/views')
// hbs.registerHelper(helpers);


app.use(connectLiveReload())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'stylessheets')));

app.use('/', indexRouter);

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
  
  app.listen(3000, ()=>{
    console.log('Successfully started the server')
  })
  
  module.exports = app;