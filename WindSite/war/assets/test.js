(function(c, d) {
	if (c.define) {
		return
	}
	function e(i) {
		return Object.prototype.toString.call(i) === "[object Function]"
	}
	var g = {};
	var k = null;
	var b = document.getElementsByTagName("script");
	for (var m = 0, j = b.length; m < j && !k; m++) {
		k = b[m].getAttribute("data-main")
	}
	if (!k) {
		throw new Error("No data-main attribute in script tag.")
	}
	function h(l) {
		if (!g[l]) {
			throw new Error("Module " + l + " is not defined.")
		}
		var i = g[l];
		if (i.inited === false) {
			f(l)
		}
		return i.ret
	}
	function f(o) {
		var n = {};
		var l = g[o];
		if (e(g[o].factory)) {
			var i = g[o].factory.apply(d, [h, n, d]);
			l.ret = i === d ? n : i
		} else {
			l.ret = g[o].factory
		}
		l.inited = true
	}
	function a(i, n, l) {
		if (g[i]) {
			throw new Error("Module " + i + " has been defined already.")
		}
		if (e(n)) {
			l = n
		}
		g[i] = {
			factory : l,
			inited : false
		};
		if (i === k) {
			f(i)
		}
	}
	c.define = a
})(window);
define("common/es5", function(c, b, a) {
(function	(d) {
				d.bind || (d.bind = function(e) {
					var f = this;
					return function() {
						return f.apply(e, arguments)
					}
				})
			})(Function.prototype);
(function	(d) {
				var e = d.setInterval;
				var f = d.setTimeout;
				d.setInterval = function() {
					var g = arguments;
					var i = g[0];
					var j = g[1];
					var h = Array.prototype.slice.call(g, 2);
					return e(function() {
								i.apply(window, h)
							}, j)
				};
				d.setTimeout = function() {
					var g = arguments;
					var i = g[0];
					var j = g[1];
					var h = Array.prototype.slice.call(g, 2);
					return f(function() {
								i.apply(window, h)
							}, j)
				}
			})(window)
		});
define("common/lib_plus", function(e, b, a) {
	var f = e("common/config");
	var d = e("common/user_account");
	$.fancybox.show = function(h, i) {
		$.fancybox({
					content : h,
					centerOnScroll : true,
					modal : true,
					overlayOpacity : 0.6,
					overlayColor : "#000000",
					onComplete : function() {
						if ($.isFunction(i)) {
							i()
						}
					}
				})
	};
	$(".fancybox-close").live("click", function(h) {
				$.fancybox.close();
				h.preventDefault()
			});
(function() {
		var j = $(".def-feild");
		var h;
		var i;
		j.live("focus", function() {
					var k = $(this);
					h = $.trim(k.val());
					i = k.attr("def-data");
					if (h === i) {
						k.val("");
						k.removeClass("color-gray")
					}
				});
		j.live("blur", function() {
					var k = $(this);
					h = $.trim(k.val());
					i = k.attr("def-data");
					if (h === "" || h === i) {
						k.val(i);
						k.addClass("color-gray")
					}
				})
	})();
	$(".js-log").live("click", function() {
				var j = $(this);
				var i = j.data("log");
				var h;
				var k;
				if (!i) {
					return
				}
				h = j.closest(".mod");
				k = f.log + i;
				if (h.length !== 0 && h.id !== "") {
					k += "&mod=" + h.attr("id")
				}
				$("<img>").attr("src", k)
			});
	$("a").live("click", function() {
		var h = $(this).attr("href");
		if (!h || !window._gaq) {
			return
		}
		if (h.indexOf(location.host) === 7 || h.indexOf(location.host) === 8
				|| h.indexOf("http") != 0) {
			_gaq.push(["_trackEvent", "Self", "Click", h])
		} else {
			_gaq.push(["_trackEvent", "Others", "Click", h])
		}
	});
	$(".login").live("click", function(h) {
				d.isLogin(function() {
							window.location.reload()
						});
				h.preventDefault()
			});
	$(".discount-f-share").live({
				mouseover : function() {
					$(this).addClass("active")
				},
				mouseout : function() {
					$(this).removeClass("active")
				}
			});
	$(".discount-f-share .discount-share-ctn a").live("click", function() {
				var h = $(this).data("url");
				$.ajax({
							url : h,
							type : "GET",
							dataType : "json",
							timeout : 30000,
							cache : false,
							success : function(i) {
							},
							error : function(i) {
							}
						})
			});
	$(".discount-f-fav a").live("click", function(j) {
				var h = $(this).data("id");
				var i = $(this).parent().parent().find(".discount-f-fav");
				d.isActive(function() {
							$.fancybox.close();
							i.eq(0).fadeOut("fast", function() {
										i.eq(1).fadeIn("fast")
									});
							$.ajax({
										url : f.favor(h),
										type : "GET",
										dataType : "json",
										timeout : 30000,
										cache : false,
										success : function(k) {
										},
										error : function(k) {
										}
									})
						});
				j.preventDefault()
			});
	var g = (function() {
		var h;
		return {
			showError : function(i) {
				if (!h) {
					h = $("#tmpl-promptDialog")
				}
				if (!i || typeof i !== "string") {
					i = f.errorMsg
				}
				$.fancybox.show(h.tmpl({
							message : i
						}))
			},
			userAccount : d,
			faq : function() {
				var i = [
						"http://chat10.live800.com/live800/chatClient/chatbox.jsp?companyID=210734&configID=181519&jid=2116824014&skillId=10527",
						"&enterurl=", window.location.href].join("");
				window
						.open(
								i,
								"",
								"width=600px, height=500px, top=0, left=0, toolbar=no, menubar=0, scrollbars=no, resizable=no, location=no, status=no")
			}
		}
	})();
	var c = e("common/app.ctrl");
	c.extend(g);
	e("common/app_loading")
});
define("modules/global/top/notice_remind", function(e, c, b) {
			var f = {
				events : {},
				on : function(g, i, h) {
					this.events[g] = this.events[g] || [];
					this.events[g].push({
								callback : i,
								context : h
							})
				},
				trigger : function(g, h) {
					$.each(this.events[g], function(i, j) {
								j.callback.call(j.context, h)
							})
				}
			};
			var d = $.extend({}, f, {
						data : {},
						updateData : function(g) {
							this.data = g;
							this.trigger("render", this.data)
						}
					});
			var a = (function() {
				var i = $("#top");
				var l = i.find(".msg");
				var h = i.find("b.count");
				var j = i.find(".msg-no-info");
				var g = i.find(".msg-info");
				var m = i.find(".show-msg");
				var k = g.find(".show-msg-ctn");
				var n = {};
				return {
					init : function() {
						d.on("render", this.render, this)
					},
					render : function() {
						var o = d.data;
						var p = false;
						if (o.count === 0) {
							l.addClass("no-msg");
							g.hide();
							j.show();
							l.removeClass("current");
							m.hide();
							n = o.data;
							return
						}
						if (o.count > 99) {
							o.count = "99+"
						}
						l.removeClass("no-msg");
						h.html(o.count);
						g.show();
						j.hide();
						k.hide();
						$.each(o.data, function(s, r) {
									var q = k.filter("[data-name=" + s + "]");
									q.find("b").html(r);
									q.show()
								});
						$.each(o.data, function(r, q) {
									if (!n[r] || n[r] < q) {
										p = true
									}
								});
						if (p) {
							l.addClass("current");
							m.show()
						}
						n = o.data
					}
				}
			})();
			a.init();
(function	() {
				var j = e("common/cookie");
				var n = e("common/config");
				var p = e("common/transceiver").create();
				var q = "notice";
				var i = n.noticeTime * 1000;
				var m = 3 * 1000;
				var l = null;
				if (!j.get("NTES_LOGINED")) {
					return
				}
				function h() {
					try {
						$.ajax({
									cache : false,
									dataType : "json",
									timeout : 30000,
									type : "GET",
									url : n.notice,
									success : function(t) {
										var u = {
											count : 0,
											data : {}
										};
										if (t.status !== "succ") {
											g();
											return
										}
										$.each(t.data, function(x, w) {
													var v = parseInt(w);
													if (v) {
														u.count += v;
														u.data[x] = v
													}
												});
										noticeMsg = {
											data : u,
											isLock : false,
											lastUpdate : +new Date()
										};
										try {
											j.update(q,
													JSON.stringify(noticeMsg));
											d.updateData(noticeMsg.data)
										} catch (s) {
										}
									},
									error : function(s) {
										g()
									}
								})
					} catch (r) {
					}
				}
				function g() {
					try {
						j.del(q)
					} catch (r) {
					}
					window.clearInterval(l)
				}
				function k() {
					var s = JSON.stringify({
								isLock : true
							});
					try {
						j.update(q, s)
					} catch (r) {
						j.add(q, s)
					}
					h()
				}
				function o() {
					var s = j.get(q);
					if (!j.get("NTES_LOGINED")) {
						g();
						return
					}
					if (!s) {
						k();
						return
					}
					try {
						s = unescape(s);
						s = JSON.parse(s);
						if (typeof s !== "object"
								|| typeof s.isLock === "undefined") {
							k();
							return
						}
					} catch (r) {
						k();
						return
					}
					if (s.isLock) {
						return
					}
					if (+new Date() - s.lastUpdate > i) {
						s.isLock = true;
						j.update(q, JSON.stringify(s));
						h();
						return
					}
					d.updateData(s.data)
				}
				l = window.setInterval(o, m);
				p.listen("top:notice", function() {
							var r = [].slice.call(arguments)[0];
							if (r.refresh) {
								h()
							}
						})
			})()
		});
