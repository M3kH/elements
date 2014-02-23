define(function (require) {
	'use strict';

	var
		ViewsMixin = require('mixins/views'),

		viewId = 0,
		defaultClassList = ['view'],
		defaultOptions = {
			tagName: 'div'
		};

	function View (options) {
		this.id = ++viewId;
		this.options = _.defaults(options || {}, defaultOptions);

		// Set or create our DOM node, and set our classes
		if (this.options.el instanceof HTMLElement) {
			this.el = this.options.el;
		} else {
			this.create();
		}

		this.initClasslist(this.classList || defaultClassList);

		// Initialization
		this.init.apply(this, arguments);
		this.post.apply(this, arguments);
	}

	// Constructor
	_.extend(View.prototype, ViewsMixin, {

		create: function () {
			if (this.el) throw new Error('trying to create existing view');

			this.el = document.createElement(this.options.tagName);
		},

		initClasslist: function (list) {
			this.classList = (list && list.length) ? list : [];

			this.el.classList.add(this.classList);
		},

		render: function (options) {
			options = _.defaults(options || {}, this.options.render || {});

			this.empty();

			this.renderContent(options);
			this.renderChildren(options);

			return this.el;
		},

		renderContent: function (options) {
			this.el.appendChild(document.createTextNode('View '+this.id));
		},
		renderChildren: function (options) {
			for (var role in this.getViews()) {
				this.el.appendChild(this.getView(role).render());
			}
		},

		template: function (template, data) {
			return _.template(template, data);
		},

		empty: function () {
			while (this.el.firstChild) {
				this.el.removeChild(this.el.firstChild);
			}
		},

		remove: function () {},

		destroy: function () {
			console.log(this.el);
			if (this.el) {
				this.el.parentNode.removeChild(this.el);
			}

			this.el = undefined;
		},

		init: function (options) {},
		post: function (options) {}
	});

	return View;
});
