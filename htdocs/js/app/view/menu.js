define(function (require) {
	'use strict';
	var
		View = require('view'),

		// Templates
		menuTemplate = require('text!templates/menu.html');

	function MenuView () { View.apply(this, arguments); }

	_.extend(MenuView.prototype, View.prototype, {
		classList: ['menu'],

		menu: {
			main: [
			'hoi',
			'wij',
			'zijn',
			'het',
			'menu'
			]
		},

		init: function () {
			console.log('menuview:init');
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
