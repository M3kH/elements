define(function (require) {
	'use strict';

	var TerrainGenerator = require('generator/terrain');

	function Terrain () {}

	Terrain.prototype = {
		generate: function (grid, options) {
			return TerrainGenerator.generate(grid, options);
		}
	};

	return new Terrain();
});
