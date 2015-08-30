'use strict';

//dependencies
require('config'); //load configurations
var mkdir = require('mkdir-p');
var path = require('path');
var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressWinston = require('express-winston');
var cors = require('cors');
var helmet = require('helmet');
var respond = require('express-respond');
<%if(frontend){%>
// un comment after adding application favicon in public directory
// var favicon = require('serve-favicon');
var ejsEngine = require('ejs-mate');
<%}%>

//build logs directory if does not exists
mkdir.sync(path.join(__dirname, '..', 'logs'));

//start initializers

//setup winston application logger
var winston = require(path.join(__dirname, 'initializers', 'winston'));

//setup application mongoose instance
require(path.join(__dirname, 'initializers', 'mongoose'));

//finish initializers

// load all models recursively
require('require-all')({
    dirname: path.join(__dirname, 'models'),
    filter: /(.+_model)\.js$/,
    excludeDirs: /^\.(git|svn|md)$/
});

//create an express application
var app = express();

//enable cors
app.use(cors());

//use express respond
app.use(respond());

//configure helmet
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.xssFilter());
// app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy({
    setTo: '<%=applicationName %> <%=applicationVersion %>'
}));
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.noCache());

<%if(frontend){%>
// view engine setup
app.engine('html', ejsEngine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// apllication favicon
// un comment after adding application favicon in public directory
// var favicon = require('serve-favicon');
// app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

<%}%>

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
    dirname: path.join(__dirname, 'locals'),
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

//setup application request logger 
app.use(expressWinston.logger({
    winstonInstance: winston
}));

// load all routers recursively
require('require-all')({
    dirname: path.join(__dirname, 'routers'),
    filter: /(.+_router)\.js$/,
    excludeDirs: /^\.(git|svn|md)$/,
    resolve: function(router) {
        app.use(router);
    }
});

//setup application request error logger
//setup application request logger 
app.use(expressWinston.errorLogger({
    winstonInstance: winston
}));


// catch 404 and forward to error handler
app.use(function(request, response, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handlers

/*jshint unused:false */
// development error handlers
if (app.get('env') === 'development' || app.get('env') === 'test') {
    app.use(function(error, request, response, next) {
        //log all errors
        winston.error(error);

        //respond
        response.status(error.status || 500);
        response.json({
            success: false,
            message: error.message,
            error: error
        });
    });
}


// production error handler
if (app.get('env') === 'production') {
    app.use(function(error, request, response, next) {
        //log all errors
        winston.error(error);

        //respond
        response.status(error.status || 500);
        response.json({
            success: false,
            message: error.message,
            error: {}
        });
    });
}
/*jshint unused:true */


//export express application
module.exports = app;