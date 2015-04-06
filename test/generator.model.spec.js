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
            .withArguments(['todo complete:Boolean created:Date task:String'])
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .on('end', done);
    });

    it('should run', function() {
        console.log('model generator runned');
    });



    //lets clean os tmp dir
    // after(function(done) {
    //     rm(destDir, done);
    // });
});