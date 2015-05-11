/**
 * Created by AndrewMcCormack on 06/05/2015.
 */
'use strict';

module.exports = function(grunt, options) {

    var _ = require('lodash');
    var fs = require('fs');
    var path = require('path');

    options = _.defaults(options, {
        files : [],
        dir : "",
        format: "{filename}.{locale}"
    });

    function LocalisedFile(options){
        this.templates = options.files;
        this.outputDir = options.dir;
        this.outputFormat = options.format;
    };

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
            + ext;

        return path.join(outDir, outputFile);
    };

    LocalisedFile.prototype.createFiles = function(translations, callback, error){

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
