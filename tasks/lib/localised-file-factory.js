/**
 * Created by AndrewMcCormack on 06/05/2015.
 */
'use strict';

module.exports = function(grunt, templates, options) {

    var _ = require('lodash');
    var path = require('path');
    options = _.defaults(options || {}, {
        outputDir : "",
        outputFormat: "{filename}.{locale}"
    });

    function LocalisedFile(templates, options){
        this.templates = templates;
        this.outputDir = options.outputDir;
        this.outputFormat = options.outputFormat;
    }

    LocalisedFile.prototype.error = function(error){
        grunt.log.write("Failed to generate file");
        throw error;
    };

    LocalisedFile.prototype.getFileName = function(file, locale){
        var outDir = path.join(process.cwd(), this.outputDir);
        var ext = path.extname(file);
        var filename = path.basename(file, ext);
        var outputFile = this.outputFormat
            .replace("{locale}", locale)
            .replace("{filename}", filename) + ext;

        return path.join(outDir, outputFile);
    };

    LocalisedFile.prototype.createFiles = function(translations, callback, error){

        var self = this;
        if(!translations){
            throw new Error("translations data not provided");
        }

        callback = callback || _.noop;
        error = error || this.error;
        _.forEach(this.templates, function(template){
            try {
                var templateString = grunt.file.read(template);
                var outputFile = self.getFileName(template, translations.locale);
                var content = grunt.template.process(templateString, {data: translations.data});

                callback({
                    locale: translations.locale,
                    content: content,
                    file: outputFile
                });
                grunt.file.write(outputFile, content);
            }
            catch (ex)
            {
                error(ex);
            }
        });
    };

    return new LocalisedFile(templates || [], options);
};
