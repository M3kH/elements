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
			var self = this;

			console.log('gamecontroller:init');

			this.menu = this.options.menu;
			this._setupMenuListeners();

			// Create and render viewport
			this.viewport = this.addView(new Viewport(Settings.viewport), 'viewport');
			this.parentView.el.appendChild(this.viewport.render());

			setTimeout(this.install.bind(this));
		},

		install: function () {
		},

		_setupMenuListeners: function () {
			this.menu.getView().on('create:grid', this.createGrid.bind(this));
			this.menu.getView().on('create:unit', this.createUnit.bind(this));
			this.menu.getView().on('create:building', this.createBuilding.bind(this));

		},

		createGrid: function () {
			var self = this;

			this.viewport.showNotice('creating grid');
			this.viewport.removeGrid();

			setTimeout(function () {
				self._createGrid();
				self.viewport.hideNotice();
			}, 200);
		},

		_createGrid: function () {
			console.time('create:grid');
			this.grid = new Grid(100,100,2);
			console.timeEnd('create:grid');

			console.time('create:terrain');
			this.terrain = Terrain.generate(this.grid);
			console.timeEnd('create:terrain');

			console.time('create:render');
			this.viewport.insertGrid(rdr.grid(this.grid).render(
				this.viewport.el.offsetWidth, this.viewport.el.offsetHeight
			));
			console.timeEnd('create:render');

			this.viewport.hideNotice();
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
