module.exports = function (grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        path: {
            css: 'dist/css/',
            fonts: 'dist/fonts/',
            img: 'dist/img/',
            js: 'dist/js/',
            html: 'dist/',
            sass: 'source/sass/',
            fontssrc: 'source/fonts/',
            imgsrc: 'source/img/',
            jssrc: 'source/js/',
            htmlsrc: 'source/'
        },
        //Watch Task
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: '<%= path.sass %>**/*.scss',
                tasks: ['compass:compile']
            },
            html: {
                files: '<%= path.htmlsrc %>**/*.html',
                tasks: ['htmlmin:allhtml']
            },
            js: {
                files: '<%= path.jssrc %>**/*.js',
                tasks: ['copy:alljs', 'uglify:myjs']
            },
            img: {
                files: '<%= path.htmlsrc %>**/*.{jpg,gif,png}',
                tasks: ['imagemin:allimg']
            }
        },
        //Clean Task
        clean: {
            build: ['dist/']
        },
        //Copy Task
        copy: {
            alljs: {
                expand: true,
                cwd: '<%= path.jssrc %>',
                src: '**/*.js',
                dest: '<%= path.js %>'
            },
            allcss: {
                expand: true,
                cwd: '<%= path.sass %>',
                src: '**/*.css',
                dest: '<%= path.css %>'
            },
            allfonts: {
                expand: true,
                cwd: '<%= path.fontssrc %>',
                src: '**/*.*',
                dest: '<%= path.fonts %>'
            }
        },
        //Compass Task
        compass: {
            compile: {
                options: {
                    sassDir: '<%= path.sass %>',
                    cssDir: '<%= path.css %>',
                    imageDir: '<%= path.imgsrc %>',
                    environment: 'development',
                    outputStyle: 'compact',
                    noLineComments: true,
                    relativeAssets: true
                }
            }
        },
        //Imagemin Task
        imagemin: {
            allimg: {
                files: [{
                    expand: true,
                    cwd: '<%= path.imgsrc %>',
                    src: ['**/*.{png,jpg}'],
                    dest: '<%= path.img %>'
                }]
            }
        },
        //Htmlmin Task
        htmlmin: {
            options: {
                force: true,
                removeScriptTypeAttributes: true,
                removeComments: true,
                collapseWhitespace: false
            },
            allhtml: {
                files: [{
                    expand: true,
                    cwd: '<%= path.htmlsrc %>',
                    src: '**/**/*.html',
                    dest: '<%= path.html %>'
                }]
            }
        },
        //uglify
        uglify: {
            options: {
                mangle: false,
                compress: true
            },
            myjs: {
                files: [{
                    expand: true,
                    cwd: '<%= path.jssrc %>',
                    src: '**/*.js',
                    dest: '<%= path.js %>'
                }]
            }
        }
    });

    function runAllTasks() {
        grunt.task.run('clean:build');
        grunt.task.run('copy:alljs');
        grunt.task.run('copy:allcss');
        grunt.task.run('copy:allfonts');
        grunt.task.run('uglify:myjs');
        grunt.task.run('imagemin:allimg');
        grunt.task.run('compass:compile');
        grunt.task.run('htmlmin:allhtml');
    }


    // Plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', runAllTasks);
};