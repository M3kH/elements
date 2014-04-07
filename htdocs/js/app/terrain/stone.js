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
				base: 0.4, // How likely are we to exist?
				adjacent: { // Multipliers based on adj types (top, neigbor, etc)
					2: { // neigbors
						matchType: {
							stone: 10,
							water: 0
						}
					}
				}
			}
		},

		init: function (options) {}
	});

	return Stone;
});