define("modules/global/top/order_remind", function(h, b, a) {
			var d = h("common/cookie");
			var k = h("common/config");
			var g = "gw_fo";
			var j = k.noticeTime * 1000;
			var e = null;
			var l = $("#fxOrderTips");
			function f() {
				var m = d.get(g);
				if (m && m === "true") {
					l.fadeIn("fast")
				}
			}
			l.delegate(".close", "click", function(m) {
						d.update(g, "false");
						l.fadeOut("fast")
					});
			f();
			e = window.setInterval(f, j);
			if (!window.XMLHttpRequest) {
				var i = function() {
					var n = $(document).scrollTop();
					var m = $(window).height();
					l.css("top", n + m - 185 + "px")
				};
				var c = null;
				var j = 50;
				$(window).bind("scroll", function() {
							window.clearTimeout(c);
							c = window.setTimeout(i, j)
						});
				i()
			}
		});
define("modules/global/top/top", function(g, d, c) {
			var b = $("#top");
			var f = b.find(".welinfo");
			var a = b.find(".show-msg");
			var e = b.find(".sctop-help");
			var h = g("common/config");
			var i = g("common/transceiver").create();
			e.hover(function() {
						e.addClass("current")
					}, function() {
						e.removeClass("current")
					});
			b.delegate(".welinfo-name", "click", function(j) {
						j.preventDefault();
						j.stopPropagation();
						f.toggleClass("active")
					});
			$(document).click(function() {
						if (f.hasClass("active")) {
							f.removeClass("active")
						}
					});
			b.delegate(".msg", "click", function(j) {
						j.preventDefault();
						a.toggle();
						$(this).toggleClass("current")
					});
			b.delegate("span.ignore a", "click", function(j) {
						j.preventDefault();
						$.ajax({
									cache : false,
									dataType : "json",
									timeout : 30000,
									type : "GET",
									url : h.readAll,
									success : function(k) {
										a.hide();
										b.find(".msg").removeClass("current");
										i.trigger("top:notice", {
													refresh : true
												})
									},
									error : function(k) {
									}
								})
					})
		});
