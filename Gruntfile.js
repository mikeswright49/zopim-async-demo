'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            options:{
                target: 'es5'
            },
            default: {
                src: ["app/**/*.ts", "!node_modules/**/*.ts"],
                dest: 'dist/'
            }
        },
        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',

                    //optional: always get from HEAD
                    latest: false,

                    // specify config file
                    config: './tsd.json'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    keepalive: true
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-tsd');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask("default", ['tsd', 'ts', 'connect']);
};