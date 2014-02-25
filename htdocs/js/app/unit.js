define(function (require) {
	'use strict';

	var
		Controller = require('controller'),

		// Views
		UnitView = require('view/unit');

	var unitId = 0;

	// A Unit is a special kind of Controller. According to
	// it's mom.
	function Unit () { Controller.apply(this, arguments); }

	_.extend(Unit.prototype, Controller.prototype, {
		name: 'unit',

		init: function (options) {
			// A Unit needs a name
			if (!options.name) throw new Error('nameless unit');
			this.name = options.name;

			this.unitId = ++unitId;

			this.addView(new UnitView({
				controller: this,
			}));

			console.log(this.options);
			this.parentView.el.appendChild(this.renderView().el);

			console.log(_.sprintf('Unit %s %s initialized',
				this.name,
				this.unitId));
		},

		position: function (t, l) {
			return this.getView().position(t,l);
		}
	});

	return Unit;
});
