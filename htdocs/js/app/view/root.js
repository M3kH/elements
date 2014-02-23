define(function (require) {
	'use strict';

	var
		View = require('view');

	function RootView () { View.apply(this, arguments); }

	_.extend(RootView.prototype, View.prototype, {
		classList: ['root'],

		init: function () {
			this.classList.push(this.options.envName.name);

			console.log('rootview:init');
		}
	});

	return RootView;
});
