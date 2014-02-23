define(function (require) {
	'use strict';

	var
		// Controllers
		Controller = require('controller'),
		GameController = require('controller/game'),
		MenuController = require('controller/menu'),

		// Views
		RootView = require('view/root');

	function RootController () {
		Controller.apply(this, arguments);
	}

	_.extend(RootController.prototype, Controller.prototype, {
		init: function () {
			console.log('rootcontroller:init');

			// Root view for all main controllers to bind their views to.
			this.rootView = this.addView(new RootView({
				el: document.body,
				envName: this.options.env.name
			}));

			this.game = this.addController(new GameController({
				name: 'First Elements',
				parentView: this.rootView
			}), 'game');

			this.menu = this.addController(new MenuController({
				parentView: this.rootView
			}), 'menu');
		},

		run: function () {
			console.log('rootcontroller:run');

			// this.game.run();
		},
	});

	return RootController;
});
