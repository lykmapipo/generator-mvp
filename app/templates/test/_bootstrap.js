'use strict';

//set environment to test
process.env.NODE_ENV = 'test';

//dependencies
var path = require('path');
var async = require('async');
require(path.join(__dirname, '..', 'app', 'application'));
var mongoose = require('mongoose');

/**
 * @description wipe all mongoose model data and drop all indexes
 */
function wipe(done) {
    var cleanups = mongoose.modelNames()
        .map(function(modelName) {
            //grab mongoose model
            return mongoose.model(modelName);
        })
        .map(function(Model) {
            return async.series.bind(null, [
                //clean up all model data
                Model.remove.bind(Model),
                //drop all indexes
                Model.collection.dropAllIndexes.bind(Model.collection)
            ]);
        });

    //run all clean ups parallel
    async.parallel(cleanups, function(error) {
        if (error && error.message !== 'ns not found') {
            done(error);
        } else {
            done(null);
        }
    });
}

//setup test environment


//restore initial environment
after(function(done) {
    wipe(done);
});