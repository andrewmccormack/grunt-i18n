


module.exports = function(grunt) {

    var path = require('path');
    var expat = require("node-expat");

    var DataLoader = function(grunt) {
    };

    DataLoader.prototype.resx = function(file) {
        var xml = grunt.file.read(file,  {endoding : "utf-8"});
        var parser = new expat.Parser("UTF-8");
        var resourceName, value;
        var data = {};
        parser.on('startElement', function(name, attrs){
            if(name === "data") {
                resourceName = attrs["name"];
                data[resourceName] = "";
                return;
            }
            if(name === "value"){
                return;
            }
            resourceName = "";
        });

        parser.on("text", function(text){
            if(resourceName !== "" && /\S/.test(text)) {
                data[resourceName] = text;
            }
        });

        var result = parser.parse(xml);
        if(!result){
            throw parser.getError();
        }
        return data;
    };

    DataLoader.prototype.json = function(file){
        return grunt.file.readJSON(file);
    };

    DataLoader.prototype.getData = function(filePath){
        var ext = path.extname(filePath);
        switch(ext){
            case ".json":
            case ".js":
                return this.json(filePath);
            case ".resx":
                return this.resx(filePath);
            default:
                throw new Error("No data loader for given file " + filePath);
        }
    };

    return new DataLoader(grunt);
};
