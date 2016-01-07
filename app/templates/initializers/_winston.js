'use strict';

/**
 * @description application logger
 */

//dependencies
var config = require('config');
var path = require('path');
var winston = require('winston');
var isLocal = process.env.NODE_ENV && ((process.env.NODE_ENV === 'test') || (process.env.NODE_ENV === 'development'));
var transports = [];

//add development and test logger transports
if (isLocal) {
    transports.push(new(winston.transports.Console)({
        timestamp: true,
        level: config.get('logger.level'),
        color: true
    }));
}

//add production logger transports
if (!isLocal) {
    transports.push(new(winston.transports.File)({
        timestamp: true,
        level: config.get('logger.level'),
        filename: path.join(
            __dirname, '..', '..',
            config.get('logger.dir'),
            config.get('logger.file')
        )
    }));
}

var logger = new(winston.Logger)({
    transports: transports
});

//export application logger
module.exports = logger;