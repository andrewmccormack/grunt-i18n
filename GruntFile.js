/**
 * Created by andrewmccormack on 06/05/2015.
 */
module.exports = function(grunt) {

    var path = require('path');

    require('load-grunt-config')(grunt,{
        configPath: path.join(process.cwd(), 'grunt'),
        loadGruntTasks: {
            pattern: ['grunt-*']
        }
    });
};