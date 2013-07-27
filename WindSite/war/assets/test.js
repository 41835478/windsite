/* AllMobilize.com/YunShiPei.com 1.1(2013-06-02T18:13:09.446Z #*#) */
(function(t, e) {
	"object" == typeof exports
			? module.exports = e()
			: "function" == typeof define && define.amd
					? define(e)
					: t.Spinner = e()
})(this, function() {
	"use strict";
	function t(t, e) {
		var n, i = document.createElement(t || "div");
		for (n in e)
			i[n] = e[n];
		return i
	}
	function e(t) {
		for (var e = 1, n = arguments.length; n > e; e++)
			t.appendChild(arguments[e]);
		return t
	}
	function n(t, e, n, i) {
		var r = ["opacity", e, ~~(100 * t), n, i].join("-"), o = .01 + 100
				* (n / i), a = Math.max(1 - (1 - t) / e * (100 - o), t), s = c
				.substring(0, c.indexOf("Animation")).toLowerCase(), l = s
				&& "-" + s + "-" || "";
		return p[r]
				|| (d.insertRule("@" + l + "keyframes " + r + "{"
								+ "0%{opacity:" + a + "}" + o + "%{opacity:"
								+ t + "}" + (o + .01) + "%{opacity:1}"
								+ (o + e) % 100 + "%{opacity:" + t + "}"
								+ "100%{opacity:" + a + "}" + "}",
						d.cssRules.length), p[r] = 1), r
	}
	function i(t, e) {
		var n, i, r = t.style;
		if (void 0 !== r[e])
			return e;
		for (e = e.charAt(0).toUpperCase() + e.slice(1), i = 0; u.length > i; i++)
			if (n = u[i] + e, void 0 !== r[n])
				return n
	}
	function r(t, e) {
		for (var n in e)
			t.style[i(t, n) || n] = e[n];
		return t
	}
	function o(t) {
		for (var e = 1; arguments.length > e; e++) {
			var n = arguments[e];
			for (var i in n)
				void 0 === t[i] && (t[i] = n[i])
		}
		return t
	}
	function a(t) {
		for (var e = {
			x : t.offsetLeft,
			y : t.offsetTop
		}; t = t.offsetParent;)
			e.x += t.offsetLeft, e.y += t.offsetTop;
		return e
	}
	function s(t) {
		return this === void 0 ? new s(t) : (this.opts = o(t || {}, s.defaults,
				f), void 0)
	}
	function l() {
		function n(e, n) {
			return t(
					"<"
							+ e
							+ ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',
					n)
		}
		d.addRule(".spin-vml", "behavior:url(#default#VML)"), s.prototype.lines = function(
				t, i) {
			function o() {
				return r(n("group", {
									coordsize : c + " " + c,
									coordorigin : -l + " " + -l
								}), {
							width : c,
							height : c
						})
			}
			function a(t, a, s) {
				e(p,	e(		r(o(), {
											rotation : 360 / i.lines * t
													+ "deg",
											left : ~~a
										}), e(r(n("roundrect", {
															arcsize : i.corners
														}), {
													width : l,
													height : i.width,
													left : i.radius,
													top : -i.width >> 1,
													filter : s
												}), n("fill", {
													color : i.color,
													opacity : i.opacity
												}), n("stroke", {
													opacity : 0
												}))))
			}
			var s, l = i.length + i.width, c = 2 * l, u = 2
					* -(i.width + i.length) + "px", p = r(o(), {
						position : "absolute",
						top : u,
						left : u
					});
			if (i.shadow)
				for (s = 1; i.lines >= s; s++)
					a(
							s,
							-2,
							"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
			for (s = 1; i.lines >= s; s++)
				a(s);
			return e(t, p)
		}, s.prototype.opacity = function(t, e, n, i) {
			var r = t.firstChild;
			i = i.shadow && i.lines || 0, r
					&& r.childNodes.length > e + i
					&& (r = r.childNodes[e + i], r = r && r.firstChild, r = r
							&& r.firstChild, r && (r.opacity = n))
		}
	}
	var c, u = ["webkit", "Moz", "ms", "O"], p = {}, d = function() {
		var n = t("style", {
					type : "text/css"
				});
		return e(document.getElementsByTagName("head")[0], n), n.sheet
				|| n.styleSheet
	}(), f = {
		lines : 12,
		length : 7,
		width : 5,
		radius : 10,
		rotate : 0,
		corners : 1,
		color : "#000",
		direction : 1,
		speed : 1,
		trail : 100,
		opacity : .25,
		fps : 20,
		zIndex : 2e9,
		className : "spinner",
		top : "auto",
		left : "auto",
		position : "relative"
	};
	s.defaults = {}, o(s.prototype, {
		spin : function(e) {
			this.stop();
			var n, i, o = this, s = o.opts, l = o.el = r(t(0, {
								className : s.className
							}), {
						position : s.position,
						width : 0,
						zIndex : s.zIndex
					}), u = s.radius + s.length + s.width;
			if (e
					&& (e.insertBefore(l, e.firstChild || null), i = a(e), n = a(l), r(
							l, {
								left : ("auto" == s.left ? i.x - n.x
										+ (e.offsetWidth >> 1) : parseInt(
										s.left, 10)
										+ u)
										+ "px",
								top : ("auto" == s.top ? i.y - n.y
										+ (e.offsetHeight >> 1) : parseInt(
										s.top, 10)
										+ u)
										+ "px"
							})), l.setAttribute("role", "progressbar"), o
					.lines(l, o.opts), !c) {
				var p, d = 0, f = (s.lines - 1) * (1 - s.direction) / 2, h = s.fps, m = h
						/ s.speed, g = (1 - s.opacity) / (m * s.trail / 100), v = m
						/ s.lines;
	(function y	() {
					d++;
					for (var t = 0; s.lines > t; t++)
						p = Math.max(1 - (d + (s.lines - t) * v) % m * g,
								s.opacity), o.opacity(l, t * s.direction + f,
								p, s);
					o.timeout = o.el && setTimeout(y, ~~(1e3 / h))
				})()
			}
			return o
		},
		stop : function() {
			var t = this.el;
			return t
					&& (clearTimeout(this.timeout), t.parentNode
							&& t.parentNode.removeChild(t), this.el = void 0), this
		},
		lines : function(i, o) {
			function a(e, n) {
				return r(t(), {
							position : "absolute",
							width : o.length + o.width + "px",
							height : o.width + "px",
							background : e,
							boxShadow : n,
							transformOrigin : "left",
							transform : "rotate("
									+ ~~(360 / o.lines * l + o.rotate)
									+ "deg) translate(" + o.radius + "px"
									+ ",0)",
							borderRadius : (o.corners * o.width >> 1) + "px"
						})
			}
			for (var s, l = 0, u = (o.lines - 1) * (1 - o.direction) / 2; o.lines > l; l++)
				s = r(t(), {
							position : "absolute",
							top : 1 + ~(o.width / 2) + "px",
							transform : o.hwaccel ? "translate3d(0,0,0)" : "",
							opacity : o.opacity,
							animation : c
									&& n(o.opacity, o.trail, u + l
													* o.direction, o.lines)
									+ " " + 1 / o.speed + "s linear infinite"
						}), o.shadow && e(s, r(a("#000", "0 0 4px #000"), {
									top : "2px"
								})), e(i, e(s, a(o.color,
										"0 0 1px rgba(0,0,0,.1)")));
			return i
		},
		opacity : function(t, e, n) {
			t.childNodes.length > e && (t.childNodes[e].style.opacity = n)
		}
	});
	var h = r(t("group"), {
				behavior : "url(#default#VML)"
			});
	return !i(h, "transform") && h.adj ? l() : c = i(h, "animation"), s
});
window._amVersion = {
	"version" : 1377972790457
};
(function(t, e, n) {
	if (!t.AMPlatform) {
		var i = t.AMPlatform = {
			__state : 0,
			__config : {},
			__module : {},
			__tmpl : {},
			__timing : [[+new Date, "allmobilize"]]
		}, r = function(t) {
			return /(android|bb\d+|meego).+mobile|ucweb|mqqbrowser|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
					.test(t)
					|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/
							.test(t.substr(0, 4)) ? !0 : !1
		}, o = function(t) {
			return /ipad|tablet/i.test(t) ? !0 : !1
		}, a = function(t) {
			return t && t.match(/msie [678]\./)
		}, s = function(e) {
			if (e) {
				var n = RegExp(e, "i");
				return n.test(t.location.hostname)
			}
			return !0
		}, l = function(e) {
			e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var n = "[\\?&]" + e + "=([^&#]*)", i = RegExp(n), r = i
					.exec(t.location.href);
			return null == r
					? ""
					: decodeURIComponent(r[1].replace(/\+/g, " "))
		}, c = function() {
			return /allmobilize=desktop($|;)/.test(e.cookie)
		}, u = function() {
			return /allmobilize=mobile($|;)/.test(e.cookie)
		}, p = function() {
			return "_allmobilize" == t.name
					|| /proxy\.yunshipei\.com/.test(t.location.hostname)
					|| /^localhost$/.test(t.location.hostname)
					|| /^127\.0\.0/.test(t.location.hostname)
					|| /^192\.168/.test(t.location.hostname)
		}, d = function(t) {
			return /yunshipei\.com/.test(t) || /allmobilize\.com/.test(t)
		}, f = function(t) {
			var e = (new Date).getTime();
			return !t || parseInt(t) >= e
		}, h = function() {
			var e = t.navigator.userLanguage || t.navigator.language || "en-US";
			return e.split("-")[0]
		}, m = function(n) {
			var i = {
				en : "View Mobile Site",
				zh : "回到云适配版"
			}, r = i[n] || i.en;
			if (/allmobilize=desktop/.test(e.cookie)) {
				var o = e.createElement("div"), a = e.createElement("span"), s = e
						.createTextNode(r);
				o.appendChild(a), a.appendChild(s), o.id = "_allmobilizeGoMo", o.style.textAlign = "center", o.style.clear = "both", o.style.padding = 0, o.style.margin = "20px 0", o.style.zIndex = "99999", a.style.background = "#222", a.style.color = "#FFF", a.style.margin = 0, a.style.padding = "10px 20px", a.style.borderRadius = "5px", a.style.font = "14px 'Microsoft YaHei',SimSun,Arial,Sans-Serif", a.style.cursor = "pointer", a.onclick = function() {
					e.cookie = "allmobilize=; path=/;", t.location.reload()
				}, e.body.appendChild(o)
			}
		}, g = function() {
			void 0 !== t.stop ? t.stop() : void 0 !== e.execCommand
					&& e.execCommand("Stop", !1)
		}, v = function() {
			var n = !1, i = function(i) {
				var r = function() {
					return n ? void 0 : (n = !0, i())
				}, o = function() {
					if (!n) {
						try {
							e.documentElement.doScroll("left")
						} catch (t) {
							return setTimeout(o, 1), void 0
						}
						return r()
					}
				};
				if ("complete" === e.readyState)
					return r();
				if (e.addEventListener)
					e.addEventListener("DOMContentLoaded", r, !1), t
							.addEventListener("load", r, !1);
				else if (e.attachEvent) {
					e.attachEvent("onreadystatechange", r), t.attachEvent(
							"onload", r);
					var a = !1;
					try {
						a = null == t.frameElement
					} catch (s) {
					}
					if (e.documentElement.doScroll && a)
						return o()
				}
			};
			return i
		}(), y = !1, b = p();
		if (doc = e, ua = (navigator.userAgent || navigator.vendor || t.opera || "")
				.toLowerCase(), isOldBrowser = a(ua), lang = h(), thisScript = e
				.getElementById("allmobilize"), scriptSrc = thisScript
				? thisScript.src
				: "", t.onerror = function() {
			return isOldBrowser ? !0 : !1
		}, n.debug) {
			if (l("_allmobilizedev"))
				return e.cookie = "allmobilize=mobile; path=/;", t.location = "/", void 0;
			if (l("_allmobilizepro"))
				return e.cookie = "allmobilize=; path=/;", t.location = "/", void 0;
			y = u()
		} else
			y = n.desktop || r(ua) || n.tablet && o(ua) || l("sukey");
		if (y = (y || b) && !n.suspend && !isOldBrowser && !c() && s(n.domains), !b
				&& y && (y = y && d(scriptSrc) && f(n.version)), y) {
			i.__enable = !0;
			var w = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">', x = {
				en : "Loading",
				zh : "页面加载中"
			}, E = x[lang] || x.en, _ = '<div id="allmobilize_loader" style="position:fixed;top:50%;left:50%;width:120px;height:120px;margin-top:-60px;margin-left:-60px;text-align:center;"><div id="allmobilize_spinner" style="height: 50px;"></div><p style="margin:10px 0;font-size:1em;font-family:\'Microsoft YaHei\',\'微软雅黑\',Helvetica,Arial,sans-serif">'
					+ E
					+ " ...</p></div>"
					+ '<script>var spinner = new Spinner().spin(document.getElementById("allmobilize_spinner")); </script>', T = '<plaintext style="display:none">';
			doc.write(w + _ + T), i.__timing.push([+new Date, "begin"])
		}
		v(function() {
					y ? (g(), i.main.mobilize(scriptSrc)) : m(lang)
				})
	}
})(this, document, window._amVersion);
window.AMPlatform.__config = {
	_options : {
		openLinkInSameWindow : !1,
		removeStyle : !0,
		cleanImg : !1,
		cleanTable : !1,
		cleanFrame : !1,
		cleanEmbed : !1
	},
	_helpers : {
		getHost : function() {
			return window.location.host
		}
	},
	title : function(t) {
		return t("title").html()
	},
	footer : function(t) {
		var e = "";
		return e += "<div class='copyright'>", e += "<p>"
				+ t("#w3c-copyright").html() + "</p>", e += t("#w3c-hosting-design")
				.html()
				+ "</div>"
	},
	content : function(t, e) {
		return e.select({
			"^/(chinaw3c.org)?$" : {
				template : "index",
				main : function(t) {
					return t(".mod a").eq(1).attr("href", "/archives/87/"), t("#aside")
							.html()
				}
			},
			"^/member.html" : {
				template : "general",
				html : function(t) {
					return t(".mod-crumbs").remove(), t("#bd").html()
				}
			},
			"^/(.+)$" : {
				template : "general",
				html : function(t) {
					return t(".mod-crumbs").remove(), t("#article a").each(
							function(e, n) {
								t(n).attr(
										"href",
										t(n).attr("href").replace(
												"http://www.chinaw3c.org", ""))
							}), t("#main").html()
				}
			}
		})
	}
};
window.AMPlatform.__module.powered_by = function(t, e, n, i, r) {
	return this.compilerInfo = [3, ">= 1.0.0-rc.4"], n = n || t.helpers, r = r
			|| {}, '<div data-role="footer" data-theme="a" class="yunshipei-bar"> \n  <a href="http://www.yunshipei.com" data-role="none" data-rel="external">本手机网站使用<strong>云适配</strong>创建</a>\n</div>'
};
window.AMPlatform.__tmpl.index = function(t, e, n, i, r) {
	this.compilerInfo = [3, ">= 1.0.0-rc.4"], n = n || t.helpers, i = i
			|| t.partials, r = r || {};
	var o, a, s = "", l = "function", c = this.escapeExpression, u = this;
	return s += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, height=device-height, minimum-scale=1, maximum-scale=1">\n  <title>', (o = n.title)
			? o = o.call(e, {
						hash : {},
						data : r
					})
			: (o = e.title, o = typeof o === l ? o.apply(e) : o), s += c(o)
			+ '</title>\n  <link rel="stylesheet" href="http://pro.yunshipei.com/css/mobile-1.3.1.min.css" />\n  <link rel="stylesheet" href="', (o = n.__stylePath)
			? o = o.call(e, {
						hash : {},
						data : r
					})
			: (o = e.__stylePath, o = typeof o === l ? o.apply(e) : o), s += c(o)
			+ '" />\n  <script src="http://s.yunshipei.net/js/jquery-1.9.1.min.js"></script>\n  <script>\n    $(document).bind("mobileinit", function () {\n  	  $.mobile.ajaxEnabled = false;\n	});\n  </script>\n  <script src="http://pro.yunshipei.com/js/mobile-1.3.1.min.js"></script>\n\n</head>\n<body>\n	<div data-role="page" class="page">\n		<div data-role="header" data-theme="a" class="index header" >\n			<img class="logo" src="" alt=""/>\n		</div>\n	<div data-role="content" data-theme="d">\n		<ul data-theme="d" data-role="listview"  class="menu-group">\n      		<li><a href="/category/home-news/">国内新闻</a></li>\n      		<li><a href="/category/world-news/">国际新闻</a></li>	\n      		<li><a href="/member.html">会员</a></li>\n      		<li><a href="/hire.html">招聘</a></li>\n      		<li><a href="/about.html">关于我们</a></li>\n    	</ul>\n	\n		<div  class="maincontent">\n			', o = e.content, o = null == o
			|| o === !1 ? o : o.main, a = typeof o === l ? o.apply(e) : o, (a || 0 === a)
			&& (s += a), s += '	\n		</div>\n	<div class="mode">\n		云适配版<span>|</span><a id="godesktop" href="#" data-role="none" onclick="AMPlatform.util.goDesktop();">电脑版</a>\n	</div>\n</div>\n	<div class="footer">\n		', (a = n.footer)
			? a = a.call(e, {
						hash : {},
						data : r
					})
			: (a = e.footer, a = typeof a === l ? a.apply(e) : a), (a || 0 === a)
			&& (s += a), s += "\n	</div>\n  ", a = u.invokePartial(
			i.powered_by, "powered_by", e, n, i, r), (a || 0 === a) && (s += a), s += "\n	</div>\n</body>\n</html>\n"
};
window.AMPlatform.__tmpl.general = function(t, e, n, i, r) {
	this.compilerInfo = [3, ">= 1.0.0-rc.4"], n = n || t.helpers, r = r || {};
	var o, a, s = "", l = "function", c = this.escapeExpression;
	return s += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, height=device-height, minimum-scale=1, maximum-scale=1">\n  <title>', (o = n.title)
			? o = o.call(e, {
						hash : {},
						data : r
					})
			: (o = e.title, o = typeof o === l ? o.apply(e) : o), s += c(o)
			+ '</title>\n  <link rel="stylesheet" href="http://pro.yunshipei.com/css/mobile-1.3.1.min.css" />\n  <link rel="stylesheet" href="', (o = n.__stylePath)
			? o = o.call(e, {
						hash : {},
						data : r
					})
			: (o = e.__stylePath, o = typeof o === l ? o.apply(e) : o), s += c(o)
			+ '" />\n  <script src="http://s.yunshipei.net/js/jquery-1.9.1.min.js"></script>\n  <script>\n    $(document).bind("mobileinit", function () {\n  	  $.mobile.ajaxEnabled = false;\n	});\n  </script>\n  <script src="http://pro.yunshipei.com/js/mobile-1.3.1.min.js"></script>\n\n</head>\n<body>\n	<div data-role="page" class="page">\n		<div data-role="header" data-theme="c" data-position="fixed" class="header">\n			<a href="/" data-rel="back" data-icon="arrow-l" data-theme="c" class="back">后退</a>\n			<h1>', (o = n.title)
			? o = o.call(e, {
						hash : {},
						data : r
					})
			: (o = e.title, o = typeof o === l ? o.apply(e) : o), s += c(o)
			+ ' </h1>\n			<a href="/" data-icon="home" data-iconpos="notext" data-direction="reverse" class="home">首页 </a>\n		</div>\n		<div data-role="content" data-theme="d" class="content">\n			', o = e.content, o = null == o
			|| o === !1 ? o : o.html, a = typeof o === l ? o.apply(e) : o, (a || 0 === a)
			&& (s += a), s += '\n		</div>\n		<div class="footer">\n			', (a = n.footer)
			? a = a.call(e, {
						hash : {},
						data : r
					})
			: (a = e.footer, a = typeof a === l ? a.apply(e) : a), (a || 0 === a)
			&& (s += a), s += '\n		</div>\n    	<div data-role="footer" data-theme="a" class="yunshipei-bar">\n	      <a href="http://www.yunshipei.com" data-role="none" data-rel="external">\n	        本手机网站使用<strong>云适配</strong>创建\n	      </a>\n    	</div>\n	</div>\n</body>\n</html>\n\n'
};
(function(t) {
	String.prototype.trim === t && (String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "")
	}), Array.prototype.reduce === t && (Array.prototype.reduce = function(e) {
		if (this === void 0 || null === this)
			throw new TypeError;
		var n, i = Object(this), r = i.length >>> 0, o = 0;
		if ("function" != typeof e)
			throw new TypeError;
		if (0 == r && 1 == arguments.length)
			throw new TypeError;
		if (arguments.length >= 2)
			n = arguments[1];
		else
			for (;;) {
				if (o in i) {
					n = i[o++];
					break
				}
				if (++o >= r)
					throw new TypeError
			}
		for (; r > o;)
			o in i && (n = e.call(t, n, i[o], o, i)), o++;
		return n
	})
})();
var Zepto = function() {
	function t(t) {
		return null == t ? t + "" : Y[X.call(t)] || "object"
	}
	function e(e) {
		return "function" == t(e)
	}
	function n(t) {
		return null != t && t == t.window
	}
	function i(t) {
		return null != t && t.nodeType == t.DOCUMENT_NODE
	}
	function r(e) {
		return "object" == t(e)
	}
	function o(t) {
		return r(t) && !n(t) && t.__proto__ == Object.prototype
	}
	function a(t) {
		return t instanceof Array
	}
	function s(t) {
		return "number" == typeof t.length
	}
	function l(t) {
		return P.call(t, function(t) {
					return null != t
				})
	}
	function c(t) {
		return t.length > 0 ? T.fn.concat.apply([], t) : t
	}
	function u(t) {
		return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
				.replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-")
				.toLowerCase()
	}
	function p(t) {
		return t in M ? M[t] : M[t] = RegExp("(^|\\s)" + t + "(\\s|$)")
	}
	function d(t, e) {
		return "number" != typeof e || $[u(t)] ? e : e + "px"
	}
	function f(t) {
		var e, n;
		return z[t]
				|| (e = N.createElement(t), N.body.appendChild(e), n = O(e, "")
						.getPropertyValue("display"), e.parentNode
						.removeChild(e), "none" == n && (n = "block"), z[t] = n), z[t]
	}
	function h(t) {
		return "children" in t ? A.call(t.children) : T.map(t.childNodes,
				function(t) {
					return 1 == t.nodeType ? t : E
				})
	}
	function m(t, e, n) {
		for (_ in e)
			n && (o(e[_]) || a(e[_]))
					? (o(e[_]) && !o(t[_]) && (t[_] = {}), a(e[_]) && !a(t[_])
							&& (t[_] = []), m(t[_], e[_], n))
					: e[_] !== E && (t[_] = e[_])
	}
	function g(t, e) {
		return e === E ? T(t) : T(t).filter(e)
	}
	function v(t, n, i, r) {
		return e(n) ? n.call(t, i, r) : n
	}
	function y(t, e, n) {
		null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
	}
	function b(t, e) {
		var n = t.className, i = n && n.baseVal !== E;
		return e === E ? i ? n.baseVal : n : (i
				? n.baseVal = e
				: t.className = e, E)
	}
	function w(t) {
		var e;
		try {
			return t ? "true" == t
					|| ("false" == t ? !1 : "null" == t
							? null
							: isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? T
									.parseJSON(t) : t : e) : t
		} catch (n) {
			return t
		}
	}
	function x(t, e) {
		e(t);
		for (var n in t.childNodes)
			x(t.childNodes[n], e)
	}
	var E, _, T, k, j, C, S = [], A = S.slice, P = S.filter, N = window.document, z = {}, M = {}, O = N.defaultView.getComputedStyle, $ = {
		"column-count" : 1,
		columns : 1,
		"font-weight" : 1,
		"line-height" : 1,
		opacity : 1,
		"z-index" : 1,
		zoom : 1
	}, I = /^\s*<(\w+|!)[^>]*>/, L = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, R = /^(?:body|html)$/i, H = [
			"val", "css", "html", "text", "data", "width", "height", "offset"], D = [
			"after", "prepend", "before", "append"], B = N
			.createElement("table"), V = N.createElement("tr"), q = {
		tr : N.createElement("tbody"),
		tbody : B,
		thead : B,
		tfoot : B,
		td : V,
		th : V,
		"*" : N.createElement("div")
	}, F = /complete|loaded|interactive/, Z = /^\.([\w-]+)$/, U = /^#([\w-]*)$/, W = /^[\w-]+$/, Y = {}, X = Y.toString, G = {}, J = N
			.createElement("div");
	return G.matches = function(t, e) {
		if (!t || 1 !== t.nodeType)
			return !1;
		var n = t.webkitMatchesSelector || t.mozMatchesSelector
				|| t.oMatchesSelector || t.matchesSelector;
		if (n)
			return n.call(t, e);
		var i, r = t.parentNode, o = !r;
		return o && (r = J).appendChild(t), i = ~G.qsa(r, e).indexOf(t), o
				&& J.removeChild(t), i
	}, j = function(t) {
		return t.replace(/-+(.)?/g, function(t, e) {
					return e ? e.toUpperCase() : ""
				})
	}, C = function(t) {
		return P.call(t, function(e, n) {
					return t.indexOf(e) == n
				})
	}, G.fragment = function(t, e, n) {
		t.replace && (t = t.replace(L, "<$1></$2>")), e === E
				&& (e = I.test(t) && RegExp.$1), e in q || (e = "*");
		var i, r, a = q[e];
		return a.innerHTML = "" + t, r = T.each(A.call(a.childNodes),
				function() {
					a.removeChild(this)
				}), o(n) && (i = T(r), T.each(n, function(t, e) {
					H.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
				})), r
	}, G.Z = function(t, e) {
		return t = t || [], t.__proto__ = T.fn, t.selector = e || "", t
	}, G.isZ = function(t) {
		return t instanceof G.Z
	}, G.init = function(t, n) {
		if (t) {
			if (e(t))
				return T(N).ready(t);
			if (G.isZ(t))
				return t;
			var i;
			if (a(t))
				i = l(t);
			else if (r(t))
				i = [o(t) ? T.extend({}, t) : t], t = null;
			else if (I.test(t))
				i = G.fragment(t.trim(), RegExp.$1, n), t = null;
			else {
				if (n !== E)
					return T(n).find(t);
				i = G.qsa(N, t)
			}
			return G.Z(i, t)
		}
		return G.Z()
	}, T = function(t, e) {
		return G.init(t, e)
	}, T.extend = function(t) {
		var e, n = A.call(arguments, 1);
		return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(
				function(n) {
					m(t, n, e)
				}), t
	}, G.qsa = function(t, e) {
		var n;
		return i(t) && U.test(e)
				? (n = t.getElementById(RegExp.$1)) ? [n] : []
				: 1 !== t.nodeType && 9 !== t.nodeType ? [] : A.call(Z.test(e)
						? t.getElementsByClassName(RegExp.$1)
						: W.test(e) ? t.getElementsByTagName(e) : t
								.querySelectorAll(e))
	}, T.contains = function(t, e) {
		return t !== e && t.contains(e)
	}, T.type = t, T.isFunction = e, T.isWindow = n, T.isArray = a, T.isPlainObject = o, T.isEmptyObject = function(
			t) {
		var e;
		for (e in t)
			return !1;
		return !0
	}, T.inArray = function(t, e, n) {
		return S.indexOf.call(e, t, n)
	}, T.camelCase = j, T.trim = function(t) {
		return t.trim()
	}, T.uuid = 0, T.support = {}, T.expr = {}, T.map = function(t, e) {
		var n, i, r, o = [];
		if (s(t))
			for (i = 0; t.length > i; i++)
				n = e(t[i], i), null != n && o.push(n);
		else
			for (r in t)
				n = e(t[r], r), null != n && o.push(n);
		return c(o)
	}, T.each = function(t, e) {
		var n, i;
		if (s(t)) {
			for (n = 0; t.length > n; n++)
				if (e.call(t[n], n, t[n]) === !1)
					return t
		} else
			for (i in t)
				if (e.call(t[i], i, t[i]) === !1)
					return t;
		return t
	}, T.grep = function(t, e) {
		return P.call(t, e)
	}, window.JSON && (T.parseJSON = JSON.parse), T.each(
			"Boolean Number String Function Array Date RegExp Object Error"
					.split(" "), function(t, e) {
				Y["[object " + e + "]"] = e.toLowerCase()
			}), T.fn = {
		forEach : S.forEach,
		reduce : S.reduce,
		push : S.push,
		sort : S.sort,
		indexOf : S.indexOf,
		concat : S.concat,
		map : function(t) {
			return T(T.map(this, function(e, n) {
						return t.call(e, n, e)
					}))
		},
		slice : function() {
			return T(A.apply(this, arguments))
		},
		ready : function(t) {
			return F.test(N.readyState) ? t(T) : N.addEventListener(
					"DOMContentLoaded", function() {
						t(T)
					}, !1), this
		},
		get : function(t) {
			return t === E ? A.call(this) : this[t >= 0 ? t : t + this.length]
		},
		toArray : function() {
			return this.get()
		},
		size : function() {
			return this.length
		},
		remove : function() {
			return this.each(function() {
						null != this.parentNode
								&& this.parentNode.removeChild(this)
					})
		},
		each : function(t) {
			return S.every.call(this, function(e, n) {
						return t.call(e, n, e) !== !1
					}), this
		},
		filter : function(t) {
			return e(t) ? this.not(this.not(t)) : T(P.call(this, function(e) {
						return G.matches(e, t)
					}))
		},
		add : function(t, e) {
			return T(C(this.concat(T(t, e))))
		},
		is : function(t) {
			return this.length > 0 && G.matches(this[0], t)
		},
		not : function(t) {
			var n = [];
			if (e(t) && t.call !== E)
				this.each(function(e) {
							t.call(this, e) || n.push(this)
						});
			else {
				var i = "string" == typeof t ? this.filter(t) : s(t)
						&& e(t.item) ? A.call(t) : T(t);
				this.forEach(function(t) {
							0 > i.indexOf(t) && n.push(t)
						})
			}
			return T(n)
		},
		has : function(t) {
			return this.filter(function() {
						return r(t) ? T.contains(this, t) : T(this).find(t)
								.size()
					})
		},
		eq : function(t) {
			return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
		},
		first : function() {
			var t = this[0];
			return t && !r(t) ? t : T(t)
		},
		last : function() {
			var t = this[this.length - 1];
			return t && !r(t) ? t : T(t)
		},
		find : function(t) {
			var e, n = this;
			return e = "object" == typeof t ? T(t).filter(function() {
						var t = this;
						return S.some.call(n, function(e) {
									return T.contains(e, t)
								})
					}) : 1 == this.length ? T(G.qsa(this[0], t)) : this.map(
					function() {
						return G.qsa(this, t)
					})
		},
		closest : function(t, e) {
			var n = this[0], r = !1;
			for ("object" == typeof t && (r = T(t)); n
					&& !(r ? r.indexOf(n) >= 0 : G.matches(n, t));)
				n = n !== e && !i(n) && n.parentNode;
			return T(n)
		},
		parents : function(t) {
			for (var e = [], n = this; n.length > 0;)
				n = T.map(n, function(t) {
							return (t = t.parentNode) && !i(t)
									&& 0 > e.indexOf(t) ? (e.push(t), t) : E
						});
			return g(e, t)
		},
		parent : function(t) {
			return g(C(this.pluck("parentNode")), t)
		},
		children : function(t) {
			return g(this.map(function() {
								return h(this)
							}), t)
		},
		contents : function() {
			return this.map(function() {
						return A.call(this.childNodes)
					})
		},
		siblings : function(t) {
			return g(this.map(function(t, e) {
								return P.call(h(e.parentNode), function(t) {
											return t !== e
										})
							}), t)
		},
		empty : function() {
			return this.each(function() {
						this.innerHTML = ""
					})
		},
		pluck : function(t) {
			return T.map(this, function(e) {
						return e[t]
					})
		},
		show : function() {
			return this.each(function() {
				"none" == this.style.display && (this.style.display = null), "none" == O(
						this, "").getPropertyValue("display")
						&& (this.style.display = f(this.nodeName))
			})
		},
		replaceWith : function(t) {
			return this.before(t).remove()
		},
		wrap : function(t) {
			var n = e(t);
			if (this[0] && !n)
				var i = T(t).get(0), r = i.parentNode || this.length > 1;
			return this.each(function(e) {
						T(this).wrapAll(n ? t.call(this, e) : r ? i
								.cloneNode(!0) : i)
					})
		},
		wrapAll : function(t) {
			if (this[0]) {
				T(this[0]).before(t = T(t));
				for (var e; (e = t.children()).length;)
					t = e.first();
				T(t).append(this)
			}
			return this
		},
		wrapInner : function(t) {
			var n = e(t);
			return this.each(function(e) {
						var i = T(this), r = i.contents(), o = n ? t.call(this,
								e) : t;
						r.length ? r.wrapAll(o) : i.append(o)
					})
		},
		unwrap : function() {
			return this.parent().each(function() {
						T(this).replaceWith(T(this).children())
					}), this
		},
		clone : function() {
			return this.map(function() {
						return this.cloneNode(!0)
					})
		},
		hide : function() {
			return this.css("display", "none")
		},
		toggle : function(t) {
			return this.each(function() {
						var e = T(this);
						(t === E ? "none" == e.css("display") : t)
								? e.show()
								: e.hide()
					})
		},
		prev : function(t) {
			return T(this.pluck("previousElementSibling")).filter(t || "*")
		},
		next : function(t) {
			return T(this.pluck("nextElementSibling")).filter(t || "*")
		},
		html : function(t) {
			return t === E ? this.length > 0 ? this[0].innerHTML : null : this
					.each(function(e) {
								var n = this.innerHTML;
								T(this).empty().append(v(this, t, e, n))
							})
		},
		text : function(t) {
			return t === E
					? this.length > 0 ? this[0].textContent : null
					: this.each(function() {
								this.textContent = t
							})
		},
		attr : function(t, e) {
			var n;
			return "string" == typeof t && e === E ? 0 == this.length
					|| 1 !== this[0].nodeType ? E : "value" == t
					&& "INPUT" == this[0].nodeName ? this.val() : !(n = this[0]
					.getAttribute(t))
					&& t in this[0] ? this[0][t] : n : this.each(function(n) {
						if (1 === this.nodeType)
							if (r(t))
								for (_ in t)
									y(this, _, t[_]);
							else
								y(this, t, v(this, e, n, this.getAttribute(t)))
					})
		},
		removeAttr : function(t) {
			return this.each(function() {
						1 === this.nodeType && y(this, t)
					})
		},
		prop : function(t, e) {
			return e === E ? this[0] && this[0][t] : this.each(function(n) {
						this[t] = v(this, e, n, this[t])
					})
		},
		data : function(t, e) {
			var n = this.attr("data-" + u(t), e);
			return null !== n ? w(n) : E
		},
		val : function(t) {
			return t === E ? this[0]
					&& (this[0].multiple ? T(this[0]).find("option").filter(
							function() {
								return this.selected
							}).pluck("value") : this[0].value) : this.each(
					function(e) {
						this.value = v(this, t, e, this.value)
					})
		},
		offset : function(t) {
			if (t)
				return this.each(function(e) {
					var n = T(this), i = v(this, t, e, n.offset()), r = n
							.offsetParent().offset(), o = {
						top : i.top - r.top,
						left : i.left - r.left
					};
					"static" == n.css("position") && (o.position = "relative"), n
							.css(o)
				});
			if (0 == this.length)
				return null;
			var e = this[0].getBoundingClientRect();
			return {
				left : e.left + window.pageXOffset,
				top : e.top + window.pageYOffset,
				width : Math.round(e.width),
				height : Math.round(e.height)
			}
		},
		css : function(e, n) {
			if (2 > arguments.length && "string" == typeof e)
				return this[0]
						&& (this[0].style[j(e)] || O(this[0], "")
								.getPropertyValue(e));
			var i = "";
			if ("string" == t(e))
				n || 0 === n ? i = u(e) + ":" + d(e, n) : this.each(function() {
							this.style.removeProperty(u(e))
						});
			else
				for (_ in e)
					e[_] || 0 === e[_]
							? i += u(_) + ":" + d(_, e[_]) + ";"
							: this.each(function() {
										this.style.removeProperty(u(_))
									});
			return this.each(function() {
						this.style.cssText += ";" + i
					})
		},
		index : function(t) {
			return t ? this.indexOf(T(t)[0]) : this.parent().children()
					.indexOf(this[0])
		},
		hasClass : function(t) {
			return S.some.call(this, function(t) {
						return this.test(b(t))
					}, p(t))
		},
		addClass : function(t) {
			return this.each(function(e) {
						k = [];
						var n = b(this), i = v(this, t, e, n);
						i.split(/\s+/g).forEach(function(t) {
									T(this).hasClass(t) || k.push(t)
								}, this), k.length
								&& b(this, n + (n ? " " : "") + k.join(" "))
					})
		},
		removeClass : function(t) {
			return this.each(function(e) {
						return t === E ? b(this, "") : (k = b(this), v(this, t,
								e, k).split(/\s+/g).forEach(function(t) {
									k = k.replace(p(t), " ")
								}), b(this, k.trim()), E)
					})
		},
		toggleClass : function(t, e) {
			return this.each(function(n) {
						var i = T(this), r = v(this, t, n, b(this));
						r.split(/\s+/g).forEach(function(t) {
							(e === E ? !i.hasClass(t) : e) ? i.addClass(t) : i
									.removeClass(t)
						})
					})
		},
		scrollTop : function() {
			return this.length ? "scrollTop" in this[0]
					? this[0].scrollTop
					: this[0].scrollY : E
		},
		position : function() {
			if (this.length) {
				var t = this[0], e = this.offsetParent(), n = this.offset(), i = R
						.test(e[0].nodeName) ? {
					top : 0,
					left : 0
				} : e.offset();
				return n.top -= parseFloat(T(t).css("margin-top")) || 0, n.left -= parseFloat(T(t)
						.css("margin-left"))
						|| 0, i.top += parseFloat(T(e[0])
						.css("border-top-width"))
						|| 0, i.left += parseFloat(T(e[0])
						.css("border-left-width"))
						|| 0, {
					top : n.top - i.top,
					left : n.left - i.left
				}
			}
		},
		offsetParent : function() {
			return this.map(function() {
						for (var t = this.offsetParent || N.body; t
								&& !R.test(t.nodeName)
								&& "static" == T(t).css("position");)
							t = t.offsetParent;
						return t
					})
		}
	}, T.fn.detach = T.fn.remove, ["width", "height"].forEach(function(t) {
				T.fn[t] = function(e) {
					var r, o = this[0], a = t.replace(/./, function(t) {
								return t[0].toUpperCase()
							});
					return e === E ? n(o) ? o["inner" + a] : i(o)
							? o.documentElement["offset" + a]
							: (r = this.offset()) && r[t] : this.each(function(
									n) {
								o = T(this), o.css(t, v(this, e, n, o[t]()))
							})
				}
			}), D.forEach(function(e, n) {
		var i = n % 2;
		T.fn[e] = function() {
			var e, r, o = T.map(arguments, function(n) {
						return e = t(n), "object" == e || "array" == e
								|| null == n ? n : G.fragment(n)
					}), a = this.length > 1;
			return 1 > o.length ? this : this.each(function(t, e) {
						r = i ? e : e.parentNode, e = 0 == n
								? e.nextSibling
								: 1 == n ? e.firstChild : 2 == n ? e : null, o
								.forEach(function(t) {
									if (a)
										t = t.cloneNode(!0);
									else if (!r)
										return T(t).remove();
									x(r.insertBefore(t, e), function(t) {
												null == t.nodeName
														|| "SCRIPT" !== t.nodeName
																.toUpperCase()
														|| t.type
														&& "text/javascript" !== t.type
														|| t.src
														|| window.eval.call(
																window,
																t.innerHTML)
											})
								})
					})
		}, T.fn[i ? e + "To" : "insert" + (n ? "Before" : "After")] = function(
				t) {
			return T(t)[e](this), this
		}
	}), G.Z.prototype = T.fn, G.uniq = C, G.deserializeValue = w, T.zepto = G, T
}();
window.Zepto = Zepto, "$" in window || (window.$ = Zepto), function(t) {
	function e(t) {
		var e = this.os = {}, n = this.browser = {}, i = t
				.match(/WebKit\/([\d.]+)/), r = t.match(/(Android)\s+([\d.]+)/), o = t
				.match(/(iPad).*OS\s([\d_]+)/), a = !o
				&& t.match(/(iPhone\sOS)\s([\d_]+)/), s = t
				.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), l = s
				&& t.match(/TouchPad/), c = t.match(/Kindle\/([\d.]+)/), u = t
				.match(/Silk\/([\d._]+)/), p = t
				.match(/(BlackBerry).*Version\/([\d.]+)/), d = t
				.match(/(BB10).*Version\/([\d.]+)/), f = t
				.match(/(RIM\sTablet\sOS)\s([\d.]+)/), h = t.match(/PlayBook/), m = t
				.match(/Chrome\/([\d.]+)/)
				|| t.match(/CriOS\/([\d.]+)/), g = t.match(/Firefox\/([\d.]+)/);
		(n.webkit = !!i) && (n.version = i[1]), r
				&& (e.android = !0, e.version = r[2]), a
				&& (e.ios = e.iphone = !0, e.version = a[2].replace(/_/g, ".")), o
				&& (e.ios = e.ipad = !0, e.version = o[2].replace(/_/g, ".")), s
				&& (e.webos = !0, e.version = s[2]), l && (e.touchpad = !0), p
				&& (e.blackberry = !0, e.version = p[2]), d
				&& (e.bb10 = !0, e.version = d[2]), f
				&& (e.rimtabletos = !0, e.version = f[2]), h
				&& (n.playbook = !0), c && (e.kindle = !0, e.version = c[1]), u
				&& (n.silk = !0, n.version = u[1]), !u && e.android
				&& t.match(/Kindle Fire/) && (n.silk = !0), m
				&& (n.chrome = !0, n.version = m[1]), g
				&& (n.firefox = !0, n.version = g[1]), e.tablet = !!(o || h
				|| r && !t.match(/Mobile/) || g && t.match(/Tablet/)), e.phone = !(e.tablet || !(r
				|| a
				|| s
				|| p
				|| d
				|| m
				&& t.match(/Android/)
				|| m
				&& t.match(/CriOS\/([\d.]+)/) || g && t.match(/Mobile/)))
	}
	e.call(t, navigator.userAgent), t.__detect = e
}(Zepto), function(t) {
	function e(t) {
		return t._zid || (t._zid = f++)
	}
	function n(t, n, o, a) {
		if (n = i(n), n.ns)
			var s = r(n.ns);
		return (d[e(t)] || []).filter(function(t) {
					return !(!t || n.e && t.e != n.e || n.ns && !s.test(t.ns)
							|| o && e(t.fn) !== e(o) || a && t.sel != a)
				})
	}
	function i(t) {
		var e = ("" + t).split(".");
		return {
			e : e[0],
			ns : e.slice(1).sort().join(" ")
		}
	}
	function r(t) {
		return RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
	}
	function o(e, n, i) {
		"string" != t.type(e) ? t.each(e, i) : e.split(/\s/).forEach(
				function(t) {
					i(t, n)
				})
	}
	function a(t, e) {
		return t.del && ("focus" == t.e || "blur" == t.e) || !!e
	}
	function s(t) {
		return m[t] || t
	}
	function l(n, r, l, c, u, p) {
		var f = e(n), h = d[f] || (d[f] = []);
		o(r, l, function(e, r) {
					var o = i(e);
					o.fn = r, o.sel = c, o.e in m && (r = function(e) {
						var n = e.relatedTarget;
						return !n || n !== this && !t.contains(this, n) ? o.fn
								.apply(this, arguments) : void 0
					}), o.del = u && u(r, e);
					var l = o.del || r;
					o.proxy = function(t) {
						var e = l.apply(n, [t].concat(t.data));
						return e === !1
								&& (t.preventDefault(), t.stopPropagation()), e
					}, o.i = h.length, h.push(o), n.addEventListener(s(o.e),
							o.proxy, a(o, p))
				})
	}
	function c(t, i, r, l, c) {
		var u = e(t);
		o(i || "", r, function(e, i) {
					n(t, e, i, l).forEach(function(e) {
						delete d[u][e.i], t.removeEventListener(s(e.e),
								e.proxy, a(e, c))
					})
				})
	}
	function u(e) {
		var n, i = {
			originalEvent : e
		};
		for (n in e)
			y.test(n) || void 0 === e[n] || (i[n] = e[n]);
		return t.each(b, function(t, n) {
					i[t] = function() {
						return this[n] = g, e[t].apply(e, arguments)
					}, i[n] = v
				}), i
	}
	function p(t) {
		if (!("defaultPrevented" in t)) {
			t.defaultPrevented = !1;
			var e = t.preventDefault;
			t.preventDefault = function() {
				this.defaultPrevented = !0, e.call(this)
			}
		}
	}
	var d = (t.zepto.qsa, {}), f = 1, h = {}, m = {
		mouseenter : "mouseover",
		mouseleave : "mouseout"
	};
	h.click = h.mousedown = h.mouseup = h.mousemove = "MouseEvents", t.event = {
		add : l,
		remove : c
	}, t.proxy = function(n, i) {
		if (t.isFunction(n)) {
			var r = function() {
				return n.apply(i, arguments)
			};
			return r._zid = e(n), r
		}
		if ("string" == typeof i)
			return t.proxy(n[i], n);
		throw new TypeError("expected function")
	}, t.fn.bind = function(t, e) {
		return this.each(function() {
					l(this, t, e)
				})
	}, t.fn.unbind = function(t, e) {
		return this.each(function() {
					c(this, t, e)
				})
	}, t.fn.one = function(t, e) {
		return this.each(function(n, i) {
					l(this, t, e, null, function(t, e) {
								return function() {
									var n = t.apply(i, arguments);
									return c(i, e, t), n
								}
							})
				})
	};
	var g = function() {
		return !0
	}, v = function() {
		return !1
	}, y = /^([A-Z]|layer[XY]$)/, b = {
		preventDefault : "isDefaultPrevented",
		stopImmediatePropagation : "isImmediatePropagationStopped",
		stopPropagation : "isPropagationStopped"
	};
	t.fn.delegate = function(e, n, i) {
		return this.each(function(r, o) {
					l(o, n, i, e, function(n) {
								return function(i) {
									var r, a = t(i.target).closest(e, o).get(0);
									return a
											? (r = t.extend(u(i), {
														currentTarget : a,
														liveFired : o
													}), n.apply(a,
													[r].concat([].slice.call(
															arguments, 1))))
											: void 0
								}
							})
				})
	}, t.fn.undelegate = function(t, e, n) {
		return this.each(function() {
					c(this, e, n, t)
				})
	}, t.fn.live = function(e, n) {
		return t(document.body).delegate(this.selector, e, n), this
	}, t.fn.die = function(e, n) {
		return t(document.body).undelegate(this.selector, e, n), this
	}, t.fn.on = function(e, n, i) {
		return !n || t.isFunction(n) ? this.bind(e, n || i) : this.delegate(n,
				e, i)
	}, t.fn.off = function(e, n, i) {
		return !n || t.isFunction(n) ? this.unbind(e, n || i) : this
				.undelegate(n, e, i)
	}, t.fn.trigger = function(e, n) {
		return ("string" == typeof e || t.isPlainObject(e)) && (e = t.Event(e)), p(e), e.data = n, this
				.each(function() {
							"dispatchEvent" in this && this.dispatchEvent(e)
						})
	}, t.fn.triggerHandler = function(e, i) {
		var r, o;
		return this.each(function(a, s) {
			r = u("string" == typeof e ? t.Event(e) : e), r.data = i, r.target = s, t
					.each(n(s, e.type || e), function(t, e) {
								return o = e.proxy(r), r
										.isImmediatePropagationStopped()
										? !1
										: void 0
							})
		}), o
	}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error"
			.split(" ").forEach(function(e) {
						t.fn[e] = function(t) {
							return t ? this.bind(e, t) : this.trigger(e)
						}
					}), ["focus", "blur"].forEach(function(e) {
				t.fn[e] = function(t) {
					return t ? this.bind(e, t) : this.each(function() {
								try {
									this[e]()
								} catch (t) {
								}
							}), this
				}
			}), t.Event = function(t, e) {
		"string" != typeof t && (e = t, t = e.type);
		var n = document.createEvent(h[t] || "Events"), i = !0;
		if (e)
			for (var r in e)
				"bubbles" == r ? i = !!e[r] : n[r] = e[r];
		return n.initEvent(t, i, !0, null, null, null, null, null, null, null,
				null, null, null, null, null), n.isDefaultPrevented = function() {
			return this.defaultPrevented
		}, n
	}
}(Zepto), function(t) {
	function e(e, n, i) {
		var r = t.Event(n);
		return t(e).trigger(r, i), !r.defaultPrevented
	}
	function n(t, n, i, r) {
		return t.global ? e(n || y, i, r) : void 0
	}
	function i(e) {
		e.global && 0 === t.active++ && n(e, null, "ajaxStart")
	}
	function r(e) {
		e.global && !--t.active && n(e, null, "ajaxStop")
	}
	function o(t, e) {
		var i = e.context;
		return e.beforeSend.call(i, t, e) === !1
				|| n(e, i, "ajaxBeforeSend", [t, e]) === !1 ? !1 : (n(e, i,
				"ajaxSend", [t, e]), void 0)
	}
	function a(t, e, i) {
		var r = i.context, o = "success";
		i.success.call(r, t, o, e), n(i, r, "ajaxSuccess", [e, i, t]), l(o, e,
				i)
	}
	function s(t, e, i, r) {
		var o = r.context;
		r.error.call(o, i, e, t), n(r, o, "ajaxError", [i, r, t]), l(e, i, r)
	}
	function l(t, e, i) {
		var o = i.context;
		i.complete.call(o, e, t), n(i, o, "ajaxComplete", [e, i]), r(i)
	}
	function c() {
	}
	function u(t) {
		return t && (t = t.split(";", 2)[0]), t
				&& (t == _ ? "html" : t == E ? "json" : w.test(t)
						? "script"
						: x.test(t) && "xml") || "text"
	}
	function p(t, e) {
		return (t + "&" + e).replace(/[&?]{1,2}/, "?")
	}
	function d(e) {
		e.processData && e.data && "string" != t.type(e.data)
				&& (e.data = t.param(e.data, e.traditional)), !e.data || e.type
				&& "GET" != e.type.toUpperCase() || (e.url = p(e.url, e.data))
	}
	function f(e, n, i, r) {
		var o = !t.isFunction(n);
		return {
			url : e,
			data : o ? n : void 0,
			success : o ? t.isFunction(i) ? i : void 0 : n,
			dataType : o ? r || i : i
		}
	}
	function h(e, n, i, r) {
		var o, a = t.isArray(n);
		t.each(n, function(n, s) {
					o = t.type(s), r
							&& (n = i ? r : r + "[" + (a ? "" : n) + "]"), !r
							&& a ? e.add(s.name, s.value) : "array" == o || !i
							&& "object" == o ? h(e, s, i, n) : e.add(n, s)
				})
	}
	var m, g, v = 0, y = window.document, b = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, w = /^(?:text|application)\/javascript/i, x = /^(?:text|application)\/xml/i, E = "application/json", _ = "text/html", T = /^\s*$/;
	t.active = 0, t.ajaxJSONP = function(e) {
		if (!("type" in e))
			return t.ajax(e);
		var n, i = "jsonp" + ++v, r = y.createElement("script"), l = function() {
			clearTimeout(n), t(r).remove(), delete window[i]
		}, u = function(t) {
			l(), t && "timeout" != t || (window[i] = c), s(null, t || "abort",
					p, e)
		}, p = {
			abort : u
		};
		return o(p, e) === !1
				? (u("abort"), !1)
				: (window[i] = function(t) {
					l(), a(t, p, e)
				}, r.onerror = function() {
					u("error")
				}, r.src = e.url.replace(/=\?/, "=" + i), t("head").append(r), e.timeout > 0
						&& (n = setTimeout(function() {
									u("timeout")
								}, e.timeout)), p)
	}, t.ajaxSettings = {
		type : "GET",
		beforeSend : c,
		success : c,
		error : c,
		complete : c,
		context : null,
		global : !0,
		xhr : function() {
			return new window.XMLHttpRequest
		},
		accepts : {
			script : "text/javascript, application/javascript",
			json : E,
			xml : "application/xml, text/xml",
			html : _,
			text : "text/plain"
		},
		crossDomain : !1,
		timeout : 0,
		processData : !0,
		cache : !0
	}, t.ajax = function(e) {
		var n = t.extend({}, e || {});
		for (m in t.ajaxSettings)
			void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
		i(n), n.crossDomain
				|| (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url)
						&& RegExp.$2 != window.location.host), n.url
				|| (n.url = "" + window.location), d(n), n.cache === !1
				&& (n.url = p(n.url, "_=" + Date.now()));
		var r = n.dataType, l = /=\?/.test(n.url);
		if ("jsonp" == r || l)
			return l || (n.url = p(n.url, "callback=?")), t.ajaxJSONP(n);
		var f, h = n.accepts[r], v = {}, y = /^([\w-]+:)\/\//.test(n.url)
				? RegExp.$1
				: window.location.protocol, b = n.xhr();
		n.crossDomain || (v["X-Requested-With"] = "XMLHttpRequest"), h
				&& (v.Accept = h, h.indexOf(",") > -1
						&& (h = h.split(",", 2)[0]), b.overrideMimeType
						&& b.overrideMimeType(h)), (n.contentType || n.contentType !== !1
				&& n.data && "GET" != n.type.toUpperCase())
				&& (v["Content-Type"] = n.contentType
						|| "application/x-www-form-urlencoded"), n.headers = t
				.extend(v, n.headers || {}), b.onreadystatechange = function() {
			if (4 == b.readyState) {
				b.onreadystatechange = c, clearTimeout(f);
				var e, i = !1;
				if (b.status >= 200 && 300 > b.status || 304 == b.status
						|| 0 == b.status && "file:" == y) {
					r = r || u(b.getResponseHeader("content-type")), e = b.responseText;
					try {
						"script" == r ? (1, eval)(e) : "xml" == r
								? e = b.responseXML
								: "json" == r
										&& (e = T.test(e) ? null : t
												.parseJSON(e))
					} catch (o) {
						i = o
					}
					i ? s(i, "parsererror", b, n) : a(e, b, n)
				} else
					s(null, b.status ? "error" : "abort", b, n)
			}
		};
		var w = "async" in n ? n.async : !0;
		b.open(n.type, n.url, w);
		for (g in n.headers)
			b.setRequestHeader(g, n.headers[g]);
		return o(b, n) === !1 ? (b.abort(), !1) : (n.timeout > 0
				&& (f = setTimeout(function() {
							b.onreadystatechange = c, b.abort(), s(null,
									"timeout", b, n)
						}, n.timeout)), b.send(n.data ? n.data : null), b)
	}, t.get = function() {
		return t.ajax(f.apply(null, arguments))
	}, t.post = function() {
		var e = f.apply(null, arguments);
		return e.type = "POST", t.ajax(e)
	}, t.getJSON = function() {
		var e = f.apply(null, arguments);
		return e.dataType = "json", t.ajax(e)
	}, t.fn.load = function(e, n, i) {
		if (!this.length)
			return this;
		var r, o = this, a = e.split(/\s/), s = f(e, n, i), l = s.success;
		return a.length > 1 && (s.url = a[0], r = a[1]), s.success = function(e) {
			o.html(r ? t("<div>").html(e.replace(b, "")).find(r) : e), l
					&& l.apply(o, arguments)
		}, t.ajax(s), this
	};
	var k = encodeURIComponent;
	t.param = function(t, e) {
		var n = [];
		return n.add = function(t, e) {
			this.push(k(t) + "=" + k(e))
		}, h(n, t, e), n.join("&").replace(/%20/g, "+")
	}
}(Zepto), function(t) {
	t.fn.serializeArray = function() {
		var e, n = [];
		return t(Array.prototype.slice.call(this.get(0).elements)).each(
				function() {
					e = t(this);
					var i = e.attr("type");
					"fieldset" != this.nodeName.toLowerCase()
							&& !this.disabled
							&& "submit" != i
							&& "reset" != i
							&& "button" != i
							&& ("radio" != i && "checkbox" != i || this.checked)
							&& n.push({
										name : e.attr("name"),
										value : e.val()
									})
				}), n
	}, t.fn.serialize = function() {
		var t = [];
		return this.serializeArray().forEach(function(e) {
			t.push(encodeURIComponent(e.name) + "="
					+ encodeURIComponent(e.value))
		}), t.join("&")
	}, t.fn.submit = function(e) {
		if (e)
			this.bind("submit", e);
		else if (this.length) {
			var n = t.Event("submit");
			this.eq(0).trigger(n), n.defaultPrevented || this.get(0).submit()
		}
		return this
	}
}(Zepto), function(t, e) {
	function n(t) {
		return i(t.replace(/([a-z])([A-Z])/, "$1-$2"))
	}
	function i(t) {
		return t.toLowerCase()
	}
	function r(t) {
		return o ? o + t : i(t)
	}
	var o, a, s, l, c, u, p, d, f = "", h = {
		Webkit : "webkit",
		Moz : "",
		O : "o",
		ms : "MS"
	}, m = window.document, g = m.createElement("div"), v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, y = {};
	t.each(h, function(t, n) {
				return g.style[t + "TransitionProperty"] !== e ? (f = "-"
						+ i(t) + "-", o = n, !1) : e
			}), a = f + "transform", y[s = f + "transition-property"] = y[l = f
			+ "transition-duration"] = y[c = f + "transition-timing-function"] = y[u = f
			+ "animation-name"] = y[p = f + "animation-duration"] = y[d = f
			+ "animation-timing-function"] = "", t.fx = {
		off : o === e && g.style.transitionProperty === e,
		speeds : {
			_default : 400,
			fast : 200,
			slow : 600
		},
		cssPrefix : f,
		transitionEnd : r("TransitionEnd"),
		animationEnd : r("AnimationEnd")
	}, t.fn.animate = function(e, n, i, r) {
		return t.isPlainObject(n)
				&& (i = n.easing, r = n.complete, n = n.duration), n
				&& (n = ("number" == typeof n ? n : t.fx.speeds[n]
						|| t.fx.speeds._default)
						/ 1e3), this.anim(e, n, i, r)
	}, t.fn.anim = function(i, r, o, f) {
		var h, m, g, b = {}, w = "", x = this, E = t.fx.transitionEnd;
		if (r === e && (r = .4), t.fx.off && (r = 0), "string" == typeof i)
			b[u] = i, b[p] = r + "s", b[d] = o || "linear", E = t.fx.animationEnd;
		else {
			m = [];
			for (h in i)
				v.test(h) ? w += h + "(" + i[h] + ") " : (b[h] = i[h], m
						.push(n(h)));
			w && (b[a] = w, m.push(a)), r > 0
					&& "object" == typeof i
					&& (b[s] = m.join(", "), b[l] = r + "s", b[c] = o
							|| "linear")
		}
		return g = function(n) {
			if (n !== e) {
				if (n.target !== n.currentTarget)
					return;
				t(n.target).unbind(E, g)
			}
			t(this).css(y), f && f.call(this)
		}, r > 0 && this.bind(E, g), this.size() && this.get(0).clientLeft, this
				.css(b), 0 >= r && setTimeout(function() {
					x.each(function() {
								g.call(this)
							})
				}, 0), this
	}, g = null
}(Zepto);
(function() {
	var t = [], e = window.Zepto;
	if (e && !t.__proto__) {
		var n = function(e) {
			return t.push.apply(this, e), this
		};
		e.zepto.Z = function(t, e) {
			t = t || [];
			var i = new n(t);
			return i.selector = e || "", i
		}, e.zepto.Z.prototype = n.prototype = e.fn, e.fn.concat = function() {
			var t = [];
			return t.push.apply(t, this), e.each(arguments, function(e, n) {
						"object" == typeof n && "number" == typeof n.length
								? t.push.apply(t, n)
								: t.push(n)
					}), t
		}, e.fn.empty = function() {
			return this.each(function(t, e) {
						for (; e.firstChild;)
							e.removeChild(e.firstChild)
					})
		};
		var i = /^\s*<(\w+)[^>]*>/, r = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, o = {
			option : [1, "<select multiple='multiple'>", "</select>"],
			legend : [1, "<fieldset>", "</fieldset>"],
			thead : [1, "<table>", "</table>"],
			tr : [2, "<table><tbody>", "</tbody></table>"],
			td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area : [1, "<map>", "</map>"],
			"*" : [0, "", ""]
		};
		o.optgroup = o.option, o.tbody = o.tfoot = o.colgroup = o.caption = o.thead, o.th = o.td, e.zepto.fragment = function(
				e, n) {
			void 0 === n && (n = i.test(e) && RegExp.$1), e = ("" + e).replace(
					r, "<$1></$2>");
			var a = o[n] || o["*"], s = a[0], l = document.createElement("div");
			for (l.innerHTML = a[1] + e + a[2]; s--;)
				l = l.lastChild;
			return t.slice.call(l.childNodes)
		}
	}
})();
(function(t) {
	t.AMPlatform
			&& (t.$ && t.$.noConflict
					? t.AMPlatform.$ = t.$.noConflict(!0)
					: (t.AMPlatform.$ = t.Zepto, t.AMPlatform.$.support = t.AMPlatform.$.support
							|| {}, Zepto === t.$ && delete t.$, delete t.Zepto))
})(this);
var Handlebars = {};
(function(t, e) {
	t.VERSION = "1.0.0-rc.4", t.COMPILER_REVISION = 3, t.REVISION_CHANGES = {
		1 : "<= 1.0.rc.2",
		2 : "== 1.0.0-rc.3",
		3 : ">= 1.0.0-rc.4"
	}, t.helpers = {}, t.partials = {};
	var n = Object.prototype.toString, i = "[object Function]", r = "[object Object]";
	t.registerHelper = function(e, i, o) {
		if (n.call(e) === r) {
			if (o || i)
				throw new t.Exception("Arg not supported with multiple helpers");
			t.Utils.extend(this.helpers, e)
		} else
			o && (i.not = o), this.helpers[e] = i
	}, t.registerPartial = function(e, i) {
		n.call(e) === r
				? t.Utils.extend(this.partials, e)
				: this.partials[e] = i
	}, t.registerHelper("helperMissing", function(t) {
				if (2 === arguments.length)
					return e;
				throw Error("Could not find property '" + t + "'")
			}), t.registerHelper("blockHelperMissing", function(e, r) {
				var o = r.inverse || function() {
				}, a = r.fn, s = n.call(e);
				return s === i && (e = e.call(this)), e === !0
						? a(this)
						: e === !1 || null == e
								? o(this)
								: "[object Array]" === s ? e.length > 0
										? t.helpers.each(e, r)
										: o(this) : a(e)
			}), t.K = function() {
	}, t.createFrame = Object.create || function(e) {
		t.K.prototype = e;
		var n = new t.K;
		return t.K.prototype = null, n
	}, t.logger = {
		DEBUG : 0,
		INFO : 1,
		WARN : 2,
		ERROR : 3,
		level : 3,
		methodMap : {
			0 : "debug",
			1 : "info",
			2 : "warn",
			3 : "error"
		},
		log : function(e, n) {
			if (e >= t.logger.level) {
				var i = t.logger.methodMap[e];
				"undefined" != typeof console && console[i]
						&& console[i].call(console, n)
			}
		}
	}, t.log = function(e, n) {
		t.logger.log(e, n)
	}, t.registerHelper("each", function(e, n) {
				var i, r = n.fn, o = n.inverse, a = 0, s = "";
				if (n.data && (i = t.createFrame(n.data)), e
						&& "object" == typeof e)
					if (e instanceof Array)
						for (var l = e.length; l > a; a++)
							i && (i.index = a), s += r(e[a], {
										data : i
									});
					else
						for (var c in e)
							e.hasOwnProperty(c)
									&& (i && (i.key = c), s += r(e[c], {
												data : i
											}), a++);
				return 0 === a && (s = o(this)), s
			}), t.registerHelper("if", function(e, r) {
				var o = n.call(e);
				return o === i && (e = e.call(this)), !e || t.Utils.isEmpty(e)
						? r.inverse(this)
						: r.fn(this)
			}), t.registerHelper("unless", function(e, n) {
				return t.helpers["if"].call(this, e, {
							fn : n.inverse,
							inverse : n.fn
						})
			}), t.registerHelper("with", function(n, i) {
				return t.Utils.isEmpty(n) ? e : i.fn(n)
			}), t.registerHelper("log", function(e, n) {
		var i = n.data && null != n.data.level ? parseInt(n.data.level, 10) : 1;
		t.log(i, e)
	});
	var o = ["description", "fileName", "lineNumber", "message", "name",
			"number", "stack"];
	t.Exception = function() {
		for (var t = Error.prototype.constructor.apply(this, arguments), e = 0; o.length > e; e++)
			this[o[e]] = t[o[e]]
	}, t.Exception.prototype = Error(), t.SafeString = function(t) {
		this.string = t
	}, t.SafeString.prototype.toString = function() {
		return "" + this.string
	};
	var a = {
		"&" : "&amp;",
		"<" : "&lt;",
		">" : "&gt;",
		'"' : "&quot;",
		"'" : "&#x27;",
		"`" : "&#x60;"
	}, s = /[&<>"'`]/g, l = /[&<>"'`]/, c = function(t) {
		return a[t] || "&amp;"
	};
	t.Utils = {
		extend : function(t, e) {
			for (var n in e)
				e.hasOwnProperty(n) && (t[n] = e[n])
		},
		escapeExpression : function(e) {
			return e instanceof t.SafeString ? "" + e : null == e || e === !1
					? ""
					: (e = "" + e, l.test(e) ? e.replace(s, c) : e)
		},
		isEmpty : function(t) {
			return t || 0 === t ? "[object Array]" === n.call(t)
					&& 0 === t.length ? !0 : !1 : !0
		}
	}, t.VM = {
		template : function(e) {
			var n = {
				escapeExpression : t.Utils.escapeExpression,
				invokePartial : t.VM.invokePartial,
				programs : [],
				program : function(e, n, i) {
					var r = this.programs[e];
					return i ? r = t.VM.program(e, n, i) : r
							|| (r = this.programs[e] = t.VM.program(e, n)), r
				},
				programWithDepth : t.VM.programWithDepth,
				noop : t.VM.noop,
				compilerInfo : null
			};
			return function(i, r) {
				r = r || {};
				var o = e.call(n, t, i, r.helpers, r.partials, r.data), a = n.compilerInfo
						|| [], s = a[0] || 1, l = t.COMPILER_REVISION;
				if (s !== l) {
					if (l > s) {
						var c = t.REVISION_CHANGES[l], u = t.REVISION_CHANGES[s];
						throw "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("
								+ c
								+ ") or downgrade your runtime to an older version ("
								+ u + ")."
					}
					throw "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("
							+ a[1] + ")."
				}
				return o
			}
		},
		programWithDepth : function(t, e, n) {
			var i = Array.prototype.slice.call(arguments, 3), r = function(t, r) {
				return r = r || {}, e.apply(this, [t, r.data || n].concat(i))
			};
			return r.program = t, r.depth = i.length, r
		},
		program : function(t, e, n) {
			var i = function(t, i) {
				return i = i || {}, e(t, i.data || n)
			};
			return i.program = t, i.depth = 0, i
		},
		noop : function() {
			return ""
		},
		invokePartial : function(n, i, r, o, a, s) {
			var l = {
				helpers : o,
				partials : a,
				data : s
			};
			if (n === e)
				throw new t.Exception("The partial " + i
						+ " could not be found");
			if (n instanceof Function)
				return n(r, l);
			if (t.compile)
				return a[i] = t.compile(n, {
							data : s !== e
						}), a[i](r, l);
			throw new t.Exception("The partial "
					+ i
					+ " could not be compiled when running in runtime-only mode")
		}
	}, t.template = t.VM.template
})(Handlebars);
(function(t) {
	t.util = t.util || {
		goDesktop : function() {
			document.cookie = "allmobilize=desktop; path=/;", window.location
					.reload()
		}
	}
})(window.AMPlatform);
(function(t, e) {
	var n = function(t) {
		var n = function(t, n, r) {
			return (e.fn.init || e.zepto.init).call(this, t, n || i.context(),
					r)
		}, i = e.sub(n);
		return i.context = function() {
			return t || "<div>"
		}, i.zepto || (i.fn.init = n, i.fn.init.prototype = e.fn), i
	};
	e.sub = e.sub || function(t) {
		return e.extend(t, e), t.zepto = e.extend({}, e.zepto), t
	}, e.fn.anchor = function() {
		return n(this)
	};
	var i = function(e, n) {
		return n
				&& (n.jquery || e.zepto && e.zepto.isZ && e.zepto.isZ(n)
						|| n.selector && n.length || n.innerHTML) ? t.html
				.htmlFromElement(n) : "object" == typeof n ? n : n && "" + n
				|| ""
	}, r = function(t, n, o) {
		if ("function" == typeof t) {
			var a = extractor(n, o);
			return i(n, a)
		}
		var s = {};
		return e.each(t, function(t, e) {
					if ("_" != t[0]) {
						var a;
						"function" == typeof e
								? (a = e(n, o), a = i(n, a))
								: a = "object" == typeof e ? r(e, n, o) : e, s[t] = a
					} else
						s[t] = e
				}), s
	}, o = function(t, e) {
		t.openLinkInSameWindow && e("a").removeAttr("target"), t.removeStyle
				&& (e("*").removeAttr("style"), e("style").remove()), t.cleanImg
				&& e('img, input[type="image"]').removeAttr("height")
						.removeAttr("width").removeAttr("align"), t.cleanTable
				&& (e("table").removeAttr("height").removeAttr("width"), e("tr, th, td")
						.removeAttr("height").removeAttr("width")
						.removeAttr("bgcolor")), t.cleanFrame
				&& e("iframe").removeAttr("width"), t.cleanEmbed
				&& e("embed").removeAttr("width")
	}, a = function() {
		return window.location.pathname
				+ (window.location.search ? window.location.search : "")
	}, s = {
		select : function(t) {
			var n = this, i = {};
			return e.each(t, function(t, e) {
						return RegExp(t, "i").test(a()) ? (i = r(e, n.__AM__.$,
								n), !1) : void 0
					}), i
		}
	};
	t.extractor = t.extractor || {
		extractData : function(t, i) {
			var a = n(t.$html), l = e.extend({}, i), c = {
				openLinkInSameWindow : !1,
				removeStyle : !0,
				cleanImg : !1,
				cleanTable : !1,
				cleanFrame : !1,
				cleanEmbed : !1
			};
			return e.extend(l, s), i._options && e.extend(c, i._options), o(c,
					a), l.__AM__ = {
				config : i,
				options : c,
				$ : a
			}, r(i, a, l)
		}
	}
})(window.AMPlatform, window.AMPlatform.$);
(function(t, e) {
	var n, i = function(t) {
		return e.map(t, function(t, e) {
					return e
				})
	}, r = function(t) {
		return e.map(t, function(t) {
					return t
				})
	}, o = RegExp("(<script[\\s\\S]*?>)", "gi"), a = {
		style : ' media="allmobilize-media"',
		script : ' type="text/allmobilize-script"'
	}, s = RegExp(r(a).join("|"), "g"), l = {
		img : ["src"],
		iframe : ["src"],
		script : ["src", "type"],
		link : ["href"],
		style : ["media"]
	}, c = RegExp("<(" + i(l).join("|") + ")([\\s\\S]*?)>", "gi"), u = {}, p = {};
	e.each(l, function(t, n) {
		e.each(n, function(t, e) {
					p[e] = !0
				}), "img" === t && (n = n.concat("width", "height")), u[t] = RegExp(
				"\\s+((?:" + n.join("|")
						+ ")\\s*=\\s*(?:'([\\s\\S])+?'|\"([\\s\\S])+?\"))",
				"gi")
	}), n = RegExp("\\sx-(" + i(p).join("|") + ")", "gi");
	var d = function(t, e, n) {
		return e = e.toLowerCase(), result = "<" + e + (a[e] || "")
				+ n.replace(u[e], " x-$1") + ">"
	}, f = function(t) {
		return t.nodeName.toLowerCase()
	}, h = function(t) {
		return t.replace('"', "&quot;")
	}, m = function(t) {
		if (!t)
			return "";
		t.length && (t = t[0]);
		var e = [];
		return [].forEach.call(t.attributes, function(t) {
					e.push(" ", t.name, '="', h(t.value), '"')
				}), "<" + f(t) + e.join("") + ">"
	}, g = function(t) {
		var e = t.doctype || [].filter.call(t.childNodes, function(t) {
					return t.nodeType == Node.DOCUMENT_TYPE_NODE
				})[0];
		return e ? "<!DOCTYPE HTML"
				+ (e.publicId ? ' PUBLIC "' + e.publicId + '"' : "")
				+ (e.systemId ? ' "' + e.systemId + '"' : "") + ">" : ""
	}, v = function(t) {
		return t ? [].map.call(t.childNodes, function(t) {
			var e = f(t);
			return "#comment" == e
					? "<!--" + t.textContent + "-->"
					: "plaintext" == e ? t.textContent : "script" == e
							&& (/allmobilize\./.test(t.src) || /AllMobilize/
									.test(t.textContent)) ? "" : t.outerHTML
							|| t.nodeValue
		}).join("") : ""
	}, y = "", b = function(t) {
		if (y)
			return y;
		var t = t || document, e = t.getElementsByTagName("head")[0]
				|| t.createElement("head"), n = t.getElementsByTagName("body")[0]
				|| t.createElement("body"), i = t.getElementsByTagName("html")[0];
		return y = {
			doctype : g(t),
			htmlTag : m(i),
			headTag : m(e),
			bodyTag : m(n),
			headContent : v(e),
			bodyContent : v(n)
		}, y.all = function(t) {
			return this.doctype + this.htmlTag + this.headTag + (t || "")
					+ this.headContent + this.bodyContent
		}, y
	}, w = function(t) {
		var n = t.match(/^<(\w+)([\s\S]*)/i), i = document.createElement(n[1]);
		return e.each(e("<div" + n[2])[0].attributes, function(t, e) {
					i.setAttribute(e.nodeName, e.nodeValue)
				}), i
	}, x = function(t) {
		var n = /<!--(?:[\s\S]*?)-->|(<\/head\s*>|<body[\s\S]*$)/gi;
		t = e.extend({}, t);
		var i = t.bodyContent = t.headContent + t.bodyContent;
		t.headContent = "";
		for (var r; r = n.exec(i); r)
			if (r[1]) {
				if ("/" != r[1][1]) {
					t.headContent = t.head || i.slice(0, r.index), t.bodyContent = r[0];
					var o = /^((?:[^>'"]*|'[^']*?'|"[^"]*?")*>)([\s\S]*)$/
							.exec(r[0]);
					o && (t.bodyTag = o[1], t.bodyContent = o[2]);
					break
				}
				t.headContent = i.slice(0, r.index), t.bodyContent = i
						.slice(r.index + r[1].length)
			}
		return t
	};
	t.html = t.html || {
		disable : function(t) {
			var e = /(<!--[\s\S]*?-->)|(?=<\/script)/i, n = t.split(e), i = n
					.map(function(t) {
						var e;
						return t
								? /^<!--/.test(t)
										? t
										: (e = t.split(o), e[0] = e[0].replace(
												c, d), e[1]
												&& (e[1] = e[1].replace(c, d)), e)
								: ""
					});
			return [].concat.apply([], i).join("")
		},
		enable : function(t) {
			return t.replace(n, " $1").replace(s, "")
		},
		htmlFromElement : function(t) {
			var n = "";
			if (t.length) {
				var i = t.length ? t[0] : t;
				n = i.outerHTML ? i.outerHTML : e("<div>").append(e(i).clone())
						.html(), "string" == typeof n && (n = e.trim(n))
			}
			return n
		},
		buildOriginalDOM : function() {
			var n = x(b()), i = t.html.disable(n.headContent), r = t.html
					.disable(n.bodyContent), o = document.createElement("div"), a = w(n.headTag), s = w(n.bodyTag), l = w(n.htmlTag), c = {
				doctype : n.doctype,
				$head : e(a),
				$body : e(s),
				$html : e(l)
			};
			for (o.innerHTML = i; o.firstChild; a.appendChild(o.firstChild));
			for (o.innerHTML = r; o.firstChild; s.appendChild(o.firstChild));
			return l.appendChild(a), l.appendChild(s), c
		},
		buildOriginalHtml : function(t) {
			var e = b(t);
			return e.all()
		}
	}
})(window.AMPlatform, window.AMPlatform.$);
(function(t, e) {
	var n = function() {
		for (var n in t.__module)
			t.__module.hasOwnProperty(n)
					&& e.registerPartial(n, e.template(t.__module[n]))
	}, i = function(n) {
		var i = n.content && n.content.template, r = t.__tmpl[i];
		return r ? (r = e.template(r), r(n)) : ""
	};
	t.template = t.template || {
		buildHtml : function(t) {
			return n(), i(t)
		}
	}
})(window.AMPlatform, Handlebars);
(function(t) {
	var e = function(t) {
		console && console.log(t)
	};
	t.logger = t.logger || {
		times : [],
		errors : [],
		time : function(t, e) {
			var n = e || +new Date;
			return this.times.push([n, t]), n
		},
		error : function(t, e) {
			var n = e || +new Date;
			this.errors.push([n, t])
		},
		reset : function() {
			this.times = [].concat(t.__timing), this.errors = []
		},
		dump : function() {
			e("--------- Timings (in milliseconds) ----------");
			for (var t = this.times.length ? this.times[0][0] : 0, n = 0, i = this.times.length; i > n; n++) {
				var r = this.times[n];
				e(r[0] - t + "		" + r[1])
			}
			if (this.errors.length) {
				e("--------------- Errors -----------------");
				for (var n = 0, i = this.errors.length; i > n; n++) {
					var r = this.times[n];
					e(r[0])
				}
			}
		}
	}
})(window.AMPlatform);
(function(t, e, n) {
	var i = window, r = document, o = function(t) {
		i.setTimeout(function() {
					r.open("text/html", "replace"), r.write(t), r.close()
				})
	};
	t.main = t.main || {
		mobilize : function(e) {
			t.logger.time("mobilize"), t.data = t.data || {}, config = t.data.config = t.__config;
			var a = t.html.buildOriginalDOM(r), s = t.extractor.extractData(a,
					config);
			if (s.content && s.content.redirect)
				return i.location.href = s.content.redirect, void 0;
			var l = e.lastIndexOf("/"), c = -1 !== l ? e.substr(0, l + 1) : "";
			s.__root = c, s.__stylePath = c + "style.min.css", s.__jsPath = c
					+ "script.min.js";
			var u = t.template.buildHtml(s);
			u = t.html.enable(u), u
					? (o(u), t.logger.time("completed"))
					: n ? (o("<h1>No template found</h1>"), t.logger
							.time("failed")) : (t.main.unmobilize(r), t.logger
							.time("unmobilize")), n && t.logger.dump()
		},
		unmobilize : function(e) {
			var n = t.html.buildOriginalHtml(e);
			o(n)
		}
	}
})(window.AMPlatform, window.AMPlatform.$, window._amVersion.debug);