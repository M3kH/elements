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
				base: 1.4,
				adjacent: {
					neighbors8: {
						matchType: {
							_random: 0.9,
							grass: 1.5,
							stone: 0
						}
					},

				},

			},
		},

		init: function (options) {}
	});

	return Grass;
});
