define(function (require) {
	'use strict';

	var Unit = function (options) {
		this.options = options;
	};

	Unit.prototype = {
		name: 'unit',
	};

	return Unit;
});
