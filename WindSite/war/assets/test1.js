/* AllMobilize.com/YunShiPei.com 2.2(2013-11-04T16:59:40.723Z #*#) */
!
function(t, e) {
	"object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Spinner = e()
} (this,
function() {
	"use strict";
	function t(t, e) {
		var i, o = document.createElement(t || "div");
		for (i in e) o[i] = e[i];
		return o
	}
	function e(t) {
		for (var e = 1,
		i = arguments.length; i > e; e++) t.appendChild(arguments[e]);
		return t
	}
	function i(t, e, i, o) {
		var n = ["opacity", e, ~~ (100 * t), i, o].join("-"),
		r = .01 + 100 * (i / o),
		s = Math.max(1 - (1 - t) / e * (100 - r), t),
		a = f.substring(0, f.indexOf("Animation")).toLowerCase(),
		l = a && "-" + a + "-" || "";
		return p[n] || (c.insertRule("@" + l + "keyframes " + n + "{" + "0%{opacity:" + s + "}" + r + "%{opacity:" + t + "}" + (r + .01) + "%{opacity:1}" + (r + e) % 100 + "%{opacity:" + t + "}" + "100%{opacity:" + s + "}" + "}", c.cssRules.length), p[n] = 1),
		n
	}
	function o(t, e) {
		var i, o, n = t.style;
		if (void 0 !== n[e]) return e;
		for (e = e.charAt(0).toUpperCase() + e.slice(1), o = 0; o < d.length; o++) if (i = d[o] + e, void 0 !== n[i]) return i
	}
	function n(t, e) {
		for (var i in e) t.style[o(t, i) || i] = e[i];
		return t
	}
	function r(t) {
		for (var e = 1; e < arguments.length; e++) {
			var i = arguments[e];
			for (var o in i) void 0 === t[o] && (t[o] = i[o])
		}
		return t
	}
	function s(t) {
		for (var e = {
			x: t.offsetLeft,
			y: t.offsetTop
		}; t = t.offsetParent;) e.x += t.offsetLeft,
		e.y += t.offsetTop;
		return e
	}
	function a(t) {
		return "undefined" == typeof this ? new a(t) : (this.opts = r(t || {},
		a.defaults, u), void 0)
	}
	function l() {
		function i(e, i) {
			return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', i)
		}
		c.addRule(".spin-vml", "behavior:url(#default#VML)"),
		a.prototype.lines = function(t, o) {
			function r() {
				return n(i("group", {
					coordsize: f + " " + f,
					coordorigin: -l + " " + -l
				}), {
					width: f,
					height: f
				})
			}
			function s(t, s, a) {
				e(p, e(n(r(), {
					rotation: 360 / o.lines * t + "deg",
					left: ~~s
				}), e(n(i("roundrect", {
					arcsize: o.corners
				}), {
					width: l,
					height: o.width,
					left: o.radius,
					top: -o.width >> 1,
					filter: a
				}), i("fill", {
					color: o.color,
					opacity: o.opacity
				}), i("stroke", {
					opacity: 0
				}))))
			}
			var a, l = o.length + o.width,
			f = 2 * l,
			d = 2 * -(o.width + o.length) + "px",
			p = n(r(), {
				position: "absolute",
				top: d,
				left: d
			});
			if (o.shadow) for (a = 1; a <= o.lines; a++) s(a, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
			for (a = 1; a <= o.lines; a++) s(a);
			return e(t, p)
		},
		a.prototype.opacity = function(t, e, i, o) {
			var n = t.firstChild;
			o = o.shadow && o.lines || 0,
			n && e + o < n.childNodes.length && (n = n.childNodes[e + o], n = n && n.firstChild, n = n && n.firstChild, n && (n.opacity = i))
		}
	}
	var f, d = ["webkit", "Moz", "ms", "O"],
	p = {},
	c = function() {
		var i = t("style", {
			type: "text/css"
		});
		return e(document.getElementsByTagName("head")[0], i),
		i.sheet || i.styleSheet
	} (),
	u = {
		lines: 12,
		length: 7,
		width: 5,
		radius: 10,
		rotate: 0,
		corners: 1,
		color: "#000",
		direction: 1,
		speed: 1,
		trail: 100,
		opacity: .25,
		fps: 20,
		zIndex: 2e9,
		className: "spinner",
		top: "auto",
		left: "auto",
		position: "relative"
	};
	a.defaults = {},
	r(a.prototype, {
		spin: function(e) {
			this.stop();
			var i, o, r = this,
			a = r.opts,
			l = r.el = n(t(0, {
				className: a.className
			}), {
				position: a.position,
				width: 0,
				zIndex: a.zIndex
			}),
			d = a.radius + a.length + a.width;
			if (e && (e.insertBefore(l, e.firstChild || null), o = s(e), i = s(l), n(l, {
				left: ("auto" == a.left ? o.x - i.x + (e.offsetWidth >> 1) : parseInt(a.left, 10) + d) + "px",
				top: ("auto" == a.top ? o.y - i.y + (e.offsetHeight >> 1) : parseInt(a.top, 10) + d) + "px"
			})), l.setAttribute("role", "progressbar"), r.lines(l, r.opts), !f) {
				var p, c = 0,
				u = (a.lines - 1) * (1 - a.direction) / 2,
				h = a.fps,
				m = h / a.speed,
				y = (1 - a.opacity) / (m * a.trail / 100),
				g = m / a.lines; !
				function v() {
					c++;
					for (var t = 0; t < a.lines; t++) p = Math.max(1 - (c + (a.lines - t) * g) % m * y, a.opacity),
					r.opacity(l, t * a.direction + u, p, a);
					r.timeout = r.el && setTimeout(v, ~~ (1e3 / h))
				} ()
			}
			return r
		},
		stop: function() {
			var t = this.el;
			return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = void 0),
			this
		},
		lines: function(o, r) {
			function s(e, i) {
				return n(t(), {
					position: "absolute",
					width: r.length + r.width + "px",
					height: r.width + "px",
					background: e,
					boxShadow: i,
					transformOrigin: "left",
					transform: "rotate(" + ~~ (360 / r.lines * l + r.rotate) + "deg) translate(" + r.radius + "px" + ",0)",
					borderRadius: (r.corners * r.width >> 1) + "px"
				})
			}
			for (var a, l = 0,
			d = (r.lines - 1) * (1 - r.direction) / 2; l < r.lines; l++) a = n(t(), {
				position: "absolute",
				top: 1 + ~ (r.width / 2) + "px",
				transform: r.hwaccel ? "translate3d(0,0,0)": "",
				opacity: r.opacity,
				animation: f && i(r.opacity, r.trail, d + l * r.direction, r.lines) + " " + 1 / r.speed + "s linear infinite"
			}),
			r.shadow && e(a, n(s("#000", "0 0 4px #000"), {
				top: "2px"
			})),
			e(o, e(a, s(r.color, "0 0 1px rgba(0,0,0,.1)")));
			return o
		},
		opacity: function(t, e, i) {
			e < t.childNodes.length && (t.childNodes[e].style.opacity = i)
		}
	});
	var h = n(t("group"), {
		behavior: "url(#default#VML)"
	});
	return ! o(h, "transform") && h.adj ? l() : f = o(h, "animation"),
	a
});
window._amVersion = {
	"phone": 1,
	"version": 1391360381582
}; !
function(e, i, t) {
	if (!e.AMPlatform) {
		var o = e.AMPlatform = {
			__state: 0,
			__config: {},
			__module: {},
			__tmpl: {},
			__timing: [[ + new Date, "allmobilize"]]
		},
		n = function(e) {
			return /(bb\d+|meego).+mobile|ucweb|ucbrowser|mqqbrowser|360browser|avantgo|bada\/|blackberry|android|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/.test(e.substr(0, 4)) ? !0 : !1
		},
		a = function(e) {
			return /ipad|tablet/i.test(e) ? !0 : !1
		},
		r = function(e) {
			return e && e.match(/msie [678]\./)
		},
		l = function(i) {
			if (i) {
				var t = new RegExp(i, "i");
				return t.test(e.location.hostname)
			}
			return ! 0
		},
		c = function(i) {
			i = i.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var t = "[\\?&]" + i + "=([^&#]*)",
			o = new RegExp(t),
			n = o.exec(e.location.href);
			return null == n ? "": decodeURIComponent(n[1].replace(/\+/g, " "))
		},
		s = function() {
			return /allmobilize=desktop($|;)/.test(i.cookie)
		},
		d = function() {
			return /allmobilize=mobile($|;)/.test(i.cookie) || /allmobilize=preview($|;)/.test(i.cookie)
		},
		m = function() {
			return "_allmobilize" == e.name || /(dev)?proxy\.yunshipei\.com/.test(e.location.hostname) || /^localhost$/.test(e.location.hostname) || /^127\.0\.0/.test(e.location.hostname)
		},
		p = function(e) {
			return /yunshipei\.com/.test(e) || /allmobilize\.com/.test(e) || /42\.159\.5\.10/.test(e) || /192\.168/.test(e)
		},
		u = function(e) {
			var i = (new Date).getTime();
			return ! e || parseInt(e) >= i
		},
		h = function() {
			var i = e.navigator.userLanguage || e.navigator.language || "en-US";
			return i.split("-")[0]
		},
		g = function(e, i) {
			return i.width = Math.round(i.width * e),
			i.height = Math.round(i.height * e),
			i
		},
		v = function(i) {
			var t = (e.devicePixelRatio || 1, e.orientation || 0),
			i = i || "",
			o = {
				width: e.outerWidth,
				height: e.outerHeight
			};
			if (!i.match(/iphone|ipod|ipad/i)) {
				var n = (i.match(/android (\d)/i) || {})[1];
				return n > 3 ? g(o) : o
			}
			var a = t % 180;
			return a ? (o.height = screen.width, o.width = screen.height) : (o.width = screen.width, o.height = screen.height),
			g(o)
		},
		b = function(e) {
			var i = v(e),
			t = {
				"long": i.width > i.height ? i.width: i.height,
				"short": i.width < i.height ? i.width: i.height
			};
			return t.short <= 800
		},
		w = function() {
			var i = e.location.href,
			t = i.indexOf("_allmobilize"); - 1 != t && (i = i.substr(0, t - 1)),
			e.location = i
		},
		f = function(t) {
			var o = {
				en: "View Mobile Site",
				zh: "回到云适配版"
			},
			n = o[t] || o.en;
			if (/allmobilize=desktop/.test(i.cookie)) {
				var a = i.createElement("div"),
				r = i.createElement("span"),
				l = i.createTextNode(n);
				a.appendChild(r),
				r.appendChild(l),
				a.id = "_allmobilizeGoMo",
				a.style.textAlign = "center",
				a.style.clear = "both",
				a.style.padding = 0,
				a.style.margin = "20px 0",
				a.style.zIndex = "99999",
				r.style.background = "#222",
				r.style.color = "#FFF",
				r.style.margin = 0,
				r.style.padding = "10px 20px",
				r.style.borderRadius = "5px",
				r.style.font = "14px 'Microsoft YaHei',SimSun,Arial,Sans-Serif",
				r.style.cursor = "pointer",
				r.onclick = function() {
					i.cookie = "allmobilize=; path=/;",
					e.location.reload()
				},
				i.body.appendChild(a)
			}
		},
		y = function() {
			void 0 !== e.stop ? e.stop() : void 0 !== i.execCommand && i.execCommand("Stop", !1)
		},
		x = function() {
			var t = !1,
			o = function(o) {
				var n = function() {
					return t ? void 0 : (t = !0, o())
				},
				a = function() {
					if (!t) {
						try {
							i.documentElement.doScroll("left")
						} catch(e) {
							return setTimeout(a, 1),
							void 0
						}
						return n()
					}
				};
				if ("complete" === i.readyState) return n();
				if (i.addEventListener) i.addEventListener("DOMContentLoaded", n, !1),
				e.addEventListener("load", n, !1);
				else if (i.attachEvent) {
					i.attachEvent("onreadystatechange", n),
					e.attachEvent("onload", n);
					var r = !1;
					try {
						r = null == e.frameElement
					} catch(l) {}
					if (i.documentElement.doScroll && r) return a()
				}
			};
			return o
		} (),
		k = !1,
		z = m();
		doc = i,
		ua = (navigator.userAgent || navigator.vendor || e.opera || "").toLowerCase(),
		isOldBrowser = r(ua),
		weixinId = c("sukey"),
		lang = h(),
		thisScript = i.getElementById("allmobilize"),
		scriptSrc = thisScript ? thisScript.src: "";
		var _ = e.onerror;
		if (e.onerror = function(e, i, t) {
			return isOldBrowser ? !0 : _ ? _(e, i, t) : !1
		},
		t.debug) {
			if (c("_allmobilizedev")) return i.cookie = "allmobilize=mobile; path=/;",
			w(),
			void 0;
			if (c("_allmobilizepro")) return i.cookie = "allmobilize=; path=/;",
			w(),
			void 0;
			if (c("_allmobilizeprv")) return i.cookie = "allmobilize=preview; path=/;",
			w(),
			void 0;
			k = d()
		} else k = t.desktop || n(ua) || t.tablet && a(ua) || weixinId || !ua && b();
		if (k = (k || z) && !t.suspend && !isOldBrowser && !s() && l(t.domains), !z && k && (k = k && p(scriptSrc) && u(t.version)), k) {
			o.__enable = !0;
			var S = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" id="allmobilize_viewport" />',
			E = {
				en: "Loading",
				zh: "页面加载中"
			},
			I = E[lang] || E.en,
			M = '<div id="allmobilize_loader" style="position:fixed;top:50%;left:50%;width:120px;height:120px;margin-top:-60px;margin-left:-60px;text-align:center;"><div id="allmobilize_spinner" style="height: 50px;"></div><p style="margin:10px 0;font-size:1em;font-family:\'Microsoft YaHei\',\'微软雅黑\',Helvetica,Arial,sans-serif">' + I + " ...</p></div>" + '<script>var spinner = new Spinner().spin(document.getElementById("allmobilize_spinner")); </script>',
			C = '<plaintext style="display:none">';
			doc.write(S + M + C),
			o.__timing.push([ + new Date, "begin"])
		}
		x(function() {
			if (k) {
				y();
				var e = {
					scriptSrc: scriptSrc,
					weixinId: weixinId
				};
				o.main.mobilize(e)
			} else f(lang)
		})
	}
} (this, document, window._amVersion);
window.AMPlatform.__config = {
	_options: {
		openLinkInSameWindow: !1,
		removeStyle: !0,
		cleanImg: !1,
		cleanTable: !0,
		cleanFrame: !1,
		cleanEmbed: !1
	},
	_helpers: {
		getHost: function() {
			return window.location.host
		},
		getSlide: function(t, e) {
			var i, a = t(e).html(),
			n = [],
			r = /<param name="FlashVars" value="para=.*>/,
			l = t(e).find("a");
			return a && r.test(a) ? (a = a.match(r)[0], a = a.replace('<param name="FlashVars" value="para=', "").replace('">', ""), i = a.split("||"), t.each(i,
			function(e, i) {
				var a = [];
				i.indexOf("|") > -1 ? a = i.split("|") : (a[0] = i, a[1] = "#"),
				n.push({
					_src: t.trim(a[0]),
					_link: t.trim(a[1])
				})
			}), n) : l.length > 0 ? (l.each(function() {
				n.push({
					_src: t(this).find("img").attr("x-src"),
					_link: t(this).attr("href")
				})
			}), n) : null
		},
		getSNav: function(t) {
			var e = t("#sub_nav");
			e.addClass("ln-nav"),
			e.find("img").remove(),
			t("#sub_nav_1").find("img").remove(),
			e.find("li").each(function() {
				var e = t("#sub_nav" + t(this).attr("id"));
				e.addClass("ln-nav-slide"),
				t(this).append(e)
			});
			var i = e.parent("td").html();
			return i && i.replace(/onmouse[=a-zA-Z"$()\.'0-9;"]*/g, ""),
			i
		}
	},
	title: function(t) {
		return t("title").html()
	},
	stat_code: function(t) {
		return t(".footer").html()
	},
	lnPanel: function() {
		var t = '<form action="http://search.lenovo.com.cn/lenovo/searchMain.jsp" id="search" class="panel" target="_blank">';
		return t += ' <div id="ln-s">',
		t += '     <input type="hidden" name="queryLanguage" value="zh"/>',
		t += '     <input type="hidden" name="numHits" value="10"/>',
		t += '     <input type="hidden" name="offset" value="0"/>',
		t += '     <div class="s-txt">',
		t += '         <input type="search" id="ln-s-key" name="query" placeholder="请输入关键字"/>',
		t += "     </div>",
		t += '     <div class="s-go"><input type="submit" value="Search"/></div>',
		t += " </div>",
		t += "</form>",
		t += '<div id="nav-panel" class="panel">',
		t += " <ul>",
		t += '     <li><a href="http://appserver.lenovo.com.cn/Lenovo_product_home.html">浏览联想全线产品</a></li>',
		t += " </ul>",
		t += "</div>"
	},
	content: function($, context) {
		return context.select({
			"^/($|\\?)|^/index.html$": {
				template: "index",
				html: function($, context) {
					var html = {};
					return $.ajax({
						type: "GET",
						async: !1,
						url: "lenovophotoV2/play/show.html",
						success: function(data) {
							var reg = /(var adlink.*)[\s\S]+\]$/m,
							code = data.match(reg)[0];
							eval(code),
							adlink ? ($.each(adlink,
							function(t, e) {
								adlink[t]._src = "lenovophotoV2" + e._src.replace("..", "")
							}), html.slide = adlink) : html.slide = ""
						}
					}),
					html
				}
			},
			"Lenovo_Brand_List|mobile_Brand_List.aspx|Lenovo_product_home.html|/think/($|index.html$)|/think/ThinkOptionsBrand_List": {
				template: "brand",
				html: function(t, e) {
					var i = {},
					a = t("title").text();
					a && (a = t.trim(a), i.title = a.substring(a.lastIndexOf("_") + 1)),
					i.slide = e._helpers.getSlide(t, ".banner"),
					i.brands = [];
					var n = t("#BrandList");
					n.length > 0 && n.find("td").not(":empty").each(function() {
						var e = t(this);
						if (e.find("li").length > 0) {
							var a = e.find(".font14"),
							n = e.find(".text_o"),
							r = n.find("a").attr("href");
							n.remove(),
							a.wrapInner("<a href='" + r + "'></a>"),
							e.find(".pic").insertBefore(a),
							e.find(".sc_size .left").remove(),
							e.find(".size > a").each(function() {
								"" == t.trim(t(this).text()) && t(this).parent().parent(".sc_size").remove()
							}),
							i.brands.push(e.find("li").html())
						}
					});
					var r = t(".pro_jt");
					r.length > 0 && r.each(function(e) {
						var a = t(this).find("td"),
						n = t(this).find(".font14"),
						r = t(this).find(".liblack_li"),
						l = t(this).find(".title"),
						s = "",
						d = r.length;
						d > 1 ? (r.each(function() {
							s += t(this).html()
						}), s = "<div class='ln-pdt-s two-col'>" + s + "</div>") : s = 0 == d && 2 === e ? '<div class="ln-pdt-s"><p ><a href="http://appserver.lenovo.com.cn/Lenovo_Series_List.aspx?CategoryCode=A19B01C11">ThinkPad Tablet 2</a></p></div>': "<div class='ln-pdt-s'>" + r.html() + "</div>",
						n.length > 0 ? a.eq(1).wrapInner("<div class='pic'></div>").find(".pic").insertAfter(n) : a.eq(1).wrapInner("<div class='pic'></div>").find(".pic").appendTo(l),
						i.brands.push("<div class='all-item'>" + l.html() + s + "</div>")
					});
					var l = t("#sidenav_ul02_Directory");
					if (i.thinkNav = [], l.length > 0) {
						var a = t("title").text();
						i.title = a.substr(a.lastIndexOf("_") + 1),
						l.find(".sidenav_ul02_li").each(function() {
							var e, a, n = t(this),
							r = n.find(".sidenav_ul02_menu2 a");
							a = n.find(".sidenav_ul02_menu1").text(),
							e = "<ul class='ln-nav-slide'>",
							r.each(function() {
								e += "<li><a href='" + t(this).attr("href") + "'>" + t(this).text() + "</a></li>"
							}),
							e += "</ul>",
							i.thinkNav.push({
								navtop: a,
								catgory: e
							})
						})
					}
					return i
				}
			},
			"Series_List|Accessory_List": {
				template: "series",
				html: function(t, e) {
					var i = {},
					a = window.location.pathname,
					n = t("title").text();
					return n && (n = t.trim(n), i.title = n.substr(n.lastIndexOf("_") + 1)),
					i.stat = {
						pageName: n.substr(n.indexOf("_") + 1),
						prop2: n.substring(n.indexOf("_") + 1, n.lastIndexOf("_")),
						prop3: n.substr(n.indexOf("_") + 1)
					},
					i.slide = e._helpers.getSlide(t, ".banner"),
					i.menu = e._helpers.getSNav(t),
					(a.indexOf("Mobile_Series") > -1 || a.indexOf("Accessory_List") > -1) && (i.pdtFrame = t("#reinitIframe").attr("x-src") || t("#reinitIframe").attr("src")),
					i
				}
			},
			"Series_Iframe|Accessory_iframe": {
				template: "series-iframe",
				html: function(t) {
					var e = {};
					window.location.pathname;
					var i = t("title").text();
					i && (i = t.trim(i), e.title = i.substr(i.lastIndexOf("_") + 1)),
					e.brands = [];
					var a = t("#ProductList");
					return a.length > 0 && a.find("td").not(":empty").each(function() {
						var i = t(this);
						if (i.find("li").length > 0) {
							var a = i.find(".font14"),
							n = i.find(".text_o"),
							r = n.find("a").attr("href");
							n.remove(),
							a.wrapInner("<a href='" + r + "'></a>"),
							i.find(".pic").insertBefore(a),
							i.find(".sc_size").remove(),
							e.brands.push(i.find("li").html())
						}
					}),
					e.body = t("body").html(),
					e
				}
			},
			ThinkOptionsDirectory: {
				template: "series-thinklist",
				html: function(t, e) {
					var i = {},
					a = (window.location.pathname, t("body"));
					i.slide = e._helpers.getSlide(t, ".banner");
					var n = t("title").text();
					n && (n = t.trim(n), i.title = n.substr(n.lastIndexOf("_") + 1)),
					i.brands = [];
					var r = t("#ProductList"),
					l = "";
					return r.length > 0 && (r.find(".Pro_Series_listul").each(function() {
						var e = t(this);
						e.find(".clear").remove(),
						l += "<li class='tk-iterm'>" + e.parent("td").html() + "</li>"
					}), l = "<ul class='think-list'>" + l + "</ul>", t(l).insertBefore(r), r.remove()),
					a.find("script[x-src], .think_search, .sidenav_div, .banner,.nav2_bigline,.think_xj_fltitle_div,#bottomShow").remove(),
					a.find(".container script").remove(),
					a.find("#form1").siblings("script").remove(),
					t("#Panel2").remove(),
					i.body = t("body").html(),
					i
				}
			},
			Lenovo_Search: {
				template: "series-all",
				html: function(t, e) {
					var i = {};
					i.title = t("#lblMenuName").text(),
					i.slide = e._helpers.getSlide(t, ".banner"),
					i.brands = [];
					var a = t(".productline_3_ul li");
					a.each(function() {
						var e = t(this);
						if ("" != t.trim(e.text())) {
							var a, n = e.find(".button_buy");
							n.length > 0 && (n.find("a").text("在线购买"), a = n.html().replace('onclick="GouMai();"', ""), n.html(a), n.appendTo(e));
							var r = e.find(".intro a");
							if (r.length > 0) {
								var l, s = r.html(),
								d = s.lastIndexOf("(");
								d > -1 && (l = s.substr(0, d) + "<br>" + s.substr(d)),
								r.html(l)
							}
							e.find("[align='center']").remove(),
							i.brands.push(e.html())
						}
					}),
					i.menu = e._helpers.getSNav(t),
					i.range = "<h2>" + t("#side_menu_ctrl").text() + "</h2>";
					var n = t("#range"),
					r = "<ul class='range-type'>";
					return n.find("h2").each(function() {
						r += "<li>" + t(this).html() + "</li>",
						t(this).remove()
					}),
					r += "</ul>",
					t(r).insertBefore(n.find("#bar_1")),
					n.find("div[id]").attr("class", "range-list"),
					i.range += "<div class='range-bd'>" + t("#range").html().replace(/onmouse[=a-zA-Z"$()\.'0-9;"_]*/g, "") + "</div>",
					i
				}
			},
			"Product_Detail.aspx": {
				template: "detail",
				html: function(t) {
					var e, i, a, n = {},
					r = t(".pro_name"),
					l = r.parent("tr").next("tr").next("tr");
					e = t.trim(l.next("tr").text()),
					e = e.replace(/\s/g, "|"),
					i = e.substr(0, e.indexOf("|")),
					a = e.substr(e.lastIndexOf("|") + 1),
					n.basicInfo = {
						name: r.text(),
						id: l.text(),
						priceMedia: i,
						priceMember: a
					},
					t(".button_buy").length > 0 && (n.btnBuy = "true");
					var s = t("#conProductTab_3"),
					d = s.find("iframe"),
					c = d.attr("x-src");
					c && (t.ajaxSettings.async = !1, s.load(c + " #form1",
					function(e, i) {
						if ("success" == i) {
							var a = [],
							n = [];
							s.find(".photo_area .m img").each(function() {
								a.push(t(this).attr("src"))
							}),
							s.find("#m_area img").each(function() {
								n.push(t(this).attr("src"))
							});
							var r = '<div class="pdt-gallery"> <div id="slider" class="flexslider"><ul class="slides">';
							t.each(a,
							function(t, e) {
								r += '<li><img src="' + e + '" /></li>'
							}),
							r += '</ul></div><div id="carousel" class="flexslider"><ul class="slides flex-control-thumbs">',
							t.each(n,
							function(t, e) {
								r += '<li><img src="' + e + '" /></li>'
							}),
							r += "</ul></div></div>",
							s.html(r)
						}
					}), n.gallery = s.html());
					var o = t("#ProductTab ul");
					o.addClass("ln-pdt-tab").find("li").not("#ProductTab_2").remove();
					var h = t("#TabContent");
					h.find("#conProductTab_1, #conProductTab_4, #conProductTab_3").remove();
					var m = h.find("[id^=conProductTab]");
					m.addClass("pdt-tab-bd"),
					m.append(t("<span class='tab-close'><em>&#10005</em>关闭</span>")),
					o.find("li").each(function(e) {
						var i = t(this);
						i.wrapInner("<a href='#'></a>"),
						i.append(m.eq(e)).addClass("pdt-tab-item")
					}),
					n.tab = o.parent().html(),
					n.notes = t(".spe_notes td").html();
					var f = t("title").text();
					f && (f = t.trim(f), n.statTitle = f.substr(f.lastIndexOf("_") + 1));
					var p = l.text();
					return p && (p = t.trim(p), p = p.substring(5), console.log(p), n.statId = p),
					n
				}
			},
			"Product_detail_Gallery.aspx": {
				template: "detail-gallery",
				html: function(t) {
					var e = {};
					return e.slides = [],
					e.tmbs = [],
					t(".photo_area .m img").each(function() {
						e.slides.push(t(this).attr("x-src"))
					}),
					t("#m_area img").each(function() {
						e.tmbs.push(t(this).attr("x-src"))
					}),
					e
				}
			},
			"Mobile_Detail.aspx": {
				template: "detail-m",
				html: function(t) {
					var e = {},
					i = t(".L04_zdy_t_r"),
					a = i.find(".pro_name").text(),
					i = i.find(".L04_zdy_infolist"),
					n = t("#trgdsmst_mediaprice td").html();
					i.find("img").remove(),
					e.basicInfo = [{
						name: a,
						"class": "pdt-name"
					},
					{
						name: i.html(),
						"class": "pdt-desc"
					},
					{
						name: n,
						"class": "media-price"
					}],
					t("#divBuy").length > 0 && (e.btnBuy = t("#ShopUrl").attr("href") || "http://shop.lenovomobile.com/");
					var r = t("#tab_bar ul");
					r.addClass("ln-pdt-tab ajax-tab"),
					r.find("li").each(function() {
						var i, a = t(this),
						n = a.find("a"),
						r = t.trim(n.text()),
						l = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
						"规格详解" == r || "图库" == r ? (a.append("<div class='pdt-tab-bd tabs-container'></div><div class='loading'>Loading</div>").addClass("pdt-tab-item"), t.ajax({
							type: "GET",
							url: n.attr("href"),
							dataType: "html",
							async: !1,
							context: a.find(".tabs-container"),
							success: function(e) {
								t(this).addClass("loaded"),
								e.indexOf("iframe") > -1 ? i = t(e)[0].src: this.html(e)
							},
							error: function() {
								alert("Ajax error!")
							}
						}), "图库" == r && (a.hide(), i && t.ajax({
							type: "GET",
							url: i,
							dataType: "html",
							async: !1,
							context: a.find(".tabs-container"),
							success: function(i) {
								var a = t("<div>").html(i.replace(l, ""));
								e.slides = [],
								e.tmbs = [],
								a.find(".photo_area .m img").each(function() {
									e.slides.push(t(this).attr("src") || t(this).attr("x-src"))
								}),
								a.find("#m_area img").each(function() {
									e.tmbs.push(t(this).attr("src") || t(this).attr("x-src"))
								})
							},
							error: function() {
								alert("Ajax error!")
							}
						}))) : a.remove()
					}),
					e.tab = r.parent().html(),
					e.notes = t(".spe_notes td").html();
					var l = t("title").text();
					return l && (l = t.trim(l), e.statTitle = l.substr(l.lastIndexOf("_") + 1)),
					e.statId = window.location.search.substring(7),
					e
				}
			},
			"^/Public/public_bottom/": {
				template: "general",
				html: function(t) {
					var e, i = {},
					a = t("title").text(),
					n = window.location.pathname;
					if (a && (a = t.trim(a), i.title = a.substring(a.lastIndexOf("_") + 1)), n.indexOf("legal") > -1 && (e = t("center table table").eq(1).find("td").eq(0), e.find("img").remove(), i.body = t("center table table").eq(1).find("td").eq(0).html()), t("[calss^='privacy_left_bg']").addClass("privacy-nav").find("div:nth-child(2n)").remove(), t(".privacy_left_bgs2").addClass("privacy-nav").find("div:nth-child(2n)").remove(), t(".privacy_red").remove(), n.indexOf("privacy") > -1 && (i.bdClass = "privacy", e = t(".privacy_main"), e.find(".line5, .sorrow, .privacy_red").remove(), t(".privacy_left_bg").addClass("privacy-nav").find("div:nth-child(2n)").remove(), i.body = e.html()), n.indexOf("public_bottom/details.shtml") > -1) {
						i.bdClass = "privacy-d",
						e = t("center>table>tbody>tr>td"),
						e.find("img").remove();
						var r = t("center>table>tbody>tr>td:nth-child(3)>table>tbody>tr");
						$detail = r.eq(2).children("td"),
						$detail.find('a[href="#页首"]').parent("td").parent("tr").remove(),
						t(".lawline").next("p").remove(),
						i.body = t(".privacy_left").html() + r.eq(0).find(".text").get(0).outerHTML + r.eq(2).children("td").html().replace(/<p>&nbsp;<\/p>/g, "").replace(/<p class=text>&nbsp;<\/p>/g, "")
					}
					var l = "";
					if (n.indexOf("public_bottom/cookies.shtml") > -1) {
						i.bdClass = "privacy-c",
						t(".privacy_left_bgs3").addClass("privacy-nav");
						var s = t(".lawbg table table table");
						l += "<h3>" + s.eq(0).find("td").eq(1).text() + "、" + s.eq(0).find("td").eq(3).text() + "</h3>",
						l += "<div>" + s.eq(1).find("td.text").text() + "</div>",
						l += "<h3>" + s.eq(2).text() + "</h3>",
						l += "<div>" + s.eq(3).text() + "</div>",
						l += "<h3>" + s.eq(4).text() + "</h3>",
						l += "<div>" + s.eq(5).text() + "</div>",
						i.body = t(".privacy_left").html() + l
					}
					if (n.indexOf("contact.shtml") > -1) {
						var d = t(".table_line>tbody>tr"),
						c = "",
						o = [];
						d.each(function() {
							var e = t(this),
							i = e.find(".title"),
							a = e.find(".td04"),
							n = e.find("td");
							n.length > 0 && (i.length > 0 ? c += "<h3 class='c-title'>" + i.text() + "</h3>": a.length > 0 ? (o = [], n.slice(1).each(function() {
								o.push(t(this).text())
							})) : (c += "<div class='c-item'>", n.slice(1).each(function(e) {
								0 === e ? c += "<h4 class='c-t-hd'>" + t(this).html() + "</h4>": (c += "<div class='c-detail'><dl><dt>" + o[e] + "</dt>", c += "<dd>" + t(this).html().replace(/：/g, ":") + "</dd></dl></div>")
							}), c += "</div>"))
						}),
						i.body = c,
						i.bdClass = "contact"
					}
					return i
				}
			},
			"surveyID=37": {
				template: "survey",
				html: function(t) {
					var e = {};
					e.title = t("title").text(),
					e.script = t("head").find('link[rel="stylesheet"]').next("script")[0].text;
					var i = t("#form1");
					return i.addClass("survey"),
					i.find("table").removeAttr("bgcolor"),
					i.find(".title").parent().parent().remove(),
					i.find(".content").prev("td").width("0"),
					i.find(".content").wrapInner("<label class='answer'></label>"),
					e.body = i[0].outerHTML,
					e
				}
			}
		})
	}
};
window.AMPlatform.__module.switch_mode = function(n, l, o, r, a) {
	function s(n, l) {
		var r, a, s, d = "";
		return d += '\r\n  <div class="ysp-switcher md-switch',
		a = o["if"].call(n, (r = n.switchMode, null == r || r === !1 ? r: r.theme), {
			hash: {},
			inverse: T.noop,
			fn: T.program(2, t, l),
			data: l
		}),
		(a || 0 === a) && (d += a),
		d += '">\r\n    <span class="current md-sm-ysp"\r\n          data-target="#md-switch-modal',
		a = o["if"].call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.id), {
			hash: {},
			inverse: T.noop,
			fn: T.program(4, e, l),
			data: l
		}),
		(a || 0 === a) && (d += a),
		d += '"',
		a = o["if"].call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.modal), {
			hash: {},
			inverse: T.noop,
			fn: T.program(6, i, l),
			data: l
		}),
		(a || 0 === a) && (d += a),
		d += ">\r\n      ",
		a = o.unless.call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.content, null == r || r === !1 ? r: r.switchName), {
			hash: {},
			inverse: T.program(13, u, l),
			fn: T.program(8, c, l),
			data: l
		}),
		(a || 0 === a) && (d += a),
		d += '\r\n    </span>\r\n    <span class="divider"> | </span>\r\n    <a id="godesktop" class="md-sm-desktop" href="#" data-role="none" onclick="AMPlatform.util.goDesktop();">\r\n      ',
		s = {
			hash: {},
			inverse: T.program(17, f, l),
			fn: T.program(15, h, l),
			data: l
		},
		r = o.ifCond || n.ifCond,
		a = r ? r.call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.lang), "==", "en", s) : j.call(n, "ifCond", (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.lang), "==", "en", s),
		(a || 0 === a) && (d += a),
		d += '\r\n    </a>\r\n  </div>\r\n  <div id="md-switch-modal',
		a = o["if"].call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.id), {
			hash: {},
			inverse: T.noop,
			fn: T.program(4, e, l),
			data: l
		}),
		(a || 0 === a) && (d += a),
		d += '"\r\n       class="modal md-switch-modal',
		a = o["if"].call(n, (r = n.switchMode, null == r || r === !1 ? r: r.theme), {
			hash: {},
			inverse: T.noop,
			fn: T.program(19, m, l),
			data: l
		}),
		(a || 0 === a) && (d += a),
		d += '">\r\n    <div class="md-sm-m-wrap">\r\n      <div class="md-sm-m-hd">\r\n        <a href="javascript:void(0)" data-dismiss="modal" class="md-sm-m-close">Close</a>\r\n      </div>\r\n      <div class="md-sm-m-bd">\r\n        ',
		s = {
			hash: {},
			inverse: T.program(34, b, l),
			fn: T.program(21, g, l),
			data: l
		},
		r = o.ifCond || n.ifCond,
		a = r ? r.call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.siteType), "==", "ec", s) : j.call(n, "ifCond", (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.siteType), "==", "ec", s),
		(a || 0 === a) && (d += a),
		d += "\r\n      </div>\r\n    </div>\r\n  </div>\r\n"
	}
	function t(n) {
		var l, o = "";
		return o += " md-sm-t-" + P((l = n.switchMode, l = null == l || l === !1 ? l: l.theme, typeof l === N ? l.apply(n) : l))
	}
	function e(n) {
		var l, o = "";
		return o += "-" + P((l = n.switchMode, l = null == l || l === !1 ? l: l.options, l = null == l || l === !1 ? l: l.id, typeof l === N ? l.apply(n) : l))
	}
	function i() {
		return '\r\n          data-toggle="modal"'
	}
	function c(n, l) {
		var r, a, s, t = "";
		return t += "\r\n        ",
		s = {
			hash: {},
			inverse: T.program(11, p, l),
			fn: T.program(9, d, l),
			data: l
		},
		r = o.ifCond || n.ifCond,
		a = r ? r.call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.lang), "==", "en", s) : j.call(n, "ifCond", (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.lang), "==", "en", s),
		(a || 0 === a) && (t += a),
		t += "\r\n        "
	}
	function d() {
		return "\r\n          Mobilized\r\n        "
	}
	function p() {
		return "\r\n          云适配版\r\n        "
	}
	function u(n) {
		var l, o = "";
		return o += "\r\n          " + P((l = n.switchMode, l = null == l || l === !1 ? l: l.content, l = null == l || l === !1 ? l: l.switchName, typeof l === N ? l.apply(n) : l)) + "\r\n      "
	}
	function h() {
		return "\r\n        Desktop\r\n      "
	}
	function f() {
		return "\r\n        电脑版\r\n      "
	}
	function m(n) {
		var l, o = "";
		return o += " md-sm-mt-" + P((l = n.switchMode, l = null == l || l === !1 ? l: l.theme, typeof l === N ? l.apply(n) : l))
	}
	function g(n, l) {
		var r, a, s, t = "";
		return t += "\r\n          ",
		s = {
			hash: {},
			inverse: T.program(24, w, l),
			fn: T.program(22, v, l),
			data: l
		},
		r = o.ifCond || n.ifCond,
		a = r ? r.call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.lang), "==", "en", s) : j.call(n, "ifCond", (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.lang), "==", "en", s),
		(a || 0 === a) && (t += a),
		a = o["if"].call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.content, null == r || r === !1 ? r: r.owner), {
			hash: {},
			inverse: T.noop,
			fn: T.program(26, M, l),
			data: l
		}),
		(a || 0 === a) && (t += a),
		a = o["if"].call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.content, null == r || r === !1 ? r: r.org), {
			hash: {},
			inverse: T.noop,
			fn: T.program(28, y, l),
			data: l
		}),
		(a || 0 === a) && (t += a),
		t += '<span\r\n            class="md-sm-slogan">',
		a = o["if"].call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.content, null == r || r === !1 ? r: r.slogan), {
			hash: {},
			inverse: T.program(32, k, l),
			fn: T.program(30, C, l),
			data: l
		}),
		(a || 0 === a) && (t += a),
		t += "</span>\r\n        "
	}
	function v() {
		return "You are visiting "
	}
	function w() {
		return "\r\n            您正在浏览的是"
	}
	function M(n) {
		var l, o = "";
		return o += '<span\r\n            class="md-sm-owner">' + P((l = n.switchMode, l = null == l || l === !1 ? l: l.content, l = null == l || l === !1 ? l: l.owner, typeof l === N ? l.apply(n) : l)) + "</span>"
	}
	function y(n) {
		var l, o = "";
		return o += '<span\r\n            class="md-sm-org">' + P((l = n.switchMode, l = null == l || l === !1 ? l: l.content, l = null == l || l === !1 ? l: l.org, typeof l === N ? l.apply(n) : l)) + "</span>"
	}
	function C(n) {
		var l, o;
		return l = n.switchMode,
		l = null == l || l === !1 ? l: l.content,
		l = null == l || l === !1 ? l: l.slogan,
		o = typeof l === N ? l.apply(n) : l,
		o || 0 === o ? o: ""
	}
	function k() {
		return "为您当前手机定做的移动网站。轻动手指尖，移动随心购！"
	}
	function b(n, l) {
		var r, a, s, t = "";
		return t += "\r\n          ",
		s = {
			hash: {},
			inverse: T.program(24, w, l),
			fn: T.program(22, v, l),
			data: l
		},
		r = o.ifCond || n.ifCond,
		a = r ? r.call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.lang), "==", "en", s) : j.call(n, "ifCond", (r = n.switchMode, r = null == r || r === !1 ? r: r.options, null == r || r === !1 ? r: r.lang), "==", "en", s),
		(a || 0 === a) && (t += a),
		a = o["if"].call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.content, null == r || r === !1 ? r: r.owner), {
			hash: {},
			inverse: T.noop,
			fn: T.program(26, M, l),
			data: l
		}),
		(a || 0 === a) && (t += a),
		a = o["if"].call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.content, null == r || r === !1 ? r: r.org), {
			hash: {},
			inverse: T.noop,
			fn: T.program(28, y, l),
			data: l
		}),
		(a || 0 === a) && (t += a),
		t += '<span\r\n            class="md-sm-slogan">',
		a = o["if"].call(n, (r = n.switchMode, r = null == r || r === !1 ? r: r.content, null == r || r === !1 ? r: r.slogan), {
			hash: {},
			inverse: T.program(35, _, l),
			fn: T.program(30, C, l),
			data: l
		}),
		(a || 0 === a) && (t += a),
		t += "</span>\r\n        "
	}
	function _() {
		return "为您当前手机定做的移动网站。"
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	o = this.merge(o, n.helpers),
	a = a || {};
	var A, D, N = "function",
	P = this.escapeExpression,
	T = this,
	j = o.helperMissing,
	x = o.blockHelperMissing;
	return A = typeof l === N ? l.apply(l) : l,
	D = x.call(l, A, {
		hash: {},
		inverse: T.noop,
		fn: T.program(1, s, a),
		data: a
	}),
	D || 0 === D ? D: ""
};
window.AMPlatform.__module.allmobilize_track = function(t, e, n, r, a) {
	return this.compilerInfo = [4, ">= 1.0.0"],
	n = this.merge(n, t.helpers),
	a = a || {},
	'<script type="text/javascript">\n   var _paq = _paq || [];\n  _paq.push(["trackPageView"]);\n  _paq.push(["enableLinkTracking"]);\n(function() {\n    var u=(("https:" == document.location.protocol) ? "https" : "http") + "://s.yunshipei.com/";\n    _paq.push(["setTrackerUrl","http://n.yunshipei.com/deliver"]);\n    _paq.push(["setSiteId", "41"]);\n   var d=document,\n       g=d.createElement("script"),\n       s=d.getElementsByTagName("script")[0];\n       g.type="text/javascript";\n       g.defer=true;\n       g.async=true;\n       g.src=u+"javascript/aa.min.js";\n       s.parentNode.insertBefore(g,s);\n})();\n</script>'
};
window.AMPlatform.__tmpl.index = function(n, e, t, a, i) {
	function l(n, e) {
		var a, i, l = "";
		return l += '\n            <div class="flexslider ln-banner">\n                <ul class="slides">\n                    ',
		i = t.each.call(n, (a = n.content, a = null == a || a === !1 ? a: a.html, null == a || a === !1 ? a: a.slide), {
			hash: {},
			inverse: d.noop,
			fn: d.program(2, s, e),
			data: e
		}),
		(i || 0 === i) && (l += i),
		l += "\n                </ul>\n            </div>\n        "
	}
	function s(n, e) {
		var a, i = "";
		return i += '\n                        <li><a href="',
		(a = t._link) ? a = a.call(n, {
			hash: {},
			data: e
		}) : (a = n._link, a = typeof a === p ? a.apply(n) : a),
		i += h(a) + '"><img src="',
		(a = t._src) ? a = a.call(n, {
			hash: {},
			data: e
		}) : (a = n._src, a = typeof a === p ? a.apply(n) : a),
		i += h(a) + '" alt=""/></a></li>\n                    '
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	t = this.merge(t, n.helpers),
	a = this.merge(a, n.partials),
	i = i || {};
	var r, c, o = "",
	p = "function",
	h = this.escapeExpression,
	d = this;
	return o += '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="utf-8">\n  <link rel="dns-prefetch" href="//s.yunshipei.com">\n  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(r = t.title) ? r = r.call(e, {
		hash: {},
		data: i
	}) : (r = e.title, r = typeof r === p ? r.apply(e) : r),
	o += h(r) + '</title>\n  <link rel="stylesheet" href="',
	(r = t.__stylePath) ? r = r.call(e, {
		hash: {},
		data: i
	}) : (r = e.__stylePath, r = typeof r === p ? r.apply(e) : r),
	o += h(r) + '" />\n  <script type="text/javascript">\n    var bgIcon = new Image();\n    bgIcon.src = "',
	(r = t.__root) ? r = r.call(e, {
		hash: {},
		data: i
	}) : (r = e.__root, r = typeof r === p ? r.apply(e) : r),
	o += h(r) + 'ln-bar-icon.png";\n  </script>\n</head>\n<body class="ln ln-home">\n	<div class="page">\n		<div class="hd header i-hd">\n            <h1><a href="http://www.lenovo.com.cn/" class="ir">Lenovo联想</a></h1>\n            <ul class="icon">\n                <li><a href="#search" class="icon-s link-panel ir">搜索</a></li>\n                <li><a href="tel:4008222008" class="icon-tel ir">电话</a></li>\n                <li><a href="http://e.weibo.com/lenovo" target="_blank" class="icon-wb ir">微博</a></li>\n                <li><a href="#nav-panel" class="icon-grid link-panel ir">导航</a></li>\n            </ul>\n		</div>\n\n        ',
	(r = t.lnPanel) ? r = r.call(e, {
		hash: {},
		data: i
	}) : (r = e.lnPanel, r = typeof r === p ? r.apply(e) : r),
	(r || 0 === r) && (o += r),
	o += "\n\n        ",
	c = t["if"].call(e, (r = e.content, r = null == r || r === !1 ? r: r.html, null == r || r === !1 ? r: r.slide), {
		hash: {},
		inverse: d.noop,
		fn: d.program(1, l, i),
		data: i
	}),
	(c || 0 === c) && (o += c),
	o += '\n\n        <div class="content">\n            <div class="ln-home-nav" id="menu-wrap">\n                <script type="text/javascript" src="/LenovoHeaderMenu.js" id="menu-script"></script>\n            </div>\n		</div>\n    <div class="ft">\n        <ul class="ft-links">\n            <li><a href="http://appserver.lenovo.com.cn/lenovoSurvey/doSurvey.aspx?surveyID=37">满意度调查</a></li>\n            <li><a href="http://www.lenovo.com.cn/Public/public_bottom/contact.shtml">联系我们</a></li>\n            <!--<li><a href="http://appserver.lenovo.com.cn/About/" target="_blank">关于联想</a></li>-->\n        </ul>\n        <div class="ft-top"><a href="#top">回到顶部</a></div>\n      ',
	c = d.invokePartial(a.switch_mode, "switch_mode", e, t, a, i),
	(c || 0 === c) && (o += c),
	o += '\n        <div class="ft-cr">\n            版权所有：1998－2013 联想集团 | <a href="http://www.lenovo.com.cn/Public/public_bottom/legal.shtml" target="_blank">法律公告</a> | <a href="http://www.lenovo.com.cn/Public/public_bottom/privacy.shtml" target="_blank">隐私保护</a><br><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11035381号</a>&nbsp; &nbsp;京公网安备110108007970号\n\n        </div>\n    </div>\n\n	</div>\n    <script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n    <script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n    <script type="text/javascript" src="',
	(c = t.__root) ? c = c.call(e, {
		hash: {},
		data: i
	}) : (c = e.__root, c = typeof c === p ? c.apply(e) : c),
	o += h(c) + 'script.min.js"></script>\n    <script type="text/javascript">\n      (function ($) {\n        if (window.jQuery) {\n          $(document).ready(function () {\n            $("#L_mu_nav").eq(1).remove();\n            $("#SearchMenuCon").eq(1).remove();\n            $(".L_mu_iframe").remove();\n          });\n        }\n\n        $(window).load(function () {\n          $(".L_mu_menu_line, .L_mu_menu_line_x").remove();\n          var $hap = $("#L_mu_person #L_mu_m1");\n          $hap.find(".L_mu_range").insertAfter($hap.find(".L_mu_notebook"));\n          $hap.find(".L_mu_attachment").insertAfter($hap.find(".L_mu_range"));\n          $hap.find(".L_mu_dgfamily").insertBefore($hap.find(".L_mu_dgdesktop"));\n\n          $(".L_mu_subnav li").each(function () {\n            var $t = $(this);\n            $t.removeAttr("style");\n            var $menuLink = $t.children("a"),\n                $menuDesc = $t.children("span");\n            if ($menuLink.length == 1 && $menuDesc.length == 1) {\n              $menuLink.append($menuDesc);\n            }\n          });\n        });\n\n        window.onload = function () {\n          var lnMenu = document.getElementById("L_mu_nav"),\n              ua = navigator.userAgent;\n          if (ua.indexOf("IEMobile/9") > -1) {\n            if (!lnMenu) {\n              window.location.reload();\n            }\n          }\n        }\n      })(window.jQuery);\n    </script>\n    <div class="stat-code">\n        <script type="text/javascript" src="',
	(c = t.__root) ? c = c.call(e, {
		hash: {},
		data: i
	}) : (c = e.__root, c = typeof c === p ? c.apply(e) : c),
	o += h(c) + 's_code.js"></script>\n        <script type="text/javascript">\n            s.pageName="M:联想中国首页";\n            s.channel="M:联想中国首页";\n            s.prop1="M:联想中国首页";\n            s.prop2="M:联想中国首页";\n            s.prop3="M:联想中国首页";\n            /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/\n            var s_code=s.t();if(s_code)document.write(s_code)//-->\n        </script>\n        <script type="text/javascript"><!--\n        if(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')\n        //--></script><noscript><img src="http://lenovochina.122.2o7.net/b/ss/lenovochina-prd/1/H.26--NS/0"\n                                     height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->\n        <!-- End SiteCatalyst code version: H.26. -->\n    </div>\n',
	c = d.invokePartial(a.allmobilize_track, "allmobilize_track", e, t, a, i),
	(c || 0 === c) && (o += c),
	o += "</body>\n</html>"
};
window.AMPlatform.__tmpl.general = function(t, n, a, e, l) {
	function i(t) {
		var n, a, e = "";
		return e += '\n      <h2 class="ln-s-title">\n        ',
		n = t.content,
		n = null == n || n === !1 ? n: n.html,
		n = null == n || n === !1 ? n: n.title,
		a = typeof n === p ? n.apply(t) : n,
		(a || 0 === a) && (e += a),
		e += "\n      </h2>\n    "
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	a = this.merge(a, t.helpers),
	e = this.merge(e, t.partials),
	l = l || {};
	var s, c, r = "",
	p = "function",
	o = this.escapeExpression,
	h = this;
	return r += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(s = a.title) ? s = s.call(n, {
		hash: {},
		data: l
	}) : (s = n.title, s = typeof s === p ? s.apply(n) : s),
	r += o(s) + '</title>\n  <link rel="stylesheet" href="',
	(s = a.__stylePath) ? s = s.call(n, {
		hash: {},
		data: l
	}) : (s = n.__stylePath, s = typeof s === p ? s.apply(n) : s),
	r += o(s) + '" />\n</head>\n<body class="ln">\n<div class="page ' + o((s = n.content, s = null == s || s === !1 ? s: s.html, s = null == s || s === !1 ? s: s.bdClass, typeof s === p ? s.apply(n) : s)) + '" id="top">\n  <div class="hd header i-hd">\n    <h1><a href="http://www.lenovo.com.cn/" class="ir">Lenovo联想</a></h1>\n    <ul class="icon">\n      <li><a href="#search" class="icon-s link-panel ir">搜索</a></li>\n      <li><a href="tel:4008222008" class="icon-tel ir">电话</a></li>\n      <li><a href="http://e.weibo.com/lenovo" target="_blank" class="icon-wb ir">微博</a></li>\n      <li><a href="#nav-panel" class="icon-grid link-panel ir">导航</a></li>\n    </ul>\n  </div>\n\n  ',
	(c = a.lnPanel) ? c = c.call(n, {
		hash: {},
		data: l
	}) : (c = n.lnPanel, c = typeof c === p ? c.apply(n) : c),
	(c || 0 === c) && (r += c),
	r += '\n\n  <div class="content">\n    ',
	c = a["if"].call(n, (s = n.content, s = null == s || s === !1 ? s: s.html, null == s || s === !1 ? s: s.title), {
		hash: {},
		inverse: h.noop,
		fn: h.program(1, i, l),
		data: l
	}),
	(c || 0 === c) && (r += c),
	r += '\n\n    <div class="entry">\n      ',
	s = n.content,
	s = null == s || s === !1 ? s: s.html,
	s = null == s || s === !1 ? s: s.body,
	c = typeof s === p ? s.apply(n) : s,
	(c || 0 === c) && (r += c),
	r += '\n    </div>\n\n  </div>\n\n  <div class="ft">\n    <div class="ft-top"><a href="#top">回到顶部</a></div>\n    ',
	c = h.invokePartial(e.switch_mode, "switch_mode", n, a, e, l),
	(c || 0 === c) && (r += c),
	r += '\n    <div class="ft-cr">\n      版权所有：1998－2013 联想集团&nbsp; &nbsp;| <a href="http://www.lenovo.com.cn/Public/public_bottom/legal.shtml" target="_blank">法律公告</a> | <a href="http://www.lenovo.com.cn/Public/public_bottom/privacy.shtml" target="_blank">隐私保护</a><br><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11035381号</a>&nbsp; &nbsp;京公网安备110108007970号\n\n    </div>\n  </div>\n</div>\n<script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n<script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n<script type="text/javascript" src="',
	(c = a.__root) ? c = c.call(n, {
		hash: {},
		data: l
	}) : (c = n.__root, c = typeof c === p ? c.apply(n) : c),
	r += o(c) + 'script.min.js"></script>\n  <script type="text/javascript">\n    (function($){\n      $(function() {\n        var tdata = "";\n        $(".privacy-d .entry > table").hide();\n         $(".privacy-d .entry > table > tbody >tr").each(function() {\n             tdata += $(this).children("td").html();\n         });\n        $(".entry").append($(tdata));\n      });\n    })(window.jQuery)\n  </script>\n<div class="stat-code">\n  <script type="text/javascript" src="',
	(c = a.__root) ? c = c.call(n, {
		hash: {},
		data: l
	}) : (c = n.__root, c = typeof c === p ? c.apply(n) : c),
	r += o(c) + 's_code.js"></script>\n  <script type="text/javascript">\n    s.pageName="M:附加信息:' + o((s = n.content, s = null == s || s === !1 ? s: s.html, s = null == s || s === !1 ? s: s.statTitle, typeof s === p ? s.apply(n) : s)) + '";\n    s.channel="M:附加信息";\n    s.prop1="M:附加信息";\n    s.prop2="M:附加信息";\n    s.prop3="M:附加信息";\n    /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/\n    var s_code=s.t();if(s_code)document.write(s_code)//--></script>\n  <script type="text/javascript"><!--\n  if(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')\n  //--></script><noscript><img src="http://lenovochina.122.2o7.net/b/ss/lenovochina-prd/1/H.26--NS/0"\n                               height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->\n  <!-- End SiteCatalyst code version: H.26. -->\n</div>\n',
	c = h.invokePartial(e.allmobilize_track, "allmobilize_track", n, a, e, l),
	(c || 0 === c) && (r += c),
	r += "</body>\n</html>"
};
window.AMPlatform.__tmpl.brand = function(n, t, a, l, e) {
	function i(n, t) {
		var l, e, i = "";
		return i += '\n            <div class="flexslider ln-banner">\n                <ul class="slides">\n                    ',
		e = a.each.call(n, (l = n.content, l = null == l || l === !1 ? l: l.html, null == l || l === !1 ? l: l.slide), {
			hash: {},
			inverse: y.noop,
			fn: y.program(2, s, t),
			data: t
		}),
		(e || 0 === e) && (i += e),
		i += "\n                </ul>\n            </div>\n        "
	}
	function s(n, t) {
		var l, e = "";
		return e += '\n                        <li><a href="',
		(l = a._link) ? l = l.call(n, {
			hash: {},
			data: t
		}) : (l = n._link, l = typeof l === m ? l.apply(n) : l),
		e += f(l) + '"><img src="',
		(l = a._src) ? l = l.call(n, {
			hash: {},
			data: t
		}) : (l = n._src, l = typeof l === m ? l.apply(n) : l),
		e += f(l) + '" alt=""/></a></li>\n                    '
	}
	function r(n) {
		var t, a, l = "";
		return l += '\n                <h2 class="ln-s-title">\n                    ',
		t = n.content,
		t = null == t || t === !1 ? t: t.html,
		t = null == t || t === !1 ? t: t.title,
		a = typeof t === m ? t.apply(n) : t,
		(a || 0 === a) && (l += a),
		l += "\n                </h2>\n            "
	}
	function c(n, t) {
		var l, e, i = "";
		return i += '\n                <ul class="brand-list">\n                    ',
		e = a.each.call(n, (l = n.content, l = null == l || l === !1 ? l: l.html, null == l || l === !1 ? l: l.brands), {
			hash: {},
			inverse: y.noop,
			fn: y.program(7, o, t),
			data: t
		}),
		(e || 0 === e) && (i += e),
		i += "\n                </ul>\n            "
	}
	function o(n) {
		var t, a = "";
		return a += "\n                        <li>",
		t = typeof n === m ? n.apply(n) : n,
		(t || 0 === t) && (a += t),
		a += "</li>\n                    "
	}
	function p(n, t) {
		var l, e, i = "";
		return i += '\n                <ul class="ln-nav">\n                    ',
		e = a.each.call(n, (l = n.content, l = null == l || l === !1 ? l: l.html, null == l || l === !1 ? l: l.thinkNav), {
			hash: {},
			inverse: y.noop,
			fn: y.program(10, h, t),
			data: t
		}),
		(e || 0 === e) && (i += e),
		i += "\n                </ul>\n            "
	}
	function h(n, t) {
		var l, e = "";
		return e += '\n                        <li>\n                            <a href="javascript:void">',
		(l = a.navtop) ? l = l.call(n, {
			hash: {},
			data: t
		}) : (l = n.navtop, l = typeof l === m ? l.apply(n) : l),
		e += f(l) + "</a>\n                            ",
		(l = a.catgory) ? l = l.call(n, {
			hash: {},
			data: t
		}) : (l = n.catgory, l = typeof l === m ? l.apply(n) : l),
		(l || 0 === l) && (e += l),
		e += "\n                        </li>\n                    "
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	a = this.merge(a, n.helpers),
	l = this.merge(l, n.partials),
	e = e || {};
	var d, u, v = "",
	m = "function",
	f = this.escapeExpression,
	y = this;
	return v += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(d = a.title) ? d = d.call(t, {
		hash: {},
		data: e
	}) : (d = t.title, d = typeof d === m ? d.apply(t) : d),
	v += f(d) + '</title>\n  <link rel="stylesheet" href="',
	(d = a.__stylePath) ? d = d.call(t, {
		hash: {},
		data: e
	}) : (d = t.__stylePath, d = typeof d === m ? d.apply(t) : d),
	v += f(d) + '" />\n</head>\n<body class="ln">\n	<div class="page">\n		<div class="hd header i-hd">\n            <h1><a href="http://www.lenovo.com.cn/" class="ir">Lenovo联想</a></h1>\n            <ul class="icon">\n                <li><a href="#search" class="icon-s link-panel ir" >搜索</a></li>\n                <li><a href="tel:4008222008" class="icon-tel ir">电话</a></li>\n                <li><a href="http://e.weibo.com/lenovo" target="_blank" class="icon-wb ir">微博</a></li>\n                <li><a href="#nav-panel" class="icon-grid link-panel ir">导航</a></li>\n            </ul>\n		</div>\n\n        ',
	(d = a.lnPanel) ? d = d.call(t, {
		hash: {},
		data: e
	}) : (d = t.lnPanel, d = typeof d === m ? d.apply(t) : d),
	(d || 0 === d) && (v += d),
	v += "\n\n        ",
	u = a["if"].call(t, (d = t.content, d = null == d || d === !1 ? d: d.html, null == d || d === !1 ? d: d.slide), {
		hash: {},
		inverse: y.noop,
		fn: y.program(1, i, e),
		data: e
	}),
	(u || 0 === u) && (v += u),
	v += '\n\n        <div class="content">\n            ',
	u = a["if"].call(t, (d = t.content, d = null == d || d === !1 ? d: d.html, null == d || d === !1 ? d: d.title), {
		hash: {},
		inverse: y.noop,
		fn: y.program(4, r, e),
		data: e
	}),
	(u || 0 === u) && (v += u),
	v += "\n\n            ",
	u = a["if"].call(t, (d = t.content, d = null == d || d === !1 ? d: d.html, null == d || d === !1 ? d: d.brands), {
		hash: {},
		inverse: y.noop,
		fn: y.program(6, c, e),
		data: e
	}),
	(u || 0 === u) && (v += u),
	v += "\n\n            ",
	u = a["if"].call(t, (d = t.content, d = null == d || d === !1 ? d: d.html, null == d || d === !1 ? d: d.thinkNav), {
		hash: {},
		inverse: y.noop,
		fn: y.program(9, p, e),
		data: e
	}),
	(u || 0 === u) && (v += u),
	v += '\n\n\n		</div>\n\n    <div class="ft">\n        <div class="ft-top"><a href="#top">回到顶部</a></div>\n      ',
	u = y.invokePartial(l.switch_mode, "switch_mode", t, a, l, e),
	(u || 0 === u) && (v += u),
	v += '\n        <div class="ft-cr">\n            版权所有：1998－2013 联想集团&nbsp; &nbsp;| <a href="http://www.lenovo.com.cn/Public/public_bottom/legal.shtml" target="_blank">法律公告</a> | <a href="http://www.lenovo.com.cn/Public/public_bottom/privacy.shtml" target="_blank">隐私保护</a><br><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11035381号</a>&nbsp; &nbsp;京公网安备110108007970号\n\n        </div>\n    </div>\n\n	</div>\n    <script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n    <script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n    <script type="text/javascript" src="',
	(u = a.__root) ? u = u.call(t, {
		hash: {},
		data: e
	}) : (u = t.__root, u = typeof u === m ? u.apply(t) : u),
	v += f(u) + 'script.min.js"></script>\n    <div class="stat-code">\n        <script type="text/javascript" src="',
	(u = a.__root) ? u = u.call(t, {
		hash: {},
		data: e
	}) : (u = t.__root, u = typeof u === m ? u.apply(t) : u),
	v += f(u) + 's_code.js"></script>\n        <script type="text/javascript">\n            s.pageName="M:品牌页:' + f((d = t.content, d = null == d || d === !1 ? d: d.html, d = null == d || d === !1 ? d: d.title, typeof d === m ? d.apply(t) : d)) + '";\n            s.channel="M:品牌页";\n            s.prop1="M:品牌页";\n            s.prop2="M:品牌页:' + f((d = t.content, d = null == d || d === !1 ? d: d.html, d = null == d || d === !1 ? d: d.title, typeof d === m ? d.apply(t) : d)) + '";\n            s.prop3="M:品牌页:' + f((d = t.content, d = null == d || d === !1 ? d: d.html, d = null == d || d === !1 ? d: d.title, typeof d === m ? d.apply(t) : d)) + '";\n            /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/\n            var s_code=s.t();if(s_code)document.write(s_code)//-->\n        </script>\n        <script type="text/javascript"><!--\n        if(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')\n        //--></script><noscript><img src="http://lenovochina.122.2o7.net/b/ss/lenovochina-prd/1/H.26--NS/0"\n                                     height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->\n        <!-- End SiteCatalyst code version: H.26. -->\n    </div>\n',
	u = y.invokePartial(l.allmobilize_track, "allmobilize_track", t, a, l, e),
	(u || 0 === u) && (v += u),
	v += "</body>\n</html>\n"
};
window.AMPlatform.__tmpl.series = function(n, t, l, e, a) {
	function i(n, t) {
		var e, a, i = "";
		return i += '\n            <div class="flexslider ln-banner">\n                <ul class="slides">\n                    ',
		a = l.each.call(n, (e = n.content, e = null == e || e === !1 ? e: e.html, null == e || e === !1 ? e: e.slide), {
			hash: {},
			inverse: u.noop,
			fn: u.program(2, r, t),
			data: t
		}),
		(a || 0 === a) && (i += a),
		i += "\n                </ul>\n            </div>\n        "
	}
	function r(n, t) {
		var e, a = "";
		return a += '\n                        <li><a href="',
		(e = l._link) ? e = e.call(n, {
			hash: {},
			data: t
		}) : (e = n._link, e = typeof e === d ? e.apply(n) : e),
		a += f(e) + '"><img src="',
		(e = l._src) ? e = e.call(n, {
			hash: {},
			data: t
		}) : (e = n._src, e = typeof e === d ? e.apply(n) : e),
		a += f(e) + '" alt=""/></a></li>\n                    '
	}
	function s(n) {
		var t, l, e = "";
		return e += '\n                <h2 class="ln-s-title">\n                    ',
		t = n.content,
		t = null == t || t === !1 ? t: t.html,
		t = null == t || t === !1 ? t: t.title,
		l = typeof t === d ? t.apply(n) : t,
		(l || 0 === l) && (e += l),
		e += "\n                </h2>\n            "
	}
	function o(n) {
		var t, l = "";
		return l += '\n                <iframe id="product-iframe" name="ProductViewIframe" src="' + f((t = n.content, t = null == t || t === !1 ? t: t.html, t = null == t || t === !1 ? t: t.pdtFrame, typeof t === d ? t.apply(n) : t)) + '" style="width: 100%;"\n                        scrolling="no" frameborder="0" onload="this.height=218"></iframe>\n\n            '
	}
	function c() {
		return '\n        <script type="text/javascript">\n            (function($) {\n                var iframe = document.getElementById("product-iframe");\n                function reinitIframe(){\n                    try{\n                        var bHeight = iframe.contentWindow.document.body.scrollHeight,\n                                dHeight = iframe.contentWindow.document.documentElement.scrollHeight,\n                                height = Math.max(bHeight, dHeight);\n                        iframe.height =  height;\n                    }catch (ex){}\n                }\n                iframe.onload = function() {\n                    console.log("iframe loded");\n                    reinitIframe();\n                }\n\n            })(jQuery);\n        </script>\n\n        '
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	l = this.merge(l, n.helpers),
	e = this.merge(e, n.partials),
	a = a || {};
	var p, h, m = "",
	d = "function",
	f = this.escapeExpression,
	u = this;
	return m += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(p = l.title) ? p = p.call(t, {
		hash: {},
		data: a
	}) : (p = t.title, p = typeof p === d ? p.apply(t) : p),
	m += f(p) + '</title>\n  <link rel="stylesheet" href="',
	(p = l.__stylePath) ? p = p.call(t, {
		hash: {},
		data: a
	}) : (p = t.__stylePath, p = typeof p === d ? p.apply(t) : p),
	m += f(p) + '" />\n</head>\n<body class="ln">\n	<div class="page">\n		<div class="hd header i-hd">\n            <h1><a href="http://www.lenovo.com.cn/" class="ir">Lenovo联想</a></h1>\n            <ul class="icon">\n                <li><a href="#search" class="icon-s link-panel ir" >搜索</a></li>\n                <li><a href="tel:4008222008" class="icon-tel ir">电话</a></li>\n                <li><a href="http://e.weibo.com/lenovo" target="_blank" class="icon-wb ir">微博</a></li>\n                <li><a href="#nav-panel" class="icon-grid link-panel ir">导航</a></li>\n            </ul>\n		</div>\n\n        ',
	(p = l.lnPanel) ? p = p.call(t, {
		hash: {},
		data: a
	}) : (p = t.lnPanel, p = typeof p === d ? p.apply(t) : p),
	(p || 0 === p) && (m += p),
	m += "\n\n        ",
	h = l["if"].call(t, (p = t.content, p = null == p || p === !1 ? p: p.html, null == p || p === !1 ? p: p.slide), {
		hash: {},
		inverse: u.noop,
		fn: u.program(1, i, a),
		data: a
	}),
	(h || 0 === h) && (m += h),
	m += '\n\n        <div class="content">\n            ',
	h = l["if"].call(t, (p = t.content, p = null == p || p === !1 ? p: p.html, null == p || p === !1 ? p: p.title), {
		hash: {},
		inverse: u.noop,
		fn: u.program(4, s, a),
		data: a
	}),
	(h || 0 === h) && (m += h),
	m += "\n            ",
	p = t.content,
	p = null == p || p === !1 ? p: p.html,
	p = null == p || p === !1 ? p: p.menu,
	h = typeof p === d ? p.apply(t) : p,
	(h || 0 === h) && (m += h),
	m += "\n\n            <!--手机产品列表-->\n            ",
	h = l["if"].call(t, (p = t.content, p = null == p || p === !1 ? p: p.html, null == p || p === !1 ? p: p.pdtFrame), {
		hash: {},
		inverse: u.noop,
		fn: u.program(6, o, a),
		data: a
	}),
	(h || 0 === h) && (m += h),
	m += '\n\n		</div>\n\n    <div class="ft">\n        <div class="ft-top"><a href="#top">回到顶部</a></div>\n      ',
	h = u.invokePartial(e.switch_mode, "switch_mode", t, l, e, a),
	(h || 0 === h) && (m += h),
	m += '\n        <div class="ft-cr">\n            版权所有：1998－2013 联想集团&nbsp; &nbsp;| <a href="http://www.lenovo.com.cn/Public/public_bottom/legal.shtml" target="_blank">法律公告</a> | <a href="http://www.lenovo.com.cn/Public/public_bottom/privacy.shtml" target="_blank">隐私保护</a><br><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11035381号</a>&nbsp; &nbsp;京公网安备110108007970号\n\n        </div>\n    </div>\n\n	</div>\n    <script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n    <script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n<script type="text/javascript" src="',
	(h = l.__root) ? h = h.call(t, {
		hash: {},
		data: a
	}) : (h = t.__root, h = typeof h === d ? h.apply(t) : h),
	m += f(h) + 'script.min.js"></script>\n    <!--手机产品列表-->\n        ',
	h = l["if"].call(t, (p = t.content, p = null == p || p === !1 ? p: p.html, null == p || p === !1 ? p: p.pdtFrame), {
		hash: {},
		inverse: u.noop,
		fn: u.program(8, c, a),
		data: a
	}),
	(h || 0 === h) && (m += h),
	m += '\n\n    <div class="stat-code">\n        <script type="text/javascript" src="',
	(h = l.__root) ? h = h.call(t, {
		hash: {},
		data: a
	}) : (h = t.__root, h = typeof h === d ? h.apply(t) : h),
	m += f(h) + 's_code.js"></script>\n        <script type="text/javascript">\n            s.pageName="M:产品列表:' + f((p = t.content, p = null == p || p === !1 ? p: p.html, p = null == p || p === !1 ? p: p.stat, p = null == p || p === !1 ? p: p.pageName, typeof p === d ? p.apply(t) : p)) + '";\n            s.channel="M:产品列表";\n            s.prop1="M:产品列表";\n            s.prop2="M:' + f((p = t.content, p = null == p || p === !1 ? p: p.html, p = null == p || p === !1 ? p: p.stat, p = null == p || p === !1 ? p: p.prop2, typeof p === d ? p.apply(t) : p)) + '";\n            s.prop3="M:' + f((p = t.content, p = null == p || p === !1 ? p: p.html, p = null == p || p === !1 ? p: p.stat, p = null == p || p === !1 ? p: p.prop3, typeof p === d ? p.apply(t) : p)) + '";\n            /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/\n            var s_code=s.t();if(s_code)document.write(s_code)//-->\n        </script>\n        <script type="text/javascript"><!--\n        if(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')\n        //--></script><noscript><img src="http://lenovochina.122.2o7.net/b/ss/lenovochina-prd/1/H.26--NS/0"\n                                     height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->\n        <!-- End SiteCatalyst code version: H.26. -->\n    </div>\n',
	h = u.invokePartial(e.allmobilize_track, "allmobilize_track", t, l, e, a),
	(h || 0 === h) && (m += h),
	m += "</body>\n</html>\n"
};
window.AMPlatform.__tmpl["series-all"] = function(n, t, l, a, e) {
	function i(n, t) {
		var a, e, i = "";
		return i += '\n            <div class="flexslider ln-banner">\n                <ul class="slides">\n                    ',
		e = l.each.call(n, (a = n.content, a = null == a || a === !1 ? a: a.html, null == a || a === !1 ? a: a.slide), {
			hash: {},
			inverse: f.noop,
			fn: f.program(2, s, t),
			data: t
		}),
		(e || 0 === e) && (i += e),
		i += "\n                </ul>\n            </div>\n        "
	}
	function s(n, t) {
		var a, e = "";
		return e += '\n                        <li><a href="',
		(a = l._link) ? a = a.call(n, {
			hash: {},
			data: t
		}) : (a = n._link, a = typeof a === u ? a.apply(n) : a),
		e += v(a) + '"><img src="',
		(a = l._src) ? a = a.call(n, {
			hash: {},
			data: t
		}) : (a = n._src, a = typeof a === u ? a.apply(n) : a),
		e += v(a) + '" alt=""/></a></li>\n                    '
	}
	function r(n) {
		var t, l, a = "";
		return a += '\n                <div class="ln-s-range">\n                    ',
		t = n.content,
		t = null == t || t === !1 ? t: t.html,
		t = null == t || t === !1 ? t: t.range,
		l = typeof t === u ? t.apply(n) : t,
		(l || 0 === l) && (a += l),
		a += "\n                </div>\n            "
	}
	function c(n) {
		var t, l, a = "";
		return a += '\n            <div class="ln-s-all">\n                <h2 class="ln-s-title">\n                    ',
		t = n.content,
		t = null == t || t === !1 ? t: t.html,
		t = null == t || t === !1 ? t: t.title,
		l = typeof t === u ? t.apply(n) : t,
		(l || 0 === l) && (a += l),
		a += "\n                </h2>\n                ",
		t = n.content,
		t = null == t || t === !1 ? t: t.html,
		t = null == t || t === !1 ? t: t.menu,
		l = typeof t === u ? t.apply(n) : t,
		(l || 0 === l) && (a += l),
		a += "\n            </div>\n            "
	}
	function o(n, t) {
		var a, e, i = "";
		return i += '\n                <ul class="brand-list">\n                    ',
		e = l.each.call(n, (a = n.content, a = null == a || a === !1 ? a: a.html, null == a || a === !1 ? a: a.brands), {
			hash: {},
			inverse: f.noop,
			fn: f.program(9, p, t),
			data: t
		}),
		(e || 0 === e) && (i += e),
		i += "\n                </ul>\n            "
	}
	function p(n) {
		var t, l = "";
		return l += '\n                        <li class="s-item">',
		t = typeof n === u ? n.apply(n) : n,
		(t || 0 === t) && (l += t),
		l += "</li>\n                    "
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	l = this.merge(l, n.helpers),
	a = this.merge(a, n.partials),
	e = e || {};
	var h, d, m = "",
	u = "function",
	v = this.escapeExpression,
	f = this;
	return m += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(h = l.title) ? h = h.call(t, {
		hash: {},
		data: e
	}) : (h = t.title, h = typeof h === u ? h.apply(t) : h),
	m += v(h) + '</title>\n  <link rel="stylesheet" href="',
	(h = l.__stylePath) ? h = h.call(t, {
		hash: {},
		data: e
	}) : (h = t.__stylePath, h = typeof h === u ? h.apply(t) : h),
	m += v(h) + '" />\n</head>\n<body class="ln">\n	<div class="page" id="top">\n		<div class="hd header i-hd">\n            <h1><a href="http://www.lenovo.com.cn/" class="ir">Lenovo联想</a></h1>\n            <ul class="icon">\n                <li><a href="#search" class="icon-s link-panel ir" >搜索</a></li>\n                <li><a href="tel:4008222008" class="icon-tel ir">电话</a></li>\n                <li><a href="http://e.weibo.com/lenovo" target="_blank" class="icon-wb ir">微博</a></li>\n                <li><a href="#nav-panel" class="icon-grid link-panel ir">导航</a></li>\n            </ul>\n        </div>\n\n        ',
	(h = l.lnPanel) ? h = h.call(t, {
		hash: {},
		data: e
	}) : (h = t.lnPanel, h = typeof h === u ? h.apply(t) : h),
	(h || 0 === h) && (m += h),
	m += "\n\n        ",
	d = l["if"].call(t, (h = t.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.slide), {
		hash: {},
		inverse: f.noop,
		fn: f.program(1, i, e),
		data: e
	}),
	(d || 0 === d) && (m += d),
	m += '\n\n        <div class="content">\n            <!--范围选择-->\n            ',
	d = l["if"].call(t, (h = t.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.range), {
		hash: {},
		inverse: f.noop,
		fn: f.program(4, r, e),
		data: e
	}),
	(d || 0 === d) && (m += d),
	m += "\n\n\n            ",
	d = l["if"].call(t, (h = t.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.title), {
		hash: {},
		inverse: f.noop,
		fn: f.program(6, c, e),
		data: e
	}),
	(d || 0 === d) && (m += d),
	m += "\n            ",
	d = l["if"].call(t, (h = t.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.brands), {
		hash: {},
		inverse: f.noop,
		fn: f.program(8, o, e),
		data: e
	}),
	(d || 0 === d) && (m += d),
	m += '\n		</div>\n\n    <div class="ft">\n        <div class="ft-top"><a href="#top">回到顶部</a></div>\n      ',
	d = f.invokePartial(a.switch_mode, "switch_mode", t, l, a, e),
	(d || 0 === d) && (m += d),
	m += '\n        <div class="ft-cr">\n            版权所有：1998－2013 联想集团&nbsp; &nbsp;| <a href="http://www.lenovo.com.cn/Public/public_bottom/legal.shtml" target="_blank">法律公告</a> | <a href="http://www.lenovo.com.cn/Public/public_bottom/privacy.shtml" target="_blank">隐私保护</a><br><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11035381号</a>&nbsp; &nbsp;京公网安备110108007970号\n\n        </div>\n    </div>\n\n	</div>\n    <script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n    <script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n<script type="text/javascript" src="',
	(d = l.__root) ? d = d.call(t, {
		hash: {},
		data: e
	}) : (d = t.__root, d = typeof d === u ? d.apply(t) : d),
	m += v(d) + 'script.min.js"></script>\n    <div class="stat-code">\n        <script type="text/javascript" src="',
	(d = l.__root) ? d = d.call(t, {
		hash: {},
		data: e
	}) : (d = t.__root, d = typeof d === u ? d.apply(t) : d),
	m += v(d) + 's_code.js"></script>\n        <script type="text/javascript">\n            s.pageName="M:产品搜索:' + v((h = t.content, h = null == h || h === !1 ? h: h.html, h = null == h || h === !1 ? h: h.title, typeof h === u ? h.apply(t) : h)) + '";\n            s.channel="M:产品搜索";\n            s.prop1="M:产品搜索";\n            s.prop2="M:产品搜索:' + v((h = t.content, h = null == h || h === !1 ? h: h.html, h = null == h || h === !1 ? h: h.title, typeof h === u ? h.apply(t) : h)) + '";\n            s.prop3="M:产品搜索:' + v((h = t.content, h = null == h || h === !1 ? h: h.html, h = null == h || h === !1 ? h: h.title, typeof h === u ? h.apply(t) : h)) + '";\n            /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/\n            var s_code=s.t();if(s_code)document.write(s_code)//-->\n        </script>\n        <script type="text/javascript"><!--\n        if(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')\n        //--></script><noscript><img src="http://lenovochina.122.2o7.net/b/ss/lenovochina-prd/1/H.26--NS/0"\n                                     height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->\n        <!-- End SiteCatalyst code version: H.26. -->\n    </div>\n',
	d = f.invokePartial(a.allmobilize_track, "allmobilize_track", t, l, a, e),
	(d || 0 === d) && (m += d),
	m += "</body>\n</html>\n"
};
window.AMPlatform.__tmpl.detail = function(n, a, t, e, l) {
	function s(n, a) {
		var e, l, s = "";
		return s += '\n            <div class="flexslider ln-banner" id="pdt-slide">\n                <ul class="slides">\n                    ',
		l = t.each.call(n, (e = n.content, e = null == e || e === !1 ? e: e.html, null == e || e === !1 ? e: e.slide), {
			hash: {},
			inverse: m.noop,
			fn: m.program(2, i, a),
			data: a
		}),
		(l || 0 === l) && (s += l),
		s += "\n                </ul>\n            </div>\n        "
	}
	function i(n) {
		var a = "";
		return a += '\n                        <li><img src="' + f(typeof n === u ? n.apply(n) : n) + '" alt=""/></li>\n                    '
	}
	function r(n, a) {
		var e, l, s = "";
		return s += '\n                <div class="ln-pdtinfo">\n                    <ul>\n                    ',
		l = t.each.call(n, (e = n.content, e = null == e || e === !1 ? e: e.html, null == e || e === !1 ? e: e.basicInfo), {
			hash: {},
			inverse: m.noop,
			fn: m.program(5, o, a),
			data: a
		}),
		(l || 0 === l) && (s += l),
		s += "\n                    </ul>\n                </div>\n            "
	}
	function o(n) {
		var a, t = "";
		return t += "\n                        <li>",
		a = typeof n === u ? n.apply(n) : n,
		(a || 0 === a) && (t += a),
		t += "</li>\n                    "
	}
	function c() {
		return '\n                    <div class="buttons2 button_buy">\n                        <a href="http://shop.lenovo.com.cn" target="_blank">在线购买</a>\n                    </div>\n                '
	}
	function p(n) {
		var a, t, e = "";
		return e += '\n            <div class="pdt-tab">\n                    ',
		a = n.content,
		a = null == a || a === !1 ? a: a.html,
		a = null == a || a === !1 ? a: a.tab,
		t = typeof a === u ? a.apply(n) : a,
		(t || 0 === t) && (e += t),
		e += "\n            </div>\n            "
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	t = this.merge(t, n.helpers),
	e = this.merge(e, n.partials),
	l = l || {};
	var d, h, v = "",
	u = "function",
	f = this.escapeExpression,
	m = this;
	return v += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(d = t.title) ? d = d.call(a, {
		hash: {},
		data: l
	}) : (d = a.title, d = typeof d === u ? d.apply(a) : d),
	v += f(d) + '</title>\n  <link rel="stylesheet" href="',
	(d = t.__stylePath) ? d = d.call(a, {
		hash: {},
		data: l
	}) : (d = a.__stylePath, d = typeof d === u ? d.apply(a) : d),
	v += f(d) + '" />\n</head>\n<body class="ln">\n	<div class="page" id="top">\n		<div class="hd header i-hd">\n            <h1><a href="http://www.lenovo.com.cn/" class="ir">Lenovo联想</a></h1>\n            <ul class="icon">\n                <li><a href="#search" class="icon-s link-panel ir">搜索</a></li>\n                <li><a href="tel:4008222008" class="icon-tel ir">电话</a></li>\n                <li><a href="http://e.weibo.com/lenovo" target="_blank" class="icon-wb ir">微博</a></li>\n                <li><a href="#nav-panel" class="icon-grid link-panel ir">导航</a></li>\n            </ul>\n		</div>\n\n        ',
	(d = t.lnPanel) ? d = d.call(a, {
		hash: {},
		data: l
	}) : (d = a.lnPanel, d = typeof d === u ? d.apply(a) : d),
	(d || 0 === d) && (v += d),
	v += "\n\n        ",
	h = t["if"].call(a, (d = a.content, d = null == d || d === !1 ? d: d.html, null == d || d === !1 ? d: d.slide), {
		hash: {},
		inverse: m.noop,
		fn: m.program(1, s, l),
		data: l
	}),
	(h || 0 === h) && (v += h),
	v += '\n\n        <div class="content">\n            <!--产品基本信息-->\n            ',
	h = t["if"].call(a, (d = a.content, d = null == d || d === !1 ? d: d.html, null == d || d === !1 ? d: d.basicInfo), {
		hash: {},
		inverse: m.noop,
		fn: m.program(4, r, l),
		data: l
	}),
	(h || 0 === h) && (v += h),
	v += "\n\n            ",
	d = a.content,
	d = null == d || d === !1 ? d: d.html,
	d = null == d || d === !1 ? d: d.gallery,
	h = typeof d === u ? d.apply(a) : d,
	(h || 0 === h) && (v += h),
	v += '\n\n            <div class="user-btn">\n                ',
	h = t["if"].call(a, (d = a.content, d = null == d || d === !1 ? d: d.html, null == d || d === !1 ? d: d.btnBuy), {
		hash: {},
		inverse: m.noop,
		fn: m.program(7, c, l),
		data: l
	}),
	(h || 0 === h) && (v += h),
	v += '\n\n                <div class="buttons2 button_share">\n                    <a href="#share-to">分享到</a>\n                </div>\n            </div>\n\n\n            ',
	h = t["if"].call(a, (d = a.content, d = null == d || d === !1 ? d: d.html, null == d || d === !1 ? d: d.tab), {
		hash: {},
		inverse: m.noop,
		fn: m.program(9, p, l),
		data: l
	}),
	(h || 0 === h) && (v += h),
	v += '\n\n            <div class="pdt-note">',
	d = a.content,
	d = null == d || d === !1 ? d: d.html,
	d = null == d || d === !1 ? d: d.notes,
	h = typeof d === u ? d.apply(a) : d,
	(h || 0 === h) && (v += h),
	v += '</div>\n\n		</div>\n\n    <div class="ft">\n        <div class="ft-top"><a href="#top">回到顶部</a></div>\n      ',
	h = m.invokePartial(e.switch_mode, "switch_mode", a, t, e, l),
	(h || 0 === h) && (v += h),
	v += '\n        <div class="ft-cr">\n            版权所有：1998－2013 联想集团&nbsp; &nbsp;| <a href="http://www.lenovo.com.cn/Public/public_bottom/legal.shtml" target="_blank">法律公告</a> | <a href="http://www.lenovo.com.cn/Public/public_bottom/privacy.shtml" target="_blank">隐私保护</a><br><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11035381号</a>&nbsp; &nbsp;京公网安备110108007970号\n\n        </div>\n    </div>\n        <div id="share-to">\n            <div class="title">分享到</div>\n            <ul class="sns-icon">\n                <li class="s_weibo"><a href="#" data-rel="tsina"><span class="sns-wb"></span>新浪微博</a></li>\n                <li class="s_kaixin001"><a href="#" data-rel=\'kaixin001\'><span class="sns-kx"></span>开心网</a></li>\n                <li class="s_renren"><a href="#" data-rel=\'renren\'><span class="sns-renren"></span>人人网</a></li>\n                <li class="s_tencent"><a href="#" data-rel=\'qqv\'><span class="sns-qwb"></span>腾讯微博</a></li>\n                <li class="s_sohu"><a href="#" data-rel=\'sohu\'><span class="sns-sohuweibo"></span>搜狐微博</a></li>\n                <li class="s_douban"><a href="#" data-rel=\'douban\'><span class="sns-douban"></span>豆瓣网</a></li>\n                <li class="s_qq_k"><a href="#" data-rel=\'qzone\'><span class="sns-qzone"></span>Qzone</a></li>\n            </ul>\n            <button class="share-cancel">取消</button>\n        </div>\n\n</div>\n    <script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n    <script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n<script type="text/javascript" src="',
	(h = t.__root) ? h = h.call(a, {
		hash: {},
		data: l
	}) : (h = a.__root, h = typeof h === u ? h.apply(a) : h),
	v += f(h) + 'script.min.js"></script>\n<script type="text/javascript" src="',
	(h = t.__root) ? h = h.call(a, {
		hash: {},
		data: l
	}) : (h = a.__root, h = typeof h === u ? h.apply(a) : h),
	v += f(h) + 'share.js"></script>\n    <script type="text/javascript">\n    (function($) {\n        // ready event\n        $(function() {\n            $("#share-to a").click(function(e) {\n                var sLink =  $(this).attr("data-rel");\n                share_to(sLink);\n                $(".button_share").trigger(\'click\');\n                e.preventDefault();\n            });\n\n            // share to\n            $(".button_share").on(\'click\', function(e) {\n                var $sharePanel = $("#share-to");\n\n                if ($sharePanel.is(":hidden")) {\n                    $(document).lnOverlay(\'show\');\n                } else {\n                    $(document).lnOverlay(\'hide\');\n                }\n                $sharePanel.slideToggle(300);\n                e.preventDefault();\n            });\n\n            $(".share-cancel").click(function(e) {\n                $(".button_share").trigger(\'click\');\n            });\n\n\n            // Open product gallery when ready\n            //$("#conProductTab_3").show().prev("a").addClass("open");\n\n            //打印机产品规格处理\n            var $detailTable = $(".table_line"),\n                $dtWrapper = $detailTable.parent(".pdt-tab-bd"),\n                $dtInner = $(".table_line > tbody > tr > td > table");\n            if ($dtInner.length > 0) {\n                $dtInner.insertBefore($detailTable);\n                $detailTable.remove();\n            }\n\n        });\n\n        // window load event\n        $(function() {\n            // The slider being synced must be initialized first\n            $(\'#carousel\').flexslider({\n                animation: "slide",\n                controlNav: false,\n                animationLoop: false,\n                slideshow: false,\n                itemWidth: 48,\n                itemMargin: 4,\n                asNavFor: \'#slider\'\n            });\n\n            $(\'#slider\').flexslider({\n                animation: "slide",\n                controlNav: false,\n                directionNav: false,\n                animationLoop: false,\n                slideshow: false,\n                sync: "#carousel"\n            });\n        });\n\n        $.fn.extend({\n            lnOverlay: function(action) {\n                var action = action,\n                    $ol = $("#overlay"),\n                    $lvDom = $("<div id=\'overlay\'></div>");\n\n                if ($ol.length === 0) {\n                    $("body").append($lvDom);\n                }\n\n                if (action == "hide") {\n                    $ol.hide(50)\n                } else if (action == "remove") {\n                    $ol.remove();\n                } else {\n                    $ol.show();\n                }\n            }\n        });\n    })(jQuery);\n</script>\n\n    <div class="stat-code">\n        <script type="text/javascript" src="',
	(h = t.__root) ? h = h.call(a, {
		hash: {},
		data: l
	}) : (h = a.__root, h = typeof h === u ? h.apply(a) : h),
	v += f(h) + 's_code.js"></script>\n        <script type="text/javascript">\n        s.pageName="M:产品详情: ' + f((d = a.content, d = null == d || d === !1 ? d: d.html, d = null == d || d === !1 ? d: d.statTitle, typeof d === u ? d.apply(a) : d)) + '" // 记录友好页面名称\n        s.channel="M:产品详情" // 记录友好区域名称\n        s.prop1="M:产品详情" // 记录友好页面类型名称\n        s.prop2="M:产品详情" // 记录友好网站子区域名称，如没有子区域，与s.channel的值相同\n        s.prop3="M:产品详情" //记录友好网站子子区域名称，如没有子子区域，与s.prop2的值相同\n        s.products="' + f((d = a.content, d = null == d || d === !1 ? d: d.html, d = null == d || d === !1 ? d: d.statId, typeof d === u ? d.apply(a) : d)) + '"; //记录product ID\n        s.events="event29"; //记录云适配网站产品浏览\n        /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/\n        var s_code=s.t();if(s_code)document.write(s_code)//--></script>\n        <script type="text/javascript"><!--\n        if(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')\n        //--></script><noscript><img src="http://lenovochina.122.2o7.net/b/ss/lenovochina-prd/1/H.26--NS/0"\n                                     height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->\n        <!-- End SiteCatalyst code version: H.26. -->\n    </div>\n',
	h = m.invokePartial(e.allmobilize_track, "allmobilize_track", a, t, e, l),
	(h || 0 === h) && (v += h),
	v += "</body>\n</html>\n"
};
window.AMPlatform.__tmpl["series-iframe"] = function(t, n, a, e, i) {
	function l(t, n) {
		var e, i, l = "";
		return l += '\n                <ul class="brand-list">\n                    ',
		i = a.each.call(t, (e = t.content, e = null == e || e === !1 ? e: e.html, null == e || e === !1 ? e: e.brands), {
			hash: {},
			inverse: h.noop,
			fn: h.program(2, s, n),
			data: n
		}),
		(i || 0 === i) && (l += i),
		l += "\n                </ul>\n            "
	}
	function s(t) {
		var n, a = "";
		return a += "\n                        <li>",
		n = typeof t === o ? t.apply(t) : t,
		(n || 0 === n) && (a += n),
		a += "</li>\n                    "
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	a = this.merge(a, t.helpers),
	e = this.merge(e, t.partials),
	i = i || {};
	var r, p, c = "",
	o = "function",
	h = this,
	m = this.escapeExpression;
	return c += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(r = a.title) ? r = r.call(n, {
		hash: {},
		data: i
	}) : (r = n.title, r = typeof r === o ? r.apply(n) : r),
	c += m(r) + '</title>\n  <link rel="stylesheet" href="',
	(r = a.__stylePath) ? r = r.call(n, {
		hash: {},
		data: i
	}) : (r = n.__stylePath, r = typeof r === o ? r.apply(n) : r),
	c += m(r) + '" />\n    <style type="text/css">\n        #ProductList {\n            display: none;\n        }\n    </style>\n</head>\n<body class="ln">\n	<div class="page">\n        <div class="content">\n            ',
	p = a["if"].call(n, (r = n.content, r = null == r || r === !1 ? r: r.html, null == r || r === !1 ? r: r.brands), {
		hash: {},
		inverse: h.noop,
		fn: h.program(1, l, i),
		data: i
	}),
	(p || 0 === p) && (c += p),
	c += "\n\n            ",
	r = n.content,
	r = null == r || r === !1 ? r: r.html,
	r = null == r || r === !1 ? r: r.body,
	p = typeof r === o ? r.apply(n) : r,
	(p || 0 === p) && (c += p),
	c += '\n\n\n		</div>\n\n\n	</div>\n    <script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n    <script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n    <script type="text/javascript" src="',
	(p = a.__root) ? p = p.call(n, {
		hash: {},
		data: i
	}) : (p = n.__root, p = typeof p === o ? p.apply(n) : p),
	c += m(p) + 'script.min.js"></script>\n    <script type="text/javascript">\n        (function($) {\n            $(function(){\n                $(".brand-list a").attr("target", "_top");\n            });\n            $(window).load(function() {\n                $("#product-iframe", window.parent.document).height($("body").height() + "px");\n                $("html,body", window.parent.document).animate({\n                    scrollTop: 0\n                }, 300);\n            })\n        })(jQuery)\n    </script>\n',
	p = h.invokePartial(e.allmobilize_track, "allmobilize_track", n, a, e, i),
	(p || 0 === p) && (c += p),
	c += "</body>\n</html>\n"
};
window.AMPlatform.__tmpl["detail-m"] = function(n, a, l, t, s) {
	function e(n, a) {
		var t, s, e = "";
		return e += '\n            <div class="flexslider ln-banner" id="pdt-slide">\n                <ul class="slides">\n                    ',
		s = l.each.call(n, (t = n.content, t = null == t || t === !1 ? t: t.html, null == t || t === !1 ? t: t.slide), {
			hash: {},
			inverse: y.noop,
			fn: y.program(2, i, a),
			data: a
		}),
		(s || 0 === s) && (e += s),
		e += "\n                </ul>\n            </div>\n        "
	}
	function i(n) {
		var a = "";
		return a += '\n                        <li><img src="' + m(typeof n === f ? n.apply(n) : n) + '" alt=""/></li>\n                    '
	}
	function o(n, a) {
		var t, s, e = "";
		return e += '\n                <div class="ln-pdtinfo">\n                    <ul>\n                    ',
		s = l.each.call(n, (t = n.content, t = null == t || t === !1 ? t: t.html, null == t || t === !1 ? t: t.basicInfo), {
			hash: {},
			inverse: y.noop,
			fn: y.program(5, r, a),
			data: a
		}),
		(s || 0 === s) && (e += s),
		e += "\n                    </ul>\n                </div>\n            "
	}
	function r(n, a) {
		var t, s = "";
		return s += '\n                        <li class="',
		(t = l["class"]) ? t = t.call(n, {
			hash: {},
			data: a
		}) : (t = n["class"], t = typeof t === f ? t.apply(n) : t),
		s += m(t) + '">',
		(t = l.name) ? t = t.call(n, {
			hash: {},
			data: a
		}) : (t = n.name, t = typeof t === f ? t.apply(n) : t),
		(t || 0 === t) && (s += t),
		s += "</li>\n                    "
	}
	function c(n) {
		var a = "";
		return a += '\n                            <li><img src="' + m(typeof n === f ? n.apply(n) : n) + '"></li>\n                        '
	}
	function p(n) {
		var a, l = "";
		return l += '\n                    <div id="divBuy" class="buttons2 button_buy">\n                        <a id="ShopUrl" href="' + m((a = n.content, a = null == a || a === !1 ? a: a.html, a = null == a || a === !1 ? a: a.btnBuy, typeof a === f ? a.apply(n) : a)) + '" target="_blank">立刻购买</a>\n                    </div>\n                '
	}
	function d(n) {
		var a, l, t = "";
		return t += '\n            <div class="pdt-tab">\n                    ',
		a = n.content,
		a = null == a || a === !1 ? a: a.html,
		a = null == a || a === !1 ? a: a.tab,
		l = typeof a === f ? a.apply(n) : a,
		(l || 0 === l) && (t += l),
		t += "\n            </div>\n            "
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	l = this.merge(l, n.helpers),
	t = this.merge(t, n.partials),
	s = s || {};
	var h, u, v = "",
	f = "function",
	m = this.escapeExpression,
	y = this;
	return v += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(h = l.title) ? h = h.call(a, {
		hash: {},
		data: s
	}) : (h = a.title, h = typeof h === f ? h.apply(a) : h),
	v += m(h) + '</title>\n  <link rel="stylesheet" href="',
	(h = l.__stylePath) ? h = h.call(a, {
		hash: {},
		data: s
	}) : (h = a.__stylePath, h = typeof h === f ? h.apply(a) : h),
	v += m(h) + '" />\n</head>\n<body class="ln">\n	<div class="page" id="top">\n		<div class="hd header i-hd">\n            <h1><a href="http://www.lenovo.com.cn/" class="ir">Lenovo联想</a></h1>\n            <ul class="icon">\n                <li><a href="#search" class="icon-s link-panel ir" >搜索</a></li>\n                <li><a href="tel:4008222008" class="icon-tel ir">电话</a></li>\n                <li><a href="http://e.weibo.com/lenovo" target="_blank" class="icon-wb ir">微博</a></li>\n                <li><a href="#nav-panel" class="icon-grid link-panel ir">导航</a></li>\n            </ul>\n		</div>\n\n        ',
	(h = l.lnPanel) ? h = h.call(a, {
		hash: {},
		data: s
	}) : (h = a.lnPanel, h = typeof h === f ? h.apply(a) : h),
	(h || 0 === h) && (v += h),
	v += "\n\n        ",
	u = l["if"].call(a, (h = a.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.slideCOOOOOO), {
		hash: {},
		inverse: y.noop,
		fn: y.program(1, e, s),
		data: s
	}),
	(u || 0 === u) && (v += u),
	v += '\n\n        <div class="content">\n            <!--产品基本信息-->\n            ',
	u = l["if"].call(a, (h = a.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.basicInfo), {
		hash: {},
		inverse: y.noop,
		fn: y.program(4, o, s),
		data: s
	}),
	(u || 0 === u) && (v += u),
	v += '\n\n            <div class="pdt-gallery">\n                <div id="slider" class="flexslider">\n                    <ul class="slides">\n                        ',
	u = l.each.call(a, (h = a.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.slides), {
		hash: {},
		inverse: y.noop,
		fn: y.program(7, c, s),
		data: s
	}),
	(u || 0 === u) && (v += u),
	v += '\n                    </ul>\n                </div>\n                <div id="carousel" class="flexslider">\n                    <ul class="slides flex-control-thumbs">\n                        ',
	u = l.each.call(a, (h = a.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.tmbs), {
		hash: {},
		inverse: y.noop,
		fn: y.program(7, c, s),
		data: s
	}),
	(u || 0 === u) && (v += u),
	v += '\n                    </ul>\n                </div>\n            </div>\n\n            <div class="user-btn">\n                ',
	u = l["if"].call(a, (h = a.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.btnBuy), {
		hash: {},
		inverse: y.noop,
		fn: y.program(9, p, s),
		data: s
	}),
	(u || 0 === u) && (v += u),
	v += '\n\n                <div class="buttons2 button_share">\n                    <a href="#share-to">分享到</a>\n                </div>\n            </div>\n\n            ',
	u = l["if"].call(a, (h = a.content, h = null == h || h === !1 ? h: h.html, null == h || h === !1 ? h: h.tab), {
		hash: {},
		inverse: y.noop,
		fn: y.program(11, d, s),
		data: s
	}),
	(u || 0 === u) && (v += u),
	v += '\n\n            <div class="pdt-note">',
	h = a.content,
	h = null == h || h === !1 ? h: h.html,
	h = null == h || h === !1 ? h: h.notes,
	u = typeof h === f ? h.apply(a) : h,
	(u || 0 === u) && (v += u),
	v += '</div>\n\n		</div>\n\n    <div class="ft">\n        <div class="ft-top"><a href="#top">回到顶部</a></div>\n      ',
	u = y.invokePartial(t.switch_mode, "switch_mode", a, l, t, s),
	(u || 0 === u) && (v += u),
	v += '\n        <div class="ft-cr">\n            版权所有：1998－2013 联想集团&nbsp; &nbsp;| <a href="http://www.lenovo.com.cn/Public/public_bottom/legal.shtml" target="_blank">法律公告</a> | <a href="http://www.lenovo.com.cn/Public/public_bottom/privacy.shtml" target="_blank">隐私保护</a><br><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11035381号</a>&nbsp; &nbsp;京公网安备110108007970号\n\n        </div>\n    </div>\n        <div id="share-to">\n            <div class="title">分享到</div>\n            <ul class="sns-icon">\n                <li class="s_weibo"><a href="#" data-rel="tsina"><span class="sns-wb"></span>新浪微博</a></li>\n                <li class="s_kaixin001"><a href="#" data-rel=\'kaixin001\'><span class="sns-kx"></span>开心网</a></li>\n                <li class="s_renren"><a href="#" data-rel=\'renren\'><span class="sns-renren"></span>人人网</a></li>\n                <li class="s_tencent"><a href="#" data-rel=\'qqv\'><span class="sns-qwb"></span>腾讯微博</a></li>\n                <li class="s_sohu"><a href="#" data-rel=\'sohu\'><span class="sns-sohuweibo"></span>搜狐微博</a></li>\n                <li class="s_douban"><a href="#" data-rel=\'douban\'><span class="sns-douban"></span>豆瓣网</a></li>\n                <li class="s_qq_k"><a href="#" data-rel=\'qzone\'><span class="sns-qzone"></span>Qzone</a></li>\n            </ul>\n            <button class="share-cancel">取消</button>\n        </div>\n\n</div>\n    <script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n    <script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n<script type="text/javascript" src="',
	(u = l.__root) ? u = u.call(a, {
		hash: {},
		data: s
	}) : (u = a.__root, u = typeof u === f ? u.apply(a) : u),
	v += m(u) + 'script.min.js"></script>\n<script type="text/javascript" src="',
	(u = l.__root) ? u = u.call(a, {
		hash: {},
		data: s
	}) : (u = a.__root, u = typeof u === f ? u.apply(a) : u),
	v += m(u) + 'share.js"></script>\n    <script type="text/javascript">\n    (function($) {\n\n        // ready event\n        $(function() {\n            $("#share-to a").click(function(e) {\n                var sLink =  $(this).attr("data-rel");\n                share_to(sLink);\n                $(".button_share").trigger(\'click\');\n                e.preventDefault();\n            });\n\n            // share to\n            $(".button_share").on(\'click\', function(e) {\n                var $sharePanel = $("#share-to");\n\n                if ($sharePanel.is(":hidden")) {\n                    $(document).lnOverlay(\'show\');\n                } else {\n                    $(document).lnOverlay(\'hide\');\n                }\n                $sharePanel.slideToggle(300);\n                e.preventDefault();\n            });\n\n            $(".share-cancel").click(function(e) {\n                $(".button_share").trigger(\'click\');\n            });\n\n        });\n\n        // window load event\n        $(function() {\n            // The slider being synced must be initialized first\n            $(\'#carousel\').flexslider({\n                animation: "slide",\n                controlNav: false,\n                animationLoop: false,\n                slideshow: false,\n                itemWidth: 48,\n                itemMargin: 4,\n                asNavFor: \'#slider\'\n            });\n\n            $(\'#slider\').flexslider({\n                animation: "slide",\n                controlNav: false,\n                directionNav: false,\n                animationLoop: false,\n                slideshow: false,\n                sync: "#carousel"\n            });\n        });\n\n        $.fn.extend({\n            lnOverlay: function(action) {\n                var action = action,\n                    $ol = $("#overlay"),\n                    $lvDom = $("<div id=\'overlay\'></div>");\n\n                if ($ol.length === 0) {\n                    $("body").append($lvDom);\n                }\n\n                if (action == "hide") {\n                    $ol.hide(50)\n                } else if (action == "remove") {\n                    $ol.remove();\n                } else {\n                    $ol.show();\n                }\n            }\n        });\n    })(jQuery);\n</script>\n    <div class="stat-code">\n        <script type="text/javascript" src="',
	(u = l.__root) ? u = u.call(a, {
		hash: {},
		data: s
	}) : (u = a.__root, u = typeof u === f ? u.apply(a) : u),
	v += m(u) + 's_code.js"></script>\n        <script type="text/javascript">\n            s.pageName="M:产品详情: ' + m((h = a.content, h = null == h || h === !1 ? h: h.html, h = null == h || h === !1 ? h: h.statTitle, typeof h === f ? h.apply(a) : h)) + '" // 记录友好页面名称\n            s.channel="M:产品详情" // 记录友好区域名称\n            s.prop1="M:产品详情" // 记录友好页面类型名称\n            s.prop2="M:产品详情" // 记录友好网站子区域名称，如没有子区域，与s.channel的值相同\n            s.prop3="M:产品详情" //记录友好网站子子区域名称，如没有子子区域，与s.prop2的值相同\n            s.products="' + m((h = a.content, h = null == h || h === !1 ? h: h.html, h = null == h || h === !1 ? h: h.statId, typeof h === f ? h.apply(a) : h)) + '"; //记录product ID\n            s.events="event29"; //记录云适配网站产品浏览\n            /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/\n            var s_code=s.t();if(s_code)document.write(s_code)//--></script>\n        <script type="text/javascript"><!--\n        if(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')\n        //--></script><noscript><img src="http://lenovochina.122.2o7.net/b/ss/lenovochina-prd/1/H.26--NS/0"\n                                     height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->\n        <!-- End SiteCatalyst code version: H.26. -->\n    </div>\n',
	u = y.invokePartial(t.allmobilize_track, "allmobilize_track", a, l, t, s),
	(u || 0 === u) && (v += u),
	v += "</body>\n</html>\n"
};
window.AMPlatform.__tmpl["detail-gallery"] = function(n, e, l, t, i) {
	function a(n) {
		var e = "";
		return e += '\n                    <li><img src="' + d(typeof n === c ? n.apply(n) : n) + '"></li>\n                '
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	l = this.merge(l, n.helpers),
	t = this.merge(t, n.partials),
	i = i || {};
	var s, r, o = "",
	c = "function",
	d = this.escapeExpression,
	h = this;
	return o += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(s = l.title) ? s = s.call(e, {
		hash: {},
		data: i
	}) : (s = e.title, s = typeof s === c ? s.apply(e) : s),
	o += d(s) + '</title>\n  <link rel="stylesheet" href="',
	(s = l.__stylePath) ? s = s.call(e, {
		hash: {},
		data: i
	}) : (s = e.__stylePath, s = typeof s === c ? s.apply(e) : s),
	o += d(s) + '" />\n    <style type="text/css">\n        .ln {\n            background: #FFF;\n        }\n    </style>\n</head>\n<body class="ln">\n    <div class="pdt-gallery">\n        <div id="slider" class="flexslider">\n            <ul class="slides">\n                ',
	r = l.each.call(e, (s = e.content, s = null == s || s === !1 ? s: s.html, null == s || s === !1 ? s: s.slides), {
		hash: {},
		inverse: h.noop,
		fn: h.program(1, a, i),
		data: i
	}),
	(r || 0 === r) && (o += r),
	o += '\n            </ul>\n        </div>\n        <div id="carousel" class="flexslider">\n            <ul class="slides flex-control-thumbs">\n                ',
	r = l.each.call(e, (s = e.content, s = null == s || s === !1 ? s: s.html, null == s || s === !1 ? s: s.tmbs), {
		hash: {},
		inverse: h.noop,
		fn: h.program(1, a, i),
		data: i
	}),
	(r || 0 === r) && (o += r),
	o += '\n            </ul>\n        </div>\n\n    </div>\n\n    <script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n    <script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n    <script type="text/javascript">\n    (function($) {\n        // window load event\n        $(window).load(function() {\n            // The slider being synced must be initialized first\n            $(\'#carousel\').flexslider({\n                animation: "slide",\n                controlNav: false,\n                animationLoop: false,\n                slideshow: false,\n                itemWidth: 48,\n                itemMargin: 4,\n                asNavFor: \'#slider\'\n            });\n\n            $(\'#slider\').flexslider({\n                animation: "slide",\n                controlNav: false,\n                directionNav: false,\n                animationLoop: false,\n                slideshow: false,\n                sync: "#carousel",\n                start: function() {\n                    var galleryHeight = $(".pdt-gallery").height(),\n                        $iframe = $("[name=\'photoView\']", window.parent.document);\n                    if (!($iframe[0].style.height)) {\n                        $iframe.height((galleryHeight + 16) + "px");\n                    }\n                }\n            });\n        });\n    })(jQuery);\n</script>\n',
	r = h.invokePartial(t.allmobilize_track, "allmobilize_track", e, l, t, i),
	(r || 0 === r) && (o += r),
	o += "</body>\n</html>\n"
};
window.AMPlatform.__tmpl["series-thinklist"] = function(n, t, l, a, i) {
	function e(n, t) {
		var a, i, e = "";
		return e += '\n            <div class="flexslider ln-banner">\n                <ul class="slides">\n                    ',
		i = l.each.call(n, (a = n.content, a = null == a || a === !1 ? a: a.html, null == a || a === !1 ? a: a.slide), {
			hash: {},
			inverse: u.noop,
			fn: u.program(2, s, t),
			data: t
		}),
		(i || 0 === i) && (e += i),
		e += "\n                </ul>\n            </div>\n        "
	}
	function s(n, t) {
		var a, i = "";
		return i += '\n                        <li><a href="',
		(a = l._link) ? a = a.call(n, {
			hash: {},
			data: t
		}) : (a = n._link, a = typeof a === m ? a.apply(n) : a),
		i += v(a) + '"><img src="',
		(a = l._src) ? a = a.call(n, {
			hash: {},
			data: t
		}) : (a = n._src, a = typeof a === m ? a.apply(n) : a),
		i += v(a) + '" alt=""/></a></li>\n                    '
	}
	function r(n) {
		var t, l, a = "";
		return a += '\n            <div class="ln-s-all">\n                <h2 class="ln-s-title">\n                    ',
		t = n.content,
		t = null == t || t === !1 ? t: t.html,
		t = null == t || t === !1 ? t: t.title,
		l = typeof t === m ? t.apply(n) : t,
		(l || 0 === l) && (a += l),
		a += "\n                </h2>\n            </div>\n            "
	}
	function c(n, t) {
		var a, i, e = "";
		return e += '\n                <ul class="brand-list">\n                    ',
		i = l.each.call(n, (a = n.content, a = null == a || a === !1 ? a: a.html, null == a || a === !1 ? a: a.brands), {
			hash: {},
			inverse: u.noop,
			fn: u.program(7, o, t),
			data: t
		}),
		(i || 0 === i) && (e += i),
		e += "\n                </ul>\n            "
	}
	function o(n) {
		var t, l = "";
		return l += '\n                        <li class="s-item">',
		t = typeof n === m ? n.apply(n) : n,
		(t || 0 === t) && (l += t),
		l += "</li>\n                    "
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	l = this.merge(l, n.helpers),
	a = this.merge(a, n.partials),
	i = i || {};
	var p, h, d = "",
	m = "function",
	v = this.escapeExpression,
	u = this;
	return d += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(p = l.title) ? p = p.call(t, {
		hash: {},
		data: i
	}) : (p = t.title, p = typeof p === m ? p.apply(t) : p),
	d += v(p) + '</title>\n  <link rel="stylesheet" href="',
	(p = l.__stylePath) ? p = p.call(t, {
		hash: {},
		data: i
	}) : (p = t.__stylePath, p = typeof p === m ? p.apply(t) : p),
	d += v(p) + '" />\n</head>\n<body class="ln">\n	<div class="page" id="top">\n		<div class="hd header i-hd">\n            <h1><a href="http://www.lenovo.com.cn/" class="ir">Lenovo联想</a></h1>\n            <ul class="icon">\n                <li><a href="#search" class="icon-s link-panel ir" >搜索</a></li>\n                <li><a href="tel:4008222008" class="icon-tel ir">电话</a></li>\n                <li><a href="http://e.weibo.com/lenovo" target="_blank" class="icon-wb ir">微博</a></li>\n                <li><a href="#nav-panel" class="icon-grid link-panel ir">导航</a></li>\n            </ul>\n        </div>\n\n        ',
	(p = l.lnPanel) ? p = p.call(t, {
		hash: {},
		data: i
	}) : (p = t.lnPanel, p = typeof p === m ? p.apply(t) : p),
	(p || 0 === p) && (d += p),
	d += "\n\n        ",
	h = l["if"].call(t, (p = t.content, p = null == p || p === !1 ? p: p.html, null == p || p === !1 ? p: p.slide), {
		hash: {},
		inverse: u.noop,
		fn: u.program(1, e, i),
		data: i
	}),
	(h || 0 === h) && (d += h),
	d += '\n\n        <div class="content">\n\n            ',
	h = l["if"].call(t, (p = t.content, p = null == p || p === !1 ? p: p.html, null == p || p === !1 ? p: p.title), {
		hash: {},
		inverse: u.noop,
		fn: u.program(4, r, i),
		data: i
	}),
	(h || 0 === h) && (d += h),
	d += "\n            ",
	h = l["if"].call(t, (p = t.content, p = null == p || p === !1 ? p: p.html, null == p || p === !1 ? p: p.brands), {
		hash: {},
		inverse: u.noop,
		fn: u.program(6, c, i),
		data: i
	}),
	(h || 0 === h) && (d += h),
	d += "\n            ",
	p = t.content,
	p = null == p || p === !1 ? p: p.html,
	p = null == p || p === !1 ? p: p.body,
	h = typeof p === m ? p.apply(t) : p,
	(h || 0 === h) && (d += h),
	d += '\n    </div>\n\n    <div class="ft">\n        <div class="ft-top"><a href="#top">回到顶部</a></div>\n      ',
	h = u.invokePartial(a.switch_mode, "switch_mode", t, l, a, i),
	(h || 0 === h) && (d += h),
	d += '\n        <div class="ft-cr">\n            版权所有：1998－2013 联想集团&nbsp; &nbsp;| <a href="http://www.lenovo.com.cn/Public/public_bottom/legal.shtml" target="_blank">法律公告</a> | <a href="http://www.lenovo.com.cn/Public/public_bottom/privacy.shtml" target="_blank">隐私保护</a><br><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11035381号</a>&nbsp; &nbsp;京公网安备110108007970号\n\n        </div>\n    </div>\n\n	</div>\n    <script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n    <script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n<script type="text/javascript" src="',
	(h = l.__root) ? h = h.call(t, {
		hash: {},
		data: i
	}) : (h = t.__root, h = typeof h === m ? h.apply(t) : h),
	d += v(h) + 'script.min.js"></script>\n    <div class="stat-code">\n        <script type="text/javascript" src="',
	(h = l.__root) ? h = h.call(t, {
		hash: {},
		data: i
	}) : (h = t.__root, h = typeof h === m ? h.apply(t) : h),
	d += v(h) + 's_code.js"></script>\n        <script type="text/javascript">\n            s.pageName="M:Think选件:' + v((p = t.content, p = null == p || p === !1 ? p: p.html, p = null == p || p === !1 ? p: p.title, typeof p === m ? p.apply(t) : p)) + '";\n            s.channel="M:Think选件";\n            s.prop1="M:Think选件";\n            s.prop2="M:Think选件";\n            s.prop3="M:Think选件";\n            /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/\n            var s_code=s.t();if(s_code)document.write(s_code)//-->\n        </script>\n        <script type="text/javascript"><!--\n        if(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')\n        //--></script><noscript><img src="http://lenovochina.122.2o7.net/b/ss/lenovochina-prd/1/H.26--NS/0"\n                                     height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->\n        <!-- End SiteCatalyst code version: H.26. -->\n    </div>\n',
	h = u.invokePartial(a.allmobilize_track, "allmobilize_track", t, l, a, i),
	(h || 0 === h) && (d += h),
	d += "</body>\n</html>\n"
};
window.AMPlatform.__tmpl.survey = function(t, n, a, i, l) {
	function e(t) {
		var n, a, i = "";
		return i += '\n      <h2 class="ln-s-title">\n        ',
		n = t.content,
		n = null == n || n === !1 ? n: n.html,
		n = null == n || n === !1 ? n: n.title,
		a = typeof n === r ? n.apply(t) : n,
		(a || 0 === a) && (i += a),
		i += "\n      </h2>\n    "
	}
	this.compilerInfo = [4, ">= 1.0.0"],
	a = this.merge(a, t.helpers),
	i = this.merge(i, t.partials),
	l = l || {};
	var s, c, p = "",
	r = "function",
	o = this.escapeExpression,
	h = this;
	return p += '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">\n  <title>',
	(s = a.title) ? s = s.call(n, {
		hash: {},
		data: l
	}) : (s = n.title, s = typeof s === r ? s.apply(n) : s),
	p += o(s) + '</title>\n  <link rel="stylesheet" href="',
	(s = a.__stylePath) ? s = s.call(n, {
		hash: {},
		data: l
	}) : (s = n.__stylePath, s = typeof s === r ? s.apply(n) : s),
	p += o(s) + '" />\n  <script type="text/javascript">\n    ',
	s = n.content,
	s = null == s || s === !1 ? s: s.html,
	s = null == s || s === !1 ? s: s.script,
	c = typeof s === r ? s.apply(n) : s,
	(c || 0 === c) && (p += c),
	p += '\n  </script>\n</head>\n<body class="ln">\n<div class="page ' + o((s = n.content, s = null == s || s === !1 ? s: s.html, s = null == s || s === !1 ? s: s.bdClass, typeof s === r ? s.apply(n) : s)) + '" id="top">\n  <div class="hd header i-hd">\n    <h1><a href="http://www.lenovo.com.cn/" class="ir">Lenovo联想</a></h1>\n    <ul class="icon">\n      <li><a href="#search" class="icon-s link-panel ir">搜索</a></li>\n      <li><a href="tel:4008222008" class="icon-tel ir">电话</a></li>\n      <li><a href="http://e.weibo.com/lenovo" target="_blank" class="icon-wb ir">微博</a></li>\n      <li><a href="#nav-panel" class="icon-grid link-panel ir">导航</a></li>\n    </ul>\n  </div>\n\n  ',
	(c = a.lnPanel) ? c = c.call(n, {
		hash: {},
		data: l
	}) : (c = n.lnPanel, c = typeof c === r ? c.apply(n) : c),
	(c || 0 === c) && (p += c),
	p += '\n\n  <div class="content">\n    ',
	c = a["if"].call(n, (s = n.content, s = null == s || s === !1 ? s: s.html, null == s || s === !1 ? s: s.title), {
		hash: {},
		inverse: h.noop,
		fn: h.program(1, e, l),
		data: l
	}),
	(c || 0 === c) && (p += c),
	p += '\n\n    <div class="entry">\n      ',
	s = n.content,
	s = null == s || s === !1 ? s: s.html,
	s = null == s || s === !1 ? s: s.body,
	c = typeof s === r ? s.apply(n) : s,
	(c || 0 === c) && (p += c),
	p += '\n    </div>\n\n  </div>\n\n  <div class="ft">\n    <div class="ft-top"><a href="#top">回到顶部</a></div>\n    ',
	c = h.invokePartial(i.switch_mode, "switch_mode", n, a, i, l),
	(c || 0 === c) && (p += c),
	p += '\n    <div class="ft-cr">\n      版权所有：1998－2013 联想集团&nbsp; &nbsp;| <a href="http://www.lenovo.com.cn/Public/public_bottom/legal.shtml" target="_blank">法律公告</a> | <a href="http://www.lenovo.com.cn/Public/public_bottom/privacy.shtml" target="_blank">隐私保护</a><br><a href="http://www.miibeian.gov.cn/" target="_blank">京ICP备11035381号</a>&nbsp; &nbsp;京公网安备110108007970号\n\n    </div>\n  </div>\n</div>\n<script src="http://s.yunshipei.com/javascript/jquery-1.10.0.min.js"></script>\n<script type="text/javascript" src="http://s.yunshipei.com/javascript/jquery.flexslider.min.js"></script>\n<script type="text/javascript" src="',
	(c = a.__root) ? c = c.call(n, {
		hash: {},
		data: l
	}) : (c = n.__root, c = typeof c === r ? c.apply(n) : c),
	p += o(c) + 'script.min.js"></script>\n  <script type="text/javascript">\n    (function($){\n      $(function() {\n\n      });\n    })(window.jQuery)\n  </script>\n<div class="stat-code">\n  <script type="text/javascript" src="',
	(c = a.__root) ? c = c.call(n, {
		hash: {},
		data: l
	}) : (c = n.__root, c = typeof c === r ? c.apply(n) : c),
	p += o(c) + 's_code.js"></script>\n  <script type="text/javascript">\n    s.pageName="M:满意度调查:联想网站满意度调查";\n    s.channel="M:满意度调查";\n    s.prop1="M:满意度调查";\n    s.prop2="M:满意度调查";\n    s.prop3="M:满意度调查";\n    /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/\n    var s_code=s.t();if(s_code)document.write(s_code)//--></script>\n  <script type="text/javascript"><!--\n  if(navigator.appVersion.indexOf(\'MSIE\')>=0)document.write(unescape(\'%3C\')+\'\\!-\'+\'-\')\n  //--></script><noscript><img src="http://lenovochina.122.2o7.net/b/ss/lenovochina-prd/1/H.26--NS/0"\n                               height="1" width="1" border="0" alt="" /></noscript><!--/DO NOT REMOVE/-->\n  <!-- End SiteCatalyst code version: H.26. -->\n</div>\n',
	c = h.invokePartial(i.allmobilize_track, "allmobilize_track", n, a, i, l),
	(c || 0 === c) && (p += c),
	p += "</body>\n</html>"
}; !
function(t) {
	String.prototype.trim === t && (String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "")
	}),
	Array.prototype.reduce === t && (Array.prototype.reduce = function(n) {
		if (void 0 === this || null === this) throw new TypeError;
		var e, i = Object(this),
		r = i.length >>> 0,
		o = 0;
		if ("function" != typeof n) throw new TypeError;
		if (0 == r && 1 == arguments.length) throw new TypeError;
		if (arguments.length >= 2) e = arguments[1];
		else for (;;) {
			if (o in i) {
				e = i[o++];
				break
			}
			if (++o >= r) throw new TypeError
		}
		for (; r > o;) o in i && (e = n.call(t, e, i[o], o, i)),
		o++;
		return e
	})
} ();
var Zepto = function() {
	function t(t) {
		return null == t ? String(t) : X[W.call(t)] || "object"
	}
	function n(n) {
		return "function" == t(n)
	}
	function e(t) {
		return null != t && t == t.window
	}
	function i(t) {
		return null != t && t.nodeType == t.DOCUMENT_NODE
	}
	function r(n) {
		return "object" == t(n)
	}
	function o(t) {
		return r(t) && !e(t) && t.__proto__ == Object.prototype
	}
	function a(t) {
		return t instanceof Array
	}
	function s(t) {
		return "number" == typeof t.length
	}
	function u(t) {
		return A.call(t,
		function(t) {
			return null != t
		})
	}
	function c(t) {
		return t.length > 0 ? j.fn.concat.apply([], t) : t
	}
	function l(t) {
		return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
	}
	function f(t) {
		return t in _ ? _[t] : _[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
	}
	function h(t, n) {
		return "number" != typeof n || Z[l(t)] ? n: n + "px"
	}
	function p(t) {
		var n, e;
		return $[t] || (n = k.createElement(t), k.body.appendChild(n), e = M(n, "").getPropertyValue("display"), n.parentNode.removeChild(n), "none" == e && (e = "block"), $[t] = e),
		$[t]
	}
	function d(t) {
		return "children" in t ? P.call(t.children) : j.map(t.childNodes,
		function(t) {
			return 1 == t.nodeType ? t: void 0
		})
	}
	function m(t, n, e) {
		for (T in n) e && (o(n[T]) || a(n[T])) ? (o(n[T]) && !o(t[T]) && (t[T] = {}), a(n[T]) && !a(t[T]) && (t[T] = []), m(t[T], n[T], e)) : n[T] !== E && (t[T] = n[T])
	}
	function v(t, n) {
		return n === E ? j(t) : j(t).filter(n)
	}
	function g(t, e, i, r) {
		return n(e) ? e.call(t, i, r) : e
	}
	function y(t, n, e) {
		null == e ? t.removeAttribute(n) : t.setAttribute(n, e)
	}
	function b(t, n) {
		var e = t.className,
		i = e && e.baseVal !== E;
		return n === E ? i ? e.baseVal: e: (i ? e.baseVal = n: t.className = n, void 0)
	}
	function x(t) {
		var n;
		try {
			return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null: isNaN(n = Number(t)) ? /^[\[\{]/.test(t) ? j.parseJSON(t) : t: n) : t
		} catch(e) {
			return t
		}
	}
	function w(t, n) {
		n(t);
		for (var e in t.childNodes) w(t.childNodes[e], n)
	}
	var E, T, j, S, N, C, O = [],
	P = O.slice,
	A = O.filter,
	k = window.document,
	$ = {},
	_ = {},
	M = k.defaultView.getComputedStyle,
	Z = {
		"column-count": 1,
		columns: 1,
		"font-weight": 1,
		"line-height": 1,
		opacity: 1,
		"z-index": 1,
		zoom: 1
	},
	z = /^\s*<(\w+|!)[^>]*>/,
	R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	D = /^(?:body|html)$/i,
	L = ["val", "css", "html", "text", "data", "width", "height", "offset"],
	q = ["after", "prepend", "before", "append"],
	F = k.createElement("table"),
	B = k.createElement("tr"),
	I = {
		tr: k.createElement("tbody"),
		tbody: F,
		thead: F,
		tfoot: F,
		td: B,
		th: B,
		"*": k.createElement("div")
	},
	H = /complete|loaded|interactive/,
	U = /^\.([\w-]+)$/,
	V = /^#([\w-]*)$/,
	J = /^[\w-]+$/,
	X = {},
	W = X.toString,
	Y = {},
	G = k.createElement("div");
	return Y.matches = function(t, n) {
		if (!t || 1 !== t.nodeType) return ! 1;
		var e = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
		if (e) return e.call(t, n);
		var i, r = t.parentNode,
		o = !r;
		return o && (r = G).appendChild(t),
		i = ~Y.qsa(r, n).indexOf(t),
		o && G.removeChild(t),
		i
	},
	N = function(t) {
		return t.replace(/-+(.)?/g,
		function(t, n) {
			return n ? n.toUpperCase() : ""
		})
	},
	C = function(t) {
		return A.call(t,
		function(n, e) {
			return t.indexOf(n) == e
		})
	},
	Y.fragment = function(t, n, e) {
		t.replace && (t = t.replace(R, "<$1></$2>")),
		n === E && (n = z.test(t) && RegExp.$1),
		n in I || (n = "*");
		var i, r, a = I[n];
		return a.innerHTML = "" + t,
		r = j.each(P.call(a.childNodes),
		function() {
			a.removeChild(this)
		}),
		o(e) && (i = j(r), j.each(e,
		function(t, n) {
			L.indexOf(t) > -1 ? i[t](n) : i.attr(t, n)
		})),
		r
	},
	Y.Z = function(t, n) {
		return t = t || [],
		t.__proto__ = j.fn,
		t.selector = n || "",
		t
	},
	Y.isZ = function(t) {
		return t instanceof Y.Z
	},
	Y.init = function(t, e) {
		if (t) {
			if (n(t)) return j(k).ready(t);
			if (Y.isZ(t)) return t;
			var i;
			if (a(t)) i = u(t);
			else if (r(t)) i = [o(t) ? j.extend({},
			t) : t],
			t = null;
			else if (z.test(t)) i = Y.fragment(t.trim(), RegExp.$1, e),
			t = null;
			else {
				if (e !== E) return j(e).find(t);
				i = Y.qsa(k, t)
			}
			return Y.Z(i, t)
		}
		return Y.Z()
	},
	j = function(t, n) {
		return Y.init(t, n)
	},
	j.extend = function(t) {
		var n, e = P.call(arguments, 1);
		return "boolean" == typeof t && (n = t, t = e.shift()),
		e.forEach(function(e) {
			m(t, e, n)
		}),
		t
	},
	Y.qsa = function(t, n) {
		var e;
		return i(t) && V.test(n) ? (e = t.getElementById(RegExp.$1)) ? [e] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : P.call(U.test(n) ? t.getElementsByClassName(RegExp.$1) : J.test(n) ? t.getElementsByTagName(n) : t.querySelectorAll(n))
	},
	j.contains = function(t, n) {
		return t !== n && t.contains(n)
	},
	j.type = t,
	j.isFunction = n,
	j.isWindow = e,
	j.isArray = a,
	j.isPlainObject = o,
	j.isEmptyObject = function(t) {
		var n;
		for (n in t) return ! 1;
		return ! 0
	},
	j.inArray = function(t, n, e) {
		return O.indexOf.call(n, t, e)
	},
	j.camelCase = N,
	j.trim = function(t) {
		return t.trim()
	},
	j.uuid = 0,
	j.support = {},
	j.expr = {},
	j.map = function(t, n) {
		var e, i, r, o = [];
		if (s(t)) for (i = 0; i < t.length; i++) e = n(t[i], i),
		null != e && o.push(e);
		else for (r in t) e = n(t[r], r),
		null != e && o.push(e);
		return c(o)
	},
	j.each = function(t, n) {
		var e, i;
		if (s(t)) {
			for (e = 0; e < t.length; e++) if (n.call(t[e], e, t[e]) === !1) return t
		} else for (i in t) if (n.call(t[i], i, t[i]) === !1) return t;
		return t
	},
	j.grep = function(t, n) {
		return A.call(t, n)
	},
	window.JSON && (j.parseJSON = JSON.parse),
	j.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
	function(t, n) {
		X["[object " + n + "]"] = n.toLowerCase()
	}),
	j.fn = {
		forEach: O.forEach,
		reduce: O.reduce,
		push: O.push,
		sort: O.sort,
		indexOf: O.indexOf,
		concat: O.concat,
		map: function(t) {
			return j(j.map(this,
			function(n, e) {
				return t.call(n, e, n)
			}))
		},
		slice: function() {
			return j(P.apply(this, arguments))
		},
		ready: function(t) {
			return H.test(k.readyState) ? t(j) : k.addEventListener("DOMContentLoaded",
			function() {
				t(j)
			},
			!1),
			this
		},
		get: function(t) {
			return t === E ? P.call(this) : this[t >= 0 ? t: t + this.length]
		},
		toArray: function() {
			return this.get()
		},
		size: function() {
			return this.length
		},
		remove: function() {
			return this.each(function() {
				null != this.parentNode && this.parentNode.removeChild(this)
			})
		},
		each: function(t) {
			return O.every.call(this,
			function(n, e) {
				return t.call(n, e, n) !== !1
			}),
			this
		},
		filter: function(t) {
			return n(t) ? this.not(this.not(t)) : j(A.call(this,
			function(n) {
				return Y.matches(n, t)
			}))
		},
		add: function(t, n) {
			return j(C(this.concat(j(t, n))))
		},
		is: function(t) {
			return this.length > 0 && Y.matches(this[0], t)
		},
		not: function(t) {
			var e = [];
			if (n(t) && t.call !== E) this.each(function(n) {
				t.call(this, n) || e.push(this)
			});
			else {
				var i = "string" == typeof t ? this.filter(t) : s(t) && n(t.item) ? P.call(t) : j(t);
				this.forEach(function(t) {
					i.indexOf(t) < 0 && e.push(t)
				})
			}
			return j(e)
		},
		has: function(t) {
			return this.filter(function() {
				return r(t) ? j.contains(this, t) : j(this).find(t).size()
			})
		},
		eq: function(t) {
			return - 1 === t ? this.slice(t) : this.slice(t, +t + 1)
		},
		first: function() {
			var t = this[0];
			return t && !r(t) ? t: j(t)
		},
		last: function() {
			var t = this[this.length - 1];
			return t && !r(t) ? t: j(t)
		},
		find: function(t) {
			var n, e = this;
			return n = "object" == typeof t ? j(t).filter(function() {
				var t = this;
				return O.some.call(e,
				function(n) {
					return j.contains(n, t)
				})
			}) : 1 == this.length ? j(Y.qsa(this[0], t)) : this.map(function() {
				return Y.qsa(this, t)
			})
		},
		closest: function(t, n) {
			var e = this[0],
			r = !1;
			for ("object" == typeof t && (r = j(t)); e && !(r ? r.indexOf(e) >= 0 : Y.matches(e, t));) e = e !== n && !i(e) && e.parentNode;
			return j(e)
		},
		parents: function(t) {
			for (var n = [], e = this; e.length > 0;) e = j.map(e,
			function(t) {
				return (t = t.parentNode) && !i(t) && n.indexOf(t) < 0 ? (n.push(t), t) : void 0
			});
			return v(n, t)
		},
		parent: function(t) {
			return v(C(this.pluck("parentNode")), t)
		},
		children: function(t) {
			return v(this.map(function() {
				return d(this)
			}), t)
		},
		contents: function() {
			return this.map(function() {
				return P.call(this.childNodes)
			})
		},
		siblings: function(t) {
			return v(this.map(function(t, n) {
				return A.call(d(n.parentNode),
				function(t) {
					return t !== n
				})
			}), t)
		},
		empty: function() {
			return this.each(function() {
				this.innerHTML = ""
			})
		},
		pluck: function(t) {
			return j.map(this,
			function(n) {
				return n[t]
			})
		},
		show: function() {
			return this.each(function() {
				"none" == this.style.display && (this.style.display = null),
				"none" == M(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName))
			})
		},
		replaceWith: function(t) {
			return this.before(t).remove()
		},
		wrap: function(t) {
			var e = n(t);
			if (this[0] && !e) var i = j(t).get(0),
			r = i.parentNode || this.length > 1;
			return this.each(function(n) {
				j(this).wrapAll(e ? t.call(this, n) : r ? i.cloneNode(!0) : i)
			})
		},
		wrapAll: function(t) {
			if (this[0]) {
				j(this[0]).before(t = j(t));
				for (var n; (n = t.children()).length;) t = n.first();
				j(t).append(this)
			}
			return this
		},
		wrapInner: function(t) {
			var e = n(t);
			return this.each(function(n) {
				var i = j(this),
				r = i.contents(),
				o = e ? t.call(this, n) : t;
				r.length ? r.wrapAll(o) : i.append(o)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				j(this).replaceWith(j(this).children())
			}),
			this
		},
		clone: function() {
			return this.map(function() {
				return this.cloneNode(!0)
			})
		},
		hide: function() {
			return this.css("display", "none")
		},
		toggle: function(t) {
			return this.each(function() {
				var n = j(this); (t === E ? "none" == n.css("display") : t) ? n.show() : n.hide()
			})
		},
		prev: function(t) {
			return j(this.pluck("previousElementSibling")).filter(t || "*")
		},
		next: function(t) {
			return j(this.pluck("nextElementSibling")).filter(t || "*")
		},
		html: function(t) {
			return t === E ? this.length > 0 ? this[0].innerHTML: null: this.each(function(n) {
				var e = this.innerHTML;
				j(this).empty().append(g(this, t, n, e))
			})
		},
		text: function(t) {
			return t === E ? this.length > 0 ? this[0].textContent: null: this.each(function() {
				this.textContent = t
			})
		},
		attr: function(t, n) {
			var e;
			return "string" == typeof t && n === E ? 0 == this.length || 1 !== this[0].nodeType ? E: "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(e = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : e: this.each(function(e) {
				if (1 === this.nodeType) if (r(t)) for (T in t) y(this, T, t[T]);
				else y(this, t, g(this, n, e, this.getAttribute(t)))
			})
		},
		removeAttr: function(t) {
			return this.each(function() {
				1 === this.nodeType && y(this, t)
			})
		},
		prop: function(t, n) {
			return n === E ? this[0] && this[0][t] : this.each(function(e) {
				this[t] = g(this, n, e, this[t])
			})
		},
		data: function(t, n) {
			var e = this.attr("data-" + l(t), n);
			return null !== e ? x(e) : E
		},
		val: function(t) {
			return t === E ? this[0] && (this[0].multiple ? j(this[0]).find("option").filter(function() {
				return this.selected
			}).pluck("value") : this[0].value) : this.each(function(n) {
				this.value = g(this, t, n, this.value)
			})
		},
		offset: function(t) {
			if (t) return this.each(function(n) {
				var e = j(this),
				i = g(this, t, n, e.offset()),
				r = e.offsetParent().offset(),
				o = {
					top: i.top - r.top,
					left: i.left - r.left
				};
				"static" == e.css("position") && (o.position = "relative"),
				e.css(o)
			});
			if (0 == this.length) return null;
			var n = this[0].getBoundingClientRect();
			return {
				left: n.left + window.pageXOffset,
				top: n.top + window.pageYOffset,
				width: Math.round(n.width),
				height: Math.round(n.height)
			}
		},
		css: function(n, e) {
			if (arguments.length < 2 && "string" == typeof n) return this[0] && (this[0].style[N(n)] || M(this[0], "").getPropertyValue(n));
			var i = "";
			if ("string" == t(n)) e || 0 === e ? i = l(n) + ":" + h(n, e) : this.each(function() {
				this.style.removeProperty(l(n))
			});
			else for (T in n) n[T] || 0 === n[T] ? i += l(T) + ":" + h(T, n[T]) + ";": this.each(function() {
				this.style.removeProperty(l(T))
			});
			return this.each(function() {
				this.style.cssText += ";" + i
			})
		},
		index: function(t) {
			return t ? this.indexOf(j(t)[0]) : this.parent().children().indexOf(this[0])
		},
		hasClass: function(t) {
			return O.some.call(this,
			function(t) {
				return this.test(b(t))
			},
			f(t))
		},
		addClass: function(t) {
			return this.each(function(n) {
				S = [];
				var e = b(this),
				i = g(this, t, n, e);
				i.split(/\s+/g).forEach(function(t) {
					j(this).hasClass(t) || S.push(t)
				},
				this),
				S.length && b(this, e + (e ? " ": "") + S.join(" "))
			})
		},
		removeClass: function(t) {
			return this.each(function(n) {
				return t === E ? b(this, "") : (S = b(this), g(this, t, n, S).split(/\s+/g).forEach(function(t) {
					S = S.replace(f(t), " ")
				}), b(this, S.trim()), void 0)
			})
		},
		toggleClass: function(t, n) {
			return this.each(function(e) {
				var i = j(this),
				r = g(this, t, e, b(this));
				r.split(/\s+/g).forEach(function(t) { (n === E ? !i.hasClass(t) : n) ? i.addClass(t) : i.removeClass(t)
				})
			})
		},
		scrollTop: function() {
			return this.length ? "scrollTop" in this[0] ? this[0].scrollTop: this[0].scrollY: void 0
		},
		position: function() {
			if (this.length) {
				var t = this[0],
				n = this.offsetParent(),
				e = this.offset(),
				i = D.test(n[0].nodeName) ? {
					top: 0,
					left: 0
				}: n.offset();
				return e.top -= parseFloat(j(t).css("margin-top")) || 0,
				e.left -= parseFloat(j(t).css("margin-left")) || 0,
				i.top += parseFloat(j(n[0]).css("border-top-width")) || 0,
				i.left += parseFloat(j(n[0]).css("border-left-width")) || 0,
				{
					top: e.top - i.top,
					left: e.left - i.left
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var t = this.offsetParent || k.body; t && !D.test(t.nodeName) && "static" == j(t).css("position");) t = t.offsetParent;
				return t
			})
		}
	},
	j.fn.detach = j.fn.remove,
	["width", "height"].forEach(function(t) {
		j.fn[t] = function(n) {
			var r, o = this[0],
			a = t.replace(/./,
			function(t) {
				return t[0].toUpperCase()
			});
			return n === E ? e(o) ? o["inner" + a] : i(o) ? o.documentElement["offset" + a] : (r = this.offset()) && r[t] : this.each(function(e) {
				o = j(this),
				o.css(t, g(this, n, e, o[t]()))
			})
		}
	}),
	q.forEach(function(n, e) {
		var i = e % 2;
		j.fn[n] = function() {
			var n, r, o = j.map(arguments,
			function(e) {
				return n = t(e),
				"object" == n || "array" == n || null == e ? e: Y.fragment(e)
			}),
			a = this.length > 1;
			return o.length < 1 ? this: this.each(function(t, n) {
				r = i ? n: n.parentNode,
				n = 0 == e ? n.nextSibling: 1 == e ? n.firstChild: 2 == e ? n: null,
				o.forEach(function(t) {
					if (a) t = t.cloneNode(!0);
					else if (!r) return j(t).remove();
					w(r.insertBefore(t, n),
					function(t) {
						null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
					})
				})
			})
		},
		j.fn[i ? n + "To": "insert" + (e ? "Before": "After")] = function(t) {
			return j(t)[n](this),
			this
		}
	}),
	Y.Z.prototype = j.fn,
	Y.uniq = C,
	Y.deserializeValue = x,
	j.zepto = Y,
	j
} ();
window.Zepto = Zepto,
"$" in window || (window.$ = Zepto),
function(t) {
	function n(t) {
		var n = this.os = {},
		e = this.browser = {},
		i = t.match(/WebKit\/([\d.]+)/),
		r = t.match(/(Android)\s+([\d.]+)/),
		o = t.match(/(iPad).*OS\s([\d_]+)/),
		a = !o && t.match(/(iPhone\sOS)\s([\d_]+)/),
		s = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
		u = s && t.match(/TouchPad/),
		c = t.match(/Kindle\/([\d.]+)/),
		l = t.match(/Silk\/([\d._]+)/),
		f = t.match(/(BlackBerry).*Version\/([\d.]+)/),
		h = t.match(/(BB10).*Version\/([\d.]+)/),
		p = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
		d = t.match(/PlayBook/),
		m = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
		v = t.match(/Firefox\/([\d.]+)/); (e.webkit = !!i) && (e.version = i[1]),
		r && (n.android = !0, n.version = r[2]),
		a && (n.ios = n.iphone = !0, n.version = a[2].replace(/_/g, ".")),
		o && (n.ios = n.ipad = !0, n.version = o[2].replace(/_/g, ".")),
		s && (n.webos = !0, n.version = s[2]),
		u && (n.touchpad = !0),
		f && (n.blackberry = !0, n.version = f[2]),
		h && (n.bb10 = !0, n.version = h[2]),
		p && (n.rimtabletos = !0, n.version = p[2]),
		d && (e.playbook = !0),
		c && (n.kindle = !0, n.version = c[1]),
		l && (e.silk = !0, e.version = l[1]),
		!l && n.android && t.match(/Kindle Fire/) && (e.silk = !0),
		m && (e.chrome = !0, e.version = m[1]),
		v && (e.firefox = !0, e.version = v[1]),
		n.tablet = !!(o || d || r && !t.match(/Mobile/) || v && t.match(/Tablet/)),
		n.phone = !(n.tablet || !(r || a || s || f || h || m && t.match(/Android/) || m && t.match(/CriOS\/([\d.]+)/) || v && t.match(/Mobile/)))
	}
	n.call(t, navigator.userAgent),
	t.__detect = n
} (Zepto),
function(t) {
	function n(t) {
		return t._zid || (t._zid = p++)
	}
	function e(t, e, o, a) {
		if (e = i(e), e.ns) var s = r(e.ns);
		return (h[n(t)] || []).filter(function(t) {
			return ! (!t || e.e && t.e != e.e || e.ns && !s.test(t.ns) || o && n(t.fn) !== n(o) || a && t.sel != a)
		})
	}
	function i(t) {
		var n = ("" + t).split(".");
		return {
			e: n[0],
			ns: n.slice(1).sort().join(" ")
		}
	}
	function r(t) {
		return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
	}
	function o(n, e, i) {
		"string" != t.type(n) ? t.each(n, i) : n.split(/\s/).forEach(function(t) {
			i(t, e)
		})
	}
	function a(t, n) {
		return t.del && ("focus" == t.e || "blur" == t.e) || !!n
	}
	function s(t) {
		return m[t] || t
	}
	function u(e, r, u, c, l, f) {
		var p = n(e),
		d = h[p] || (h[p] = []);
		o(r, u,
		function(n, r) {
			var o = i(n);
			o.fn = r,
			o.sel = c,
			o.e in m && (r = function(n) {
				var e = n.relatedTarget;
				return ! e || e !== this && !t.contains(this, e) ? o.fn.apply(this, arguments) : void 0
			}),
			o.del = l && l(r, n);
			var u = o.del || r;
			o.proxy = function(t) {
				var n = u.apply(e, [t].concat(t.data));
				return n === !1 && (t.preventDefault(), t.stopPropagation()),
				n
			},
			o.i = d.length,
			d.push(o),
			e.addEventListener(s(o.e), o.proxy, a(o, f))
		})
	}
	function c(t, i, r, u, c) {
		var l = n(t);
		o(i || "", r,
		function(n, i) {
			e(t, n, i, u).forEach(function(n) {
				delete h[l][n.i],
				t.removeEventListener(s(n.e), n.proxy, a(n, c))
			})
		})
	}
	function l(n) {
		var e, i = {
			originalEvent: n
		};
		for (e in n) y.test(e) || void 0 === n[e] || (i[e] = n[e]);
		return t.each(b,
		function(t, e) {
			i[t] = function() {
				return this[e] = v,
				n[t].apply(n, arguments)
			},
			i[e] = g
		}),
		i
	}
	function f(t) {
		if (! ("defaultPrevented" in t)) {
			t.defaultPrevented = !1;
			var n = t.preventDefault;
			t.preventDefault = function() {
				this.defaultPrevented = !0,
				n.call(this)
			}
		}
	}
	var h = (t.zepto.qsa, {}),
	p = 1,
	d = {},
	m = {
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	};
	d.click = d.mousedown = d.mouseup = d.mousemove = "MouseEvents",
	t.event = {
		add: u,
		remove: c
	},
	t.proxy = function(e, i) {
		if (t.isFunction(e)) {
			var r = function() {
				return e.apply(i, arguments)
			};
			return r._zid = n(e),
			r
		}
		if ("string" == typeof i) return t.proxy(e[i], e);
		throw new TypeError("expected function")
	},
	t.fn.bind = function(t, n) {
		return this.each(function() {
			u(this, t, n)
		})
	},
	t.fn.unbind = function(t, n) {
		return this.each(function() {
			c(this, t, n)
		})
	},
	t.fn.one = function(t, n) {
		return this.each(function(e, i) {
			u(this, t, n, null,
			function(t, n) {
				return function() {
					var e = t.apply(i, arguments);
					return c(i, n, t),
					e
				}
			})
		})
	};
	var v = function() {
		return ! 0
	},
	g = function() {
		return ! 1
	},
	y = /^([A-Z]|layer[XY]$)/,
	b = {
		preventDefault: "isDefaultPrevented",
		stopImmediatePropagation: "isImmediatePropagationStopped",
		stopPropagation: "isPropagationStopped"
	};
	t.fn.delegate = function(n, e, i) {
		return this.each(function(r, o) {
			u(o, e, i, n,
			function(e) {
				return function(i) {
					var r, a = t(i.target).closest(n, o).get(0);
					return a ? (r = t.extend(l(i), {
						currentTarget: a,
						liveFired: o
					}), e.apply(a, [r].concat([].slice.call(arguments, 1)))) : void 0
				}
			})
		})
	},
	t.fn.undelegate = function(t, n, e) {
		return this.each(function() {
			c(this, n, e, t)
		})
	},
	t.fn.live = function(n, e) {
		return t(document.body).delegate(this.selector, n, e),
		this
	},
	t.fn.die = function(n, e) {
		return t(document.body).undelegate(this.selector, n, e),
		this
	},
	t.fn.on = function(n, e, i) {
		return ! e || t.isFunction(e) ? this.bind(n, e || i) : this.delegate(e, n, i)
	},
	t.fn.off = function(n, e, i) {
		return ! e || t.isFunction(e) ? this.unbind(n, e || i) : this.undelegate(e, n, i)
	},
	t.fn.trigger = function(n, e) {
		return ("string" == typeof n || t.isPlainObject(n)) && (n = t.Event(n)),
		f(n),
		n.data = e,
		this.each(function() {
			"dispatchEvent" in this && this.dispatchEvent(n)
		})
	},
	t.fn.triggerHandler = function(n, i) {
		var r, o;
		return this.each(function(a, s) {
			r = l("string" == typeof n ? t.Event(n) : n),
			r.data = i,
			r.target = s,
			t.each(e(s, n.type || n),
			function(t, n) {
				return o = n.proxy(r),
				r.isImmediatePropagationStopped() ? !1 : void 0
			})
		}),
		o
	},
	"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(n) {
		t.fn[n] = function(t) {
			return t ? this.bind(n, t) : this.trigger(n)
		}
	}),
	["focus", "blur"].forEach(function(n) {
		t.fn[n] = function(t) {
			return t ? this.bind(n, t) : this.each(function() {
				try {
					this[n]()
				} catch(t) {}
			}),
			this
		}
	}),
	t.Event = function(t, n) {
		"string" != typeof t && (n = t, t = n.type);
		var e = document.createEvent(d[t] || "Events"),
		i = !0;
		if (n) for (var r in n)"bubbles" == r ? i = !!n[r] : e[r] = n[r];
		return e.initEvent(t, i, !0, null, null, null, null, null, null, null, null, null, null, null, null),
		e.isDefaultPrevented = function() {
			return this.defaultPrevented
		},
		e
	}
} (Zepto),
function(t) {
	function n(n, e, i) {
		var r = t.Event(e);
		return t(n).trigger(r, i),
		!r.defaultPrevented
	}
	function e(t, e, i, r) {
		return t.global ? n(e || y, i, r) : void 0
	}
	function i(n) {
		n.global && 0 === t.active++&&e(n, null, "ajaxStart")
	}
	function r(n) {
		n.global && !--t.active && e(n, null, "ajaxStop")
	}
	function o(t, n) {
		var i = n.context;
		return n.beforeSend.call(i, t, n) === !1 || e(n, i, "ajaxBeforeSend", [t, n]) === !1 ? !1 : (e(n, i, "ajaxSend", [t, n]), void 0)
	}
	function a(t, n, i) {
		var r = i.context,
		o = "success";
		i.success.call(r, t, o, n),
		e(i, r, "ajaxSuccess", [n, i, t]),
		u(o, n, i)
	}
	function s(t, n, i, r) {
		var o = r.context;
		r.error.call(o, i, n, t),
		e(r, o, "ajaxError", [i, r, t]),
		u(n, i, r)
	}
	function u(t, n, i) {
		var o = i.context;
		i.complete.call(o, n, t),
		e(i, o, "ajaxComplete", [n, i]),
		r(i)
	}
	function c() {}
	function l(t) {
		return t && (t = t.split(";", 2)[0]),
		t && (t == T ? "html": t == E ? "json": x.test(t) ? "script": w.test(t) && "xml") || "text"
	}
	function f(t, n) {
		return (t + "&" + n).replace(/[&?]{1,2}/, "?")
	}
	function h(n) {
		n.processData && n.data && "string" != t.type(n.data) && (n.data = t.param(n.data, n.traditional)),
		!n.data || n.type && "GET" != n.type.toUpperCase() || (n.url = f(n.url, n.data))
	}
	function p(n, e, i, r) {
		var o = !t.isFunction(e);
		return {
			url: n,
			data: o ? e: void 0,
			success: o ? t.isFunction(i) ? i: void 0 : e,
			dataType: o ? r || i: i
		}
	}
	function d(n, e, i, r) {
		var o, a = t.isArray(e);
		t.each(e,
		function(e, s) {
			o = t.type(s),
			r && (e = i ? r: r + "[" + (a ? "": e) + "]"),
			!r && a ? n.add(s.name, s.value) : "array" == o || !i && "object" == o ? d(n, s, i, e) : n.add(e, s)
		})
	}
	var m, v, g = 0,
	y = window.document,
	b = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	x = /^(?:text|application)\/javascript/i,
	w = /^(?:text|application)\/xml/i,
	E = "application/json",
	T = "text/html",
	j = /^\s*$/;
	t.active = 0,
	t.ajaxJSONP = function(n) {
		if (! ("type" in n)) return t.ajax(n);
		var e, i = "jsonp" + ++g,
		r = y.createElement("script"),
		u = function() {
			clearTimeout(e),
			t(r).remove(),
			delete window[i]
		},
		l = function(t) {
			u(),
			t && "timeout" != t || (window[i] = c),
			s(null, t || "abort", f, n)
		},
		f = {
			abort: l
		};
		return o(f, n) === !1 ? (l("abort"), !1) : (window[i] = function(t) {
			u(),
			a(t, f, n)
		},
		r.onerror = function() {
			l("error")
		},
		r.src = n.url.replace(/=\?/, "=" + i), t("head").append(r), n.timeout > 0 && (e = setTimeout(function() {
			l("timeout")
		},
		n.timeout)), f)
	},
	t.ajaxSettings = {
		type: "GET",
		beforeSend: c,
		success: c,
		error: c,
		complete: c,
		context: null,
		global: !0,
		xhr: function() {
			return new window.XMLHttpRequest
		},
		accepts: {
			script: "text/javascript, application/javascript",
			json: E,
			xml: "application/xml, text/xml",
			html: T,
			text: "text/plain"
		},
		crossDomain: !1,
		timeout: 0,
		processData: !0,
		cache: !0
	},
	t.ajax = function(n) {
		var e = t.extend({},
		n || {});
		for (m in t.ajaxSettings) void 0 === e[m] && (e[m] = t.ajaxSettings[m]);
		i(e),
		e.crossDomain || (e.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(e.url) && RegExp.$2 != window.location.host),
		e.url || (e.url = window.location.toString()),
		h(e),
		e.cache === !1 && (e.url = f(e.url, "_=" + Date.now()));
		var r = e.dataType,
		u = /=\?/.test(e.url);
		if ("jsonp" == r || u) return u || (e.url = f(e.url, "callback=?")),
		t.ajaxJSONP(e);
		var p, d = e.accepts[r],
		g = {},
		y = /^([\w-]+:)\/\//.test(e.url) ? RegExp.$1: window.location.protocol,
		b = e.xhr();
		e.crossDomain || (g["X-Requested-With"] = "XMLHttpRequest"),
		d && (g.Accept = d, d.indexOf(",") > -1 && (d = d.split(",", 2)[0]), b.overrideMimeType && b.overrideMimeType(d)),
		(e.contentType || e.contentType !== !1 && e.data && "GET" != e.type.toUpperCase()) && (g["Content-Type"] = e.contentType || "application/x-www-form-urlencoded"),
		e.headers = t.extend(g, e.headers || {}),
		b.onreadystatechange = function() {
			if (4 == b.readyState) {
				b.onreadystatechange = c,
				clearTimeout(p);
				var n, i = !1;
				if (b.status >= 200 && b.status < 300 || 304 == b.status || 0 == b.status && "file:" == y) {
					r = r || l(b.getResponseHeader("content-type")),
					n = b.responseText;
					try {
						"script" == r ? (1, eval)(n) : "xml" == r ? n = b.responseXML: "json" == r && (n = j.test(n) ? null: t.parseJSON(n))
					} catch(o) {
						i = o
					}
					i ? s(i, "parsererror", b, e) : a(n, b, e)
				} else s(null, b.status ? "error": "abort", b, e)
			}
		};
		var x = "async" in e ? e.async: !0;
		b.open(e.type, e.url, x);
		for (v in e.headers) b.setRequestHeader(v, e.headers[v]);
		return o(b, e) === !1 ? (b.abort(), !1) : (e.timeout > 0 && (p = setTimeout(function() {
			b.onreadystatechange = c,
			b.abort(),
			s(null, "timeout", b, e)
		},
		e.timeout)), b.send(e.data ? e.data: null), b)
	},
	t.get = function() {
		return t.ajax(p.apply(null, arguments))
	},
	t.post = function() {
		var n = p.apply(null, arguments);
		return n.type = "POST",
		t.ajax(n)
	},
	t.getJSON = function() {
		var n = p.apply(null, arguments);
		return n.dataType = "json",
		t.ajax(n)
	},
	t.fn.load = function(n, e, i) {
		if (!this.length) return this;
		var r, o = this,
		a = n.split(/\s/),
		s = p(n, e, i),
		u = s.success;
		return a.length > 1 && (s.url = a[0], r = a[1]),
		s.success = function(n) {
			o.html(r ? t("<div>").html(n.replace(b, "")).find(r) : n),
			u && u.apply(o, arguments)
		},
		t.ajax(s),
		this
	};
	var S = encodeURIComponent;
	t.param = function(t, n) {
		var e = [];
		return e.add = function(t, n) {
			this.push(S(t) + "=" + S(n))
		},
		d(e, t, n),
		e.join("&").replace(/%20/g, "+")
	}
} (Zepto),
function(t) {
	t.fn.serializeArray = function() {
		var n, e = [];
		return t(Array.prototype.slice.call(this.get(0).elements)).each(function() {
			n = t(this);
			var i = n.attr("type");
			"fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && e.push({
				name: n.attr("name"),
				value: n.val()
			})
		}),
		e
	},
	t.fn.serialize = function() {
		var t = [];
		return this.serializeArray().forEach(function(n) {
			t.push(encodeURIComponent(n.name) + "=" + encodeURIComponent(n.value))
		}),
		t.join("&")
	},
	t.fn.submit = function(n) {
		if (n) this.bind("submit", n);
		else if (this.length) {
			var e = t.Event("submit");
			this.eq(0).trigger(e),
			e.defaultPrevented || this.get(0).submit()
		}
		return this
	}
} (Zepto),
function(t, n) {
	function e(t) {
		return i(t.replace(/([a-z])([A-Z])/, "$1-$2"))
	}
	function i(t) {
		return t.toLowerCase()
	}
	function r(t) {
		return o ? o + t: i(t)
	}
	var o, a, s, u, c, l, f, h, p = "",
	d = {
		Webkit: "webkit",
		Moz: "",
		O: "o",
		ms: "MS"
	},
	m = window.document,
	v = m.createElement("div"),
	g = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
	y = {};
	t.each(d,
	function(t, e) {
		return v.style[t + "TransitionProperty"] !== n ? (p = "-" + i(t) + "-", o = e, !1) : void 0
	}),
	a = p + "transform",
	y[s = p + "transition-property"] = y[u = p + "transition-duration"] = y[c = p + "transition-timing-function"] = y[l = p + "animation-name"] = y[f = p + "animation-duration"] = y[h = p + "animation-timing-function"] = "",
	t.fx = {
		off: o === n && v.style.transitionProperty === n,
		speeds: {
			_default: 400,
			fast: 200,
			slow: 600
		},
		cssPrefix: p,
		transitionEnd: r("TransitionEnd"),
		animationEnd: r("AnimationEnd")
	},
	t.fn.animate = function(n, e, i, r) {
		return t.isPlainObject(e) && (i = e.easing, r = e.complete, e = e.duration),
		e && (e = ("number" == typeof e ? e: t.fx.speeds[e] || t.fx.speeds._default) / 1e3),
		this.anim(n, e, i, r)
	},
	t.fn.anim = function(i, r, o, p) {
		var d, m, v, b = {},
		x = "",
		w = this,
		E = t.fx.transitionEnd;
		if (r === n && (r = .4), t.fx.off && (r = 0), "string" == typeof i) b[l] = i,
		b[f] = r + "s",
		b[h] = o || "linear",
		E = t.fx.animationEnd;
		else {
			m = [];
			for (d in i) g.test(d) ? x += d + "(" + i[d] + ") ": (b[d] = i[d], m.push(e(d)));
			x && (b[a] = x, m.push(a)),
			r > 0 && "object" == typeof i && (b[s] = m.join(", "), b[u] = r + "s", b[c] = o || "linear")
		}
		return v = function(n) {
			if ("undefined" != typeof n) {
				if (n.target !== n.currentTarget) return;
				t(n.target).unbind(E, v)
			}
			t(this).css(y),
			p && p.call(this)
		},
		r > 0 && this.bind(E, v),
		this.size() && this.get(0).clientLeft,
		this.css(b),
		0 >= r && setTimeout(function() {
			w.each(function() {
				v.call(this)
			})
		},
		0),
		this
	},
	v = null
} (Zepto); !
function() {
	var t = [],
	e = window.Zepto;
	if (e && !t.__proto__) {
		var o = function(e) {
			return t.push.apply(this, e),
			this
		};
		e.zepto.Z = function(t, e) {
			t = t || [];
			var r = new o(t);
			return r.selector = e || "",
			r
		},
		e.zepto.Z.prototype = o.prototype = e.fn,
		e.fn.concat = function() {
			var t = [];
			return t.push.apply(t, this),
			e.each(arguments,
			function(e, o) {
				"object" == typeof o && "number" == typeof o.length ? t.push.apply(t, o) : t.push(o)
			}),
			t
		},
		e.fn.empty = function() {
			return this.each(function(t, e) {
				for (; e.firstChild;) e.removeChild(e.firstChild)
			})
		};
		var r = /^\s*<(\w+)[^>]*>/,
		n = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		l = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			"*": [0, "", ""]
		};
		l.optgroup = l.option,
		l.tbody = l.tfoot = l.colgroup = l.caption = l.thead,
		l.th = l.td,
		e.zepto.fragment = function(e, o) {
			void 0 === o && (o = r.test(e) && RegExp.$1),
			e = e.toString().replace(n, "<$1></$2>");
			var a = l[o] || l["*"],
			p = a[0],
			i = document.createElement("div");
			for (i.innerHTML = a[1] + e + a[2]; p--;) i = i.lastChild;
			return t.slice.call(i.childNodes)
		}
	}
} (); !
function(t) {
	t.AMPlatform && (t.$ && t.$.noConflict ? t.AMPlatform.$ = t.$.noConflict(!0) : (t.AMPlatform.$ = t.Zepto, t.AMPlatform.$.support = t.AMPlatform.$.support || {},
	Zepto === t.$ && delete t.$, delete t.Zepto))
} (this);
var Handlebars = {}; !
function(e, r) {
	e.VERSION = "1.0.0",
	e.COMPILER_REVISION = 4,
	e.REVISION_CHANGES = {
		1 : "<= 1.0.rc.2",
		2 : "== 1.0.0-rc.3",
		3 : "== 1.0.0-rc.4",
		4 : ">= 1.0.0"
	},
	e.helpers = {},
	e.partials = {};
	var t = Object.prototype.toString,
	n = "[object Function]",
	i = "[object Object]";
	e.registerHelper = function(r, n, o) {
		if (t.call(r) === i) {
			if (o || n) throw new e.Exception("Arg not supported with multiple helpers");
			e.Utils.extend(this.helpers, r)
		} else o && (n.not = o),
		this.helpers[r] = n
	},
	e.registerPartial = function(r, n) {
		t.call(r) === i ? e.Utils.extend(this.partials, r) : this.partials[r] = n
	},
	e.registerHelper("helperMissing",
	function(e) {
		if (2 === arguments.length) return r;
		throw new Error("Missing helper: '" + e + "'")
	}),
	e.registerHelper("blockHelperMissing",
	function(r, i) {
		var o = i.inverse ||
		function() {},
		a = i.fn,
		l = t.call(r);
		return l === n && (r = r.call(this)),
		r === !0 ? a(this) : r === !1 || null == r ? o(this) : "[object Array]" === l ? r.length > 0 ? e.helpers.each(r, i) : o(this) : a(r)
	}),
	e.K = function() {},
	e.createFrame = Object.create ||
	function(r) {
		e.K.prototype = r;
		var t = new e.K;
		return e.K.prototype = null,
		t
	},
	e.logger = {
		DEBUG: 0,
		INFO: 1,
		WARN: 2,
		ERROR: 3,
		level: 3,
		methodMap: {
			0 : "debug",
			1 : "info",
			2 : "warn",
			3 : "error"
		},
		log: function(r, t) {
			if (e.logger.level <= r) {
				var n = e.logger.methodMap[r];
				"undefined" != typeof console && console[n] && console[n].call(console, t)
			}
		}
	},
	e.log = function(r, t) {
		e.logger.log(r, t)
	},
	e.registerHelper("each",
	function(r, i) {
		var o, a = i.fn,
		l = i.inverse,
		s = 0,
		p = "",
		c = t.call(r);
		if (c === n && (r = r.call(this)), i.data && (o = e.createFrame(i.data)), r && "object" == typeof r) if (r instanceof Array) for (var u = r.length; u > s; s++) o && (o.index = s),
		p += a(r[s], {
			data: o
		});
		else for (var f in r) r.hasOwnProperty(f) && (o && (o.key = f), p += a(r[f], {
			data: o
		}), s++);
		return 0 === s && (p = l(this)),
		p
	}),
	e.registerHelper("if",
	function(r, i) {
		var o = t.call(r);
		return o === n && (r = r.call(this)),
		!r || e.Utils.isEmpty(r) ? i.inverse(this) : i.fn(this)
	}),
	e.registerHelper("unless",
	function(r, t) {
		return e.helpers["if"].call(this, r, {
			fn: t.inverse,
			inverse: t.fn
		})
	}),
	e.registerHelper("with",
	function(r, i) {
		var o = t.call(r);
		return o === n && (r = r.call(this)),
		e.Utils.isEmpty(r) ? void 0 : i.fn(r)
	}),
	e.registerHelper("log",
	function(r, t) {
		var n = t.data && null != t.data.level ? parseInt(t.data.level, 10) : 1;
		e.log(n, r)
	});
	var o = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
	e.Exception = function() {
		for (var e = Error.prototype.constructor.apply(this, arguments), r = 0; r < o.length; r++) this[o[r]] = e[o[r]]
	},
	e.Exception.prototype = new Error,
	e.SafeString = function(e) {
		this.string = e
	},
	e.SafeString.prototype.toString = function() {
		return this.string.toString()
	};
	var a = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#x27;",
		"`": "&#x60;"
	},
	l = /[&<>"'`]/g,
	s = /[&<>"'`]/,
	p = function(e) {
		return a[e] || "&amp;"
	};
	e.Utils = {
		extend: function(e, r) {
			for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t])
		},
		escapeExpression: function(r) {
			return r instanceof e.SafeString ? r.toString() : null == r || r === !1 ? "": (r = r.toString(), s.test(r) ? r.replace(l, p) : r)
		},
		isEmpty: function(e) {
			return e || 0 === e ? "[object Array]" === t.call(e) && 0 === e.length ? !0 : !1 : !0
		}
	},
	e.VM = {
		template: function(r) {
			var t = {
				escapeExpression: e.Utils.escapeExpression,
				invokePartial: e.VM.invokePartial,
				programs: [],
				program: function(r, t, n) {
					var i = this.programs[r];
					return n ? i = e.VM.program(r, t, n) : i || (i = this.programs[r] = e.VM.program(r, t)),
					i
				},
				merge: function(r, t) {
					var n = r || t;
					return r && t && (n = {},
					e.Utils.extend(n, t), e.Utils.extend(n, r)),
					n
				},
				programWithDepth: e.VM.programWithDepth,
				noop: e.VM.noop,
				compilerInfo: null
			};
			return function(n, i) {
				i = i || {};
				var o = r.call(t, e, n, i.helpers, i.partials, i.data),
				a = t.compilerInfo || [],
				l = a[0] || 1,
				s = e.COMPILER_REVISION;
				if (l !== s) {
					if (s > l) {
						var p = e.REVISION_CHANGES[s],
						c = e.REVISION_CHANGES[l];
						throw "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + p + ") or downgrade your runtime to an older version (" + c + ")."
					}
					throw "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ")."
				}
				return o
			}
		},
		programWithDepth: function(e, r, t) {
			var n = Array.prototype.slice.call(arguments, 3),
			i = function(e, i) {
				return i = i || {},
				r.apply(this, [e, i.data || t].concat(n))
			};
			return i.program = e,
			i.depth = n.length,
			i
		},
		program: function(e, r, t) {
			var n = function(e, n) {
				return n = n || {},
				r(e, n.data || t)
			};
			return n.program = e,
			n.depth = 0,
			n
		},
		noop: function() {
			return ""
		},
		invokePartial: function(t, n, i, o, a, l) {
			var s = {
				helpers: o,
				partials: a,
				data: l
			};
			if (t === r) throw new e.Exception("The partial " + n + " could not be found");
			if (t instanceof Function) return t(i, s);
			if (e.compile) return a[n] = e.compile(t, {
				data: l !== r
			}),
			a[n](i, s);
			throw new e.Exception("The partial " + n + " could not be compiled when running in runtime-only mode")
		}
	},
	e.template = e.VM.template
} (Handlebars); !
function(e, t) {
	var n = function() {
		for (var n in e.__module) e.__module.hasOwnProperty(n) && t.registerPartial(n, t.template(e.__module[n]));
		t.registerHelper("ifCond",
		function(e, t, n, r) {
			switch (t) {
			case "==":
				return e == n ? r.fn(this) : r.inverse(this);
			case "===":
				return e === n ? r.fn(this) : r.inverse(this);
			case "<":
				return n > e ? r.fn(this) : r.inverse(this);
			case "<=":
				return n >= e ? r.fn(this) : r.inverse(this);
			case ">":
				return e > n ? r.fn(this) : r.inverse(this);
			case ">=":
				return e >= n ? r.fn(this) : r.inverse(this);
			default:
				return r.inverse(this)
			}
			return r.inverse(this)
		})
	},
	r = function(n) {
		var r = n.content && n.content.template,
		i = e.__tmpl[r];
		return i ? (i = t.template(i), i(n)) : ""
	};
	e.template = e.template || {
		buildHtml: function(e) {
			return n(),
			r(e)
		}
	}
} (window.AMPlatform, Handlebars); !
function(o) {
	o.util = o.util || {
		goDesktop: function() {
			document.cookie = "allmobilize=desktop; path=/;",
			window.location.reload()
		}
	}
} (window.AMPlatform); !
function(e, t) {
	var n, i = function(e) {
		return t.map(e,
		function(e, t) {
			return t
		})
	},
	r = function(e) {
		return t.map(e,
		function(e) {
			return e
		})
	},
	o = new RegExp("(<script[\\s\\S]*?>)", "gi"),
	a = {
		style: ' media="allmobilize-media"',
		script: ' type="text/allmobilize-script"'
	},
	l = new RegExp(r(a).join("|"), "g"),
	d = {
		img: ["src"],
		iframe: ["src"],
		script: ["src", "type"],
		link: ["href"],
		style: ["media"]
	},
	c = new RegExp("<(" + i(d).join("|") + ")([\\s\\S]*?)>", "gi"),
	u = {},
	s = {};
	t.each(d,
	function(e, n) {
		t.each(n,
		function(e, t) {
			s[t] = !0
		}),
		"img" === e && (n = n.concat("width", "height")),
		u[e] = new RegExp("\\s+((?:" + n.join("|") + ")\\s*=\\s*(?:'([\\s\\S])+?'|\"([\\s\\S])+?\"))", "gi")
	}),
	n = new RegExp("\\sx-(" + i(s).join("|") + ")", "gi");
	var h = function(e, t, n) {
		return t = t.toLowerCase(),
		result = "<" + t + (a[t] || "") + n.replace(u[t], " x-$1") + ">"
	},
	m = function(e) {
		return e.nodeName.toLowerCase()
	},
	p = function(e) {
		return e.replace('"', "&quot;")
	},
	f = function(e) {
		if (!e) return "";
		e.length && (e = e[0]);
		var t = [];
		return [].forEach.call(e.attributes,
		function(e) {
			t.push(" ", e.name, '="', p(e.value), '"')
		}),
		"<" + m(e) + t.join("") + ">"
	},
	g = function(e) {
		var t = e.doctype || [].filter.call(e.childNodes,
		function(e) {
			return e.nodeType == Node.DOCUMENT_TYPE_NODE
		})[0];
		return t ? "<!DOCTYPE HTML" + (t.publicId ? ' PUBLIC "' + t.publicId + '"': "") + (t.systemId ? ' "' + t.systemId + '"': "") + ">": ""
	},
	b = function(e) {
		return e ? [].map.call(e.childNodes,
		function(e) {
			var t = m(e);
			return "#comment" == t ? "<!--" + e.textContent + "-->": "plaintext" == t ? e.textContent: "script" == t && (/allmobilize\./.test(e.src) || /AllMobilize/.test(e.textContent)) ? "": e.outerHTML || e.nodeValue
		}).join("") : ""
	},
	y = "",
	C = function(e) {
		if (y) return y;
		var e = e || document,
		t = e.getElementsByTagName("head")[0] || e.createElement("head"),
		n = e.getElementsByTagName("body")[0] || e.createElement("body"),
		i = e.getElementsByTagName("html")[0];
		return y = {
			doctype: g(e),
			htmlTag: f(i),
			headTag: f(t),
			bodyTag: f(n),
			headContent: b(t),
			bodyContent: b(n)
		},
		y.all = function(e) {
			return this.doctype + this.htmlTag + this.headTag + (e || "") + this.headContent + this.bodyContent
		},
		y
	},
	v = function(e) {
		var n = e.match(/^<(\w+)([\s\S]*)/i),
		i = document.createElement(n[1]);
		return t.each(t("<div" + n[2])[0].attributes,
		function(e, t) {
			i.setAttribute(t.nodeName, t.nodeValue)
		}),
		i
	},
	T = function(e) {
		var n = /<!--(?:[\s\S]*?)-->|(<\/head\s*>|<body[\s\S]*$)/gi;
		e = t.extend({},
		e);
		var i = e.bodyContent = e.headContent + e.bodyContent;
		e.headContent = "";
		for (var r; r = n.exec(i); r) if (r[1]) {
			if ("/" != r[1][1]) {
				e.headContent = e.head || i.slice(0, r.index),
				e.bodyContent = r[0];
				var o = /^((?:[^>'"]*|'[^']*?'|"[^"]*?")*>)([\s\S]*)$/.exec(r[0]);
				o && (e.bodyTag = o[1], e.bodyContent = o[2]);
				break
			}
			e.headContent = i.slice(0, r.index),
			e.bodyContent = i.slice(r.index + r[1].length)
		}
		return e
	};
	e.html = e.html || {
		disable: function(e) {
			var t = /(<!--[\s\S]*?-->)|(?=<\/script)/i,
			n = e.split(t),
			i = n.map(function(e) {
				var t;
				return e ? /^<!--/.test(e) ? e: (t = e.split(o), t[0] = t[0].replace(c, h), t[1] && (t[1] = t[1].replace(c, h)), t) : ""
			});
			return [].concat.apply([], i).join("")
		},
		enable: function(e) {
			return e.replace(n, " $1").replace(l, "")
		},
		htmlFromElement: function(e) {
			var n = "";
			if (e.length) {
				var i = e.length ? e[0] : e;
				n = i.outerHTML ? i.outerHTML: t("<div>").append(t(i).clone()).html(),
				"string" == typeof n && (n = t.trim(n))
			}
			return n
		},
		buildOriginalDOM: function() {
			var n = T(C()),
			i = e.html.disable(n.headContent),
			r = e.html.disable(n.bodyContent),
			o = document.createElement("div"),
			a = v(n.headTag),
			l = v(n.bodyTag),
			d = v(n.htmlTag),
			c = {
				doctype: n.doctype,
				$head: t(a),
				$body: t(l),
				$html: t(d)
			};
			for (o.innerHTML = i; o.firstChild; a.appendChild(o.firstChild));
			for (o.innerHTML = r; o.firstChild; l.appendChild(o.firstChild));
			return d.appendChild(a),
			d.appendChild(l),
			c
		},
		buildOriginalHtml: function(e) {
			return e.$head.find("#allmobilize_viewport").remove(),
			e.$head.find("#allmobilize_loader").remove(),
			e.doctype + e.$head.html() + e.$body.html()
		}
	}
} (window.AMPlatform, window.AMPlatform.$); !
function(t) {
	var r = function(t) {
		console && console.log(t)
	};
	t.logger = t.logger || {
		times: [],
		errors: [],
		time: function(t, r) {
			var i = r || +new Date;
			return this.times.push([i, t]),
			i
		},
		error: function(t, r) {
			var i = r || +new Date;
			this.errors.push([i, t])
		},
		reset: function() {
			this.times = [].concat(t.__timing),
			this.errors = []
		},
		dump: function() {
			r("--------- Timings (in milliseconds) ----------");
			for (var t = this.times.length ? this.times[0][0] : 0, i = 0, s = this.times.length; s > i; i++) {
				var e = this.times[i];
				r(e[0] - t + "		" + e[1])
			}
			if (this.errors.length) {
				r("--------------- Errors -----------------");
				for (var i = 0,
				s = this.errors.length; s > i; i++) {
					var e = this.times[i];
					r(e[0])
				}
			}
		}
	}
} (window.AMPlatform); !
function(t, e) {
	var n = function(t) {
		var n = function(t, n, o) {
			return (e.fn.init || e.zepto.init).call(this, t, n || r.context(), o)
		},
		r = e.sub(n);
		return r.context = function() {
			return t || "<div>"
		},
		r.zepto || (r.fn.init = n, r.fn.init.prototype = e.fn),
		r
	};
	e.sub = e.sub ||
	function(t) {
		return e.extend(t, e),
		t.zepto = e.extend({},
		e.zepto),
		t
	},
	e.fn.anchor = function() {
		return n(this)
	};
	var r = function(e, n) {
		return n && (n.jquery || e.zepto && e.zepto.isZ && e.zepto.isZ(n) || n.selector && n.length || n.innerHTML) ? t.html.htmlFromElement(n) : "object" == typeof n ? n: n && n.toString() || ""
	},
	o = function(t, n, i) {
		if ("function" == typeof t) {
			var a = extractor(n, i);
			return r(n, a)
		}
		var c = {};
		return e.each(t,
		function(t, e) {
			if ("_" != t[0]) {
				var a;
				"function" == typeof e ? (a = e(n, i), a = r(n, a)) : a = "object" == typeof e ? o(e, n, i) : e,
				c[t] = a
			} else c[t] = e
		}),
		c
	},
	i = function(t, e) {
		t.openLinkInSameWindow && e("a").removeAttr("target"),
		t.removeStyle && (e("*").removeAttr("style"), e("style").remove()),
		t.cleanImg && e('img, input[type="image"]').removeAttr("height").removeAttr("width").removeAttr("align"),
		t.cleanTable && (e("table").removeAttr("height").removeAttr("width"), e("tr, th, td").removeAttr("height").removeAttr("width").removeAttr("bgcolor")),
		t.cleanFrame && e("iframe").removeAttr("width"),
		t.cleanEmbed && e("embed").removeAttr("width")
	},
	a = function() {
		return window.location.pathname + (window.location.search ? window.location.search: "")
	},
	c = {
		select: function(t) {
			var n = this,
			r = {};
			return e.each(t,
			function(t, e) {
				return new RegExp(t, "i").test(a()) ? (r = o(e, n.__AM__.$, n), !1) : void 0
			}),
			r
		}
	};
	t.extractor = t.extractor || {
		extractData: function(t, r) {
			var a = n(t.$html),
			m = e.extend({},
			r),
			u = {
				openLinkInSameWindow: !1,
				removeStyle: !0,
				cleanImg: !1,
				cleanTable: !1,
				cleanFrame: !1,
				cleanEmbed: !1
			};
			return e.extend(m, c),
			r._options && e.extend(u, r._options),
			i(u, a),
			m.__AM__ = {
				config: r,
				options: u,
				$: a
			},
			o(r, a, m)
		}
	}
} (window.AMPlatform, window.AMPlatform.$); !
function(i, t, e) {
	var n = window,
	o = document,
	l = function(i) {
		n.setTimeout(function() {
			o.open("text/html", "replace"),
			o.write(i),
			o.close()
		})
	};
	i.main = i.main || {
		mobilize: function(t) {
			i.logger.time("mobilize"),
			i.data = i.data || {},
			config = i.data.config = i.__config;
			var r = t.scriptSrc.lastIndexOf("/"),
			a = -1 !== r ? t.scriptSrc.substr(0, r + 1) : "";
			config.__root = a,
			config.__weixinId = t.weixinId;
			var m = i.html.buildOriginalDOM(o),
			c = i.extractor.extractData(m, config);
			if (c.content && c.content.redirect) return n.location.href = c.content.redirect,
			void 0;
			c.__root = a,
			c.__stylePath = a + "style.min.css",
			c.__jsPath = a + "script.min.js";
			var d = i.template.buildHtml(c);
			d = i.html.enable(d),
			e = !1,
			d ? (l(d), i.logger.time("completed")) : e ? (l("<h1>No template found</h1>"), i.logger.time("failed")) : (i.main.unmobilize(m), i.logger.time("unmobilize")),
			e && i.logger.dump()
		},
		unmobilize: function(t) {
			i.logger.time("unmobilize");
			var e = i.html.buildOriginalHtml(t);
			e = i.html.enable(e),
			l(e)
		}
	}
} (window.AMPlatform, window.AMPlatform.$, window._amVersion.debug);