
module.exports = function(grunt) {

    var _ = require('lodash'),
        path = require('path'),
        fs = require('fs');

    var JsonDataLoader = function (filePath) {
        this.file = filePath;
    };

    JsonDataLoader.prototype.getData = function(){
        return grunt.file.readJSON(this.file);
    };

    var DataLoaderFactory = function() {
    };

    DataLoaderFactory.prototype.createDataLoader = function(filePath){
        var ext = path.extname(filePath);

        switch(ext){
            case ".json":
            case ".js":
                return JsonDataLoader();
            defaults:
                throw new Error("No data loader for given file " + filepath);
        }
    };

    return DataLoaderFactory();
};
