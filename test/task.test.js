/**
 * Created by andrewmccormack on 06/05/2015.
 */
'use strict';

suite('grunt-i18n-template config', function() {

    var path = require('path');
    var _ = require('lodash');
    var assert = require('assert');

    var tasksDir = path.join(process.cwd(), "tasks");
    var expectedDir = path.join((process.cwd(), "test/expected/"));
    var tempDir = path.join((process.cwd(), "test/temp"));

    test('when the config has a single value', function() {



        var grunt = require('grunt');

        grunt.file.delete(tempDir);
        grunt.initConfig({
            'i18n-template': {
                resources: {
                    files: ['test/data/resources/**.js']
                },
                output: {
                    files: ['test/fixtures/singleTarget/index.html'],
                    dir: 'test/temp/',
                    format: '{filename}.{locale}'
                }
            }
        });
        grunt.loadTasks(tasksDir);
        grunt.registerTask('default', ['i18n-template']);
        grunt.task.run('default');

        var dir = path.join(expectedDir, 'singleTarget');
        grunt.file.recurse(dir, function(abspath, root, subdir, filename){
            assert(grunt.file.exists(tempDir, filename));
        });

    });


});