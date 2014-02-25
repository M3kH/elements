define(function (require) {
	'use strict';

	var
		View = require('view'),

		unitTemplate = require('text!templates/unit.html');

	function UnitView () { View.apply(this, arguments); }

	_.extend(UnitView.prototype, View.prototype, {
		classList: ['unit'],

		init: function () {
			// Add unit name to the classList
			this.el.classList.add('u-'+this.controller.name.toLowerCase());

			console.log('unitview:init');
		},

		renderContent: function () {
			this.el.innerHTML = this.template(unitTemplate, {
				name: this.controller.name
			});
		},

		position: function (t, l) {
			console.log('position unit', t, l, this.el);
			if (t === undefined && l === undefined) {
				return [this.el.style.top, this.el.style.left];
			} else {
				if (t) { this.el.style.top = t+'px'; }
				if (l) { this.el.style.left = l+'px'; }
			}
		}
	});

	return UnitView;
});
