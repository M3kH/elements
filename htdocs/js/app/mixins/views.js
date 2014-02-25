define(function (require) {
	'use strict';

	var ViewsMixin = {
		_defaultRole: 'root',

		// Installer
		mixinViews: function () {
			this._views = {};
			this.options.defaultViewOptions = {};
			this.parentView = this.options.parentView || undefined;
		},

		// Views
		addView: function (view, role) {
			role = role || this._defaultRole;

			this._views[role] && this.removeView(role);

			this._views[role] = view;

			return view;
		},
		getView: function (role) {
			return this._views[role || this._defaultRole];
		},
		getViews: function (roles) {
			// Return requested or all views
			if (roles) {
				return this._views.map(function (role) {
					return roles.indexOf(role) ? this : undefined;
				});
			} else {
				return this._views;
			}
		},
		removeView: function (role) {
			role = role || this._defaultRole;

			var v = this._views[role];

			if (!v) { return; }

			v.remove();
			v.destroy();

			this._views[role] = undefined;
		},
		removeAllViews: function () {
			for (var role in this._views) {
				this.removeView(role);
			}
		},

		renderView: function (role) {
			role = role || this._defaultRole;

			this._views[role].render();

			return this._views[role];
		},

		renderViews: function () {
			for (var role in this._views) {
				this._views[role].render();
			}
		}
	};

	return ViewsMixin;

});