define("modules/global/search_box/suggest", function(e, c, b) {
	$.widget("custom.gouwuComplete", $.ui.autocomplete, {
				_suggest : function(g) {
					$.ui.autocomplete.prototype._suggest.call(this, g);
					var f = this.menu.element;
					var h = parseInt(f.css("top")) + 10;
					f.css({
								top : h + "px",
								"z-index" : 99
							})
				},
				_create : function() {
					$.ui.autocomplete.prototype._create.call(this);
					var f = this;
					this.element.unbind("keydown.autocomplete");
					this.element.bind("keydown.autocomplete", function(h) {
								if (f.options.disabled
										|| f.element.propAttr("readOnly")) {
									return
								}
								var i = false;
								var g = $.ui.keyCode;
								switch (h.keyCode) {
									case g.PAGE_UP :
										f._move("previousPage", h);
										break;
									case g.PAGE_DOWN :
										f._move("nextPage", h);
										break;
									case g.UP :
										f._move("previous", h);
										h.preventDefault();
										break;
									case g.DOWN :
										f._move("next", h);
										h.preventDefault();
										break;
									case g.ENTER :
									case g.NUMPAD_ENTER :
										if (f.menu.active) {
											i = true
										}
									case g.TAB :
										if (!f.menu.active) {
											return
										}
										f.menu.select(h);
										break;
									case g.ESCAPE :
										f.element.val(f.term);
										f.close(h);
										break;
									default :
										clearTimeout(f.searching);
										f.searching = setTimeout(function() {
													if (f.term != f.element
															.val()) {
														f.selectedItem = null;
														f.search(null, h)
													}
												}, f.options.delay);
										break
								}
							});
					this.menu.element.click(function(g) {
								if (!$(g.target).closest(".ui-menu-item a").length) {
									return
								}
								if (f.selectedItem) {
									d.selected.call(window, f.selectedItem)
								}
							})
				}
			});
	var d = (function() {
		var j = e("common/config");
		var l = j.getGoodsSugget;
		var m = null;
		var f = null;
		var i = {};
		var h = {
			callback : null,
			get : function(n) {
				var o;
				if (m) {
					m.remove();
					m = null
				}
				if (!!!f) {
					f = $("body")
				}
				o = l + "&query=" + encodeURIComponent(n);
				m = $('<script type="text/javascript" charset="utf-8" src=' + o
						+ ">");
				f.append(m)
			},
			updateCall : function(n) {
				if ($.isFunction(this.callback)) {
					this.callback(n)
				}
			}
		};
		var g = function(n) {
			window.open(n.url)
		};
		var k = function(n) {
			n.gouwuComplete({
						source : function(q, o) {
							var p = q.term;
							if (i[p]) {
								o($.map(i[p].r, function(r) {
											return r
										}));
								return
							}
							h.callback = function(r) {
								i[p] = r;
								o($.map(r.r, function(s) {
											return s
										}))
							};
							h.get(q.term)
						},
						select : function(p, o) {
						}
					})
		};
		window._hui_goods = h;
		return {
			bind : k,
			selected : g
		}
	})();
	var a = {
		init : function() {
			var f = $("div.mod-search-box input.search-value").eq(0);
			d.bind(f)
		}
	};
	a.init()
});
define("modules/global/search_box/tips", function(d, c, b) {
			var a = {
				init : function() {
					this.selector = {
						sValue : "div.mod-search-box input.search-value",
						sButton : "div.mod-search-box input.search-btn"
					};
					this.focus();
					this.addEvent()
				},
				focus : function() {
					var e = $(this.selector.sValue).eq(0);
					var f = $(document).scrollTop();
					if ($.trim(e.val()) === "") {
						e.prev().show();
						if (e.offset().top > f) {
							e[0].focus()
						}
					}
				},
				addEvent : function() {
					var e = this.selector.sValue;
					this.onChange = this.onChange.bind(this);
					if ($.browser.msie) {
						$(document).delegate(e, "keydown", this.onChange);
						$(document).delegate(e, "keyup", this.onChange);
						$(document).delegate(e, "keypress", this.onChange)
					} else {
						$(document).delegate(e, "input", this.onChange)
					}
					$(document).delegate(e, "focus", this.onFocus);
					$(document).delegate(e, "blur", this.onBlur);
					if (!window.XMLHttpRequest) {
						$(document).delegate(this.selector.sButton, {
									mouseover : this.onBtnMouseOver,
									mouseout : this.onBtnMouseOut
								})
					}
				},
				onChange : function(f) {
					var g = $(f.target);
					if ($.trim(g.val()) !== "") {
						g.prev().hide()
					}
				},
				onFocus : function(f) {
					$(f.target).prev().hide()
				},
				onBlur : function(f) {
					var g = $(f.target);
					if ($.trim(g.val()) === "") {
						g.prev().show()
					}
				},
				onBtnMouseOver : function(f) {
					$(f.target).addClass("search-btn-hover")
				},
				onBtnMouseOut : function(f) {
					$(f.target).removeClass("search-btn-hover")
				}
			};
			a.init()
		});
define("modules/global/nav/nav", function(d, b, a) {
			var h = $("#nav .shops");
			var e = $("#nav .toolbar-rss");
			var g = $("#nav .nav-toolbar-rss");
			var f = $("#nav .toolbar-rss-show");
			var c;
			h.hover(function() {
						h.addClass("active")
					}, function() {
						h.removeClass("active")
					});
			e.hover(function() {
						g.addClass("active")
					}, function() {
						timer = setTimeout(function() {
									g.removeClass("active")
								}, 500)
					});
			f.hover(function() {
						clearTimeout(timer)
					}, function() {
						g.removeClass("active")
					})
		});
define("modules/global/nav/favorite", function(d, c, b) {
			var a = {
				init : function() {
					this.url = window.location.href;
					this.title = window.document.title;
					this.addFav = this.addFav.bind(this);
					$(document).delegate("#nav a.toolbar-collect", "click",
							this.addFav)
				},
				addFav : function() {
					if (document.all && window.external) {
						window.external.AddFavorite(this.url, this.title)
					} else {
						if (window.sidebar) {
							window.sidebar.addPanel(this.title, this.url, "")
						} else {
							alert("浏览器不支持，请按Ctrl+D手动加入收藏夹!")
						}
					}
				}
			};
			a.init()
		});
define("modules/user_center/uc_tips/uc_tips", function(d, b, a) {
			var c = $("#ucTips .uc-tips-ctn p");
			var e = 0;
			c.hide();
			c.first().show();
			window.setInterval(function() {
						c.eq(e).fadeOut();
						e++;
						if (e >= c.length) {
							e = 0
						}
						c.eq(e).fadeIn()
					}, 3000)
		});
define("modules/user_center/uc_order_select/uc_order_select",
		function(e, d, c) {
			var b = $("#ucOrderSelect");
			var a = b.find(".cal");
			a.datepicker({
						minDate : "2009-1-1",
						maxDate : new Date(),
						changeMonth : true,
						changeYear : true,
						showOtherMonths : true,
						selectOtherMonths : true,
						dateFormat : "yy-mm-dd",
						monthNamesShort : ["01", "02", "03", "04", "05", "06",
								"07", "08", "09", "10", "11", "12"],
						dayNamesMin : ["日", "一", "二", "三", "四", "五", "六"]
					});
			a.eq(0).datepicker("option", "maxDate", a.eq(1).val());
			a.eq(1).datepicker("option", "minDate", a.eq(0).val());
			a.eq(0).datepicker("option", "onSelect", function(f, g) {
						a.eq(1).datepicker("option", "minDate", f)
					});
			a.eq(1).datepicker("option", "onSelect", function(f, g) {
						a.eq(0).datepicker("option", "maxDate", f)
					});
			a.bind("keydown", function() {
						return false
					});
			b.find(".submit").live("click", function(f) {
						f.preventDefault();
						b.find("form").submit()
					})
		});
