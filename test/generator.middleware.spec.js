'use strict';

//dependencies
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var middlewareGenerator = path.resolve(path.join(__dirname, '..', 'middleware'));
var os = require('os');
var destDir;

describe('mvp:middleware generator', function() {
    //spec for  middleware generator
    before(function(done) {
        helpers.run(middlewareGenerator)
            // .inDir(tmpPath) //I have been getting some errors lets us os.tmpdir
            .withArguments(['todo'])
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .on('end', done);
    });

    it('should be able to generate middleware', function() {
        assert.file([
            'app/middlewares/todo_middleware.js',
            'test/middlewares/todo_middleware_spec.js',
        ]);
    });

    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});