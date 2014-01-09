module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: ['app/js/intro.js', 'app/js/project.js', 'app/js/outro.js'],
        dest: 'dist/built.js'
      }
    },


    // grunt-express 
    express: {
      all : {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['app'],
          livereload: true
        }
      }
    },

    // grunt-watch
    watch: {
      files: ['app/*.html',
              'app/less/*.less',
              'app/js/*.js'],
      options: {
        livereload: true,
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        }
      }
    },

    // grunt-open
    open: {
      dev:{
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }

  });


  // TASKS

  //grunt.registerTask('default', ['uglify', 'concat']);
  grunt.registerTask('server', [
    'express',
    'open:dev',
    'watch'
  ]);

  grunt.registerTask('test', 'Log something', function(){
    grunt.log.write('this is Grunt logging something');
  });

};