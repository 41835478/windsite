fml.define("app/login", ["jquery", "component/storage", "component/shareTmp",
				"ui/dialog", "component/focus", "app/tracking"],
		function(a, b) {
			var c = a("jquery"), d = a("component/shareTmp"), e = a("ui/dialog"), f = a("component/focus"), g = a("component/storage"), h = a("app/tracking"), i = function() {
				var a = "", b = g.getCookie("MEILISHUO_REFER");
				if (b == "weibo") {
					a = "sina";
					var i = d("loginSina")
				} else if (b == "gdt.qq") {
					a = "qq";
					var i = d("loginQQ")
				} else if (b == "renren") {
					a = "renren";
					var i = d("loginRenren")
				} else if (b == "others") {
					a = "others";
					var i = d("loginTpl")
				} else {
					a = "others";
					var i = d("loginTpl")
				}
				var k = i;
				new e({
							title : "登录",
							width : 430,
							content : k,
							onStart : function() {
							},
							onClose : function() {
							}
						}), h.cr("login_window_" + a), f.inputFocus("#mlsUser"), c("#vmPass")
						.focus(function() {
							c(this).hide(), c("#mlsPass").show(), c("#mlsPass")
									.focus()
						}).blur(function() {
							c(this).val() == ""
									&& (c("#vmPass").show(), c(this).hide())
						}), j(".loginBtn", "#mlsUser", "#mlsPass")
			}, j = function(a, b, d) {
				c(a).bind("click", function() {
					var a = c(b).val(), e = c(d).val(), f = Meilishuo.config.server_url
							+ "users/ajax_logon", g = {
						emailaddress : a,
						password : e
					}, h = function(a) {
						switch (a.status) {
							case -2 :
							case -1 :
								c(".loginErrorMessage").html("账号或密码验证错误，请重新输入")
										.show();
								break;
							case 0 :
								c(".loginErrorMessage")
										.html("您的账户没有激活，请登录到您的邮箱点击激活链接激活账户！")
										.show();
								break;
							case 1 :
								window.location.reload();
								break;
							case "1@0" :
								window.location.href = "/users/tasteTest";
								break;
							case -3 :
								c(".loginErrorMessage").html("账户还在审核中").show();
								break;
							case 12 :
								window.location.href = "/#twitter";
								break;
							case 11 :
								window.location.href = Meilishuo.config.server_url
										+ "goods";
								break;
							default :
								c(".loginErrorMessage").html("系统繁忙,请刷新后重试!")
										.show()
						}
					};
					c.post(f, g, h, "json")
				})
			};
			b.showLoginWin = i
		});
