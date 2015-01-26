Grunt-angular-tags
==================

Wraper of [angular-tags](https://github.com/drpicox/angular-tags) for grunt.


Install
-------

```bash
$ npm install -g grunt-cli
$ npm install grunt
$ npm install grunt-angular-tags
```


Configuration
-------------

An example of `Gruntfile.js`:

```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    'angular-tags': {
      options: {
        module: 'aModule',
      },
      build: {
        src: 'src/**.ntag',
        dest: 'dist/ntags.js'
      }
    }
  });

  // Load the plugin that provides the "angular-tags" task.
  grunt.loadNpmTasks('grunt-angular-tags');

  // Default task(s).
  grunt.registerTask('default', ['angular-tags']);

};
```

