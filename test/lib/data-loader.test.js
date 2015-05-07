/**
 * Created by andrewmccormack on 06/05/2015.
 */
'use strict';

suite('translations-loader', function(){

    var assert = require('assert');
    var sinon = require('sinon');
    var _ = require('lodash');
    var data = {
        "ta": "a",
        "tb": "b",
        "tc": "c"
    };
    var dataloader = sinon.stub().returns(data);
    var translationsLoader = require(process.cwd() + '/tasks/lib/data-loader.js');


    suite('load', function(){

        test('should not call callbacks when there are no translation files', function(){
            var translations = translationsLoader([]);
            var success = sinon.mock().never();
            var error = sinon.mock().never();
            translations.load(success, error);
            success.verify();
            error.verify();
        });


        test('should  call callbacks when there is at least one  translation file', function(){
            var files = ["en-gb.json"];
            var translations = translationsLoader(files, dataloader);
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
            var files = ["en-gb.json", "fr-fr.json", "de.json", "en-029.json"];
            var translations = translationsLoader(files, dataloader);
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
            var translations = translationsLoader(_.xor(files, ["invalid.json"]), dataloader);
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
            var translations = translationsLoader(files, badloader);
            var success = sinon.spy();
            var error = sinon.spy();
            translations.load(success, error);

            assert.equal(success.callCount, 0);
            assert.equal(error.callCount, files.length);

        });

    });
});