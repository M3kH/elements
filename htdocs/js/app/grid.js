define(function (require) {
	'use strict';

	var Cell = require('grid/cell');

	function Grid(w,h,d) {
		this.w = w;
		this.h = h;
		this.d = d;

		this.create();
	}

	Grid.prototype = {
		matrix: [],

		create: function () {
			// Create three dimensions
			for (var d=0; d<this.d; d++) {
				// Depth
				this.matrix[d] = new Array(this.w);
				for (var w=0; w<this.w; w++) {
					// Width
					this.matrix[d][w] = new Array(this.h);
					// Height
					for (var h=0; h<this.h; h++) {
						this.matrix[d][w][h] = new Cell(w,h,d,this);
					}
				}
			}
		},

		get: function (x, y) {
			return this.matrix[x][y];
		}
	};

	return Grid;
});
