jQuery.fn.extend({
	_load : jQuery.fn.load,
	load : function(url, params, callback) {
		if (typeof url != 'string')
			return this._load(url);
		var off = url.indexOf(" ");
		if (off >= 0) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}
		callback = callback || function() {
		};
		var type = "GET";
		if (params)
			if (jQuery.isFunction(params)) {
				callback = params;
				params = null;
			} else if (typeof params == 'object') {
				params = jQuery.param(params);
				type = "POST";
			}
		var self = this;
		jQuery.ajax({
					url : url,
					type : type,
					dataType : "html",
					data : params,
					complete : function(res, status) {
						if (status == "success" || status == "notmodified")
							self.html(selector ? jQuery("<div/>")
									.append(res.responseText.replace(
											/<script(.|\s)*?\/script>/g, ""))
									.find(selector) : res.responseText);
						self.each(callback, [res.responseText, status, res]);
					}
				});
		return this;
	},
	serialize : function() {
		return jQuery.param(this.serializeArray());
	},
	serializeArray : function() {
		return this.map(function() {
			return jQuery.nodeName(this, "form") ? jQuery
					.makeArray(this.elements) : this;
		}).filter(function() {
			return this.name
					&& !this.disabled
					&& (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i
							.test(this.type));
		}).map(function(i, elem) {
			var val = jQuery(this).val();
			return val == null ? null : val.constructor == Array ? jQuery.map(
					val, function(val, i) {
						return {
							name : elem.name,
							value : val
						};
					}) : {
				name : elem.name,
				value : val
			};
		}).get();
	}
});
jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend"
				.split(","), function(i, o) {
			jQuery.fn[o] = function(f) {
				return this.bind(o, f);
			};
		});
