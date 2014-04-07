define(function (require) {
	'use strict';

	var TerrainAbstract = require('terrain/abstract');

	function Water() { TerrainAbstract.apply(this, arguments); }

	_.extend(Water.prototype, TerrainAbstract, {
		base: 'terrain',
		type: 'water',

		//probability multipliers
		probability: {
			create: {
				base: 0.5,
				adjacent: {
					2: { // neigbors
						matchType: {
							_random: 0.6,
							water: 8,
							grass: 0,
							stone: 0,
						}
					},

				},

			},
		},

		init: function (options) {}
	});

	return Water;
});
