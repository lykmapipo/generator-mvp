'use strict';

/**
 * @description application logger
 */

//dependencies
var config = require('config');
var path = require('path');
var winston = require('winston');

var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            timestamp: true,
            level: config.get('logger.level'),
            color: true
        }),
        new(winston.transports.File)({
            timestamp: true,
            level: config.get('logger.level'),
            filename: path.join(
                __dirname, '..', '..',
                config.get('logger.dir'),
                config.get('logger.file')
            )
        })
    ]
});

module.exports = logger;