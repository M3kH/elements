define(function (require) {
	'use strict';

	var
		View = require('view');

	function GameView () { View.apply(this, arguments); }

	_.extend(GameView.prototype, View.prototype, {
		classList: ['game'],

		init: function () {
			console.log('gameview:init');
		}
	});

	return GameView;
});
