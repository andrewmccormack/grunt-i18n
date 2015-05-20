/**
 * Created by AndrewMcCormack on 05/05/2015.
 */
'use strict';
module.exports = function(grunt) {

    grunt.registerMultiTask('i18n-template', 'Generated translated files', function(){

        var dataLoaderFactory = require("./lib/data-loaders")(grunt);
        var translastionsReader = require('./lib/translastions-reader');
        var localisedFileFactory = require('./lib/localised-file-factory');

        var options = this.options({
            outputDir : 'dist',
            outputFormat : '{filename}.{locale}',
            inputFormat: "{locale}.{ext}",
            defaultLocale: "en-gb"
        });

        if(grunt.option('debug')) {
            grunt.log.debug(options);
        }

        var success = function(result){
            grunt.log.ok('file for locale ' + result.locale + ' created: ' + result.file);
        };
        var error = function(ex) {
            grunt.log.error(ex.message);
        };


        var translations = this.data.translations || [];
        var templates = this.data.templates || [];
        var translationFiles = grunt.file.expand({ filter : 'isFile' } , translations);
        var templateFiles = grunt.file.expand({filer: 'isFile'}, templates);

        var localisedFiles = localisedFileFactory(grunt, templateFiles, options);

        translastionsReader(grunt, translationFiles, options).load(function(data){
                localisedFiles.createFiles(data, success, error);
            },
            error
        );



    });

};