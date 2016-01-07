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
        database: '<%=databaseName %>-test',
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
    },


    /**
     * @description json web token configuration
     * @type {Object}
     */
    jwt: {
        /**
         * @description a secret to be used on encoding and decoding jwt
         * @type {String}
         */
        secret: '78+3fsw9_4n13.hs~ns*ma42#@!`',

        /**
         * @description an algorithm to be used on encoding and decoding jwt
         * @type {String}
         */
        algorithm: 'HS256',

        /**
         * @description lifespan of jwt
         * @type {String}
         */
        expiresIn: '7 days',

        /**
         * @description intended audience for jwt
         * @type {String}
         */
        audience: '<%= applicationName %>',

        /**
         * @description allow payload to be parsed as json
         * @type {Boolean}
         */
        json: true
    },


    /**
     * @description sendgrid configurations
     * @type {Object}
     */
    /*jshint camelcase:false*/
    mailer: {
        from: '<%= applicationName %> <no-reply@<%= applicationName %>.com>',
        sender: 'The <%= applicationName %> Team',
        transport: {
            auth: {
                api_key: '<sendgrid api key>',
            }
        }
    }
    /*jshint camelcase:true*/

};