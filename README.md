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


Options
-------

### module

The AngularJS module where to create directives. Ex:

```javascript
options: {
  module: 'yourApp',
},
```

### excludeStyle

Boolean, if true do not include styles inside the directive javascript definition. Ex:

```javascript
options: {
  excludeStyle: true,
},
```

### generateStyle

Boolean, instead of generating a javascript definition, generate the contents of the style.

```javascript
    ngtags: {
      options: {
        module: 'aModule',
      },
      styles: {
        src: 'src/**.ngtag',
        dest: 'dist/ngtags.css',
        options: {
          generateStyle: true,
        },
      },
    },
```




Configuration
-------------

An example of `Gruntfile.js`:

```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    ngtags: {
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

