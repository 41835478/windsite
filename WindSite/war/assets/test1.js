(function(c, b) {
	KSLITE.declare("tkapi-minisearch", ["tkapi-config", "tkapi-box-helper"],
			function(e, f) {
				var h = e("tkapi-config"), d = e("tkapi-box-helper"), i = h.c, a = h.r, k = h.u;
				var g = "_tk_rb_index", j = document, b = "http://g.click.taobao.com/display";

				f.show = function(l) {
					if (k.getAttr(l, g)) {
						return
					}
					var c = k.getAttrs(l);
					k.setAttr(l, g, "0");
					if (!d.checkParams(c)) {
						return false
					}
					var m = k.queryData(c);
					d.fetchData(m, function(q) {
								document.location.href = q.data.style.ds_more;
							})
				}
				var msb = document.getElementById("M_S_B");
				msb.click = f.show(msb);
			});
})(window, KSLITE);

/* pub-1|2013-06-05 12:10:52 */KSLITE.declare("tkapi-main", ["tkapi-param",
				"tkapi-bindclick", "tkapi-load", "tkapi-boot", "tkapi-config",
				"tkapi-plugin"], function(e, d) {
			var a = e("tkapi-param").Def;
			var c = e("tkapi-bindclick").Def;
			var h = e("tkapi-load").Def;
			var f = e("tkapi-boot").Def;
			var g = e("tkapi-plugin").Def;
			var b = e("tkapi-config");
			d.run = function(i) {
				b.ready(function() {
							a(i, c, h);
							f();
							g(i.plugins)
						})
			}
		});
