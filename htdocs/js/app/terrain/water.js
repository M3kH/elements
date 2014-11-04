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
				base: 0.7,
				adjacent: {
					neighbors8: {
						matchType: {
							water: 2.2,
							grass: 0,
							stone: 0
						}
					},

				},

			},
		},

		init: function (options) {}
	});

	return Water;
});
