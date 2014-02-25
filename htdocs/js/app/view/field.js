define(function (require) {
	'use strict';

	var
		View = require('view');

	function FieldView () { View.apply(this, arguments); }

	_.extend(FieldView.prototype, View.prototype, {
		classList: ['field'],

		init: function () {
			this.install();

			console.log('fieldview:init');
		},

		install: function () {
			this.setDimensions();
		},

		setDimensions: function () {
			this.el.style.width = this.options.width + 'px';
			this.el.style.height = this.options.height + 'px';
		}
	});

	return FieldView;
});
