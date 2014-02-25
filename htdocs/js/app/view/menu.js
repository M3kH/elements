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
			'.main .item.create-unit': { 'click' : '_eCreateUnit' }
		},

		init: function () {
			console.log('menuview:init');
		},

		_eCreateUnit: function () {
			console.log('create unit click');
			this.trigger('createUnit');
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
