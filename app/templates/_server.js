'use strict';

//dependencies
var path = require('path');
var app = require(path.join(__dirname, 'app', 'application.js'));

//set express server port number
app.set('port', process.env.PORT || 3000);

//lift up express server
app.listen(function() {
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});