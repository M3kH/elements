define(function (require) {
	'use strict';

	var
		Grass = require('terrain/grass'),
		Stone = require('terrain/stone');

	function TerrainGenerator () {}

	TerrainGenerator.prototype = {
		types: [Grass, Stone],
		probMultiplier: 10,

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

		random: function (types) {
			return new types[Math.floor(Math.random() * types.length)]();
		},

		matchType: function (multipliers, cellType, adjacent) {
			var m = 1;

			// multipliers are defined per adjacent type. Check only those types.
			_.each(_.keys(multipliers), function (type) {
				if (adjacent[type]) {
					_.each(adjacent[type], function (adjCell) {
						if (adjCell.occupant() && adjCell.occupant().type === cellType) {
							m = m * multipliers[type];
						}
					});
				}
			});

			return m;
		},

		probability: function (cell, adjacent) {
			var self = this, probValues = {}, probRange = [];

			// Create probability range
			_.each(this.types, function (type) {
				var p, i, probability = type.prototype.probability, adjType, neighbor;

				// base probability
				p = probability.create.base * self.probMultiplier;

				// do we need to check for matching neighbors?
				if (probability.create.adjacent) {
					// matchTyping
					if (probability.create.adjacent.matchType) {
						var matchTypeM = self.matchType(probability.create.adjacent.matchType, type.prototype.type, adjacent);

						p = p * matchTypeM;
					}
				}

				// add p amount of this type to range
				for (i=0; i<p; i++) {
					probRange.push(type);
				}
			});

			return this.random(probRange.length ? probRange : this.types);

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
