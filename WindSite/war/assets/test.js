KISSY.add("base/base", function(b, c, j) {
			function i(b) {
				for (var a = this.constructor; a;) {
					var c = a.ATTRS;
					if (c) {
						var d = void 0;
						for (d in c)
							c.hasOwnProperty(d) && this.addAttr(d, c[d], !1)
					}
					a = a.superclass ? a.superclass.constructor : null
				}
				if (b)
					for (var e in b)
						b.hasOwnProperty(e) && this.__set(e, b[e])
			}
			b.augment(i, j.Target, c);
			return i
		}, {
			requires : ["./attribute", "event"]
		});
KISSY.add("base", function(b, c, j) {
			c.Attribute = j;
			return c
		}, {
			requires : ["base/base", "base/attribute"]
		});
KISSY.add("cookie/base", function(b) {
			var c = document, j = encodeURIComponent, i = decodeURIComponent;
			return {
				get : function(h) {
					var a, g;
					if (b.isString(h)
							&& "" !== h
							&& (g = ("" + c.cookie).match(RegExp("(?:^| )" + h
									+ "(?:(?:=([^;]*))|;|$)"))))
						a = g[1] ? i(g[1]) : "";
					return a
				},
				set : function(h, a, g, d, e, f) {
					var a = "" + j(a), i = g;
					"number" === typeof i
							&& (i = new Date, i
									.setTime(i.getTime() + 864E5 * g));
					i instanceof Date && (a += "; expires=" + i.toUTCString());
					b.isString(d) && "" !== d && (a += "; domain=" + d);
					b.isString(e) && "" !== e && (a += "; path=" + e);
					f && (a += "; secure");
					c.cookie = h + "=" + a
				},
				remove : function(b, a, c, d) {
					this.set(b, "", -1, a, c, d)
				}
			}
		});
KISSY.add("cookie", function(b, c) {
			return c
		}, {
			requires : ["cookie/base"]
		});
KISSY.add("core", function(b, c, j, i, h, a, g, d, e, f) {
			c = {
				UA : c,
				DOM : j,
				Event : i,
				EventTarget : i.Target,
				EventObject : i.Object,
				Node : h,
				NodeList : h,
				JSON : a,
				Ajax : g,
				IO : g,
				ajax : g,
				io : g,
				jsonp : g.jsonp,
				Anim : d,
				Easing : d.Easing,
				Base : e,
				Cookie : f,
				one : h.one,
				all : h.all,
				get : j.get,
				query : j.query
			};
			b.mix(b, c);
			return c
		}, {
			requires : "ua,dom,event,node,json,ajax,anim,base,cookie"
					.split(",")
		});
