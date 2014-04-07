define(function (require) {
	'use strict';

	var
		Grass = require('terrain/grass'),
		Stone = require('terrain/stone'),
		Water = require('terrain/water');

	function TerrainGenerator () {}

	TerrainGenerator.prototype = {
		types: [Grass, Stone, Water],
		probMultiplier: 2,

		// We get a partial grid (2d) to generate on.
		generate: function (grid) {
			for (var x=0; x<grid.length; x++) {
				for (var y=0; y<grid[x].length; y++) {
					grid[x][y].occupant(this.pick(grid[x][y]));
				}
			}
		},

		pick: function (cell) {
			var adjacent = [];
			adjacent[2] = cell.adjacent(2);

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
			var self = this, probValues = {}, probRange = [], i=0;

			// Create probability range
			_.each(this.types, function (type) {
				var p, probability = type.prototype.probability, lastType;

				// base probability
				p = probability.create.base * self.probMultiplier;

				// do we need to check for adjacent cells?
				if (probability.create.adjacent) {

					// check only adjacent types defined
					_.each(_.keys(probability.create.adjacent), function (adjType) {
						if (adjacent[adjType]) {

							// matchTyping
							if (probability.create.adjacent[adjType].matchType) {
								p = p * self.matchType(probability.create.adjacent[adjType].matchType, type.prototype.type, adjacent[adjType]);
							}

						}
					});
				}


				probValues[i] = p;
				i++;
			});

			var probSum = 0;
			_.each(probValues, function (n) { probSum += n; });

			var r = Math.random() * probSum;
			var lower = 0;
			var type = null;
			for (var j in probValues) {
				if (r >= lower && r < lower + probValues[j]) {
					console.log('MATCHED A TYPE. CUNT!');
					type = this.types[j];
					break;
				}

				lower += probValues[j];
			}

			return new type();
			// return this.random(probRange.length ? probRange : this.types);

			/*
			_.each(adjacent, function (neighbor) {
				if (neighbor.occupant()) {
					console.log('My lovely neigbor', neighbor.occupant().base, neighbor.occupant().type);
				}
			});
			*/
		}

	};

	return new TerrainGenerator();
});
