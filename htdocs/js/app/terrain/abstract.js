define(function (require) {
	'use strict';

	function TerrainAbstract(cell, options) {
		this.cell = cell;
		this.sprite = null;
		this.options = options || {};

		this.init && this.init(options);
	}

	TerrainAbstract.prototype = {
		base: 'terrain',
		type: null
	};

	return TerrainAbstract;
});
