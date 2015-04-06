'use strict';
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var appGenerator = path.resolve(path.join(__dirname, '..', 'app'));
var os = require('os');
var destDir;

describe('mvp:app generator', function() {
    before(function(done) {
        helpers.run(appGenerator)
            // .inDir(tmpPath) //I have been getting some errors lets us os.tmpdir
            .withOptions({
                'skip-install': true
            })
            .withPrompt({
                applicationName: 'mvp',
                applicationVersion: '0.1.0',
                applicationDescription: 'A best application ever',
                databaseName: 'mvp',
                databaseHost: 'localhost',
                databaseUser: '',
                databasePassword: '',
                databasePort: 27017
            })
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .on('end', done);
    });

    it('it should be able to generate application projectfiles', function() {
        assert.file([
            'package.json',
            'bower.json',
            '.editorconfig',
            '.jshintrc',
            '.gitignore',
            '.gitattributes',
            '.travis.yml',
            'README.md'
        ]);
    });

    it('it should be able to generate application files', function() {
        assert.file([
            'app/application.js',
            'config/mongoose.js',
            'app/models',
            'app/routers',
            'app/controllers'
        ]);
    });

    it('it should be able to generate application configuration files', function() {
        assert.file([
            'config',
            'config/mongoose.js',
        ]);
    });

    it('it should be able to generate application view files', function() {
        assert.file([
            'app/views',
            'app/views/errors.html',
            'app/views/site.html'
        ]);
    });

    it('it should be able to generate application locals files', function() {
        assert.file([
            'app/locals',
            'app/locals/application_locals.js',
        ]);
    });

    it('it should be able to generate application site files', function() {
        assert.file([
            'app/controllers/site_controller.js',
            'app/routers/site_router.js',
            'app/views/site/index.html'
        ]);
    });

    it('it should be able to generate application test files', function() {
        assert.file([
            'test/locals',
            'test/models',
            'test/controllers',
            'test/routers',
            'test/intergration'
        ]);
    });


    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});