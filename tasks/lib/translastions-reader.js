'use strict';

module.exports = function(resources, dataLoaderFactory){

    var _ = require('lodash');
    var localeHelper = require('./locale-helper')();

    function TranslationFileReader(files){
        this.files = files;
    };

    TranslationFileReader.prototype.load = function(success, error) {
        var self = this;
        success = success || _.noop();
        error = error || function(ex) { throw ex; };
        _.forEach(this.files, function(file) {
            try {
                var locale = localeHelper.getLocale(file, self.template);
                var dataLoader = dataLoaderFactory.createDataLoader(file);
                var data = dataLoader.getData();
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
    return new TranslationFileReader(resources.files);
};