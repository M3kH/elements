define(function (require) {
	'use strict';

	var Settings = {
		tagName: 'div',
		classList: ['grid'],
		cell: {
			tagName: 'div',
			classList: ['cell'],
			w: 16,
			h: 16
		}
	};

	function GridRdr(grid, options) {
		this.grid = grid;
		this.options = _.defaults(options || {}, Settings);

		this.create();
	}

	GridRdr.prototype = {
		el: undefined,

		create: function () {
			this.el = document.createElement(this.options.tagName);
			this.el.classList.add(this.options.classList);

			_.extend(this.el.style, {
				width: (this.options.cell.w * this.grid.w+1)+'px',
				height: (this.options.cell.h * this.grid.h+1)+'px'
			});
		},

		createCell: function (cell, options) {
			var el = document.createElement(this.options.cell.tagName);
			options = _.extend(options || {}, this.options.cell);

			el.classList.add(options.classList);

			// Add base and type of cell occupant as classes
			if (!cell.isEmpty()) {
				el.classList.add(cell.occupant().base, cell.occupant().type);
			}

			_.extend(el.style, {
				width: options.w+'px',
				height: options.h+'px',
				top: (cell.x * options.w)+'px',
				left: (cell.y * options.h)+'px',
				zIndex: cell.z,
				display: (cell.isEmpty()) ? 'none' : 'block'
			});

			return el;
		},

		renderGrid: function () {
			for (var d=0; d<this.grid.matrix.length; d++) {
				for (var w=0; w<this.grid.matrix[d].length; w++) {
					for (var h=0; h<this.grid.matrix[d][w].length; h++) {
					var cell = this.createCell(this.grid.matrix[d][w][h]);

					this.el.appendChild(cell);
					}
				}
			}
		},

		render: function () {
			console.log('gridRdr:render');

			this.renderGrid();

			return this.el;
		}
	};

	return GridRdr;
});
