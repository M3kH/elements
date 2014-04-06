define(function (require) {
	'use strict';

	var TerrainGenerator = require('generator/terrain');

	function Terrain (grid, d) {
		this.grid = grid;
		this.level = grid.matrix[d];
	}

	Terrain.prototype = {
		generate: function () {
			TerrainGenerator.generate(this.level);
		}
	};

	return Terrain;
});
