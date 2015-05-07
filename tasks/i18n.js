/**
 * Created by AndrewMcCormack on 05/05/2015.
 */
'use strict';


module.exports = function(grunt) {


    gtunt.registerMultiTask('i18n-template', 'Generated translated files', function(){

        var dataLoader = require('./lib/data-loader');
        var localisedFile = require('./lib/localised-file');

        var options = this.options({
            translations: [],
            templates: [],
            output : {
                dir : 'dist',
                format: '{filename}.{locale}.{ext}'
            }
        });
    });



}