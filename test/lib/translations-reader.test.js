/**
 * Created by andrewmccormack on 06/05/2015.
 */
'use strict';

suite('translations-reader', function(){

    var proxyquire = require('proxyquire')
    var assert = require('assert');
    var grunt = require('grunt');
    var sinon = require('sinon');
    var _ = require('lodash');
    var data = {
        "ta": "a",
        "tb": "b",
        "tc": "c"
    };


    var dataLoaderFactory = {
        createDataLoader : function(filePath){
            return {
                getData : function(){
                    return data;
                }
            }
        }
    };

    var translationsLoader = require(process.cwd() + '/tasks/lib/translastions-reader.js');


    suite('load', function(){

        test('should not call callbacks when there are no translation files', function(){
            var translations = translationsLoader({files : []}, dataLoaderFactory);
            var success = sinon.mock().never();
            var error = sinon.mock().never();
            translations.load(success, error);
            success.verify();
            error.verify();
        });


        test('should  call callbacks when there is at least one translation file', function(){
            var resources = { files: ["en-gb.json"] };
            var translations = translationsLoader(resources, dataLoaderFactory);
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
            var translations = translationsLoader({ files : files }, dataLoaderFactory);
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

        test('should call error when invalid file translation file found', function(){
            var files = [ "fr-fr.json", "de.json", "en-029.json"];
            var translations = translationsLoader({ files: _.xor(files, ["invalid.json"])}, dataLoaderFactory);
            var success = sinon.spy();
            var error = sinon.spy();
            translations.load(success, error);

            var calls = success.getCalls();
            _.forEach(files, function(file){
                var result = _.find(calls, function(call){
                    return call.args[0].filename === file;
                });
                assert(result);
            });
            assert(error.called);
        });

        test('should call error when data cannot be loaded from file', function(){
            var files = [ "fr-fr.json", "de.json", "en-029.json"];
            var badloader = sinon.stub().throws(new Error("it doesn't work"));
            var translations = translationsLoader({ files : files }, badloader);
            var success = sinon.spy();
            var error = sinon.spy();
            translations.load(success, error);

            assert.equal(success.callCount, 0);
            assert.equal(error.callCount, files.length);

        });

    });
});