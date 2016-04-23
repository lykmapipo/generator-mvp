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
            'production.json',
            '.editorconfig',
            '.jshintrc',
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
            'app/routers',
            'app/routers/.gitkeep',
            'app/controllers',
            'app/controllers/.gitkeep',
            'app/middlewares',
            'app/middlewares/.gitkeep',
            'app/libs',
            'app/libs/.gitkeep',
            'app/views',
            'test/models',
            'test/routers',
            'test/controllers',
            'test/middlewares',
            'test/libs',
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
            'app/views/emails/confirm/html.ejs',
            'app/views/emails/recover/html.ejs',
            'app/views/emails/unlock/html.ejs'
        ]);
    });

    it('should be able to generate application app files', function() {
        assert.file([
            'app/controllers/application_controller.js',
            'app/routers/application_router.js',
            'app/middlewares/jwtAuth.js'
        ]);
    });


    it('should be able to generate application initialize files', function() {
        assert.file([
            'app/initializers/mongoose.js',
            'app/initializers/winston.js'
        ]);
    });

    it('should be able to generate application auth and libs files', function() {
        assert.file([
            'app/libs/mongoose/list.js',
            'app/libs/mongoose/setter.js',
            'app/libs/jwt.js',
            'app/libs/mailer.js',
            'app/models/party_model.js'
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