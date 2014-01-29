module.exports = function (grunt) {
  var pkg = grunt.file.readJSON('package.json');

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  var userConfig = {
    destination_dir: 'dist',

    app_files: {
      js: ['src/**/*.js']
    }
  };

  var taskConfig = {

    pkg: pkg,

    clean: ['<%= destination_dir %>/bower_components', 'tmp'],

    /* convert AngularJs html templates to cached JavaScript */
    html2js: {
      main: {
        options: {
          base: 'src',
          module: '<%= pkg.name %>.templates'
        },
        src: [ 'src/**/*.tpl.html' ],
        dest: 'tmp/<%= pkg.name %>.templates.js'
      }
    },

    concat: {
      js: {
        options: {},
        src: [
          'tmp/*.js',
          '<%= app_files.js %>'
        ],
        dest: '<%= destination_dir %>/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      js: {
        files: {
          '<%= destination_dir %>/<%= pkg.name %>.min.js': '<%= destination_dir %>/<%= pkg.name %>.js'
        }
      }
    },

    // make sure index.html example works inside destination folder
    copy: {
      all: {
        files: [
          {
            expand: true,
            src: [
              'bower_components/angular/angular.js',
              'bower_components/angular-mocks/angular-mocks.js',
              'index.html',
              'README.md'
            ],
            dest: '<%= destination_dir %>'
          }
        ]
      }
    },

    watch: {
      all: {
        options: {
          livereload: 35729
        },
        files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css', 'index.html'],
        tasks: ['build']
      }
    }
  };
  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  grunt.registerTask('build', ['clean', 'html2js', 'concat', 'copy', 'uglify']);
  grunt.registerTask('default', ['build']);
};
