Grunt-ngtags
==================

Wraper of [ngtags](https://github.com/ngtags/ngtags) for grunt.


Install
-------

```bash
$ npm install -g grunt-cli
$ npm install grunt
$ npm install grunt-ngtags
```


Configuration
-------------

An example of `Gruntfile.js`:

```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    'ngtags': {
      options: {
        module: 'aModule',
      },
      build: {
        src: 'src/**.ngtag',
        dest: 'dist/ngtags.js'
      }
    }
  });

  // Load the plugin that provides the "ngtags" task.
  grunt.loadNpmTasks('grunt-ngtags');

  // Default task(s).
  grunt.registerTask('default', ['ngtags']);

};
```

