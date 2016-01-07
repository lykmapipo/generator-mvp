'use strict';

/**
 * Party model
 * @description schema and model used to manage authenticated entity
 */

//dependencies
var path = require('path');
var mongoose = require('mongoose');
var irina = require('irina');
var Schema = mongoose.Schema;
var winston = require(path.join(__dirname, '..', 'initializers', 'winston'));
var Mailer = require(path.join(__dirname, '..', 'libs', 'mailer'));


//Party Schema
var PartySchema = new Schema({
    /**
     * @description email address for this party
     *
     *              It is currently provided by irina module
     *              @see {@link https://github.com/lykmapipo/irina}
     *              
     * @type {Object}
     */
    // email: String
});


//apply PartySchema level plugins

//plugin irina for authentication workflows
PartySchema.plugin(irina);

//instance methods

/**
 * @description send party notifications
 * @param  {String}   type          a type of notification
 * @param  {User}   authenticable   current party
 * @param  {Function} done          a callback to invoke on success or error
 */
PartySchema.methods.send = function(type, authenticable, done) {
    //TODO implement underground task for sending emails

    //if we send confirmation email
    if (type === 'Account confirmation') {
        Mailer
            .send('confirm', {
                    recipientName: authenticable.name,
                    token: authenticable.confirmationToken,
                    to: authenticable.email,
                    subject: 'Account confirmation'
                },
                function(error) {
                    if (error) {
                        winston.error(error);
                    }

                    done();
                }
            );
    }

    //if we send account recovery
    if (type === 'Password recovery') {
        Mailer
            .send('recover', {
                    recipientName: authenticable.name,
                    token: authenticable.recoveryToken,
                    to: authenticable.email,
                    subject: 'Account Recovery'
                },
                function(error) {
                    if (error) {
                        winston.error(error);
                    }

                    done();
                }
            );
    }

    //if we send account locked information
    if (type === 'Account recovery') {
        Mailer.send('unlock', {
                recipientName: authenticable.name,
                token: authenticable.unlockToken,
                to: authenticable.email,
                subject: 'Account Locked'
            },
            function(error) {
                if (error) {
                    winston.error(error);
                }

                done();
            }
        );
    }
};


//exports Party model
module.exports = mongoose.model('Party', PartySchema);