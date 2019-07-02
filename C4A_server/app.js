var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var classesRouter = require('./routes/classes');
var messagesRouter = require('./routes/messages');
var fichiersRouter = require('./routes/fichiers');
var exercicesRouter = require('./routes/exercices');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors())
app.options('*', cors())

app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/classes', classesRouter);
app.use('/messages', messagesRouter);
app.use('/fichiers', fichiersRouter);
app.use('/exercices', exercicesRouter);

var route, routes = [];

app._router.stack.forEach(function(middleware){
  if(middleware.route){ // routes registered directly on the app
    routes.push({
      path: middleware.route.path,
      methods: middleware.route.methods
    });
  } else if(middleware.name === 'router'){ // router middleware
    middleware.handle.stack.forEach(function(handler){
      route = handler.route;
      route && routes.push({
        path: route.path,
        methods: route.methods
      });
    });
  }
});

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
