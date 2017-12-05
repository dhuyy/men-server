var path = require('path');
var logger = require('morgan');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var config = require('./config/database');

var routes = require('./routes/index');

var app = express();

/**
 * DB connection
 */
mongoose.connect(config.database);

/**
 * Making this server CORS-enable
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Initializing passport
 */
app.use(passport.initialize());

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * App configuration
 */
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Initializing routes
 */
routes(app);

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error handler
 */
app.use(function(err, req, res) {
  /**
   * Set locals, only providing error in development
   */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /**
   * Render the error page
   */
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