define("modules/user_center/uc_order_list_wait/uc_order_list_wait", function(d,
				c, b) {
			var f = d("common/ajax_pager_html");
			var e = d("common/transceiver").create();
			var a = $("#ucOrderList");
			f.bind({
						$container : a,
						$buttons : a.find(".paging a"),
						$loading : a.find(".position-paging-loading")
					});
			a.find(".show-help").live("click", function(h) {
						var g = a.find(".help");
						g.show()
					});
			a.find(".close-box").live("click", function(h) {
						var g = a.find(".help");
						g.hide()
					});
			e.trigger("top:notice", {
						refresh : true
					})
		});
define("fragments/user_center/kf/kf", function(c, b, a) {
			var d = {
				init : function() {
					this.selector = {
						module : "div.uc-support-kf",
						button : "a.btn-support-kf"
					};
					this.authUrl = "/minisite/kf";
					this.addEvent()
				},
				addEvent : function() {
					this.onKFClick = this.onKFClick.bind(this);
					this.showSuccDialog = this.showSuccDialog.bind(this);
					this.showError = this.showError.bind(this);
					var e = [this.selector.module, this.selector.button]
							.join(" ");
					$(document).delegate(e, "click", this.onKFClick)
				},
				onKFClick : function(f) {
					var g = $(f.target).closest(this.selector.button);
					$.ajax({
								url : g.data("vUrl"),
								type : "get",
								dataType : "json",
								success : this.showSuccDialog,
								error : this.showError
							})
				},
				showSuccDialog : function(e) {
					var f = c("common/transceiver").create();
					if (e.status === "succ") {
						f.trigger("kf:success:dialog", e);
						return
					}
					this.showError(e.message)
				},
				showError : function(e) {
					App.showError(e)
				}
			};
			d.init()
		});
define("fragments/user_center/kf/tips", function(c, b, a) {
			var d = {
				init : function() {
					this.selector = {
						module : "div.uc-support-kf",
						wrapper : "div.uc-support-ctn",
						button : "div.uc-support-ctn a.ico-kfend",
						tips : "div.uc-support-ctn div.kf-tips"
					};
					this.handle = {};
					this.addEvent()
				},
				addEvent : function() {
					this.showTips = this.showTips.bind(this);
					this.hideTips = this.hideTips.bind(this);
					var e = [
							[this.selector.module, this.selector.button]
									.join(" "),
							[this.selector.module, this.selector.tips]
									.join(" ")].join(", ");
					$(document).delegate(e, {
								mouseover : this.showTips,
								mouseout : this.hideTips
							})
				},
				showTips : function(f) {
					var g = $(f.target).closest(this.selector.wrapper);
					var h = g.data("key");
					if (!h) {
						h = +new Date();
						g.data("key", h)
					}
					window.clearTimeout(this.handle[h]);
					g.addClass("kf-tips-active")
				},
				hideTips : function(f) {
					var g = $(f.target).closest(this.selector.wrapper);
					var h = g.data("key");
					this.handle[h] = window.setTimeout(function() {
								g.removeClass("kf-tips-active")
							}, 50)
				}
			};
			d.init()
		});
define("modules/user_center/uc_faq/uc_faq", function(c, b, a) {
			$("#ucFaq .uc-faq-wrap h3").live("click", function() {
						var d = $(this).parent();
						if (d.hasClass("current")) {
							d.removeClass("current")
						} else {
							d.addClass("current")
						}
					})
		});
define("modules/user_center/uc_subnav/uc_subnav", function(d, b, a) {
			var c = $("#ucSubnav");
			if (c.length === 0) {
				return
			}
			var e = d("common/config");
			c.delegate("li.uc-subnav-num a", "click", function(h) {
						var g = $(this).find("b");
						if (g.length > 0) {
							g.remove();
							f()
						}
					});
			function f() {
				$.ajax({
							url : e.updatePriceCutSubscriptionCount,
							cache : false
						})
			}
		});
define("modules/minisite/template/kf/kf_success_dialog/kf_success_dialog",
		function(c, b, a) {
			var d = {
				init : function() {
					var e = c("common/transceiver").create();
					e.listen("kf:success:dialog", this.show);
					this.$tmpl = null;
					this.show = this.show.bind(this);
					$(document).delegate("#kfSuccessDialog .reload", "click",
							function() {
								if ($("#ucOrderList").length === 0) {
									window.location = window.location;
									return
								} else {
									var f = $("#ucOrderList .hd .inner a")
											.eq(1).attr("href");
									window.location = f
								}
							})
				},
				show : function(e) {
					this.$tmpl = this.$tmpl || $("#tmpl-kfSuccessDialog");
					$.fancybox.show(this.$tmpl.tmpl(e))
				}
			};
			d.init()
		});
