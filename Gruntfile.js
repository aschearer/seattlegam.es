module.exports = function (grunt) {
    grunt.initConfig({
        assemble: {
            options: {
                data: ['data/*.json'],
            },
            pages: {
                options: {
                    layout: 'layouts/default.hbs',
                },
                files: [
                    { cwd: 'pages', src: ['*.hbs'], dest: 'out/', expand: true },
                ]
            },
        },
        copy: {
            dev: {
                files: [
                    { src: ['**', '!**/*.db', ], dest: 'out/assets/', cwd: 'assets', expand: true },
                ]
            }
        },
        less: {
            dev: {
                files: {
                    'out/assets/styles/main.css': 'styles/main.less'
                }
            },
            prod: {
                options: {
                    yuicompress: true
                },
                files: {
                    'out/assets/styles/main.css': 'styles/main.less'
                }
            }
        },
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    beautify: true
                },
                files: {
                    'out/assets/scripts/main.js': [
                        'scripts/vendors/modernizr/modernizr.js',
                        'scripts/vendors/jquery/jquery.js',
                        'scripts/vendors/foundation/foundation.min.js',
                    ]
                }
            },
            prod: {
                options: {
                    mangle: true,
                    beautify: false,
                    compress: true,
                },
                files: {
                    'out/assets/scripts/main.js': [
                        'scripts/vendors/jquery/jquery.js',
                        'scripts/events.js',
                    ]
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('assemble');

    grunt.registerTask('default', ['assemble', 'copy', 'less:dev', 'uglify:dev']);
};
