define(function () {
	'use strict';

	function Grid(w,h) {
		this.w = w;
		this.h = h;

		this.create();
	}

	Grid.prototype = {
		matrix: [],

		create: function () {
			for (var i=0; i<this.h; i++) {
				this.matrix[i] = new Array(this.w);
			}
		},

		get: function (x, y) {
			console.log('haai');

			return this.matrix[x][y];
		}
	};

	return Grid;
});
