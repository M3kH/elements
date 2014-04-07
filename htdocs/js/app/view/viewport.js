define(function (require) {
	'use strict';

	var
		View = require('view'),

		ViewportNoticeView = require('view/viewport/notice'),

		// Templates
		template = require('text!templates/viewport.html');

	function Viewport () { View.apply(this, arguments); }

	_.extend(Viewport.prototype, View.prototype, {
		classList: ['viewport'],
		zoom: {
			step: 20,
			max: 200
		},

		domEvents: {
			'.controls .zoom-in': {
				'click': '_eZoomIn',
			},
			'.controls .zoom-out': {
				'click': '_eZoomOut',
			}
		},

		init: function () {
			this.notice = this.addView(new ViewportNoticeView(), 'notice');

			this.install();
		},

		install: function () {},

		showNotice: function (message) {
			this.notice.show({message: message});
		},

		hideNotice: function () {
			this.notice.hide();
		},

		insertGrid: function (grid) {
			this.el.querySelector('.grid-container').appendChild(grid);
		},

		removeGrid: function () {
			this.el.querySelector('.grid-container').innerHTML = '';
		},

		currentZoom: function (zoom) {
			var zoomClass = this.el.className.match(/z[0-9]{2,3}/);
			zoomClass = zoomClass ? zoomClass[0] : false;

			// set
			if (zoom) {
				// remove old class
				if (zoomClass) {
					this.el.classList.remove(zoomClass);
				}

				this.el.classList.add('zoom', 'z'+zoom);
				return;
			}

			// get
			if (!zoomClass) {
				return 100;
			}

			return parseInt(zoomClass.match(/[0-9]{2,3}/)[0], 10);
		},

		_eZoomIn: function () {
			var zoom = this.currentZoom();

			if (zoom + this.zoom.step > this.zoom.max) {
				return;
			}

			this.currentZoom(zoom + this.zoom.step);
		},

		_eZoomOut: function () {
			var zoom = this.currentZoom();

			if (zoom - this.zoom.step <= 0) {
				return;
			}

			this.currentZoom(zoom - this.zoom.step);
		},

		renderContent: function () {
			this.el.innerHTML = this.template(template, {});

			this.el.appendChild(this.notice.render());
		}
	});

	return Viewport;
});
