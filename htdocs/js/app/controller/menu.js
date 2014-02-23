define(function (require) {
	'use strict';

	var
		// Controllers
		Controller = require('controller'),

		// Views
		MenuView = require('view/menu');

	function MenuController () { Controller.apply(this, arguments); }

	_.extend(MenuController.prototype, Controller.prototype, {
		init: function () {
			console.log('menucontroller:init');

			this.addView(new MenuView());

			// Render our views and append them to our parentView
			this.parentView.el.appendChild(this.renderView().el);
		}
	});

	return MenuController;
});
