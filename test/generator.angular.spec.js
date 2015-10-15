'use strict';

//dependencies
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var modelGenerator = path.resolve(path.join(__dirname, '..', 'model'));
var angularGenerator = path.resolve(path.join(__dirname, '..', 'angular'));
var os = require('os');
var destDir;

describe('mvp:angular generator', function() {
    //spec for  model generator
    before(function(done) {
        helpers.run(angularGenerator)
            // .inDir(tmpPath) //I have been getting some errors lets us os.tmpdir
            .withArguments(['note complete:Boolean created:Date task:String'])
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .withGenerators([modelGenerator])
            .on('end', done);
    });

    it('should be able to generate factory', function() {
        assert.file([
            'app/scripts/services/note.js',
        ]);
    });

    it('should be able to generate states', function() {
        assert.file([
            'app/scripts/states/note.js',
        ]);
    });

    it('should be able to generate controller', function() {
        assert.file([
            'app/scripts/controllers/notes/create.js',
            'app/scripts/controllers/notes/edit.js',
            'app/scripts/controllers/notes/index.js',
            'app/scripts/controllers/notes/main.js',
            'app/scripts/controllers/notes/show.js',
        ]);
    });

    it('should be able to generate controller test', function() {
        assert.file([
            'test/spec/controllers/notes/create.js',
            'test/spec/controllers/notes/edit.js',
            'test/spec/controllers/notes/index.js',
            'test/spec/controllers/notes/main.js',
            'test/spec/controllers/notes/show.js',
        ]);
    });


    it('should be able to generate views', function() {
        assert.file([
            'app/views/notes/_form.html',
            'app/views/notes/show.html',
            'app/views/notes/edit.html',
            'app/views/notes/main.html',
            'app/views/notes/create.html',
            'app/views/notes/index.html'
        ]);
    });

    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});