define("fragments/login/login", function(e, b, a) {
	var c = e("common/validate_feild");
	var f = e("common/account_suggest");
	var d = {
		init : function() {
			this.selector = {
				container : "div.login-container",
				userName : "input.input-s[name=username]",
				password : "input.input-s[name=password]",
				skipUrl : "input[name=url]",
				validateTip : "#loginTiparea",
				validateTipCloseButton : "#loginTiparea a",
				saveLogin : "#savelogin",
				saveLoginTip : "#rememberPsw",
				saveLoginTipCloseButton : "#rememberPsw a"
			};
			this.addEvent();
			var g = $(this.selector.container);
			if (g.length === 0) {
				return
			}
			var i = g.find(this.selector.userName);
			var h = g.find(this.selector.password);
			var j = new f({
						obj : i,
						password : h,
						appendTo : "div.login-container div.frm-login.login-tip"
					})
		},
		addEvent : function() {
			var g = null;
			for (g in this) {
				if (typeof this[g] === "function") {
					this[g] = this[g].bind(this)
				}
			}
			$(document).delegate(this.selector.saveLogin, {
						mouseover : this.showsaveLoginTip,
						mouseout : this.hidesaveLoginTip
					});
			$(document).delegate(this.selector.saveLoginTipCloseButton,
					"click", this.hidesaveLoginTip);
			$(document).delegate(this.selector.container + " form", "submit",
					this.onSubmit);
			$(document).delegate(this.selector.validateTipCloseButton, "click",
					this.hideValidateTip);
			$(document).delegate(
					this.selector.container + " " + this.selector.userName,
					"focus", this.hideValidateTip);
			$(document).delegate(
					this.selector.container + " " + this.selector.password,
					"focus", this.hideValidateTip)
		},
		showsaveLoginTip : function() {
			$(this.selector.saveLoginTip).show()
		},
		hidesaveLoginTip : function() {
			$(this.selector.saveLoginTip).hide()
		},
		showValidateTip : function() {
			$(this.selector.validateTip).show()
		},
		hideValidateTip : function() {
			$(this.selector.validateTip).hide()
		},
		onSubmit : function(h) {
			var g = $(this.selector.container);
			var k = g.find(this.selector.userName);
			var i = g.find(this.selector.password);
			var n = g.find(this.selector.skipUrl);
			var l = $.trim(k.val());
			var m = $.trim(i.val());
			var j = k.attr("def-data");
			if ($.trim(n.val()) === "") {
				n.val(window.location.href)
			}
			if (l === "" || l === j || !c.rules.email.test(l)
					|| !c.rules.min6(m)) {
				this.showValidateTip();
				h.preventDefault()
			}
		}
	};
	d.init()
});
define("fragments/activate/activate", function(d, b, a) {
			var c = {
				init : function() {
					this.selector = {
						agree : "#userActivateDailog2",
						submitButton : ".activate-container .login-btn span",
						form : ".activate-container form"
					};
					this.onAgree = this.onAgree.bind(this);
					this.onSubmit = this.onSubmit.bind(this);
					$(document).delegate(this.selector.agree, "click",
							this.onAgree);
					$(document).delegate(this.selector.form, "submit",
							this.onSubmit)
				},
				onAgree : function(f) {
					var g = $(this.selector.submitButton);
					if (!$(this.selector.agree).attr("checked")) {
						g.attr("class", "btni06")
					} else {
						g.attr("class", "btni04")
					}
				},
				onSubmit : function(f) {
					var g = $(this.selector.submitButton);
					if (g.attr("class") !== "btni04") {
						f.preventDefault();
						return
					}
				}
			};
			c.init()
		});
define("common/user_account", function(f, c, b) {
	var d = f("common/cookie");
	var a = f("common/config");
	var g = f("common/account_suggest");
	var e = {
		$activeTmpl : null,
		$loginTmpl : null,
		activeCallBack : null,
		init : function() {
			var h = null;
			for (h in this) {
				if (typeof this[h] === "function") {
					this[h] = this[h].bind(this)
				}
			}
		},
		isLogin : function(h) {
			if (d.get("NTES_LOGINED")) {
				if (typeof h === "function") {
					h()
				}
				return
			}
			this.$loginTmpl = this.$loginTmpl || $("#tmpl-loginDailog");
			$.fancybox.show(this.$loginTmpl.tmpl(), this.bindLoginForm)
		},
		isActive : function(h) {
			this.activeCallBack = h;
			this.isLogin(this.resetCookie)
		},
		resetCookie : function() {
			var h = {
				type : "CHECK_ACTIVATE",
				pwd : new Date().getTime()
			};
			$.ajax({
						cache : false,
						data : h,
						timeout : 30000,
						url : a.userInfo,
						success : this.checkActive
					})
		},
		checkActive : function() {
			if (d.get("gw_activated")) {
				if (typeof this.activeCallBack === "function") {
					this.activeCallBack()
				}
				return
			}
			this.$activeTmpl = this.$activeTmpl || $("#tmpl-userActiveDailog");
			$.fancybox.show(this.$activeTmpl.tmpl(), this.bindActiveForm)
		},
		bindLoginForm : function() {
			var i = $("div.login-container input.input-s[name=username]");
			var h = $("div.login-container input.input-s[name=password]");
			var j = new g({
						obj : i,
						password : h,
						appendTo : "div.login-container"
					})
		},
		bindActiveForm : function() {
			$(document).delegate(".activate-container form", "submit",
					this.onActiveSubmit)
		},
		onActiveSubmit : function(h) {
			var i = $(".activate-container .login-btn span");
			if (i.attr("class") !== "btni04") {
				return
			}
			var j = {
				subEdm : 0
			};
			if ($("#userActivateDailog1").attr("checked")) {
				j.subEdm = 1
			}
			$.ajax({
						cache : false,
						data : j,
						dataType : "json",
						timeout : 30000,
						type : "post",
						url : a.active,
						success : this.onActiveSucc,
						error : this.showActiveError
					});
			h.preventDefault()
		},
		onActiveSucc : function(h) {
			if (h.status === "succ") {
				if (typeof this.activeCallBack === "function") {
					this.activeCallBack()
				} else {
					$.fancybox.close()
				}
			} else {
				this.showActiveError()
			}
		},
		showActiveError : function() {
			var h = "真抱歉！系统出错啦，请稍后到网易返现首页激活吧~<br />您可以先在网易返现或去商城逛逛，但购物前记得一定要先激活才能拿返现哦~";
			App.showError(h)
		}
	};
	e.init();
	return e
});
define("common/app_loading", function(d, b, a) {
	var e = $('<div style="position:absolute;top:0;width:100%;background-color:#FFF;z-index:auto;">');
	var c = false;
	var g = false;
	var f = {};
	e.css("opacity", 0.5);
	f.loading = {
		shade : function(i) {
			var h;
			if (c) {
				return
			}
			c = true;
			if (!!!i) {
				i = $("body")
			}
			h = i.height();
			e.css("height", h + "px");
			if (i.css("position") === "static") {
				i.css("position", "relative");
				g = true
			}
			e.appendTo(i)
		},
		shadeMove : function() {
			if (g) {
				e.parent().css("position", "static");
				g = false
			}
			e.remove();
			c = false
		}
	};
	$.extend(App, f)
});
define("common/app.ctrl", function(e, c, b) {
			window.App = window.App || {};
			var a = window.App;
			function f() {
				return a
			}
			function d(g) {
				$.extend(a, g)
			}
			return {
				getInstance : f,
				extend : d
			}
		});
