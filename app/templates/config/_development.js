'use strict';

//dependencies
var defer = require('config/defer').deferConfig;

/**
 * @description default configurations
 * @type {Object}
 */
module.exports = {
    /**
     * @description default application base url
     * @type {String}
     */
    baseUrl: defer(function() {
        return 'http://' + this.ip + ':' + this.port;
    }),


    /**
     * @description application port
     * @type {Number}
     */
    port: 3000,


    /**
     * @description application ip address
     * @type {String}
     */
    ip: '127.0.0.1',


    /**
     * @description mongoose database configurations
     * @type {Object}
     */
    mongoose: {
        database: '<%=databaseName %>-dev',
        host: '<%=databaseHost %>',
        user: '<%=databaseUser %>',
        password: '<%=databasePassword %>',
        port: <%=databasePort %>,
        options: {
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
        }
    },


    /**
     *@description logger configurations
     */
    logger: {
        dir: 'logs',
        level: 'silly',
        file: 'logs.json'
    }

};