function now() {
}
var jsc = now();
jQuery.extend({
	get : function(url, data, callback, type) {
		if (jQuery.isFunction(data)) {
			callback = data;
			data = null;
		}
		return jQuery.ajax({
					type : "GET",
					url : url,
					data : data,
					success : callback,
					dataType : type
				});
	},
	getScript : function(url, callback) {
		return jQuery.get(url, null, callback, "script");
	},
	getJSON : function(url, data, callback) {
		return jQuery.get(url, data, callback, "json");
	},
	post : function(url, data, callback, type) {
		if (jQuery.isFunction(data)) {
			callback = data;
			data = {};
		}
		return jQuery.ajax({
					type : "POST",
					url : url,
					data : data,
					success : callback,
					dataType : type
				});
	},
	ajaxSetup : function(settings) {
		jQuery.extend(jQuery.ajaxSettings, settings);
	},
	ajaxSettings : {
		url : location.href,
		global : true,
		type : "GET",
		timeout : 0,
		contentType : "application/x-www-form-urlencoded",
		processData : true,
		async : true,
		data : null,
		username : null,
		password : null,
		accepts : {
			xml : "application/xml, text/xml",
			html : "text/html",
			script : "text/javascript, application/javascript",
			json : "application/json, text/javascript",
			text : "text/plain",
			_default : "*/*"
		}
	},
	lastModified : {},
	ajax : function(s) {
		s = jQuery.extend(true, s, jQuery.extend(true, {}, jQuery.ajaxSettings,
						s));
		var jsonp, jsre = /=\?(&|$)/g, status, data, type = s.type
				.toUpperCase();
		if (s.data && s.processData && typeof s.data != "string")
			s.data = jQuery.param(s.data);
		if (s.dataType == "jsonp") {
			if (type == "GET") {
				if (!s.url.match(jsre))
					s.url += (s.url.match(/\?/) ? "&" : "?")
							+ (s.jsonp || "callback") + "=?";
			} else if (!s.data || !s.data.match(jsre))
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback")
						+ "=?";
			s.dataType = "json";
		}
		if (s.dataType == "json"
				&& (s.data && s.data.match(jsre) || s.url.match(jsre))) {
			jsonp = "jsonp" + jsc++;
			if (s.data)
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			s.url = s.url.replace(jsre, "=" + jsonp + "$1");
			s.dataType = "script";
			window[jsonp] = function(tmp) {
				data = tmp;
				success();
				complete();
				window[jsonp] = undefined;
				try {
					delete window[jsonp];
				} catch (e) {
				}
				if (head)
					head.removeChild(script);
			};
		}
		if (s.dataType == "script" && s.cache == null)
			s.cache = false;
		if (s.cache === false && type == "GET") {
			var ts = now();
			var ret = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + ts + "$2");
			s.url = ret
					+ ((ret == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_="
							+ ts : "");
		}
		if (s.data && type == "GET") {
			s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;
			s.data = null;
		}
		if (s.global && !jQuery.active++)
			jQuery.event.trigger("ajaxStart");
		var parts = /^(\w+:)?\/\/([^\/?#]+)/.exec(s.url);
		if (s.dataType == "script"
				&& type == "GET"
				&& parts
				&& (parts[1] && parts[1] != location.protocol || parts[2] != location.host)) {
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = s.url;
			if (s.scriptCharset)
				script.charset = s.scriptCharset;
			if (!jsonp) {
				var done = false;
				script.onload = script.onreadystatechange = function() {
					if (!done
							&& (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
						done = true;
						success();
						complete();
						head.removeChild(script);
					}
				};
			}
			head.appendChild(script);
			return undefined;
		}
		var requestDone = false;
		var xhr = window.ActiveXObject
				? new ActiveXObject("Microsoft.XMLHTTP")
				: new XMLHttpRequest();
		if (s.username)
			xhr.open(type, s.url, s.async, s.username, s.password);
		else
			xhr.open(type, s.url, s.async);
		try {
			if (s.data)
				xhr.setRequestHeader("Content-Type", s.contentType);
			if (s.ifModified)
				xhr.setRequestHeader("If-Modified-Since",
						jQuery.lastModified[s.url]
								|| "Thu, 01 Jan 1970 00:00:00 GMT");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType]
							? s.accepts[s.dataType] + ", */*"
							: s.accepts._default);
		} catch (e) {
		}
		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
			s.global && jQuery.active--;
			xhr.abort();
			return false;
		}
		if (s.global)
			jQuery.event.trigger("ajaxSend", [xhr, s]);
		var onreadystatechange = function(isTimeout) {
			if (!requestDone && xhr
					&& (xhr.readyState == 4 || isTimeout == "timeout")) {
				requestDone = true;
				if (ival) {
					clearInterval(ival);
					ival = null;
				}
				status = isTimeout == "timeout" ? "timeout" : !jQuery
						.httpSuccess(xhr) ? "error" : s.ifModified
						&& jQuery.httpNotModified(xhr, s.url)
						? "notmodified"
						: "success";
				if (status == "success") {
					try {
						data = jQuery.httpData(xhr, s.dataType, s);
					} catch (e) {
						status = "parsererror";
					}
				}
				if (status == "success") {
					var modRes;
					try {
						modRes = xhr.getResponseHeader("Last-Modified");
					} catch (e) {
					}
					if (s.ifModified && modRes)
						jQuery.lastModified[s.url] = modRes;
					if (!jsonp)
						success();
				} else
					jQuery.handleError(s, xhr, status);
				complete();
				if (s.async)
					xhr = null;
			}
		};
		if (s.async) {
			var ival = setInterval(onreadystatechange, 13);
			if (s.timeout > 0)
				setTimeout(function() {
							if (xhr) {
								xhr.abort();
								if (!requestDone)
									onreadystatechange("timeout");
							}
						}, s.timeout);
		}
		try {
			xhr.send(s.data);
		} catch (e) {
			jQuery.handleError(s, xhr, null, e);
		}
		if (!s.async)
			onreadystatechange();
		function success() {
			if (s.success)
				s.success(data, status);
			if (s.global)
				jQuery.event.trigger("ajaxSuccess", [xhr, s]);
		}
		function complete() {
			if (s.complete)
				s.complete(xhr, status);
			if (s.global)
				jQuery.event.trigger("ajaxComplete", [xhr, s]);
			if (s.global && !--jQuery.active)
				jQuery.event.trigger("ajaxStop");
		}
		return xhr;
	},
	handleError : function(s, xhr, status, e) {
		if (s.error)
			s.error(xhr, status, e);
		if (s.global)
			jQuery.event.trigger("ajaxError", [xhr, s, e]);
	},
	active : 0,
	httpSuccess : function(xhr) {
		try {
			return !xhr.status && location.protocol == "file:"
					|| (xhr.status >= 200 && xhr.status < 300)
					|| xhr.status == 304 || xhr.status == 1223
					|| jQuery.browser.safari && xhr.status == undefined;
		} catch (e) {
		}
		return false;
	},
	httpNotModified : function(xhr, url) {
		try {
			var xhrRes = xhr.getResponseHeader("Last-Modified");
			return xhr.status == 304 || xhrRes == jQuery.lastModified[url]
					|| jQuery.browser.safari && xhr.status == undefined;
		} catch (e) {
		}
		return false;
	},
	httpData : function(xhr, type, s) {
		var ct = xhr.getResponseHeader("content-type"), xml = type == "xml"
				|| !type && ct && ct.indexOf("xml") >= 0, data = xml
				? xhr.responseXML
				: xhr.responseText;
		if (xml && data.documentElement.tagName == "parsererror")
			throw "parsererror";
		if (s && s.dataFilter)
			data = s.dataFilter(data, type);
		if (type == "script")
			jQuery.globalEval(data);
		if (type == "json")
			data = eval("(" + data + ")");
		return data;
	},
	param : function(a) {
		var s = [];
		function add(key, value) {
			s[s.length] = encodeURIComponent(key) + '='
					+ encodeURIComponent(value);
		};
		if (a.constructor == Array || a.jquery)
			jQuery.each(a, function() {
						add(this.name, this.value);
					});
		else
			for (var j in a)
				if (a[j] && a[j].constructor == Array)
					jQuery.each(a[j], function() {
								add(j, this);
							});
				else
					add(j, jQuery.isFunction(a[j]) ? a[j]() : a[j]);
		return s.join("&").replace(/%20/g, "+");
	}
});
jQuery.fn.textlimit = function(counter_el, thelimit, speed) {
	var charDelSpeed = speed || 15;
	var toggleCharDel = speed != -1;
	var toggleTrim = true;
	var that = this[0];
	updateCounter();
	function updateCounter() {
		jQuery(counter_el).text(thelimit
				- parseInt(GetStringLength(that.value)));
	};
	this.keypress(function(e) {
				if (GetStringLength(this.value) >= thelimit
						&& e.charCode != '0')
					e.preventDefault()
			}).keyup(function(e) {
		updateCounter();
		if (GetStringLength(this.value) >= thelimit && toggleTrim) {
			if (toggleCharDel) {
				that.value = that.value.substr(0, thelimit * 2 + 100);
				var init = setInterval(function() {
							if (GetStringLength(that.value) <= thelimit) {
								init = clearInterval(init);
								updateCounter()
							} else {
								that.value = that.value.substring(0,
										that.value.length - 1);
								jQuery(counter_el).text('trimming...  '
										+ (thelimit - that.value.length));
							};
						}, charDelSpeed);
			} else
				this.value = that.value.substr(0, thelimit);
		}
	}).focus(function() {
				updateCounter();
			});
};
/*
 * jQuery corner plugin: simple corner rounding Examples and documentation at:
 * http://jquery.malsup.com/corner/ version 2.03 (05-DEC-2009) Dual licensed
 * under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
;
(function($) {
	var ua = navigator.userAgent;
	var moz = $.browser.mozilla && /gecko/i.test(ua);
	var webkit = $.browser.safari && /Safari\/[5-9]/.test(ua);
	var expr = $.browser.msie && (function() {
		var div = document.createElement('div');
		try {
			div.style.setExpression('width', '0+0');
			div.style.removeExpression('width');
		} catch (e) {
			return false;
		}
		return true;
	})();
	function sz(el, p) {
		return parseInt($.css(el, p)) || 0;
	};
	function hex2(s) {
		var s = parseInt(s).toString(16);
		return (s.length < 2) ? '0' + s : s;
	};
	function gpc(node) {
		for (; node && node.nodeName.toLowerCase() != 'html'; node = node.parentNode) {
			var v = $.css(node, 'backgroundColor');
			if (v == 'rgba(0, 0, 0, 0)')
				continue;
			if (v.indexOf('rgb') >= 0) {
				var rgb = v.match(/\d+/g);
				return '#' + hex2(rgb[0]) + hex2(rgb[1]) + hex2(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	};
	function getWidth(fx, i, width) {
		switch (fx) {
			case 'round' :
				return Math.round(width * (1 - Math.cos(Math.asin(i / width))));
			case 'cool' :
				return Math.round(width * (1 + Math.cos(Math.asin(i / width))));
			case 'sharp' :
				return Math.round(width * (1 - Math.cos(Math.acos(i / width))));
			case 'bite' :
				return Math.round(width
						* (Math.cos(Math.asin((width - i - 1) / width))));
			case 'slide' :
				return Math.round(width * (Math.atan2(i, width / i)));
			case 'jut' :
				return Math.round(width * (Math.atan2(width, (width - i - 1))));
			case 'curl' :
				return Math.round(width * (Math.atan(i)));
			case 'tear' :
				return Math.round(width * (Math.cos(i)));
			case 'wicked' :
				return Math.round(width * (Math.tan(i)));
			case 'long' :
				return Math.round(width * (Math.sqrt(i)));
			case 'sculpt' :
				return Math.round(width * (Math.log((width - i - 1), width)));
			case 'dog' :
				return (i & 1) ? (i + 1) : width;
			case 'dog2' :
				return (i & 2) ? (i + 1) : width;
			case 'dog3' :
				return (i & 3) ? (i + 1) : width;
			case 'fray' :
				return (i % 2) * width;
			case 'notch' :
				return width;
			case 'bevel' :
				return i + 1;
		}
	};
	$.fn.corner = function(options) {
		if (this.length == 0) {
			if (!$.isReady && this.selector) {
				var s = this.selector, c = this.context;
				$(function() {
							$(s, c).corner(options);
						});
			}
			return this;
		}
		return this.each(function(index) {
			var $this = $(this);
			var o = [options || '',
					$this.attr($.fn.corner.defaults.metaAttr) || ''].join(' ')
					.toLowerCase();
			var keep = /keep/.test(o);
			var cc = ((o.match(/cc:(#[0-9a-f]+)/) || [])[1]);
			var sc = ((o.match(/sc:(#[0-9a-f]+)/) || [])[1]);
			var width = parseInt((o.match(/(\d+)px/) || [])[1]) || 10;
			var re = /round|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dog/;
			var fx = ((o.match(re) || ['round'])[0]);
			var edges = {
				T : 0,
				B : 1
			};
			var opts = {
				TL : /top|tl|left/.test(o),
				TR : /top|tr|right/.test(o),
				BL : /bottom|bl|left/.test(o),
				BR : /bottom|br|right/.test(o)
			};
			if (!opts.TL && !opts.TR && !opts.BL && !opts.BR)
				opts = {
					TL : 1,
					TR : 1,
					BL : 1,
					BR : 1
				};
			if ($.fn.corner.defaults.useNative && fx == 'round'
					&& (moz || webkit) && !cc && !sc) {
				if (opts.TL)
					$this.css(moz
									? '-moz-border-radius-topleft'
									: '-webkit-border-top-left-radius', width
									+ 'px');
				if (opts.TR)
					$this.css(moz
									? '-moz-border-radius-topright'
									: '-webkit-border-top-right-radius', width
									+ 'px');
				if (opts.BL)
					$this.css(moz
									? '-moz-border-radius-bottomleft'
									: '-webkit-border-bottom-left-radius',
							width + 'px');
				if (opts.BR)
					$this.css(moz
									? '-moz-border-radius-bottomright'
									: '-webkit-border-bottom-right-radius',
							width + 'px');
				return;
			}
			var strip = document.createElement('div');
			strip.style.overflow = 'hidden';
			strip.style.height = '1px';
			strip.style.backgroundColor = sc || 'transparent';
			strip.style.borderStyle = 'solid';
			var pad = {
				T : parseInt($.css(this, 'paddingTop')) || 0,
				R : parseInt($.css(this, 'paddingRight')) || 0,
				B : parseInt($.css(this, 'paddingBottom')) || 0,
				L : parseInt($.css(this, 'paddingLeft')) || 0
			};
			if (typeof this.style.zoom != undefined)
				this.style.zoom = 1;
			if (!keep)
				this.style.border = 'none';
			strip.style.borderColor = cc || gpc(this.parentNode);
			var cssHeight = $.curCSS(this, 'height');
			for (var j in edges) {
				var bot = edges[j];
				if ((bot && (opts.BL || opts.BR))
						|| (!bot && (opts.TL || opts.TR))) {
					strip.style.borderStyle = 'none '
							+ (opts[j + 'R'] ? 'solid' : 'none') + ' none '
							+ (opts[j + 'L'] ? 'solid' : 'none');
					var d = document.createElement('div');
					$(d).addClass('jquery-corner');
					var ds = d.style;
					bot ? this.appendChild(d) : this.insertBefore(d,
							this.firstChild);
					if (bot && cssHeight != 'auto') {
						if ($.css(this, 'position') == 'static')
							this.style.position = 'relative';
						ds.position = 'absolute';
						ds.bottom = ds.left = ds.padding = ds.margin = '0';
						if (expr)
							ds.setExpression('width',
									'this.parentNode.offsetWidth');
						else
							ds.width = '100%';
					} else if (!bot && $.browser.msie) {
						if ($.css(this, 'position') == 'static')
							this.style.position = 'relative';
						ds.position = 'absolute';
						ds.top = ds.left = ds.right = ds.padding = ds.margin = '0';
						if (expr) {
							var bw = sz(this, 'borderLeftWidth')
									+ sz(this, 'borderRightWidth');
							ds.setExpression('width',
									'this.parentNode.offsetWidth - ' + bw
											+ '+ "px"');
						} else
							ds.width = '100%';
					} else {
						ds.position = 'relative';
						ds.margin = !bot
								? '-' + pad.T + 'px -' + pad.R + 'px '
										+ (pad.T - width) + 'px -' + pad.L
										+ 'px'
								: (pad.B - width) + 'px -' + pad.R + 'px -'
										+ pad.B + 'px -' + pad.L + 'px';
					}
					for (var i = 0; i < width; i++) {
						var w = Math.max(0, getWidth(fx, i, width));
						var e = strip.cloneNode(false);
						e.style.borderWidth = '0 ' + (opts[j + 'R'] ? w : 0)
								+ 'px 0 ' + (opts[j + 'L'] ? w : 0) + 'px';
						bot ? d.appendChild(e) : d
								.insertBefore(e, d.firstChild);
					}
				}
			}
		});
	};
	$.fn.uncorner = function() {
		if (moz || webkit)
			this.css(moz ? '-moz-border-radius' : '-webkit-border-radius', 0);
		$('div.jquery-corner', this).remove();
		return this;
	};
	$.fn.corner.defaults = {
		useNative : true,
		metaAttr : 'data-corner'
	};
})(jQuery);;
(function($) {
	$.fn.extend({
				autocomplete : function(urlOrData, options) {
					var isUrl = typeof urlOrData == "string";
					options = $.extend({}, $.Autocompleter.defaults, {
								url : isUrl ? urlOrData : null,
								data : isUrl ? null : urlOrData,
								delay : isUrl
										? $.Autocompleter.defaults.delay
										: 10,
								max : options && !options.scroll ? 10 : 150
							}, options);
					options.highlight = options.highlight || function(value) {
						return value;
					};
					options.formatMatch = options.formatMatch
							|| options.formatItem;
					return this.each(function() {
								new $.Autocompleter(this, options);
							});
				},
				result : function(handler) {
					return this.bind("result", handler);
				},
				search : function(handler) {
					return this.trigger("search", [handler]);
				},
				flushCache : function() {
					return this.trigger("flushCache");
				},
				setOptions : function(options) {
					return this.trigger("setOptions", [options]);
				},
				unautocomplete : function() {
					return this.trigger("unautocomplete");
				}
			});
	$.Autocompleter = function(input, options) {
		var KEY = {
			UP : 38,
			DOWN : 40,
			DEL : 46,
			TAB : 9,
			RETURN : 13,
			ESC : 27,
			COMMA : 188,
			PAGEUP : 33,
			PAGEDOWN : 34,
			BACKSPACE : 8
		};
		var $input = $(input).attr("autocomplete", "off")
				.addClass(options.inputClass);
		var timeout;
		var previousValue = "";
		var cache = $.Autocompleter.Cache(options);
		var hasFocus = 0;
		var lastKeyPressCode;
		var config = {
			mouseDownOnSelect : false
		};
		var select = $.Autocompleter.Select(options, input, selectCurrent,
				config);
		var blockSubmit;
		$.browser.opera
				&& $(input.form).bind("submit.autocomplete", function() {
							if (blockSubmit) {
								blockSubmit = false;
								return false;
							}
						});
		$input.bind(
				($.browser.opera ? "keypress" : "keydown") + ".autocomplete",
				function(event) {
					hasFocus = 1;
					lastKeyPressCode = event.keyCode;
					switch (event.keyCode) {
						case KEY.UP :
							event.preventDefault();
							if (select.visible()) {
								select.prev();
								return false;
							} else {
								onChange(0, true);
							}
							break;
						case KEY.DOWN :
							event.preventDefault();
							if (select.visible()) {
								select.next();
							} else {
								onChange(0, true);
							}
							break;
						case KEY.PAGEUP :
							event.preventDefault();
							if (select.visible()) {
								select.pageUp();
							} else {
								onChange(0, true);
							}
							break;
						case KEY.PAGEDOWN :
							event.preventDefault();
							if (select.visible()) {
								select.pageDown();
							} else {
								onChange(0, true);
							}
							break;
						case options.multiple
								&& $.trim(options.multipleSeparator) == ","
								&& KEY.COMMA :
						case KEY.TAB :
						case KEY.RETURN :
							if (selectCurrent()) {
								event.preventDefault();
								blockSubmit = true;
								return false;
							}
							break;
						case KEY.ESC :
							select.hide();
							break;
						default :
							clearTimeout(timeout);
							timeout = setTimeout(onChange, options.delay);
							break;
					}
				}).focus(function() {
					hasFocus++;
				}).blur(function() {
					hasFocus = 0;
					if (!config.mouseDownOnSelect) {
						hideResults();
					}
				}).click(function() {
					if (hasFocus++ > 1 && !select.visible()) {
						onChange(0, true);
					}
				}).bind("search", function() {
			var fn = (arguments.length > 1) ? arguments[1] : null;
			function findValueCallback(q, data) {
				var result;
				if (data && data.length) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].result.toLowerCase() == q.toLowerCase()) {
							result = data[i];
							break;
						}
					}
				}
				if (typeof fn == "function")
					fn(result);
				else
					$input.trigger("result", result
									&& [result.data, result.value]);
			}
			$.each(trimWords($input.val()), function(i, value) {
						request(value, findValueCallback, findValueCallback);
					});
		}).bind("flushCache", function() {
					cache.flush();
				}).bind("setOptions", function() {
					$.extend(options, arguments[1]);
					if ("data" in arguments[1])
						cache.populate();
				}).bind("unautocomplete", function() {
					select.unbind();
					$input.unbind();
					$(input.form).unbind(".autocomplete");
				}).bind("input", function() {
					onChange(0, true);
				});
		function fixString(word, newValue) {
			var index = word.lastIndexOf('@');
			if (index >= 0) {
				newValue = word.substring(0, index) + newValue;
			}
			return newValue;
		}
		function selectCurrent() {
			var selected = select.selected();
			if (!selected)
				return false;
			var v = '@' + selected.result;
			previousValue = v;
			if (options.multiple) {
				var words = trimWords($input.val(), false);
				if (words.length > 1) {
					var seperator = options.multipleSeparator.length;
					var cursorAt = getCursortPosition(input);
					if (document.all) {
						var enterCount = $(input).val().split('\n').length - 1;
						if (enterCount > 0) {
							cursorAt -= enterCount;
						}
					}
					var wordAt, progress = 0;
					$.each(words, function(i, word) {
								progress += word.length;
								if (cursorAt <= progress) {
									wordAt = i;
									return false;
								}
								progress += seperator;
							});
					var cursorAtInWord = cursorAt
							- words.slice(0, wordAt)
									.join(options.multipleSeparator).length - 1;
					var atAtInWord = words[wordAt].substring(0, cursorAtInWord)
							.lastIndexOf('@');
					words[wordAt] = words[wordAt].substring(0, atAtInWord) + v;
					v = words.join(options.multipleSeparator);
				} else {
					var cursorAt = $(input).selection().start;
					var atAt = $input.val().substring(0, cursorAt)
							.lastIndexOf('@');
					v = $input.val().substring(0, atAt) + v;
				}
				v += options.multipleSeparator;
			}
			$input.val(v);
			hideResultsNow();
			$input.trigger("result", [selected.data, selected.value]);
			return true;
		}
		function onChange(crap, skipPrevCheck) {
			if (lastKeyPressCode == KEY.DEL) {
				select.hide();
				return;
			}
			var v = $(input).val();
			var cursorPos = getCursortPosition(input);
			var separatorPos = v.substring(0, cursorPos)
					.lastIndexOf(options.multipleSeparator);
			if (v.substring(separatorPos, cursorPos).indexOf('@') < 0) {
				select.hide();
				return;
			}
			var currentValue = $input.val();
			if (!skipPrevCheck && currentValue == previousValue)
				return;
			previousValue = currentValue;
			currentValue = lastWord(currentValue);
			if (currentValue.length >= options.minChars) {
				$input.addClass(options.loadingClass);
				if (!options.matchCase)
					currentValue = currentValue.toLowerCase();
				request(currentValue, receiveData, hideResultsNow);
			} else {
				stopLoading();
				select.hide();
			}
		};
		function trimWords(value, withAtSymbol) {
			if (withAtSymbol == null)
				withAtSymbol = true;
			if (!value)
				return [""];
			if (!options.multiple)
				return [$.trim(value)];
			var arr = (withAtSymbol) ? value.split(/\s|\x40/) : value
					.split(options.multipleSeparator);
			return $.map(arr, function(word) {
						return $.trim(value).length ? word : null;
					});
		}
		function lastWord(value) {
			if (!options.multiple)
				return value;
			var words = trimWords(value, false);
			if (words.length == 1)
				return words[0];
			var cursorAt = $(input).selection().start;
			if (cursorAt == value.length) {
				words = trimWords(value, false)
			} else {
				words = trimWords(value.replace(value.substring(cursorAt), ""),
						false);
			}
			return words[words.length - 1];
		}
		function autoFill(q, sValue) {
			if (options.autoFill
					&& (lastWord($input.val()).toLowerCase() == q.toLowerCase())
					&& lastKeyPressCode != KEY.BACKSPACE) {
				$input.val($input.val()
						+ sValue.substring(lastWord(previousValue).length));
				$(input).selection(previousValue.length,
						previousValue.length + sValue.length);
			}
		};
		function hideResults() {
			clearTimeout(timeout);
			timeout = setTimeout(hideResultsNow, 200);
		};
		function hideResultsNow() {
			var wasVisible = select.visible();
			select.hide();
			clearTimeout(timeout);
			stopLoading();
			if (options.mustMatch) {
				$input.search(function(result) {
							if (!result) {
								if (options.multiple) {
									var words = trimWords($input.val()).slice(
											0, -1);
									$input.val(words
											.join(options.multipleSeparator)
											+ (words.length
													? options.multipleSeparator
													: ""));
								} else {
									$input.val("");
									$input.trigger("result", null);
								}
							}
						});
			}
		};
		function receiveData(q, data) {
			if (data && data.length && hasFocus) {
				stopLoading();
				select.display(data, q);
				autoFill(q, data[0].value);
				select.show();
			} else {
				hideResultsNow();
			}
		};
		function request(term, success, failure) {
			var atIndex = term.lastIndexOf('@');
			if (atIndex < 0 || term.length == atIndex + 1) {
				return;
			} else {
				term = term.substring(atIndex + 1);
			}
			if (!options.matchCase)
				term = term.toLowerCase();
			var data = cache.load(term);
			if (data && data.length) {
				success(term, data);
			} else if ((typeof options.url == "string")
					&& (options.url.length > 0)) {
				var extraParams = {
					timestamp : +new Date()
				};
				$.each(options.extraParams, function(key, param) {
							extraParams[key] = typeof param == "function"
									? param()
									: param;
						});
				$.ajax({
							mode : "abort",
							port : "autocomplete" + input.name,
							dataType : options.dataType,
							url : options.url,
							data : $.extend({
										q : term,
										limit : options.max
									}, extraParams),
							success : function(data) {
								var parsed = options.parse
										&& options.parse(data) || parse(data);
								cache.add(term, parsed);
								success(term, parsed);
							}
						});
			} else {
				select.emptyList();
				failure(term);
			}
		};
		function parse(data) {
			var parsed = [];
			var rows = data.split("\n");
			for (var i = 0; i < rows.length; i++) {
				var row = $.trim(rows[i]);
				if (row) {
					row = row.split("|");
					parsed[parsed.length] = {
						data : row,
						value : row[0],
						result : options.formatResult
								&& options.formatResult(row, row[0]) || row[0]
					};
				}
			}
			return parsed;
		};
		function stopLoading() {
			$input.removeClass(options.loadingClass);
		};
	};
	$.Autocompleter.defaults = {
		inputClass : "ac_input",
		resultsClass : "ac_results",
		loadingClass : "ac_loading",
		minChars : 1,
		delay : 400,
		matchCase : false,
		matchSubset : true,
		matchContains : false,
		cacheLength : 10,
		max : 100,
		mustMatch : false,
		extraParams : {},
		selectFirst : true,
		formatItem : function(row) {
			return row[0];
		},
		formatMatch : null,
		autoFill : false,
		width : 0,
		multiple : false,
		multipleSeparator : ", ",
		highlight : function(value, term) {
			return value
					.replace(
							new RegExp(
									"(?![^&;]+;)(?!<[^<>]*)("
											+ term
													.replace(
															/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,
															"\\$1")
											+ ")(?![^<>]*>)(?![^&;]+;)", "gi"),
							"<strong>$1</strong>");
		},
		scroll : true,
		scrollHeight : 180
	};
	$.Autocompleter.Cache = function(options) {
		var data = {};
		var length = 0;
		function matchSubset(s, sub) {
			if (!options.matchCase)
				s = s.toLowerCase();
			var i = s.indexOf(sub);
			if (options.matchContains == "word") {
				i = s.toLowerCase().search("\\b" + sub.toLowerCase());
			}
			if (i == -1)
				return false;
			return i == 0 || options.matchContains;
		};
		function add(q, value) {
			if (length > options.cacheLength) {
				flush();
			}
			if (!data[q]) {
				length++;
			}
			data[q] = value;
		}
		function populate() {
			if (!options.data)
				return false;
			var stMatchSets = {}, nullData = 0;
			if (!options.url)
				options.cacheLength = 1;
			stMatchSets[""] = [];
			for (var i = 0, ol = options.data.length; i < ol; i++) {
				var rawValue = options.data[i];
				rawValue = (typeof rawValue == "string")
						? [rawValue]
						: rawValue;
				var value = options.formatMatch(rawValue, i + 1,
						options.data.length);
				if (value === false)
					continue;
				var firstChar = value.charAt(0).toLowerCase();
				if (!stMatchSets[firstChar])
					stMatchSets[firstChar] = [];
				var row = {
					value : value,
					data : rawValue,
					result : options.formatResult
							&& options.formatResult(rawValue) || value
				};
				stMatchSets[firstChar].push(row);
				if (nullData++ < options.max) {
					stMatchSets[""].push(row);
				}
			};
			$.each(stMatchSets, function(i, value) {
						options.cacheLength++;
						add(i, value);
					});
		}
		setTimeout(populate, 25);
		function flush() {
			data = {};
			length = 0;
		}
		return {
			flush : flush,
			add : add,
			populate : populate,
			load : function(q) {
				if (!options.cacheLength || !length)
					return null;
				if (!options.url && options.matchContains) {
					var csub = [];
					for (var k in data) {
						if (k.length > 0) {
							var c = data[k];
							$.each(c, function(i, x) {
										if (matchSubset(x.value, q)) {
											csub.push(x);
										}
									});
						}
					}
					return csub;
				} else if (data[q]) {
					return data[q];
				} else if (options.matchSubset) {
					for (var i = q.length - 1; i >= options.minChars; i--) {
						var c = data[q.substr(0, i)];
						if (c) {
							var csub = [];
							$.each(c, function(i, x) {
										if (matchSubset(x.value, q)) {
											csub[csub.length] = x;
										}
									});
							return csub;
						}
					}
				}
				return null;
			}
		};
	};
	$.Autocompleter.Select = function(options, input, select, config) {
		var CLASSES = {
			ACTIVE : "ac_over"
		};
		var listItems, active = -1, data, term = "", needsInit = true, element, list;
		function init() {
			if (!needsInit)
				return;
			element = $("<div/>").hide().addClass(options.resultsClass).css(
					"position", "absolute").appendTo(document.body);
			list = $("<ul/>").appendTo(element).mouseover(function(event) {
				if (target(event).nodeName
						&& target(event).nodeName.toUpperCase() == 'LI') {
					active = $("li", list).removeClass(CLASSES.ACTIVE)
							.index(target(event));
					$(target(event)).addClass(CLASSES.ACTIVE);
				}
			}).click(function(event) {
						$(target(event)).addClass(CLASSES.ACTIVE);
						select();
						input.focus();
						return false;
					}).mousedown(function() {
						config.mouseDownOnSelect = true;
					}).mouseup(function() {
						config.mouseDownOnSelect = false;
					});
			if (options.width > 0)
				element.css("width", options.width);
			needsInit = false;
		}
		function target(event) {
			var element = event.target;
			while (element && element.tagName != "LI")
				element = element.parentNode;
			if (!element)
				return [];
			return element;
		}
		function moveSelect(step) {
			listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
			movePosition(step);
			var activeItem = listItems.slice(active, active + 1)
					.addClass(CLASSES.ACTIVE);
			if (options.scroll) {
				var offset = 0;
				listItems.slice(0, active).each(function() {
							offset += this.offsetHeight;
						});
				if ((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
					list.scrollTop(offset + activeItem[0].offsetHeight
							- list.innerHeight());
				} else if (offset < list.scrollTop()) {
					list.scrollTop(offset);
				}
			}
		};
		function movePosition(step) {
			active += step;
			if (active < 0) {
				active = listItems.size() - 1;
			} else if (active >= listItems.size()) {
				active = 0;
			}
		}
		function limitNumberOfItems(available) {
			return options.max && options.max < available
					? options.max
					: available;
		}
		function fillList() {
			list.empty();
			var max = limitNumberOfItems(data.length);
			for (var i = 0; i < max; i++) {
				if (!data[i])
					continue;
				var formatted = options.formatItem(data[i].data, i + 1, max,
						data[i].value, term);
				if (formatted === false)
					continue;
				var li = $("<li/>").html(options.highlight(formatted, term))
						.addClass(i % 2 == 0 ? "ac_even" : "ac_odd")
						.appendTo(list)[0];
				$.data(li, "ac_data", data[i]);
			}
			listItems = list.find("li");
			if (options.selectFirst) {
				listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
				active = 0;
			}
			if ($.fn.bgiframe)
				list.bgiframe();
		}
		function getTaCurOffset($ta) {
			var taElement = $ta.get(0);
			var sContent = $ta.val();
			var oPosition = $ta.offset();
			var bGTE = jQuery.browser.mozilla || jQuery.browser.msie;
			var lineHeight = $ta.css('line-height').replace(/[^0-9]/g, '');
			lineHeight = parseFloat(lineHeight);
			var charsPerLine = taElement.cols;
			var charWidth = parseFloat($ta.innerWidth() / charsPerLine);
			var utfCharWidth = parseInt($ta.css('font-size').replace(/[^0-9]/g,
					''));
			var iLines = 1;
			var sWord = '';
			var oSelection = $ta.selection();
			var aLetters = sContent.split("");
			var aLines = [];
			for (var w = 0; w < aLetters.length; w++) {
				if (aLetters[w] == "\n") {
					aLines.push(w);
					sWord = '';
				} else {
					sWord += aLetters[w].toString();
				}
			}
			var getWidth = function(str) {
				var smallCount = 0;
				var letters = str.split('');
				for (var i = 0; i < letters.length; i++) {
					if (letters[i].charCodeAt() < 128) {
						smallCount++;
					};
				}
				return (str.length - smallCount) * utfCharWidth + smallCount
						* charWidth;
			}
			var iLine = 0;
			for (; iLine < aLines.length; iLine++) {
				if (oSelection.end < aLines[iLine]) {
					iLine--;
					break;
				}
			}
			if (iLine < 0) {
				iLine = 0;
			}
			if (iLine > 0) {
				var start = aLines[iLine - 1] + 1;
				var str = sContent.substring(start, oSelection.end);
				var x = getWidth(str);
			} else {
				var x = getWidth(sContent.substring(0, oSelection.end));
			}
			var y = (iLine + 1) * lineHeight - taElement.scrollTop;
			var div = Math.floor(x / $ta.width());
			if (div > 0) {
				x = x % $ta.width();
				y += lineHeight * div;
			}
			return {
				x : oPosition.left + x,
				y : oPosition.top + y
			};
		}
		return {
			display : function(d, q) {
				init();
				data = d;
				term = q;
				fillList();
			},
			next : function() {
				moveSelect(1);
			},
			prev : function() {
				moveSelect(-1);
			},
			pageUp : function() {
				if (active != 0 && active - 8 < 0) {
					moveSelect(-active);
				} else {
					moveSelect(-8);
				}
			},
			pageDown : function() {
				if (active != listItems.size() - 1
						&& active + 8 > listItems.size()) {
					moveSelect(listItems.size() - 1 - active);
				} else {
					moveSelect(8);
				}
			},
			hide : function() {
				element && element.hide();
				listItems && listItems.removeClass(CLASSES.ACTIVE);
				active = -1;
			},
			visible : function() {
				return element && element.is(":visible");
			},
			current : function() {
				return this.visible()
						&& (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst
								&& listItems[0]);
			},
			show : function() {
				var offset = getTaCurOffset($(input));
				element.css({
					width : typeof options.width == "string"
							|| options.width > 0 ? options.width : $(input)
							.width(),
					top : offset.y + 6,
					left : offset.x
				}).show();
				if (options.scroll) {
					list.scrollTop(0);
					list.css({
								maxHeight : options.scrollHeight,
								overflow : 'auto'
							});
					if ($.browser.msie
							&& typeof document.body.style.maxHeight === "undefined") {
						var listHeight = 0;
						listItems.each(function() {
									listHeight += this.offsetHeight;
								});
						var scrollbarsVisible = listHeight > options.scrollHeight;
						list.css('height', scrollbarsVisible
										? options.scrollHeight
										: listHeight);
						if (!scrollbarsVisible) {
							listItems.width(list.width()
									- parseInt(listItems.css("padding-left"))
									- parseInt(listItems.css("padding-right")));
						}
					}
				}
			},
			selected : function() {
				var selected = listItems
						&& listItems.filter("." + CLASSES.ACTIVE)
								.removeClass(CLASSES.ACTIVE);
				return selected && selected.length
						&& $.data(selected[0], "ac_data");
			},
			emptyList : function() {
				list && list.empty();
			},
			unbind : function() {
				element && element.remove();
			}
		};
	};
	$.fn.selection = function(start, end) {
		if (start !== undefined) {
			return this.each(function() {
						if (this.createTextRange) {
							var selRange = this.createTextRange();
							if (end === undefined || start == end) {
								selRange.move("character", start);
								selRange.select();
							} else {
								selRange.collapse(true);
								selRange.moveStart("character", start);
								selRange.moveEnd("character", end);
								selRange.select();
							}
						} else if (this.setSelectionRange) {
							this.setSelectionRange(start, end);
						} else if (this.selectionStart) {
							this.selectionStart = start;
							this.selectionEnd = end;
						}
					});
		}
		var field = this[0];
		if (field.createTextRange) {
			var range = document.selection.createRange(), orig = field.value, teststring = "<->", textLength = range.text.length;
			range.text = teststring;
			var caretAt = field.value.indexOf(teststring);
			field.value = orig;
			this.selection(caretAt, caretAt + textLength);
			return {
				start : caretAt,
				end : caretAt + textLength
			}
		} else if (field.selectionStart !== undefined) {
			return {
				start : field.selectionStart,
				end : field.selectionEnd
			}
		}
	};
})(jQuery);;
(function($) {
	if ($.browser.msie && document.namespaces["v"] == null) {
		document.namespaces.add("v", "urn:schemas-microsoft-com:vml",
				"#default#VML");
	}
	$.fn.cornerz = function(options) {
		function canvasCorner(t, l, r, bw, bc, bg) {
			var sa, ea, cw, sx, sy, x, y, p = 1.57, css = "position:absolute;";
			if (t) {
				sa = -p;
				sy = r;
				y = 0;
				css += "top:-" + bw + "px;";
			} else {
				sa = p;
				sy = 0;
				y = r;
				css += "bottom:-" + bw + "px;";
			}
			if (l) {
				ea = p * 2;
				sx = r;
				x = 0;
				css += "left:-" + bw + "px;";
			} else {
				ea = 0;
				sx = 0;
				x = r;
				css += "right:-" + bw + "px;";
			}
			var canvas = $("<canvas width=" + r + "px height=" + r
					+ "px style='" + css + "' ></canvas>");
			var ctx = canvas[0].getContext('2d');
			ctx.beginPath();
			ctx.lineWidth = bw * 2;
			ctx.arc(sx, sy, r, sa, ea, !(t ^ l));
			ctx.strokeStyle = bc;
			ctx.stroke();
			ctx.lineWidth = 0;
			ctx.lineTo(x, y);
			ctx.fillStyle = bg;
			ctx.fill();
			return canvas;
		};
		function canvasCorners(corners, r, bw, bc, bg) {
			var hh = $("<div style='display: inherit' />");
			$.each(corners.split(" "), function() {
						hh.append(canvasCorner(this[0] == "t", this[1] == "l",
								r, bw, bc, bg));
					});
			return hh;
		};
		function vmlCurve(r, b, c, m, ml, mt, right_fix) {
			var l = m - ml - right_fix;
			var t = m - mt;
			return "<v:arc filled='False' strokeweight='" + b
					+ "px' strokecolor='" + c
					+ "' startangle='0' endangle='361' style=' top:" + t
					+ "px;left: " + l + "px;width:" + r + "px; height:" + r
					+ "px' />";
		}
		function vmlCorners(corners, r, bw, bc, bg, w) {
			var h = "<div style='text-align:left; '>";
			$.each($.trim(corners).split(" "), function() {
				var css, ml = 1, mt = 1, right_fix = 0;
				if (this.charAt(0) == "t") {
					css = "top:-" + bw + "px;";
				} else {
					css = "bottom:-" + bw + "px;";
					mt = r + 1;
				}
				if (this.charAt(1) == "l")
					css += "left:-" + bw + "px;";
				else {
					css += "right:-" + (bw) + "px; ";
					ml = r;
					right_fix = 1;
				}
				h += "<div style='" + css
						+ "; position: absolute; overflow:hidden; width:" + r
						+ "px; height: " + r + "px;'>";
				h += "<v:group  style='width:1000px;height:1000px;position:absolute;' coordsize='1000,1000' >";
				h += vmlCurve(r * 3, r + bw, bg, -r / 2, ml, mt, right_fix);
				if (bw > 0)
					h += vmlCurve(r * 2 - bw, bw, bc, Math.floor(bw / 2 + 0.5),
							ml, mt, right_fix);
				h += "</v:group>";
				h += "</div>";
			});
			h += "</div>";
			return h;
		};
		var settings = {
			corners : "tl tr bl br",
			radius : 10,
			background : "white",
			borderWidth : 0,
			fixIE : true
		};
		$.extend(settings, options || {});
		var incrementProperty = function(elem, prop, x) {
			var y = parseInt(elem.css(prop), 10) || 0;
			elem.css(prop, x + y);
		};
		return this.each(function() {
					var $$ = $(this);
					var r = settings.radius * 1.0;
					var bw = (settings.borderWidth
							|| parseInt($$.css("borderTopWidth"), 10) || 0)
							* 1.0;
					var bg = settings.background;
					var bc = settings.borderColor;
					bc = bc || (bw > 0 ? $$.css("borderTopColor") : bg);
					var cs = settings.corners;
					if ($.browser.msie) {
						h = vmlCorners(cs, r, bw, bc, bg, $(this).width());
						this.insertAdjacentHTML('beforeEnd', h);
					} else
						$$.append(canvasCorners(cs, r, bw, bc, bg));
					if (this.style.position != "absolute")
						this.style.position = "relative";
					this.style.zoom = 1;
					if ($.browser.msie && settings.fixIE) {
						var ow = $$.outerWidth();
						var oh = $$.outerHeight();
						if (ow % 2 == 1) {
							incrementProperty($$, "padding-right", 1);
							incrementProperty($$, "margin-right", 1);
						}
						if (oh % 2 == 1) {
							incrementProperty($$, "padding-bottom", 1);
							incrementProperty($$, "margin-bottom", 1);
						}
					}
				});
	};
})(jQuery);
var alertDiv = {
	id : 'alertdiv',
	author : '',
	stid : '',
	type : '',
	alertinfo : function(show, txt) {
		$('#' + alertDiv.id).appendTo('body');
		$('#' + alertDiv.id).toCenter().show();
		$("#twitter_publish_forward").val(txt).focus();
		var textObj = document.getElementById("twitter_publish_forward");
		setCursor(textObj, 0, 0);
		showShadow();
	},
	closeDiv : function() {
		$('#' + alertDiv.id).hide();
		hideShadow();
	}
}
var pageChangeObj = {
	listMin : null,
	listMax : null,
	_linePage : null,
	_currtPage : 1,
	_maxContent : 0,
	_prePage : '<img src="/css/icons100402/fnew.jpg" />',
	_prePageDe : '<img src="/css/icons100402/flnew.jpg" />',
	_nextPage : '<img src="/css/icons100402/flast.jpg" />',
	_headerPrePage : '<img src="/css/icons100402/hhNew.gif" />',
	_headerPrePageDe : '',
	_headerNextPage : '<img src="/css/icons100402/hlast.gif" />',
	_serverDataUrl : server_url + 'twitter/ajax_showTwitterPageData',
	getSkipAction : function(local) {
		var id = '#pageSkipNum' + local;
		var num = $(id).val();
		num = parseInt(num);
		var page = 1;
		var pageMaxNum = Math.ceil(pageChangeObj._maxContent
				/ pageChangeObj._linePage);
		if (pageMaxNum > 200) {
			pageMaxNum = 200;
		}
		if (isNaN(num)) {
			return false;
		} else if (num > pageMaxNum) {
			page = pageMaxNum;
		} else if (num < 1) {
			page = 1;
		} else {
			page = num;
		}
		pageChangeObj.pageAction(page);
		return true;
	},
	getPageData : function() {
		$.getJSON(pageChangeObj._serverDataUrl, {
					twitterType : twitterListObj.lType,
					uid : twitterListObj.uid,
					tid : twitterListObj.topicId,
					listType : twitterListObj.listType
				}, function(data) {
					pageChangeObj._maxContent = data[0];
					pageChangeObj._linePage = data[1];
					if (pageChangeObj._maxContent > pageChangeObj._linePage) {
						pageChangeObj.createPageList(0);
					} else {
						$("#twitter_show_list_header_pageNum").hide();
						$("#twitter_show_list_foot_pageNum").hide();
					}
				});
	},
	pageAction : function(currtPage) {
		var pageMaxNum = Math.ceil(pageChangeObj._maxContent
				/ pageChangeObj._linePage);
		if (currtPage <= 1) {
			var note = '正在加载最新页内容请等待...';
		} else if (currtPage >= pageMaxNum) {
			var note = '正在加载最早页内容请等待...';
		} else {
			var note = '正在加载第 ' + currtPage + '页...';
		}
		$("#twitter_prompt_num")
				.attr(
						'style',
						'  display: block; width: 100%; height: 30px; line-height: 30px; background: #FFF0F4; color: #f69; font-size: 14px; padding: 0; text-align: center; ')
				.html(note);
		twitterListObj.getTwitterList(currtPage);
		pageChangeObj.createPageList(currtPage);
	},
	createPageList : function(currtPage) {
		$("#zupage").val(currtPage);
		var pageMaxNum = Math.ceil(pageChangeObj._maxContent
				/ pageChangeObj._linePage);
		if (pageMaxNum > 200) {
			pageMaxNum = 200;
		}
		if (currtPage <= 1) {
			currtPage = 1;
		}
		pageChangeObj._currtPage = currtPage;
		var nextNum = currtPage - 1;
		var perNum = currtPage + 1;
		var pageStr = '<span class="page_num">' + currtPage + '/' + pageMaxNum
				+ '</span>';
		var hlast = '', hnew = '', fnew = '', flast = '';
		if (currtPage == 1) {
			hnew = this._headerPrePageDe;
			hlast = "<a onClick='javascript:pageChangeObj.pageAction(" + perNum
					+ ");' href='javascript:;'>" + this._headerNextPage
					+ "</a>";
			fnew = this._prePageDe;
			flast = "<a onClick='javascript:pageChangeObj.pageAction(" + perNum
					+ ");' href='javascript:;'>" + this._nextPage + "</a>";
		} else if (currtPage == pageMaxNum) {
			hnew = "<a onClick='javascript:pageChangeObj.pageAction(" + nextNum
					+ ");' href='javascript:;'>" + this._headerPrePage + "</a>";
			hlast = ' ';
			fnew = "<a onClick='javascript:pageChangeObj.pageAction(" + nextNum
					+ ");' href='javascript:;'>" + this._prePage + "</a>";
			flast = '';
		} else {
			hnew = "<a onClick='javascript:pageChangeObj.pageAction(" + nextNum
					+ ");' href='javascript:;'>" + this._headerPrePage + "</a>";
			hlast = "<a onClick='javascript:pageChangeObj.pageAction(" + perNum
					+ ");' href='javascript:;'>" + this._headerNextPage
					+ "</a>";
			fnew = "<a onClick='javascript:pageChangeObj.pageAction(" + nextNum
					+ ");' href='javascript:;'>" + this._prePage + "</a>";
			flast = "<a onClick='javascript:pageChangeObj.pageAction(" + perNum
					+ ");' href='javascript:;'>" + this._nextPage + "</a>";
		}
		var hlist = pageStr + hnew + hlast;
		var flist = ''
				+ '<div class="right" id="jumpdiv"><div style="width:92px;float:left;">跳转至: <input id="pageSkipNum1" class="pageSkipNum" type="text" maxlength="5" /></div><div id="pageSkip" onClick="pageChangeObj.getSkipAction(1);"></div></div>'
				+ "<div class='left top' >" + fnew + pageStr + flast + '</div>'
				+ '<div style="clear:both"></div>';
		if (pageChangeObj._maxContent > pageChangeObj._linePage) {
			$('#twitter_show_list_header_pageNum').html(hlist);
			$('#twitter_show_list_foot_pageNum').html(flist);
		}
	}
}
var twitterObj = {
	idPrefix : 't',
	twitter_url : server_url + '/twitter/ajax_newTwitter/',
	maxLength : 140,
	pictureID : 0,
	goodsID : 0,
	twitter_type : 2,
	alterHtml : '',
	optionNum : 0,
	currentPage : null,
	removeCallBackType : 'ajax',
	withGoods : false,
	isReport : false,
	lastTwitter : null,
	intervalTime : 10,
	alerting : false,
	hasEntityPic : false,
	currentTab : 'goods',
	isLomo : false,
	lomoType : '',
	contentPrefix : '',
	twitterTip : '美丽心得，搭配街拍，时尚八卦，都来说说......',
	goodsTip : '说说你对这件宝贝的评价或者感觉吧。',
	reportTip : '说说你对这件宝贝的评价或者感觉吧。',
	urlTip : '在此直接粘贴宝贝的链接地址。',
	$blackShop : '',
	callbacks : {},
	bind : function(name, cbk) {
		if (typeof twitterObj.callbacks[name] == 'undefined') {
			twitterObj.callbacks[name] = [];
		}
		twitterObj.callbacks[name].push(cbk);
	},
	send : function() {
		faceTableObj.hide_tables();
		if (twitterObj.currentTab == 'goods'
				&& $('#twitter_publish_editor').css('display') == 'none') {
			twitterObj.submitURL(1);
			return false;
		}
		var text = $("#twitter_publish_editor").val();
		if (twitterObj.isReport) {
			var picSrc = $('#twitter_report_goods_pic img').attr('src');
			if (picSrc == null || picSrc == '') {
				twitterObj.withGoods = false;
			}
		}
		if (twitterObj.withGoods) {
			twitterObj.createGoodsEdit();
			return;
		}
		var textLength = GetStringLength(text);
		if (textLength > 0 && textLength < 141) {
			var picType = 0;
			var keywords = '';
			if (twitterObj.pictureID > 0) {
				picType = $('#hiddenPictype').val();
				keywords = $('#tedit_pic .keywords').val();
			}
			if (twitterObj.isReport) {
				picType = 2;
				if (twitterObj.pictureID == 0 && twitterObj.goodsID == 0) {
					var url = $('#twitter_report_goods_pic a').attr('href');
					if (url != null) {
						text += ' ' + url;
					}
				}
			}
			if (twitterObj.checkSpam() === false) {
				return false;
			}
			$(".inputBoxSharedButton").attr('onClick', '');
			if (twitterObj.contentPrefix != ''
					&& text.indexOf(twitterObj.contentPrefix) < 0) {
				text = twitterObj.contentPrefix + text;
			}
			$('#twitter_tools_button_up_wait').html('<img src="'
					+ pictureBaseUrl
					+ 'css/images/twitter/loading17.gif" /> 请等待, 发布中...');
			$.get(twitterObj.twitter_url, {
						tContent : text,
						pid : twitterObj.pictureID,
						goodsID : twitterObj.goodsID,
						ptype : picType,
						type : twitterObj.twitter_type,
						suid : 0,
						stid : 0,
						tag : keywords,
						isReport : twitterObj.isReport,
						isLomo : twitterObj.isLomo,
						lomoType : twitterObj.lomoType
					}, function(mesg) {
						$.setCookie('MEILISHUO_SAVE_TEXT', '', {
									duration : -1,
									path : '/',
									domain : DEFAULT_COOKIEDOMAIN
								});
						$('#twitter_tools_button_up_wait').html('').hide();
						if (mesg == 1) {
							showForbiddenWindow();
							return false;
						}
						var url = location.href;
						if (twitterObj.currentPage == 'hotTopic') {
							location.href = location.href;
							return;
						}
						var absNum = document.getElementById("absNum");
						var sendNum = document.getElementById("sendNum");
						twitterObj.number(absNum, sendNum, 20, 30, 1);
						$("#twitter_publish_editor").val('');
						$("#twitter_tools_textlimit")
								.text(twitterObj.maxLength);
						if (url.indexOf('atme') != -1
								|| url.indexOf('dajia') != -1) {
							$success = $('#publish_success');
							$success.css({
										'top' : '007px'
									}).show();
							var func = function() {
								$success.hide();
							}
							setTimeout(func, 1500);
							return false;
						}
						var checkCurrentPage = $("#twitter_show_list");
						if (typeof(checkCurrentPage) == 'undefined') {
							if (typeof twitterObj.callbacks.send != 'undefined') {
								var len = twitterObj.callbacks.send.length;
								for (var i = 0; i < len; i++) {
									if (typeof twitterObj.callbacks.send[i] == 'function') {
										twitterObj.callbacks.send[i]();
									}
								}
							}
						} else {
							twitterListObj.getTwitterList(0);
						}
						twitterNewPicObj.main(0);
						if (twitterObj.pictureID > 0) {
							twitterObj.closePicEdit();
						}
						twitterObj.pictureID = 0;
						if (twitterObj.isReport) {
							twitterObj.changeTab('goods');
						}
						$(".inputBoxSharedButton").attr('onClick',
								'javascript:return twitterObj.send();');
					});
		} else if (textLength >= 141) {
			this.showAlert('发送内容不能超过140个字');
		} else {
			this.showAlert('发送内容不能为空。');
		}
	},
	number : function(node, aim, minnum, maxnum, type) {
		if (aim == null) {
			return;
		}
		var num = parseInt(aim.innerHTML, 10);
		aim.style.zoom = 1;
		node.style.display = "inline-block";
		node.innerHTML = num;
		var fontSize = minnum;
		var opacity = 1;
		var pos = getElementPos("sendNum");
		node.style.left = pos.x - 11 + "px";
		node.style.top = pos.y + "px";
		var step = function() {
			fontSize += 1;
			opacity -= 0.09;
			node.style.fontSize = fontSize + "px";
			node.style.opacity = opacity;
			aim.style.opacity = opacity;
			node.style.filter = "Alpha(opacity=" + opacity * 100 + ")";
			aim.style.filter = "Alpha(opacity=" + opacity * 100 + ")";
			node.style.zoom = 1;
			if (fontSize < maxnum) {
				setTimeout(step, 45);
			} else {
				if (type == 1) {
					num += 1;
				} else {
					num -= 1;
				}
				node.innerHTML = num;
				aim.innerHTML = num;
				setTimeout(step2, 40);
			}
		};
		setTimeout(step, 10);
		var step2 = function() {
			fontSize -= 1;
			opacity += 0.09;
			node.style.fontSize = fontSize + "px";
			node.style.opacity = opacity;
			aim.style.opacity = opacity;
			node.style.filter = "Alpha(opacity=" + opacity * 100 + ")";
			aim.style.filter = "Alpha(opacity=" + opacity * 100 + ")";
			if (fontSize > minnum) {
				setTimeout(step2, 45);
			} else {
				node.style.display = "none";
			}
		};
	},
	objBind : function() {
		twitterNewPicObj.main(0);
		var editor = $("#twitter_publish_editor");
		if (editor.length > 0)
			editor.textlimit("#twitter_tools_textlimit", twitterObj.maxLength,
					10);
		editor.keyup(function(e) {
					if (e.ctrlKey && e.keyCode == "13") {
						twitterObj.send();
					}
				});
		var editorTip = $('#twitter_publish_editor_tip');
		editor.focus(function() {
					editorTip.hide();
				}).blur(function() {
					if (editor.val() == '') {
						editorTip.show();
					}
				});
		editorTip.text(twitterObj.twitterTip).click(function() {
					editor.focus();
				});
		if (editor.val() != '') {
			editorTip.hide();
		}
		$('#editor_tab_twitter').click(function() {
					twitterObj.changeTab('twitter');
				});
		$('#editor_tab_goods').click(function() {
					$('#lomo-pop').hide();
					twitterObj.changeTab('goods');
				});
		$('#editor_tab_report').click(function() {
					$('#lomo-pop').hide();
					twitterObj.changeTab('report');
				});
		$("#twitter_editor_submit").hover(function() {
					$(this).removeClass().addClass("button2");
				}, function() {
					$(this).removeClass().addClass("button1");
				});
		$("#twitter_editor_button").click(function() {
					twitterObj.send();
				});
		$('#twitter_editor .inputUrl').focus(function() {
					$(this).val('').removeClass('inputTip');
				}).keydown(function(e) {
					if (e.keyCode == 13) {
						twitterObj.submitURL(1);
					}
				}).val(twitterObj.urlTip);
		$('#paste_entity .inputUrl').focus(function() {
					$(this).val("").removeClass('inputTip');
				}).keydown(function(e) {
					if (e.keyCode == 13) {
						twitterObj.submitURL(2);
					}
				});
		$("#publisher_topic").click(function() {
					if (typeof(topicObj) != "undefined") {
						topicObj.inputTopic();
					}
				});
		var tempText = $.readCookie('MEILISHUO_SAVE_TEXT');
		if (tempText != null && tempText != '' && editor.val() == '') {
			$('#twitter_publish_editor_tip').hide();
			editor.val(tempText.replace('+', ' '));
		}
		editor.autocomplete('twitter/ajax_autoComplete', {
					width : 150,
					multiple : true,
					matchContains : true,
					multipleSeparator : ' '
				});
		bindRange(editor.get(0));
		var saveFunc = function() {
			$.setCookie('MEILISHUO_SAVE_TEXT', editor.val(), {
						duration : 0,
						path : '/',
						domain : DEFAULT_COOKIEDOMAIN
					});
		};
		editor.change(saveFunc).keyup(saveFunc).keydown(saveFunc);
		$('#twitter_tools_topic').click(function() {
					if (editor.css('display') != 'none') {
						$('#twitter_publish_editor_tip').hide();
						editor.val('#输入话题标题# ' + editor.val()).focus();
						setCursor(editor.get(0), 1, 7);
					}
				});
		$('#twitter_tools_goods_alter .submitUrl').click(function() {
					twitterObj.submitURL(1);
				});
		$('#paste_entity .tab_url .next').click(function() {
					twitterObj.submitURL(2);
				});
		lianjieWindow = $.dialog({
					title : '添加宝贝的购买链接',
					content : $('#paste_entity').show(),
					closeHandle : function() {
						$('#paste_entity_dialog').hide();
					}
				}).attr('id', 'paste_entity_dialog');
		$.dialog({
					title : '添加宝贝的购买链接',
					content : $('#tedit_entity').show(),
					closeHandle : function() {
						$('#tedit_entity_dialog').hide();
						$('#tedit_entity .goods_details').empty();
					}
				}).attr('id', 'tedit_entity_dialog');
		$('#tedit_pic .del').click(function() {
					twitterObj.withGoods = false;
					$('#tedit_pic .buy_goods_title').hide();
					$('#tedit_pic .select_goods').show();
				});
		$('#upload_entity_btn').mousemove(function(e) {
					var o = $(this);
					var offset = o.offset();
					var $uploader = o.children('span');
					var l = e.pageX - offset.left - 25;
					var t = e.pageY - offset.top - 5;
					if (l < 0 || t < 0 || l > o.width() || t > o.height()) {
						l = 0;
						t = 0;
					}
					$uploader.css({
								left : l,
								top : t,
								"position" : "absolute"
							});
				});
		$('#pop_goods_url_submit').click(function() {
					twitterObj.submitURL(3);
				});
		$('#pop_goods_url_input').keydown(function(e) {
					if (e.keyCode == 13) {
						$('#pop_goods_url_submit').click();
					}
				});
		$("#close_black").live("click", function() {
					$blackShop.hide();
					hideShadow();
					twitterObj.changeTab('twitter');
					lianjieWindow.hide();
				});
	},
	main : function() {
		try {
			twitterListObj.getTwitterList(pageChangeObj._currtPage);
			twitterObj.objBind();
		} catch (e) {
			alert(e);
		}
	},
	changeTab : function(type, skipCurrent) {
		var o = $('#editor_tab_' + type);
		if (skipCurrent == null && o.hasClass('current')) {
			return false;
		}
		twitterObj.currentTab = type;
		$('#twitter_editor_boxtop .current').removeClass('current');
		o.addClass('current');
		this.goodsID = 0;
		this.pictureID = 0;
		this.isReport = false;
		this.withGoods = false;
		this.alerting = false;
		faceTableObj.hide_tables();
		$('#twitter_alert_dialog').hide();
		$('#pop_goods_url').hide();
		$('#tedit_entity .goods_details, #tedit_goods').empty();
		$('#tedit_pic .upload_pic').removeAttr('src');
		twitterNewPicObj.main(0);
		var elementList = ['#tedit_pic', '#tedit_goods', '#twitter_report',
				'#twitter_report_guide', '#twitter_publish_editor',
				'#twitter_publish_editor_tip',
				'.twitter_tools_all_button .button',
				'#twitter_tools_button_up_wait', '.text_wrapper .inputUrl',
				'#twitter_report>div', '#twitter_editor_boxBottom'];
		$(elementList.join(',')).css('display', '');
		$('#twitter_editor .editor_tab').css('border-width', '');
		if ($('#twitter_publish_editor').val() != '') {
			$('#twitter_publish_editor_tip').hide();
		}
		if (type == 'twitter') {
			$('#twitter_editor').removeClass()
					.addClass('twitter_editor_twitter');
			$('#twitter_publish_editor_tip').text(twitterObj.twitterTip);
		} else if (type == 'goods') {
			$('#twitter_editor').removeClass().addClass('twitter_editor_goods');
			$('#twitter_editor .inputUrl').addClass('inputTip')
					.val(twitterObj.urlTip);
			$('#twitter_publish_editor_tip').text(twitterObj.goodsTip);
		} else if (type == 'report') {
			this.isReport = true;
			this.hasEntityPic = false;
			$('#twitter_report_goods_pic, #twitter_report_upload_pic, #twitter_report_desc')
					.empty();
			$('#twitter_editor').removeClass()
					.addClass('twitter_editor_report');
			$('#twitter_publish_editor_tip').text(twitterObj.reportTip);
		}
	},
	showPopGoodsUrl : function() {
		if ($('#pop_goods_url').css('display') == 'none') {
			var off = $('#twitter_tools_goods_url_bottom').offset();
			$('#pop_goods_url').appendTo('body').css({
						"left" : off.left - 60,
						"top" : off.top + 15
					}).show();
			$('#pop_goods_url_input').val('').focus();
		} else {
			$('#pop_goods_url').hide();
		}
	},
	entityChangeTab : function(type) {
		$('#paste_entity .c_tab .c_tab_btn_current').attr('class', 'c_tab_btn');
		$('#entity_' + type + '_tab_btn').addClass('c_tab_btn_current');
		$('#paste_entity .tab_url, #paste_entity .tab_select').hide();
		var o = $('#paste_entity .tab_' + type);
		o.toCenter().show();
		if (type == 'url') {
			o.find('.error_hint').hide();
		} else if (type == 'select') {
			if (o.html() == '') {
				this.loadMyGoods(0);
			}
		}
	},
	loadMyGoods : function(page) {
		$('#paste_entity .tab_select')
				.html('<div style="margin: 10px;">加载中...</div>').load(
						'/goods/ajax_addAreadyHasGoods', {
							"page" : page
						});
	},
	selectMyGoods : function(obj) {
		var o = $(obj);
		var tid = o.attr('tid');
		var gid = o.attr('gid');
		var pid = o.attr('pid');
		this.goodsID = gid;
		this.withGoods = true;
		if (this.pictureID == 0) {
			this.pictureID = pid;
		}
		var url = o.attr('goods_url');
		$('#paste_entity .inputUrl').val(url);
		twitterObj.submitURL(2);
		$('#paste_entity_dialog').hide();
	},
	submitURL : function(type) {
		var $inputUrl = null;
		switch (type) {
			case 1 :
				$inputUrl = $('.text_wrapper .inputUrl');
				break;
			case 2 :
				$inputUrl = $('#paste_entity_dialog .inputUrl');
				break;
			case 3 :
				$inputUrl = $('#pop_goods_url_input');
		}
		var url = $inputUrl.val().trim();
		var s = $.isUrl(url);
		if (!s && url.substring(0, 4) != 'http') {
			if ($.isUrl('http://' + url)) {
				url = 'http://' + url;
				$inputUrl.val(url);
				s = true;
			}
		}
		if (s) {
			if (type == 1) {
				this.loadGoods(1);
			} else if (type == 3) {
				if (twitterObj.pictureID == 0) {
					twitterObj.changeTab('goods');
					$('.text_wrapper .inputUrl').val($('#pop_goods_url_input')
							.val());
					this.loadGoods(1);
				} else {
					var picID = twitterObj.pictureID;
					var picUrl = $('#tedit_pic_img .upload_pic').attr('src');
					var filterPicUrl = $('#tedit_pic_img .upload_picFilter')
							.attr('src');
					twitterObj.changeTab('report');
					twitterObj.showPicEdit(picUrl, filterPicUrl);
					twitterObj.pictureID = picID;
					twitterObj.hasEntityPic = true;
				}
			}
			this.showGoodsEdit(url);
		} else {
			var errText = '宝贝链接有错误，请提交正确的链接。';
			if (type == 1) {
				twitterObj.showAlert(errText);
			} else if (type == 2) {
				$('#paste_entity .error_hint').text(errText).fadeIn('fast');
			}
			$inputUrl.focus();
		}
	},
	showGoodsEdit : function(url) {
		$.get(server_url + '/twitter/ajax_vaileGoods/', {
					gurl : url
				}, function(backstr) {
					if (backstr == 1) {
						showForbiddenWindow();
						twitterObj.closeGoodsEdit();
						return false;
					}
					if (backstr == 2) {
						$blackShop = $.dialog({
							title : '<span style="margin-left: 5px;">封店提示</span>',
							content : $('#black_shop').show(),
							closeHandle : function() {
								$(this).closest('.dialog').hide();
								hideShadow();
							}
						});
						var ua = navigator.userAgent.toLowerCase();
						var isIE6 = ua.indexOf("msie 6") > -1;
						var fixed = 'fixed';
						if (isIE6) {
							fixed = '';
						}
						$blackShop.toCenter(fixed).show();
						showShadow();
						return false;
					}
					if (twitterObj.isReport) {
						$('#paste_entity_dialog').hide();
						$('#twitter_report_desc').html(backstr);
						$('#twitter_report_guide_url').hide();
						var imgSrc = $('#goods_img').attr('src');
						var $link;
						if (imgSrc != null) {
							var title = $('#tedit_goods_desc_url a').text();
							var $link = $('<a href="' + url
									+ '" target="_blank" title="' + title
									+ '"></a>');
							$link.append('<img src="' + imgSrc + '"/>');
						} else {
							$link = $('<a href="' + url + '" target="_blank">'
									+ url + '</a>');
							$('#goods_vote_alert').hide();
						}
						$('#twitter_report_goods_pic').empty().append($link)
								.show();
						$('#twitter_report .close').show();
						twitterObj.withGoods = true;
					} else {
						var $editor = $('#twitter_publish_editor');
						$editor.show();
						if ($editor.val() == '') {
							$('#twitter_publish_editor_tip').show();
						}
						$('#twitter_tools_expression, #twitter_tools_topic, #twitter_editor_boxBottom')
								.show();
						$('#twitter_editor .editor_tab').css('border-width',
								'0 0 1px 0');
						$('.text_wrapper .inputUrl, #pop_goods_url').hide();
						$('#tedit_goods').html(backstr).show();
						twitterNewPicObj.divLoctainKey = '#update_images';
						twitterNewPicObj.main('goods');
						twitterObj.withGoods = true;
					}
					$('.commendTagShowClass').click(function() {
						var tmpStr = $('#cold_goods_form_tag').val();
						if (tmpStr.indexOf($(this).html()) == -1) {
							tmpStr += " " + $(this).html();
							$('#cold_goods_form_tag').val(trim(tmpStr));
							$(this).addClass('tag_selected');
						} else {
							var replaceStr = tmpStr.replace($(this).html(), "");
							$('#cold_goods_form_tag').val(trim(replaceStr));
							$(this).removeClass('tag_selected');
						}
					});
				});
	},
	closeGoodsEdit : function() {
		twitterObj.withGoods = false;
		if (this.isReport) {
			this.changeTab('report', true);
		} else {
			this.changeTab('goods', true);
		}
	},
	createGoodsEdit : function() {
		var gTitle = $("#cold_goods_form_title").val();
		var gPrice = $("#cold_goods_form_price").val();
		var catalog_name = trim($('#tedit_goods_desc_goods_class').val());
		if (gTitle.length < 1) {
			$('#cold_goods_form_title_err').show();
			$('#cold_goods_form_title').focus();
			return false;
		}
		var gUrl = $('#tedit_goods_desc_url a').attr('href');
		var gPicUrl = $("#goods_img").attr('src');
		var tagStr = $('#cold_goods_form_tag').val();
		var gPicID = twitterObj.pictureID;
		if (gPicID == 0 && typeof(gPicUrl) == 'undefined') {
			$('#tedit_goods_images').css('background-color', '#FF0033');
			$('#cold_goods_form_tag_err').show().html('给你的宝贝上传一张图片吧。');
			return false;
		}
		var gNote = $("#twitter_publish_editor").val();
		if (gNote.length < 1) {
			gNote = '';
			this.showAlert('发送内容不能为空。');
			return false;
		}
		if (twitterObj.checkSpam() === false) {
			return false;
		}
		if (gPicUrl == null || gPicUrl == '') {
			gPicUrl = 0;
		}
		var picUrls = $('#picUrls').val();
		var gSouceType = 1;
		var option = Array();
		if (this.optionNum > 0) {
			for (var i = 1; i <= this.optionNum; i++) {
				var key = '#viewO_' + i;
				var v = $(key).val();
				if (v != '') {
					option.push(v);
				}
			}
		}
		if (twitterObj.contentPrefix != ''
				&& gNote.indexOf(twitterObj.contentPrefix) < 0) {
			gNote = twitterObj.contentPrefix + gNote;
		}
		var picType = 0;
		if (twitterObj.isReport) {
			picType = 2;
		}
		var url = server_url + 'goods/ajax_createGoods';
		this.loadGoods(2);
		var goodsData = {
			'gPrice' : gPrice,
			'gTitle' : gTitle,
			'gUrl' : gUrl,
			'gPicUrl' : gPicUrl,
			'gPicID' : gPicID,
			'gNote' : gNote,
			'gSouceType' : gSouceType,
			'catalog_name' : catalog_name,
			'option[]' : option,
			'tag' : tagStr,
			'isReport' : twitterObj.isReport,
			'goodsID' : this.goodsID,
			'hasEntityPic' : this.hasEntityPic,
			'ptype' : picType,
			'picUrls' : picUrls
		}
		$.post(url, goodsData, function(backstr) {
			$.setCookie('MEILISHUO_SAVE_TEXT', '', {
						duration : -1,
						path : '/',
						domain : DEFAULT_COOKIEDOMAIN
					});
			$("#twitter_publish_editor").val('');
			var url = location.href;
			if (url.indexOf('atme') != -1 || url.indexOf('dajia') != -1) {
				twitterObj.closeGoodsEdit();
				$success = $('#publish_success');
				if (twitterObj.isReport) {
					$success.css({
								'top' : '007px'
							}).show();
				} else {
					$success.css({
								'top' : '-5px'
							}).show();
				}
				var func = function() {
					$success.hide();
				}
				setTimeout(func, 1500);
				return false;
			}
			if (url.indexOf('discount') != -1) {
				$('#tedit_goods_images_commission').css('visibility', 'hidden');
				var obj = eval('(' + backstr + ')');
				var empty = $('#jiangjin').val();
				if (empty == 1) {
					$.dialog({
								title : '美丽提示',
								content : $('#pop_share_finish').show(),
								closeHandle : function() {
									location.href = location.href;
								}
							}).toCenter().show().shadow();
				} else if (empty == 0) {
					location.href = location.href;
				}
				return;
			}
			var pageUrl = "";
			pageUrl = window.location;
			pageUrl = pageUrl.toString();
			pageUrl = pageUrl.split("=");
			if (pageUrl.length > 1 && pageUrl[1] == "desiretree") {
				window.location.href = server_url + "desiretree/dtreeReport";
			} else {
				var url = location.href;
				var sharpIndex = url.indexOf('#');
				if (sharpIndex > 0) {
					url = url.substr(0, sharpIndex);
				}
				location.href = url;
			}
		});
	},
	showPicEdit : function(url, filterUrl) {
		if (this.isReport) {
			$('#tedit_pic_type .twitter_pic_type_checked')
					.removeClass('twitter_pic_type_checked');
			$('#tedit_pic_type span[val="2"]')
					.addClass('twitter_pic_type_checked').show();
			$('#twitter_report_guide_pic, #twitter_tools_button_up_wait')
					.hide();
			$('#twitter_report_upload_pic').append('<img src="' + filterUrl
					+ '"/>').show();
			$('#twitter_report .close').show();
		} else {
			$('#twitter_editor_boxmid').addClass('gray');
			$('#twitter_tools_publisher_upImages, #twitter_tools_button_up_wait')
					.hide();
			var editor = $('#tedit_pic');
			$('#tedit_pic_type .twitter_pic_type_checked')
					.removeClass('twitter_pic_type_checked');
			$('#tedit_pic_type .twitter_pic_type').show();
			$('#tedit_pic_type .twitter_pic_type[val="2"]').hide();
			initPicTypeCheckbox(editor);
			editor.find('.upload_pic').attr('src', filterUrl);
			editor.find('.hint').hide();
			editor.find('.keywords').val('');
			editor.show();
			editor.find('.upload_pic').hover(function() {
						editor.find('.upload_pic').addClass('upload_pic_Hover');
					}, function() {
						editor.find('.upload_pic')
								.removeClass('upload_pic_Hover');
					});
			editor.find('.upload_picFilter').hover(function() {
						editor.find('.upload_picFilter')
								.addClass('upload_pic_Hover');
					}, function() {
						editor.find('.upload_picFilter')
								.removeClass('upload_pic_Hover');
					});
			$('#twitter_publish_editor').show();
		}
	},
	showHaibaoAppPic : function(picID, picUrl, tooSmall, tooBig, notJpg) {
		if (typeof picID == "undefined") {
			alert('请上传一张小于2M的图片！');
			$('.upload_pho .pho-loading').hide();
			return false;
		}
		if (tooSmall == '2' || tooSmall == 2) {
			alert('请上传一张至少大小为240x125的图片！');
			$('.upload_pho .pho-loading').hide();
			return false;
		} else if (tooSmall == '3' || tooSmall == 3) {
			alert('请上传一张至少大小为244x344的图片！');
			$('.upload_pho .pho-loading').hide();
			return false;
		} else if (tooSmall == '1' || tooSmall == 1) {
			alert('请上传一张至少大小为280x395的图片！');
			$('.upload_pho .pho-loading').hide();
			return false;
		} else if (tooSmall == '4' || tooSmall == 4) {
			alert('请上传一张至少大小为280x394的图片！');
			$('.upload_pho .pho-loading').hide();
			return false;
		} else if (tooBig == '1' || tooBig == 1) {
			alert('请上传一张小于２M的图片！');
			$('.upload_pho .pho-loading').hide();
			return false;
		} else if (notJpg == '1' || notJpg == 1) {
			alert('请上传JPG图片！');
			$('.upload_pho .pho-loading').hide();
			return false;
		}
		var container = $('.myEditor');
		container.html('');
		$('.uploaded').show();
		var wanna = 0;
		if (location.href.indexOf('lauder') > -1) {
			var selectType = parseInt($('.el_step3').attr('stype')) + 1;
			$('.el_describe').show().addClass('el_describe' + selectType);
			$('.el_bottom1').show();
			var lauder_urls = {
				'1' : 'http://meilishuo.com/u/EBW-I2?frm=esteelauder03',
				'2' : 'http://meilishuo.com/u/EBXUB_?frm=esteelauder04',
				'3' : 'http://meilishuo.com/u/EBW5qx?frm=esteelauder02'
			}
			$('.el_describe a').attr('href', lauder_urls[selectType]);
		} else if (location.href.indexOf('bobbi') > -1) {
			$('.bobbi_describe').show();
			$('.publisher_image_title').addClass('bobbi_reupload')
					.removeClass('publisher_image_title');
			$('.bobbi_brush').show();
		} else if (location.href.indexOf('lorealparis') > -1) {
			$('#loreal_sub2').hide();
			$('.publisher_image_title').addClass('loreal_reup')
					.removeClass('publisher_image_title');
			$('.loreal_pre').hide();
			$('#loreal_sub2').show();
			$('.loreal_iam').show();
		} else if (location.href.indexOf('sharetuan') > -1) {
			$('.publisher_image_title').addClass('stuan_reup')
					.removeClass('publisher_image_title');
			$('#stuan_sub2').show();
			$('.stuan_describe').show();
		}
		if (location.href.indexOf('lancome2') > -1) {
			var $img = $('<img class="myImage" id="pid-' + picID + '" />'), w, h;
			$img.css('bottom', '0');
			$('.image-editor-slider').parent().show();
			$img.attr('src', picUrl).load(function() {
						w = this.width;
						h = this.height;
						$('.myEditor').haibaoImage();
						if (h < 395)
							$img.css('top', 'auto');
						if (w == 240)
							$('.image-editor-slider').parent().hide();
					});
			$('.myEditor').append($img);
		} else {
			$('.myEditor').append('<img class="myImage" id="pid-' + picID
					+ '" src="' + picUrl + '" />');
			setTimeout(function() {
						$('.myEditor').haibaoImage();
					}, 1000);
		}
		container.children('div').show();
		$('.publisher_image_title').addClass('re-upload')
				.removeClass('publisher_image_title');
		if (location.href.indexOf('lauder') > -1) {
			$('.re-upload').css({
						'top' : '358px',
						'background' : 'none',
						'z-index' : '502'
					});
		}
		$('#publisher_file').css('height', '30px');
		$('.upload_pho .pho-loading, .tips').hide();
		$('.myImage').css({
					'width' : 'auto',
					'height' : 'auto',
					'display' : 'inline'
				});
	},
	showPicLomoPopup : function(pid, filename, url, filterUrl, picPath) {
		$('#lomo-alert').remove();
		var alertWindow = $('<div id="lomo-alert" class="lomo-alert"></div>');
		alertWindow.hide().appendTo('body');
		alertWindow
				.append('<div class="lomo-desc"><span class="desc">选你喜欢的滤镜效果优化照片</span>&nbsp;<span class="loading"></span><span class="close"></span></div>')
				.append('<img src="'
						+ url
						+ '" class="upload_pic" /><div class="lomo-preview"></div>');
		alertWindow
				.children('.lomo-preview')
				.append('<span class="img-wrap"><img alt="原始图片" src="'
						+ pictureBaseUrl
						+ 'css/images/lomo/preview/normal.jpg?t=2" type="normal" oldUrl="'
						+ url
						+ '" class="lomo-preview-pic" /><span>原始图片</span></span>')
				.append('<span class="img-wrap"><img alt="Vintage" src="'
						+ pictureBaseUrl
						+ 'css/images/lomo/preview/vintage.jpg?t=2" type="vintage" class="lomo-preview-pic" /><span>复古风</span></span>')
				.append('<span class="img-wrap"><img alt="Lomo" src="'
						+ pictureBaseUrl
						+ 'css/images/lomo/preview/lomo.jpg?t=2" type="lomo" class="lomo-preview-pic" /><span>LOMO</span></span>')
				.append('<span class="img-wrap"><img alt="Hefe" src="'
						+ pictureBaseUrl
						+ 'css/images/lomo/preview/hefe.jpg?t=2" type="hefe" class="lomo-preview-pic" /><span>典雅</span></span>')
				.append('<div class="clear-fix"></div><span class="img-wrap"><img alt="Film" src="'
						+ pictureBaseUrl
						+ 'css/images/lomo/preview/film.jpg?t=2" type="film" class="lomo-preview-pic" /><span>胶片</span></span>')
				.append('<span class="img-wrap"><img alt="Hsat" src="'
						+ pictureBaseUrl
						+ 'css/images/lomo/preview/hsat.jpg?t=2" type="hsat" class="lomo-preview-pic" /><span>饱和</span></span>')
				.append('<span class="img-wrap"><img alt="Warm" src="'
						+ pictureBaseUrl
						+ 'css/images/lomo/preview/warm.jpg?t=2" type="warm" class="lomo-preview-pic" /><span>暖色</span></span>')
				.append('<span class="img-wrap"><img alt="B&W" src="'
						+ pictureBaseUrl
						+ 'css/images/lomo/preview/BW.jpg?t=2" type="bw" class="lomo-preview-pic" /><span>黑白</span></span>')
				.append('<div class="lomo-confirm"><input type="button" value="确  定" class="submit_alert_chose_yes c" /></div>');
		$('.lomo-preview-pic').click(function() {
			if ($(this).attr('type') == 'normal') {
				$('.upload_pic').attr('src', $(this).attr('oldUrl'));
				twitterObj.isLomo = false;
				twitterObj.lomoType = '';
			} else {
				var fliterNewUrl = filterUrl + '?filter_type='
						+ $(this).attr('type') + '&src=' + picPath;
				$('.upload_pic').attr('src', fliterNewUrl);
				$('.lomo-desc .loading').html('请等待，滤镜图片加载中...').show();
				$('.upload_pic').bind('load', picLoaded);
				twitterObj.isLomo = true;
				twitterObj.lomoType = $(this).attr('type');
			}
		});
		$('#twitter_tools_button_up_wait').html('').hide();
		$('#lomo-alert .close').click(function() {
					alertWindow.hide();
				});
		$('#lomo-alert .lomo-confirm input').click(function() {
					twitterObj.pictureID = pid;
					twitterObj.hasEntityPic = true;
					var imgSrc = $('.upload_pic').attr('src');
					if (!imgSrc)
						imgSrc = url;
					twitterObj.showPicEdit(url, imgSrc);
					$("#twitter_publish_editor").focus();
					$('#lomo-alert .close').click();
				});
		if (this.isReport) {
			var curElement = $('#upload_entity_btn')
			var postions = curElement.offset();
			var top = postions.top + 120;
			var left = postions.left - 8;
		} else {
			var curElement = $('#twitter_tools_publisher_upImages');
			var postions = curElement.offset();
			var top = postions.top + 10;
			var left = postions.left - 35;
		}
		alertWindow.find('.upload_pic').attr('src', url);
		alertWindow.show().css('left', left + 'px').css('top', top + 'px');
	},
	showEntityPicEdit : function(imgSrc) {
		$('#twitter_report, #twitter_tools_publisher_upImages, #twitter_tools_button_up_wait')
				.hide();
		$('#tedit_pic_type .twitter_pic_type').hide();
		$('#tedit_pic_type .twitter_pic_type_checked')
				.removeClass('twitter_pic_type_checked');
		$('#tedit_pic_type span[val="2"]').addClass('twitter_pic_type_checked')
				.show();
		$('#tedit_pic .hint').hide();
		if (imgSrc != null && imgSrc != '') {
			$('#tedit_pic .upload_pic').attr('src', imgSrc);
		}
		if (this.hasEntityPic) {
			$('#tedit_pic .pic_uploader').hide();
		} else {
			$('#tedit_pic .pic_uploader').show();
		}
		$('#tedit_pic').show();
	},
	closePicEdit : function() {
		this.pictureID = 0;
		faceTableObj.hide_tables();
		twitterNewPicObj.main(0);
		if (this.isReport) {
			this.changeTab('report', true);
		} else {
			this.changeTab('twitter', true);
		}
	},
	showPasteEntity : function(tabName) {
		$('#paste_entity_dialog').show();
		twitterObj.entityChangeTab(tabName);
		$('#paste_entity .inputUrl').addClass('inputTip')
				.val(twitterObj.urlTip);
	},
	changePicToReport : function() {
		var pid = twitterObj.pictureID;
		var url = $('#tedit_pic .upload_pic').attr('src');
		twitterObj.changeTab('report');
		twitterObj.pictureID = pid;
		twitterObj.hasEntityPic = true;
		twitterObj.showEntityPicEdit(url);
	},
	loadGoods : function(type) {
		var url = location.href;
		if (url.indexOf('discount') != -1) {
			var img = '<img src="/css/icons/loadingAnimation.gif" style="height:13px;width:140px;margin-top:20px;"/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上传中...请稍等';
			$('#tedit_goods_images_commission').html(img);
			return false;
		}
		var img = '<img style="margin-top:5px;" src="/css/icons/loadingAnimation.gif" />';
		if (type == 2) {
			$('#tedit_goods').html(img);
		} else {
			$('#tedit_goods').show().html(img);
		}
	},
	showOption : function() {
		var opStr = '';
		var maxNum = 4;
		for (var i = 1; i < maxNum; i++) {
			opStr += this.createOption(i, maxNum);
			this.optionNum++;
		}
		$('#tedit_goods_option').show().html(opStr);
		$('#goods_vote_alert span')
				.html('<a href="javascript:;" onclick="javascript:twitterObj.closeOption();">点击收起</a>');
		return false;
	},
	closeOption : function() {
		this.optionNum = 0;
		$('#tedit_goods_option').hide().html('');
		$('#goods_vote_alert span')
				.html('<a href="javascript:;;" onclick="javascript:twitterObj.showOption();">发起投票</a>');
	},
	createOption : function(key, mnum) {
		var title = '选项 ' + key + ':';
		var id = 'viewO_' + key;
		var v = '';
		var htmlOption = '<li class="option">';
		htmlOption += '<label class="optionT" for="' + id + '">' + title
				+ '</label>';
		htmlOption += '<input class="optionV" id="' + id + '" value="' + v
				+ '"/>';
		htmlOption += '</li>';
		return htmlOption;
	},
	startAutoComplete : function() {
	},
	checkSpam : function() {
		var text = $("#twitter_publish_editor").val();
		if (twitterObj.lastTwitter != null) {
			if (new Date().getTime() - twitterObj.lastTwitter.time < twitterObj.intervalTime
					* 1000) {
				twitterObj.showAlert('说话太快了，先歇一下吧~');
				return false;
			}
			if (twitterObj.lastTwitter.text == text) {
				twitterObj.showAlert('请不要连续发表重复的内容~');
				return false;
			}
		}
		twitterObj.lastTwitter = {
			"time" : new Date().getTime(),
			"text" : text
		};
		return true;
	},
	showAlert : function(txt, time, flash) {
		if (twitterObj.alerting) {
			return false;
		}
		twitterObj.alerting = true;
		if (time == null) {
			time = 3;
		}
		if (flash == null) {
			flash = 0;
		}
		var alertObj = $('#twitter_alert_dialog');
		alertObj.find('span').text(txt);
		alertObj.show();
		var offset = $('#twitter_editor_submit').offset();
		alertObj.css({
			left : offset.left - alertObj.width()
					+ $('#twitter_editor_submit').width() - 30,
			top : offset.top - 40
		}).appendTo('body');
		if ($.browser.msie && $.browser.version == "6.0") {
			alertObj.show();
		} else {
			alertObj.css('opacity', 0).show().animate({
						opacity : 1.0
					}, 300);
		}
		var callBack = function() {
			setTimeout(function() {
						if (twitterObj.alerting) {
							$('#twitter_alert_dialog').hide();
							twitterObj.alerting = false;
						}
					}, time * 1000);
		};
		var flashFunc = function() {
			if (flash > 0) {
				alertObj.animate({
							opacity : 0
						}, 300, function() {
							alertObj.animate({
										opacity : 1
									}, 300, function() {
										flash--;
										flashFunc();
									});
						});
			} else {
				callBack();
			}
		};
		flashFunc();
	},
	getNickname1 : function(tid) {
		return $('#t_nickname' + tid).text();
	},
	getNickname2 : function(tid) {
		return $('#attr_uid_' + tid).text();
	},
	getContent2 : function(tid) {
		if (tid > 0) {
			$contentObj = $('#tuijian_' + tid);
		}
		$contentObj = $contentObj.clone();
		$contentObj.find('.facetableSetxy').each(function() {
					var o = $(this);
					o.after('[' + o.attr('title') + ']');
				});
		return $contentObj.text().replace(/\s/g, '');
	},
	getContent1 : function(tid, $contentObj) {
		if (tid > 0) {
			$contentObj = $('#ask_note_top' + tid);
		}
		$contentObj = $contentObj.clone();
		$contentObj.find('.facetableSetxy').each(function() {
					var o = $(this);
					o.after('[' + o.attr('title') + ']');
				});
		return $contentObj.text().replace(/\s/g, '');
	},
	getNickname : function(tid) {
		return $('#t' + tid + ' .content .t_nickname .t_nickname_a').text();
	},
	getContent : function(tid, $contentObj) {
		if (tid > 0) {
			$contentObj = $('#t' + tid + ' .content .t_usecontent');
		}
		$contentObj = $contentObj.clone();
		$contentObj.find('.facetableSetxy').each(function() {
					var o = $(this);
					o.after('[' + o.attr('title') + ']');
				});
		return $contentObj.text();
	},
	getImageSrc : function(tid) {
		var $link = $('#t' + tid + ' .original_pic_ioc a');
		if ($link.length > 0) {
			return $link.attr('href');
		}
		$link = $('#t' + tid + ' .quote_picture');
		if ($link.length > 0) {
			return $link.attr('original');
		}
		return false;
	},
	getImageLink : function(tid) {
		var $link = $('#t_' + tid + ' a img');
		if ($link.length > 0) {
			return $link.attr('src');
		}
		return false;
	},
	getGoodsTitle : function(tid) {
		var $title = $('#t' + tid + ' .goods_title');
		if ($title.length > 0) {
			return $title.text().replace(/\s/g, '');
		}
		$title = $('#t' + tid + ' .quote_goods_title');
		if ($title.length > 0) {
			return $title.text().replace(/\s/g, '');
		}
		return false;
	},
	getShareContent : function(tid) {
		var c = twitterObj.getGoodsTitle(tid);
		if (c != false) {
			return c;
		} else {
			return twitterObj.getContent(tid);
		}
	},
	getPicName : function(tid) {
		var $t = $('#t_' + tid + ' a img');
		if ($t.length > 0) {
			return $t.attr('title');
		}
		return false;
	},
	getPreviousTid : function(tid) {
		var $t = $('#t_' + tid).prev('div').attr('id').replace('t_', '');
		if ($t.length > 0) {
			return $t;
		}
		return false;
	},
	getNextTid : function(tid) {
		var $t = $('#t_' + tid).next('div').attr('id');
		if (typeof($t) != 'undefined') {
			return $t.replace('t_', '');
		}
		return false;
	},
	showGoods : function(tid) {
		var t = twitterObj.getPicName(tid);
		var picLink = twitterObj.getImageLink(tid);
		var num = twitterObj.getNextTid(tid);
		$blackShop = $.dialog({
			title : '宝贝推荐语:',
			content : 'Hello Kitty萌物志'
					+ '<a href="javascript:void(0);" onclick="javascript:twitterObj.getNextTid('
					+ num + ')";><img src="' + picLink
					+ '" width="120px" /></a>' + '宝贝名:' + t,
			width : '400px',
			closeHandle : function() {
				$(this).closest('.dialog').hide();
			}
		});
		var ua = navigator.userAgent.toLowerCase();
		var isIE6 = ua.indexOf("msie 6") > -1;
		var fixed = 'fixed';
		if (isIE6) {
			fixed = '';
		}
		$blackShop.toCenter(fixed).show();
	}
}
function check_the_box(id) {
	var isPromt = $('#savemfcstate').attr("checked");
	if (isPromt == true) {
		$.get(server_url + 'users/ajax_set_is_promt/', {
					'id' : id
				});
	} else {
		return false;
	}
}
function show_confirm_del(tid) {
	$('.confirm_bg_box').remove();
	var iWidth = document.documentElement.clientWidth;
	var iHeight = document.documentElement.clientHeight;
	var bgObj = $('<div class="confirm_bg_box"></div>');
	bgObj.width(iWidth).height(Math.max(document.body.clientHeight, iHeight))
			.appendTo('body');
	var H = screen.height;
	var yScroll;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {
		yScroll = document.body.scrollTop;
	} else {
		yScroll = '';
	}
	var oShow = document.getElementById('submit_apply_innnertest_alert');
	oShow.style.display = 'block';
	oShow.style.top = (H / 2 - 90 - 185 + yScroll) + "px";
	oShow.style.left = ($(window).width() / 2) - 500 + "px";
}
function show_confirm() {
	$('.confirm_bg_box').remove();
	$('#submit_apply_innnertest_alert').hide();
	var iWidth = document.documentElement.clientWidth;
	var iHeight = document.documentElement.clientHeight;
	var bgObj = document.createElement("div");
	bgObj.setAttribute("class", 'confirm_bg_box');
	bgObj.style.width = iWidth + "px";
	bgObj.style.height = Math.max(document.body.clientHeight, iHeight) + "px";
	document.body.appendChild(bgObj);
	var H = screen.height;
	var yScroll;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {
		yScroll = document.body.scrollTop;
	} else {
		yScroll = '';
	}
	var oShow = document.getElementById('submit_apply_innnertest_delf');
	oShow.style.display = 'block';
	oShow.style.top = (H / 2 - 90 - 185 + yScroll) + "px"
	oShow.style.left = ($(window).width() / 2) - 500 + "px";
	window
			.setTimeout(
					"hide_confirm('submit_apply_innnertest_alert','submit_apply_innnertest_delf')",
					2000);
}
function hide_alert(tid) {
	$('#' + tid).hide();
	$('.confirm_bg_box').remove();
}
function hide_confirm(tid, ctid) {
	$('#' + tid).hide();
	$('#' + ctid).hide();
	$(".confirm_bg_box").remove();
}
function show_confirm_delete(tid, shareDelType) {
	$('#show_choose_del_ok').unbind('click').removeAttr('onClick').click(
			function() {
				twitterListObj.remove(tid, shareDelType);
				if ($('#wall').length > 0 && $('#content_fluid').length > 0
						&& twitterObj.currentPage != 'act')
					$("#wall").masonry('reload');
			});
	show_confirm_del('submit_apply_innnertest_alert');
}
function hideTheDiv(tid) {
	$('#email' + tid).attr(
			'onClick',
			"show_share_bar(" + tid + ',' + nickname + ',' + replyConnent
					+ ");");
	$('#share_with_friends').remove();
	$('#email' + tid).html('我要分享');
	$('#share_with_friends').hide();
}
function initPicTypeCheckbox(boxContainer) {
	var c = $(boxContainer);
	if (c.attr('inited') == 'true') {
		return;
	}
	c.attr('inited', 'true');
	var chks = c.find('.twitter_pic_type');
	chks.each(function() {
				$(this).click(function() {
							tmpStr = $('.keywords').val();
							if (tmpStr.indexOf($(this).html()) == -1) {
								tmpStr += " " + $(this).html();
								$('.keywords').val(trim(tmpStr));
								$(this).addClass('twitter_pic_type_checked');
								if ($('#hiddenPictype').val() == 0) {
									$('#hiddenPictype')
											.val($(this).attr('val'));
								}
							} else {
								var replaceStr = tmpStr.replace($(this).html(),
										"");
								$('.keywords').val(trim(replaceStr));
								$(this).removeClass('twitter_pic_type_checked');
								if ($('#hiddenPictype').val() == $(this)
										.attr('val')) {
									$('#hiddenPictype').val('0');
								}
							}
						});
			});
}
function show_vote_face_bd() {
	$('#txt_bought').css('color', '#c12058');
	$('#txt_like').css('color', '#666666');
	$('#vote_face_like').hide();
	$('#vote_face_bd').show();
}
function show_vote_face_like() {
	$('#txt_like').css('color', '#c12058');
	$('#txt_bought').css('color', '#666666');
	$('#vote_face_bd').hide();
	$('#vote_face_like').show();
}
function closeLomoPop() {
	$('#lomo-pop').hide();
	$.setCookie('MEILISHUO_CLOSE_POP', true, {
				duration : 31536000,
				path : '/',
				domain : DEFAULT_COOKIEDOMAIN
			});
}
function picLoaded() {
	$('.lomo-desc .loading').html('').hide();
	$('.upload_pic').show();;
}
var faceTableObj = {
	txtBoxDivId : "",
	txtBoxId : 0,
	showFaceIco : function(tid) {
		if (tid == 0) {
			faceTableObj.txtBoxDivId = "twitter_publish_editor";
			if ($('#' + faceTableObj.txtBoxDivId).css('display') == 'none') {
				return false;
			}
			var pos = $('#twitter_tools_expression').offset();
			$('#twitter_tools_faces_table').toggle();
			$('.twitter_tools_faces_table_div').css({
						"top" : (pos.top + 16),
						"left" : (pos.left - 78)
					});
			$('#ad_click_area').hide();
		} else if (tid == -1) {
			faceTableObj.txtBoxDivId = "twitter_publish_editor";
			var pos = $('#' + faceTableObj.txtBoxDivId).position();
			$('#twitter_tools_faces_table').toggle();
			$('.twitter_tools_faces_table_div').css({
						"top" : (pos.top + 314),
						"left" : pos.left
					});
			$('#ad_click_area').hide();
		} else if (tid == -2) {
			faceTableObj.txtBoxDivId = "hide_comments1";
			var pos = $('#' + faceTableObj.txtBoxDivId).position();
			$('#twitter_tools_faces_table').toggle();
			$('.twitter_tools_faces_table_div').css({
						"top" : (pos.top + 25),
						"left" : (pos.left - 100)
					});
		} else if (tid == -3) {
			faceTableObj.txtBoxDivId = "commentgoods";
			var pos = $('#' + faceTableObj.txtBoxDivId).position();
			$('#twitter_tools_faces_table').toggle();
			$('.twitter_tools_faces_table_div').css({
						"top" : (pos.top + 25),
						"left" : (pos.left - 100)
					});
		} else {
			faceTableObj.txtBoxDivId = 't_note' + tid + ' .answer_text';
			if ($('#' + faceTableObj.txtBoxDivId).length === 0) {
				faceTableObj.txtBoxDivId = 't_note' + tid
						+ '~.hp_cmt .answer_text';
			}
			var pos = $('#t_note' + tid).parents().find('.single_face')
					.offset();
			pos.top = pos.top;
			$('#twitter_tools_faces_table').toggle();
			$('.twitter_tools_faces_table_div').css({
						"top" : (pos.top + $(".single_face").height() + 10),
						"left" : (pos.left - 85)
					});
		}
		txtBoxId = tid;
	},
	hide_tables : function() {
		if (typeof(txtBoxId) == "undefined" || txtBoxId == 0) {
			$('#twitter_tools_faces_table').hide();
			$('#ad_click_area').show();
		} else {
			$('#twitter_tools_faces_table').hide();
		}
		faceTableObj.txtBoxDivId = "";
	},
	voice_face_emotion : function(id) {
		var word = '';
		switch (id) {
			case '1' :
				word = '[笑]';
				break;
			case '2' :
				word = '[晕死]';
				break;
			case '3' :
				word = '[泪汪汪]';
				break;
			case '4' :
				word = '[害羞]';
				break;
			case '5' :
				word = '[问号]';
				break;
			case '6' :
				word = '[流泪]';
				break;
			case '7' :
				word = '[得意]';
				break;
			case '8' :
				word = '[抓狂]';
				break;
			case '9' :
				word = '[酷]';
				break;
			case '10' :
				word = '[怒]';
				break;
			case '11' :
				word = '[坏笑]';
				break;
			case '12' :
				word = '[心碎]';
				break;
			case '13' :
				word = '[猪头]';
				break;
			case '14' :
				word = '[猥琐]';
				break;
			case '15' :
				word = '[囧]';
				break;
			case '16' :
				word = '[转眼珠]';
				break;
			case '17' :
				word = '[刚巴德]';
				break;
			case '18' :
				word = '[长草]';
				break;
			case '19' :
				word = '[财迷]';
				break;
			case '20' :
				word = '[星星眼]';
				break;
			case '21' :
				word = '[白菜]';
				break;
			case '22' :
				word = '[鄙视]';
				break;
			case '23' :
				word = '[飞吻]';
				break;
			case '24' :
				word = '[色色]';
				break;
			case '25' :
				word = '[调皮]';
				break;
			case '26' :
				word = '[拒绝]';
				break;
			case '27' :
				word = '[骷髅]';
				break;
			case '28' :
				word = '[泪]';
				break;
			case '29' :
				word = '[汗]';
				break;
			case '30' :
				word = '[么么]';
				break;
			case '31' :
				word = '[如花]';
				break;
			case '32' :
				word = '[思考]';
				break;
			default :
				word = '';
				break;
		}
		var currentIndex = getCursortPosition($('#' + faceTableObj.txtBoxDivId));
		var a = faceTableObj.txtBoxDivId;
		var t = a.substring(0, a.indexOf("~.hp"));
		var editor_html = $('#' + faceTableObj.txtBoxDivId).val();
		var $editor_select = '';
		if (typeof editor_html == 'undefined') {
			$editor_select = $('#' + t).parent().find('.answer_text');
			editor_html = $editor_select.val();
		}
		var exEditorHtml = editor_html.substring(0, currentIndex);
		var nxEditorHtml = editor_html.substring(currentIndex,
				editor_html.length);
		var html = exEditorHtml + word + nxEditorHtml;
		currentIndex = currentIndex + word.length;
		if ($editor_select == '') {
			$('#' + faceTableObj.txtBoxDivId).val(html).attr('range',
					currentIndex);
		} else {
			$editor_select.val(html).attr('range', currentIndex);
		}
		if (faceTableObj.txtBoxDivId == 'twitter_publish_editor') {
			$('#twitter_publish_editor_tip').hide();
		}
	}
}
var dataObj = {
	timeS : function() {
		var myDate = new Date();
		return myDate.getTime();
	}
}
var pageAutoObj = {
	actionKey : 0,
	autoType : 1,
	actionAuto : function() {
		if (pageAutoObj.autoType == 1) {
			this.stopAuto();
		} else {
			this.startAuto();
		}
	},
	listRefrash : function() {
		twitterListObj.lType = 'supergoods';
		this.refrash(1);
		$("#twitter_show_goods_list").attr('class',
				'twitter_show_goods_list_on');
		$("#twitter_show_picture").attr('class', 'twitter_show_picture_off');
		pageChangeObj.getPageData();
	},
	picPrefrash : function() {
		twitterListObj.lType = 'supergoodsPic';
		this.refrash(1);
		$("#twitter_show_goods_list").attr('class',
				'twitter_show_goods_list_off');
		$("#twitter_show_picture").attr('class', 'twitter_show_picture_on');
		pageChangeObj.getPageData();
	},
	refrash : function(v) {
		pageAutoObj.actionKey = 1;
		$("#twitter_show_Refresh")
				.html('<img src="/css/icons/link_wait.gif" alt="正在加载内容..."/>正在刷新');
		$("#twitter_show_list").html('').css('style', '');
		twitterListObj.getTwitterList(0);
		pageAutoObj.actionKey = 0;
		if (pageAutoObj.autoType == 2) {
			this.startAuto();
		}
		twitterListObj.resetTop();
	},
	stopAuto : function() {
		if (pageAutoObj.autoType == 2) {
			return false;
		}
		pageAutoObj.showStopAlter(5);
		$("#twitter_show_auto_switch")
				.html('<img src="/css/icons/start.jpg" alt="开始自动刷新" />自动刷新')
				.attr('title', '开始自动刷新');
		pageAutoObj.autoType = 2;
		window.clearInterval(timerObj.timeOff);
		timerObj.timeOff = 0;
	},
	startAuto : function() {
		if (pageAutoObj.autoType == 1) {
			return false;
		}
		pageAutoObj.actionKey = 0;
		pageAutoObj.showStopAlter(0);
		$("#twitter_show_auto_switch")
				.html('<img src="/css/icons/stop.jpg" alt="停止自动刷新" />停止刷新')
				.attr('title', '停止自动刷新');
		pageAutoObj.autoType = 1;
		twitterListObj.getTwitterList(0);
	},
	showStopAlter : function(v) {
		var txt = '';
		if (v > 1) {
			txt = '内容自动加载功能已中止...';
		} else {
			txt = '内容自动加载功能已开启...';
		}
		$("#twitter_show_page_prompt").html(txt).show();
		window.setTimeout(function() {
					$("#twitter_show_page_prompt").hide('slow');
				}, 2000);
	},
	hideAutoFoots : function() {
		$("#twitter_show_loading").hide('slow');
	},
	showAutoFoots : function() {
		$("#twitter_show_loading").show().corner('bottom');
	}
}
var twitterListObj = {
	lType : 'friend',
	listType : '',
	lastTwitterID : null,
	twitterDataObj : null,
	topicId : 0,
	nickName : null,
	noJump : 0,
	uid : '',
	goodShowType : 'list',
	twitter_url : server_url + 'twitter/ajax_getFriendTwitter/',
	twitter_url_fresh : server_url
			+ 'twitter/ajax_getFriendTwitter?frm=homefresh',
	twitter_anyUrl : server_url + 'twitter/ajax_getTwitter/',
	twitter_topicUrl : server_url + 'topic/ajax_getTopicTwitter/',
	twitter_personUrl : server_url + 'person/ajax_getPersonTwitter/',
	twitter_removeUrl : server_url + 'twitter/ajax_removeTwitter/',
	twitter_supergoodsUrl : server_url + 'goods/ajax_getSuperGoods/',
	twitter_removeNewUrl : server_url + '/twitter/ajax_removeTwitterHaibao/',
	twitter_supergoodsPicUrl : server_url + 'goods/ajax_getPicSuperGoods/',
	twitter_personSummUrl : server_url + 'person/ajax_getPersonSummTwitter/',
	twitter_lastId : 0,
	showUserGuide : false,
	getPageHtml : function(url, currtPageNum) {
		var c = dataObj.timeS();
		if (twitterListObj.lType == 'any') {
			if (currtPageNum == 0) {
				twitterListObj.twitter_lastId = 0;
			}
			$.get(url, {
						lid : twitterListObj.twitter_lastId,
						pv : pageAutoObj.actionKey,
						why : c
					}, function(jsonFormat) {
						var json = eval("(" + jsonFormat + ")");
						if (json.location == 'dajia') {
							location.href = server_url + "dajia/main/focus";
							return false;
						}
						$("#twitter_show_Refresh").html('').hide();
						if (currtPageNum == 0) {
							$("#twitter_show_list").html(json.html);
						} else {
							var key = '#t' + twitterListObj.twitter_lastId;
							var s = $(key).attr('href');
							$(key).after(json.html);
						}
						twitterListObj.twitter_lastId = vh[0];
					});
		} else {
			$.get(url, {
						page : currtPageNum,
						tagListType : twitterListObj.listType,
						why : c,
						lType : twitterListObj.lType
					}, function(jsonFormat) {
						var json = eval("(" + jsonFormat + ")");
						if (json.location == 'dajia'
								&& twitterListObj.noJump != 1) {
							location.href = server_url + "dajia/main/focus";
							return false;
						}
						if (json.location == 'all'
								&& twitterListObj.noJump != 1) {
							location.href = server_url + "home/all?frm=click";
							return false;
						}
						if (currtPageNum <= 1) {
							$("#twitter_show_list").html(json.html);
							$("#twitter_show_list_2").hide();
							$("#twitter_show_list_3").hide();
						} else {
							$("#twitter_show_list").html(json.html);
							$("#twitter_show_list_2").html('').hide();
							$("#twitter_show_list_3").html('').hide();
						}
						twitterPrompt.refreshPrompt();
						$("#twitter_show_Refresh").html('').hide();
						if (twitterListObj.showUserGuide) {
							go_to_step(1);
							twitterListObj.showUserGuide = false;
						}
						$('.twitter_avatar').find('img:not(.js_processed)')
								.addClass('js_processed').floatUserInfo();
					});
			this.resetTop();
		}
		return true;
	},
	remove : function(tid, shareDelType) {
		var id = '#del' + tid;
		var act_id = $('#act_twitter_' + tid).text();
		var haibaoObj = $('.t_' + tid);
		if (typeof(haibaoObj) != 'undefined') {
			haibaoObj.remove();
		}
		$(id).removeAttr('onClick');
		var url = '';
		if (twitterObj.currentPage == 'wbapp'
				|| twitterObj.currentPage == 'inneov'
				|| twitterObj.currentPage == 'lancome'
				|| twitterObj.currentPage == 'lancome2'
				|| twitterObj.currentPage == 'lauder'
				|| twitterObj.currentPage == 'bobbi'
				|| twitterObj.currentPage == 'sharetuan') {
			url = twitterListObj.twitter_removeNewUrl;
		} else {
			url = twitterListObj.twitter_removeUrl;
		}
		if (act_id != "") {
			data = {
				tid : tid,
				act_id : act_id
			};
		} else if (twitterObj.currentPage == 'wbapp'
				|| twitterObj.currentPage == 'inneov'
				|| twitterObj.currentPage == 'lauder'
				|| twitterObj.currentPage == 'lancome'
				|| twitterObj.currentPage == 'lancome2'
				|| twitterObj.currentPage == 'bobbi'
				|| twitterObj.currentPage == 'sharetuan') {
			data = {
				tid : tid,
				currentpage : twitterObj.currentPage
			};
		} else {
			data = {
				tid : tid
			};
		}
		$.get(url, data, function(mesg) {
			if (mesg == "dtree") {
				alert("许愿树的宝贝不能删除！");
				return false;
			}
			show_confirm();
			$('#submit_apply_innnertest_alert_' + tid).hide();
			switch (twitterObj.removeCallBackType) {
				case 'ajax' :
					pageChangeObj.getPageData();
					break;
				case 'refresh' :
					location.href = location.href;
					break;
			}
			if (twitterObj.currentPage == 'twitter') {
				window
						.setTimeout(
								"twitterListObj.getTwitterList( pageChangeObj._currtPage )",
								2000);
			} else if (document.location.href.indexOf('/share/') != -1) {
				(shareDelType == 0) && (location.href = server_url + 'home');
			} else {
				$('#t' + tid).remove();
				if (twitterObj.currentPage != 'wbapp'
						&& twitterObj.currentPage != 'minisite'
						&& twitterObj.currentPage != 'act'
						&& $('#content_fluid').length > 0) {
					$("#wall").masonry('reload');
				}
			}
			var absNum = document.getElementById("absNum");
			var sendNum = document.getElementById("sendNum");
			twitterObj.number(absNum, sendNum, 20, 30, 0);
		});
	},
	getTwitterList : function(pageNum, frm) {
		twitterPrompt.has_twitter = false;
		if (twitterListObj.lType == 'twitter' || twitterListObj.lType == 'all') {
			if (typeof(frm) == 'undefined') {
				twitterListObj.getPageHtml(twitterListObj.twitter_url, pageNum);
			} else {
				twitterListObj.getPageHtml(twitterListObj.twitter_url_fresh,
						pageNum);
			}
		} else if (twitterListObj.lType == 'topic') {
			var urlArr = twitterListObj.twitter_topicUrl.split("/");
			if (urlArr[urlArr.length - 1] == "") {
				var newUrl = this.twitter_topicUrl + twitterListObj.topicId
						+ '/';
			}
			twitterListObj.getPageHtml(newUrl, pageNum);
		} else if (twitterListObj.lType == 'person') {
			twitterListObj.getPageHtml(twitterListObj.twitter_personUrl
							+ twitterListObj.uid, pageNum);
		} else if (twitterListObj.lType == 'personSumm') {
			twitterListObj.getPageHtml(twitterListObj.twitter_personSummUrl
							+ twitterListObj.uid, pageNum);
		} else if (twitterListObj.lType == 'supergoods') {
			twitterListObj.getPageHtml(twitterListObj.twitter_supergoodsUrl,
					pageNum);
		} else if (twitterListObj.lType == 'supergoodsPic') {
			twitterListObj.getPageHtml(twitterListObj.twitter_supergoodsPicUrl,
					pageNum);
		} else {
			twitterListObj.getPageHtml(twitterListObj.twitter_anyUrl, pageNum);
		}
	},
	resetTop : function() {
		if (document.body.scrollTop) {
			document.body.scrollTop = 0;
		} else {
			document.documentElement.scrollTop = 0;
		}
		return false;
	}
}
var twitterNewPicObj = {
	picURL : '',
	picFilename : '',
	divLoctainKey : '#twitter_tools_publisher_upImages',
	divLoctainWait : '#twitter_tools_button_up_wait',
	picFileEmNameKey : '#publisher_file',
	picLoding : '<span id="publisher_image_loading">请等待图片上传中...</span>',
	picOk : '<span id="publisher_perch"  style="width:120px;"><em id="publisher_perch_name"></em><a id="publisher_perch_delete" title="删除" onClick="twitterNewPicObj.movePic();" ><img src="/css/images/move_001.gif" /></a></span><span id="publisher_perch_dox" style="display: none;"></span>',
	sentPic : function(obj) {
		twitterNewPicObj.picFilename = $(obj).val();
		if (twitterNewPicObj.validata(obj)) {
			$(obj).closest('form').submit();
			$(twitterNewPicObj.divLoctainWait).html('<img src="'
					+ pictureBaseUrl
					+ 'css/images/twitter/loading17.gif" /> 请等待, 图片上传中...');
		}
	},
	main : function(type) {
		$(twitterNewPicObj.divLoctainWait).html(" ");
		var uploadStr = '';
		if (type == 'goods') {
			uploadStr = '上传图片';
		}
		var picUpload = '<span id="publisher_image_title">'
				+ uploadStr
				+ '<form id="publisher_image_form" target="upfiler_picture_iframe" action="http://'
				+ Meilishuo.config.domain.upload
				+ '/pictures/ajax_savePic/" enctype="multipart/form-data" method="post"><input id="publisher_file" name="attach[]" size="1" type="file"  onChange="twitterNewPicObj.sentPic(this);"/><input id="imgType" name="imgType" type="hidden" value="2"/></form></span>';
		if ($.browser.msie) {
			picUpload = '<span id="publisher_image_title">'
					+ uploadStr
					+ '<form id="publisher_image_form" target="upfiler_picture_iframe" action="http://'
					+ Meilishuo.config.domain.upload
					+ '/pictures/ajax_savePic/" enctype="multipart/form-data" method="post"><input id="publisher_file" hideFocus="true" name="attach[]" size="1" type="file" onChange="twitterNewPicObj.sentPic(this);"/><input id="imgType" name="imgType" type="hidden" value="2" style="cursor: pointer; overflow: hidden; float: left; width: 98px; height: 30px; "/></form></span>';
		}
		$(twitterNewPicObj.divLoctainKey).html(picUpload);
		$('#upload_entity_btn').html(picUpload);
		if (type == 'goods') {
			$('#imgType').val(4);
		} else {
			$('#imgType').val(1);
		}
	},
	validata : function(obj) {
		if (!/\.(gif|jpg|png|jpeg|bmp)$/i.test(twitterNewPicObj.picFilename)) {
			$(twitterNewPicObj.picFileEmNameKey).val('');
			alert('请上传标准图片文件,支持gif,jpg,png,jpeg.');
			return false;
		}
		return true;
	},
	movePic : function() {
		$(twitterNewPicObj.divLoctainKey).html(twitterNewPicObj.picUpload);
		$.get(server_url + '/twitter/ajax_movePicture/', {
					picid : twitterObj.pictureID
				});
		var txt = $("#twitter_publish_editor").val();
		txt = txt.replace('分享图片', '');
		$("#twitter_publish_editor").val(txt).focus();
	},
	addImgGoodsSuccess : function(id, url) {
		twitterObj.pictureID = id;
		var img = '<img src="' + url + '" />';
		$('#tedit_goods_images').html(img);
		$(twitterNewPicObj.divLoctainWait).hide();
	},
	addImgSuccess : function(id, fname, url, filterUrl) {
		twitterObj.pictureID = id;
		twitterObj.hasEntityPic = true;
		twitterObj.showPicEdit(url, filterUrl);
		$("#twitter_publish_editor").focus();
	}
}
var twitterPrompt = {
	twitter_lastTime : 0,
	has_twitter : false,
	newTwitter : server_url + '/twitter/ajax_getNewTwitter',
	TwitterTime : server_url + '/server/ajax_getServerTime',
	tempshow : function() {
		alert(twitterPrompt.twitter_lastTime);
	},
	getNewTwitter : function() {
		if (twitterPrompt.has_twitter) {
			return false;
		}
		var twitter_id = 0;
		var twitterList = $
				.makeArray($('#twitter_show_list .twitter_Feed:first')
						.attr('id'));
		$.each(twitterList, function(n, value) {
					if (n == 0) {
						twitter_id = value.substring(1);
					}
				});
		var pageNum = $('#twitter_show_list_foot_pageNum .page_num').html();
		var url = location.href;
		url = url.split('/');
		var length = url.length;
		var flag = 0;
		for (var i = 0; i < length; i++) {
			if (url[i] == 'home' || url[i] == 'welcome' || length == 4) {
				flag = 1;
				break;
			}
		}
		if (pageNum != null && pageNum != undefined && pageNum != ''
				&& flag == 1) {
			pageNum = (pageNum.toString().split("/"))[0];
			if (pageNum == 1) {
				var twitterNum = $('#twitter_show_list .twitter_Feed').size();
				$('#twitter_latest_id').val(twitterNum);
			}
			twitterNum = $('#twitter_latest_id').val();
			$.getJSON(twitterPrompt.newTwitter, {
						"twitter_id" : twitter_id,
						"pageNum" : pageNum,
						"twitterNum" : twitterNum
					}, function(bakNum) {
						if (bakNum.num > 0) {
							twitterPrompt.has_twitter = true;
							var promtStr = '<a href="javascript:void(0);">有更新，点击查看哦</a>';
							document.getElementById('twitter_prompt_num').innerHTML = promtStr;
							$('#twitter_prompt_num').unbind('click').click(
									function() {
										if ($('.twitter-list-tabs .twitter_tab1')
												.hasClass('current_tab')) {
											location.href = server_url
													+ 'home/all?frm=homerefresh';
											return false;
										}
										var frm = true;
										twitterListObj.getTwitterList(0, frm);
										pageChangeObj.getPageData();
									}).show();
						} else {
							$('#twitter_prompt_num').hide();
						}
					});
		}
	},
	refreshPrompt : function() {
		$('#twitter_prompt_num').html('');
		$('#twitter_prompt_num').attr('style', 'display:none;');
	}
}
var twitterNoteObj = {
	noteNew_url : server_url + '/twitter/ajax_newNoteTwitter/',
	noteList_url : server_url + '/note/ajax_showNote/',
	liveTwitterObj : null,
	showNoteDiv : function(tid, uid, disnum, repnum, type) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.is_actived == 2) {
			location.href = server_url + 'users/activate_message';
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		if (type == undefined || type == null) {
			type = 4;
		}
		if (this.liveTwitterObj != null) {
			this.liveTwitterObj.appendStop = true;
		}
		clearInterval(timerObj.timeOff);
		var $note = $('<div id="t_note'
				+ tid
				+ '" class="twitter_note_list" >'
				+ '<div class="arrow_top"></div>'
				+ '<div class="twitter_note_list_t"></div>'
				+ '<div class="twitter_note_list_c">'
				+ '<div class="twitter_note_edit">'
				+ '<div class="twitter_tools_faces_table_reply" onclick="faceTableObj.showFaceIco('
				+ tid
				+ ')"><img src="/css/images/face/reply_face.gif" class="single_face"></div>'
				+ '<textarea class="answer_text"></textarea>'
				+ '<input class="answer_button" type="button" onclick="twitterNoteObj.createNote('
				+ uid + ',' + tid + ', 0, ' + disnum + ', ' + repnum + ','
				+ type + ');" value="回 复" />'
				+ '<span class="note_limit">140</span>' + '</div>'
				+ '<div class="note_list"></div>' + '</div>'
				+ '<div class="twitter_note_list_b"></div>'
				+ '<div style="clear:both;"></div>' + '</div>');
		var $twitter = $('#' + twitterObj.idPrefix + tid).append($note);
		var $noteInput = $note.find('.answer_text');
		$noteInput.focus().textlimit($note.find('.note_limit'), 140, 10);
		bindRange($noteInput.get(0));
		if (twitterListObj.lType != 'twitterPage' && type != 24) {
			$note.find('.note_list').load(twitterNoteObj.noteList_url, {
						twid : tid,
						'disnum' : disnum,
						'repnum' : repnum,
						'type' : type
					});
		}
		var replyBtn = $twitter.find('.reply_button').removeAttr('onclick')
				.unbind('click');
		setTimeout(function() {
					replyBtn.bind('click', function() {
								twitterNoteObj.hide_reply_note(tid, uid,
										disnum, repnum, type);
								return false;
							});
				}, 100);
	},
	replyInEditbox : function(nickname, tid) {
		var reply = "回复@" + nickname + " : " + "";
		var $noteInput = $('#t_note' + tid + ' .answer_text');
		$noteInput.val(reply);
		var length = reply.length;
		setCursor($noteInput.get(0), reply.length, reply.length);
		return false;
	},
	hide_reply_note : function(tid, uid, disnum, repnum, type) {
		if (this.liveTwitterObj != null) {
			this.liveTwitterObj.appendStop = false;
		}
		faceTableObj.hide_tables();
		$('#t_note' + tid).remove();
		$('#' + twitterObj.idPrefix + tid + ' .reply_button')
				.removeAttr('onclick').unbind('click').click(function() {
							twitterNoteObj.showNoteDiv(tid, uid, disnum,
									repnum, type);
							return false;
						});
	},
	noteAtsingle : function(uid, tid, id, showIndex, type) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		} else {
			var $note = $("#" + id);
			faceTableObj.hide_tables();
			var $noteInput = $note.find('.answer_text');
			$noteInput.attr("disabled", "disabled");
			var txt = $noteInput.val();
			var txtLength = GetStringLength(txt);
			if (txtLength <= 0) {
				alert('留言不能为空.');
				$noteInput.attr("disabled", "");
				return false;
			} else if (txtLength > 140) {
				alert('留言不能超过140个字符.');
				$noteInput.attr("disabled", "");
				return false;
			}
			$noteInput.val('');
			var callback = function(mesg) {
				if (mesg == 1) {
					showForbiddenWindow();
					return false;
				}
				window.location.reload();
				return;
			}
			$.ajax({
						async : false,
						type : "GET",
						url : twitterNoteObj.noteNew_url,
						data : {
							suid : uid,
							stid : tid,
							type : type,
							tContent : txt,
							pid : 0,
							showIndex : showIndex
						},
						success : callback
					});
		}
	},
	checkReply : function(disnum, repnum, tid) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		var $note = $("#t_note" + tid);
		if ($note.attr('replying') == 'true') {
			return false;
		}
		var $noteInput = $note.parent().find('.answer_text');
		faceTableObj.hide_tables();
		$noteInput.attr("disabled", "disabled");
		var txt = $noteInput.val();
		var txtLength = GetStringLength(txt);
		if (txtLength <= 0) {
			alert('留言不能为空.');
			$noteInput.attr("disabled", "");
			return false;
		} else if (txtLength > 140) {
			alert('留言不能超过140个字符.');
			$noteInput.attr("disabled", "");
			return false;
		}
		return true;
	},
	createNote : function(uid, tid, showIndex, disnum, repnum, type) {
		if (!twitterNoteObj.checkReply(disnum, repnum, tid)) {
			return false;
		}
		if (disnum == null) {
			disnum = 0;
		}
		if (repnum == null) {
			repnum = 0;
		}
		var $note = $("#t_note" + tid);
		var $noteInput = $note.find('.answer_text');
		var txt = $noteInput.val();
		if (this.liveTwitterObj != null) {
			this.liveTwitterObj.appendStop = false;
		}
		var callback = function(mesg) {
			$noteInput.val('');
			if (mesg == 1) {
				showForbiddenWindow();
				return false;
			}
			if (twitterListObj.lType == 'twitterPage' || type == 24) {
				window.location.reload();
				return;
			}
			$note.attr('replying', 'false');
			if (type < 20) {
				var replyNumStr = $('#t' + tid + ' .reply_num').text();
				var replyNum = 0;
				if ($.trim(replyNumStr) != '') {
					replyNum = parseInt(replyNumStr.substring(1,
							replyNumStr.length - 1));
				}
				$('#t' + tid + ' .reply_num').text('(' + (replyNum + 1) + ')');
			}
			if (type != 24) {
				$note.find('.note_list').load(twitterNoteObj.noteList_url, {
							'twid' : tid,
							'disnum' : disnum,
							'repnum' : repnum,
							'type' : type
						});
			}
			$noteInput.attr("disabled", "");
			systemCron();
		};
		$note.attr('replying', 'true');
		$.ajax({
					async : false,
					type : "GET",
					url : twitterNoteObj.noteNew_url,
					data : {
						suid : uid,
						stid : tid,
						type : type,
						tContent : txt,
						pid : 0,
						showIndex : showIndex
					},
					success : callback
				});
	}
}
var messgarray = new Array();
var twitterToolsObj = {
	collectUrl : server_url + 'collect/ajax_createCollect/',
	cancelcollectUrl : server_url + 'collect/ajax_cancelCollect',
	forwardUrl : server_url + 'twitter/ajax_newForwardTwitter/',
	likeUrl : server_url + 'twitter/ajax_voteTwitter/',
	getEmailUrl : server_url + 'emailfriends/ajax_getFriendsEmail/',
	sendEmailUrl : server_url + 'emailfriends/ajax_sendFriendsEmail/',
	userFaceUrl : server_url + 'twitter/ajax_outFace/',
	userTxtUrl : server_url + 'askPage/ajax_outT/',
	updatePicTypeUrl : server_url + 'twitter/ajax_updatePicType',
	showT : 0,
	attrIndex : 0,
	faceT : 0,
	faceC : 0,
	twitterId : 0,
	show_mf : 0,
	txtBoxDivId : '',
	makFDivId : 'make_friends_with_HQ',
	show_promt_makefds : function(tid) {
		if (typeof(tid) == 'undefined') {
			txtBoxDivId = 'self_user_info_head';
		} else if (tid == 'submit_apply_innnertest_collect') {
			txtBoxDivId = 'twitter_avater_' + twitterId;
		} else {
			txtBoxDivId = 'twitter_avater_' + tid;
		}
		var pos = $('#' + txtBoxDivId).position();
		$('#make_friends_with_HQ').show();
		$('.make_friend_with_HQ_table').css({
					"top" : (pos.top + 84) + "px",
					"left" : (pos.left + 100) + "px"
				});
	},
	hide_alert_collect_suc : function(tid) {
		$('#' + tid).hide();
		$('.confirm_bg_box').remove();
		if (messgarray.type == 1) {
			$("#make_friends_with_HQ_fv").html("<img src='"
					+ messgarray.destinAvator
					+ "' style='width:64px;height:64px;'/>");
			$("#make_friends_with_HQ_font_1").html('亲爱的'
					+ messgarray.sourceNickname + '：');
			$("#make_friends_with_HQ_font_2")
					.html('你已经收藏、喜欢了三次以上<a href="{/$BASE_URL/}person/u/'
							+ messgarray.destinUid + '">'
							+ messgarray.destinNickname
							+ '</a>分享的宝贝。我们猜她与你兴趣相投。');
			$("#make_friends_with_HQ_font_3")
					.html('建议你关注<a href="{/$BASE_URL/}person/u/'
							+ messgarray.destinUid + '">'
							+ messgarray.destinNickname
							+ '</a>，就能在首页第一时间看到她分享更新，不再错过她分享的好宝贝和美图。');
			$('#make_friends_with_HQ_button')
					.attr(
							'onClick',
							'friendsObj.addFromUr(\''
									+ messgarray.destinUid
									+ '\');check_the_box(1);twitterToolsObj.close_make_friends();');
			twitterToolsObj.show_promt_makefds(tid);
		}
	},
	close_make_friends : function() {
		$('#make_friends_with_HQ').hide();
	},
	skipPage : function(url) {
		window.location = server_url + url;
	},
	collectTwitter : function(tid, num, uid) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		}
		num = num + 1;
		twitterId = tid;
		$.get(twitterToolsObj.collectUrl, {
					twitterid : tid
				}, function(mesg) {
					mesg = eval('(' + mesg + ')');
					messgarray.type = mesg.type;
					messgarray.sourceNickname = mesg.sourceNickname;
					messgarray.destinUid = mesg.destinUid;
					messgarray.destinNickname = mesg.destinNickname;
					messgarray.destinAvator = mesg.destinAvator;
					messgarray.sum = mesg.sum;
					$('#t' + tid + ' .collect_button_wrapper, .st' + tid
							+ ' .collect_button_wrapper')
							.html('<a href="javascript:void(0);" onclick="return twitterToolsObj.dropcollectTwitter('
									+ tid
									+ ','
									+ num
									+ ');">'
									+ '<span>'
									+ '<img src="http://www.meilishuo.com/css/images/twitter_tools/I_loveit.gif">'
									+ '</span>'
									+ '<span>我喜欢('
									+ num
									+ ')</span>' + '</a>');
					$('#submit_apply_innertest_gobackhp_f .interest_promt a')
							.attr(
									'href',
									'/person/u/' + current_user_id
											+ '/twitter/list/#personNavBar')
							.html('我喜欢的发言');
					show_alert('submit_apply_innnertest_like', 'confirm_bg_box');
					var textId = "submit_apply_innnertest_like_txt";
					var txt = '[小红心]';
					$("#" + textId).val(txt).focus();
					setCursor($("#" + textId).get(0), 0, 0);
					alertDiv.author = uid;
					alertDiv.stid = tid;
					alertDiv.type = 3;
					alertDiv.auid = uid;
				});
	},
	dropcollectTwitter : function(tid, cnum, uid) {
		cnum = cnum - 1;
		if (cnum > 0) {
			var boxtxt = '我喜欢(' + cnum + ')';
		} else {
			var boxtxt = '我喜欢';
		}
		$('#t' + tid + ' .collect_button_wrapper, .st' + tid
				+ ' .collect_button_wrapper')
				.html('<a href="javascript:void(0);" onclick="return twitterToolsObj.collectTwitter('
						+ tid
						+ ','
						+ cnum
						+ ','
						+ uid
						+ ');return false;">'
						+ '<span>'
						+ '<img src="http://www.meilishuo.com/css/images/twitter_tools/I_like.gif">'
						+ '</span>' + '<span>' + boxtxt + '</span>' + '</a>');
		$.get(twitterToolsObj.cancelcollectUrl, {
					twitterid : tid
				}, function(mesg) {
					show_alert('submit_apply_innnertest_collectdel',
							'confirm_bg_box');
				});
	},
	remove : function(tid) {
		$('#t' + tid).remove();
	},
	forwardTwitter : function(authorUid, tid, sUid, stid, type) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.is_actived == 2) {
			location.href = server_url + 'users/activate_message';
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		try {
			var showtxt = "";
			if (type == 29) {
				var txt = ' //@' + twitterObj.getNickname1(tid) + ' ：'
						+ twitterObj.getContent1(tid);
				type = 28;
			} else if (type == 30) {
				var txt = ' //@' + twitterObj.getNickname(tid) + ' ：'
						+ twitterObj.getContent(tid);
				type = 28;
			} else if (type == 31) {
				var txt = ' //@' + twitterObj.getNickname2(tid) + ' ：'
						+ twitterObj.getContent2(tid);
				type = 7;
			} else {
				var txt = ' //@' + twitterObj.getNickname(tid) + ' ：'
						+ twitterObj.getContent(tid);
			}
			if (sUid < 1 || type == 7) {
				alertDiv.author = authorUid;
				alertDiv.stid = tid;
			} else {
				alertDiv.author = sUid;
				alertDiv.stid = stid;
			}
			alertDiv.partuid = '';
			alertDiv.auid = authorUid;
			alertDiv.type = type;
			alertDiv.alertinfo(showtxt, txt);
		} catch (err) {
			var mesg = 'mesg:' + err.message + '.';
			mesg += "\n File:" + err.fileName + ".";
			mesg += "\n Line:" + err.lineNumber + ".";
			mesg += "\n Stack:" + err.stack + ".";
			mesg += "\n Name:" + err.name + ".";
		}
		return false;
	},
	sentForward : function(tt) {
		var content = $("#twitter_publish_forward").val();
		var isShowSuccess = true;
		if (tt != null) {
			content = $("#" + tt).val();
		}
		if (typeof(content) == 'undefined') {
			content = '[小红心]';
			isShowSuccess = false;
		}
		var log_Url = twitterToolsObj.forwardUrl;
		if (alertDiv.author == "from_me_tt") {
			log_Url += "?from=like";
		}
		if (alertDiv.stid < GOODS_T_DEPART) {
			$.get(log_Url, {
						suid : alertDiv.author,
						auid : alertDiv.auid,
						stid : alertDiv.stid,
						fws : content,
						type : alertDiv.type
					}, function(mesg) {
						if (alertDiv.type == 28) {
							window.setTimeout(function() {
										location.href = location.href;
									}, 500);
						}
						if (twitterListObj.lType == 'any'
								|| twitterListObj.lType == 'topic'
								|| twitterListObj.lType == 'atme') {
						} else {
							var ua = navigator.userAgent.toLowerCase();
							var isIE6 = ua.indexOf("msie 6") > -1;
							var fixed = 'fixed'
							if (isIE6) {
								fixed = '';
							}
							var successWindow = $.dialog({
										title : '美丽提示',
										content : $('#forwardsuccess').show(),
										closeHandle : function() {
											$(this).closest('.dialog').hide();
										}
									});
							if (isShowSuccess) {
								successWindow.toCenter(fixed).show();
								setTimeout(function() {
											successWindow.hide();
										}, 1500);
							}
							if ($("#zupage").val() > 1) {
								return false;
							}
							pageChangeObj.createPageList(1);
						}
					});
		} else {
			var comment = $('#' + tt).val().trim();
			gid = $('#yiggg').val();
			var callback = function(backstr) {
				var ua = navigator.userAgent.toLowerCase();
				var isIE6 = ua.indexOf("msie 6") > -1;
				var fixed = 'fixed'
				if (isIE6) {
					fixed = '';
				}
				var successWindow = $.dialog({
							title : '美丽提示',
							content : $('#forwardsuccess').show(),
							closeHandle : function() {
								$(this).closest('.dialog').hide();
							}
						});
				if (isShowSuccess) {
					successWindow.toCenter(fixed).show();
					setTimeout(function() {
								successWindow.hide();
							}, 1500);
				}
			}
			var url = server_url + "twitter/ajax_comment";
			$.post(url, {
						'comment' : comment,
						'gid' : gid
					}, callback);
		}
		alertDiv.closeDiv();
		return false;
	},
	likeIt : function(tid, ty, page, gid) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		}
		$("#yiggg").val(gid);
		if (typeof(page) == 'undefined') {
			var page = '';
		}
		if (ty == 1) {
			$("#submit_apply_innnertest_like_set").attr("checked", true);
			$('#submit_apply_innertest_gobackhp_f .interest_promt a').attr(
					'href', '/person/u/' + current_user_id + '/collect')
					.html('我喜欢的宝贝');
		}
		if (ty == 4) {
			twitterToolsObj.showT = '#show_' + tid;
			var key = '#z_' + tid;
			$(key).removeAttr('onClick');
			$.getJSON(twitterToolsObj.likeUrl, {
						tvd : tid,
						tvy : ty,
						gid : gid
					}, function(json) {
						var top = $(key).offset().top;
						var left = $(key).offset().left;
						var p = 'top:' + top + 'px;left:' + left + 'px;';
						var style = 'position:absolute;' + p + 'z-index:200;';
						if ($.browser.msie) {
							style += 'filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=60,finishOpacity=100);';
						} else {
							style += 'opacity: 0.6;';
						}
						$(twitterToolsObj.showT).attr('style', style)
								.height('50px').width('60px').html(json['str'])
								.show('slow');
						var c = window.setTimeout(function() {
									twitterToolsObj.setNum(key, tid, ty,
											json['num'], json['type'], 0, page,
											gid, "");
								}, 1000);
					});
		} else {
			try {
				if (ty == 29) {
					var txt = ' //@' + twitterObj.getNickname1(tid) + ' ：'
							+ twitterObj.getContent1(tid);
					ty = 28;
				} else if (ty == 30) {
					var txt = ' //@' + twitterObj.getNickname(tid) + ' ：'
							+ twitterObj.getContent(tid);
					ty = 28;
				} else {
					var tmp_name = twitterObj.getNickname(tid);
					if (tmp_name != '') {
						var txt = '[小红心]';
					} else {
						var txt = '[小红心]';
						twitterObj.attrIndex = 1;
					}
				}
				alertDiv.author = "from_me_tt";
				alertDiv.stid = tid;
				alertDiv.partuid = '';
				alertDiv.auid = "from_me_tt";
				alertDiv.type = 10000;
			} catch (err) {
				var mesg = 'mesg:' + err.message + '.';
				mesg += "\n File:" + err.fileName + ".";
				mesg += "\n Line:" + err.lineNumber + ".";
				mesg += "\n Stack:" + err.stack + ".";
				mesg += "\n Name:" + err.name + ".";
			}
			twitterToolsObj.showT = '#show_' + ty + '_' + tid;
			$.getJSON(twitterToolsObj.likeUrl, {
						tvd : tid,
						tvy : ty,
						gid : gid
					}, function(json) {
						var c = window.setTimeout(function() {
							twitterToolsObj.setNum(key, tid, ty, json['num'],
									json['type'], json['a_id'], page, gid, txt);
						}, 100);
					});
		}
	},
	addLikeComment : function(tid, uid) {
		twitterToolsObj.isAddComment = true;
		show_alert('submit_apply_innnertest_like', 'confirm_bg_box');
		var textId = "#submit_apply_innnertest_like_txt";
		var txt = '';
		$(textId).val(txt).focus();
		setCursor($(textId).get(0), 0, 0);
		alertDiv.author = uid;
		alertDiv.stid = tid;
		alertDiv.type = 3;
		alertDiv.auid = uid;
	},
	moveLikeIt : function(tid, box, nlclass, lclass) {
		var callback = function(json) {
			var $likeId = $('.l' + box);
			var likeArray = new Array();
			if ($likeId.length > 0) {
				likeArray.push($likeId);
			} else {
				$likeId = $('#l' + box);
				if ($likeId.length > 0)
					likeArray.push($likeId);
			}
			$likeId = $('#l' + box + 'l');
			if ($likeId.length > 0) {
				likeArray.push($likeId);
			}
			for (var i = 0; i < likeArray.length; i++) {
				likeArray[i].removeClass(lclass).addClass(nlclass);
				var $nums = likeArray[i].find('.nums');
				var likenum = $nums.html().trim();
				if (likenum == '') {
					likenum = 0;
				} else {
					likenum = parseInt(likenum);
				}
				likenum -= 1;
				if (likenum == 0) {
					$nums.html('');
				} else {
					$nums.html(likenum);
				}
			}
			$(".pop_face").remove();
			$(".pop_heart").remove();
			$(".pop_heartd").remove();
			twitterToolsObj.likeInProcess = false;
		};
		$.getJSON(twitterToolsObj.likeUrl, {
					tvd : tid,
					tvy : 1
				}, callback);
	},
	isAddComment : false,
	likeInProcess : false,
	bookLikeIt : function(tid, gid, uid, box, nlclass, lclass, $this) {
		if (twitterToolsObj.likeInProcess && uid > 0) {
			return false;
		}
		twitterToolsObj.likeInProcess = true;
		twitterToolsObj.isAddComment = false;
		if (current_user_id == 0 || current_user_id == '') {
			twitterToolsObj.likeInProcess = false;
			showLoginWin();
			return false;
		} else if (Meilishuo.config.is_actived == 2) {
			location.href = server_url + 'users/activate_message';
			return false;
		}
		var callback = function(json) {
		};
		if ($this.attr('class').indexOf('notlikeit') >= 0
				|| $this.attr('class').indexOf('notlike_it') >= 0
				|| $this.attr('class').indexOf('notloveit') >= 0) {
			var this_father = $this.closest('.pop_comm');
			if (!this_father.html()) {
				this_father = $this.closest('.comm');
			}
			if (jQuery.browser.msie) {
				this_father
						.html('<div class="pop_face"></div><a href="javascript:void(0)" '
								+ 'onclick="twitterToolsObj.addLikeComment('
								+ tid
								+ ','
								+ uid
								+ ');" class="pop_heart c ured cursor">'
								+ '<em class="ured left f12 l22 cursor" >给个评论吧~</em><em class="pop_qin left"></em></a>'
								+ this_father.html());
			} else {
				this_father
						.html('<div class="pop_face"></div><div class="pop_heart c ured">'
								+ '<a class="left f12" href="javascript:void(0)" onclick="twitterToolsObj.addLikeComment('
								+ tid
								+ ','
								+ uid
								+ ');">'
								+ '给个评论吧~</a><em class="pop_qin left"></em></div>'
								+ this_father.html());
			}
			var pop_face = this_father.find(".pop_face");
			var pop_heart = this_father.find(".pop_heart");
			var position = this_father.position();
			pop_face.css({
						'position' : 'absolute',
						'top' : position.top - pop_face.height() * 0.8 + 'px',
						'left' : position.left + 'px',
						"z-index" : "9999"
					});
			pop_heart.css({
						'position' : 'absolute',
						'top' : position.top - pop_face.height() * 1.5
								- pop_heart.height() + 'px',
						'left' : position.left + pop_face.width() / 4 + 'px',
						"z-index" : "9999"
					});
			pop_face.fadeIn(200, function() {
						if (jQuery.browser.msie)
							pop_face.get(0).style.removeAttribute('filter');
						pop_heart.fadeIn(function() {
									if (jQuery.browser.msie)
										pop_heart.get(0).style
												.removeAttribute('filter');
								});
					});
			var dpTime = setTimeout(function() {
						pop_face.remove();
						pop_heart.remove();
						twitterToolsObj.likeInProcess = false;
					}, 3000);
			pop_heart.unbind('mouseenter').unbind('mouseleave').bind(
					'mouseenter', function(dpTime) {
						clearTimeout(dpTime);
					}).bind('mouseleave', function(pop_face, pop_heart) {
						$(this).remove();
						$(this).siblings('.pop_face').remove();
						twitterToolsObj.likeInProcess = false;
					});
			$.getJSON(twitterToolsObj.likeUrl, {
						tvd : tid,
						tvy : 1
					}, callback);
			var $likeId = $('.l' + box);
			var likeArray = new Array();
			if ($likeId.length > 0) {
				likeArray.push($likeId);
			} else {
				$likeId = $('#l' + box);
				if ($likeId.length > 0)
					likeArray.push($likeId);
			}
			$likeId = $('#l' + box + 'l');
			if ($likeId.length > 0) {
				likeArray.push($likeId);
			}
			for (var i = 0; i < likeArray.length; i++) {
				likeArray[i].removeClass(nlclass).addClass(lclass);
				var $nums = likeArray[i].find('.nums');
				var likenum = $nums.html().trim();
				if (likenum == '') {
					likenum = 0;
				} else {
					likenum = parseInt(likenum);
				}
				likenum += 1;
				$nums.html(likenum);
			}
			setTimeout(function() {
						alertDiv.author = uid;
						alertDiv.stid = tid;
						alertDiv.type = 3;
						alertDiv.auid = uid;
						if (twitterToolsObj.isAddComment == false)
							twitterToolsObj.sentForward(tid);
					}, 5000);
		} else {
			var this_father = $this.closest('.comm');
			if (!this_father.html()) {
				this_father = $this.closest('.pop_comm');
			}
			if (jQuery.browser.msie) {
				this_father
						.html('<div class="pop_face"></div><a href="javascript:void(0)" onclick="twitterToolsObj.moveLikeIt('
								+ tid
								+ ','
								+ box
								+ ',\''
								+ nlclass
								+ '\',\''
								+ lclass
								+ '\');" class="pop_heartd c cursor"><em class="pop_qin pop_qind left"></em><em class="red pop_liked f12">喜欢过了</em></br><em class="pop_det left f12 cursor" >删除</em></a>'
								+ this_father.html());
			} else {
				this_father
						.html('<div class="pop_face"></div><div class="pop_heartd c"><em class="pop_qin pop_qind left"></em><em class="red pop_liked f12">喜欢过了</em></br><a class="pop_det left f12" href="javascript:void(0)" onclick="twitterToolsObj.moveLikeIt('
								+ tid
								+ ','
								+ box
								+ ',\''
								+ nlclass
								+ '\',\''
								+ lclass
								+ '\');">删除</a></div>'
								+ this_father.html());
			}
			var $pop_face = this_father.find('.pop_face');
			var $pop_heartd = this_father.find('.pop_heartd');
			var position = this_father.position();
			$pop_face.css({
						'position' : 'absolute',
						'top' : position.top - $pop_face.height() * 0.8 + 'px',
						'left' : position.left + 'px'
					});
			$pop_heartd.css({
						'position' : 'absolute',
						'top' : position.top - $pop_face.height() * 1.5
								- $pop_heartd.height() + 'px',
						'left' : position.left + $pop_face.width() / 4 + 'px'
					});
			$pop_face.fadeIn(200, function() {
						if (jQuery.browser.msie)
							$pop_face.get(0).style.removeAttribute('filter');
						$pop_heartd.fadeIn(function() {
									if (jQuery.browser.msie)
										$pop_heartd.get(0).style
												.removeAttribute('filter');
								});
					});
			setTimeout(function() {
						$pop_face.remove();
						$pop_heartd.remove();
						twitterToolsObj.likeInProcess = false;
					}, 2000);
		}
	},
	likePopup : function(cur) {
		$('#like-popup').remove();
		var position = cur.offset();
		cur
				.parents('.goods_con')
				.prepend('<div id="like-popup" class="pop_w"><div class="remind"><a class="close cursor r" onclick="javascript:$(\'#like-popup\').remove();"></a>马上<a class="red" href="javascript:void(0);" onclick="twitterToolsObj.bookLikeIt(0, 0, 0, 0);return false;">登录</a>或<a class="red" href="'
						+ server_url
						+ 'users/register/aa74158f1933b65e23e61bf99d8157f5">注册</a></div><div class="remind">让美丽说永远记住你的喜好</div></div>');
		$('#like-popup').css({
			'position' : 'absolute',
			'top' : position.top - $('#like-popup').height() - cur.height()
					/ 1.5 + 'px',
			'left' : position.left - cur.width() / 1.5 + 'px'
		});
	},
	setNum : function(key, tid, ty, num, cy, a_id, page, gid, txt) {
		$('#show_' + tid).hide('slow');
		if (num > 0) {
			var strNum = '(' + num + ') ';
		} else {
			var strNum = ' ';
		}
		var textId = "";
		if (ty == 1) {
			textId = "submit_apply_innnertest_like_txt";
		}
		if (a_id == current_user_id && tid <= GOODS_T_DEPART && !txt) {
			var txt = '  //@' + twitterObj.getNickname(tid) + ' ：'
					+ twitterObj.getContent(tid);
		}
		if (tid >= GOODS_T_DEPART) {
			var txt = '这个宝贝不错，推荐给大家！';
		}
		if (ty == 4) {
			var str = '支持' + strNum;
			$(key).html(str).attr(
					'onClick',
					'twitterToolsObj.likeIt(' + tid + ',' + ty + ',' + '"",'
							+ '""' + ');');
			this.changeFace(tid, ty, "", 0);
			this.changeTxt(tid, num);
			var icons = '#z_icons_' + tid;
			if (cy == 2) {
				var file = 'zh.gif';
			} else {
				var file = 'zh1.gif';
			}
			var t = $(icons).attr('src');
			var h = $(icons).html();
			$(icons).attr('src', '/css/icons/' + file);
		} else {
			$("#" + textId).val(txt).focus();
			if (ty == 1) {
				if (twitterObj.attrIndex == 1) {
					if (cy == 2) {
						$('.st' + tid + ' .click_wanttobuy')
								.html('<img src="http://www.meilishuo.com/css/images/twitter_tools/I_loveit.gif" style="position: relative; top: 1px; right: 2px;"/>我喜欢'
										+ strNum);
						show_alert('submit_apply_innnertest_like',
								'confirm_bg_box');
					} else {
						$('.st' + tid + ' .click_wanttobuy')
								.html('<img src="http://www.meilishuo.com/css/images/twitter_tools/I_like.gif" style="position: relative; top: 1px; right: 2px;"/>我喜欢'
										+ strNum);
						show_alert('submit_apply_innnertest_like_del',
								'confirm_bg_box');
					}
				} else {
					if (cy == 2) {
						$('.st' + tid + ' .click_wanttobuy')
								.html('<span><img src="http://www.meilishuo.com/css/images/twitter_tools/I_loveit.gif"/></span><span style="margin-left:4px;">我喜欢'
										+ strNum + '</span>');
						show_alert('submit_apply_innnertest_like',
								'confirm_bg_box');
					} else {
						$('.st' + tid + ' .click_wanttobuy')
								.html('<span><img src="http://www.meilishuo.com/css/images/twitter_tools/I_like.gif"/></span><span style="margin-left:4px;">我喜欢'
										+ strNum + '</span>');
						show_alert('submit_apply_innnertest_like_del',
								'confirm_bg_box');
					}
				}
			}
		}
	},
	changeFace : function(tid, ty, page, gid) {
		if (ty == 4) {
			twitterToolsObj.faceT = '#vote_face_' + tid;
		} else {
			twitterToolsObj.faceT = '#t' + tid + ' .interest_list';
		}
		$.get(twitterToolsObj.userFaceUrl, {
					tvd : tid,
					type : ty,
					'page' : page,
					gid : gid
				}, function(back) {
					if (back.length > 0) {
						$(twitterToolsObj.faceT).show().html(back);
					} else {
						$(twitterToolsObj.faceT).hide();
					}
				});
	},
	changeTxt_like : function(tid, num) {
		var vote_like = '#vote_like' + tid;
		$get(server_url + 'askPage/ajax_outTlike/', {
					tvd : tid
				}, function(back) {
					$(vote_like).html(back);
				});
	},
	changeTxt : function(tid, num) {
		twitterToolsObj.faceC = '#txt_' + tid;
		if (num > 0) {
			var StringTxt = "他们支持这个回答";
			$.get(twitterToolsObj.userTxtUrl, {
						tvd : StringTxt
					}, function(back) {
						if (back.length > 0) {
							$(twitterToolsObj.faceC).show().html(back);
						} else {
							$(twitterToolsObj.faceC).hide();
						}
					});
		} else {
			var StringTxt = "";
			$.get(twitterToolsObj.userTxtUrl, {
						tvd : StringTxt
					}, function(back) {
						if (back.length > 0) {
							$(twitterToolsObj.faceC).show().html(back);
						} else {
							$(twitterToolsObj.faceC).hide();
						}
					});
		}
	},
	showEditType : function(tid, sender, tagsStr, picType) {
		sender = $(sender);
		var goodsTag = sender.closest('.goodsTag');
		var editPanel = goodsTag.find('.edit_panel');
		if (editPanel.length == 0) {
			editPanel = $("<div class='edit_panel'>"
					+ "<div class='arrow'></div>"
					+ "<span class='title'>请选择要修改的图片类别：</span>"
					+ "<span class='twitter_pic_type' val='1'>我的装扮</span><span class='twitter_pic_type' val='2'>汇报宝贝</span><span class='twitter_pic_type' val='3'>街拍</span><span class='twitter_pic_type' val='0'>其他</span>"
					+ "<span class='title'>图片关键词：</span>"
					+ "<input type='text' class='keywords' maxlength='50' /><input type='button' class='edit_btn' />"
					+ "</div>").hide();
			initPicTypeCheckbox(editPanel);
			var picTypeObj = editPanel.find('.twitter_pic_type[val="' + picType
					+ '"]');
			if (picTypeObj.length > 0) {
				picTypeObj.addClass('twitter_pic_type_checked');
			}
			var marginLeft = sender.position().left + 15;
			if (marginLeft > 280) {
				var eMarginLeft = marginLeft - 305 + 30;
				editPanel.css('margin-left', eMarginLeft);
				marginLeft = 280;
			}
			editPanel.find('.arrow').css('margin-left', marginLeft);
			editPanel.find('.keywords').val(tagsStr);
			editPanel.find('.edit_btn').click(function() {
						twitterToolsObj.editTypeClick(tid, editPanel)
					});
			goodsTag.append(editPanel);
		}
		if (editPanel.css('display') == 'none') {
			editPanel.show();
		} else {
			editPanel.hide();
		}
	},
	editTypeClick : function(tid, editPanel) {
		var picTypeObj = editPanel.find('.twitter_pic_type_checked');
		if (picTypeObj.length != 1) {
			alert('请选择一个分类');
			return false;
		}
		var picType = picTypeObj.attr('val');
		var keywords = editPanel.find('.keywords').val();
		editPanel.closest('.goodsTag').load(this.updatePicTypeUrl, {
					tid : tid,
					ptype : picType,
					tag : keywords
				});
		editPanel.remove();
	},
	shareToWeiboPoster : function(tid, content, src) {
		var reply = '[爱你]我刚在@美丽说 发现了【' + content
				+ '】你们感觉怎么样！链接是>> http://meilishuo.com/p/' + tid
				+ '?frm=shareweibo';
		var imgsrc = src;
		javascript : void((function(s, d, e) {
			try {
			} catch (e) {
			}
			var f = 'http://v.t.sina.com.cn/share/share.php?', u = '', p = [
					'url=', e(u), '&title=', e(reply),
					'&ralateUid=1718455577&appkey=463778370'].join('');
			if (imgsrc !== false) {
				p += '&pic=' + imgsrc;
			}
			function a() {
				if (!window
						.open(
								[f, p].join(''),
								'mb',
								[
										'toolbar=0,status=0,resizable=1,width=620,height=450,left=',
										(s.width - 620) / 2, ',top=',
										(s.height - 450) / 2].join(''))) {
					u.href = [f, p].join('');
				}
			};
			if (/Firefox/.test(navigator.userAgent)) {
				setTimeout(a, 0);
			} else {
				a();
			}
		})(screen, document, encodeURIComponent));
	},
	shareToWeibo : function(tid, gid) {
		$('body')
				.append('<img width="0" height="0" src="/share/shareweibo_btn" />');
		var reply = this.getWeiboString(tid, gid);
		var imgsrc = twitterObj.getImageSrc(tid);
		var url = gid > 0
				? 'http://wap.meilishuo.com/group/' + gid
				: 'http://wap.meilishuo.com/p/' + tid;
		javascript : void((function(s, d, e) {
			try {
			} catch (e) {
			}
			var f = 'http://v.t.sina.com.cn/share/share.php?', u = '', p = [
					'url=' + e(url + '?frm=huiliu_shareweibo'), e(u),
					'&title=', e(reply),
					'&ralateUid=1718455577&appkey=463778370'].join('');
			if (imgsrc !== false) {
				p += '&pic=' + e(imgsrc);
			}
			function a() {
				if (!window
						.open(
								[f, p].join(''),
								'mb',
								[
										'toolbar=0,status=0,resizable=1,width=620,height=450,left=',
										(s.width - 620) / 2, ',top=',
										(s.height - 450) / 2].join(''))) {
					u.href = [f, p].join('');
				}
			};
			if (/Firefox/.test(navigator.userAgent)) {
				setTimeout(a, 0);
			} else {
				a();
			}
		})(screen, document, encodeURIComponent));
	},
	shareToRenren : function(tid, group_id) {
		var reply = this.getWeiboString(tid, group_id);
		var group_name = $(".to_group_name").val();
		var twittertitle = group_name
				? ">>分享自美丽说杂志《" + group_name + "》+加关注"
				: '';
		$('body')
				.append('<img width="0" height="0" src="/share/sharerenren_btn" />');
		if (tid == 0) {
			var url = twitterToolsObj.url;
		} else {
			var imgsrc = twitterObj.getImageSrc(tid);
			var url = 'http://wap.meilishuo.com/share/' + tid
					+ '?frm=huiliu_sharerenren';
		}
		javascript : void((function(s, d, e) {
			var f = 'http://www.connect.renren.com/sharer.do?', p = ['url=',
					e(url), '&title=', e(twittertitle), '&content=', e(reply)]
					.join('');
			if (imgsrc !== false) {
				p += '&pic=' + e(imgsrc);
			}
			var to_url = [f, p].join('');
			function a() {
				if (!window
						.open(
								to_url,
								'mb',
								[
										'toolbar=0,status=0,resizable=1,width=620,height=450,left=',
										(s.width - 620) / 2, ',top=',
										(s.height - 450) / 2].join(''))) {
					u.href = [f, p].join('');
				}
			};
			if (/Firefox/.test(navigator.userAgent)) {
				setTimeout(a, 0);
			} else {
				a();
			}
		})(screen, document, encodeURIComponent));
	},
	shareToWangyi : function(tid) {
		var reply = '[心][心][心]我觉得这件很好看！大家说我要不要买呢？：'
				+ '- http://meilishuo.com/p/' + tid + '?frm=share&personuid='
				+ current_user_id;
		var imgsrc = twitterObj.getImageSrc(tid);
		javascript : void((function(s, d, e) {
			try {
			} catch (e) {
			}
			var p = [], ustr = [];
			p[0] = 'link=http://www.meilishuo.com/';
			p[1] = 'source=' + encodeURIComponent('美丽说');
			p[2] = 'info=' + reply;
			p[3] = 'images=' + imgsrc;
			p[4] = 'togImg=true';
			var f = 'http://t.163.com/article/user/checkLogin.do?';
			f += p.join("&");
			function a() {
				if (!window
						.open(
								[f, p].join(''),
								'mb',
								[
										'toolbar=0,status=0,resizable=1,width=620,height=450,left=',
										(s.width - 620) / 2, ',top=',
										(s.height - 450) / 2].join(''))) {
					u.href = [f, p].join('');
				}
			};
			if (/Firefox/.test(navigator.userAgent)) {
				setTimeout(a, 0);
			} else {
				a();
			}
		})(screen, document, encodeURIComponent));
	},
	shareToQQ : function(tid, group_id) {
		var reply = this.getWeiboString(tid, group_id);
		var imgsrc = twitterObj.getImageSrc(tid);
		$('body')
				.append('<img width="0" height="0" src="/share/sharetq_btn" />');
		javascript : void((function(s, d, e) {
			try {
			} catch (e) {
			}
			var f = 'http://v.t.qq.com/share/share.php?', u = 'http://wap.meilishuo.com/p/'
					+ tid + '?frm=huiliu_sharetqq', p = ['url=', e(u),
					'&title=', e(reply),
					'&appkey=95fd1cb5bf304d259fdaec43297d8b33'].join('');
			if (imgsrc !== false) {
				p += '&pic=' + imgsrc;
			}
			function a() {
				if (!window
						.open(
								[f, p].join(''),
								'mb',
								[
										'toolbar=0,status=0,resizable=1,width=620,height=450,left=',
										(s.width - 620) / 2, ',top=',
										(s.height - 450) / 2].join(''))) {
					u.href = [f, p].join('');
				}
			};
			if (/Firefox/.test(navigator.userAgent)) {
				setTimeout(a, 0);
			} else {
				a();
			}
		})(screen, document, encodeURIComponent));
	},
	getWeiboString : function(tid, group_id) {
		var goods_title = ($('.goods_title').length > 1) ? $('#t' + tid)
				.find('.goods_title').text().trim() : $(".goods_title").text()
				.trim();
		if ($('.goods_title').length == 0 && $('.quote_goods_title').length > 0)
			goods_title = $('#t' + tid).find('.quote_goods_title').text()
					.trim();
		var content = twitterObj.getContent2(tid).trim();
		var goods_id = $(".goods_id").val();
		var group_name = $(".to_group_name").val();
		if (typeof group_name == 'undefined') {
			group_name = $(".from_group_name").val();
			if (typeof group_name != 'undefined')
				group_name = group_name.trim();
			group_id = $(".from_group_id").val();
		} else {
			group_name = group_name.trim();
		}
		if (goods_id == 0) {
			if (content == '')
				content = '分享一张美图';
			if (typeof group_id == 'undefined'
					|| typeof group_name == 'undefined') {
				var reply = "【美图】" + content;
			} else if (group_id > 0) {
				var reply = "【美图】" + content + "—来自杂志 #" + group_name + "#>>";
			} else {
				var reply = "【美图】" + content;
			}
		} else if (group_id > 0) {
			var reply = '推荐【' + goods_title + '】－来自杂志 #' + group_name + '#>>';
		} else {
			goods_title = goods_title ? '【' + goods_title + '】' : '';
			var reply = '推荐' + goods_title + '－来自 >>';
		}
		return reply;
	},
	shareToQzone : function(tid, group_id) {
		var reply = this.getWeiboString(tid, group_id);
		var group_name = $(".to_group_name").val();
		var twittertitle = group_name
				? ">>分享自美丽说杂志《" + group_name + "》+加关注"
				: ' ';
		var url = 'http://wap.meilishuo.com/p/' + tid
				+ '?frm=huiliu_shareqzone';
		reply += url;
		var imgsrc = twitterObj.getImageSrc(tid);
		$('body')
				.append('<img width="0" height="0" src="/share/shareqzone_btn" />');
		javascript : void((function(s, d, e) {
			try {
			} catch (e) {
			}
			var f = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
			var s = {
				url : url,
				desc : reply,
				summary : '美丽说杂志是爱美丽们的时尚聚集地，无论你是哪种女孩儿，无论你有什么小癖好，在美丽说杂志，你都能正确归队。和你的喜好尽情的拥抱吧，和姐妹们痛快的分享吧~',
				title : twittertitle,
				site : '美丽说',
				pics : imgsrc
			};
			var p = [];
			for (var i in s) {
				p.push(i + '=' + e(s[i] || ''));
			}
			function a() {
				if (!window
						.open(
								[f, p.join('&')].join(''),
								'mb',
								[
										'toolbar=0,status=0,resizable=1,width=620,height=450,left=',
										(s.width - 620) / 2, ',top=',
										(s.height - 450) / 2].join(''))) {
					u.href = [f, p.join('&')].join('');
				}
			};
			if (/Firefox/.test(navigator.userAgent)) {
				setTimeout(a, 0);
			} else {
				a();
			}
		})(screen, document, encodeURIComponent));
	},
	showSharePanel : function(tid, sender) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
		} else {
			var p = $('#share_with_friends' + tid);
			var offset = $(sender).offset();
			if (p.length > 0) {
				p.css({
							'left' : offset.left - 10,
							'top' : offset.top + 13
						}).show();
				p.hover(function() {
							p.show();
						}, function() {
							p.hide();
						})
			} else {
				p.appendTo('body').css({
							'left' : offset.left - 10,
							'top' : offset.top + 13
						}).show();
				p.hover(function() {
							p.show();
						}, function() {
							p.hide();
						})
			}
		}
	},
	shareWeibo : function(tid, uid) {
		if (uid == current_user_id) {
			reply = '见证我的美丽时刻，怎能没有你们！！我参加了美丽说竞选街拍女王比赛，这是我的参赛街拍，去美丽说点击“喜欢”投我一票吧! http://www.meilishuo.com/share/'
					+ tid + '用新浪微博可以直接登录哦！哪怕你帮忙转发一条微博，也是对我莫大的鼓励和支持！！';
		} else {
			reply = '见证她的美丽时刻，怎能没有你们！！我的朋友参加了美丽说竞选街拍女王比赛，这是她的参赛街拍，去美丽说点击“喜欢”投她一票吧!http://www.meilishuo.com/share/'
					+ tid + '用新浪微博可以直接登录哦！哪怕你帮忙转发一条微博，也是对我莫大的鼓励和支持！！';
		}
		var imgsrc = twitterObj.getImageSrc(tid);
		javascript : void((function(s, d, e) {
			try {
			} catch (e) {
			}
			var f = 'http://v.t.sina.com.cn/share/share.php?', u = '', p = [
					'url=', e(u), '&title=', e(reply), '&appkey=463778370']
					.join('');
			if (imgsrc !== false) {
				p += '&pic=' + imgsrc;
			}
			function a() {
				if (!window
						.open(
								[f, p].join(''),
								'mb',
								[
										'toolbar=0,status=0,resizable=1,width=620,height=450,left=',
										(s.width - 620) / 2, ',top=',
										(s.height - 450) / 2].join(''))) {
					u.href = [f, p].join('');
				}
			};
			if (/Firefox/.test(navigator.userAgent)) {
				setTimeout(a, 0);
			} else {
				a();
			}
		})(screen, document, encodeURIComponent));
		$.get(server_url + 'share/ajax_shareToWeibo/' + tid);
	},
	hideSharePanel : function(tid) {
		var p = $('#share_with_friends' + tid);
		p.hide();
	}
};
$(function() {
			$('.ex_mutualfollow').mouseover(function() {
						$(this).text('取消关注');
					}).mouseout(function() {
						$(this).text('互相关注');
					});
			$('span.new_notfollow').mouseover(function() {
						$(this).text('取消关注');
					}).mouseout(function() {
						$(this).text('已关注');
					});
		});
var friendsObj = {
	addUrl : server_url + 'twitter/ajax_addFollower',
	moveUrl : server_url + 'twitter/ajax_moveFollower',
	showUrl : server_url + 'twitter/ajax_showFollower',
	addRecommUrl : server_url + 'twitter/ajax_addRecommFollower',
	recommenderUrl : server_url + 'sideBar/ajax_getRecommender',
	page : '',
	isNew : 0,
	getFriendList : function() {
		$("#sidebar").load(friendsObj.showUrl);
	},
	addFsFollower : function(uid) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		$.get(friendsObj.addUrl, {
					fuid : uid
				}, function(mesg) {
					if (mesg == 1) {
						showForbiddenWindow();
						return false;
					}
					$('#f' + uid + ' .findfs-followbutton')
							.removeClass('findfs-followbutton')
							.addClass('findfs-topic-follower')
							.removeAttr('onclick')
							.unbind('click')
							.html('已关注，<a href="javascript:;" onclick="return friendsObj.removeFsFollower('
									+ uid + ');">取消</a>');
				});
	},
	removeFsFollower : function(uid) {
		$.get(friendsObj.moveUrl, {
					fuid : uid
				}, function(mesg) {
					if (mesg == 1) {
						showForbiddenWindow();
						return false;
					}
					$('#f' + uid + ' .findfs-topic-follower')
							.removeClass('findfs-topic-follower')
							.addClass('findfs-followbutton').html('')
							.removeAttr('onclick').unbind('click').click(
									function() {
										return friendsObj.addFsFollower(uid);
									});
				});
	},
	addFsFollower1 : function(uid) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		$.get(friendsObj.addUrl, {
					fuid : uid
				}, function(mesg) {
					if (mesg == 1) {
						showForbiddenWindow();
						return false;
					}
					$('#f' + uid + ' .findfs-followbutton')
							.removeClass('findfs-followbutton')
							.addClass('findfs-topic-follower')
							.removeAttr('onclick')
							.unbind('click')
							.html('已关注，<a href="javascript:;" onclick="return friendsObj.removeFsFollower1('
									+ uid + ');">取消</a>');
				});
	},
	removeFsFollower1 : function(uid) {
		$.get(friendsObj.moveUrl, {
					fuid : uid
				}, function(mesg) {
					if (mesg == 1) {
						showForbiddenWindow();
						return false;
					}
					$('#f' + uid + ' .findfs-topic-follower')
							.removeClass('findfs-topic-follower')
							.html('')
							.addClass('findfs-followbutton')
							.css('background', 'none')
							.removeAttr('onclick')
							.unbind('click')
							.html('<a href="javascript:;" onclick="return friendsObj.addFsFollower1('
									+ uid + ');">+关注她</a>');
				});
	},
	addFollowerPerson : function(uid, e) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		if (location.href.indexOf('/person/') != -1)
			recommendPerson();
		$('#f' + uid + ' .follow span').unbind('click');
		$('#f' + uid + ' .p-fdesc').hide();
		if (e == 'wlcgoods' || e == 'bottom') {
			$('#f' + uid).unbind('click').removeClass('red')
					.removeClass('i_plus').addClass('gray').html('已关注');
		}
		var url = friendsObj.addUrl;
		if ($('#popwindowfollow' + uid).length > 0) {
			url = url + "?frm=m_follow";
		} else if (e == 'bottom') {
			url = url + "?frm=p_follow";
		}
		$.get(url, {
					fuid : uid
				});
		window.setTimeout(function(mesg) {
					if (!friendsObj.isNew) {
						$('#f' + uid + ' .follow span').attr('onclick', '')
								.bind('click', function() {
											friendsObj.removeFromUrNew(uid);
										}).removeClass('new_follow')
								.addClass('new_notfollow').html('已关注')
								.mouseover(function() {
											$(this).text('取消关注');
										}).mouseout(function() {
											$(this).text('已关注');
										});
					} else if (e == 'daren') {
						$('#f' + uid + ' .follow span').attr('onclick', '')
								.bind('click', function() {
											friendsObj.removeFromUrNew(uid,
													'daren');
										}).removeClass('new_follow')
								.addClass('new_notfollow').html('已关注')
								.mouseover(function() {
											$(this).text('取消关注');
										}).mouseout(function() {
											$(this).text('已关注');
										});
					} else if (e == 'bottom') {
						$('.btm-flw .new_follow').attr('onclick', '').bind(
								'click', function() {
									friendsObj.removeFromUrNew(uid, 'bottom');
								}).removeClass('new_follow')
								.addClass('new_notfollow').html('已关注')
								.mouseover(function() {
											$(this).text('取消关注');
										}).mouseout(function() {
											$(this).text('已关注');
										});
					}
					if (friendsObj.isNew) {
						$('#f' + uid + ' .follow span.ex_follow').attr(
								'onclick', '').bind('click', function() {
									friendsObj.removeFromUrNew(uid);
								}).removeClass('ex_follow')
								.addClass('ex_notfollow').html('已关注')
								.mouseover(function() {
											$(this).text('取消关注');
										}).mouseout(function() {
											$(this).text('已关注');
										});
					}
					if (e == 'popup') {
						$('.header_follow .new_follow').attr('onclick', '')
								.bind('click', function() {
											friendsObj.removeFromUrNew(uid,
													'popup');
										}).removeClass('new_follow')
								.addClass('new_notfollow').html('已关注');
						return false;
					}
					if (e != 'bottom') {
						$('.btm-flw').hide();
					}
				}, 1000);
		return false;
	},
	removeFromUrNew : function(uid, e) {
		if ($('.person_r').length > 0)
			$('.person_r').remove();
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		$('#f' + uid + ' .follow span').unbind('click');
		$.ajax({
					type : "GET",
					url : friendsObj.moveUrl,
					data : {
						fuid : uid
					}
				});
		window.setTimeout(function(mesg) {
					if (!friendsObj.isNew) {
						$('#f' + uid + ' .follow span').attr('onclick', '')
								.bind('click', function() {
											friendsObj.addFollowerPerson(uid,
													$(this));
										}).removeClass('new_notfollow')
								.addClass('new_follow').html('＋加关注')
								.unbind('mouseover').unbind('mouseout');
					} else if (e == 'daren') {
						$('#f' + uid + ' .follow span').attr('onclick', '')
								.bind('click', function() {
											friendsObj.addFollowerPerson(uid,
													'daren');
										}).removeClass('new_notfollow')
								.addClass('new_follow').html('＋加关注')
								.unbind('mouseover').unbind('mouseout');
					} else if (e == 'bottom') {
						$('.btm-flw .new_notfollow')
								.attr('onclick', '')
								.bind('click', function() {
									friendsObj.addFollowerPerson(uid, 'bottom');
								}).removeClass('new_notfollow')
								.addClass('new_follow').html('＋加关注')
								.unbind('mouseover').unbind('mouseout');
					}
					if (e == 'popup') {
						$('.header_follow .new_notfollow').attr('onclick', '')
								.bind('click', function() {
											friendsObj.addFollowerPerson(uid,
													'popup');
										}).removeClass('new_notfollow')
								.addClass('new_follow').html('＋加关注')
								.unbind('mouseover').unbind('mouseout');
						return false;
					}
					if (friendsObj.isNew) {
						$('#f' + uid + ' .follow span.ex_notfollow').attr(
								'onclick', '').bind('click', function() {
									friendsObj.addFollowerPerson(uid, $(this));
								}).removeClass('ex_notfollow')
								.addClass('ex_follow').html('＋加关注')
								.unbind('mouseover').unbind('mouseout');
					}
				}, 1000);
		return false;
	},
	removeFromUr : function(uid) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		$.ajax({
					async : false,
					type : "GET",
					url : friendsObj.moveUrl,
					data : {
						fuid : uid
					},
					success : function(mesg) {
						window.location.reload();
					}
				});
	},
	addFromUr : function(uid) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		$.get(friendsObj.addUrl, {
					fuid : uid
				}, function(mesg) {
					if (mesg == 1) {
						showForbiddenWindow();
						return false;
					}
					friendsObj.getFriendList();
					if ($('#self_user_follower_b').html() != null) {
						$('#self_user_follower_b')
								.html('已关注<a href="javascript:;" onclick="return friendsObj.removeFromUr('
										+ uid + ');">取消</a>');
					}
					if ($('#doyen_follow_status_' + uid).html() != null
							&& $('#doyen_unfollow_status_' + uid).html() != null) {
						$('#doyen_follow_status_' + uid).attr("class", "left");
						$('#doyen_follow_status_' + uid).hide();
						$('#doyen_unfollow_status_' + uid).show();
					}
				});
	},
	daka : function() {
		$.get(server_url + '/home/ajax_daka', {}, function() {
					$('#daka').removeClass('daka').unbind('click')
							.removeAttr('onclick').addClass('dakafinish')
							.html('&nbsp;&nbsp;&nbsp;已签到');
					twitterListObj.getTwitterList(1);
				});
	},
	addFollower : function(uid, type) {
		this.addFromUr(uid);
		var fun = 'return friendsObj.removeFollower(' + uid + ',"' + type
				+ '");';
		var divKey = '#user_action_' + uid;
		if (type == 'me') {
			$(divKey).attr('class', 'new_notfollow mt10');
			$(divKey).removeAttr('onclick').html('已关注');
			if ($.browser.msie) {
				$(divKey).attr('onclick', fun);
			} else {
				$(divKey).attr('onClick', fun);
			}
			if (this.page == 'user_id') {
				var each = '.each_' + uid;
				$(each).show();
			}
		} else {
			$(divKey).attr('class', 'new_notfollow mt10');
			$(divKey).removeAttr('onclick').html('已关注');
		}
	},
	removeFollower : function(uid, type, page) {
		this.removeFromUr(uid);
		if (this.page == 'follower_id') {
			window.location = window.location.href;
			return false;
		} else {
			var divKey = '#user_action_' + uid;
			$(divKey).attr('class', 'new_follow mt10');
			$(divKey).html('+加关注');
			var fun = 'return friendsObj.addFollower(' + uid + ',"' + type
					+ '");';
			if ($.browser.msie) {
				$(divKey).attr('onclick', fun);
			} else {
				$(divKey).attr('onClick', fun);
			}
			var each = '.each_' + uid;
			$(each).hide();
		}
	},
	Feedback_add_meiliUr : function(uid) {
		$.get(friendsObj.addUrl, {
					fuid : uid
				}, function(mesg) {
					friendsObj.getFriendList();
				});
		$('#feedback_right_add_friend').hide();
		$('#feedback_right_have_add_friend').show();
	},
	main : function() {
		$(".follow_user_action_lock").hover(function() {
					$(this).css('background-color', '#CCCCCC');
				}, function() {
					$(this).css('background-color', '')
				});
		$(".follow_user_action_fire").hover(function() {
					$(this).css('background-color', '#CCCCCC');
				}, function() {
					$(this).css('background-color', '')
				});
	},
	getRecommenders : function() {
		$.post(friendsObj.recommenderUrl, function(html) {
					$('#recommenders_box').html('');
					$('#recommenders_box').html(html).show();
				});
	},
	isLoginOrNot : function() {
		showLoginWin();
		return false;
	},
	addFollowPersonUnion : function(uid) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		$('.folo' + uid).click(function() {
			var styleNumber = $(this).attr('followsty');
			switch (styleNumber) {
				case '1' :
					$(this).find('.new_follow').addClass('new_notfollow')
							.removeClass('new_follow').html('已关注').attr(
									"onclick", '').unbind('click').bind(
									'click', function() {
										friendsObj.removeFollowPersonUnion(uid);
									}).mouseover(function() {
										$(this).text('取消关注');
									}).mouseout(function() {
										$(this).text('已关注');
									});
					break;
				case '2' :
					break;
				default :
			};
		});
		$.get(friendsObj.addUrl, {
					fuid : uid
				}, function(mesg) {
					if (mesg == 1) {
						showForbiddenWindow();
						return false;
					}
				});
		return false;
	},
	removeFollowPersonUnion : function(uid) {
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		$('.folo' + uid).click(function() {
			var styleNumber = $(this).attr('followsty');
			switch (styleNumber) {
				case '1' :
					$(this).find('.new_notfollow').addClass('new_follow')
							.removeClass('new_notfollow').html('＋加关注').attr(
									"onclick", '').unbind('click').bind(
									'click', function() {
										friendsObj.addFollowPersonUnion(uid);
									}).unbind('mouseover').unbind('mouseout');
					break;
				case '2' :
					break;
				default :
			};
		});
		$.get(friendsObj.moveUrl, {
					fuid : uid
				}, function(mesg) {
					if (mesg == 1) {
						showForbiddenWindow();
						return false;
					}
				});
		return false;
	}
};
var topicObj = {
	inputTopic : function() {
		var tempStr = $('#twitter_publish_editor').val();
		$('#twitter_publish_editor').val(tempStr + " #在此处插入你的话题# ").focus();
	}
};
var topicTools = {
	addTools : server_url + '/topic/ajax_createCollectMap/',
	moveTools : server_url + '/topic/ajax_moveCollectMap/',
	addCollect : function(topicId) {
		$.get(topicTools.addTools, {
					collectTid : topicId
				}, function(back) {
					$("#twitter_topic_botton").html(back);
					var st = '<a class="fol" onclick="return topicTools.moreCollect('
							+ topicId + '); return false;"></a>';
					$(".sub_title").html(st);
				});
	},
	moreCollect : function(topicId) {
		$.get(topicTools.moveTools, {
					collectTid : topicId
				}, function(back) {
					$("#twitter_topic_botton").html(back);
					var st = '<a class="not_fol" onclick="return topicTools.addCollect('
							+ topicId + '); return false;"></a>';
					$(".sub_title").html(st);
				});
	}
}
function changeUserOnlineStatus() {
	var url = server_url + 'users/ajax_changeOnlineStatus';
	var retValue = "";
	var online_status = $("#online_status").val();
	var data = {
		'online_status' : online_status
	};
	var callback = function(r) {
		retValue = trim(r);
		window.location.reload();
	};
	$.ajax({
				async : false,
				type : "POST",
				url : url,
				data : data,
				success : callback
			});
	return retValue;
}
function cancleNewGuide() {
	$("#new_guide_header").attr('style', "display:none;");
	$("#new_guide").attr('style', "display:none;");
	$("#new_guide_footer").attr('style', "display:none;");
}
function showFirstLetter() {
	$("#twitter_publish_editor").attr(
			"value",
			"#新人报道# Hey，girls，我已经进驻到美丽说了。"
					+ "以后我会在这里和大家来分享我的时尚心得、美丽经验和购物经历，请大家多多关照哦");
}
var item_number = 5;
$(document).ready(function() {
	$("#add_voteitem").click(function() {
		$("#forward_submit_hint").attr("style", "display:none;");
		if (item_number < 10) {
			item_number++;
			var viewpoint_num = "viewpoint_" + item_number;
			var viewpoint_num_v = "viewpoint_" + item_number + "_v";
			var viewpoint_title = "观点" + item_number;
			var viewpoint_content = "";
			var viewpoint_html = "<tr id=\""
					+ viewpoint_num
					+ "\" class=\"viewpoint_tr\"><td class=\"viewpoint_td1\" align=left>"
					+ viewpoint_title + "</td>"
					+ "<td class=\"viewpoint_td2\"><input id=\""
					+ viewpoint_num_v + "\" value=\"" + viewpoint_content
					+ "\"</input><p class=\"left\">编辑输入投票选项</p></td></tr>";
			$("#viewpoint").append(viewpoint_html);
			$("#remove_voteitem").attr("style", "");
		} else {
			alert("最多只能发表10种观点哦！");
		}
	});
	$("#remove_voteitem").click(function() {
				$("#forward_submit_hint").attr("style", "display:none;");
				var viewpoint_num = "#viewpoint_" + item_number;
				if (item_number >= 1) {
					$(viewpoint_num).remove();
					item_number--;
					if (item_number == 0) {
						$("#remove_voteitem").attr("style", "display:none;");
					}
				}
			});
	$("#fold_items").click(function() {
		$("#forward_submit_hint").attr("style", "display:none;");
		var fold_button = $("#fold_button").val();
		if (fold_button == 1) {
			$("#viewpoint").attr("style", "display:none;");
			$("#add_voteitem_butt").attr("style", "display:none;");
			$("#fold_items")
					.html("展开<input type=\"hidden\" id=\"fold_button\" value=\"0\" />");
		} else if (fold_button == 0) {
			$("#viewpoint").attr("style", "");
			$("#add_voteitem_butt").attr("style", "");
			$("#fold_items")
					.html("取消收起<input type=\"hidden\" id=\"fold_button\" value=\"1\" />");
		}
	});
});
function submitGoods() {
	var gTitle = $("#gTitle").val();
	var gUrl = $("#gUrl").val().replace(/(^\s*)|(\s*$)/g, "");
	if (gUrl.length == 0) {
		$("#forward_submit_hint").attr("style", "");
		$("#forward_submit_hint").html("请输入宝贝地址");
		$("#forward_submit_hint").show();
		return false;
	}
	var gPicUrl = $("#gPicUrl").val();
	var gPicID = twitterObj.pictureID;
	var gNote = $("#gNote").val();
	var gSouceType = $("#gSouceType").val();
	var url = server_url + 'goods/ajax_createGoods';
	var option = Array();
	var fold_button = $("#fold_button").val();
	if (fold_button == 1) {
		for (i = 1; i <= item_number; i++) {
			if ($("#viewpoint_" + i + "_v").val() != "") {
				option.push($("#viewpoint_" + i + "_v").val());
			}
		}
	} else {
		option.push("");
	}
	var data = {
		'gTitle' : gTitle,
		'gUrl' : gUrl,
		'gPicUrl' : gPicUrl,
		'catalog_name' : catalog_name,
		'gPicID' : gPicID,
		'gNote' : gNote,
		'gSouceType' : gSouceType,
		'option[]' : option
	};
	var callback = function(r) {
		if (r == "1" || r == "0") {
			$("#forward_submit_hint").attr("style", "");
			$("#forward_submit_hint").html("已成功转贴给关注你的人！");
			$("#forward_submit_hint").show(6000, function() {
						if ($("#showSlipper") == undefined) {
							window.location.href = server_url + "twitter";
						} else {
							setTimeout("$('#showSlipperForm').hide();", 2000);
							setTimeout("$(''#showSlipper').show();", 2000);
							meilishuoClipper.stopCliper();
						}
					});
			return true;
		} else if (r == "-1") {
			$("#forward_submit_hint").attr("style", "");
			$("#forward_submit_hint")
					.html("<font color='red'>你已经提交过该宝贝！</font>");
			return false;
		} else {
			$("#forward_submit_hint").attr("style", "");
			$("#forward_submit_hint").html("提交失败，请重试");
			$("#forward_submit_hint").show();
			return false;
		}
	};
	$.post(url, data, callback);
}
$("#gUrl").blur(function() {
	var gUrl = $("#gUrl").val();
	if (gUrl.length < 1) {
		return false;
	}
	var url = server_url + 'server/ajax_curlGoods';
	var data = {
		'gUrl' : gUrl
	};
	$("#publisher_image_loading1").show();
	$("#twitter_tools_publisher_upImages").hide();
	var callback = function(r) {
		if (r != "0") {
			goodsData = r.split("@_SPLIT_@");
			$("#gTitle").val(goodsData[0]);
			$("#publisher_image_loading1").hide();
			$("#twitter_tools_publisher_upImages").html("<img src=\""
					+ goodsData[1] + "\" style=\"width:300px;\"></img>"
					+ " <input type=\"hidden\" id=\"gPicUrl\" value=\""
					+ goodsData[1] + "\"></input>");
			$("#twitter_tools_publisher_upImages").show();
		} else {
			$("#twitter_tools_publisher_upImages").show();
			$("#publisher_image_loading1").hide("fast");
		}
	};
	$.post(url, data, callback);
});
(function($) {
	$.jPoll = {
		defaults : {
			ajaxOpts : {
				url : "poll.php"
			},
			futID : 2571,
			groupIDs : [266, 265, 264],
			locationID : 00,
			groupViewpoints : ["感觉价格偏贵", "不太好看", "很漂亮"],
			pollHeading : "选出你宝贵的一票吧",
			viewPointsNum : [1, 1, 1],
			pollHint : "投我一票吧",
			rowClass : "out",
			errors : true
		}
	};
	$.fn.extend({
		jPoll : function(config) {
			config = $.extend({}, $.jPoll.defaults, config);
			var total = 0;
			for (var i = 0; i < config.viewPointsNum.length; i++) {
				total += parseInt(config.viewPointsNum[i]);
			}
			var ratecolor = new Array("#FD85DF", "#E2FEA7", "#FB7B99",
					"#FBE096", "#F7CA98", "#BDE676", "#9EB5F0", "#AEE7F8",
					"#E6F63B", "#E58652");
			$("<div>").text("　" + config.pollHeading).appendTo($(this));
			$("<div>").attr("id", "pollBox" + config.locationID)
					.addClass("pollBox").appendTo($(this));
			for (var i = 0; i < config.groupIDs.length; i++) {
				if (total == 0) {
					var rate = 0 + "%";
				} else {
					var rate = Math.round(parseInt(config.viewPointsNum[i])
							/ total * 100)
							+ "%";
				}
				var groupid = config.groupIDs[i];
				var htmlStr = "<div onclick=\"return vote(" + config.futID
						+ "," + groupid + ",'" + config.ajaxOpts.url + "'"
						+ "," + config.locationID + ");" + "\" class='out' "
						+ "id = 'r_" + config.locationID + "_" + i + "'";
				htmlStr += "onMouseOut=\" this.className='out';\" onMouseOver=\"return changClass( this ,'over' );\">";
				htmlStr += "<label >" + config.groupViewpoints[i] + "</label>";
				htmlStr += "<div class='resultBox'><div class='r"
						+ config.locationID
						+ "' id='r_"
						+ config.locationID
						+ "_"
						+ i
						+ "' style='float:left;height:10px;width:"
						+ Math.round(parseInt(config.viewPointsNum[i]) / total
								* 200) + "px;display:block; background-color:"
						+ ratecolor[i] + "'>"
						+ "</div></div><div class='resultRate'><p>"
						+ config.viewPointsNum[i] + "(" + rate
						+ ")</p></div></div>";
				$("#pollBox" + config.locationID).append(htmlStr);
			}
			return this;
		}
	});
})(jQuery);
function changClass(objStr, className) {
	$(objStr).attr('class', className);
}
function vote(fut_id, option_id, url, lcation_id) {
	var serverUrl = url;
	var data = {
		'option_id' : option_id,
		'fut_id' : fut_id
	};
	var callback = function(r) {
		if (r == 0) {
			alert("没成功，再试一次");
		} else if (r == -1) {
			alert("投过票了，去看看其它宝贝吧！");
		} else if (r == -2) {
			alert("登录了吗，只有登录才能投票啊");
		} else {
			showResults(fut_id, eval(r), lcation_id);
		}
	};
	$.post(serverUrl, data, callback);
}
var ratecolor = new Array("#FD85DF", "#E2FEA7", "#FB7B99", "#FBE096",
		"#F7CA98", "#BDE676", "#9EB5F0", "#AEE7F8", "#E6F63B", "#E58652");
function showResults(fut_id, results, lcation_id) {
	var total = 0;
	for (var i = 0; i < results.length; i++) {
		total += parseInt(results[i].option_num);
	}
	$("div#pollContainer" + lcation_id).find("h2")
			.text("已经有" + total + "人发表观点");
	$("div#pollBox" + lcation_id).slideUp("slow");
	$("<div>").attr("id", "results" + lcation_id).addClass("results").css({
				display : "none"
			}).appendTo("div#pollContainer" + lcation_id);
	for (var i = 0; i < results.length; i++) {
		var rate = Math.round(results[i].option_num / total * 100) + "%";
		$("<div>").addClass("out").attr("id", "row_" + lcation_id + "_" + i)
				.appendTo("#results" + lcation_id);
		$("<label>").text(results[i].option_title).appendTo("#row_"
				+ lcation_id + "_" + i);
		$("<div>").addClass("resultBox").appendTo("#row_" + lcation_id + "_"
				+ i);
		$("<div>").attr("title", rate).attr("id",
				"result_" + lcation_id + "_" + i).attr(
				"style",
				"float:left;height:10px;width:0px;background-color:"
						+ ratecolor[i]).addClass("result" + lcation_id).css({
					display : "none"
				})
				.appendTo($("#row_" + lcation_id + "_" + i).children(":last"));
		$("<div>").addClass("resultRate").appendTo("#row_" + lcation_id + "_"
				+ i);
		$("<p>").text(results[i].option_num + "(" + rate + ")")
				.appendTo($("div#row_" + lcation_id + "_" + i)
						.children(":last"));
	}
	$("div#results" + lcation_id).slideDown("slow", function() {
		$(".result" + lcation_id).each(function(j) {
					$(this).animate({
								width : Math.round(results[j].option_num
										/ total * 200)
							}, "slow");
				});
	});
}
function getOptions(fut_tid) {
	var serverUrl = "goods/ajax_getOptions";
	var data = {
		'fut_tid' : fut_tid
	};
	var retValue = '';
	var callback = function(r) {
		if (r != 0) {
			retValue = eval(r);
		}
	};
	$.ajax({
				async : false,
				type : "POST",
				url : serverUrl,
				data : data,
				dataType : 'json',
				success : callback
			});
	return retValue;
}
var goodsPrompt = {
	lastID : 0,
	newGoods : server_url + 'goods/ajax_getNewGoods',
	interval : null,
	getNewGoods : function() {
		if (goodsPrompt.lastID == 0) {
			return false;
		}
		$.get(goodsPrompt.newGoods + '/' + goodsPrompt.lastID, null, function(
				bakNum) {
			if (bakNum > 0) {
				var promtStr = "<a href='javascript:void(0);' onClick='window.location.reload();'>有新宝贝，点击刷新</a>";
				$('#goods_refesh_new').html(promtStr).show();
				goodsPrompt.stopInterval();
			} else {
				$('#goods_refesh_new').hide();
			}
		});
	},
	startInterval : function() {
		goodsPrompt.interval = setInterval(goodsPrompt.getNewGoods, 10000);
	},
	stopInterval : function() {
		if (goodsPrompt.interval != null) {
			clearInterval(goodsPrompt.interval);
		}
	}
}
function openiGG() {
	return true;
	var isIE = (document.all && window.ActiveXObject) ? true : false;
	alert(isIE);
	if (isIE === false) {
		return false;
	}
	try {
		if (isIE) {
			igg = new ActiveXObject("Shopping.Untity.1");
			igg.ShowBar('false');
		}
	} catch (e) {
		alert(e);
	}
}
function setInvite(userId) {
	var isIE = (document.all && window.ActiveXObject) ? true : false;
	if (isIE === false) {
	}
	var url = server_url + 'invite/ajax_setInvite';
	var data = {
		"inviteUserId" : userId
	};
	var callback = function(r) {
		try {
			if (trim(r) == '0') {
				alert("邀请失败");
			} else if (trim(r) == '2') {
				alert('该用户已经有人邀请了，请稍后再试~~');
			} else if (trim(r) == '1') {
				alert('邀请成功');
				openiGG();
			} else if (trim(r) == '3') {
				alert('您邀请的人已经在和您一起逛街了，请不要重复邀请');
			}
		} catch (e) {
			alert(e);
		}
	}
	$.post(url, data, callback);
	return true;
}
function setUnAccept() {
	var url = server_url + 'invite/ajax_setUnAcceptInvite';
	var data = {};
	var callback = function(r) {
		if (trim(r) == "1") {
			alert('呵呵，你拒绝了人家，人家好失望阿。');
		} else {
			alert('系统故障，请联系管理员');
		}
	};
	$.post(url, data, callback);
	return true;
}
function setAccept() {
	var url = server_url + 'invite/ajax_setAcceptInvite';
	var data = {};
	var callback = function(r) {
		if (trim(r) == "1") {
			alert('恭喜你，你可以在逛逛里和别人一起逛街了');
			openiGG();
		} else {
		}
	};
	$.post(url, data, callback);
	return true;
}
var checkWindowOut = 0;
function checkHaveInvite() {
	var url = server_url + 'invite/ajax_ifHaveInvite';
	var data = {};
	var callback = function(r) {
		try {
			var cArr = r.split('@_SPLIT_@');
			var cFlag = cArr[0];
			if (trim(cFlag) == '1') {
				if (checkWindowOut == 0) {
					checkWindowOut = 1;
					if (!confirm(cArr[1])) {
						setUnAccept();
					} else {
						setAccept();
					}
				}
			}
			checkWindowOut = 0;
		} catch (e) {
		}
	};
	$.post(url, data, callback);
	return true;
}
function getUserNickName(userId) {
	var url = server_url + 'users/ajax_getUserNickname';
	var data = {
		"userId" : userId
	};
	var nickname = "";
	var callback = function(r) {
		try {
			nickname = trim(r);
		} catch (e) {
			alert(e);
		}
	}
	$.ajax({
				async : false,
				type : "POST",
				url : url,
				data : data,
				success : callback
			});
	return nickname;
}
function showSendPmsgBox(sendToNickName) {
	if (current_user_id == 0 || current_user_id == '') {
		showLoginWin();
		return false;
	}
	if (sendToNickName == undefined) {
		sendToNickName = "";
	}
	$('#pmsg_text').val('');
	$('#checkcode_apply').val('');
	$('.error').html('');
	var msgWin = $('#popup_div_window');
	if (msgWin.length > 0) {
		$('#pmsg_sendto').val(sendToNickName);
		msgWin.toCenter().show().shadow();
		var tipBox = $('.send_pmsg_box_msgBox');
		tipBox.hide();
		tipBox.html('');
		changeCheckCode();
	} else {
		var url = "/msg/ajax_sendPMsgBox/" + encode(sendToNickName);
		var data = {};
		var callback = function(r) {
			$('body').append(r);
			$('#popup_div_window').toCenter().show().shadow();
		}
		$.get(url, data, callback);
	}
	msgWin.die().live("keydown", function(event) {
				if (event.keyCode == 13) {
					submitPmsg();
				}
			});
}
function showDeletePmsgButton(message_id) {
	var id = message_id;
	$("#" + id).show();
}
function bidnDeletePmsgButton(message_id) {
	var id = message_id;
	$("#" + id).hide();
}
function Get_delete_dlg(userid) {
	var url = server_url + 'msg/ajax_Delete_msg_by_uid';
	var onclick_data = confirm(" 确认删除此对话?");
	var data = {
		'userid' : userid
	};
	var callback = function(r) {
		errorMsg = "删除成功";
		$(".send_pmsg_box_msgBox").html(errorMsg);
		setTimeout("window.location.reload();", 500);
	};
	if (onclick_data)
		$.post(url, data, callback);
}
function Get_delete_msg(message_id) {
	var url = server_url + 'msg/ajax_Delete_msg_by_mid';
	var onclick_data = confirm(" 确认删除此私信?");
	var data = {
		'message_id' : message_id
	};
	var callback = function(r) {
		errorMsg = "删除成功";
		$(".send_pmsg_box_msgBox").html(errorMsg);
		setTimeout("window.location.reload();", 500);
	};
	if (onclick_data)
		$.post(url, data, callback);
}
function get_delete_msg_new(message_id) {
	var url = server_url + 'msg/ajax_Delete_msg_by_mid_new';
	var onclick_data = confirm(" 确认删除此私信?");
	var data = {
		'message_id' : message_id
	};
	var callback = function(r) {
		errorMsg = "删除成功";
		$(".send_pmsg_box_msgBox").html(errorMsg);
		setTimeout("window.location.reload();", 500);
	};
	if (onclick_data)
		$.post(url, data, callback);
}
function pMsg_clearDefaultStr() {
	var pmsg_sendto = $('#pmsg_sendto').val();
	if (pmsg_sendto == '请输入用户的昵称') {
		$('#pmsg_sendto').val('');
	}
}
function submitPmsg() {
	var tipBox = $('.send_pmsg_box_msgBox');
	var pmsg_sendto = $('#pmsg_sendto').val().trim();
	var pmsg_text = $('#pmsg_text').val().trim();
	var pmsg_receive_type = 0;
	var errorMsg = "";
	var checkcode = $("#checkcode_apply").val().trim();
	var checkCodeEquals = verifyCheckCode(checkcode);
	if (checkCodeEquals == "0") {
		errorMsg = "您输入的验证码不正确！";
	}
	if (pmsg_sendto.length == 0 || pmsg_sendto == '请输入用户的昵称') {
		errorMsg = "没有指定私信发送人";
	} else if (pmsg_text.length == 0) {
		errorMsg = "私信内容不能为空";
	} else if (pmsg_text.length > 200) {
		errorMsg = "私信内容不能超过200个字";
	}
	if (pmsg_sendto.length > 0 && pmsg_sendto != '请输入用户的昵称' && errorMsg != '') {
		var checkNickNameStatus = checkIfNickExist(pmsg_sendto);
		if (checkNickNameStatus == 0) {
			errorMsg = "用户\"" + pmsg_sendto + "\"不存在";
		}
	}
	if (errorMsg != "") {
		tipBox.html(errorMsg).css("color", "red");
		tipBox.show();
		changeCheckCode();
		return false;
	} else {
		tipBox.html('发送中...').css("color", "green");
		var url = server_url + 'msg/ajax_submitPmsg';
		var data = {
			'pmsg_sendto' : pmsg_sendto,
			'pmsg_text' : pmsg_text,
			'pmsg_receive_type' : pmsg_receive_type,
			'checkcode' : checkcode
		};
		var callback = function(r) {
			r = trim(r);
			switch (r) {
				case '5' :
					errorMsg = '用户昵称不存在';
					break;
				case '2' :
					errorMsg = '你只能给美丽客服精灵发送私信';
					break;
				case '3' :
					errorMsg = '不允许发送站外链接!';
					break;
				case '6' :
					errorMsg = '你所发内容包含非法字符';
					break;
				case '4' :
					errorMsg = '只有互相关注的好友才能发送私信！';
					break;
				default :
					errorMsg = '发送私信成功';
			}
			tipBox.html(errorMsg);
			tipBox.css("background", "url('')");
			tipBox.css("color", "green");
			tipBox.show();
			if (errorMsg != '发送私信成功') {
				tipBox.css("color", "red");
				changeCheckCode();
			} else {
				setTimeout(function() {
							$('#popup_div_window').hide().shadow({
										'show' : false
									});
						}, 1500);
				changeCheckCode();
				document.location.reload();
			}
		};
		$.post(url, data, callback);
	}
}
function hidediv() {
	$('.submit_apply_innnertest_alert_twitter_top').hide();
	$('#grey_div').remove();
}
function showOriginalPic_ico(id) {
	var $t = $('#t' + id);
	if ($t.length == 0) {
		$t = $('#ask_source_tex');
	}
	var $btn = $t.find('.original_pic_ioc');
	if (twitterListObj.lType == 'twitterPage') {
		var $pic = $t.find('.code_pic');
	} else {
		var $pic = $t.find('.code_pic img');
	}
	position = $pic.offset();
	l = position.left + $pic.width() - $btn.width() - 5;
	t = position.top + 5;
	$btn.css({
				'left' : l + 'px',
				'top' : t + 'px'
			}).show();
}
function hiddenOriginalPic_ico(id) {
	var $t = $('#t' + id);
	if ($t.length == 0) {
		$t = $('#ask_source_tex');
	}
	$t.find('.original_pic_ioc').hide();
}
function pic() {
	var p = document.getElementsByTagName("img");
	for (var i = 0; i < p.length; i++) {
		pp = p[i];
		var pw = pp.width;
		var ph = pp.height;
		if (pw > 310 || ph > 310) {
			if (1 > (pw / ph)) {
				pp.style.width = "auto";
				pp.style.height = "310px";
			}
			if (1 < (pw / ph)) {
				pp.style.width = "310px";
				pp.style.height = "auto";
			}
		}
	}
}
function viewOriginal(href) {
	artDialog({
		title : '图片查看',
		content : "<div style='width:300px;height:300px;background:url(../css/images/indicator_medium.gif) no-repeat 0 0;'></div>"
	});
	var img = new Image();
	img.onload = function() {
		$('.ui_dialog_wrap').hide();
		artDialog({
					title : '图片查看',
					fixed : false,
					content : "<a href='" + href
							+ "' target='_blank'><img src='" + href
							+ "' /></a>"
				});
	};
	img.src = href;
}
var homeSideBar = {
	nextDaren : function() {
		$.get(server_url + 'sideBar/ajax_getRecommendUser?frm=homeNext',
				function(daren) {
					var daren = eval("(" + daren + ")");
					if (daren.follow) {
						$('#home-daren .dr_b')
								.attr('id', 'f' + daren.user_id)
								.find('.follow')
								.html('<span class="cursor new_notfollow">取消关注</span>')
								.find('span').unbind('click').bind('click',
										function() {
											friendsObj.removeFromUrNew(
													daren.user_id, 'daren');
										});
					} else {
						$('#home-daren .dr_b')
								.attr('id', 'f' + daren.user_id)
								.find('.follow')
								.html('<span class="new_follow cursor">关注她</span>')
								.find('span').unbind('click').bind('click',
										function() {
											friendsObj.addFollowerPerson(
													daren.user_id, 'daren');
										});
					}
					$('#home-daren').find('.float_bg h4 a')
							.html(daren.nickname).attr(
									'href',
									server_url + 'person/profile/'
											+ daren.user_id).end()
							.find('.float_bg p').html(daren.description).end()
							.find('#daren-pic-a').attr(
									'href',
									server_url + 'person/profile/'
											+ daren.user_id)
							.append('<img class="new" src="' + daren.imglink
									+ '" />').children('img').animate({
										"left" : "-=180px"
									}, 500);
					setTimeout(
							"$('#daren-pic-a').find('.old').remove().end().find('.new').attr('class', 'old')",
							490);
				});
	},
	nextGroup : function() {
		$.get(server_url + 'sideBar/ajax_getRecommendGroup?frm=homeNext',
				function(group) {
					var group = eval("(" + group + ")");
					if (group.follow) {
						$('#home-group .dr_b')
								.attr('id', 'f' + group.group_id)
								.find('.follow')
								.html('<a class="c f14 g_exit red" href="javascript:void(0);">已关注</a>')
								.find('a').unbind('click').bind('click',
										Group.quit).mouseover(function() {
											$(this).html('取消关注').mouseout(
													function() {
														$(this).html('已关注');
													});
										});
					} else {
						$('#home-group .dr_b')
								.attr('id', 'f' + group.user_id)
								.find('.follow')
								.html('<a class="c f14 g_join red" href="javascript:void(0);">+加关注</a>')
								.find('a').unbind('click').bind('click',
										Group.follow);
					}
					$('#home-group')
							.find('.groupbg h3 a')
							.html(group.name)
							.attr('href',
									server_url + 'group/' + group.group_id)
							.end()
							.find('.groupbg .e_i_f')
							.html('编辑: ' + group.nickname + '等'
									+ group.admin_num + '人')
							.end()
							.find('.groupbg .second')
							.html(group.count_member + '人关注')
							.end()
							.find('.g_pic')
							.attr('href',
									server_url + 'group/' + group.group_id)
							.append('<img class="new"  style="width: 200px; height: 200px;" src="'
									+ group.imgurl + '" />').children('img')
							.animate({
										"left" : "-=200px"
									}, 500);
					setTimeout(
							"$('.g_pic').find('.old').remove().end().find('.new').attr('class', 'old')",
							490);
					Group.group_id = group.group_id;
					Group.is_follow = group.follow;
					Group.is_member = group.is_member;
				});
	}
}
var recommend = {
	follow : function() {
		var uids = "";
		$(".wf_one input[type='checkbox']").each(function() {
					if ($(this).attr('checked') == true) {
						uids += ":" + this.value;
					}
				});
		recommend.close();
		var url = server_url + "twitter/ajax_addFollower?frm=weibofollow";
		var data = {
			fuid : uids
		}
		var callback = function(mesg) {
			if (mesg == 1) {
				showForbiddenWindow();
				return false;
			}
			$.setCookie('weibofriends', '1', {
						duration : 0,
						path : '/',
						domain : DEFAULT_COOKIEDOMAIN
					});
		}
		$.get(url, data, callback);
	},
	close : function() {
		$('#recommend').slideUp('slow');
	},
	checkAll : function() {
		var status = $('#checked').attr('checked');
		$(".wf_one input[type='checkbox']").each(function() {
					if (status == true) {
						this.checked = true;
					} else {
						this.checked = false;
					}
				});
	}
}
$(document).ready(function() {
	if (current_user_id == 0) {
		var c = $.readCookie('MEILISHUO_OFFSITE_CLICK');
		$("#title_twitter_sig_goods a, #code_pic_b_a a, #where_come_from a")
				.each(function() {
					if (c != null && parseInt(c) >= 5) {
						$(this).attr('href', 'javascript:;');
					}
					$(this).click(function() {
								var count = $
										.readCookie('MEILISHUO_OFFSITE_CLICK');
								var setCount = null;
								if (count == null) {
									setCount = 1;
								} else if (count < 5) {
									setCount = parseInt(count) + 1;
								}
								if (setCount != null) {
									$.setCookie('MEILISHUO_OFFSITE_CLICK',
											setCount, {
												duration : 3600,
												path : '/',
												domain : DEFAULT_COOKIEDOMAIN
											});
									return true;
								} else {
									$.md({
												modal : "#xs",
												url : "/msg/ajax_popLoginBox/"
											});
									return false;
								}
							});
				});
	}
	twitterListObj.lType = 'twitterPage';
	twitterObj.idPrefix = 'notePageView';
	var replyTxt = $('#reply .reply_box .answer_text');
	if (replyTxt.length > 0) {
		replyTxt.textlimit("#reply .reply_box .note_limit",
				twitterObj.maxLength, 10);
		bindRange(replyTxt.get(0));
	}
	var func = function() {
		$('#show_comments').hide();
		$('#hide_comments').show().focus();
	}
	$('#show_comments').focus(func).click(func);
});
function hideDiv(jqueryObj) {
	$(jqueryObj).closest('.dialog').hide().shadow({
				'show' : false
			});
}
function comments() {
	$('#hide_comments').show().focus();
}
function key_down() {
	var $input = $('#hide_comments');
	if ($input.val() == "写下你对宝贝的评语，把宝贝推荐给朋友") {
		$input.val('');
		$input.css('color', 'black')
	}
	if ($input.val() != "写下你对宝贝的评语，把宝贝推荐给朋友" && $input.val() != "") {
		$input.css('color', 'black');
	}
	return true;
}
function xiu(obj) {
	var $obj = $(obj);
	var position = $obj.position();
	var width = $obj.width();
	$('#xiu').css({
				top : position.top - 20,
				left : position.left + width - 60
			}).show();
}
var shelfWindow = $.dialog({
			title : '该宝贝已经下架',
			width : '460px',
			content : $('#shelf').show(),
			closeHandle : function() {
				$(this).closest('.dialog').hide().shadow({
							'show' : false
						});
			}
		});
function shelf() {
	shelfWindow.toCenter("fixed").show();
}
function unshelf() {
	shelfWindow.hide();
}
function do_comment(gid, cont, id) {
	var comment = $('#' + id).val().trim();
	if (comment == "") {
		alert("评论不能为空！");
		return false;
	}
	if (comment == "写下你对宝贝的评语，把宝贝推荐给朋友") {
		alert("请输入评论内容！");
		return false;
	}
	if (!WidthCheck(comment, 140)) {
		alert('评论不能超过140个字！');
		return false;
	}
	var callback = function(backstr) {
		var obj = eval('(' + backstr + ')');
		if (obj.success == 1 && cont == 1) {
			$.dialog({
						title : '美丽提示',
						content : $('#comment_success').show(),
						closeHandle : function() {
							location.href = location.href;
						}
					}).toCenter().show().shadow({
						'show' : true
					});
		} else if (obj.success == 2) {
			$.dialog({
						title : '美丽提示',
						content : $('#comment_success1').show(),
						closeHandle : function() {
							location.href = location.href;
						}
					}).toCenter().show().shadow({
						'show' : true
					});
		} else {
			setTimeout("window.location.reload();", 100);
		}
	}
	var url = server_url + "twitter/ajax_comment";
	$.post(url, {
				'comment' : comment,
				'gid' : gid
			}, callback);
}
function dispatch_taoke(taoke) {
	alert(taoke['satellite_url'])
}
var twitterItemNote = {
	tid : 0,
	getNoteListUrl : server_url + 'item/ajax_note/',
	showTwitterNote : function(tid) {
		faceTableObj.hide_tables();
		twitterItemNote.tid = tid;
		if (current_user_id == 0 || current_user_id == '') {
			showLoginWin();
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		var curComments = $('#t_note' + tid);
		if (!curComments.hasClass('none')) {
			$('#t_note' + tid + ' .pl_list').remove();
			twitterItemNote.getNoteList(0);
			curComments.toggleClass('none');
			return false;
		}
		curComments.toggleClass('none');
		twitterItemNote.getNoteList(0);
		twitterItemNote.textLimit();
	},
	getNoteList : function(page) {
		var data = {
			tid : twitterItemNote.tid,
			page : page
		};
		if ($.readCookie('MEILISHUO_BOB_LANDING'))
			data.pagesize = 5;
		var callback = function(noteList) {
			if (noteList == false) {
				$('.spinner').hide();
				return false;
			}
			var json = eval("(" + noteList + ")");
			$('#t_note' + twitterItemNote.tid + ' .note-list').html(json.h);
			$('.spinner').hide();
			$('#r' + twitterItemNote.tid).text(json.t);
			$('.namecard:not(.js_processed)').addClass('js_processed')
					.floatUserInfo();
		};
		$.get(twitterItemNote.getNoteListUrl, data, callback);
		return false;
	},
	replyButtonClick : function(uid, tid, thisobj) {
		if (Meilishuo.config.is_actived == 2) {
			location.href = server_url + 'users/activate_message';
			return false;
		} else if (Meilishuo.config.shup == 5) {
			showShupWin();
			return false;
		}
		var CommentBoxHeight = 0;
		var curComments = $('#t_note' + tid);
		var forward = $('#forward-' + tid).attr('checked');
		var showIndex = 1;
		var type = 4;
		forward ? showIndex = 1 : showIndex = 0;
		if (!twitterNoteObj.checkReply(0, 0, tid)) {
			return false;
		}
		var $noteInput = curComments.parent().find('.answer_text');
		var txt = $noteInput.val();
		curComments.find('.hint').html('回复成功').show().fadeOut(2000);
		$noteInput.attr("disabled", "");
		var childBox = $('#child' + tid);
		var callback = function(mesg) {
			if (tips[mesg]) {
				alert(tips[mesg]);
				return false;
			}
			if (mesg == 1) {
				showForbiddenWindow();
				return false;
			}
			if (typeof(thisobj) == 'object') {
				var CommentsBox = $('#t_comment' + tid);
				CommentsBox
						.html('<li id="child'
								+ tid
								+ '" ><a class="avatar32 left trans07" href="/person/u/'
								+ Meilishuo.current_user.id
								+ '" target="_blank"><img src="'
								+ Meilishuo.current_user.avatar
								+ '"/></a><p><a class="fb" href="/person/u/'
								+ Meilishuo.current_user.id
								+ '" target="_blank">'
								+ Meilishuo.current_user.nickname
								+ '</a> <span class="gray">' + txt
								+ '</span></p></li>' + CommentsBox.html());
			}
			if (typeof(thisobj) != 'object') {
				var h = '<li class="list_info"><a class="img_face" href="/person/u/'
						+ Meilishuo.current_user.id
						+ '" target="_blank"><img src="'
						+ Meilishuo.current_user.avatar
						+ '"/></a><p><span class="cgray r">1分钟前</span><span class="red"><a href="/person/u/'
						+ Meilishuo.current_user.id
						+ '" target="_blank">'
						+ Meilishuo.current_user.nickname
						+ '</a></span></p><p class="tj">'
						+ txt
						+ ' <span class="red"><a onclick="twitterNoteObj.replyInEditbox(\''
						+ Meilishuo.current_user.nickname
						+ '\', '
						+ twitterItemNote.tid
						+ ');return false;" href="javascript:;">回复</a></span></p></li>';
				location.href.indexOf('/share/') > -1
						? $('.pl_list').append(h)
						: $('.pl_list').prepend(h);
				var $num = $('#r' + twitterItemNote.tid);
				$num.text(parseInt($num.text()) + 1);
			}
			$noteInput.val('');
			if ($("#wall").size() > 0 && $('#content_fluid').length > 0) {
				$("#wall").masonry('reload');
			}
		};
		$.ajax({
					async : true,
					type : "GET",
					url : twitterNoteObj.noteNew_url,
					data : {
						suid : uid,
						stid : tid,
						type : type,
						tContent : txt,
						pid : 0,
						showIndex : showIndex
					},
					success : callback
				});
	},
	textLimit : function() {
		var $noteInput = $('#t_note' + twitterItemNote.tid + ' .answer_text');
		var $noteLimit = $('#t_note' + twitterItemNote.tid + ' .note_limit');
		$noteInput.autoTextarea({
					"maxHeight" : 220,
					"miniHeight" : 28
				});
		twitterObj.idPrefix = 't_note';
	}
}
function showFollowStatus(uid) {
	$('#f' + uid + ' .follow span').attr('onclick', '').unbind('click').bind(
			'click', function() {
				friendsObj.removeFromUrNew(uid, 'daren');
			}).removeClass('new_follow')
			.addClass('ex_notfollow f14 new_notfollow').html('已关注').mouseover(
					function() {
						$(this).text('取消关注');
					}).mouseout(function() {
						$(this).text('已关注');
					});
	$('.p-fdesc').hide();
}
function showUnfollowStatus(uid) {
	$('#f' + uid + ' .follow span').attr('onclick', '').bind('click',
			function() {
				friendsObj.addFollowerPerson(uid, $(this));
			}).removeClass('ex_notfollow').addClass('ex_follow f14')
			.html('＋加关注').unbind('mouseover').unbind('mouseout');
	$('.p-fdesc').show();
	$('.p-fdesc').hide();
}
function showSpamDel(tid, twitter_uid, obj) {
	var html = '<div id="spam_pop" style="padding:30px 100px;"><div class="f14">是否确认删除推，删除后的推将不能恢复？</div>'
			+ '<div class="checkBox" style="margin-top:20px;"><input class="delAllTwitter" id="checkedBox" type="checkbox"></input><span>同时删除用户的所有推</span>'
			+ '<a target="_blank" class="red" href="http://work.meiliworks.com/twitter/getTwitterList?twitter_author_uid='
			+ twitter_uid
			+ '" style="margin-left:5px;">查看该用户的所有推>></a></div>'
			+ '<div class="checkBox mt10"><input class="closureUser" id="checkedBox" type="checkbox"></input><span>同时封禁该用户一周</span></div>'
			+ '<div class="checkBox mt10"><input class="deleteUser" id="checkedBox" type="checkbox"></input><span>同时删除该用户</span></div>'
			+ '<div style="margin-top:30px;"><span class="cursor confirm c" style="border-radius:4px;background-color:#FF6699;color:#FFFFFF;width:60px;height:25px;line-height:25px;float:left;margin-left:100px;">确定</span><span class="cancel cursor" style="float:left;margin-left:20px;line-height:25px;">取消</span></div><div class="clear"></div></div>';
	function hideSpam() {
		$spamDel.hide();
		hideShadow();
	}
	var $spamDel = null;
	if ($spamDel == null) {
		$spamDel = $.dialog({
					title : '删除封禁管理',
					width : '500px',
					content : $(html).show(),
					closeHandle : function() {
						hideSpam();
					}
				});
	}
	var isIE6 = $.browser.msie && $.browser.version == '6.0';
	var fixed = isIE6 ? '' : 'fixed';
	$spamDel.toCenter(fixed).show();
	showShadow();
	$spamDel.find('.cancel').click(function() {
				hideSpam();
			});
	$spamDel.find('.confirm').click(function() {
				var url = '/twitter/ajax_removeTwitterSpam', data = {
					'tid' : tid,
					'is_spamadmin' : 1
				}, callback = function() {
					if (obj) {
						$(obj).parent().parent().hide();
						hideSpam();
					} else {
						location.href = location.href;
					}
				};
				if ($spamDel.find('.delAllTwitter').attr("checked"))
					data['clear_up'] = 1;
				if ($spamDel.find('.closureUser').attr("checked"))
					data['ban_a_week'] = 1;
				if ($spamDel.find('.deleteUser').attr("checked"))
					data['delete_user'] = 1;
				$.get(url, data, callback);
			});
}
function showPolDel(tid, obj) {
	var $delDia = null;
	var h = '<div class="f14" style="padding:30px 0 15px;height:22px;line-height:24px;margin-left:120px;"><span class="left"><img src="/css/images/confirm.gif"></span>'
			+ '<span class="left" style="margin-left:10px;">确认删除?</span></div>'
			+ '<div style="height:25px;line-height:25px;" class="c f14">'
			+ '<span class="submit_alert_chose_yes white left cursor f14" style="width:64px;margin-left:110px;">确定</span>'
			+ '<span class="left cursor submit_alert_chose_no white" style="margin-left:10px;width:64px;">取消</span></div>';
	var fixed = ($.browser.msie && $.browser.version == '6.0') ? '' : 'fixed';
	if ($delDia == null) {
		$delDia = $.dialog({
					'title' : '提示',
					'content' : $(h),
					'width' : '350px',
					'closeHandle' : function() {
						$(this).closest('.dialog').hide();
						hideShadow();
					}
				});
	}
	$delDia.toCenter(fixed).show();
	showShadow();
	$delDia.find('.submit_alert_chose_yes').click(function() {
				var callback = function() {
					if (obj) {
						$(obj).parent().parent().hide();
						$delDia.hide();
						hideShadow();
					} else {
						location.href = location.href;
					}
				};
				$.get('/twitter/ajax_removeTwitterSpam', {
							'tid' : tid,
							'is_spamadmin' : 1
						}, callback);
			});
	$delDia.find('.submit_alert_chose_no').click(function() {
				$delDia.hide();
				hideShadow();
			});
}