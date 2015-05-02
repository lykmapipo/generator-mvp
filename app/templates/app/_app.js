'use strict';

//dependencies
var path = require('path');
var _ = require('lodash');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
<%if(frontend){%>
// un comment after adding application favicon in public directory
// var favicon = require('serve-favicon');
var ejsEngine = require('ejs-mate');
<%}%>
var methodOverride = require('method-override');

//setup mongoose
require(path.join(__dirname, '..', 'config', 'mongoose'));

// load all models recursively
require('require-all')({
    dirname: __dirname + '/models',
    filter: /(.+_model)\.js$/,
    excludeDirs: /^\.(git|svn|md)$/
});

//create an express application
var app = express();
<%if(frontend){%>
// view engine setup
app.engine('html', ejsEngine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// apllication favicon
// un comment after adding application favicon in public directory
// app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

<%}%>
//request logger
app.use(logger('dev'));

//parsing body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));

<%if(frontend){%>
//setup public directories
if (app.get('env') === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'public')));
}

if (app.get('env') === 'development') {
    app.use('/bower_components', express.static(path.join(__dirname, '..', 'bower_components')));
}
<%}%>

//setup mongoose express pagination middleware
app.use(require('express-paginate').middleware(10, 50));

//load application locals
require('require-all')({
    dirname: __dirname + '/locals',
    filter: /(.+_locals)\.js$/,
    excludeDirs: /^\.(git|svn|md)$/,
    resolve: function(local) {
        if (_.isPlainObject(local)) {
            _.keys(local)
                .forEach(function(localKey) {
                    app.locals[localKey] = local[localKey];
                });
        }
    }
});

// load all routers recursively
require('require-all')({
    dirname: __dirname + '/routers',
    filter: /(.+_router)\.js$/,
    excludeDirs: /^\.(git|svn|md)$/,
    resolve: function(router) {
        app.use(router);
    }
});

// catch 404 and forward to error handler
app.use(function(request, response, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(error, request, response /*, next*/ ) {
        response.status(error.status || 500);
        response.render('errors', {
            title: 'Error',
            message: error.message,
            error: error
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(error, request, response /*, next*/ ) {
    response.status(error.status || 500);
    response.render('errors', {
        title: 'Error',
        message: error.message,
        error: {}
    });
});

//export express application
module.exports = app;