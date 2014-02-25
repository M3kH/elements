module.exports = function (grunt) {
	'use strict';

	// Init Grunt and shit
	var gruntTasks = [
		'grunt-contrib-watch',
		'grunt-contrib-jshint',
		'grunt-contrib-compass',
		'grunt-contrib-copy',
		'grunt-shell'
	];

	// Install tasks
	for (var i in gruntTasks) { grunt.loadNpmTasks(gruntTasks[i]); }


	// Setup project specifics
	var Elements = {
		environment: 'development'
	};

	grunt.initConfig({
		jshint: { options: grunt.file.readJSON('.jshintrc') },
		compass: {
			dev: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'htdocs/css'
				}
			}
		},
		shell: {
			reloadBrowser: {
				command: '~/Scripts/reloadChrome.osa Elements'
			}
		},
		watch: {
			compass: {
				files: 'src/sass/**.sass',
				tasks: ['compass:dev', 'reload'],
			}
		}
	});

	grunt.registerTask('reload', ['shell:reloadBrowser']);
	grunt.registerTask('judge', ['jshint']);
	grunt.registerTask('compile', ['compass:dev']);

	grunt.registerTask('default', ['judge', 'compile', 'watch']);
};
