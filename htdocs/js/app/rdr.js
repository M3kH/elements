define(function (require) {
	'use strict';

	var GridRdr = require('rdr/grid');

	var Settings = {
		grid: {}
	};

	function Rdr(options) {
		this.options = _.defaults(options || {}, Settings);
	}

	Rdr.prototype = {
		grid: function (grid, options) {
			return new GridRdr(grid, options);
		}
	};

	return Rdr;
});
