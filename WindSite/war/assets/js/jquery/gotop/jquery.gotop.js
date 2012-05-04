(function(g) {
	var e = g.scrollTo = function(h, j, k) {
		g(window).scrollTo(h, j, k)
	};
	e.defaults = {
		axis : "xy",
		duration : parseFloat(g.fn.jquery) >= 1.3 ? 0 : 1
	};
	e.window = function(h) {
		return g(window)._scrollable()
	};
	g.fn._scrollable = function() {
		return this.map(function() {
					var h = this, j = !h.nodeName
							|| g.inArray(h.nodeName.toLowerCase(), ["iframe",
											"#document", "html", "body"]) != -1;
					if (!j) {
						return h
					}
					var k = (h.contentWindow || h).document || h.ownerDocument
							|| h;
					return g.browser.safari || k.compatMode == "BackCompat"
							? k.body
							: k.documentElement
				})
	};
	g.fn.scrollTo = function(l, k, h) {
		if (typeof k == "object") {
			h = k;
			k = 0
		}
		if (typeof h == "function") {
			h = {
				onAfter : h
			}
		}
		if (l == "max") {
			l = 9000000000
		}
		h = g.extend({}, e.defaults, h);
		k = k || h.speed || h.duration;
		h.queue = h.queue && h.axis.length > 1;
		if (h.queue) {
			k /= 2
		}
		h.offset = f(h.offset);
		h.over = f(h.over);
		return this._scrollable().each(function() {
			var w = this, p = g(w), v = l, n, o = {}, j = p.is("html,body");
			switch (typeof v) {
				case "number" :
				case "string" :
					if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(v)) {
						v = f(v);
						break
					}
					v = g(v, this);
				case "object" :
					if (v.is || v.style) {
						n = (v = g(v)).offset()
					}
			}
			g.each(h.axis.split(""), function(s, t) {
				var x = t == "x" ? "Left" : "Top", u = x.toLowerCase(), z = "scroll"
						+ x, r = w[z], q = e.max(w, t);
				if (n) {
					o[z] = n[u] + (j ? 0 : r - p.offset()[u]);
					if (h.margin) {
						o[z] -= parseInt(v.css("margin" + x)) || 0;
						o[z] -= parseInt(v.css("border" + x + "Width")) || 0
					}
					o[z] += h.offset[u] || 0;
					if (h.over[u]) {
						o[z] += v[t == "x" ? "width" : "height"]() * h.over[u]
					}
				} else {
					var y = v[u];
					o[z] = y.slice && y.slice(-1) == "%" ? parseFloat(y) / 100
							* q : y
				}
				if (/^\d+$/.test(o[z])) {
					o[z] = o[z] <= 0 ? 0 : Math.min(o[z], q)
				}
				if (!s && h.queue) {
					if (r != o[z]) {
						m(h.onAfterFirst)
					}
					delete o[z]
				}
			});
			m(h.onAfter);
			function m(q) {
				p.animate(o, k, h.easing, q && function() {
							q.call(this, l, h)
						})
			}
		}).end()
	};
	e.max = function(n, o) {
		var q = o == "x" ? "Width" : "Height", p = "scroll" + q;
		if (!g(n).is("html,body")) {
			return n[p] - g(n)[q.toLowerCase()]()
		}
		var r = "client" + q, k = n.ownerDocument.documentElement, j = n.ownerDocument.body;
		return Math.max(k[p], j[p]) - Math.min(k[r], j[r])
	};
	function f(h) {
		return typeof h == "object" ? h : {
			top : h,
			left : h
		}
	}
})(jQuery);
(function(e) {
	var f = function(j, h) {
		var g = this;
		g.opt = e.extend({
					referenceDom : "#hd .layout:first",
					margin : 20
				}, h || {});
		g.elem = e(j);
		if (e(g.opt.referenceDom).length == 0) {
			g.refDom = e('#bd .layout:first');
		} else {
			g.refDom = e(g.opt.referenceDom);
		}
		g.win = e(window);
		g.dis = 0;
		g.timer = 0;
		g.scrLf = -1;
		e.extend(g, {
			init : function() {
				g.elem.find("a").click(function() {
							g.elem.addClass("gotop2");
							g.win.scrollTo(0, 400, {
										onAfter : g.resetStatus
									});
							if (e.browser.msie) {
								g.win.unbind("scroll", g.checkStatus);
								g.hide()
							}
						});
				g.win.scroll(g.checkStatus).resize(g.setPosition)
			},
			setPosition : function(k) {
				var l = g.win.scrollLeft();
				if (k && "scroll" == k.type && l == g.scrLf) {
					return
				} else {
					g.scrLf = l
				}
				var m = g.refDom.offset();
				g.elem.css({
							left : m.left + g.refDom.width() + g.opt.margin
									- (e.browser.msie ? 0 : l)
						})
			},
			hide : function() {
				if (!g.getStatus()) {
					return false
				}
				g.setStatus(0);
				if (g.timer > 0) {
					clearTimeout(g.timer);
					g.timer = 0
				}
				if (!e.browser.msie) {
					g.elem.fadeOut(150)
				} else {
					g.elem.hide()
				}
			},
			_show : function() {
				g.setStatus(1);
				if (!e.browser.msie) {
					g.elem.fadeIn(150)
				} else {
					g.elem.show()
				}
			},
			show : function() {
				if (g.getStatus()) {
					return false
				}
				if (e.browser.msie) {
					if (g.timer > 0) {
						clearTimeout(g.timer);
						g.timer = 0
					}
					g.timer = setTimeout(function() {
								if (e(window).scrollTop() < 170) {
									g.hide();
									g.resetStatus();
									return false
								}
								g._show()
							}, 300)
				} else {
					g._show()
				}
			},
			setStatus : function(k) {
				g.dis = k
			},
			getStatus : function() {
				return g.dis
			},
			checkStatus : function(l) {
				g.setPosition(l);
				var n = e(window).scrollTop(), m = e(document).height(), k = window.innerHeight
						? window.innerHeight
						: e(g.win).height();
				if (n + k >= m) {
					g.elem.find("a").addClass("on");
					g.elem.find("i.ii").addClass("on")
				} else {
					g.elem.find("i.ii").removeClass("on")
				}
				if (n < 170 || (n + k) < 680) {
					g.hide();
					g.resetStatus()
				} else {
					if (e.browser.msie) {
						g.hide()
					}
					g.show()
				}
			},
			resetStatus : function() {
				g.elem.removeClass("gotop2").find("a").removeClass("on");
				if (e.browser.msie) {
					g.win.unbind("scroll", g.checkStatus).bind("scroll",
							g.checkStatus)
				}
			}
		});
		g.init()
	};
	e.fn.crGoTop = function(g) {
		return e(this).each(function() {
					e(this).removeData("crGoTop").data("crGoTop",
							new f(this, g))
				})
	}
})(jQuery);