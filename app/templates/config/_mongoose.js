'use strict';

//dependencies
var mongoose = require('mongoose');

//database configurations
var config = {
    database: '<%= databaseName %>',
    host: '<%= databaseHost %>',
    user: '<%= databaseUser %>',
    password: '<%= databasePassword %>',
    port: <%= databasePort %>
};

//generate mongoose connection uri string
var port = (config.port.length > 0) ? ':' + config.port : '';
var login = (config.user.length > 0) ? config.user + ':' + config.password + '@' : '';
var uristring = 'mongodb://' + login + config.host + port + '/' + config.database;

//mongodb options
var mongoOptions = {
    db: {
        safe: true
    },
    server: {
        socketOptions: {
            keepAlive: 1
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1
        }
    }
};

//establish database connection
mongoose.connect(uristring, mongoOptions, function(error, response) {
    if (error) {
        console.log('ERROR connecting to: ' + uristring + '. ' + error);
    } else {
        console.log('Successfully connected to: ' + uristring);
    }
});

//export mongoose
module.exports = mongoose;