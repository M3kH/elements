define(function (requirejs) {
	'use strict';

	// Setup our tools.

	// Underscore with .string mixed in.
	var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

	// Our Environment.
	var Environment = require('environment');
	Environment.name = "First Elements World";

	// Controllers
	var
		RootController = require('controller/root');

	var One = new RootController({
		env: Environment
	});

});
