/**
 * Created by andrewmccormack on 06/05/2015.
 */
'use strict';

suite('grunt-i18n-template config', function() {

    var _ = require('lodash');
    var path = require('path');
    var assert = require('assert');
    var fs = require('fs');
    var execSync = require('child_process').exec;
    var execOptions = {
        cwd: path.join(__dirname, '..')
    };

    function executeGruntTaskWithConfig(configName, callback){

        var expected = path.join(process.cwd(), "test/expected/", configName);
        var temp = path.join(process.cwd(), "test/temp", configName);
        var child = exec('grunt i18n-template:'  + configName, execOptions);

        child.on("exit", function(){
            fs.readdir(temp, function (err, files) {
                _.forEach(files, function (file) {
                    var expectedFile = path.join(expected, file);
                    fs.readFile(expectedFile, function (err, data) {
                        var expecteFile = path.join(expected, file);
                        var expectedData = fs.readFileSync(expecteFile);
                        assert.deepEqual(data, expectedData);
                    });
                });
            });
        });

    }



    test('when the config has a single value', function() {
        executeGruntTaskWithConfig('default');
    });


});