fml.define("component/iStorage", [], function(a, b) {
	var c = !1, d = !1, e = {
		cookieArr : {},
		options : {
			domain : ".meilishuo.com",
			path : "/"
		},
		setCookie : function(a, b, c) {
			c = c || {};
			var d = a + "=" + encodeURIComponent(b);
			c.domain || (c.domain = this.options.domain), c.path
					|| (c.path = this.options.path), d += "; domain="
					+ c.domain, c.path && (d += "; path=" + c.path);
			if (c.duration) {
				var e = new Date;
				e.setTime(e.getTime() + c.duration * 1e3), d += "; expires="
						+ e.toGMTString()
			}
			return c.secure && (d += "; secure"), document.cookie = d + ";"
		},
		getCookie : function(a) {
			return this.cookieArr[a] = this.cookieArr[a] || function() {
				var b = window.document.cookie.match("(?:^|;)\\s*"
						+ a.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
						+ "=([^;]*)");
				return b ? decodeURIComponent(b[1]) : undefined
			}(), this.cookieArr[a]
		},
		removeCookie : function(a) {
			return this.setCookie(a, "", {
						duration : -1
					})
		}
	}, f = {
		set : function(a, b, c, d) {
			c ? sessionStorage.setItem(a, b) : localStorage.setItem(a, b), typeof d == "function"
					&& d()
		},
		get : function(a, b, c) {
			b ? c(sessionStorage.getItem(a)) : c(localStorage.getItem(a))
		},
		remove : function(a, b) {
			b ? sessionStorage.removeItem(a) : localStorage.removeItem(a)
		}
	}, g = {
		flash : document.getElementById("storage"),
		sessionId : "",
		callback : [],
		init : function(a) {
			a && (this.sessionId = this.sessionId || e.getCookie("PHPSESSID"));
			if (c || d)
				return;
			d = !0;
			var b = new Date, f = document.createElement("div"), g = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="storage"';
			g += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="1" height="1">', g += '<param name="movie" value="'
					+ fml.getOption("modulebase")
					+ "../img/storage.swf?d="
					+ b.getTime() + '" />', g += '<param name="quality" value="high" />', g += '<param name="allowScriptAccess" value="always" />', g += "</object>", f.innerHTML = g, document.body
					.appendChild(f), this.flash = document
					.getElementById("storage")
		},
		detectIE : function() {
			var a = navigator.userAgent.toLowerCase();
			if (window.ActiveXObject) {
				var b = a.match(/msie ([\d.]+)/)[1];
				if (b >= 5.5 && b < 8)
					return !0
			}
			return !1
		},
		set : function(a, b, d, e) {
			function g(a, b, c) {
				if (c) {
					var d = new Date;
					d = parseInt(d.getTime() / 36e5), f.flash.setSessionTime(d), f.flash
							.setSessionVal(f.sessionId + a, d), f.flash.set(
							f.sessionId + a, b)
				} else
					f.flash.set(a, b)
			}
			var f = this;
			f.init(d), c
					? (g(a, b, d), typeof e == "function" && e())
					: f.callback.push(function() {
								g(a, b, d), typeof e == "function" && e()
							})
		},
		get : function(a, b, d) {
			function f(a, b) {
				return b ? (e.flash.removeAllSession(), e.flash.get(e.sessionId
						+ a)) : e.flash.get(a)
			}
			var e = this;
			e.init(b), c ? d(f(a, b)) : e.callback.push(function() {
						d(f(a, b))
					})
		},
		remove : function(a, b) {
			var d = this;
			d.init(b);
			if (!c) {
				var d = this;
				window.setTimeout(function() {
							d.remove(a, b)
						}, 100);
				return
			}
			b ? d.flash.remove(d.sessionId + a) : d.flash.remove(a)
		}
	}, h = g.detectIE() ? g : f;
	return {
		isJSReady : function() {
			return !0
		},
		getAllowDomain : function() {
			var a = a
					|| ["www.meilishuo.com", "newlab.meilishuo.com",
							"newtest.meilishuo.com", "wwwtest.meilishuo.com",
							"cdjdev.meilishuo.com"];
			return a
		},
		flashReadyHandler : function() {
			c = !0;
			for (var a = 0, b = g.callback.length; a < b; a++)
				g.callback[a]()
		},
		setCookie : function(a, b, c) {
			return e.setCookie(a, b, c)
		},
		getCookie : function(a) {
			return e.getCookie(a)
		},
		removeCookie : function(a) {
			return e.removeCookie(a)
		},
		setSession : function(a, b, c) {
			return h.set(a, b, !0, c)
		},
		getSession : function(a, b) {
			return h.get(a, !0, b)
		},
		removeSession : function(a) {
			return h.remove(a, !0)
		},
		set : function(a, b, c) {
			return h.set(a, b, !1, c)
		},
		get : function(a, b) {
			return h.get(a, !1, b)
		},
		remove : function(a) {
			return h.remove(a, !1)
		}
	}
});
fml.define("component/userstate", ["jquery", "component/iStorage"], function(a,
		b) {
	var c = a("jquery"), d = a("component/iStorage"), e = new Date, f = c.browser, g = {};
	c(document).bind("mousemove", function() {
				e = new Date
			}), b.browser = function(a, b) {
		a = {
			ie : "msie"
		}[a] || a;
		var c = g[a + b];
		return undefined !== c ? c : f[a] ? b && b != f.version
				? c = !1
				: c = !0 : c = !1
	}, b.activity = function(a) {
		return a || (a = 30), new Date - e < a * 1e3
	}, b.isNew = function() {
		var a = new Date, b = "0" + (a.getMonth() + 1), c = "0" + a.getDate(), e = a
				.getFullYear().toString().substr(2)
				+ b.substr(b.length - 2) + c.substr(c.length - 2), f = d
				.getCookie("MEILISHUO_GLOBAL_KEY");
		if (!f)
			return !1;
		var g = f.substr(17, 6) == e;
		return g
	}
});
fml.define("app/referrer", ["component/urlHandle", "component/storage",
				"jquery"], function(a, b) {
			var c = a("jquery"), d = a("component/urlHandle"), e = a("component/storage"), f = "", g = function() {
				var a = document.referrer, b = d.getUrl(a), c = b.rootDomain, g = b.hostDomain;
				c != undefined
						&& g != undefined
						&& c != "meilishuo.com"
						&& (c == "sina.com" || c == "weibo.com"
								? e.setCookie("MEILISHUO_REFER", "weibo")
								: g == "c.gdt.qq.com" || g == "cn.qzs.qq.com"
										|| b.qz_gdt || c == "qq.com"
										|| c == "pengyou.com"
										? e.setCookie("MEILISHUO_REFER",
												"gdt.qq")
										: c == "renren.com"
												? e.setCookie(
														"MEILISHUO_REFER",
														"renren")
												: b.frm == "gad"
														&& e
																.setCookie(
																		"MEILISHUO_REFER",
																		"others")), f = e
						.getCookie("MEILISHUO_REFER")
			};
			return g(), f
		});