KISSY.use("core");
KISSY.add("scripts/platform/common/dd-module", function(d, b) {
	var e = d.DOM, a = b.DraggableDelegate, f = b.DroppableDelegate, h = b.Proxy, c = {
		init : g,
		filter : function(j, i) {
			return true
		}
	};
	d.mix(c, d.EventTarget);
	b.DDM.set("bufferTime", 2000);
	b.DDM.on("dragstart", function(i) {
				var j = i.drag;
				c.fire("startDrag", {
							elem : e.get(j.get("dragNode"))
						})
			});
	function g(o, j) {
		var m, n, p, k = false, i = 0, q = this, l = {
			CONTAINER : "#page",
			BOX : ".J_TModule",
			BOX_TRIGGER : ".J_TModule",
			REGION : ".J_TRegion"
		};
		d.mix(l, o);
		if (d.isFunction(j)) {
			c.filter = j
		}
		m = new a({
					container : l.CONTAINER,
					handlers : [l.BOX_TRIGGER],
					selector : function(r) {
						var s = true;
						if (e.attr(r, "data-ismove") == ""
								|| e.attr(r, "data-ismove") == "0") {
							s = false
						}
						return e.hasClass(r, l.BOX) && s
					},
					move : 1
				});
		(new b.Scroll({
					node : "#content"
				})).attach(m);
		n = new h({
					node : function(s) {
						var r = e.create("<div ></div>");
						e.append(r, "body");
						e.css(r, "border", "2px solid gray");
						e.css(r, "z-index", 1000);
						e.css(r, "width", e.width(s.get("dragNode")));
						e.css(r, "height", e.height(s.get("dragNode")));
						return d.one(r)
					},
					moveOnEnd : false,
					destroyOnEnd : true
				});
		n.attach(m);
		m.on("drag", function(r) {
					if (r.pageY < i) {
						k = true
					} else {
						if (r.pageY > i) {
							k = false
						}
					}
					i = r.pageY;
					c.fire("dragging", {
								elem : e.get(this.get("node"))
							})
				});
		m.on("dragend", function() {
					var r = this;
					c.fire("endDrag", {
								elem : e.get(r.get("dragNode"))
							})
				});
		new f({
					container : l.CONTAINER,
					selector : l.BOX
				});
		new f({
					container : l.CONTAINER,
					selector : ".J_TEmptyBox"
				});
		m.on("dragover", function(u) {
					var t = u.drag, r = u.drop, v = t.get("dragNode"), s = r
							.get("node");
					if (v.hasClass(l.BOX) && !s.hasClass("J_TEmptyBox")) {
						s = s.closest(l.BOX);
						if (!s || v[0] == s[0]) {
							return
						}
					}
					if (!c.filter(v, s)) {
						return
					}
					try {
						if (k) {
							if (e.attr(s, "data-ismove") == 0) {
								return
							}
							v.insertBefore(s)
						} else {
							v.insertAfter(s)
						}
					} catch (w) {
					}
				})
	}
	return c
}, {
	requires : ["dd"]
});
KISSY.add("scripts/platform/common/dialog-help", function(c, b) {
	var d = c.DOM, a = c.Event;
	return {
		mask : null,
		list : {},
		get : function(g, f) {
			var e = this;
			if (!g || !this.list[g]) {
				this.list[g] = new b.Dialog(c.mix({
							prefixCls : "tb-",
							elBefore : "#main",
							zIndex : 389
						}, f))
			}
			this.list[g].hide();
			this.list[g].render();
			this.list[g].on("show", function(h) {
						if (!e.mask) {
							e.mask = KISSY.DOM.get(".tb-ext-mask");
							d.append(e.mask, "#wrapper");
							if (c.UA.ie && 6 == c.UA.ie) {
								e.iframe = d.get("iframe");
								d.append(e.iframe, "#wrapper");
								d.css(e.iframe, "height", d.viewportHeight());
								setTimeout(function() {
											d
													.offset(
															e.mask,
															d
																	.offset("#wrapper"));
											d.css(e.mask, "height", d
															.height("#main"));
											d.css(e.iframe, "height", d
															.height("#main"))
										}, 1)
							}
						}
						d.css(e.mask, "width", d.width("#wrapper") - 18)
					});
			return this.list[g]
		}
	}
}, {
	requires : ["overlay"]
});
KISSY.add("scripts/platform/common/util", function(c) {
	var e = c.DOM, a = c.Event, b = "hidden tb-hidden";
	window.DShop = {
		fixHover : function f(g) {
			var h = [];
			c.each(g, function(i) {
						h = c.query(i.selector);
						c.each(h, function(j) {
									a.on(j, "mouseenter", function(k) {
												c.one(this).addClass(i.hClass)
											});
									a.on(j, "mouseleave", function(k) {
												c.one(this)
														.removeClass(i.hClass)
											})
								})
					})
		},
		utf8URL : function(g) {
			return g + (-1 === g.indexOf("?") ? "?" : "&")
					+ "_input_charset=utf-8"
		}
	};
	function d(g) {
		this.elem = e.get(g)
	}
	c.mix(d.prototype, {
				val : function(j, i, g) {
					if (c.isString(j)) {
						g = g === undefined ? true : !!g;
						if (!this.elem) {
							return
						}
						this.elem.innerHTML = j;
						this.show(i);
						if (g) {
							this.hide(g)
						}
					}
				},
				loading : function() {
					return this
							.val(
									"\u6b63\u5728\u5904\u7406\uff0c\u8bf7\u7a0d\u540e...",
									1, false)
				},
				show : function(h) {
					var i = this.elem;
					if (!i) {
						return
					}
					e.css(i, "opacity", 1);
					e.removeClass(i, "error");
					e.removeClass(i, b);
					var j = e.width(i.parentNode), g = e.width("#toolbar");
					e.css(i.parentNode, "left", (g - j) / 2);
					return h + "" - 0 === 0 ? e.addClass(i, "error") : ""
				},
				hide : function(g) {
					var h = this;
					if (true === g) {
						if (h.timer) {
							h.timer.cancel()
						}
						h.timer = c.later(function() {
									var j = {
										opacity : 0
									}, i = new c.Anim(h.elem, j, 0.5, "easeIn",
											function() {
												e.addClass(h.elem, b);
												h.timer = null
											});
									i.run()
								}, 5000);
						return
					}
					e.addClass(h.elem, b)
				}
			});
	DShop.Msg = d;
	return DShop
});
KISSY.add("scripts/platform/common/kscroll", function(b, g) {
	var c = g.all, i = function(j) {
		return j < 0 ? -j : j
	}, d = function(j) {
		return isNaN(parseInt(j)) ? 0 : parseInt(j)
	}, f = '<div class="{prefix}scrollbar"><div class="{prefix}track" ><div class="{prefix}drag" ><div class="{prefix}dragtop"></div><div class="{prefix}dragbottom"></div><div class="{prefix}dragcenter"></div></div></div></div>', e = '<div class="{prefix}arrow{type}"><a href="javascript:void(\'scroll {type}\')" >scroll {type}</a></div>';
	function h(j) {
		return j.charAt(0).toUpperCase() + j.substring(1)
	}
	function a(j, l) {
		var k = this;
		a.superclass.constructor.call(k, l);
		k._init(j)
	}
	a.ATTRS = {
		prefix : {
			value : "ks-"
		},
		duration : {
			value : 0.1
		},
		easing : {
			value : "easeNone"
		},
		container : {},
		body : {},
		track : {},
		drag : {},
		arrowUp : {},
		allowArrow : {
			value : true
		},
		arrowDown : {},
		step : {},
		scrollBar : {}
	};
	b.extend(a, b.Base, {
		_init : function(j) {
			var k = this, l = "." + k.get("prefix");
			j = k._wrap(c(j));
			k.set("container", j);
			k.set("body", j.one(l + "body"));
			k.set("track", j.one(l + "track"));
			k.set("drag", this.get("track").one(l + "drag"));
			if (k.get("allowArrow")) {
				k.set("arrowUp", j.one(l + "arrowup"));
				k.arrowUpHeight = k.get("arrowUp").outerHeight();
				k.set("arrowDown", j.one(l + "arrowdown"));
				k.arrowDownHeight = k.get("arrowDown").outerHeight()
			} else {
				k.arrowUpHeight = k.arrowDownHeight = 0
			}
			k._bindEvt();
			k._setSize()
		},
		destroy : function() {
			var m = this, l = m.get("container"), k = m.get("track"), n = m
					.get("arrowUp"), j = m.get("arrowDown"), o = l.children()
					.item(0);
			if (n) {
				n.remove()
			}
			if (j) {
				j.remove()
			}
			o.insertBefore(l);
			l.remove();
			o.css(m.__backup);
			o.removeClass(m.get("prefix") + "body")
		},
		_wrap : function(j) {
			var k = this, n = k.get("prefix"), m = c("<div></div>");
			if (b.UA.ie == 6) {
				j.css({
							overflow : "auto"
						})
			}
			m.insertAfter(j).append(j);
			m.addClass(n + "container").css({
						position : "relative",
						overflow : "hidden",
						width : j.outerWidth(),
						height : j.outerHeight()
					});
			m.append(b.substitute(f, {
						prefix : n
					}));
			var o = m.one("." + n + "scrollbar");
			k.set("scrollBar", o);
			if (k.get("allowArrow")) {
				o.append(b.substitute(e, {
							type : "up",
							prefix : n
						}));
				o.append(b.substitute(e, {
							type : "down",
							prefix : n
						}))
			}
			var l = j[0].style;
			k.__backup = {
				position : l.position,
				top : l.top,
				left : l.left,
				width : l.width,
				height : l.height,
				overflow : l.overflow
			};
			j.css({
						position : "absolute",
						top : 0,
						left : 0,
						width : "100%",
						height : "auto",
						overflow : "visible"
					}).addClass(n + "body");
			return m
		},
		_bindArrow : function(l) {
			var j = this, k = h(l), o = 0, r = null, m = j.get("prefix"), q = j
					.get("arrow" + k), p = function() {
				o += 1;
				var u = j.get("step");
				var s = l == "up" ? u : -u, n = 300 - o * 25;
				j.scrollByDistance(s);
				if (n <= 30) {
					n = 30
				}
				r = setTimeout(function() {
							p()
						}, n)
			};
			q.on("click", function() {
						var n = j.get("step");
						j.scrollByDistance(l == "up" ? n : -n)
					}).on("mousedown", function() {
						q.addClass(m + "arrow" + l + "-active");
						p()
					}).on("mouseup", function() {
						q.removeClass(m + "arrow" + l + "-active");
						o = 0;
						clearTimeout(r)
					}).on("mouseleave", function() {
						q.removeClass(m + "arrow" + l + "-active");
						o = 0;
						q.removeClass(m + "arrow" + l + "-hover");
						clearTimeout(r)
					}).on("mouseover", function() {
						q.addClass(m + "arrow" + l + "-hover")
					})
		},
		_bindDrag : function() {
			var q = c(document), k = this, l, o = k.get("prefix"), p = 0, m = k
					.get("drag"), j = k.get("track"), n = function(v) {
				var s = j.outerHeight(), w = m.outerHeight(), u = s - w, r = p
						+ (v.pageY - l);
				if (r < 0) {
					r = 0
				}
				if (r > u) {
					r = u
				}
				m.css("top", r);
				k.scrollByPercent(r / u, 1)
			};
			m.on("mouseenter", function(r) {
						m.addClass(o + "drag-hover")
					}).on("mouseleave", function(r) {
						m.removeClass(o + "drag-hover")
					}).on("click", function(r) {
						r.stopPropagation()
					}).on("mousedown", function(r) {
						m.addClass(o + "drag-active");
						p = parseInt(m.css("top")) || 0;
						l = r.pageY;
						q.on("mousemove", n).on("mouseup", function() {
									m.removeClass(o + "drag-active");
									q.detach("mousemove", n);
									q.detach("mouseup", arguments.callee);
									l = 0
								})
					})
		},
		_bindHotkey : function() {
			var l = this, j = l.get("body"), k = l.get("container"), m = function(
					o) {
				var n = d(j.css("top"));
				if (o > 0 && n >= 0) {
					return false
				}
				if (o < 0 && n + j.outerHeight() <= k.outerHeight()) {
					return false
				}
				return true
			};
			k.css("outline", "none").attr("tabindex", b.guid()).on("keydown",
					function(p) {
						var n = p.keyCode, o = l.get("step");
						if (!~"38,39,36,40,37,35".indexOf(n)) {
							return
						} else {
							var q = ~"38,39,36".indexOf(n) ? o : -o;
							if (m(q)) {
								p.halt()
							}
						}
						switch (n) {
							case 38 :
							case 39 :
								l.scrollByDistance(o);
								break;
							case 40 :
							case 37 :
								l.scrollByDistance(-o);
								break;
							case 36 :
								l.scrollByPercent(0);
								break;
							case 35 :
								l.scrollByPercent(1);
								break
						}
					})
		},
		_bindTrack : function() {
			var k = this, l = k.get("prefix");
			var j = k.get("track");
			j.unselectable().on("click", function(m) {
						k.scrollByPercent((m.pageY - j.offset().top)
								/ j.outerHeight())
					}).on("mousedown", function(m) {
						m.preventDefault()
					}).on("mouseenter", function() {
						j.addClass(l + "track-hover")
					}).on("mouseleave", function(m) {
						j.removeClass(l + "track-hover")
					})
		},
		_bindContainer : function() {
			var l = this, j = l.get("body"), k = l.get("container"), m = function(
					o) {
				var n = d(j.css("top"));
				if (o > 0 && n >= 0) {
					return false
				}
				if (o < 0 && n + j.outerHeight() <= k.outerHeight()) {
					return false
				}
				return true
			};
			l.get("container").on("mousewheel", function(o) {
						if (m(o.deltaY)) {
							o.halt()
						}
						var n = l.get("step");
						l.scrollByDistance(o.deltaY > 0 ? n : -n)
					})
		},
		_bindEvt : function() {
			var j = this;
			j._bindContainer();
			if (j.get("allowArrow")) {
				j._bindArrow("up");
				j._bindArrow("down")
			}
			j._bindTrack();
			j._bindDrag();
			j._bindHotkey()
		},
		resize : function(j, l) {
			var k = this;
			k.get("container").css({
						width : j,
						height : l
					});
			k._setSize()
		},
		_setSize : function() {
			var r = this, n = r.get("body").outerHeight(), p, j = r
					.get("container").innerHeight(), k = r.get("arrowUp"), m = r
					.get("arrowDown"), l = r.get("track"), o = r.get("drag"), q = r.arrowUpHeight
					+ r.arrowDownHeight;
			if (n <= j || j < q) {
				r.get("body").css({
							top : 0
						});
				r.get("scrollBar").hide();
				return
			} else {
				r.get("scrollBar").show()
			}
			p = (j - q) * j / n;
			if (p < 20) {
				p = 20
			}
			if (!r.get("step")) {
				r.set("step", Math.max(p / 6, 10))
			}
			l.css({
						height : j - q,
						top : r.arrowUpHeight
					});
			o.css({
						height : p
					})
		},
		_scrollBodyToPosition : function(k) {
			var m = this, l = m.get("container"), j = m.get("body"), n = j
					.outerHeight()
					- l.innerHeight();
			if (n < 0) {
				return
			}
			if (k > 0) {
				k = 0
			}
			if (i(k) > n) {
				k = -n
			}
			j.css("top", k)
		},
		scrollByDistance : function(m, l) {
			var k = this, j = parseInt(k.get("body").css("top")) + m;
			k._scrollBodyToPosition(j);
			if (!l) {
				k._updateBar()
			}
		},
		scrollByPercent : function(l, k) {
			var j = this;
			l = parseFloat(l, 10);
			if (isNaN(l) || l > 1 || l < 0) {
				return
			}
			var m = (j.get("body").outerHeight() - j.get("container")
					.innerHeight())
					* -l;
			j._scrollBodyToPosition(m);
			if (!k) {
				j._updateBar()
			}
		},
		scrollToElement : function(l) {
			l = c(l);
			if (!l.length) {
				return
			}
			var k = this, j = l.offset().top - k.get("body").offset().top;
			k._scrollBodyToPosition(-j);
			k._updateBar()
		},
		_updateBar : function() {
			var l = this, m = l.get("drag"), o = l.get("track").innerHeight()
					- m.outerHeight(), j = l.get("body"), k = l
					.get("container"), n = i(parseInt(j.css("top")))
					/ (j.outerHeight() - k.innerHeight());
			m.css("top", n * o)
		}
	});
	return a
}, {
	requires : ["node"]
});
KISSY.add("scripts/platform/layout/layout-opt", function(S, DialogHelp, DSDD,
		Switchable, Util, Kscroll) {
	var DOM = S.DOM, Event = S.Event, win = window, doc = document, IE = S.UA.ie, RE_CN = /(grid-[a-z0-9]+)/ig, TEXT_NODEL_LAYOUT = "\u8be5\u5e03\u5c40\u542b\u6709\u4e0d\u53ef\u5220\u9664\u6a21\u5757\uff0c\u4e0d\u80fd\u5220\u9664\u6b64\u5e03\u5c40\uff01", TEXT_DEL_LAYOUT = "\u5220\u9664\u5e03\u5c40\u4f1a\u5c06\u5e03\u5c40\u5185\u7684\u6a21\u5757\u4e00\u5e76\u5220\u9664\uff0c\u60a8\u786e\u5b9a\u8981\u5220\u9664\u5417\uff1f", TEXT_ADD_LAYOUT = "\u5e03\u5c40\u6700\u591a\u4e0d\u80fd\u8d85\u8fc7%N\u4e2a", TEXT_DEL_LAYOUT_LAST = "\u6700\u540e\u4e00\u4e2a\u5e03\u5c40\u4e0d\u80fd\u5220\u9664!", TEXT_ADD_MOD = "%where%\u5185\u53ef\u6dfb\u52a0\u6a21\u5757\u6570\u5df2\u8fbe\u4e0a\u9650\uff0c\u8bf7\u5220\u9664\u5176\u4ed6\u6a21\u5757\u540e\u518d\u5c1d\u8bd5\u6dfb\u52a0\u3002", TEXT_ADD_MOD_COUNT = "\u8be5\u6a21\u5757\u6dfb\u52a0\u6b21\u6570\u8d85\u8fc7\u9650\u5236\uff0c\u4e0d\u80fd\u6dfb\u52a0\uff01", DATA_ISDEL = "data-isdel", DATA_ISMOVE = "data-ismove", DATA_PID = "data-componentid", DATA_ID = "data-widgetid", DATA_MODULE = "data-modules", DATA_INITED = "data-inited", HTML_MAIN = '<div data-componentid="%PID" data-context="%WIDTH" data-ismove="1" data-widgetid="0" class="layout %CLASS J_TLayout"><p class="cl"><a class="move" title="\u79fb\u52a8"></a><a class="edit" title="\u7f16\u8f91"></a><a class="del" title="\u5220\u9664"></a></p><div class="clear"><div class="col-main"><div class="main-wrap J_TRegion" data-modules="main" data-width="%WIDTH"><div class="J_TEmptyBox J_TModule emptyp"><span>\u8bf7\u6dfb\u52a0\u6a21\u5757</span><a class="act-add"  href="#"></a></div></div></div>%SUB</div></div>', HTML_SUB = '<div class="col-%CLASS J_TRegion" data-modules="%MODULE" data-width="%WIDTH"><div class="J_TEmptyBox J_TModule emptyp"><span>\u8bf7\u6dfb\u52a0\u6a21\u5757</span><a class="act-add" href="#"></a></div></div>', HTML_BOX = '<div class="tb-module J_TModule" data-context="%CONTEXT"   data-componentid="%PID" data-widgetid="0" data-ismove="%move" data-isdel="%del"><span>%TEXT</span></div>', CLICK = "click";
	var LayoutMgr = {
		_delModRecord : {},
		_editLayoutEl : null,
		_state : 0,
		_addModEl : null,
		addLayout : function(el) {
			var self = this, type = el.className.replace("l-", ""), content = DOM
					.get("#content"), bd = DOM.get("#bd"), count = DOM.attr(
					content, "data-max-layout")
					- 0, layouts = DOM.query("div.J_TLayout", bd), div, HTML, SUB, newEl, width = DOM
					.attr(bd, "data-width");
			if (layouts && count <= layouts.length) {
				return alert(TEXT_ADD_LAYOUT.replace("%N", count))
			}
			HTML = HTML_MAIN.replace(/%CLASS/, type).replace(/%WIDTH/, width)
					.replace(/%PID/, DOM.attr(el, DATA_PID));
			if (-1 === type.indexOf("s")) {
				HTML = HTML.replace(/%SUB/, "").replace(/%WIDTH/, "b950")
			} else {
				SUB = HTML_SUB.replace(/%CLASS/, "sub").replace(/%WIDTH/,
						"b190").replace(/%MODULE/, "sub");
				if (-1 !== type.indexOf("e")) {
					SUB += HTML_SUB.replace(/%CLASS/, "extra").replace(
							/%WIDTH/, "b190").replace(/%MODULE/, "extra");
					HTML = HTML.replace(/%WIDTH/, "b550")
				}
				HTML = HTML.replace(/%SUB/, SUB).replace(/%WIDTH/, "b750")
			}
			newEl = DOM.create(HTML);
			bd.appendChild(newEl);
			Event.add(DOM.get("a.del", newEl), CLICK, function(evt) {
						var layout = DOM.parent(this, ".layout");
						self.delLayout(layout)
					});
			Event.add(DOM.get("a.edit", newEl), CLICK, function(evt) {
						self._editLayoutEvt(this)
					});
			S.each(DOM.query("div.J_TRegion", newEl), function(r) {
						Event.add(DOM.get("a.act-add", r), CLICK,
								function(evt) {
									evt.preventDefault();
									self._addModEl = DOM.parent(this,
											".J_TEmptyBox");
									self.showAddMod(DOM.parent(this,
											".J_TRegion"))
								})
					});
			fixie6hover(newEl);
			return true
		},
		editLayout : function(el) {
			var self = this, layout = self._editLayoutEl, pid = DOM.attr(el,
					DATA_PID), originCN = el.className.match(RE_CN)[0], targetCN = layout.className
					.match(RE_CN)[0];
			DOM.replaceClass(layout, targetCN, originCN);
			DOM.attr(layout, DATA_PID, pid);
			DOM.removeClass(DOM.query("a", DOM.parent(el, "bd")), "selected");
			DOM.addClass(el, "selected");
			return true
		},
		delLayout : function(el) {
			var boxs = DOM.query(".tb-module", el), isDel = DOM.test(boxs,
					function(b) {
						return "1" === DOM.attr(b, DATA_ISDEL)
					});
			if (boxs.length > 0 && !isDel) {
				return alert(TEXT_NODEL_LAYOUT)
			}
			if (1 >= DOM.query("#bd .J_TLayout").length) {
				return alert(TEXT_DEL_LAYOUT_LAST)
			}
			DOM.css(el, "overflow", "hidden");
			S.Anim(el, {
						opacity : 0,
						width : 0,
						height : 0
					}, 0.3, "easeNone", function() {
						var id = DOM.attr(el, DATA_ID);
						el.parentNode.removeChild(el)
					}).run()
		},
		showAddMod : function(el) {
			var self = this, width = DOM.attr(el, "data-width"), D = self.addModMgrDialog;
			self._editLayoutEl = el;
			D.center();
			D.show()
		},
		addMod : function(el) {
			var self = this, layout = DOM.parent(this._editLayoutEl, ".layout"), max = DOM
					.parent(layout).id === "bd" ? DOM.attr("#content",
					"data-max-module") : DOM.attr(layout, "data-max"), li = DOM
					.parent(el, ".module"), hasAppend = parseInt(DOM.attr(li,
							"data-hasappend"), 10), maxAppend = parseInt(DOM
							.attr(li, "data-maxappend"), 10);
			if (maxAppend <= hasAppend) {
				return alert(TEXT_ADD_MOD_COUNT)
			}
			if (!(!max || max > DOM.query(".tb-module", DOM.parent(layout)).length)) {
				S
						.log("\u5e03\u5c40\u5185\uff0c\u6a21\u5757\u6570\u91cf\u8fbe\u5230\u9650\u5236");
				alert(TEXT_ADD_MOD.replace("%where%",
						DOM.parent(layout).id === "bd"
								? "\u5185\u5bb9\u533a"
								: "\u5e03\u5c40"));
				return false
			}
			var btn = el;
			el = DOM.parent(el, "li");
			var self = this, pid = DOM.attr(el, DATA_PID), context = DOM.attr(
					el, "data-context"), text = DOM.get("a", DOM.get("strong",
							el))
					|| DOM.get("strong", el), text = text.innerHTML, currentBox = self._addModEl, maxCount, newEl;
			newEl = DOM.create(HTML_BOX.replace(/%PID/, pid).replace(/%TEXT/,
					text).replace(/%CONTEXT/, context).replace(/%move/,
					DOM.attr(el, "data-ismove")).replace(/%del/,
					DOM.attr(el, "data-isdel")));
			DOM.insertAfter(newEl, currentBox);
			DOM.css(DOM.get("span", newEl), "background-color", "#d5f6d5");
			DOM.css(DOM.get("span", newEl), "border-color", "#33cc66");
			S.later(function() {
						DOM.css(DOM.get("span", newEl), "border-color", "");
						DOM.css(DOM.get("span", newEl), "background-color", "")
					}, 3000);
			if (S.UA.ie) {
				DOM.css(currentBox.parentNode, "visibility", "hidden");
				DOM.css(currentBox.parentNode, "visibility", "visible")
			}
			DOM.attr(el, "data-hasappend", hasAppend + 1);
			_genBar(newEl);
			DOM.css(newEl, "visibility", "visible");
			Event.add(DOM.get("a.act-del", newEl), CLICK, function(evt) {
						evt.preventDefault();
						var box = DOM.parent(this, ".J_TModule");
						self.delBox(box)
					});
			Event.add(DOM.get("a.act-add", newEl), CLICK, function(evt) {
						evt.preventDefault();
						self._addModEl = DOM.parent(this, ".J_TModule");
						self.showAddMod(DOM.parent(this, ".J_TRegion"))
					});
			self._needEmptyMod(currentBox.parentNode);
			fixie6hover(newEl);
			return true
		},
		delBox : function(el) {
			var self = this;
			self._delModRecord["shop" + DOM.attr(el, "data-componentid")]
					? parseInt(self._delModRecord["shop"
							+ DOM.attr(el, "data-componentid")])
							- 1
					: self._delModRecord["shop"
							+ DOM.attr(el, "data-componentid")] = -1;
			DOM.css(el, "overflow", "hidden");
			var region = el.parentNode, self = this;
			S.Anim(el, {
						opacity : 0,
						width : 0,
						height : 0
					}, 0.3, "easeNone", function() {
						var id = DOM.attr(el, DATA_ID);
						el.parentNode.removeChild(el);
						self._needEmptyMod(region)
					}).run()
		},
		getAll : function() {
			var STR = ",", name, id, pid, a = [], b, c, d;
			S.each(DOM.query("#hd, #bd, #ft"), function(s) {
				b = [];
				S.each(DOM.query("div.J_TLayout", s), function(l) {
					c = [];
					S.each(DOM.query("div.J_TRegion", l), function(r) {
						d = [];
						S.each(DOM.query(".J_TModule", r), function(b) {
							id = DOM.attr(b, DATA_ID);
							pid = DOM.attr(b, DATA_PID);
							if (undefined !== id && undefined !== pid) {
								if ("top" === DOM.attr(b, "data-mtype")) {
									var width = DOM.attr(DOM.parent(b),
											"data-width")
											.replace(/[h|b|f]/, ""), objMap = eval("("
											+ DOM.attr(b, "data-mapwh") + ")"), index = S
											.indexOf(parseInt(width),
													objMap.width), height = objMap.height[index];
									d[d.length] = "{id:" + id + ",pid:" + pid
											+ ",width:" + width + ",height:"
											+ height + ",type:" + 2 + "}"
								} else {
									d[d.length] = "{id:" + id + ",pid:" + pid
											+ "}"
								}
							}
						});
						name = DOM.attr(r, DATA_MODULE);
						c[c.length] = name + ":[" + d.join(STR) + "]"
					});
					id = DOM.attr(l, DATA_ID);
					pid = DOM.attr(l, DATA_PID);
					if (c.length > 0) {
						b[b.length] = "{"
								+ (undefined === id ? "" : "id:" + id + ",")
								+ (undefined === pid ? "" : "pid:" + pid + ",")
								+ c.join(STR) + "}"
					}
				});
				if (b.length > 0) {
					a[a.length] = s.id + ":[" + b.join(STR) + "]"
				}
			});
			return a.length > 0 ? "{" + a.join(STR) + "}" : ""
		},
		_initDialogMgr : function() {
			var self = this, layoutMgrDialog = DialogHelp.get("layoutMgr", {
						mask : true,
						drag : true,
						headerContent : "\u5e03\u5c40\u7ba1\u7406",
						bodyContent : DOM.get("#J_AddLayoutHTML").value,
						width : "620px"
					}), addModMgrDialog = DialogHelp.get("modMgr", {
						mask : true,
						drag : true,
						headerContent : "\u6a21\u5757\u7ba1\u7406",
						bodyContent : DOM.val("#J_TAddMods"),
						width : "700px"
					});
			layoutMgrDialog.hide();
			layoutMgrDialog.render();
			addModMgrDialog.hide();
			addModMgrDialog.render();
			layoutMgrDialog.elem = layoutMgrDialog.getContentElement()[0];
			addModMgrDialog.elem = addModMgrDialog.getContentElement()[0];
			if (!DOM.attr(layoutMgrDialog.elem, DATA_INITED)) {
				Event.add(DOM.query("a", layoutMgrDialog.elem), CLICK,
						function(evt) {
							evt.preventDefault();
							self._state = 1;
							if (DOM.hasClass(layoutMgrDialog.elem, "modify")) {
								if (self.editLayout(this)) {
									layoutMgrDialog.hide()
								}
							} else {
								if (self.addLayout(this)) {
									layoutMgrDialog.hide()
								}
							}
						});
				DOM.attr(layoutMgrDialog.elem, DATA_INITED, 1);
				layoutMgrDialog.on("hide", function() {
							DOM.removeClass(layoutMgrDialog.elem, "modify");
							DOM.removeClass(layoutMgrDialog.elem, "l-sm");
							DOM.removeClass(layoutMgrDialog.elem, "l-sme");
							DOM.removeClass(DOM
											.query("a", layoutMgrDialog.elem),
									"selected")
						});
				self.layoutMgrDialog = layoutMgrDialog
			}
			if (!DOM.attr(addModMgrDialog.elem, DATA_INITED)) {
				var elem = DOM.query("#mods-list", addModMgrDialog.elem)[0];
				var tab = new S.Tabs("#mods-list", {
							activeTriggerCls : "selected",
							triggerType : "click"
						});
				tab.on("beforeSwitch", function(e) {
							var ts = e.target.triggers;
							DOM.removeClass(ts, "expand");
							DOM.removeClass(ts, "folding");
							if (e.toIndex === 4) {
								DOM.addClass(ts[4], "expand");
								DOM.addClass(ts[3], "folding");
								DOM.addClass(ts[0], "folding")
							} else {
								if (e.toIndex === 3) {
									DOM.addClass(ts[3], "expand");
									DOM.addClass(ts[0], "folding");
									if (ts[4]) {
										DOM.addClass(ts[4], "folding")
									}
								} else {
									if (e.toIndex === 0) {
										DOM.addClass(ts[0], "expand");
										ts[4]
												? DOM
														.addClass(ts[4],
																"folding")
												: "";
										ts[3]
												? DOM
														.addClass(ts[3],
																"folding")
												: ""
									} else {
										DOM.addClass(ts[0], "folding");
										ts[4]
												? DOM
														.addClass(ts[4],
																"folding")
												: "";
										ts[3]
												? DOM
														.addClass(ts[3],
																"folding")
												: ""
									}
								}
							}
						});
				var k = null;
				tab.on("switch", function(e) {
							k.destroy();
							updateModSums();
							k = new Kscroll(DOM.get("#J_TAddModsPanel"), {
										prefix : "ks-"
									})
						});
				S.each(["First", "Second", "Third"], function(id) {
							var tabs = DOM.get("#J_T" + id + "Trigger");
							if (tabs) {
								var t = new S.Tabs(document, {
											markupType : 2,
											triggerType : "click",
											triggers : DOM.query("#J_T" + id
													+ "Trigger li"),
											panels : DOM.query("#J_T" + id
													+ "Panel .panel")
										});
								t.on("switch", function() {
											updateModSums()
										})
							}
						});
				Event.add(DOM.query("a.btn-ok", addModMgrDialog.elem), CLICK,
						function(evt) {
							if (self.addMod(this)) {
								self._state = 1;
								addModMgrDialog.hide()
							}
						});
				DOM.attr(addModMgrDialog.elem, DATA_INITED, 1);
				self.addModMgrDialog = addModMgrDialog;
				self.addModMgrDialog.on("show", function(e) {
							var width = DOM.attr(self._addModEl.parentNode,
									"data-width"), mods = DOM
									.query("#J_TAddModsPanel .module");
							if (!width) {
								DOM.removeClass(mods, "tb-hidden");
								DOM.removeClass(mods, "tb-hidden");
								return
							}
							S.each(mods, function(mod) {
										var c = DOM.attr(mod, "data-context");
										if (undefined === c) {
											c = ""
										}
										-1 === c.indexOf(width) ? DOM.addClass(
												mod, "tb-hidden") : DOM
												.removeClass(mod, "tb-hidden")
									});
							if (k !== null) {
								k.destroy()
							}
							k = new Kscroll(DOM.get("#J_TAddModsPanel"), {
										prefix : "ks-"
									});
							updateModSums();
							S.each(self._delModRecord, function(v, k) {
										var li = DOM.get("#" + k), num = DOM
												.attr(li, "data-hasappend");
										DOM.attr(li, "data-hasappend",
												parseInt(num) + v)
									});
							self._delModRecord = {};
							self.addModMgrDialog.center()
						});
				function updateModSums() {
					if (!updateModSums.mods) {
						updateModSums.mods = DOM
								.query("#J_TAddModsPanel .module")
					}
					var mods = updateModSums.mods, num = 0;
					S.each(mods, function(m) {
						var flag = true;
						if (DOM.hasClass(m, "tb-hidden")) {
							flag = false
						}
						for (var i = 0; i < 6; i++) {
							if (DOM.css(DOM.parent(m, i), "display") === "none") {
								flag = false
							}
						}
						if (flag) {
							num++
						}
					});
					DOM.html("#mods-list .highlight", num)
				}
			}
		},
		_editLayoutEvt : function(el) {
			var self = this, D = self.layoutMgrDialog, layoutEl = DOM.parent(
					el, ".J_TLayout"), type = layoutEl.className.match(RE_CN)[0];
			DOM.addClass(D.elem, (-1 === type.indexOf("e") ? "l-sm" : "l-sme")
							+ " modify");
			DOM.addClass(DOM.get("a.l-" + type, D.elem), "selected");
			self._editLayoutEl = layoutEl;
			D.center();
			D.show()
		},
		_needEmptyMod : function(region, num) {
			var self = this, tp;
			num = num || 0;
			if (region.id === "hd" || region.id === "bd" || region.id === "ft") {
				return
			}
			tp = DOM.get(".J_TEmptyBox", region);
			if (DOM.children(region).length <= num) {
				if (tp) {
					return
				}
				var mod = DOM.create("<div></div>"), a = DOM
						.create('<span>\u8bf7\u6dfb\u52a0\u6a21\u5757</span><a class="act-add" href="#"></a>');
				mod.className = "J_TEmptyBox emptyp J_TModule";
				mod.appendChild(a);
				DOM.attr(mod, "data-ismove", "0");
				DOM.append(mod, region);
				Event.on(DOM.get("a.act-add", mod), "click", function(e) {
							e.preventDefault();
							self._addModEl = mod;
							self.showAddMod(DOM.parent(this, ".J_TRegion"))
						});
				fixie6hover(mod)
			} else {
				if (tp) {
					Event.detach(tp, "click");
					region.removeChild(tp)
				}
			}
		},
		_initBoxDD : function() {
			new DSDD.init({
						CONTAINER : "#content",
						BOX : ".J_TModule",
						BOX_TRIGGER : "span",
						REGION : ".J_TRegion"
					}, filter);
			new DSDD.init({
						CONTAINER : "#content",
						BOX : ".J_TLayout",
						BOX_TRIGGER : "a.move",
						REGION : ".J_TRegion"
					}, filter);
			var self = this;
			DSDD.on("startDrag", function(e) {
						self._state = 1;
						self._needEmptyMod(e.elem.parentNode, 1)
					});
			DSDD.on("endDrag", function(e) {
						self._needEmptyMod(e.elem.parentNode);
						if (6 === S.UA.ie && DOM.hasClass(e.elem, "J_TLayout")) {
							DOM.css(DOM.get(".cl", e.elem), "visibility",
									"none");
							S.later(function() {
										DOM.css(DOM.get(".cl", e.elem),
												"visibility", "visible")
									}, 100)
						}
					});
			S.each(DOM.query(".J_TRegion"), function(v, k) {
						self._needEmptyMod(v)
					})
		},
		init : function() {
			var self = this, layouts = DOM.query("#content div.J_TLayout"), box;
			self._initBoxDD();
			S.each(layouts, function(l) {
				S.each(DOM.query("div.J_TRegion", l), function(r) {
					S.each(DOM.query(".J_TModule", r), function(b) {
								_genBar(b);
								if (box = DOM.get("a.act-del", b)) {
									Event.add(box, CLICK, function(evt) {
												evt.preventDefault();
												var box = DOM.parent(this,
														".J_TModule");
												self._state = 1;
												self.delBox(box)
											})
								}
								fixie6hover(b)
							});
					if (DOM.query("a.act-add", r).length !== 0) {
						Event.add(DOM.query("a.act-add", r), CLICK, function(
										evt) {
									evt.preventDefault();
									self._addModEl = DOM.parent(this,
											".J_TModule")
											|| DOM.parent(this, ".J_TEmptyBox");
									self.showAddMod(DOM.parent(this,
											".J_TRegion"))
								})
					}
				});
				if (box = DOM.get("a.del", l)) {
					Event.add(box, CLICK, function(evt) {
								var layout = DOM.parent(this, ".J_TLayout");
								if (DOM.query(".tb-module", layout).length > 0
										&& !confirm(TEXT_DEL_LAYOUT)) {
									return
								}
								self.delLayout(layout)
							})
				}
				if (box = DOM.get("a.edit", l)) {
					Event.add(box, CLICK, function(evt) {
								self._editLayoutEvt(this)
							})
				}
				fixie6hover(l)
			});
			self._initDialogMgr();
			Event.add("#J_AddLayout", CLICK, function(evt) {
						evt.preventDefault();
						self.layoutMgrDialog.center();
						self.layoutMgrDialog.show()
					});
			Event.add(".J_TSubmit", "click", function(evt) {
						evt.preventDefault();
						self._state = 0;
						var mods = self.getAll();
						DOM.val("#J_PageJson", mods);
						S.IO({
									url : DOM.attr("#J_Save", "action"),
									form : "#J_Save",
									type : "post",
									dataType : "json",
									cache : false
								})
					});
			Event.on(".J_TCancel", "click", function(e) {
						e.halt();
						self._state = 0;
						window.location.href = DOM.attr(e.target, "href")
					});
			window.onbeforeunload = function() {
				if (self._state == 1) {
					return "\u9875\u9762\u6709\u5185\u5bb9\u672a\u4fdd\u5b58\uff0c\u786e\u8ba4\u79bb\u5f00\uff1f"
				}
			}
		}
	};
	function _genBar(module) {
		var self = this;
		if (DOM.hasClass(module, "J_TEmptyBox")) {
			return
		}
		var del = DOM.create('<a href="#del" class="act-del"></a>'), add = DOM
				.create('<a href="#add" class="act-add"></a>'), isdel = S
				.trim(DOM.attr(module, "data-isdel")), isadd = S.trim(DOM.attr(
				module, "data-isadd"));
		if ("1" === isdel || !isdel) {
			DOM.append(del, module)
		}
		if ("1" === isadd || !isadd) {
			DOM.append(add, module)
		}
	}
	function filter(mod, drop) {
		if (DOM.parent(drop).id == "ft" || DOM.parent(drop).id == "hd") {
			return false
		}
		mod = DOM.get(mod);
		drop = DOM.get(drop);
		var region = drop.parentNode, w = DOM.attr(region, "data-width"), context = DOM
				.attr(mod, "data-context");
		if (w && context && -1 === context.indexOf(w)) {
			S.log("\u4e0d\u7b26\u5408\u89c4\u5219" + context + " ==== " + w);
			return false
		}
		var layout = DOM.parent(region, ".J_TLayout"), max = DOM.attr(layout,
				"data-max"), mlength = DOM.filter(DOM.query(".J_TModule",
						region), function(m) {
					return !DOM.hasClass(m, "ks-dd-dragging")
				}).length;
		if (!(!max || max > mlength)) {
			S
					.log("\u5e03\u5c40\u5185\uff0c\u6a21\u5757\u6570\u91cf\u8fbe\u5230\u9650\u5236");
			return false
		}
		return true
	}
	function fixie6hover(el) {
		Event.add(el, "mouseenter", function() {
					DOM.addClass(el, "hover")
				});
		Event.add(el, "mouseleave", function() {
					DOM.removeClass(el, "hover")
				})
	}
	return LayoutMgr
}, {
	requires : ["../common/dialog-help", "../common/dd-module", "switchable",
			"../common/util", "../common/kscroll"]
});
KISSY.add("scripts/platform/layout/fix-layout-dom", function(d, c, g, f) {
	var e = d.DOM, a = d.Event;
	function b() {
		d.each(e.query(".J_TLayout"), function(j) {
			var k = e.parent(j), i;
			if (k.id == "hd") {
				i = e.create('<p class="title"></p>');
				i.innerHTML = "<span>\u5e97\u94fa\u9875\u5934</span>";
				e.prependTo(i, j)
			} else {
				if (k.id == "ft") {
					i = e.create('<p class="title"></p>');
					i.innerHTML = "<span>\u5e97\u94fa\u9875\u5c3e</span>";
					e.prependTo(i, j)
				} else {
					i = e.create('<p class="cl"></p>');
					i.innerHTML = '<a class="move" title="\u79fb\u52a8"></a><a class="edit" title="\u7f16\u8f91"></a><a class="del" title="\u5220\u9664"></a>';
					e.prependTo(i, j);
					i.style.zoom = "1"
				}
			}
		});
		var h = e.create('<div class="layout"></div>');
		e
				.html(
						h,
						'<a id="J_AddLayout" class="add-layout" href="#">\u6dfb\u52a0\u5e03\u5c40\u5355\u5143</a>');
		e.insertAfter(h, "#bd")
	}
	return {
		fixLayout : b
	}
});
KISSY.add("scripts/platform/design/navbar", function(c, b) {
	var e = c.DOM;
	var a = c.Event;
	function d() {
		if (!e.get("#navbar")) {
			return
		}
		var m = c.query("#navbar .dropdown");
		a.on(m, "mouseenter", function(t) {
					var s = t.target;
					e.addClass(s, "hover")
				});
		a.on(m, "mouseleave", function(s) {
					c.one(this).removeClass("hover")
				});
		var i = c.query("#navbar .dropdown-main, #navbar .sub");
		a.on(i, "click", function(t) {
					if (e.hasClass(m, "current")) {
						e.removeClass(m, "current")
					}
					var s = e.parent(t.target, ".dropdown");
					e.addClass(s, "current");
					if (e.hasClass(s, "hover")) {
						c.one(s).removeClass("hover")
					}
				});
		var o = c.query("#navbar .account-dropdown");
		a.on(o, "mouseenter", function(s) {
					e.addClass(o, "hover")
				});
		a.on(o, "mouseleave", function(s) {
					e.removeClass(o, "hover")
				});
		var l = c.query("#navbar .account-exit");
		a.on(l, "mouseenter", function(t) {
					var s = t.target;
					e.addClass(s, "hover")
				});
		a.on(l, "mouseleave", function(t) {
					var s = t.target;
					e.removeClass(s, "hover")
				});
		if (e.get("#navbar .payback-tip")) {
			a.on(o, "mouseenter", function() {
						e.css("#navbar .payback-tip", "display", "none")
					});
			e.css("#navbar .img", "top", "8px");
			e.css("#navbar .exit", "top", "9px")
		}
		if (c.UA.ie == 6) {
			var p = 0;
			c.each(e.children("#navbar .nav-collapse", "li"), function(u) {
						var t = e.css(u, "width"), s = e.css(u, "margin-right");
						p += parseInt(t.substring(0, t.length - 2));
						p += parseInt(s.substring(0, s.length - 2))
					});
			if (e.get("#navbar .change-module")) {
				p += 2
			}
			e.css(".account-nav", "width", p + "px")
		}
		var h = e.get("#navbar .rollback");
		if (h) {
			var j = b.get("rollback", {
						mask : true,
						drag : true,
						headerContent : "\u8fd4\u56de\u65e7\u7248",
						width : "635px"
					});
			var k = '.tb-dialog .rollback-dialog .rollback-container .tips{color:#666; margin:0; margin-bottom:15px; font-size:12px;} .tb-dialog .rollback-dialog .rollback-container textarea{width:587px; height:170px; border:1px solid #d4d4d4;} .tb-dialog .rollback-dialog .rollback-container .text{color:#d4d4d4; position:absolute; top:55px; left:30px; font-size:12px;} .tb-dialog .rollback-dialog .rollback-container .btn-footer{margin-top:10px; margin-bottom:25px;} .tb-dialog .rollback-dialog .rollback-container .btn-footer a{width:58px; height:23px; background:#2d2d2d; color:white; line-height:23px; margin-left:10px; float:right; text-align:center; font-size:12px; padding:0; border:1px solid #2d2d2d;} .tb-dialog .rollback-dialog .rollback-container .btn-footer .btn-cancel{background:white; color:#666; border:1px solid #d4d4d4;} .tb-dialog .rollback-dialog .rollback-container .error span{text-indent:26px; width:147px; heigth:19px; line-height:19px; border:1px solid #ff6600; color:#404040; font-size:12px; display:none; position:absolute; margin-top:10px; background:url("http://img01.taobaocdn.com/tps/i1/T1Bv_NXcBhXXceOP_X-16-16.jpg") no-repeat; background-position:4px 1px;}';
			e.addStyleSheet(k);
			j.set("bodyContent", e.val("#J_TRollbackContent"));
			j.hide();
			j.render();
			j.elem = e.get(j.getContentElement());
			j.rollbackContent = e.get(".rollback-container", j
							.getContentElement());
			j.resultContent = e.get(".release-result", j.getContentElement());
			j.on("hide", function(s) {
						s.halt();
						e.removeClass(j.rollbackContent, "tb-hidden hidden");
						e.addClass(j.resultContent, "tb-hidden hidden")
					});
			a.on(j.elem, "click", function(t) {
						if (e.hasClass(t.target, "advise")) {
							e.css(e.get(".text", j.elem), "display", "none");
							e.css(e.get(".error-null", j.elem), "display",
									"none");
							e.css(e.get(".error-less", j.elem), "display",
									"none")
						} else {
							if (e.hasClass(t.target, "J_TRollbackInsure")) {
								var s = e.get("textarea", j.elem);
								if (s.value.length == 0) {
									e.css(e.get(".error-null", j.elem),
											"display", "inline-block")
								} else {
									if (s.value.length < 5) {
										e.css(e.get(".error-less", j.elem),
												"display", "inline-block")
									} else {
										document
												.getElementById("rollback-form")
												.submit()
									}
								}
							} else {
								if (e.hasClass(t.target, "btn-cancel")
										|| e.hasClass(t.target, "btn-ok")
										&& !e.hasClass(t.target,
												"J_TRollbackInsure")) {
									j.hide()
								}
							}
						}
					});
			a.on(h, "click", function(s) {
						j.center();
						j.show();
						j.center("#wrapper");
						j.center("#wrapper")
					})
		}
		var n = e.get("#navbar .change-module");
		if (n) {
			a.on(n, "mouseenter", function() {
						e.addClass(n, "change-hover")
					});
			a.on(n, "mouseleave", function() {
						e.removeClass(n, "change-hover")
					});
			var g, r;
			var q = c.Dialog;
			if (e.hasClass(n, "switch-new")) {
				r = e.val("#J_TSwitchToNewContent")
			} else {
				r = e.val("#J_TSwitchToOldContent")
			}
			var f = b.get("change-module", {
						mask : true,
						drag : true,
						headerContent : "",
						width : "430px"
					});
			f.set("bodyContent", r);
			f.hide();
			f.render();
			f.elem = e.get(f.getContentElement());
			a.on(n, "click", function(s) {
						f.center();
						f.show();
						f.center("#wrapper")
					});
			a.on(f.elem, "click", function(w) {
				if (e.hasClass(w.target, "btn-ok")) {
					var v = e.get("form", f.elem);
					g = e.attr(e.get(".btn-ok", v), "data-url");
					f.hide();
					var u = ".ds-change-module .ks-ext-close{display:none;}.ds-change-module .change-module{background:white;height:40px;}.ds-change-module .change-module .wait{float: left; border-right: 1px solid #cdcdcd; width: 32px; height: 32px; padding: 4px 8px;}.ds-change-module .change-module .wait-alert{font-size: 14px; line-height: 32px; color: rgb(51, 51, 51); padding-left: 48px; height: 16px;}";
					e.addStyleSheet(u);
					var t = new q({
								mask : false,
								elCls : "ds-change-module",
								width : 222,
								zIndex : 9999999,
								elStyle : {
									position : c.UA.ie == 6
											? "absolute"
											: "fixed"
								},
								align : {
									points : ["cc", "cc"]
								},
								content : e.val("#J_TChangeModule")
							});
					t.show();
					var s = e.create("<div>", {
								css : {
									position : "fixed",
									left : "0px",
									top : "0px",
									width : "100%",
									height : "100%",
									opacity : ".4",
									background : "black",
									filter : "Alpha(opacity=40)"
								}
							});
					e.addClass(s, "mask-free");
					e.insertBefore(s, "#page");
					e.css(s, "z-index", "9999998");
					e.css(s, "-moz-user-select", "none");
					c.io({
								form : v,
								type : "post",
								url : g,
								dataType : "json",
								success : function(x) {
									if (x.state == 1) {
										e.remove(".ds-change-module");
										e.remove(".change-module");
										e.remove(".mask-free");
										window.location.href = x.redirect
									} else {
										e.remove(".ds-change-module");
										e.remove(".change-module");
										e.remove(".mask-free");
										alert(x.messages)
									}
								}
							})
				}
				if (e.hasClass(w.target, "btn-cancel")) {
					f.hide()
				}
			})
		}
	}
	d();
	return d
}, {
	requires : ["../common/dialog-help"]
});
KISSY.add("scripts/platform/design/sidebar", function(d, g, j, i, b) {
	var e = g.all, c = d.DOM, k = d.Event;
	function h() {
		this.sidebarflag = 1
	}
	function f(l) {
		return l.clientHeight < l.scrollHeight
	}
	d.augment(h, {
		init : function() {
			var l = this;
			if (l.sidebarHide()) {
				l.fixMainWidth();
				return
			}
			l.switchable();
			l.fixhover();
			l.fixheight();
			l.fixscroll();
			l.sidebarhandle();
			l.sidebarToggle();
			k.on(".bar-switchable-trigger", "click", function() {
						if (l.scroll) {
							l.scroll.destroy()
						}
						c.css(".bar-switchable-panel", "height", "auto");
						l.fixscroll()
					})
		},
		fixhover : function() {
			i.fixHover([{
						selector : "#sidebar .fst",
						hClass : ".fst-hover"
					}, {
						selector : "#sidebar .switch-trigger",
						hClass : ".switch-hover"
					}, {
						selector : "#sidebar .cat-name",
						hClass : ".cat-name-hover"
					}])
		},
		fixscroll : function() {
			var o = c.height(".bar-switchable-trigger"), m = e(".switch-trigger").length, n = e(".switch-panel"), l = this;
			n.each(function(p) {
						if (e(p).css("display") == "block") {
							l.accPanelHeight = e(p).height();
							l.item = p
						}
					});
			if (c.viewportHeight() - 35 - 50 - 30 < m * o + l.accPanelHeight) {
				e(l.item).height(c.viewportHeight() - 35 - 50 - 30 - m * o);
				l.scroll = new b(e(l.item), {})
			}
		},
		fixheight : function() {
			var m = this;
			var o = c.get("#sidebar .content"), l = function() {
				c.css(o, "height", c.viewportHeight() - 35 - 50 - 30 + "px");
				e("#wrapper").height(c.viewportHeight() - 35 + "px");
				m.fixMainWidth();
				c.css("#sidebar .handler", "top", (c.viewportHeight() - 70) / 2
								- 22)
			}, n = d.buffer(l, 100);
			l();
			k.on(window, "resize", function() {
						n()
					})
		},
		switchable : function() {
			var m = this, l = j.Accordion;
			if (c.get("#J_sidebar")) {
				var n = new l("#J_sidebar", {
							panelCls : "bar-switchable-panel",
							triggerCls : "bar-switchable-trigger"
						})
			}
			if (c.get(".J_sideNav")) {
				var o = e(".J_sideNav");
				o.each(function(p) {
							if (p.one(".ks-switchable-trigger")) {
								new l(p, {
											multiple : true,
											panelCls : "ks-switchable-panel",
											triggerCls : "ks-switchable-trigger"
										})
							}
						})
			}
		},
		sidebarhandle : function() {
			c.css("#sidebar .handler", "top", (c.viewportHeight() - 70) / 2
							- 22);
			c.css("#sidebar .handler", "display", "block")
		},
		sidebarToggle : function() {
			var m = this, l = 1;
			k.on("#sidebar .handler", "click", function() {
						if (l == 1) {
							l = 0;
							m.sidebarflag = 0
						} else {
							l = 1;
							m.sidebarflag = 1
						}
						m.fixMainWidth();
						c.toggleClass("#sidebar", "off")
					})
		},
		fixMainWidth : function() {
			var l = this;
			if (l.sidebarflag === 1) {
				if (f(c.get("#wrapper"))) {
					e("#main").width(c.viewportWidth() - 184 - 17 + "px").css(
							"margin-left", "184px")
				} else {
					e("#main").width(c.viewportWidth() - 184 + "px").css(
							"margin-left", "184px")
				}
			} else {
				if (f(c.get("#wrapper"))) {
					e("#main").width(c.viewportWidth() - 17 + "px").css(
							"margin-left", 0)
				} else {
					e("#main").width(c.viewportWidth() + "px").css(
							"margin-left", 0)
				}
			}
			e("#main").css("display", "inline");
			if (d.UA.ie && 6 == d.UA.ie) {
				c.css("#sidebar", "height", c.viewportHeight() - 100);
				if (e("#main").width() < 770) {
					e("#main").width("770px")
				}
			}
			c.css("#toolbar", "width", c.width("#container"));
			k.fire("#J_TMatchColor", "resizeScroll");
			k.fire("#wrapper", "adjust")
		},
		sidebarHide : function() {
			var m = this, n = c.get("#sidebar"), l = c.hasClass(n,
					"sidebar-hide");
			if (l) {
				m.sidebarflag = 0;
				c.toggleClass("#sidebar", "off");
				c.css(n, "display", "none");
				return true
			}
			c.css(n, "display", "block");
			return false
		}
	});
	var a = new h;
	a.init()
}, {
	requires : ["node", "switchable", "../common/util", "../common/kscroll"]
});
KISSY.add("scripts/platform/design/newtoolbar", function(e, f, d, g) {
			var c = new d.Msg("#J_DSMsg");
			var h = e.Event, i = e.DOM, a = f.get("release", {
						mask : true,
						drag : true,
						headerContent : "\u53d1\u5e03",
						width : "400px"
					}), b = f.get("restore", {
						mask : true,
						drag : true,
						headerContent : "\u8fd8\u539f",
						width : "400px"
					});
			e.later(function() {
						i.css("#toolbar", "width", i.width("#main"))
					}, 10);
			a.set("bodyContent", i.val("#J_TReleaseContent"));
			a.hide();
			a.render();
			a.elem = e.DOM.get(a.getContentElement());
			a.releaseContent = e.DOM.get(".release-container", a
							.getContentElement());
			a.resultContent = e.DOM.get(".release-result", a
							.getContentElement());
			a.on("hide", function(j) {
						j.halt();
						i.removeClass(a.releaseContent, "tb-hidden hidden");
						i.addClass(a.resultContent, "tb-hidden hidden")
					});
			h.on(a.elem, "click", function(j) {
						if (i.hasClass(j.target, "J_TReleaseInsure")) {
							c.loading();
							e.IO({
										url : d.utf8URL(i.attr(j.target,
												"data-url")),
										form : "#release-form",
										dataType : "json",
										success : function(k) {
											if (k.state == "1") {
												i.addClass(a.releaseContent,
														"tb-hidden hidden");
												i.removeClass(a.resultContent,
														"tb-hidden hidden")
											} else {
												a.hide()
											}
											c.val(k.message)
										},
										error : function() {
											alert("\u7cfb\u7edf\u51fa\u9519\u5566")
										}
									})
						} else {
							if (i.hasClass(j.target, "btn-cancel")
									|| i.hasClass(j.target, "btn-ok")
									&& !i
											.hasClass(j.target,
													"J_TReleaseInsure")) {
								a.hide()
							}
						}
					});
			h.on("#J_TRealse", "click", function(j) {
						j.preventDefault();
						a.center();
						a.show();
						a.center("#wrapper")
					});
			b.set("bodyContent", i.val("#J_TRestoreContent"));
			b.hide();
			b.render();
			b.elem = i.get(b.getContentElement());
			h.on(b.elem, "click", function(j) {
						if (i.hasClass(j.target, "btn-ok")) {
							c.loading();
							e.IO({
										url : d.utf8URL(i.attr(j.target,
												"data-url")),
										form : "#restore-form",
										dataType : "json",
										success : function(k) {
											if (k.state == "1") {
												c.val(k.message);
												b.hide()
											} else {
												b.hide()
											}
										},
										error : function() {
											alert("\u7cfb\u7edf\u51fa\u9519\u5566")
										}
									})
						} else {
							if (i.hasClass(j.target, "btn-cancel")) {
								b.hide()
							}
						}
					});
			h.on("#J_TRestore", "click", function(j) {
						j.preventDefault();
						b.center();
						b.show();
						b.center("#wrapper")
					});
			h.on(".J_pageToggleTrigger", "click", function(j) {
						i.toggleClass(".togglePanel", "hide")
					});
			h.on(".J_pageToggleTrigger", "mouseenter", function(j) {
						i.addClass(j.currentTarget, "hover")
					});
			h.on(".J_pageToggleTrigger", "mouseleave", function(j) {
						i.removeClass(j.currentTarget, "hover")
					});
			if (i.get("#J_delPageBtn")) {
				h.on("#J_delPageBtn", "click", function(k) {
							k.halt();
							var j = i.attr("#J_delPageBtn", "href");
							if (true === confirm("\u786e\u5b9a\u5220\u9664\uff1f")) {
								c.loading();
								e.IO({
											url : j,
											type : "POST",
											dataType : "json",
											success : function(l) {
												c.val(l.message, l.state);
												if (l.data.redirect) {
													window.location = l.data.redirect
												}
											},
											error : function() {
												alert("\u7cfb\u7edf\u51fa\u9519\u5566")
											}
										})
							}
						})
			}
		}, {
			requires : ["../common/dialog-help", "../common/util"]
		});
