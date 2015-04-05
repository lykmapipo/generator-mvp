'use strict';
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var appPath = path.resolve(path.join(__dirname, '../app'));
var os = require('os');
var destDir;

describe('mvp:app', function() {
    before(function(done) {
        helpers.run(appPath)
            // .inDir(tmpPath) //I have been getting some errors lets us os.tmpdir
            .withOptions({
                'skip-install': true
            })
            .withPrompt({
                applicationName: 'mvp',
                applicationVersion: '0.1.0',
                applicationDescription: 'A best application ever'
            })
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .on('end', done);
    });

    it('it should be able to generate package.json', function() {
        assert.file([
            'package.json'
        ]);
    });

    it('it should be able to generate bower.json', function() {
        assert.file([
            'bower.json'
        ]);
    });

    it('it should be able to generate .editorconfig, .jshintrc, .gitignore and .gitattributes', function() {
        assert.file([
            '.editorconfig',
            '.jshintrc',
            '.gitignore',
            '.gitattributes'
        ]);
    });

    //lets clean os tmp dir
    // after(function(done) {
    //     rm(destDir, done);
    // });
});