define("common/config", function(e, c, b) {
	var a = "";
	var d = {
		active : "/activate/request.json",
		baseUrl : a,
		data : a + "back.php",
		errorImage : "http://placehold.it/670x450",
		errorMsg : "真抱歉！系统出错啦！请稍后访问！",
		exchangeCash163 : "/account/epay/transfer.json",
		exchangeCashAlipay : "/account/alipay/transfer.json",
		exchangeGoods : function(f, g) {
			return "/coupons/" + f + "/exchange.json"
		},
		exchangeRate : 100,
		favor : function(f) {
			return "/deals/" + f + "/fav.json"
		},
		getAlipayAccount : "/account/alipay/info.json",
		getCouponsSugget : "/suggest/coupons.json",
		getGoodsPics : function(f) {
			return a + "back.php?call=getGoodsPics&id=" + f
		},
		getGoodsPrices : function(f) {
			return a + "back.php?call=getGoodsPrices&id=" + f
		},
		getGoodsSugget : "http://gsuggest.ydstatic.com/suggest/suggest.s?o=_hui_goods&count=10&keyfrom=GouwuSuggest.suggest",
		getPageHtml : function(f) {
			return a + "back.php?call=getPageHtml&pageNo=" + f
		},
		getShop : a + "getShop.php",
		getShopComment : function(f, g) {
			return "/mall/" + f + "/comments?1=1&page=" + g
		},
		getShopSugget : "/suggest/shops.json",
		getUserPoint : "/account/summary/available.json",
		isTest : "test",
		log : "/log?",
		noticeTime : 30,
		notice : "/remind/unread.json",
		postShopComment : function(f) {
			return "/mall/" + f + "/comments.json"
		},
		readAll : "/remind/read_all.json",
		saveUnionLogin : "/account/union",
		setAccount : "/account/info/identity.json",
		setAlipayAccount : "/account/alipay/info/modify.json",
		share : function(f) {
			return "/deals/" + f + "/share.json"
		},
		userInfo : "/log",
		updateUserInfo : "/account/info/update.json",
		check : a + "/log",
		getDomain : function() {
			var f = window.location.host.split(":")[0];
			return "." + f
		}
	};
	return d
});
define("common/cookie", function(e, b, a) {
			var d = function(k, f, h) {
				var j;
				var g = k + "=" + escape(f) + ";path=/";
				var i = window.location.host.split(":")[0];
				i = "." + i;
				g += ";domain=" + i;
				if (!!parseInt(h)) {
					j = new Date();
					j.setDate(j.getDate() + h);
					g += ";expires=" + j.toGMTString()
				}
				document.cookie = g
			};
			var c = {
				add : function(h, f, g) {
					if (this.get(h)) {
						throw "this cookie is already exsit!"
					}
					d(h, f, g)
				},
				clear : function() {
					var f = this.getAll();
					for (var g in f) {
						if (g !== "") {
							this.del(g)
						}
					}
				},
				del : function(f) {
					if (!this.get(f)) {
						throw "this cookie is undefined!"
					}
					d(f, 0, -1)
				},
				update : function(h, f, g) {
					if (!this.get(h)) {
						throw "this cookie is undefined!"
					}
					d(h, f, g)
				},
				get : function(f) {
					return this.getAll()[f]
				},
				getAll : function() {
					var g = document.cookie.split(";");
					var h = {};
					var f;
					var k;
					for (var l = 0, j = g.length; l < j; l++) {
						f = g[l].split("=");
						k = f[0].replace(/^\s*|\s*$/g, "");
						if (f[1]) {
							h[k] = f[1]
						}
					}
					return h
				}
			};
			return c
		});
define("common/transceiver", function(f, b, a) {
			var c = [];
			var g = 0;
			function d() {
				this.id = "t-" + (g++)
			}
			var e = {
				listen : function(i, k, j) {
					var m = this._callbacks || (this._callbacks = {});
					var l = m[i] || (m[i] = []);
					l.push([k, j]);
					return this
				},
				unlisten : function(j, k) {
					var o;
					if (!j) {
						this._callbacks = {}
					} else {
						if (o = this._callbacks) {
							if (!k) {
								o[j] = []
							} else {
								var n = o[j];
								if (!n) {
									return this
								}
								for (var p = 0, m = n.length; p < m; p++) {
									if (n[p] && k === n[p][0]) {
										n[p] = null;
										break
									}
								}
							}
						}
					}
					return this
				},
				_trigger : function(q) {
					var p, r, j, n, m;
					var k = 2;
					if (!(r = this._callbacks)) {
						return this
					}
					while (k--) {
						j = k ? q : "all";
						if (p = r[j]) {
							for (var s = 0, o = p.length; s < o; s++) {
								if (!(n = p[s])) {
									p.splice(s, 1);
									s--;
									o--
								} else {
									m = k ? Array.prototype.slice.call(
											arguments, 1) : arguments;
									n[0].apply(n[1] || this, m)
								}
							}
						}
					}
					return this
				},
				trigger : function(j) {
					var i = [].slice.call(arguments);
					_.each(c, function(k) {
								_.defer.apply(_, [_.bind(k._trigger, k)]
												.concat(i))
							})
				}
			};
			_.extend(d.prototype, e);
			function h() {
				var i = new d();
				c.push(i);
				return i
			}
			return {
				create : h
			}
		});
define("common/ajax_pager_html", function(c, b, a) {
			var d = {
				bind : function(h) {
					var e = h.$container;
					var k = h.$buttons;
					var j = h.$loading;
					var g = h.urlHandler;
					var f = false;
					var i = "";
					k.live("click", function(l) {
								l.preventDefault();
								if (f) {
									return
								}
								f = true;
								j.show();
								i = $(this).attr("href") + "&ajax";
								$.ajax({
											url : i,
											type : "GET",
											dataType : "text",
											timeout : 30000,
											cache : false,
											success : function(m) {
												f = false;
												j.hide();
												e.empty().html(m)
											},
											error : function(m) {
												f = false;
												j.hide();
												App.showError()
											}
										})
							})
				}
			};
			return d
		});
