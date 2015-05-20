/**
 * Created by andrewmccormack on 06/05/2015.
 */
module.exports = function(grunt) {

    var path = require('path');


    grunt.initConfig({
        jshint: {
            all: [
                'GruntFiles.js',
                'tasks/**/*.js',
                'test/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        simplemocha: {
            options: {
                reporter: "spec",
                ui: "tdd"
            },
            all : {
                "src": ["test/**/*.test.js"]
            }
        },
        watch: {
            dev: {
                files: ['tasks/**/*.js','test/**/.js'],
                tasks: ['test']
            }
        },
        'i18n-template' : {
            'default': {
                options: {
                    outputDir : 'test/temp/default'
                },
                translations: ["test/data/default/resources/**/*.js"],
                templates: ["test/data/default/templates/**/*.html"]
            },
            resxFiles :{
                options: {
                    outputDir : 'test/temp/resxFiles'
                },
                translations: ["test/data/resxFiles/resources/*.resx"],
                templates: ["test/data/resxFiles/templates/**/*.html"]
            }
        }

    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('default', ['jshint', 'test']);




};