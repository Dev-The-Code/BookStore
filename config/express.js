var express        = require('express'),
    glob           = require('glob'),
    app            = express(),
    favicon        = require('serve-favicon'),
    logger         = require('morgan'),
    cookieParser   = require('cookie-parser'),
    bodyParser     = require('body-parser'),
    compress       = require('compression'),
    methodOverride = require('method-override');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.use(logger('dev'));
  app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
  });

  app.use(bodyParser.json());         //use for JSON form data uploading
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());

  var controllers1 = glob.sync(config.root + '/app/controllers/business.js');

  controllers1.forEach(function (controller) {
    require(controller)(app);
  });
  

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.send(err);
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
  });
};
