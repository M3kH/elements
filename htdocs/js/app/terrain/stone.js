define(function (require) {
	'use strict';

	var TerrainAbstract = require('terrain/abstract');

	function Stone() { TerrainAbstract.apply(this, arguments); }

	_.extend(Stone.prototype, TerrainAbstract, {
		base: 'terrain',
		type: 'stone',

		// probability multipliers
		probability: {
			create: {
				base: 0.6, // How likely are we to exist?
				adjacent: { // Multipliers based on adj types (top, neigbor, etc)
					neighbor8: {
						matchType: {
							stone: 2,
							grass: 0,
							water: 0,
						}
					}
				}
			}
		},

		init: function (options) {}
	});

	return Stone;
});
