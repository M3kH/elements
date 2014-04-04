define(function (require) {
	'use strict';

	var Settings = {
		tagName: 'div',
		classList: ['grid'],
		cell: {
			tagName: 'div',
			classList: ['cell'],
			w: 20,
			h: 20
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
				width: (this.options.cell.w * this.grid.matrix.length+1)+'px',
				height: (this.options.cell.h * this.grid.matrix[0].length+1)+'px'
			});
		},

		createCell: function (options) {
			var cell = document.createElement(this.options.cell.tagName);
			options = _.extend(options, this.options.cell);

			cell.classList.add(options.classList);

			_.extend(cell.style, {
				width: options.w+'px',
				height: options.h+'px',
				top: (options.x * options.w)+'px',
				left: (options.y * options.h)+'px',
			});

			return cell;
		},

		renderGrid: function () {
			var y=0, x=0;
			for (var i=0; i<this.grid.matrix.length; i++) {
				y = 0;
				for (var j=0; j<this.grid.matrix[i].length; j++) {
					var cell = this.createCell({x:x,y:y});

					this.el.appendChild(cell);
					y++;
				}
				x++;
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
