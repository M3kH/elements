define(function (require) {
	'use strict';

	var Environment = function (options) {
		this.options = options || {};
	};

	Environment.prototype = {
		server: 'http://dummy.com',
		urlBase: '/'
	};

	var Instance = new Environment();

	return Instance;
});
