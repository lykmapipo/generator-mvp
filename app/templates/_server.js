'use strict';

//dependencies
var config = require('config');
var path = require('path');
var app = require(path.join(__dirname, 'app', 'application'));
var winston = require(path.join(__dirname, 'app', 'initializers', 'winston'));

//set application server port number
app.set('port', config.get('port'));

//set application server ip address
app.set('ip', config.get('ip'));

//lift up application server
app
    .listen(app.get('port'), function() {
        winston.info(
            'Application server listening on port %d in %s environment',
            app.get('port'),
            app.get('env')
        );
    })
    .on('error', function(error) {
        winston.error(error);
    });