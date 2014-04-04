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
			'.main .item.create-building': { 'click': '_eCreateBuilding' },
			'.main .item.create-unit': { 'click': '_eCreateUnit' }
		},

		init: function () {
			console.log('menuview:init');
		},

		_eCreateBuilding: function () {
			this.trigger('create:building');
		},

		_eCreateUnit: function () {
			this.trigger('create:unit');
		},

		renderContent: function () {
			console.log('menuview:render');

			this.el.innerHTML = this.template(menuTemplate, {
				menu: this.menu
			});
		}
	});

	return MenuView;
});
