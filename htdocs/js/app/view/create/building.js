define(function (require) {
	'use strict';
	var
		View = require('view'),

		// Templates
		template = require('text!templates/create/building.html');

	function CreateBuildingView () { View.apply(this, arguments); }

	_.extend(CreateBuildingView.prototype, View.prototype, {
		classList: ['create', 'building'],

		init: function () {
			console.log('createbuildingview:init');
		},

		renderContent: function () {
			console.log('createbuildingview:render');

			this.el.innerHTML = this.template(template);
		}
	});

	return CreateBuildingView;
});
