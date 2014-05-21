'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'site/',
                    // keepalive: true
                }
            }
        },
        watch: {
            jade: {
                files: ['src/**/*.jade'],
                tasks: ['jade']
            },
            compass: {
                files: ['src/**/*.sass', 'src/**/*.scss'],
                tasks: ['compass']
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.jade',
                    dest: 'site/',
                    ext: '.html'
                }]
            },
        },
        // compass: {
        //
        // },
        // clean: {
        //
        // }

    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', ['jade']);

    grunt.registerTask('serve', ['connect', 'watch']);

    grunt.registerTask('default', 'build');
};
