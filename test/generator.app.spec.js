'use strict';

//dependencies
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

    it('should be able to generate application projectfiles', function() {
        assert.file([
            'package.json',
            'bower.json',
            '.editorconfig',
            '.jshintrc',
            '.bowerrc',
            '.gitignore',
            '.gitattributes',
            '.travis.yml',
            '.yo-rc.json',
            'Gruntfile.js',
            'README.md'
        ]);
    });

    it('should be able to generate application directory structure', function() {
        assert.file([
            'config',
            'app/initializers',
            'app/models',
            'app/models/.gitkeep',
            'app/locals',
            'app/routers',
            'app/routers/.gitkeep',
            'app/controllers',
            'app/controllers/.gitkeep',
            'app/views',
            'test/models',
            'test/locals',
            'test/routers',
            'test/controllers',
            'test/intergration',
        ]);
    });


    it('should be able to generate application configuration files', function() {
        assert.file([
            'config',
            'config/default.js',
            'config/development.js',
            'config/production.js',
            'config/test.js',
        ]);
    });

    it('should be able to generate application view files', function() {
        assert.file([
            'app/views/errors.html',
            'app/views/site.html',
            'app/views/layout.html',
            'app/views/_partials/_errors.html'
        ]);
    });

    it('should be able to generate application locals files', function() {
        assert.file([
            'app/locals/application_locals.js'
        ]);
    });

    it('should be able to generate application site files', function() {
        assert.file([
            'app/controllers/site_controller.js',
            'app/routers/site_router.js',
            'app/views/site/index.html'
        ]);
    });

    it('should be able to generate test bootstrap file', function() {
        assert.file([
            'test/bootstrap_spec.js'
        ]);
    });

    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});