KSLITE.declare("tkapi-config", function(b, e) {
	var d = KSLITE;
	var a = {}, c = {}, g = {};
	var d = KSLITE;
	var f = false;
	a.ali = ["taobao.com", "alimama.com", "alibaba.com", "alipay.com",
			"alisoft.com", "linezing.com", "tanx.com", "mmstat.com",
			"etao.com", "tmall.com"];
	a.kws = ["wd", "p", "q", "keyword", "kw", "w", "key", "word", "query",
			"name"];
	a.alimama = "http://g.click.taobao.com/";
	a.cookieKey = "amvid";
	a.linkAttr = ["data-itemid", "data-sellerid", "data-keyword", "data-unid",
			"data-pid", "data-other", "data-rd", "_tkworked"];
	a.para = ["appkey", "unid", "pid", "evid"];
	a.queryOrder = ["ak", "pid", "unid", "wt", "wi", "ti", "tl", "rd", "ct",
			"st", "rf", "et", "pgid", "other", "v", "tc"];
	a.oldAttr = ["&", "itemid", "sellerid", "keyword", "bucketid", "count",
			"cid"].join("&");
	c.cache = undefined;
	c.win = window;
	c.d = document;
	c.maxwin = null;
	c._maxwin = function(m) {
		if (m) {
			c.maxwin = m;
			return
		}
		var m = c.win;
		if (top != m) {
			if (top.location && top.location.href) {
				m = top
			}
		}
		c.maxwin = m
	};
	c.ali = (function() {
		var n, o = c.d.domain.split("."), p = a.ali, m;
		if (o.length > 1) {
			m = "@" + o[o.length - 2] + "." + o[o.length - 1];
			if (("@" + p.join("@")).indexOf(m) > -1) {
				return true
			}
		}
		return false
	})();
	c.frm = (function() {
		return (top != window)
	})();
	c.ref_url = null;
	c.getRef_url = function() {
		if (c.ref_url) {
			return c.ref_url
		}
		var m = location.href;
		if (c.frm) {
			if (c.win == c.maxwin) {
				m = c.d.referrer
			} else {
				m = top.location.href
			}
		}
		c.ref_url = m;
		return m
	};
	g.encode = function(m) {
		return encodeURIComponent(m.toString())
	};
	g.decode = function(m) {
		return decodeURIComponent(m.toString())
	};
	g.getAttr = function(n, m) {
		return g.trim(n.getAttribute(m.toLowerCase(), 2) || "") || ""
	};
	g.setAttr = function(o, m, n) {
		o.setAttribute(m.toLowerCase(), g.trim(n + ""))
	};
	g.getCookie = function(o) {
		var p = (" " + document.cookie).split(";"), m = "", o = o
				? o
				: a.cookieKey;
		for (var n = 0; n < p.length; n++) {
			if (p[n].indexOf(" " + o + "=") === 0) {
				m = g.decode(p[n].split("=")[1]);
				break
			}
		}
		return m
	};
	g.css = function(n, m, o) {
		if (o) {
			return n.style[m] = o
		}
		if (window.getComputedStyle) {
			return window.getComputedStyle(n, null).getPropertyValue(m)
		} else {
			if (n.currentStyle) {
				return n.currentStyle[m]
			}
		}
	};
	g.show = function(m) {
		var n = g.getAttr(m, "_tk_old_display") || "";
		g.css(m, "display", n)
	};
	g.hide = function(m) {
		if (!m) {
			return
		}
		g.setAttr(m, "_tk_old_display", g.css(m, "display"));
		g.css(m, "display", "none")
	};
	g.nodeList2Array = function(o) {
		var p = [];
		for (var n = 0, m = o.length; n < m; n++) {
			p[n] = o[n]
		}
		return p
	};
	g.getElClientRect = function(m) {
		var n = m.getBoundingClientRect();
		if (n.height == undefined || n.width == undefined) {
			n = KSLITE.mix({}, n);
			n.height = m.offsetHeight;
			n.width = m.offsetWidth
		}
		return n
	};
	g.each = function(q, p) {
		if (q.length && q.slice) {
			for (var o = 0, m = q.length; o < m; o++) {
				p(q[o], o)
			}
		} else {
			for (var n in q) {
				if (q.hasOwnProperty(n)) {
					p(q[n], n)
				}
			}
		}
	};
	g.setCookie = function(m, n) {
		var m = arguments.length == 1 ? a.cookieKey : m;
		document.cookie = m + "=" + g.encode(n) + "; path=/"
	};
	g.trim = function(o) {
		var m = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
		for (var n = 0; n < o.length; n++) {
			if (m.indexOf(o.charAt(n)) === -1) {
				o = o.substring(n);
				break
			}
		}
		for (n = o.length - 1; n >= 0; n--) {
			if (m.indexOf(o.charAt(n)) === -1) {
				o = o.substring(0, n + 1);
				break
			}
		}
		return m.indexOf(o.charAt(0)) === -1 ? o : ""
	};
(function(v, x) {
		if (x.addEventListener) {
			g.addEvent = function(A, z, B) {
				A.addEventListener(z, B, false)
			};
			g.removeEvent = function(A, z, B) {
				A.removeEventListener(z, B, false)
			}
		} else {
			if (x.attachEvent) {
				g.addEvent = function(C, B, D) {
					if (C[B + D]) {
						return
					}
					var A, z;
					C["e" + B + D] = D;
					C[B + D] = function() {
						C["e" + B + D](window.event)
					};
					C.attachEvent("on" + B, C[B + D])
				};
				g.removeEvent = function(A, z, B) {
					A.detachEvent("on" + z, A[z + B]);
					A[z + B] = null
				}
			} else {
				g.addEvent = function(A, z, B) {
					A["on" + z] = B.call(A, v.event)
				};
				g.removeEvent = function(A, z, B) {
					A["on" + z] = null
				}
			}
		}
		var q = x && x.documentElement, r = q && q.doScroll, n = r
				? "readystatechange"
				: "DOMContentLoaded", w = false, m = [], p = !c.frm, u = "complete", y = 40, o = function() {
			w = true;
			var z;
			while (z = m.shift()) {
				try {
					z()
				} catch (A) {
					KSLITE.log(A)
				}
			}
		};
		function s() {
			try {
				q.doScroll("left");
				o()
			} catch (z) {
				KSLITE.log(z);
				setTimeout(s, y)
			}
		}
		function t() {
			if (/complete/.test(x.readyState)) {
				o()
			} else {
				setTimeout(t, y)
			}
		}
		if (r && p) {
			s()
		} else {
			t()
		}
		g.domReady = function(z) {
			if (w) {
				z()
			} else {
				m.push(z)
			}
		}
	})(window, document);
	g.tagName = function(m) {
		return m && m.tagName ? m.tagName.toLowerCase() : null
	};
	g.cssSupports = (function() {
		var o = document.createElement("div"), n = "Khtml Ms O Moz Webkit"
				.split(" "), m = n.length;
		return function(p) {
			if (p in o.style) {
				return true
			}
			p = p.replace(/^[a-z]/, function(q) {
						return q.toUpperCase()
					});
			while (m--) {
				if (n[m] + p in o.style) {
					return true
				}
			}
			return false
		}
	})();
	g.findMatchEl = function(o) {
		var m = g;
		try {
			if (o && m.tagName(o) != "a") {
				for (var n = 5; n > 0; n--) {
					if (o) {
						o = o.parentNode;
						if (m.tagName(o) == "a") {
							break
						}
					}
				}
				if (m.tagName(o) != "a") {
					o = 0
				}
			}
			return o
		} catch (p) {
			KSLITE.log(p);
			return null
		}
	};
	var i = g.buildQuery = function(r, m, p) {
		p = p || [];
		var n, q;
		if (m && d.iA(m)) {
			g.each(m, function(s, o) {
						if (r[s] !== q) {
							p.push(s + "=" + g.encode(r[s]))
						}
					})
		} else {
			for (n in r) {
				if (r.hasOwnProperty(n)) {
					p.push(n + "=" + g.encode(r[n]))
				}
			}
		}
		return p.join("&")
	};
	g.jsonpGet = function(n, r, z) {
		var y = z.cbKey || "callback";
		var u = z.timeout || 60000;
		var p = 0, s = 0, v = 0;
		var o;
		var q;
		if (window.null_data) {
			q = window.null_data
		}
		window.null_data = function() {
			if (q) {
				q()
			}
		};
		var x = !!z.testing ? jsonp_callback : "jsonp_callback_"
				+ Math.random().toString().replace(".", "");
		window[x] = function(B, A) {
			if (s) {
				return
			}
			clearTimeout(p);
			if (z.onCallback && d.iF(z.onCallback)) {
				z.onCallback(B, A)
			}
			w()
		};
		var m = {
			success : function() {
				v = 1
			}
		};
		var t = i(r, z.queryOrder, [y + "=" + x]);
		if (n.indexOf("?") < 0) {
			o = d.getScript(n + "?" + t, m)
		} else {
			o = d.getScript(n + "&" + t, m)
		}
		function w() {
			try {
				o.parentNode.removeChild(o);
				delete window[x]
			} catch (A) {
				window[x] = undefined
			}
		}
		p = setTimeout(function() {
					window[x](null, "Timeout");
					window[x] = function() {
						w()
					};
					s = 1
				}, u)
	};
	function k(n) {
		if (!n || !n.tagName) {
			return ""
		}
		if (n.outerHTML) {
			return n.outerHTML
		}
		var m, o = document.createElement("div");
		o.appendChild(n.cloneNode(true));
		m = el.innerHTML;
		el = null;
		return m
	}
	g.getAttrs = function(q) {
		var p = q.attributes;
		var t = p.length - 1;
		var o = {
			data : {},
			biz : {}
		};
		if (t < 15) {
			var m;
			while (t + 1) {
				m = p[t].name;
				if (m.indexOf("data-") == 0) {
					o.data[m.substr(5)] = p[t].value
				} else {
					if (m.indexOf("biz-") == 0) {
						o.biz[m.substr(4)] = p[t].value
					}
				}
				t--
			}
		} else {
			var s = k(q);
			s = s.replace(q.innerHTML, "");
			var r = /(data|biz)-(.+?)=("|').*?\3/g;
			while (t = r.exec(s)) {
				o[t[1]][t[2]] = q.getAttribute(t[1] + "-" + t[2]);
				if (t[5] == "") {
					break
				}
			}
		}
		return o
	};
	g.queryData = function(m, r) {
		r = r || {};
		var p = m.data, n;
		for (n in p) {
			if (p.hasOwnProperty(n) && a.oldAttr.indexOf("&" + n) > 0) {
				m.biz[n] = p[n];
				try {
					delete p[n]
				} catch (q) {
					p[n] = undefined
				}
			}
		}
		var o = c.cache;
		p.pid = p.pid || o.pid;
		p.rd = p.rd || o.rd;
		p.pgid = o.pgid;
		p.rf = o.ref;
		p.et = p.et || o.clicktime.et();
		p.v = r.v || "2.0";
		if (!p.unid && o.unid) {
			p.unid = o.unid
		}
		if (o.ak) {
			p.ak = o.ak
		}
		if (o.evid) {
			p.eid = o.evid
		}
		m.data.ct = g.buildQuery(m.biz);
		return m.data
	};
	var l = function(m, n, o) {
		switch (m.toLowerCase()) {
			case "beforebegin" :
				o.parentNode.insertBefore(n, o);
				break;
			case "afterbegin" :
				o.insertBefore(n, o.firstChild);
				break;
			case "beforeend" :
				o.appendChild(n);
				break;
			case "afterend" :
				if (o.nextSibling) {
					o.parentNode.insertBefore(n, o.nextSibling)
				} else {
					o.parentNode.appendChild(n)
				}
				break
		}
	};
	var h = function(q, o, m) {
		if (!o) {
			o = document.body;
			m = "beforeend"
		} else {
			if (!m) {
				m = "beforeend"
			}
		}
		if (o.insertAdjacentHTML) {
			return o.insertAdjacentHTML(m, q)
		}
		var p = o.ownerDocument.createRange();
		p.setStartBefore(o);
		var n = p.createContextualFragment(q);
		l(m, n, o);
		return n
	};
	var j = 0;
	g.buildWriteableIframe = function(o) {
		var m = {};
		o.id = o.id || "writeable_iframe_" + j++;
		(function n(s) {
			if (s > 20) {
				return false
			}
			var r = '<iframe id="' + o.id + '" width="' + o.width
					+ '" height="' + o.height + '" style="display:none"';
			var q = " src=\"javascript:document.write('<script>document.domain=\\'"
					+ document.domain + "\\';<\/script>');\"";
			var p = ' border="0" frameborder="0" scrolling="no" marginwidth="0" allowTransparency="true" marginheight="0"  style="border: 0pt none;"></iframe>';
			var t = r;
			if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
				document.domain = document.domain;
				t += q
			}
			t += p;
			h(t, o.holder, o.position);
			setTimeout(function() {
						try {
							var A = document.getElementById(o.id);
							var y = A.contentWindow;
							var w = y.document;
							w.open("text/html", "replace");
							if (t.indexOf("document.domain") > 0) {
								w.domain = document.domain
							}
							if (o.data && d.iA(o.data)) {
								var z = o.data;
								for (var v = 0; v < z.length; v++) {
									y[z[v].key] = z[v].value
								}
							}
							w.write(o.content);
							A.style.display = "";
							if (o.complete) {
								o.complete(A)
							}
							if (A.style.display == "none") {
								setTimeout(function() {
											A.style.display = ""
										}, 200)
							}
						} catch (u) {
							A.parentNode.removeChild(A);
							if (!s) {
								s = 1
							} else {
								s++
							}
							n(s)
						}
					}, 20)
		})()
	};
	e.c = a;
	e.r = c;
	e.u = g;
	e.ready = function(m) {
		if (f) {
			return m()
		}
		var n = setTimeout(function() {
					c._maxwin(window);
					f = true;
					m()
				}, 50);
		c._maxwin();
		clearTimeout(n);
		f = true;
		m()
	}
});
KSLITE.declare("tkapi-param", ["tkapi-config"], function(d, g) {
	var h = d("tkapi-config"), j = h.c, a = h.r, l = h.u;
	var f = KSLITE;
	var e = {};
	var k = {};
	e.getPageUrl = function() {
		return l.encode(a.getRef_url())
	};
	e.getCbhAndCbw = function() {
		var m, c = 1, n = -1;
		m = a.maxwin.document;
		c = m.documentElement.clientHeight || m.body.clientHeight;
		n = m.documentElement.clientWidth || m.body.clientWidth;
		return "cbh=" + c + "&cbw=" + n
	};
	e.getScreenInfo = function() {
		var n = a.maxwin.screen, c = 0, r = 0, m = 0, p = 0, q = 0;
		try {
			c = n.width;
			r = n.height;
			m = n.availHeight;
			p = n.availWidth;
			q = n.colorDepth
		} catch (o) {
			KSLITE.log(o)
		}
		return "re=" + c + "x" + r + "&cah=" + m + "&caw=" + p + "&ccd=" + q
	};
	e.getFlashVersion = function() {
		var c = "-1", q = navigator, n, m;
		if (q.plugins && q.plugins.length) {
			for (n = 0; n < q.plugins.length; n++) {
				if (q.plugins[n].name.indexOf("Shockwave Flash") != -1) {
					c = q.plugins[n].description.split("Shockwave Flash ")[1];
					break
				}
			}
		} else {
			if (window.ActiveXObject) {
				for (m = 10; m >= 2; m--) {
					try {
						var o = new Function("return new ActiveXObject('ShockwaveFlash.ShockwaveFlash."
								+ m + "');");
						if (o) {
							c = m + ".0";
							break
						}
					} catch (p) {
						KSLITE.log(p)
					}
				}
			}
		}
		if (c != "-1") {
			c = c.substring(0, c.indexOf(".") + 2)
		}
		return "cf=" + c
	};
	e.getBrowserInfo = function() {
		var c = [], m = navigator;
		c.push("ctz=" + (-((new Date()).getTimezoneOffset() / 60)));
		c.push("chl=" + history.length);
		c.push("cja=" + (m.javaEnabled() ? "1" : "0"));
		c.push("cpl=" + (m.plugins ? m.plugins.length : 0));
		c.push("cmm=" + (m.mimeTypes ? m.mimeTypes.length : 0));
		c.push(e.getFlashVersion());
		return c.join("&")
	};
	e.pageid = function() {
		var m = "", c = "", o, p, u, v, t = location, n = "", r = Math;
		function s(y, A) {
			var z = "", w = 1, x;
			w = Math.floor(y.length / A);
			if (w == 1) {
				z = y.substr(0, A)
			} else {
				for (x = 0; x < A; x++) {
					z += y.substr(x * w, 1)
				}
			}
			return z
		}
		if (a.ali) {
			o = (" " + a.d.cookie).split(";");
			for (p = 0; p < o.length; p++) {
				if (o[p].indexOf(" cna=") === 0) {
					c = o[p].substr(5, 24);
					break
				}
			}
		}
		if (c === "") {
			cu = (t.search.length > 9) ? t.search : ((t.pathname.length > 9)
					? t.pathname
					: t.href).substr(1);
			o = document.cookie.split(";");
			for (p = 0; p < o.length; p++) {
				if (o[p].split("=").length > 1) {
					n += o[p].split("=")[1]
				}
			}
			if (n.length < 16) {
				n += "abcdef0123456789"
			}
			c = s(cu, 8) + s(n, 16)
		}
		for (p = 1; p <= 32; p++) {
			u = r.floor(r.random() * 16);
			if (c && p <= c.length) {
				v = c.charCodeAt(p - 1);
				u = (u + v) % 16
			}
			m += u.toString(16)
		}
		if (!a.frm) {
			l.setCookie(j.cookieKey, m)
		}
		var q = l.getCookie(j.cookieKey);
		if (q) {
			return q
		}
		return m
	};
	k.et = function() {
		var v = new Date(), n = +v / 1000 | 0, u = v.getTimezoneOffset() * 60, r = n
				+ u, o = r + (3600 * 8), s = o.toString().substr(2, 8)
				.split(""), q = [6, 3, 7, 1, 5, 2, 0, 4], p = [];
		for (var m = 0; m < q.length; m++) {
			p.push(s[q[m]])
		}
		p[2] = 9 - p[2];
		p[4] = 9 - p[4];
		p[5] = 9 - p[5];
		return p.join("")
	};
	function i(m) {
		var n = f.mix({}, m);
		for (var c = j.para.length - 1; c > -1; c--) {
			n[j.para[c]] = m[j.para[c]] || ""
		}
		return n
	}
	function b(c) {
		return {
			pgid : e.pageid(),
			pid : c.pid,
			ref : a.getRef_url(),
			unid : c.unid,
			ak : c.appkey,
			rd : (c.rd == 1) ? c.rd : 2,
			link_profit : c.link_profit == "off" ? 0 : 1,
			evid : c.evid,
			pp : [e.getCbhAndCbw(), e.getScreenInfo(), e.getBrowserInfo()]
					.join("&")
		}
	}
	g.Def = function(m, n, c) {
		var m = i(m);
		a.cache = a.cache ? a.cache : b(m);
		a.cache.clicktime = k;
		n(a.cache);
		c(a.cache)
	}
});
KSLITE.declare("tkapi-bindclick", ["tkapi-config"], function(d, e) {
			var f = d("tkapi-config"), g = f.c, a = f.r, j = f.u;
			var b = "http://g.click.taobao.com/q?";
			var h = function(o) {
				var u, w;
				var k = j.getAttr(o, "href");
				var n = j.getAttr(o, "_orighref");
				if (!n && !j.getAttr(o, "_tkworked")) {
					j.setAttr(o, "_orighref", k);
					j.setAttr(o, "_tkworked", "true");
					n = k
				}
				var l = j.getAttrs(o);
				var p = (n.match(/(?:http:)?\/\/([^\/]+)/i) || ["", ""])[1], r = !!p
						.match(/.+(\.taobao\.com|\.tmall\.com)$/ig), m = !!p
						.match(/.+(\.click\.taobao\.com)$/ig), q = !!(l.biz.itemid
						|| l.biz.sellerid
						|| l.biz.keyword
						|| l.data.itemid
						|| l.data.sellerid || l.data.keyword);
				if (!q) {
					if (m) {
						return undefined
					}
					if (!r) {
						return undefined
					}
					if (!a.cache.link_profit
							&& /item\.taobao|detail\.tmall/.test(p)) {
						return undefined
					}
				}
				if (n) {
					l.biz.url = n
				}
				var s = j.queryData(l, {
							v : "1.1"
						});
				var c = b + j.buildQuery(s, g.queryOrder);
				return c
			};
			function i(n, l) {
				var c = n, m = c.srcElement || c.target;
				m = j.findMatchEl(m);
				if (m) {
					var k = h(m), o = m.innerText || "";
					if (j.trim(o) != j.trim(m.href)) {
						o = null
					}
					if (k) {
						j.setAttr(m, "href", k);
						if (o) {
							m.innerText = o
						}
					}
				}
			}
			e.Def = function(c) {
				function k(l) {
					i(l, c)
				}
				j.addEvent(document, "mousedown", k)
			}
		});
