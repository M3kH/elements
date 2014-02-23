define(function (require) {
	'use strict';

	var
		// Controllers
		Controller = require('controller'),

		// Views
		GameView = require('view/game');

		// Units!
		//Unit = require('unit');

	function GameController () { Controller.apply(this, arguments); }

	_.extend(GameController.prototype, Controller.prototype, {
		units: [],

		init: function () {
			console.log('gamecontroller:init');
			console.log(this.options);
		},

		run: function () {
			console.log('gamecontroller:run');
		}

	});

	return GameController;
});
