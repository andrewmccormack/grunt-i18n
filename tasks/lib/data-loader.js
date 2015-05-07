'use strict';
var _ = require('lodash'),
    fs = require('fs'),

module.exports = function(files, dataloader){

    var JsonDataLoader = function(filePath) {
        var file = fs.readFileSync(filePath);
        var json = require('json');
        return json.parse(file);
    };


    var localeHelper = require('./locale-helper')();
    dataloader = dataloader || JsonDataLoader;

    function TranslationFileReader(files, dataloader){
        this.files = files;
        this.dataloader = dataloader;
    };

    TranslationFileReader.prototype.load = function(success, error) {
        var self = this;
        success = success || _.noop();
        error = error || function(ex) { throw ex; };
        _.forEach(this.files, function(file) {
            try {
                var locale = localeHelper.getLocale(file, self.template);
                var data = self.dataloader(file);
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

    return new TranslationFileReader(files, dataloader || JsonDataLoader);

};