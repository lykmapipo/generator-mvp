'use strict';
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var appPath = path.resolve(path.join(__dirname, '../app'));
var tmpPath = path.resolve(path.join(__dirname, '../tmp'));
var os = require('os');
var destDir;

describe('mvp:app', function() {
    before(function(done) {
        helpers.run(appPath)
            // .inDir(tmpPath)
            .withOptions({
                'skip-install': true
            })
            .withPrompt({
                someOption: true
            })
            .on('ready', function(generator) {
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .on('end', done);
    });

    it('creates files', function() {
        assert.file([
            'bower.json',
            'package.json',
            '.editorconfig',
            '.jshintrc'
        ]);
    });

    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});