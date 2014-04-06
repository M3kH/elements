define(function (require) {
	'use strict';

	function Cell(x,y,z,grid,occupant) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.grid = grid;
		this._occupant = occupant;
	}

	Cell.prototype = {
		adjacentTypes: [
			// 0: top
			[{z:1}],
			// 1: bottom
			[{z:-1}],
			// 2: neighbors
			/*
			[{x:-1,y:-1},{x:-1},{x:-1,y:1},
			{y:-1},            {y:1},
			{x:-1,y:1},{x:1},{x:1,y:1}]
			*/
			[{x:-1},{y:-1},{y:1},{x:1}],
		],

		_occupant: null,

		isEmpty: function () {
			return !this._occupant;
		},

		occupant: function (occupant) {
			if (occupant) {
				this._occupant = occupant;
			}

			return this._occupant;
		},

		adjacent: function (type) {
			var self = this, adjacent = [];

			if (!type) {
				return this.allAdjacent();
			}

			_.each(this.adjacentTypes[type], function (mod) {
				var cell = null;

				try {
					cell = self.grid.matrix
						[(self.z + mod.z || 0)]
						[(self.x + mod.x || 0)]
						[(self.y + mod.y || 0)];
				} catch (e) {}

				cell && adjacent.push(cell);
			});

			return adjacent;
		},

		allAdjacent: function () {

		}
	};

	return Cell;
});
