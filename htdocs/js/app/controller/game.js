define(function (require) {
	'use strict';

	var
		// Controllers
		Controller = require('controller'),

		// Views
		GameView = require('view/game'),
		FieldView = require('view/field'),

		// Units!
		Unit = require('unit');

	function GameController () { Controller.apply(this, arguments); }

	_.extend(GameController.prototype, Controller.prototype, {
		units: [],
		fieldDimensions: {
			width: 800,
			height: 500
		},

		init: function () {
			console.log('gamecontroller:init');

			this.view = this.addView(new GameView());
			this.field = this.view.addView(new FieldView({
				width: this.fieldDimensions.width,
				height: this.fieldDimensions.height
			}), 'field');

			// Put it there!
			this.parentView.el.appendChild(this.renderView().el);

			this.options.menu.getView().on('createUnit', this.createUnit.bind(this));
		},

		createUnit: function () {
			console.log('creatUnit!');

			var unit = new Unit({
				name: 'BotOne',
				parentView: this.field
			});

			// Give unit a random position in the field
			var uH = 25; // unit half
			// randomTop and randomLeft
			var rT = Math.floor(Math.random() * this.fieldDimensions.height);
			var rL = Math.floor(Math.random() * this.fieldDimensions.width);
			if (rT < 25) { rT = 25; }
			if (rT > this.fieldDimensions.height - 25) { rT = this.fieldDimensions.height - 25; }
			if (rL < 25) { rL = 25; }
			if (rL > this.fieldDimensions.width - 25) { rL = this.fieldDimensions.width - 25; }
			unit.position(rT, rL);
		},

		run: function () {
			console.log('gamecontroller:run');
		}

	});

	return GameController;
});
