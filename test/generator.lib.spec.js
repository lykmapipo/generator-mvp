'use strict';

//dependencies
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var libGenerator = path.resolve(path.join(__dirname, '..', 'lib'));
var os = require('os');
var destDir;

describe('mvp:lib generator', function() {
    //spec for  lib generator
    before(function(done) {
        helpers.run(libGenerator)
            // .inDir(tmpPath) //I have been getting some errors lets us os.tmpdir
            .withArguments(['todo'])
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .on('end', done);
    });

    it('should be able to generate nodejs module', function() {
        assert.file([
            'app/libs/todo.js',
            'test/libs/todo_spec.js',
        ]);
    });

    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});