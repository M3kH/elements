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
					matchType: {
						2: 1.2, // neighbor
					}
				}
			}
		},

		init: function (options) {}
	});

	return Grass;
});