define("common/account_suggest", function(d, b, a) {
	var f = {
		e1 : ["163.com", "126.com", "yeah.net", "vip.163.com", "vip.126.com",
				"popo.163.com", "188.com", "qq.com", "yahoo.com.cn",
				"gmail.com", "hotmail.com", "sina.com", "sina.cn", "sohu.com",
				"netease.com"],
		e2 : ["qq.com", "gmail.com", "hotmail.com", "sina.cn", "sohu.com"],
		e3 : ["163.com", "126.com", "yeah.net", "vip.163.com", "vip.126.com",
				"popo.163.com", "188.com", "qq.com", "yahoo.com.cn", "sina.com"]
	};
	var c = {
		obj : null,
		password : null,
		elist : f.e3,
		appendTo : document.body
	};
	var e = function(h) {
		var g = h.obj;
		var i = h.password;
		if (!!!g || g.length === 0) {
			throw "the params conf is error"
		}
		g.attr("autocomplete", "off");
		g.parents("form").attr("autocomplete", "off");
		if (!!!i || i.length === 0) {
			throw "the params conf is error"
		}
		this.conf = $.extend({}, c, h);
		this.init()
	};
	e.prototype = {
		init : function() {
			this._createSuggestList();
			this._positon();
			this._initEvent()
		},
		_createSuggestList : function() {
			this.suglst = $('<ul class="account_suggest_ctn"><li class="title">请选择或继续输入...</li></ul>');
			var h = [];
			for (var k = 0, j = this.conf.elist.length; k < j; k++) {
				h[h.length] = "<li>@" + this.conf.elist[k] + "</li>"
			}
			this.suglst.append(h.join(""));
			var g = $(this.conf.appendTo);
			if (g[0] !== document.body && g.css("position") === "static") {
				g.css("position", "relative")
			}
			$(this.conf.appendTo).append(this.suglst)
		},
		_positon : function() {
			var i = this.conf.obj.offset();
			var j = $(this.conf.appendTo);
			var g = j.offset();
			var k = 0;
			var h = 0;
			if (j[0] !== document.body) {
				k = parseInt(j.css("border-left-width"));
				h = parseInt(j.css("border-top-width"));
				k = isNaN(k) ? 0 : k;
				h = isNaN(h) ? 0 : h
			}
			this.suglst.css({
						left : i.left - g.left - k,
						top : i.top - g.top
								+ parseInt(this.conf.obj.outerHeight()) - 1 - h,
						width : (parseInt(this.conf.obj.outerWidth()) - 2)
					})
		},
		_initEvent : function() {
			var g = navigator.appVersion;
			var h = g.match(/Konqueror|Safari|KHTML/) ? "keydown" : "keypress";
			var i = this;
			i.conf.obj.bind(h, function(l) {
						var k = $(this);
						var j = l.keyCode;
						if (j == 13) {
							l.stopPropagation();
							l.preventDefault();
							return true
						} else {
							return true
						}
					});
			this.conf.obj.keyup(this.bind(this, this._keyupHandler));
			this.conf.obj.blur(this.bind(this, this._blurHandler));
			this.suglst.find("li").mouseover(this.bind(this,
					this._mouseoverHandler));
			this.suglst.find("li").mouseout(this.bind(this,
					this._mouseoutHandler))
		},
		_setContent : function(h) {
			var g = this.suglst.find("li"), m = this.conf.elist;
			for (var k = 0, j = m.length; k < j; k++) {
				g[k + 1].innerHTML = h + "@" + m[k]
			}
		},
		_keyupHandler : function(m) {
			m.stopPropagation();
			m.preventDefault();
			var g, h, k = null, j = 0, n = m.which;
			if (n === 40) {
				return this._downKeyHandler()
			} else {
				if (n === 38) {
					return this._upKeyHandler()
				} else {
					if (n === 13) {
						return this._enterKeyHandler()
					} else {
						g = this.conf.obj.val();
						g = $.trim(g);
						if (g.length == 0) {
							this.suglst.css("display", "none");
							return
						}
						h = g.split("@");
						if (h.length === 1) {
							this._setContent(h[0]);
							this.suglst.find("li").show();
							this.suglst.css("display", "block")
						} else {
							k = new RegExp("^" + h[1], "i");
							for (var p = 0, o = this.conf.elist.length; p < o; p++) {
								if (!k.test(this.conf.elist[p])) {
									this.suglst.find("li").eq(p + 1).hide()
											.removeClass("on");
									j += 1
								} else {
									this.suglst.find("li").eq(p + 1).show()
								}
							}
							if (j < this.conf.elist.length) {
								this._setContent(h[0]);
								this.suglst.css("display", "block")
							} else {
								this.suglst.hide();
								return false
							}
						}
					}
				}
			}
		},
		_blurHandler : function(j) {
			j.stopPropagation();
			var h = this.suglst.find("li.on");
			var g = $.trim(this.conf.obj.val());
			var i = this.conf.obj.attr("def-data");
			if (g === "" || g === i) {
				this.conf.password.focus();
				return
			}
			if (this.suglst.css("display") === "none") {
				this.conf.password.focus();
				return
			}
			if (h.length !== 0) {
				this.conf.obj.val(h.html()).change();
				this.conf.password.focus()
			} else {
				h = this.suglst.find("li:visible");
				if (h.length < 2) {
					return
				}
				h = h.eq(1);
				this.conf.obj.val(h.html()).change();
				this.conf.password.focus()
			}
			this.suglst.hide()
		},
		_downKeyHandler : function() {
			if (this.suglst.css("display") === "none") {
				return false
			}
			var g = this.suglst.find("li.on"), h;
			if (g.length === 0) {
				g = this.suglst.find("li:visible").eq(1);
				g.addClass("on")
			} else {
				h = g.next("li");
				while (h.length !== 0) {
					if (h.css("display") === "none") {
						h = h.next("li")
					} else {
						break
					}
				}
				if (h.length === 0) {
					h = this.suglst.find("li:visible").eq(1)
				}
				g.removeClass("on");
				h.addClass("on")
			}
			return false
		},
		_upKeyHandler : function() {
			if (this.suglst.css("display") === "none") {
				return false
			}
			var h = this.suglst.find("li.on"), g;
			if (h.length === 0) {
				h = this.suglst.find("li:visible").last();
				h.addClass("on")
			} else {
				g = h.prev("li");
				while (!g.hasClass("title")) {
					if (g.css("display") === "none") {
						g = g.prev("li")
					} else {
						break
					}
				}
				if (g.hasClass("title")) {
					g = this.suglst.find("li:visible").last()
				}
				h.removeClass("on");
				g.addClass("on")
			}
			return false
		},
		_enterKeyHandler : function() {
			var g = this.suglst.find("li.on");
			if (g.length === 0) {
				return
			}
			this.conf.obj.val(g.html());
			this.suglst.hide().find("li.on").removeClass("on");
			this.conf.password.focus()
		},
		_mouseoutHandler : function(h) {
			var g = $(h.target);
			if (g.hasClass("title")) {
				return false
			}
			g.removeClass("on");
			return false
		},
		_mouseoverHandler : function(h) {
			var g = $(h.target);
			if (g.hasClass("title")) {
				return false
			}
			this.suglst.find("li.on").removeClass("on");
			g.addClass("on");
			return false
		},
		bind : function(h, g) {
			return function() {
				g.apply(h, arguments)
			}
		}
	};
	return e
});
define("common/validate_feild", function(e, c, b) {
	var a = {
		show : function(h, f) {
			var g = h.find(".prompt-state");
			g.filter("[data-ikey=" + f + "]").show()
		},
		hide : function(h, f) {
			var g = h.find(".prompt-state");
			g.filter("[data-ikey=" + f + "]").hide()
		},
		hideAll : function(f) {
			f.find(".prompt-state").hide()
		},
		exeRule : function(h, f) {
			d.rules[h].lastIndex = 0;
			var g = d.rules[h];
			if ($.isFunction(g)) {
				return g(f)
			} else {
				return g.exec(f)
			}
		}
	};
	var d = function(g, f) {
		this.$elem = g;
		if (!f) {
			this.$promptWrap = g.parent()
		} else {
			this.$promptWrap = f
		}
		this.isPass = false;
		var h = g.data("rules");
		this.rules = h ? h.split(",") : [];
		this.relation = g.data("relation");
		this.required = g.data("required");
		this.config()
	};
	d.prototype = {
		config : function() {
			var g = this;
			var f = g.$elem;
			f.bind("blur", function() {
						g.validate()
					});
			f.bind("focus", function() {
						a.hideAll(g.$promptWrap)
					})
		},
		hideAll : function() {
			a.hideAll(this.$promptWrap)
		},
		validate : function() {
			var f = this.check();
			if (!f.isPass) {
				a.show(this.$promptWrap, f.ikey)
			}
		},
		check : function() {
			var k = this;
			var j = k.$elem;
			var g = $.trim(j.val());
			var f = "";
			var l = k.required === 1;
			var h = j.attr("def-data");
			if (l) {
				if (g === "" || g === h) {
					k.isPass = false
				}
				f = "invalid-empty"
			} else {
				k.isPass = true
			}
			if (g !== "" && g !== h) {
				if (k.relation && k.relation === "or") {
					k.isPass = false;
					for (var i in k.rules) {
						if (a.exeRule(k.rules[i], g)) {
							k.isPass = true;
							break
						}
					}
					f = "invalid-" + k.rules[0]
				} else {
					k.isPass = true;
					for (var i in k.rules) {
						if (!a.exeRule(k.rules[i], g)) {
							k.isPass = false;
							f = "invalid-" + k.rules[i];
							break
						}
					}
				}
			}
			return {
				isPass : k.isPass,
				ikey : f
			}
		}
	};
	d.rules = {
		cnChars : /^[\u4e00-\u9fa5]+$/g,
		decimal2 : /^\d+(\.\d{1,2})?$/,
		email : /^([a-z0-9_][a-z0-9_.-]*)?[a-z0-9_]@([a-z0-9-]+\.){0,4}([a-z0-9][a-z0-9-]{0,61})?[a-z0-9]\.[a-z]{2,6}$/i,
		ID : /^\d{15}|\d{18}$/g,
		IDs : function(f) {
			var g = e("common/validate_identity");
			return g(f)
		},
		min6 : function(f) {
			return f.length >= 6
		},
		phone : /^1\d{10}$/g,
		postCode : /^[0-9]\d{5}(?!\d)$/g,
		qq : /^[1-9][0-9]{4,}$/g,
		telphone : /^(\d{3}-)?\d{7,8}(-\d{1,6})?$|^(\d{4}-)?\d{7,8}(-\d{1,6})?$/g
	};
	return d
});
define("common/validate_identity", function(m, a, b) {
			var j = /^[1-9]((\d{14})|(\d{16}(\d|x)))$/gi, n = [7, 9, 10, 5, 8,
					4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], c = ["1", "0", "x",
					"9", "8", "7", "6", "5", "4", "3", "2"], l = [], f = new Date()
					.getTime(), i = f - 100 * 365 * 24 * 60 * 60 * 1000;
			var d = function() {
				var o = 0;
				for (var q = 0, p = n.length; q < p; q++) {
					o += n[q] * l[q]
				}
				return c[o % 11]
			}, e = function(o) {
				return o.match(/\d|x/gi)
			}, k = function(r, q) {
				var o = function(s) {
					return ((s % 4 == 0 && s % 100 != 0) || (s % 400 == 0))
							? true
							: false
				}, p = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				if (q == 2 && o(r)) {
					return 29
				}
				return p[q - 1]
			}, h = function() {
				var q, p, o, r = new Date();
				if (l.length === 18) {
					q = l.slice(6, 10).join("") - 0;
					p = l.slice(10, 12).join("") - 0;
					o = l.slice(12, 14).join("") - 0
				} else {
					q = "19" + l.slice(6, 8).join("") - 0;
					p = l.slice(8, 10).join("") - 0;
					o = l.slice(10, 12).join("") - 0
				}
				if (q === 0 || p === 0 || o === 0 || q > r.getFullYear()
						|| p > 12) {
					return false
				}
				if (o > k(q, p)) {
					return false
				}
				r.setFullYear(q);
				r.setMonth(p - 1);
				r.setDate(o);
				if (r.getTime() >= f || r.getTime() < i) {
					return false
				}
				return true
			};
			function g(o) {
				o = o.toLowerCase();
				j.lastIndex = 0;
				if (!j.test(o)) {
					return false
				}
				l = e(o);
				if (l.length === 18) {
					if (l[l.length - 1] !== d()) {
						return false
					}
				}
				if (!h()) {
					return false
				}
				return true
			}
			return g
		});
define("page/p-uc-order-wait", function(c, b, a) {
			c("common/es5");
			c("common/lib_plus");
			c("modules/global/top/notice_remind");
			c("modules/global/top/order_remind");
			c("modules/global/top/top");
			c("modules/global/search_box/suggest");
			c("modules/global/search_box/tips");
			c("modules/global/nav/nav");
			c("modules/global/nav/favorite");
			c("modules/user_center/uc_tips/uc_tips");
			c("modules/user_center/uc_order_select/uc_order_select");
			c("modules/user_center/uc_order_list_wait/uc_order_list_wait");
			c("fragments/user_center/kf/kf");
			c("fragments/user_center/kf/tips");
			c("modules/user_center/uc_faq/uc_faq");
			c("modules/user_center/uc_subnav/uc_subnav");
			c("modules/minisite/template/kf/kf_success_dialog/kf_success_dialog");
			c("fragments/login/login");
			c("fragments/activate/activate")
		});