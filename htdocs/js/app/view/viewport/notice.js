define(function (require) {
	'use strict';
	var
		View = require('view'),

		// Templates
		template = require('text!templates/viewport/notice.html');

	function ViewportNoticeView () { View.apply(this, arguments); }

	_.extend(ViewportNoticeView.prototype, View.prototype, {
		classList: ['notice'],

		domEvents: {
			'.btn-dismiss': {
				'click': '_eDismiss',
			}
		},

		init: function () {},

		_eDismiss: function () {
			this.setMessage();
			this.hide();
		},

		setMessage: function (message) {
			this.el.querySelector('.message').textContent = message;
		},

		show: function (options) {
			if (options.message) {
				this.setMessage(options.message);
			}

			this.el.classList.add('s-open');
		},

		hide: function () {
			this.el.classList.remove('s-open');
		},

		renderContent: function () {
			this.el.innerHTML = this.template(template, {
				message: this.options.message
			});
		}
	});

	return ViewportNoticeView;
});
