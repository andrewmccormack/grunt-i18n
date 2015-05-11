/**
 * Created by andrewmccormack on 06/05/2015.
 */
'use strict';

suite('localised-file', function(){

    var assert = require('assert');
    var path = require('path');
    var sinon = require('sinon');
    var grunt = require('grunt');

    var cwd = process.cwd();
    var LocalisedFile = require(process.cwd() + '/tasks/lib/localised-file-factory.js');

    suite('getFile', function(){

        var testGetFileNameAndCheckResults =  function(localisedFile, tests){
            tests.forEach(function(test){
                assert.equal(
                    localisedFile.getFileName( test.args[0] ,test.args[1]),
                    path.join(cwd, test.expected)
                );
            });
        };

        test('should use the default template no options passed', function(){
            var tests = [
                { args: ["index.html", "en-gb"], expected : "index.en-gb.html" },
                { args: ["app/index.js", "de"], expected : "index.de.js" },
                { args: ["index.html", "en-gb"], expected : "index.en-gb.html" }
            ];
            var localisedFile = new LocalisedFile(grunt,{});
            testGetFileNameAndCheckResults(localisedFile, tests);
        });

        test('should prepend the output directory when the output directory ', function(){
            testGetFileNameAndCheckResults(
                LocalisedFile(grunt, {dir : "dist"}),
                [
                    { args: ["index.html", "en-gb"], expected : "dist/index.en-gb.html" },
                    { args: ["app/index.js", "de"], expected : "dist/index.de.js" },
                    { args: ["index.html", "en-gb"], expected : "dist/index.en-gb.html" }
                ]
            );
        });

        test('should use the out format passed in the options', function(){
            testGetFileNameAndCheckResults(
                LocalisedFile(grunt, { format: "dist/{locale}/{filename}"}),
                [
                    { args: ["index.html", "en-gb"], expected : "dist/en-gb/index.html" },
                    { args: ["app/index.js", "de"], expected : "dist/de/index.js" },
                    { args: ["index.html", "en-gb"], expected : "dist/en-gb/index.html" }
                ]
            );
        });

        test('should add the extension at the end irrespective of the position of locale placeholder', function(){
            testGetFileNameAndCheckResults(
                LocalisedFile(grunt, { format: "dist/{filename}-{locale}"}),
                [
                    { args: ["index.html", "en-gb"], expected : "dist/index-en-gb.html" },
                    { args: ["app/index.js", "de"], expected : "dist/index-de.js" },
                    { args: ["index.html", "en-gb"], expected : "dist/index-en-gb.html" }
                ]
            );
        });
    });

    suite('createFile', function() {
        var translations = {
            "locale" : "en-gb",
            "filename" : "index.html",
            "data" : {
                'ta': "Hello",
                'tb': "World",
                'tc': "There"
            }
        };

        test("should throw error if no translations are passed", function(){
            var localisedFile = LocalisedFile(grunt, {});
            assert.throws(function() {
                localisedFile.createFiles(null);
            });
        });

        test("should not create any files if there are no templates passed", function(){
            var fileMock = sinon.mock(grunt.file);
            fileMock.expects("read").never();
            fileMock.expects("write").never();

            var localisedFile = LocalisedFile(grunt, { files : []});
            localisedFile.createFiles(translations);
            fileMock.verify();
        });

        test("should write the template output if templates are passed", function(){
            var localisedFile = LocalisedFile(grunt, {
                files: ["index.html"]
            });

            sinon.stub(grunt.file, "read", function(){
                return "<%= ta %> <%= tb %>!"
            });

            var mock = sinon.mock(grunt.file).expects("write").withArgs(
                path.join(process.cwd(), "index.en-gb.html"),
                "Hello World!"
            );

            localisedFile.createFiles(translations);
            mock.verify();
        });




    });


});
