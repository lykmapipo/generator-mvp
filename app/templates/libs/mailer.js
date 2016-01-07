'use strict';

//dependencies
var config = require('config');
var path = require('path');
var _ = require('lodash');
var async = require('async');
var nodemailer = require('nodemailer');
var sendgrid = require('nodemailer-sendgrid-transport');
var emailTemplates = require('email-templates');
var winston = require(path.join(__dirname, '..', 'initializers', 'winston'));

//TODO send email in ground using kue

//prepare variables
var templatesDir = path.join(__dirname, '..', 'views', 'emails');
var mailTransport = nodemailer.createTransport(sendgrid(config.get('mailer.transport')));

/**
 * @description module to send emails
 * @type {Object}
 */
module.exports = exports = {
    send: function(type, data, done) {

        //extend data with default data
        data = _.merge({}, {
            from: config.get('mailer.from'),
            senderName: config.get('mailer.sender'),
            baseUrl: config.get('baseUrl')
        }, data);

        async.waterfall([

            function accessTemplateDir(next) {
                emailTemplates(templatesDir, next);
            },

            function prepareTemplate(template, next) {
                template(type, data, function(error, html) {
                    next(error, html);
                });
            },

            function sendEmail(html, next) {
                data = _.extend(data, {
                    html: html
                });

                var isLocal = process.env.NODE_ENV &&
                    ((process.env.NODE_ENV === 'test') || (process.env.NODE_ENV === 'development'));

                //if local environment log sent email details
                if (isLocal) {
                    winston.debug(data.html);
                    next(null, data);
                }

                //send email using transport
                else {
                    mailTransport.sendMail(data, next);
                }
            }
        ], done);
    }
};