fml.define("app/search", ["jquery", "component/regString"], function(a, b) {
	var c = a("jquery"), d = a("component/regString"), e = 0;
	b.searchKey = function(a) {
		c(a).find(".searchKey").bind("keyup", function(b) {
			var f = b.keyCode, g = c(a).find(".searchType"), h = g.find("li"), i = h
					.size()
					- 1;
			c(this).val() == "" ? g.hide() : g.show(), c(a)
					.find(".input_words").html(d.cutstr(c(this).val(), 10));
			if (f === 38 || f == 40)
				e += f - 39, e < 0 ? e = i : e > i ? e = 0 : e, h
						.removeClass("search_bg").eq(e).addClass("search_bg"), c(a)
						.find(".search_type").val(e + 1), c(a).find(".filter")
						.val(h.eq(e).attr("stype"))
		})
	}, b.mouseStype = function(a) {
		c.browser.msie && c.browser.version == "6.0"
				&& c(a).find(".searchType").css({
							position : "absolute"
						}), c(a).find(".searchType").find("li").bind(
				"mouseover", function() {
					e = c(this).index(), c(a).find(".searchType").find("li")
							.removeClass("search_bg"), c(this)
							.addClass("search_bg"), c(a).find(".search_type")
							.val(e + 1), c(a).find(".filter").val(c(this)
							.attr("stype"))
				}).bind("click", function() {
					c(a).find(".searchBox")[0].submit()
				})
	}, b.documentClick = function(a) {
		c(document).bind("click", function() {
					c(a).find(".searchType").hide()
				})
	}
});
fml.define("app/addFavorite", ["jquery", "app/logstatics", "app/tracking",
				"component/iStorage", "component/userstate"], function(a, b) {
			function h(a) {
				var b = a.href || "http://www.meilishuo.com/", c = a.frm || "", d = a.name
						|| "美丽说", e = a.tipPos || {}, g = a.notShowTip || !1;
				try {
					f.set("isAddFavorite", "1"), c
							&& (c = b.indexOf("?") > -1 ? "&frm=" + c : "?frm="
									+ c), window.sidebar ? window.sidebar
							.addPanel(d, b + c, "") : document.all
							? window.external.addFavorite(b + c, d)
							: g || i(e, a.obj)
				} catch (h) {
					g || i(e, a.obj)
				}
			}
			function i(a, b) {
				b = b || "#goTop";
				if (c(".favor_tip").length > 0)
					return;
				var d = "position:absolute; right:" + a.right + "px; top:"
						+ a.top + "px;";
				a.center && (d = "margin:" + a.top + "px auto 0;");
				var e = '<div class="favor_tip none_f" style="'
						+ d
						+ 'border:1px solid #F3DB79; background-color:#FFC; width:200px; height:45px; text-align:center;">'
						+ '<p style="height:22px; line-height:22px;">您的浏览器不支持自动加收藏</p>'
						+ '<p style="height:22px; line-height:22px;">请按<span style="font-weight:bold;">ctrl+d</span>加入收藏</p>'
						+ "</div>";
				c(b).append(e), c(".favor_tip").show(), setTimeout(function() {
							c(".favor_tip").remove()
						}, 5e3)
			}
			function j() {
				function a() {
					if (!g.isNew())
						return;
					if (c("#dialogLayer").find(".pop_login").length > 0)
						return;
					f.set("isAddFavorite", "1");
					var a = "亲，喜欢就收藏我们吧，每天都要来美丽说哟~~\n\n★每天分享20万件漂亮衣服，5万个新杂志\n★1500W爱美女生都在美丽说\n★24小时热榜，七天热榜持续更新\n★每周两次福利社更新，免费试用等你来拿";
					confirm(a) && (e.cr("add_favorite_before_leave"), h({
								frm : "hf",
								tipPos : {
									right : 40,
									top : 38
								},
								notShowTip : !0
							}))
				}
				var b = window.onbeforeunload;
				window.onbeforeunload = function() {
					b && b(), f.get("isAddFavorite", function(b) {
								if (b === "1")
									return;
								a()
							})
				}
			}
			var c = a("jquery"), d = a("app/logstatics"), e = a("app/tracking"), f = a("component/iStorage"), g = a("component/userstate");
			b.addFavorite = h, b.addFavor = function() {
				var a = "/log_statistics/click_add_favorite";
				c(".collect").click(function() {
							h({
										href : location.href,
										frm : "shoucangjia",
										tipPos : {
											right : 40,
											top : 38
										}
									}), d.clicklog(a)
						}), setTimeout(function() {
							if (c.browser.safari)
								return;
							f.get("isAddFavorite", function(a) {
										if (a === "1")
											return;
										j()
									})
						}, 1e4)
			}
		});
