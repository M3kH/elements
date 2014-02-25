define(function (require) {
	'use strict';

	var
		ViewsMixin = require('mixins/views'),
		EventsMixin = require('mixins/events'),

		viewId = 0,
		defaultClassList = ['view'],
		defaultOptions = {
			tagName: 'div'
		};

	function View (options) {
		this.id = ++viewId;
		this.options = _.defaults(options || {}, defaultOptions);

		this._init.apply(this, arguments);
	}


	// Constructor
	_.extend(View.prototype, ViewsMixin, EventsMixin, {
		_init: function () {
			// We're using some mixins
			this.mixinViews();
			this.mixinEvents();

			// Set or create our DOM node, and set our classes
			if (this.options.el instanceof HTMLElement) {
				this.el = this.options.el;
			} else {
				this.create();
			}

			// Add controller to ourself and to the defaultViewOptions
			if (this.options.controller) {
				this.controller = this.options.defaultViewOptions.controller = this.options.controller;
			}

			// Init our initial className(s)
			this.initClasslist(this.classList || defaultClassList);

			// Initialization
			this.init.apply(this, arguments);
			this.post.apply(this, arguments);
		},

		create: function () {
			if (this.el) throw new Error('trying to create existing view');

			this.el = document.createElement(this.options.tagName);
		},

		initClasslist: function (list) {
			this.classList = (list && list.length) ? list : [];

			this.el.classList.add(this.classList);
		},

		bindDomEvents: function () {
			var self = this;

			if (this.domEvents) {
				for (var selector in this.domEvents) {
					[].forEach.call(this.el.querySelectorAll(selector), function (el) {
							for (var event in self.domEvents[selector]) {
								var fnName = self.domEvents[selector][event];
								el.addEventListener(event, self[fnName].bind(self), false);
							}
					});
				}
			}
		},
		unbindDomEvents: function () {
			var self = this;

			if (this.domEvents) {
				for (var selector in this.domEvents) {
					[].forEach.call(this.el.querySelectorAll(selector), function (el) {
							for (var event in self.domEvents[selector]) {
								var fnName = self.domEvents[selector][event];
								el.removeEventListener(event, self[fnName].bind(self));
							}
					});
				}
			}
		},

		render: function (options) {
			options = _.defaults(options || {}, this.options.render || {});

			this.empty();

			// Render out content. This is the function to override
			// to create a views own content.
			this.renderContent(options);

			// Render all our childViews.
			this.renderChildren(options);

			// Bind our domEvents
			this.bindDomEvents();

			return this.el;
		},

		renderContent: function (options) {},

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
			if (this.el) {
				this.unbindDomEvents();

				this.el.parentNode.removeChild(this.el);
			}

			this.el = undefined;
		},

		init: function (options) {},
		post: function (options) {}
	});

	return View;
});
