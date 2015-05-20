'use strict';

module.exports = function(grunt, files, options){

    options = options || { defaultLocale : "en-gb"};
    var _ = require('lodash');
    var dataloader = require('./data-loaders')(grunt);
    var localeHelper = require('./locale-helper')(options.defaultLocale);

    function TranslationFileReader(files, template){
        this.files = files;
        this.template = template
    }

    TranslationFileReader.prototype.load = function(success, error) {
        var self = this;
        success = success || _.noop();
        error = error || function(ex) { throw ex; };
        _.forEach(this.files, function(file) {
            try {
                var locale = localeHelper.getLocale(file);
                var data = dataloader.getData(file);
                success({
                    locale: locale,
                    data: data,
                    filename: file
                });
            } catch (ex) {
                error(ex);
            }
        });
    };
    return new TranslationFileReader(files, options.fileFormat);
};