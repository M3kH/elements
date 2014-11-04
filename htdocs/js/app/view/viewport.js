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

		renderContent: function () {
			this.el.innerHTML = this.template(template, {});

			this.el.appendChild(this.notice.render());
		}
	});

	return Viewport;
});
