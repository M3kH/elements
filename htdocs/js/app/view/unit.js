define(function (require) {
	'use strict';

	var
		View = require('view');

	function UnitView () { View.apply(this, arguments); }

	_.extend(UnitView.prototype, View.prototype, {
		classList: ['unit'],

		init: function () {
			console.log('unitview:init');
		}
	});

	return UnitView;
});
