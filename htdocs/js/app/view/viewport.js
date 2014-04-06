define(function (require) {
	'use strict';

	var
		View = require('view'),

		// Templates
		template = require('text!templates/viewport.html');

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

		insertGrid: function (grid) {
			this.el.querySelector('.grid-container').appendChild(grid);
		},

		renderContent: function () {
			this.el.innerHTML = this.template(template, {});
		}
	});

	return Viewport;
});