KSLITE.declare("tkapi-box-helper", ["tkapi-config"], function(e, f) {
	var g = e("tkapi-config"), h = g.c, a = g.r, k = g.u;
	var i = 0, j = document;
	j.createElement("tkbox");
	f.uniqId = function() {
		return ++i
	};
	var b = {
		"data-type" : "tp",
		"data-itemid" : "nid",
		"data-tmpl" : "tl",
		"data-style" : "st",
		"data-sellerid" : "sid",
		"data-keyword" : "kw",
		"data-bucketid" : "bid",
		"data-count" : "ct",
		"data-cid" : "cid",
		"data-for" : "fr"
	};
	f.buildQuery = function(l) {
		var c = [];
		k.each(b, function(m, n) {
					var o = k.getAttr(l, n);
					if (o) {
						c.push(m + "=" + k.encode(o))
					}
				});
		c.push("rd=" + (k.getAttr(l, "data-rd") || a.cache.rd));
		c.push("pid=" + (k.getAttr(l, "data-pid") || a.cache["data-pid"]));
		c.push("pgid=" + a.cache.pgid);
		c.push("unid=" + (k.getAttr(l, "data-unid") || a.cache["data-unid"]));
		c.push("ak=" + a.cache.ak);
		c.push("evid=" + a.cache.evid);
		c.push("ref=" + a.cache.ref);
		c.push("et=" + a.cache.clicktime.et());
		return c.join("&")
	};
	f.checkParams = function(c) {
		if (!c.data.type) {
			return 0
		}
		return 1
	};
	f.isInView = function(l) {
		var c = (j.documentElement.clientHeight || j.body.clientHeight) * 2, m = k
				.getElClientRect(l);
		return m.top > 0 && (c - m.top > m.height)
	};
	f.tplParser = function(c, l) {
		k.each(l, function(m, n) {
					c = c.replace(new RegExp("{" + n + "}", "g"), m)
				});
		return c
	};
	f.buildIframeHTML = function(l) {
		var c = '<iframe  frameborder="0" style="border:none;width:{width}px;height:{height}px;overflow:hidden" scrolling="no" src="{src}" ></iframe>';
		return f.tplParser(c, l)
	};
	f.styleTplParser = function(c, n) {
		var l = KSLITE.mix({}, n), m = "";
		l = KSLITE.mix(l, c, false);
		k.each(l, function(o, p) {
					if ((o - 0) == o) {
						o = o + "px"
					}
					m = m += p + ":" + o + ";"
				});
		return m
	};
	var d = "http://g.click.taobao.com/display";
	f.fetchData = function(c, l) {
		c.wt = c.type;
		c.index && (c.wi = c.index);
		c.tmplid && (c.ti = c.tmplid);
		c.tmpl && (c.tl = c.tmpl);
		c.style && (c.st = c.style);
		k.jsonpGet(d, c, {
					cbKey : "cb",
					queryOrder : h.queryOrder,
					onCallback : function(n, m) {
						if (m) {
							n = {
								code : -1
							}
						}
						if (n.code) {
							return
						}
						l(n)
					}
				})
	};
	f.template = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html><head> <title> GOLDEN TAOKE > ARBITER > ArbiterEntityView - Powered By Arbiter </title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/></head><body style="margin: 0"><script type="text/javascript" src="%template%"><\/script></body></html>'
});
KSLITE.declare("tkapi-tipbox", ["tkapi-config", "tkapi-box-helper"], function(
		g, w) {
	var d = g("tkapi-config"), a = g("tkapi-box-helper"), t = d.c, k = d.r, i = d.u;
	var y = "_tk_box_index", o = "http://g.click.taobao.com/display", x = document;
	var f = i.cssSupports("transform");
	var l = !-[1,] && !window.XMLHttpRequest;
	var j = "http://img01.taobaocdn.com/tps/i1/T1WPlHXr4aXXXDSPLj-60-34.png";
	var z = 7, n = 12, q = {
		box : {
			position : "absolute",
			"text-indent" : "0px",
			left : "0px",
			top : "0px",
			"z-index" : "1000;"
		},
		inner : {
			border : "1px solid #d9d9d9",
			margin : "{margin}",
			padding : "5px",
			background : "#FFF",
			height : "{height}px",
			"box-shadow" : "-1px 2px 4px #CCC",
			width : "{width}px"
		},
		arrowInner : {
			border : "solid 1px #CCC",
			height : "10px",
			background : "white",
			"box-shadow" : "#CCC -1px 3px 3px",
			position : "relative"
		},
		arrowOuter : {
			overflow : "hidden",
			height : "12px",
			width : "18px",
			position : "absolute",
			border : "none"
		},
		arrowImage : "background: url(" + j + ") no-repeat",
		arrowImage_ie6 : "width:60px;height:34px;position:relative;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
				+ j + "', sizingMethod='crop');"
	}, b = {
		topleft : function(c) {
			return {
				box : a.styleTplParser(q.box, {
							top : c.top,
							left : c.left
						}),
				inner : a.styleTplParser(q.inner, KSLITE.mix({
									margin : "0 0 7px 0"
								}, c)),
				arrowInner : a.styleTplParser(q.arrowInner, {
							"-webkit-transform" : "matrix(1,-0.6,0,1,0,3)",
							"-moz-transform" : "matrix(1,-0.6,0,1,0px,3px)",
							"-ms-transform" : "matrix(1,-0.6,0,1,0,3)",
							"-o-transform" : "matrix(1,-0.6,0,1,0,3)",
							transform : "matrix(1,-0.6,0,1,0,3)",
							bottom : "10px",
							left : "3px"
						}),
				arrowOuter : a.styleTplParser(q.arrowOuter, {
							bottom : "-3px",
							left : "-3px"
						}),
				arrowImage : q.arrowImage + " -33px -22px;",
				arrowImage_ie6 : q.arrowImage_ie6 + "left:-33px;top:-22px;"
			}
		},
		topright : function(c) {
			return {
				box : a.styleTplParser(q.box, {
							top : c.top,
							left : c.left
						}),
				inner : a.styleTplParser(q.inner, KSLITE.mix({
									margin : "0 0 7px 0"
								}, c)),
				arrowInner : a.styleTplParser(q.arrowInner, {
							"-webkit-transform" : "matrix(1,0.6,0,1,0,3)",
							"-moz-transform" : "matrix(1,0.6,0,1,0px,3px)",
							"-ms-transform" : "matrix(1,0.6,0,1,0,3)",
							"-o-transform" : "matrix(1,0.6,0,1,0,3)",
							transform : "matrix(1,0.6,0,1,0,3)",
							bottom : "10px",
							right : "3px"
						}),
				arrowOuter : a.styleTplParser(q.arrowOuter, {
							bottom : "-3px",
							right : "-3px"
						}),
				arrowImage : q.arrowImage + " -9px -22px;",
				arrowImage_ie6 : q.arrowImage_ie6 + "left:-9px;top:-22px;"
			}
		},
		bottomleft : function(c) {
			return {
				box : a.styleTplParser(q.box, {
							top : c.top,
							left : c.left
						}),
				inner : a.styleTplParser(q.inner, KSLITE.mix({
									margin : "7px 0 0 0"
								}, c)),
				arrowInner : a.styleTplParser(q.arrowInner, {
							"-webkit-transform" : "matrix(1,0.6,0,1,0,3)",
							"-moz-transform" : "matrix(1,0.6,0,1,0px,3px)",
							"-ms-transform" : "matrix(1,0.6,0,1,0,3)",
							"-o-transform" : "matrix(1,0.6,0,1,0,3)",
							transform : "matrix(1,0.6,0,1,0,3)",
							top : "3px",
							left : "3px"
						}),
				arrowOuter : a.styleTplParser(q.arrowOuter, {
							top : "-3px",
							left : "-3px"
						}),
				arrowImage : q.arrowImage + " 3px 0px;",
				arrowImage_ie6 : q.arrowImage_ie6 + "left:3px;top:0px;"
			}
		},
		bottomright : function(c) {
			return {
				box : a.styleTplParser(q.box, {
							top : c.top,
							left : c.left
						}),
				inner : a.styleTplParser(q.inner, KSLITE.mix({
									margin : "7px 0 0 0"
								}, c)),
				arrowInner : a.styleTplParser(q.arrowInner, {
							"-webkit-transform" : "matrix(1,-0.6,0,1,0,3)",
							"-moz-transform" : "matrix(1,-0.6,0,1,0px,3px)",
							"-ms-transform" : "matrix(1,-0.6,0,1,0,3)",
							"-o-transform" : "matrix(1,-0.6,0,1,0,3)",
							transform : "matrix(1,-0.6,0,1,0,3)",
							top : "3px",
							right : "3px"
						}),
				arrowOuter : a.styleTplParser(q.arrowOuter, {
							top : "-3px",
							right : "-3px"
						}),
				arrowImage : q.arrowImage + " -45px 0px;",
				arrowImage_ie6 : q.arrowImage_ie6 + "left:-45px;top:0px;"
			}
		}
	};
	function h(B) {
		var C = a.uniqId(), r = x.createElement("tkbox"), c = '                <div id="tk_box_inner_{uniqId}"></div>                <div id="tk_box_arrow_outer_{uniqId}">                    <div id="tk_box_arrow_inner_{uniqId}"></div>                </div>';
		r.id = "tk_box_" + C;
		r.innerHTML = c.replace(/\{uniqId\}/g, C);
		x.body.appendChild(r);
		i.setAttr(r, y, C);
		var A = {
			width : B.box.width,
			height : B.box.height,
			data : [{
						key : "UP_DATA",
						value : B.data
					}],
			content : a.template.replace("%template%", B.templet),
			holder : x.getElementById("tk_box_inner_" + C),
			position : "beforeend"
		};
		var u = i.buildWriteableIframe(A);
		return {
			box : r,
			iframe : u,
			uniqId : C
		}
	}
	var e = 0;
	var p = [];
	w.onMouseover = function(c) {
		w.clearHideTimer.call(c);
		var A = i.getAttr(c, y);
		if (A === "0") {
			return false
		} else {
			if (A && e == A) {
				return false
			} else {
				i.hide(document.getElementById("tk_box_" + e))
			}
		}
		var r = document.getElementById("tk_box_" + A);
		if (r) {
			return v(r, c)
		}
		var u = i.getAttrs(c);
		i.setAttr(c, y, "0");
		if (!a.checkParams(u)) {
			return false
		}
		u = i.queryData(u);
		a.fetchData(u, function(C) {
					var B = h(C);
					i.setAttr(c, y, B.uniqId);
					B.box.size = C.box;
					B.box.uniqId = B.uniqId;
					v(B.box, c)
				})
	};
	function m(F, B) {
		var u = x.documentElement, C = x.body, E = (u.clientHeight || C.clientHeight), G = (u.clientWidth || C.clientWidth), A = (u.scrollTop || C.scrollTop), K = i
				.getElClientRect(B), J = 0, D = 0, H = "";
		var L = F.size.height, r = F.size.width, I = F.uniqId;
		if (E > K.top && K.top > (z + L)) {
			H = "top";
			J = K.top + A - L - z - 12
		} else {
			H = "bottom";
			J = K.top + K.height + A
		}
		if (K.left + r < G) {
			H += "left";
			D = K.left
		} else {
			H += "right";
			D = Math.min(K.left + K.width, G) - (r + 12) - 2
		}
		var c = b[H]({
					top : J,
					left : D,
					height : L,
					width : r
				});
		x.getElementById("tk_box_" + I).style.cssText = c.box;
		x.getElementById("tk_box_inner_" + I).style.cssText = c.inner;
		if (f) {
			x.getElementById("tk_box_arrow_outer_" + I).style.cssText = c.arrowOuter;
			x.getElementById("tk_box_arrow_inner_" + I).style.cssText = c.arrowInner
		} else {
			if (l) {
				x.getElementById("tk_box_arrow_outer_" + I).style.cssText = c.arrowOuter;
				x.getElementById("tk_box_arrow_inner_" + I).style.cssText = c.arrowImage_ie6
			} else {
				x.getElementById("tk_box_arrow_outer_" + I).style.cssText = c.arrowOuter
						+ c.arrowImage
			}
		}
	}
	var s = {};
	function v(r, c) {
		m(r, c);
		i.addEvent(c, "mouseout", w.hide);
		i.addEvent(r, "mouseover", w.clearHideTimer);
		i.addEvent(r, "mouseout", w.hide);
		r.tklink_element = c
	}
	w.hide = function(r) {
		var c = this;
		var u = i.getAttr(this, y);
		s[u] && window.clearTimeout(s[u]);
		s[u] = setTimeout(function() {
					var B = c;
					e = 0;
					var A = document.getElementById("tk_box_" + u);
					i.hide(A);
					if (c == A && A.tklink_element) {
						i.removeEvent(A.tklink_element, "mouseout", w.hide)
					} else {
						i.removeEvent(B, "mouseout", w.hide)
					}
					i.removeEvent(A, "mouseout", w.hide);
					i.removeEvent(A, "mouseover", w.clearHideTimer)
				}, 250)
	};
	w.clearHideTimer = function() {
		var c = i.getAttr(this, y);
		window.clearTimeout(s[c])
	}
});
KSLITE.declare("tkapi-replacebox", ["tkapi-config", "tkapi-box-helper"],
		function(e, f) {
			var h = e("tkapi-config"), d = e("tkapi-box-helper"), i = h.c, a = h.r, k = h.u;
			var g = "_tk_rb_index", j = document, b = "http://g.click.taobao.com/display";
			f.scrollHandle = function() {
				var c = [];
				if (document.querySelectorAll) {
					c = k.nodeList2Array(document
							.querySelectorAll('a[data-style="2"]'))
				} else {
					var l = k
							.nodeList2Array(document.getElementsByTagName("a"));
					k.each(l, function(m, n) {
								if (k.getAttr(m, "data-style") == 2) {
									c.push(m)
								}
							})
				}
				k.each(c, function(m, n) {
							if (k.getAttr(m, g)) {
								return false
							}
							if (d.isInView(m)) {
								f.show(m)
							}
						})
			};
			f.show = function(l) {
				if (k.getAttr(l, g)) {
					return
				}
				var c = k.getAttrs(l);
				k.setAttr(l, g, "0");
				if (!d.checkParams(c)) {
					return false
				}
				var m = k.queryData(c);
				d.fetchData(m, function(q) {
							var n = j.createElement("tkbox"), r = d.uniqId();
							n.id = "tk_box_" + r;
							n.style.cssText = d.styleTplParser({
										border : "1px solid #d9d9d9",
										"text-indent" : "0px",
										display : "block",
										width : q.box.width,
										height : q.box.height
									});
							l.parentNode.insertBefore(n, l);
							k.hide(l);
							k.setAttr(l, g, r);
							var p = {
								width : q.box.width,
								height : q.box.height,
								content : q.content,
								data : [{
											key : "UP_DATA",
											value : q.data
										}],
								content : d.template.replace("%template%",
										q.templet),
								holder : n,
								position : "beforeend"
							};
							var o = k.buildWriteableIframe(p)
						})
			}
		});
