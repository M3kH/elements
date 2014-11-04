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
		adjacentTypes: {
			top: [{z:1}],
			bottom: [{z:-1}],
			neighbors4: [{x:-1},{y:-1},{y:1},{x:1}],
			neighbors8: [{x:-1},{y:-1},{y:1},{x:1},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],
		},

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

		adjacent: function (type, depth) {
			var self = this, matrix = this.grid.matrix, adjacent = [];
			depth = depth || 1;

			if (!type) {
				return this.allAdjacent(depth);
			}

			for (var i=1; i<depth+1; i++) {
				_.each(this.adjacentTypes[type], function (mod) {
					// determine adjacent position and add to output if it exists.
					var pos = {
						x: self.x + ((mod.x || 0) * depth),
						y: self.y + ((mod.y || 0) * depth),
						z: self.z + ((mod.z || 0) * depth)
					};

					if (matrix[pos.z] && matrix[pos.z][pos.x] && matrix[pos.z][pos.x][pos.y]) {
						adjacent.push(matrix[pos.z][pos.x][pos.y]);
					}
				});
			}

			return adjacent;
		},

		allAdjacent: function () {

		}
	};

	return Cell;
});
