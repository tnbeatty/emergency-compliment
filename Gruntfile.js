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
                tasks: ['compass:styles', 'concat:styles']
            },
            gumby: {
                files: ['bower_components/gumby/sass/_custom.scss', 'bower_components/gumby/sass/_settings.scss'],
                tasks: ['compass', 'concat:styles']
            },
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['concat:scripts']
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
        compass: {
            gumby: {
                options: {
                    require: ['modular-scale', 'sassy-math'],
                    sassDir: 'bower_components/gumby/sass',
                    cssDir: 'tmp/css',
                    environment: 'production'
                }
            },
            styles: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'tmp/css',
                    environment: 'production'
                }
            }
        },
        concat: {
            styles: {
                options: {
                    stripBanners: true
                },
                files: {
                    'site/css/styles.css': [
                        'tmp/css/gumby.css',
                        'tmp/css/styles.css'
                    ]
                }
            },
            scripts: {
                options: {
                    stripBanners: true
                },
                files: {
                    'site/js/main.js': ['src/js/main.js']
                }
            },
            gumbyjs: {
                options: {
                    separator: ';',
                },
                files: {
                    'site/js/gumby.min.js': [
                        'bower_components/gumby/js/libs/gumby.min.js'
                    ],
                    'site/js/modernizr.js': [
                        'bower_components/gumby/js/libs/modernizr-2.6.2.min.js'
                    ]
                }
            }
        },
        copy: {
            entypo: {
                expand: true,
                cwd: 'bower_components/gumby/fonts/icons',
                src: ['**'],
                dest: 'site/fonts/icons'
            }
        },
        clean: {
            site: {
                src: ['site']
            }
        },
        exec: {
            deploydev: 'git subtree push --prefix site origin gh-pages'
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('build', [
        'clean',
        'jade',
        'compass',
        'copy',
        'concat'
    ]);

    grunt.registerTask('serve', ['build', 'connect', 'watch']);
    grunt.registerTask('deploydev', ['build', 'exec:deploydev']);
    grunt.registerTask('publish', ['deploydev']);

    grunt.registerTask('default', 'build');
};
