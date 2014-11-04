define(function (require) {
	'use strict';

	var
		Grid = require('grid'),

		Grass = require('terrain/grass'),
		Stone = require('terrain/stone'),
		Water = require('terrain/water');

	function TerrainGenerator () {}

	TerrainGenerator.prototype = {
		types: [Grass, Stone, Water],
		probMultiplier: 2,

		generate: function (grid, options) {
			options = _.defaults(options || {}, {
				z: 0,
				iterations: 1
			});

			var plane = grid.matrix[options.z];

			this.generateRandomPlane(plane);

			for (var i=0; i<options.iterations; i++) {
				plane = this.iteration(plane);
			}

			return grid;
		},

		generateRandomPlane: function (plane) {
			for (var x=0; x<plane.length; x++) {
				for (var y=0; y<plane[x].length; y++) {
					plane[x][y].occupant(this.pickRandom(plane[x][y]));
				}
			}
		},

		pickRandom: function () {
			return new this.types[Math.floor(Math.random() * this.types.length)]();
		},

		iteration: function (plane) {
			// Create a new plane so picking/probability is totally based
			// on previous iteration and not our current modifications.
			var newPlane = new Grid(plane.length+1,plane[0].length+1, 1).matrix[0];
			for (var x=0; x<plane.length; x++) {
				for (var y=0; y<plane[x].length; y++) {
					newPlane[x][y].occupant(this.pickProbable(plane[x][y]));
				}
			}

			return newPlane;
		},

		pickProbable: function (cell) {
			var adjacent = [];
			adjacent.neighbors8 = cell.adjacent('neighbors8');

			return this.probability(cell, adjacent);
		},

		random: function (probRange) {
			return new this.types[probRange[Math.floor(Math.random() * probRange.length)]]();
		},

		matchType: function (multipliers, cellType, adjacent) {
			var m = 1;

			_.each(adjacent, function (neighbor) {
				var r = Math.random();

				if (!neighbor._occupant) { return; }

				var occupant = neighbor.occupant();

				if (occupant && multipliers[occupant.type]) {
					if (r < multipliers._random || 1) {
						m = m * multipliers[occupant.type];
					}
				}
			});

			return m;
		},

		probability: function (cell, adjacent) {
			var self = this, probTypes = {}, probRange = [], i=0;

			// Create probability range for all cellTypes and pick one.
			_.each(this.types, function (type) {
				var p, lastType,
					cellProb = type.prototype.probability,
					cellType = type.prototype.type;

				// base probability
				p = cellProb.create.base * self.probMultiplier;

				// do we need to check for adjacent cells?
				if (cellProb.create.adjacent) {
					// check all adjacent types we need
					_.each(_.keys(cellProb.create.adjacent), function (adjType) {
						// Do all the different kinds of checking we need.
						if (adjacent[adjType]) {

							// matchTyping
							if (cellProb.create.adjacent[adjType].matchType) {
								p = p * self.matchType(cellProb.create.adjacent[adjType].matchType, cellType, adjacent[adjType]);
							}

							// That's all :)
						}
					});
				}


				probTypes[i] = p;
				i++;
			});

			return new this.types[this.probableKey(probTypes)]();
		},

		probableKey: function (probValues) {
			var probSum = _.reduce(probValues, function (a,b) { return a + b; }),
				r = Math.random() * probSum,
				lower = 0;

			for (var j in probValues) {
				if (r >= lower && r < lower + probValues[j]) {
					return j;
				}

				lower += probValues[j];
			}
		}

	};

	return new TerrainGenerator();
});
