(function (requirejs) {
	'use strict';

	console.log('bootstrap');

	requirejs.config({
		baseUrl: 'js/app',

		paths: {
			'text': '../components/requirejs-text/text',
			'underscore': '../components/underscore/underscore',
			'underscore.string': '../components/underscore.string/dist/underscore.string.min',
			'q': '../components/q/q',

			'templates': '../../templates'
		},
	});

	define(function (require) {
		require('main');
	});

})(requirejs);
