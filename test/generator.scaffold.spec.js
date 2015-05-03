'use strict';

//dependencies
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var modelGenerator = path.resolve(path.join(__dirname, '..', 'model'));
var scaffoldGenerator = path.resolve(path.join(__dirname, '..', 'scaffold'));
var os = require('os');
var destDir;

describe('mvp:api generator', function() {
    //spec for  model generator
    before(function(done) {
        helpers.run(scaffoldGenerator)
            // .inDir(tmpPath) //I have been getting some errors lets us os.tmpdir
            .withArguments(['todo complete:Boolean created:Date task:String task:Array:String comments:Mixed author:ObjectId:User'])
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .withGenerators([modelGenerator])
            .on('end', done);
    });

    it('it should be able to generate model', function() {
        assert.file([
            'app/models/todo_model.js',
            'test/models/todo_model_spec.js'
        ]);
    });

    it('it should be able to generate controller', function() {
        assert.file([
            'app/controllers/todo_controller.js',
            'test/controllers/todo_controller_spec.js'
        ]);
    });

    it('it should be able to generate router', function() {
        assert.file([
            'app/routers/todo_router.js',
            'test/routers/todo_router_spec.js'
        ]);
    });

    it('it should be able to generate views', function() {
        assert.file([
            'app/views/todos/_form.html',
            'app/views/todos/show.html',
            'app/views/todos/edit.html',
            'app/views/todos/new.html',
            'app/views/todos/index.html'
        ]);
    });

    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});