KISSY.add("scripts/platform/common/cal-footer", function(a) {
			var b = a.DOM;
			function c() {
				var e = a.later(function() {
							if (d()) {
								e.cancel();
								var f = b.viewportHeight() - b.height("#main")
										- 94;
								if (f > 0) {
									b.css("#footer", "margin-top", f + "px")
								}
								b.removeClass("#footer", "hidden tb-hidden")
							}
						}, 100, true);
				function d() {
					var f = true;
					a.each(a.Env.mods, function(g) {
								if (g.status != 4) {
									f = false;
									return false
								}
							});
					return f
				}
			}
			new c
		});
KISSY.add("scripts/platform/layout/init", function(b, a, f, d, e) {
			e.fixLayout();
			var c = new d.Msg("#J_DSMsg");
			window.DShop = window.DShop || {};
			window.DShop.Msg = c;
			f.init();
			b.IO.setupConfig({
						type : "post"
					});
			b.IO.on("send", function() {
						c.loading()
					});
			b.IO.on("complete", function(g) {
						if (!b.isString(g.xhr.responseData)) {
							c.val(g.xhr.responseData.message);
							if (g.xhr.responseData.data
									&& g.xhr.responseData.data.redirect) {
								window.location.href = g.xhr.responseData.data.redirect
							}
						} else {
							c.val("\u64cd\u4f5c\u6210\u529f")
						}
					})
		}, {
			requires : ["../common/dd-module", "./layout-opt",
					"../common/util", "./fix-layout-dom", "../design/navbar",
					"../design/sidebar", "../design/newtoolbar",
					"../common/cal-footer"]
		});