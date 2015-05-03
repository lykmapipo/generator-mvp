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
var port = config.port ? ':' + config.port : '';
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
mongoose.connect(uristring, mongoOptions);

/**
 * @description export mongoose
 * @type {Mongoose}
 */
module.exports = mongoose;