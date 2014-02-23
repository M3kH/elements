define(function (require) {
	'use strict';

	var defaultTypes = {
		r: 'background: #200; color: #f00; text-shadow: 0 1px 0 rgba(0,0,0,.2)',
		g: 'background: #020; color: #0f0; text-shadow: 0 1px 0 rgba(0,0,0,.2)',
		b: 'background: #002; color: #00f; text-shadow: 0 1px 0 rgba(0,0,0,.2)',
	};

	var Console = window.Console = function (options) {};

	Console.prototype = {
		log: function (message, type) {
		}
	};
});
