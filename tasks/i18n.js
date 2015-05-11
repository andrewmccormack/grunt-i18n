/**
 * Created by AndrewMcCormack on 05/05/2015.
 */
'use strict';


module.exports = function(grunt) {

    var _ = require("lodash");

    gtunt.registerMultiTask('i18n-template', 'Generated translated files', function(){

        var dataLoaderFactory = require("./lib/data-loaders")(grunt);
        var translastionsReader = require('./lib/translastions-reader');
        var localisedFileFactory = require('./lib/localised-file-factory');

        var options = this.options({
            resources: {
                files: []
            },
            output : {
                files : [],
                dir : 'dist',
                format: '{filename}.{locale}'
            },
            success : function(content, file){
                grunt.verbose.write(file + " created");
            },
            error : function(ex) {
                grunt.log.error(ex.message);
            }
        });

        if(grun.option('debug')) {
            grunt.log.debug(options);
        }

        var localisedFiles = localisedFileFactory(grunt, options.output);
        var reader = translastionsReader(options.resources, dataLoaderFactory);
            reader.load(function(data){
                localisedFiles.createFiles(data, options.success, options.error);
            },
            options.error
        );

    });



}