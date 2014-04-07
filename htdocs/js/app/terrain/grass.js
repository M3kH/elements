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
				base: 1.1,
				adjacent: {
					2: { // neigbors
						matchType: {
							_random: 0.8,
							grass: 9,
							water: 0
						}
					},

				},

			},
		},

		init: function (options) {}
	});

	return Grass;
});
