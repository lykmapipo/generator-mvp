'use strict';
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var modelGenerator = path.resolve(path.join(__dirname, '..', 'model'));
var os = require('os');
var destDir;

describe('vp:model generator', function() {
    //spec for  model generator
    before(function(done) {
        helpers.run(modelGenerator)
            // .inDir(tmpPath) //I have been getting some errors lets us os.tmpdir
            .withArguments(['todo complete:Boolean created:Date task:String task:Array:String comments:Mixed author:ObjectId:User'])
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .on('end', done);
    });

    it('it should be able to generate application model', function() {
        assert.file([
            'app/models/todo_model.js',
            'test/models/todo.spec.js'
        ]);
    });


    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});