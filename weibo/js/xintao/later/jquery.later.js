/**
 * jQuery Later. Plugin for jQuery Provides a setTimeout/setInterval wrapper
 * 
 * Copyright 2010, Sudar Muthu (http://sudarmuthu.com) Released under MIT
 * 
 */
(function($) {

	$.later = function(when, o, fn, data, periodic) {
		when = when || 0;
		o = o || {};
		var m = fn, d = $.makeArray(data), f, r;

		if (typeof fn === "string") {
			m = o[fn];
		}

		if (!m) {
			// Throw an error about the method
			throw {
				name : 'TypeError',
				message : "The function is undefined."
			}
		}

		f = function() {
			m.apply(o, d);
		};

		r = (periodic) ? setInterval(f, when) : setTimeout(f, when);

		return {
			id : r,
			interval : periodic,
			cancel : function() {
				if (this.interval) {
					clearInterval(r);
				} else {
					clearTimeout(r);
				}
			}
		};
	};
})(jQuery);