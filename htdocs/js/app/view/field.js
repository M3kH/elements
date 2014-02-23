define(function (require) {
	'use strict';

	var
		View = require('view');

	function FieldView () { View.apply(this, arguments); }

	_.extend(FieldView.prototype, View.prototype, {
		classList: ['field'],

		init: function () {
			console.log('fieldview:init');
		}
	});

	return FieldView;
});