KSLITE.declare("tkapi-boot", ["tkapi-config", "tkapi-tipbox",
				"tkapi-replacebox"], function(d, b) {
			var a = d("tkapi-config"), f = d("tkapi-tipbox"), e = d("tkapi-replacebox"), c = a.u;
			b.Def = function() {
				c.addEvent(document, "mouseover", function(i) {
							var h = i.target || i.srcElement;
							if (c.getAttr(h, "data-style")) {
								f.onMouseover(h)
							}
						});
				var g;
				c.addEvent(window, "scroll", function() {
							if (g) {
								window.clearTimeout(g)
							}
							g = setTimeout(e.scrollHandle, 80)
						});
				c.domReady(e.scrollHandle)
			}
		});
KSLITE.declare("tkapi-load", ["tkapi-config"], function(e, b) {
			var a = e("tkapi-config"), g = a.c, f = a.r, d = a.u;
			b.Def = function(h) {
				var c = [];
				function i(l, j) {
					if (!!j) {
						c.push(l + (l ? "=" : "") + j)
					}
				}
				i("rf", d.encode(f.cache.ref));
				i("pid", f.cache.pid);
				i("pgid", f.cache.pgid);
				i("ak", f.cache.ak);
				i("", f.cache.pp);
				KSLITE.getScript(g.alimama + "load?" + c.join("&"));
				(new Image()).src = "http://acookie.taobao.com/1.gif"
			}
		});
