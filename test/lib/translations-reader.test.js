/**
 * Created by andrewmccormack on 06/05/2015.
 */
'use strict';

suite('translations-reader', function(){

    var proxyquire = require('proxyquire');
    var assert = require('assert');
    var grunt = require('grunt');
    var sinon = require('sinon');
    var grunt = require('grunt');
    var _ = require('lodash');
    var translationsLoader;
    var data = {
        "ta": "a",
        "tb": "b",
        "tc": "c"
    };

    setup(function(){
        translationsLoader =  proxyquire(
            process.cwd() +  '/tasks/lib/translastions-reader.js', {
                './data-loaders' : function() {
                    return {
                        getData: function (filePath) {
                            return data;
                        }
                    }
                }
           });
    });

    suite('load', function(){

        test('should not call callbacks when there are no translation files', function(){
            var translations = translationsLoader([]);
            var success = sinon.mock().never();
            var error = sinon.mock().never();
            translations.load(success, error);
            success.verify();
            error.verify();
        });

        test('should  call callbacks when there is at least one translation file', function(){
            var resources = ["en-gb.json"];
            var translations = translationsLoader(grunt, resources);
            var success = sinon.mock().withArgs({
                locale: "en-gb",
                    data : data,
                    filename: "en-gb.json"
            });
            var error = sinon.mock().never();
            translations.load(success, error);
            success.verify();
            error.verify();
        });

        test('should call success callback for each translation file', function(){
            var files = ["en-gb.json", "fr-fr.json", "de.json", "en-029.json"] ;
            var translations = translationsLoader(grunt, files);
            var success = sinon.spy();
            var error = sinon.mock().never();
            translations.load(success, error);

            var calls = success.getCalls();
            _.forEach(files, function(file){
                var result = _.find(calls, function(call){
                    return call.args[0].filename === file;
                });
                assert(result);
            });
            error.verify();
        });

    });
});