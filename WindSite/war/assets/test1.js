MFP.add("category", function(a) {
	function n(a, d) {
		var e = this;
		if (e instanceof n)
			e.container = b.get(a), e.config = b.merge(m, d || {}), e.config.viewer = document
					.getElementById(d.viewId), e.triggers = c.query(d.triggers,
					e.container), e._init();
		else
			return new n(a, d)
	}
	function o(a, b) {
		for (var c = 0; c < a.length; c += 1)
			if (a[c] === b)
				return c;
		return -1
	}
	var b = KISSY, c = b.DOM, d = b.Event, e = document, f = b.UA.ie == 6, g = "selected", h = "hidden", i = "DIV", j = "mouseenter", k = "mouseleave", l = "click", m = {
		hideDelay : .2,
		view : null,
		viewCl : "",
		subViews : null,
		triggers : null,
		dataUrl : null
	}, p = {
		_msxmls : ["Microsoft.XMLHTTP", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP"],
		init : function(a, b) {
			this.timer_timeout = null, this.timer_state_watch = null, this.url = a, this.obj = {}, this
					.createXhrObject(), this.send(), this.timeout = 100, this.success = b, this.fail = function() {
			}, this.abort = function() {
			}
		},
		createXhrObject : function() {
			var a, b;
			try {
				this.obj = new XMLHttpRequest
			} catch (c) {
				for (b = 0; b < this._msxmls.length; ++b)
					try {
						this.obj = new ActiveXObject(this._msxmls[b]);
						break
					} catch (d) {
					}
			} finally {
				return a
			}
		},
		send : function() {
			this.obj.open("GET", this.url, !0), this.beginStateWatch(), this.obj
					.send(null)
		},
		beginStateWatch : function() {
			var a = this.obj, b = this;
			this.timeout && (this.timer_timeout = setTimeout(function() {
				a.abort(), clearTimeout(b.timer_timeout), b.timer_timeout = null, b
						.onAbort()
			}, this.timeout * 1e3)), this.timer_state_watch = setInterval(
					function(a) {
						return function() {
							a.handleReadyState()
						}
					}(this), 10)
		},
		handleReadyState : function() {
			var a = this.obj;
			a.readyState === 4 && a.status == 200
					? (this.timer_timeout
							&& (clearTimeout(this.timer_timeout), this.timer_timeout = null), clearInterval(this.timer_state_watch), this.timer_state_watch = null, this
							.onSuccess())
					: a.readyState === 4 && this.onFail()
		},
		onSuccess : function() {
			this.success(this.obj)
		},
		onAbort : function() {
			this.abort(this.obj)
		},
		onFail : function() {
			this.fail(this.obj)
		}
	};
	b.mix(n.prototype, {
		switchTo : function(a) {
			var d = this, e = d.triggers, f = d.subViews;
			b.each(e, function(a) {
						c.removeClass(a, g)
					}), c.addClass(d.triggers[a], g), b.each(f, function(a) {
						c.addClass(a, h)
					}), c.removeClass(f[a], h)
		},
		show : function() {
			var a = this;
			a.container.style.zIndex = 20, c.removeClass(a.viewer, h), a
					.resetPostion()
		},
		resetPostion : function() {
			var a = this.triggers[this.config.idx], b = c.offset(a), d = c
					.offset(this.container), e = c.height(a), f = c
					.height(this.viewer), g = c.width(a), h = c
					.viewportHeight(), i = c.scrollTop(), j = h - f
					- (b.top - i), k = Math.abs(b.top - i - d.top), l = h
					- (b.top - i), m = b.top - d.top;
			if (j <= 0) {
				j = Math.abs(j);
				var n = 20;
				if (l > e) {
					var o = l - e;
					o > n ? m = m - j - n + 7 : m -= j
				} else
					m = m - j + n + l + 20
			}
			m < 30 && (m = 30), this.viewer.style.top = m + "px"
		},
		hide : function() {
			var a = this, d = a.triggers;
			a.container.style.zIndex = 15, b.each(d, function(a) {
						c.removeClass(a, g)
					}), c.addClass(a.viewer, h)
		},
		getViewerData : function(c) {
			var d = this;
			if (d.viewer = b.get("#" + d.config.viewId)) {
				d._initSubView();
				if ("hidden" == d.status)
					return;
				d.switchTo(d.config.idx), d.show(), d.config.getting = !0
			}
			if (d.config.getting)
				return;
			p.init(c, function(b) {
						d.config.viewer = b.responseText, d._initView();
						if ("hidden" == d.status)
							return;
						a.DirectPromo.render(), d.switchTo(d.config.idx), d
								.show()
					}), d.config.getting = !0
		},
		_init : function() {
			var a = this, c = a.config;
			b.each(a.triggers, function(b) {
				d.on(b, j, function(c) {
					c.halt();
					var d = o(a.triggers, b);
					a.config.idx = d, a.status = "visible";
					if (!a.viewer) {
						if (!a.config.viewer) {
							a.getViewerData(f ? a.config.dataUrl + "?t="
									+ +(new Date) : a.config.dataUrl);
							return
						}
						a._initView()
					}
					a.showTimer && clearTimeout(a.showTimer), a.showTimer = setTimeout(
							function() {
								a.hideTimer || (a.switchTo(d), a.show())
							}, a.config.hideDelay * 1e3), a.hideTimer = clearTimeout(a.hideTimer)
				}), d.on(b, k, function(b) {
					a.status = "hidden", a.showTimer
							&& clearTimeout(a.showTimer);
					if (a.hideTimer)
						return;
					a.hideTimer = setTimeout(function() {
								a.hide(), a.hideTimer = clearTimeout(a.hideTimer)
							}, a.config.hideDelay * 1e3)
				})
			})
		},
		_initView : function() {
			var a = this, c = a.config, d = b.DOM;
			a.viewer
					|| ((a.viewer = b.get("#" + a.config.viewId))
							|| (a.viewer = e.createElement(i), d.attr(a.viewer,
									"id", c.viewId), d.addClass(a.viewer,
									"hidden " + c.viewCl), a.viewer.innerHTML = c.viewer, a.container
									.appendChild(a.viewer)), a._initSubView())
		},
		_initSubView : function() {
			var a = this, e = 0;
			a.subViews = c.query(a.config.subViews, a.container), b.each(
					a.subViews, function(b) {
						var e = c.query("dl.J_HotMenuItem", b), f = c.query(
								"div.J_HotView", b), g;
						d.on(b, j, function() {
							a.hideTimer = clearTimeout(a.hideTimer), a.selectedSubView = this
						}), d.on(b, k, function() {
							a.hideTimer = setTimeout(function() {
								a.hide(), a.hideTimer = clearTimeout(a.hideTimer)
							}, a.config.hideDelay * 1e3)
						})
					})
		}
	}), a.Category = n
});/* publish time:2011-09-06 15:39:22 */