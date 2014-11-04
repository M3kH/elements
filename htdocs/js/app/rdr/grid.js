define(function (require) {
	'use strict';

	function GridRdr(grid, options) {
		this.grid = grid;
		this.options = options || {};
	}

	GridRdr.prototype = {
		settings: {
			cell: {
				w: 12,
				h: 12
			}
		},

		pixi: {},

		el: undefined,

		setupPixi: function (w, h) {
			var self = this;

			this.pixi.stage = new PIXI.Stage(0x131313);
			this.pixi.rdr = new PIXI.autoDetectRenderer(w, h);

			this.pixi.stage.interactive = true;
			this.pixi.stage.click = function (data) {
				var cell = {
					x: Math.floor(data.global.x / self.settings.cell.w),
					y: Math.floor(data.global.y / self.settings.cell.h)
				};

				console.log(cell, data);
			};

			this.el = this.pixi.rdr.view;
		},

		animate: function () {
			this.pixi.rdr.render(this.pixi.stage);

			requestAnimFrame(this.animate.bind(this));
		},


		renderCell: function (cell) {
			// Don't render empty cells
			if (!cell.occupant()) { return; }

			var texture = new PIXI.Texture.fromImage(_.sprintf('/img/texture/terrain/%s.png', cell.occupant().type)),
				c = new PIXI.Sprite(texture);

			c.position.x = cell.x * this.settings.cell.w;
			c.position.y = cell.y * this.settings.cell.h;
			/*
			c.interactive = true;
			c.buttonMode = true;
			c.click = function () { console.log('click', arguments); };
			*/

			this.pixi.stage.addChild(c);
		},

		renderGrid: function () {
			var m = this.grid.matrix;

			for (var z=0; z<m.length; z++) {
				for (var x=0; x<m[z].length; x++) {
					for (var y=0; y<m[z][x].length; y++) {
						this.renderCell(m[z][x][y]);
					}
				}
			}

			this.animate();
		},

		render: function (w, h) {
			console.log('gridRdr:render');

			this.setupPixi(w, h);

			this.renderGrid();

			return this.el;
		}
	};

	return GridRdr;
});
