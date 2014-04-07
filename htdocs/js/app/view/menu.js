define(function (require) {
	'use strict';
	var
		View = require('view'),

		// Templates
		menuTemplate = require('text!templates/menu.html');

	function MenuView () { View.apply(this, arguments); }

	_.extend(MenuView.prototype, View.prototype, {
		classList: ['menu'],

		domEvents: {
			'.main .item.create-grid': {
				'click': '_eCreateGrid'
			},
			'.main .item.create-building': {
				'click': '_eCreateBuilding'
			},
			'.main .item.create-unit': {
				'click': '_eCreateUnit'
			},
		},

		init: function () {},

		_eCreateGrid: function () {
			this.trigger('create:grid');
		},

		_eCreateBuilding: function () {
			this.trigger('create:building');
		},

		_eCreateUnit: function () {
			this.trigger('create:unit');
		},

		renderContent: function () {
			this.el.innerHTML = this.template(menuTemplate, {
				menu: this.menu
			});
		}
	});

	return MenuView;
});
