define(function (require) {
	'use strict';

	var UnitView = require('view/unit');

	var unitId = 0;

	var Unit = function (name, options) {
		if (!name) throw new Error('unnamed unit');

		this.id = ++unitId;
		this.name = name;
		this.options = options || {};

		//this.view = new UnitView({
		//	name: this.name
		//});
		this.init(this.options);
	};

	Unit.prototype = {
		name: 'unit',

		init: function (options) {
			console.log(_.sprintf('Unit %s %s initialized',
				this.name,
				this.id));
		},
	};

	return Unit;
});
