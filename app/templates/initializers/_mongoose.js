'use strict';

//dependencies
var path = require('path');
var config = require('config');
var mongoose = require('mongoose');
var mongooseList = require(path.join(__dirname, '..', 'libs', 'mongoose', 'list'));
var mongooseSetter = require(path.join(__dirname, '..', 'libs', 'mongoose', 'setter'));
var mongooseValid8 = require('mongoose-valid8');
var mongooseTimestamp = require('mongoose-timestamp');
var mongoosePaginate = require('express-mquery').plugin;
var mongooseAutopopulate = require('mongoose-autopopulate');
var mongooseHidden = require('mongoose-hidden')({
    defaultHidden: {
        password: true,
        __v: true,
        __t: true
    }
});


/**
 * @description prepare mongo database configurations
 * @type {Object}
 */
var config = config.get('mongoose');


/**
 * @description generate mongoose connection uri string
 * @type {String}
 */
var port = config.port ? ':' + config.port : '';
var login = (config.user.length > 0) ? config.user + ':' + config.password + '@' : '';
var uristring = 'mongodb://' + login + config.host + port + '/' + config.database;


/**
 * @description mongodb options
 * @type {Object}
 */
var mongoOptions = config.options;


/**
 * @description plugin schema wide mongoose plugins 
 */
mongoose.plugin(mongooseTimestamp);
mongoose.plugin(mongoosePaginate);
mongoose.plugin(mongooseAutopopulate);
mongoose.plugin(mongooseHidden);
mongoose.plugin(mongooseValid8);
mongoose.plugin(mongooseList);
mongoose.plugin(mongooseSetter);


/**
 * @description establish database connection
 */
mongoose.connect(uristring, mongoOptions);


/**
 * @description export mongoose
 * @type {Mongoose}
 */
module.exports = mongoose;