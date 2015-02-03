'use strict';

var chalk = require('chalk');
var Translator = require('ngtags');


// task implementation
module.exports = function (grunt) {

	// own transpiler with some tricks
	function GruntTranslator() {
		Translator.call(this);

		this.iife = false;
		delete this.generatorBody;
	}
	GruntTranslator.prototype = new Translator();
	GruntTranslator.prototype.generatorBody = grunt.file.read(GruntTranslator.prototype.generatorFilename);

	grunt.registerMultiTask('ngtags', 'Convert ngtags to angular javascript directives', function () {

		var options = this.options({ 
			separator: '\n', 
		});

		var count = 0;
		//var done = this.async();
		//var banner = grunt.template.process(options.banner);

		this.files.forEach(function (f) {
			var validFiles = removeInvalidFiles(f);

			count += writeCompiledFile(f.dest, concatOutput(validFiles, options));
		});

		grunt.log.ok(count + ' files created.');


		function compileNtag(code, options, filepath) {
			var translator = new GruntTranslator();
			translator.excludeStyle = options.excludeStyle;
			translator.inputBody = code;
			translator.enableAutoprefix = options.autoprefix === false ? false : options.autoprefix || translator.enableAutoprefix;
			translator.moduleName = options.module || translator.moduleName;
			translator.parse();
			if (options.generateStyle) {
				return translator.style;
			} else {
				translator.generate();
				return translator.outputBody;
			}
		}

		function concatOutput(files, options) {
			var prepend, append;

			if (options.generateStyle) {
				prepend = append = '\n';
			} else {
				prepend = '' +
				';(function(angular) {\n' +
				'\t\'use strict\';\n';
				append = '\n})(angular);';
			}

			var result = prepend +
				files.map(function(filepath) {				
					var code = grunt.file.read(filepath);
					return compileNtag(code, options, filepath);
				}).join(options.separator) +
				append;

			return result;
		}

		function removeInvalidFiles(files) {
			return files.src.filter(function(filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			});
		}

		function writeCompiledFile(path, output) {
			if (writeFile(path, output)) {
				grunt.verbose.writeln('File ' + chalk.cyan(path) + ' created.');
				return 1;
			} else {
				return 0;
			}
		}

		function writeFile(path, output) {
			if (output.length < 1) {
				grunt.log.warn('Destination "' + path + '" not written because compiled files were empty.');
				return false;
			} else {
				grunt.file.write(path, output);
				return true;
			}
		}

	});

};