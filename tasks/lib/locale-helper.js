
'use strict';

module.exports = function(defaultLocale){

    var path = require('path');
    var localePattern = '[a-z]{2,3}(?![a-z])([-_]([a-z]{2,5}|[0-9]{3}))?([-_][a-z]{2})?';

    function LocaleHelper(pattern, defaultLocale) {
        this.pattern = pattern;
        this.defaultLocale = defaultLocale;
    }

    LocaleHelper.prototype.isValidLocale = function(locale){
        var regex = new RegExp(this.pattern, "i"),
            result =  regex.exec(locale);
        return result && result[0].length === locale.length;
    };

    /*Assumes file name is of the format blah.{locale}.{ext}*/
    LocaleHelper.prototype.getLocale = function(filename){
        var ei, li, locale,
            basename = path.basename(filename);
        ei = basename.lastIndexOf('.');
        if(ei === -1){
            return this.defaultLocale;
        }
        li = basename.lastIndexOf('.', ei - 1);
        locale = basename.substring(li + 1, ei).toLowerCase();
        return this.isValidLocale(locale) ? locale : this.defaultLocale;
    };

    return new LocaleHelper(localePattern, defaultLocale || 'en-gb');
};