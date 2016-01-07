'use strict';

//dependencies
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var controllerGenerator = path.resolve(path.join(__dirname, '..', 'controller'));
var os = require('os');
var destDir;

describe('mvp:controller generator', function() {
    //spec for  controller generator
    before(function(done) {
        helpers.run(controllerGenerator)
            // .inDir(tmpPath) //I have been getting some errors lets us os.tmpdir
            .withArguments(['todo index edit'])
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .on('end', done);
    });

    it('should be able to generate controller', function() {
        assert.file([
            'app/controllers/todo_controller.js',
            'test/controllers/todo_controller_spec.js',
            'app/routers/todo_router.js',
            'test/routers/todo_router_spec.js'
        ]);
    });


    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});