KSLITE.declare("tkapi-plugin-api", ["tkapi-config"], function(c, b) {
			var a = c("tkapi-config");
			S = KSLITE;
			var d;
			b.tklink = function(j, i, h) {
				if (!S.iPO(i)) {
					return null
				}
				var g, f = document.createElement("a");
				f.href = i.href;
				f.appendChild(document.createTextNode(j));
				for (g in i) {
					if (i.hasOwnProperty(g) && g != "href") {
						f.setAttribute("data-" + g, i[g])
					}
				}
				if (h) {
					if (!d) {
						d = document.createElement("div")
					}
					d.innerHTML = "";
					d.appendChild(f);
					return d.innerHTML
				} else {
					return f
				}
			};
			var e;
			b.getElementsFor = function(h) {
				var g = {};
				var k = [];
				e = e || document.getElementsByTagName("*");
				var f;
				for (var j = 0; j < e.length; j++) {
					if (f = e[j].getAttribute("data-plugin")) {
						if (f.indexOf(",")) {
							f = f.split(",")[0]
						}
						if (!g[f]) {
							g[f] = []
						}
						g[f].push(e[j])
					}
				}
				return g[h] || []
			};
			b.jsonpGet = a.u.jsonpGet;
			b.util = a.u
		});
KSLITE.declare("tkapi-plugin", ["tkapi-plugin-api"], function(c, b) {
			var d = KSLITE;
			var a = b.taskQueue = {
				num : 0,
				queue : [],
				waiting : 0,
				onLoad : function() {
					var e = a;
					var f = 0;
					var g = e.queue[e.waiting];
					if (g) {
						e.queue[e.waiting] = 0;
						if (g === -1 || !g.Def) {
							e.waiting++;
							return setTimeout(e.onLoad)
						}
						f = setTimeout(function() {
									e.waiting++;
									f = 0;
									setTimeout(e.onLoad)
								}, 2000);
						g.Def(function(h) {
									if (f == 0) {
										return
									}
									e.waiting++;
									clearTimeout(f);
									setTimeout(e.onLoad)
								})
					}
				},
				addTask : function(g, e) {
					var j = this.num++;
					var f = this;
					var h = 0;
					var k = function(i) {
						clearTimeout(h);
						f.queue[j] = (i === undefined) ? -1 : i;
						f.onLoad()
					};
					h = setTimeout(k, 10000);
					e(k, g)
				}
			};
			b.Def = function(e) {
				if (!e) {
					return
				}
				if (!d.iA(e) || !e.length) {
					return
				}
				var g, h;
				for (var f = 0; f < e.length; f++) {
					g = e[f];
					a.addTask(g.name, function(i, j) {
								j = "tkapi-plugin-" + j;
								d.provide([j], function(k) {
											i(k(j))
										})
							})
				}
			}
		});

