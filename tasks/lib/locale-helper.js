
'use strict';

module.exports = function(){

    var localePattern = '[a-z]{2,3}(?![a-z])([-_]([a-z]{2,5}|[0-9]{3}))?([-_][a-z]{2})?';
    function LocaleHelper(pattern) {
        this.pattern = pattern;
    }

    LocaleHelper.prototype.isValidLocale = function(locale){
        var regex = RegExp(this.pattern, "i"),
            result =  regex.exec(locale);

        return result && result[0].length == locale.length;
    };

    LocaleHelper.prototype.getLocale = function(filename, template){
        template = template || "^{locale}.{ext}$";
        var pattern = template
                .replace("{locale}", '(' + this.pattern + ')')
                .replace("{ext}", '([a-z]{1,5})'),
            regex = RegExp(pattern, "i"),
            result = regex.exec(filename);

        if(!result){
            throw new Error("Unable to ascertain locale from file " + filename);
        }

        return result[1].toLowerCase();
    };

    return new LocaleHelper(localePattern);
}