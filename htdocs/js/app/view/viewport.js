define(function (require) {
	'use strict';

	var
		View = require('view');

	function Viewport () { View.apply(this, arguments); }

	_.extend(Viewport.prototype, View.prototype, {
		classList: ['viewport'],

		init: function () {
			this.install();

			console.log('viewport:init');
		},

		install: function () {
			console.log('viewport:install');
		},
	});

	return Viewport;
});