/* pub-1|2013-05-21 11:28:03 */(function(e, f, j) {
	var m = {
		lt_pkgs : {
			tkapi : "http://a.alimama.cn/",
			packages : "http://a.alimama.cn/kslite/",
			charset : "utf8"
		},
		lt_v : "1.0.0",
		lt_t : "20130226.js"
	};
	if (e[f] === j) {
		e[f] = {}
	} else {
		KSLITE.Config.lt_pkgs = KSLITE.mix(m.lt_pkgs, KSLITE.Config.lt_pkgs);
		var h = KSLITE.getScript;
		KSLITE.getScript = function(t, u, w, v) {
			if (t.indexOf("/tkapi/")) {
				return h(t, u, "utf-8", v)
			} else {
				return h(t, u, "gbk", v)
			}
		};
		return
	}
	var l = e.KSLITEonLoad, d = e.KSLITEpkgPaths;
	f = e[f];
	var s = e.document;
	var p = Object.prototype.toString;
	var n = function(x, w, v, z) {
		if (!w || !x) {
			return x
		}
		if (v === j) {
			v = true
		}
		var u, y, t;
		if (z && (t = z.length)) {
			for (u = 0; u < t; u++) {
				y = z[u];
				if (y in w) {
					if (v || !(y in x)) {
						x[y] = w[y]
					}
				}
			}
		} else {
			for (y in w) {
				if (v || !(y in x)) {
					x[y] = w[y]
				}
			}
		}
		return x
	};
	var i = s.getElementsByTagName("head")[0] || s.documentElement;
	var a = 0, r = 1, g = 2, k = 3, c = 4, b = /\.css(?:\?|$)/i;
	var o = s.createElement("script").readyState ? function(u, v) {
		var t = u.onreadystatechange;
		u.onreadystatechange = function() {
			var w = u.readyState;
			if (w === "loaded" || w === "complete") {
				u.onreadystatechange = null;
				if (t) {
					t()
				}
				v.call(this)
			}
		}
	} : function(t, u) {
		t.addEventListener("load", u, false);
		t.addEventListener("error", u, false)
	};
	function q() {
		if (navigator.userAgent.indexOf("MSIE") < 0) {
			return null
		}
		var u = i.getElementsByTagName("script");
		var v, w = 0, t = u.length;
		for (; w < t; w++) {
			v = u[w];
			if (v.readyState === "interactive") {
				return v
			}
		}
		return null
	}
	n(f, {
				version : m.lt_v,
				_init : function() {
					var v, w, u = s.getElementsByTagName("script");
					if (!window.KSLITEcurrentScript) {
						for (v = 0; v < u.length; v++) {
							if (u[v].kslite) {
								window.KSLITEcurrentScript = u[v];
								break
							}
						}
					}
					w = window.KSLITEcurrentScript || u[u.length - 1];
					window.KSLITEcurrentScript = w;
					var z = (w.src).split("/").slice(0, -1).join("/") + "/";
					f.Env = {
						mods : {},
						fns : {},
						_loadQueue : {},
						_relies : {
							rq : {},
							sp : {}
						}
					};
					f.Config = {
						debug : "",
						base : z,
						timeout : 10,
						kslite : m
					};
					f.mix(f.Config, m);
					f.declare("kslite", [], function(A, x) {
								x = f.mix(x, f, true, ["path", "log",
												"getScript", "substitute",
												"clone", "mix", "multiAsync",
												"extend", "iA", "iF", "iPO",
												"iS"])
							});
					f.provide(["kslite"], function(x) {
								f.require("kslite").log("kslite inited")
							});
					if (f.Config.debug) {
						m.lt_t += (new Date()).getTime() + ".js"
					}
					var y;
					function t(A) {
						var x = A.split("@");
						m.lt_pkgs[x[0]] = x[1]
					}
					e.KSLITEpkgPaths = {
						push : function(x) {
							t(x)
						}
					};
					if (d && f.iA(d)) {
						for (y = 0; y < d.length; y++) {
							t(d[y])
						}
					}
					m.lt_t = e.KSLITEtimestamp || m.lt_t;
					e.KSLITEonLoad = {
						push : function(x) {
							if (x && f.iF(x)) {
								x(f)
							}
						}
					};
					if (l && f.iA(l)) {
						for (y = 0; y < l.length; y++) {
							if (f.iF(l[y])) {
								l[y](f)
							}
						}
					}
				},
				mix : n,
				log : function(v, t, u) {
					if (f.Config.debug) {
						if (e.console !== j && console.log) {
							console[t && console[t] ? t : "log"](v)
						}
					}
					return f
				},
				clone : function(w) {
					var v = w, t, u;
					if (w && ((t = f.iA(w)) || f.iPO(w))) {
						v = t ? [] : {};
						for (u in w) {
							if (w.hasOwnProperty(u)) {
								v[u] = f.clone(w[u])
							}
						}
					}
					return v
				},
				extend : function(x, w, u, A) {
					if (!w || !x) {
						return x
					}
					var t = Object.prototype, z = function(C) {
						function B() {
						}
						B.prototype = C;
						return new B()
					}, y = w.prototype, v = z(y);
					x.prototype = v;
					v.constructor = x;
					x.superclass = y;
					if (w !== Object && y.constructor === t.constructor) {
						y.constructor = w
					}
					if (u) {
						n(v, u)
					}
					if (A) {
						n(x, A)
					}
					return x
				},
				substitute : function(w, v, u, t) {
					if (!f.iS(w) || !f.iPO(v)) {
						return w
					}
					return w.replace(u || (/\\?\{([^{}]+)\}/g), function(y, x) {
								if (y.charAt(0) === "\\") {
									return y.slice(1)
								}
								return (v[x] !== j) ? v[x] : (t ? y : "")
							})
				},
				getScript : function(t, C, x, B) {
					var D = b.test(t), w = s.createElement(D
							? "link"
							: "script");
					var v = C, z, A, u, y;
					if (f.iPO(v)) {
						C = v.success;
						z = v.error;
						A = v.timeout;
						x = v.charset
					}
					if (D) {
						w.href = t;
						w.rel = "stylesheet"
					} else {
						w.src = t;
						w.async = true
					}
					if (x) {
						w.charset = x
					}
					if (B) {
						for (y in B) {
							w.setAttribute(y, B[y])
						}
					}
					if (f.iF(C)) {
						if (D) {
							C.call(w)
						} else {
							o(w, function() {
										if (u) {
											clearTimeout(u);
											u = j
										}
										C.call(w)
									})
						}
					}
					if (f.iF(z)) {
						u = setTimeout(function() {
									u = j;
									z()
								}, (A || f.Config.timeout) * 1000)
					}
					i.insertBefore(w, i.firstChild);
					return w
				},
				iF : function(t) {
					return p.call(t) === "[object Function]"
				},
				iA : function(t) {
					return p.call(t) === "[object Array]"
				},
				iS : function(t) {
					return p.call(t) === "[object String]"
				},
				iPO : function(t) {
					return t && p.call(t) === "[object Object]" && !t.nodeType
							&& !t.setInterval
				},
				add : function(u, w, t) {
					var x = f.Env.mods, v;
					if (x[u] && x[u].status > a) {
						return
					}
					v = {
						name : u,
						fn : w || null,
						status : g
					};
					if (f.iA(t)) {
						t = {
							requires : t
						}
					}
					n(v, t);
					x[u] = v;
					return f
				},
				use : function(t, v) {
					t = t.split(",");
					var u = f.Env.mods;
					f._aMs(t, function() {
								if (v) {
									v(f)
								}
							})
				},
				_aMs : function(t, w) {
					var u, v = {};
					for (u = 0; u < t.length; u++) {
						v[t[u]] = {
							f : f._aM,
							a : t[u]
						}
					}
					f.multiAsync(v, w)
				},
				_aM : function(y, x) {
					var u, B;
					var z = f.Env.mods, t = f.Env._relies.rq, w = f.Env._relies.sp;
					function v(C) {
						if (C.status != c) {
							if (C.fn) {
								f.log("attach " + C.name);
								C.fn(f, f.require(C.name), f._ns(C.name))
							} else {
								f
										.log(
												"attach "
														+ C.name
														+ " without expected attach fn!",
												"warn")
							}
							C.status = c
						}
						x()
					}
					function A(F) {
						var E, G, I, C, H;
						function D(J) {
							t[J] = t[J] || {};
							w[J] = w[J] || {};
							return J
						}
						G = D(F.name);
						for (E = 0; E < F.requires.length; E++) {
							I = D(F.requires[E]);
							t[G][I] = 1;
							w[I][G] = 1;
							for (H in w[G]) {
								t[H][I] = 1;
								w[I][H] = 1
							}
						}
					}
					u = z[y];
					if (u && u.status !== a) {
						B = u.requires;
						if (f.iA(B) && B.length > 0) {
							A(u);
							if (t[y][y]) {
								throw new Error("Fatal Error,Loop Reqs:"
										+ u.name)
							}
							f.log(u.name + " to req: " + B);
							f._aMs(B, function() {
										v(u)
									})
						} else {
							v(u)
						}
					} else {
						u = {
							name : y
						};
						f._lM(u, function() {
									f._aM(y, function() {
												v(z[y])
											})
								})
					}
				},
				_lM : function(u, z) {
					var t = f.Env._loadQueue, x = u.name, v;
					var w = f.Env.mods;
					if (t[x]) {
						v = t[x];
						if (v.c) {
							f.log(x + " is already loaded", "warn");
							z()
						} else {
							f.log(x + " is loading,listen to callback");
							v.fns.push(z)
						}
					} else {
						if (typeof t[x] != "undefined") {
							try {
								t[x].fns.push(z)
							} catch (y) {
								t[x].fns = [z]
							}
						} else {
							t[x] = {
								fns : [z],
								c : false
							}
						}
						f._gPath(u, function() {
									if (!w[x]) {
										w[x] = {
											name : x,
											status : a
										}
									}
									var A;
									if (u.fullpath.indexOf("/tkapi/")) {
										A = "utf8"
									} else {
										A = "gbk"
									}
									f.getScript(u.fullpath, function() {
												var C, D = t[x], B;
												if (f.__m__) {
													B = f.__m__;
													f.add(x, B.fn, B.deps);
													f.__m__ = null
												}
												if (w[x].status === a) {
													w[x].status = g
												}
												for (C = 0; C < D.fns.length; C++) {
													D.fns[C]()
												}
												D.c = true;
												D.fns = j
											}, A, {
												mod_name : x
											})
								})
					}
				},
				path : function(u, x) {
					var t = u.split("-"), w = t[0], v = f.Config.lt_pkgs;
					if (f.iS(v[w])) {
						x(v[w] + t.join("/"))
					} else {
						KSLITE.provide(["packages-router"], function(y) {
									var z = y("packages-router");
									x((z[w] || f.Config.base) + t.join("/"))
								})
					}
				},
				_gPath : function(t, u) {
					f.path(t.name, function(v) {
								t.fullpath = v + ".js?_t=" + m.lt_t;
								f.log("path " + t.name + ": " + t.fullpath);
								u()
							})
				},
				multiAsync : function(x, y) {
					var u, v, t = false;
					function w() {
						var z, A = {};
						for (z in x) {
							if (!x[z].c) {
								return
							}
							A[z] = x[z].r
						}
						y(A)
					}
					for (v in x) {
						t = true
					}
					if (!t) {
						y({})
					}
					for (v in x) {
	(function			() {
							var z = x[v];
							z.f.call((z.c || f), z.a, function(A) {
										z.r = A;
										z.c = true;
										w()
									})
						})()
					}
				},
				_ns : function(v) {
					var t, u = v.split("-"), w = f.Env.fns;
					for (t = 0; t < u.length; t++) {
						w[u[t]] = w[u[t]] || {};
						w = w[u[t]]
					}
					return w
				},
				require : function(u) {
					var t = f._ns(u);
					t.exports = t.exports || {};
					return t.exports
				},
				declare : function() {
					var w, v, u, y, t, x;
					for (v = 0; v < arguments.length; v++) {
						u = arguments[v];
						if (f.iS(u)) {
							y = u
						} else {
							if (f.iA(u)) {
								t = u
							} else {
								if (f.iF(u)) {
									x = u
								}
							}
						}
					}
					if (!y) {
						w = q();
						if (w) {
							y = w.getAttribute("mod_name") || false
						}
					}
					if (!y) {
						f.__m__ = {
							deps : t,
							fn : function(A, z, B) {
								x(A.require, z, B)
							}
						}
					} else {
						f.add(y, function(A, z, B) {
									x(A.require, z, B)
								}, t)
					}
				},
				provide : function(u, t) {
					f.use(u.join(","), function(v) {
								t(v.require)
							})
				}
			});
	f._init()
})(window, "KSLITE");
(function(c, b) {
	var a = c.alimamatk_onload;
	c.alimamatk_onload = {
		push : function(d) {
			if (d && b.iPO(d)) {
				alimamatk_show(d)
			}
		}
	};
	if (a && b.iA(a)) {
		if (b.iPO(a[0])) {
			alimamatk_show(a[0])
		}
	}
})(window, KSLITE);
function alimamatk_show(b) {
	var a = b;
	KSLITE.provide(["tkapi-main"], function(c) {
				c("tkapi-main").run(a)
			})
};