fml.define("component/position", ["jquery"], function(a, b) {
	var c = a("jquery"), d = c(document), e = c(window);
	return Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
		var b = this;
		for (var c = 0; c < b.length; c++)
			if (b[c] == a)
				return c;
		return -1
	}), Position = {
		pin : function(a, b) {
			var c = this.placePx(a.css("marginTop")), d = this.placePx(a
					.css("marginLeft")), e = this.placePx(a
					.css("borderTopWidth"))
					+ this.placePx(a.css("borderBottomWidth")), f = this
					.placePx(a.css("borderLeftWidth"))
					+ this.placePx(a.css("borderRightWidth")), g = a.offset().top, h = a
					.offset().left;
			return {
				left : h + d + f,
				top : g + c + e
			}
		},
		placePx : function(a) {
			return +a.replace("px", "")
		},
		winCenter : function(a, b) {
			a = a instanceof c ? a : c(a), b = b instanceof c ? b : c(b);
			var d = (b.width() - a.width()) / 2;
			if (a.css("position") == "fixed")
				var e = (b.height() - a.height()) / 4;
			else
				var e = c(document).scrollTop() + (b.height() - a.height()) / 4;
			a.css({
						top : e,
						left : d
					})
		},
		docCenter : function(a, b) {
			a = a instanceof c ? a : c(a), b = b instanceof c ? b : c(b);
			var d = c(document).scrollLeft() + (b.width() - a.width()) / 2, e = c(document)
					.scrollTop()
					+ (b.height() - a.height()) / 3;
			a.css({
						top : e,
						left : d
					})
		},
		toFixed : function(a, b) {
			a = a instanceof c ? a : c(a);
			var d = c(document).scrollTop() + b.top;
			a.css({
						top : d,
						left : b.left
					})
		},
		depend : function(a, b, f) {
			a = a instanceof c ? a : c(a), b = b instanceof c ? b : c(b), f = f
					|| [];
			var g, h, i = a.width(), j = a.height(), k = b.width(), l = b
					.height(), m = b.offset().left, n = b.offset().top, o = e
					.height(), p = d.scrollTop(), q = e.width();
			f.indexOf("bottom") != -1 ? (h = n + l, g = m - i / 2 + k / 2) : f
					.indexOf("right") != -1 ? (h = n - j / 2 + l / 2, g = m + k
					+ c(".left_ico").height(), c(".left_ico").css({
						top : (j - c(".left_ico").height()) / 2
					}).show()) : f.indexOf("top") != -1 ? (h = n - j, g = m - i
					/ 2 + k) : (h = n - j / 2 + l / 2, g = m - i), a.css({
						top : h,
						left : g
					})
		}
	}
});