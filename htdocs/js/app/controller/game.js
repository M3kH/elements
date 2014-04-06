define(function (require) {
	'use strict';

	var
		Controller = require('controller'),

		Grid = require('grid'),

		Rdr = require('rdr'),
		Terrain = require('terrain'),

		Viewport = require('view/viewport'),

		CreateBuildingView = require('view/create/building');

	var Settings = {
		rdr: {},
		viewport: {},
	};

	// Setup renderer
	var rdr = new Rdr(Settings.rdr);

	function GameController () { Controller.apply(this, arguments); }

	_.extend(GameController.prototype, Controller.prototype, {
		units: [],

		init: function () {
			console.log('gamecontroller:init');

			this.menu = this.options.menu;
			this._setupMenuListeners();


			/// Create grid and viewport and tie it all together.
			this.grid = new Grid(100,100,5);
			// Terrain lives on the bottom level of our grid.
			this.terrain = new Terrain(this.grid, 0);

			// In the future we could fetch/set pre-generated terrains.
			this.terrain.generate();



			// Create and render viewport
			this.viewport = this.addView(new Viewport(Settings.viewport), 'viewport');
			this.parentView.el.appendChild(this.viewport.render());
			this.viewport.el.appendChild(rdr.grid(this.grid).render());
		},

		_setupMenuListeners: function () {
			this.menu.getView().on('create:unit', this.createUnit.bind(this));
			this.menu.getView().on('create:building', this.createBuilding.bind(this));

		},

		createBuilding: function () {
			alert('create:building');
		},

		createUnit: function () {
			alert('create:unit');
		},

		run: function () {
			console.log('gamecontroller:run');
		}

	});

	return GameController;
});
