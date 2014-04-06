define(function (require) {
	'use strict';

	var TerrainAbstract = require('terrain/abstract');

	function Grass() { TerrainAbstract.apply(this, arguments); }

	_.extend(Grass.prototype, TerrainAbstract, {
		base: 'terrain',
		type: 'grass',

		//probability multipliers
		probability: {
			create: {
				base: 1,
				adjacent: {
					2: { // neigbors
						matchType: {
							grass: 4,
							stone: 0.7
						}
					},

				},

			},
		},

		init: function (options) {}
	});

	return Grass;
});
