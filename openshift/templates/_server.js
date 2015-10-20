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
    .listen(app.get('port'), app.get('ip'), function() {
        winston.debug(
            'Application server listening on port %d in %s environment',
            app.get('port'),
            app.get('env')
        );

        winston.debug('To see your app, visit %s', config.get('baseUrl'));
    })
    .on('error', function(error) {
        winston.error(error);
    });
