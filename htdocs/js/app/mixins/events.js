define(function (require) {
	'use strict';

	// Event Mixin implementation.
	var Event = function() {
		this._callbacks = [];
	};

	Event.prototype = {
		removeCallback: function(cb) {
			var index = this._getCallbackIndex(cb);

			this._callbacks.splice(index, 1);
		},
		addCallback: function(cb) {
			if(this._getCallbackIndex(cb) === -1) {
				this._callbacks.push(cb);
			}
		},
		executeCallbacks: function() {
			for(var i = 0; i < this._callbacks.length; i++) {
				this._callbacks[i].apply(this, arguments);
			}
		},
		_getCallbackIndex: function(cb) {
			return this._callbacks.indexOf(cb);
		},
	};


	var EventsMixin = {
		mixinEvents: function () {
			this._events = {};
		},

		on: function(eventName, cb) {
			var eventObject;

			if(this._hasEvent(eventName)) {
				eventObject = this._getEvent(eventName);
			} else {
				eventObject = this._addEvent(eventName);
			}

			eventObject.addCallback(cb);
		},
		off: function(eventName, cb) {
			if(!cb) {
				this._removeEvent(eventName);
			} else {
				this._getEvent(eventName).removeCallback(cb);
			}
		},
		trigger: function(eventName) {
			var options;

			if(this._hasEvent(eventName)) {
				var eventObject = this._getEvent(eventName);

				options = Array.prototype.slice.call(arguments, 0);

				options.splice(0,1);

				eventObject.executeCallbacks.apply(eventObject, options);
			}
		},
		_hasEvent: function(eventName) {
			return this._events[eventName] !== undefined;
		},
		_addEvent: function(eventName) {
			this._events[eventName] = new Event(eventName);

			return this._events[eventName];
		},
		_getEvent: function(eventName) {
			return this._events[eventName];
		},
		_removeEvent: function(eventName) {
			delete this._events[eventName];
		}
	};

	return EventsMixin;
});
