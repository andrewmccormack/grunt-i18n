/**
 * Created by AndrewMcCormack on 06/05/2015.
 */
'use strict';


module.exports = function(grunt, options) {

    var _ = require('lodash');
    var fs = require('fs');
    var path = require('path');

    options =_.defaults(options, {
        translations: [],
        templates: [],
        outputDir: "",
        outputFormat: "{filename}.{locale}.{ext}",
        onError: function(error) {
                grunt.log.write("Failed to generate file: " + error.message);
        }
    });

    function LocalisedFile(options){
        this.files = grunt.files;
        this.outputDir = options.outputDir;
        this.outputFormat = options.outputFormat;
        this.onError = options.onError;
    }

    LocalisedFile.prototype.onError = function(error){
        grunt.log.write("Failed to generate file")
    };

    LocalisedFile.prototype.getFileName = function(file, locale){
        var outDir = path.join(process.cwd(), this.outputDir);
        var ext = path.extname(file);
        var filename = path.basename(file, ext);
        var outputFile = this.outputFormat
            .replace("{locale}", locale)
            .replace("{filename}", filename)
            .replace("{ext}", ext);

        return path.join(outDir, outputFile);
    };

    LocalisedFile.prototype.createFiles = function(translations, callback){

        var self = this;
        if(!translations){
            throw new Error("translations data not provided");
        }

        callback = callback || _.noop;
        _.forEach(this.templates, function(template){
            var templateString = grunt.file.read(template);
            var outputFile = self.getFileName(template,translations.locale);
            var content = grunt.template.process(templateString, { data : translations.data });

            callback({
                content: content,
                file: outputFile
            });
            grunt.file.write(outputFile, content);
        });
    };

    return new LocalisedFile(options);
};
