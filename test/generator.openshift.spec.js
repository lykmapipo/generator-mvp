'use strict';

//dependencies
var path = require('path');
var rm = require('rimraf');
var yg = require('yeoman-generator');
var assert = yg.assert;
var helpers = yg.test;
var openshiftGenerator = path.resolve(path.join(__dirname, '..', 'openshift'));
var os = require('os');
var destDir;

describe('mvp:openshift generator', function() {
    //spec for  openshift generator
    before(function(done) {
        helpers.run(openshiftGenerator)
            // .inDir(tmpPath) //I have been getting some errors lets us os.tmpdir
            .on('ready', function(generator) {
                //reference destination dir 
                //for later clean ups
                destDir = path.join(os.tmpdir(), generator.appname);
            })
            .withGenerators([openshiftGenerator])
            .on('end', done);
    });

    it('should be able to generate openshift nodejs pre start action hook and configuration files', function() {
        assert.file([
            '.openshift/action_hooks/pre_start_nodejs',
            'config/production.js',
            'server.js'
        ]);
    });

    //lets clean os tmp dir
    after(function(done) {
        rm(destDir, done);
    });
});
