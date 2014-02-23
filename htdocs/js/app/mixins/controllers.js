define(function (require) {
	'use strict';

	var ControllersMixin = {
		_defaultRole: 'root',

		// Installer
		mixinControllers: function () {
			this._controllers = {};

			this.parentController = this.options.parentController || undefined;
		},

		addController: function (controller, role) {
			role = role || this._defaultRole;

			this._controllers[role] && this.removeController(role);

			this._controllers[role] = controller;

			return controller;
		},
		getController: function (role) {
			return this._controllers[role || this._defaultRole];
		},
		removeController: function (role) {
			role = role || this._defaultRole;

			var c = this._controllers[role];

			if (!c) { return; }

			c.remove();
			c.destroy();

			this._controllers[role] = undefined;
		},
		removeAllControllers: function () {
			for (var role in this._controllers) {
				this.removeController(role);
			}
		},
		destroy: function () {
			this.removeAllControllers();
		}
	};

	return ControllersMixin;

});
