define(function (require) {
	'use strict';

	var
		ControllersMixin = require('mixins/controllers'),
		ViewsMixin = require('mixins/views'),

		controllerId = 0,
		defaultOptions = {};

	function Controller (options) {
		this.id = ++controllerId;
		this.options = _.defaults(options || {}, defaultOptions);

		this._init.apply(this, arguments);
	}

	_.extend(Controller.prototype, ControllersMixin, ViewsMixin, {
		_defaultRole: 'root',

		_init: function () {
			// We're using some mixins
			this.mixinControllers();
			this.mixinViews();

			this.init.apply(this, arguments);
			this.post.apply(this, arguments);
		},

		init: function (options) {},
		post: function (options) {},

		remove: function () {},
		destroy: function () {
			this.removeAllControllers();
			this.removeAllViews();
		},
	});

	return Controller;
});
