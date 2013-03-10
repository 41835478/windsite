(function() {
	function k() {
		var b = {
			"&" : "&#38;",
			"<" : "&#60;",
			">" : "&#62;",
			'"' : "&#34;",
			"'" : "&#39;",
			"/" : "&#47;"
		}, a = /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(e) {
			return e ? e.toString().replace(a, function(a) {
						return b[a] || a
					}) : e
		}
	}
	function l(b, a, e) {
		return (typeof a === "string" ? a : a.toString()).replace(
				b.define || d, function(a, b, c, d) {
					b.indexOf("def.") === 0 && (b = b.substring(4));
					b in e
							|| (c === ":" ? e[b] = d : eval("def['" + b + "']="
									+ d));
					return ""
				}).replace(b.use || d, function(a, d) {
					var c = eval(d);
					return c ? l(b, c, e) : c
				})
	}
	function g(b) {
		return b.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ")
	}
	var f = {
		version : "0.2.0",
		templateSettings : {
			evaluate : /\{\{([\s\S]+?)\}\}/g,
			interpolate : /\{\{=([\s\S]+?)\}\}/g,
			encode : /\{\{!([\s\S]+?)\}\}/g,
			use : /\{\{#([\s\S]+?)\}\}/g,
			define : /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
			conditional : /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
			iterate : /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
			varname : "it",
			strip : !0,
			append : !0,
			selfcontained : !1
		},
		template : void 0,
		compile : void 0
	}, h = function() {
		return this || (0, eval)("this")
	}();
	typeof module !== "undefined" && module.exports
			? module.exports = f
			: typeof define === "function" && define.amd ? define(function() {
						return f
					}) : h.doT = f;
	h.encodeHTML = k();
	var n = {
		append : {
			start : "'+(",
			end : ")+'",
			startencode : "'+encodeHTML("
		},
		split : {
			start : "';out+=(",
			end : ");out+='",
			startencode : "';out+=encodeHTML("
		}
	}, d = /$^/;
	f.template = function(b, a, e) {
		var a = a || f.templateSettings, i = a.append ? n.append : n.split, m, c = 0, j;
		if (a.use || a.define) {
			var o = h.def;
			h.def = e || {};
			b = l(a, b, h.def);
			h.def = o
		}
		b = ("var out='"
				+ (a.strip ? b.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ")
						.replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : b)
						.replace(/'|\\/g, "\\$&").replace(a.interpolate || d,
								function(a, b) {
									return i.start + g(b) + i.end
								}).replace(a.encode || d, function(b, a) {
									m = !0;
									return i.startencode + g(a) + i.end
								}).replace(a.conditional || d,
								function(a, b, c) {
									return b ? c ? "';}else if(" + g(c)
											+ "){out+='" : "';}else{out+='" : c
											? "';if(" + g(c) + "){out+='"
											: "';}out+='"
								}).replace(a.iterate || d,
								function(b, a, d, e) {
									if (!a)
										return "';} } out+='";
									c += 1;
									j = e || "i" + c;
									a = g(a);
									return "';var arr" + c + "=" + a
											+ ";if(arr" + c + "){var " + d
											+ "," + j + "=-1,l" + c + "=arr"
											+ c + ".length-1;while(" + j + "<l"
											+ c + "){" + d + "=arr" + c + "["
											+ j + "+=1];out+='"
								}).replace(a.evaluate || d, function(a, b) {
									return "';" + g(b) + "out+='"
								}) + "';return out;").replace(/\n/g, "\\n")
				.replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(
						/(\s|;|}|^|{)out\+='';/g, "$1").replace(/\+''/g, "")
				.replace(/(\s|;|}|^|{)out\+=''\+/g, "$1out+=");
		m && a.selfcontained
				&& (b = "var encodeHTML=(" + k.toString() + "());" + b);
		try {
			return new Function(a.varname, b)
		} catch (p) {
			throw typeof console !== "undefined"
					&& console
							.log("Could not create a template function: " + b), p;
		}
	};
	f.compile = function(b, a) {
		return f.template(b, null, a)
	}
})();
var JSON;
JSON || (JSON = {});
(function() {
	function k(a) {
		return a < 10 ? "0" + a : a
	}
	function o(a) {
		p.lastIndex = 0;
		return p.test(a) ? '"' + a.replace(p, function(a) {
					var c = r[a];
					return typeof c === "string" ? c : "\\u"
							+ ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
				}) + '"' : '"' + a + '"'
	}
	function l(a, j) {
		var c, d, h, m, g = e, f, b = j[a];
		b && typeof b === "object" && typeof b.toJSON === "function"
				&& (b = b.toJSON(a));
		typeof i === "function" && (b = i.call(j, a, b));
		switch (typeof b) {
			case "string" :
				return o(b);
			case "number" :
				return isFinite(b) ? String(b) : "null";
			case "boolean" :
			case "null" :
				return String(b);
			case "object" :
				if (!b)
					return "null";
				e += n;
				f = [];
				if (Object.prototype.toString.apply(b) === "[object Array]") {
					m = b.length;
					for (c = 0; c < m; c += 1)
						f[c] = l(c, b) || "null";
					h = f.length === 0 ? "[]" : e ? "[\n" + e
							+ f.join(",\n" + e) + "\n" + g + "]" : "["
							+ f.join(",") + "]";
					e = g;
					return h
				}
				if (i && typeof i === "object") {
					m = i.length;
					for (c = 0; c < m; c += 1)
						typeof i[c] === "string"
								&& (d = i[c], (h = l(d, b))
										&& f.push(o(d) + (e ? ": " : ":") + h))
				} else
					for (d in b)
						Object.prototype.hasOwnProperty.call(b, d)
								&& (h = l(d, b))
								&& f.push(o(d) + (e ? ": " : ":") + h);
				h = f.length === 0 ? "{}" : e ? "{\n" + e + f.join(",\n" + e)
						+ "\n" + g + "}" : "{" + f.join(",") + "}";
				e = g;
				return h
		}
	}
	if (typeof Date.prototype.toJSON !== "function")
		Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-"
					+ k(this.getUTCMonth() + 1) + "-" + k(this.getUTCDate())
					+ "T" + k(this.getUTCHours()) + ":"
					+ k(this.getUTCMinutes()) + ":" + k(this.getUTCSeconds())
					+ "Z" : null
		}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
			return this.valueOf()
		};
	var q = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, n, r = {
		"\u0008" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\u000c" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, i;
	if (typeof JSON.stringify !== "function")
		JSON.stringify = function(a, j, c) {
			var d;
			n = e = "";
			if (typeof c === "number")
				for (d = 0; d < c; d += 1)
					n += " ";
			else
				typeof c === "string" && (n = c);
			if ((i = j) && typeof j !== "function"
					&& (typeof j !== "object" || typeof j.length !== "number"))
				throw Error("JSON.stringify");
			return l("", {
						"" : a
					})
		};
	if (typeof JSON.parse !== "function")
		JSON.parse = function(a, e) {
			function c(a, d) {
				var g, f, b = a[d];
				if (b && typeof b === "object")
					for (g in b)
						Object.prototype.hasOwnProperty.call(b, g)
								&& (f = c(b, g), f !== void 0
										? b[g] = f
										: delete b[g]);
				return e.call(a, d, b)
			}
			var d, a = String(a);
			q.lastIndex = 0;
			q.test(a) && (a = a.replace(q, function(a) {
						return "\\u"
								+ ("0000" + a.charCodeAt(0).toString(16))
										.slice(-4)
					}));
			if (/^[\],:{}\s]*$/
					.test(a
							.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									"]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
				return d = eval("(" + a + ")"), typeof e === "function" ? c({
							"" : d
						}, "") : d;
			throw new SyntaxError("JSON.parse");
		}
})();
(function(e) {
	MGTOOL = {
		distance2Bottom : function(a) {
			var c = e(document).scrollTop(), b = e(window).height(), d = e(document)
					.height();
			return c + b + a >= d ? !0 : !1
		},
		trim : function(a) {
			return a.replace(/(^\s*)|(\s*$)/g, "").replace(
					/(^\u3000*)|(\u3000*$)/g, "")
		},
		isURl : function(a) {
			return /([\w-]+\.)+[\w-]+.([^a-z])(\/[\w-.\/?%&=]*)?|[a-zA-Z0-9\-\.][\w-]+.([^a-z])(\/[\w-.\/?%&=]*)?/i
					.test(a) ? !0 : !1
		},
		byteLength : function(a) {
			var c = a.match(/[^\x00-\x80]/g);
			return a.length + (!c ? 0 : c.length)
		},
		getMsgLength : function(a) {
			var c = a.length;
			if (c > 0) {
				for (var b = a, a = a
						.match(/http[s]?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/\/,:;@&=\?\~\#\%]*)*/gi)
						|| [], d = 0, f = 0, c = a.length; f < c; f++) {
					var g = MGTOOL.byteLength(a[f]);
					/^(http:\/\/mogujie.cn)/.test(a[f])
							|| (d += /^(http:\/\/)+(mogujie.cn|mogujie.com)/
									.test(a[f]) ? g <= 41 ? g : g <= 140
									? 24
									: g - 140 + 24 : g <= 140 ? 24 : g - 140
									+ 24, b = b.replace(a[f], ""))
				}
				return Math.ceil((d + MGTOOL.byteLength(b)) / 2)
			} else
				return 0
		},
		jsMbSubstr : function(a, c) {
			if (!a || !c)
				return "";
			for (var b = 0, d = 0, f = "", d = 0; d < a.length; d++) {
				a.charCodeAt(d) > 255 ? b += 2 : b++;
				if (b > c * 2)
					return f;
				f += a.charAt(d)
			}
			return a
		},
		getAbsoluteLocation : function(a) {
			if (arguments.length != 1 || a == null)
				return null;
			var c = e(a), b = c.offset(), d = b.top, b = b.left, c = c.height(), f = e(window)
					.height(), g = e(document).scrollTop();
			return {
				absoluteTop : d,
				absoluteLeft : b,
				isInView : d >= g && d <= g + f,
				isLoad : d + c + 200 >= g && d - 400 <= g + f
			}
		},
		objToJson : function(a) {
			return JSON.stringify(a)
		},
		getPicExtension : function(a) {
			return a.toLowerCase().substring(a.lastIndexOf(".") + 1)
		},
		empty : function(a) {
			return void 0 === a || null === a || "" === a
		},
		emptyObj : function(a) {
			for (var c in a)
				return !1;
			return !0
		},
		isParent : function(a, c) {
			for (; a != void 0 && a != null
					&& a.tagName.toUpperCase() != "BODY";) {
				if (a == c)
					return !0;
				a = a.parentNode
			}
			return !1
		},
		setCookie : function(a, c, b) {
			b = b || {};
			if (c === null)
				c = "", b.expires = -1;
			var d = "";
			if (b.expires
					&& (typeof b.expires == "number" || b.expires.toUTCString))
				typeof b.expires == "number" ? (d = new Date, d.setTime(d
						.getTime()
						+ b.expires * 864E5)) : d = b.expires, d = "; expires="
						+ d.toUTCString();
			var f = b.path ? "; path=" + b.path : "", g = b.secure
					? "; secure"
					: "", e = "";
			null != b.domain || void 0 != b.domain
					? e = "; domain=" + b.domain
					: (e = document.domain.toString().split("."), e = "; domain=."
							+ e[1] + "." + e[2]);
			document.cookie = [a, "=", encodeURIComponent(c), d, f, e, g]
					.join("")
		},
		getCookie : function(a) {
			a = document.cookie.match(RegExp("(^| )" + a + "=([^;]*)(;|$)"));
			if (a != null)
				return decodeURIComponent(a[2]);
			return ""
		},
		setCacheCookie : function(a, c, b, d) {
			b = b || {};
			c === null && (c = "");
			d = typeof d == "undefined" ? MGTOOL.getCookie("__mgjuuid") : d;
			e.ajax({
						url : "/collect/uedcookie",
						type : "POST",
						timeout : 6E4,
						data : {
							cookiename : a,
							uuid : d,
							type : "set",
							value : c,
							lifetime : b.expires * 86400
						},
						dataType : "json",
						success : function(a) {
							a == "" && alert(MGLANG.msgTimeout)
						}
					})
		},
		getCacheCookie : function(a, c) {
			var b = typeof c == "undefined" ? MGTOOL.getCookie("__mgjuuid") : c, d = "";
			e.ajax({
						url : "/collect/uedcookie",
						type : "POST",
						timeout : 6E4,
						async : !1,
						data : {
							cookiename : a,
							uuid : b,
							type : "get"
						},
						dataType : "json",
						success : function(a) {
							a.status.code == 1001
									? d = a.result.data.value
									: alert(MGLANG.msgTimeout)
						}
					});
			return d
		},
		getMousePosition : function(a) {
			var c = 0, b = 0;
			if (!a)
				a = window.event;
			if (a.pageX || a.pageY)
				c = a.pageX, b = a.pageY;
			else if (a.clientX || a.clientY)
				c = a.clientX + document.body.scrollLeft
						+ document.documentElement.scrollLeft, b = a.clientY
						+ document.body.scrollTop
						+ document.documentElement.scrollTop;
			return {
				x : c,
				y : b
			}
		},
		getQueryString : function(a) {
			if (RegExp("(^|\\?|&)" + a + "=([^&]*)(\\s|&|$)", "i")
					.test(location.href))
				return RegExp.$2.replace(/\+/g, " ");
			return ""
		},
		isIOS : function() {
			return /\((iPhone|iPad|iPod)/i.test(navigator.userAgent)
		},
		getRequest : function(a, c) {
			var c = typeof c != "undefined" ? c : location.href, b = c
					.substring(c.indexOf("?") + 1, c.length).split("&"), d = {};
			for (i = 0; j = b[i]; i++)
				d[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
								.indexOf("=")
								+ 1, j.length);
			b = d[a.toLowerCase()];
			return typeof b == "undefined" ? "" : b
		},
		template : function(a, c) {
			return doT.template(a)(c)
		},
		log : function(a) {
			window.console !== void 0 && console.log(a)
		}
	}
})(jQuery);
(function(d) {
	MOGU.Globe_Textarea_Auto_Height = function(a) {
		var c = a.height(), b = function() {
			c < 0 && (c = a.height());
			(d.browser.mozilla || d.browser.safari) && a.height(c);
			var b = a[0].scrollHeight, f = b < c ? c : b, f = f < c * 1.5
					? c
					: b;
			a.height(f)
		};
		a.bind("keyup", b).bind("input", b).bind("propertychange", b).bind(
				"focus", b)
	};
	MOGU.Globe_Goods_URL_Support = function(a) {
		var c = /tmall.com/i, b = /auction\d?.paipai.com/i, d = /buy.caomeipai.com\/goods/i, f = /www.360buy.com\/product/i, g = /product.dangdang.com\/Product.aspx\?product_id=/i, h = /book.360buy.com/i, i = /www.vancl.com\/StyleDetail/i, j = /www.vancl.com\/Product/i, k = /vt.vancl.com\/item/i, l = /item.vancl.com\/\d+/i, m = /item.vt.vancl.com\/\d+/i, n = /(mbaobao.com\/pshow)|(mbaobao.com\/item)/i, o = /item.buy.qq.com\/item/i, p = /[www|us].topshop.com\/webapp\/wcs\/stores\/servlet\/ProductDisplay/i, q = /quwan.com\/goods/i, r = /nala.com.cn\/product/i, s = /maymay.cn\/pitem/i, t = /asos.com/i, u = /www.100f1.com\/ProductInfo_/i, v = /www.gaojie.com\/product/i, w = /a.m.taobao.com\/i/i, x = /www.51yugou.com\//i, y = /www.1mall.com\//i, z = /www.yihaodian.com\//i, A = /www.xipin.me\//i, B = /www.nuandao.com\//i, C = /www.rosebeauty.com.cn\//i, D = /www.hmeili.com\//i, E = /www.yueji.com\//i, F = /www.yougou.com\//i;
		return /item(.[\w]+)?.taobao.com\/(.?)[item.htm|item_num_id|item_detail|itemID|item_id|default_item_id]/i
				.test(a)
				|| c.test(a)
				|| h.test(a)
				|| f.test(a)
				|| b.test(a)
				|| d.test(a)
				|| g.test(a)
				|| i.test(a)
				|| j.test(a)
				|| k.test(a)
				|| l.test(a)
				|| m.test(a)
				|| n.test(a)
				|| p.test(a)
				|| q.test(a)
				|| r.test(a)
				|| s.test(a)
				|| t.test(a)
				|| u.test(a)
				|| v.test(a)
				|| o.test(a)
				|| w.test(a)
				|| x.test(a)
				|| z.test(a)
				|| A.test(a)
				|| B.test(a)
				|| C.test(a)
				|| D.test(a)
				|| E.test(a)
				|| F.test(a) || y.test(a)
	};
	MOGU.Globe_Input_Text = function(a, c) {
		c = c || a.val();
		a.focus(function() {
					var a = d(this);
					MGTOOL.trim(a.val()) == c && a.val("");
					a.css("color", "#000")
				});
		a.blur(function() {
					var a = d(this);
					MGTOOL.trim(a.val()) == ""
							&& (a.val(c), a.css("color", "#ccc"))
				})
	};
	MOGU.Globe_Input_Text_Hide = function(a) {
		a.focus(function() {
					var a = d(this);
					d.trim(a.val()) == d.trim(a.attr("def-v")) && a.val("");
					a.css("color", "#000")
				});
		a.blur(function() {
					var a = d(this);
					MGTOOL.trim(a.val()) == ""
							&& (a.val(a.attr("def-v")), a.css("color", "#ccc"))
				})
	};
	MOGU.WB_Word_Count = function(a, c, b) {
		var e = b ? b : 140;
		d("#" + a)[0] && (b = function() {
			var b = 0, b = c ? MGTOOL.getMsgLength(d("#" + c).val()) : MGTOOL
					.getMsgLength(d("#" + a).find(".pub_txt").val()), g = e - b;
			b == 0 ? d("#" + a).find(".word_count").html(e) : (d("#" + a)
					.find(".word_count").html(g), b > e ? (d("#" + a)
					.find(".word_count_wrap").show(), d("#" + a)
					.find(".word_count").addClass("out")) : d("#" + a)
					.find(".word_count").removeClass("out"))
		}, c ? d("#" + c).bind("keyup", b).bind("input", b).bind(
				"propertychange", b) : d("#" + a).find(".pub_txt").bind(
				"keyup", b).bind("input", b).bind("propertychange", b))
	};
	MOGU.Globe_Range_Input = function(a) {
		if (a[0].createTextRange) {
			var c = a[0].createTextRange();
			c.moveEnd("character", a.val().length);
			c.moveStart("character", a.val().length);
			c.select()
		} else
			a[0].setSelectionRange(a.val().length, a.val().length), a.focus()
	};
	MOGU.Globe_Check_Login = function() {
		if (MOGUPROFILE.userid == "")
			return MOGU.user_handsome_login_init(), MOGU.user_handsome_login(), !1;
		return !0
	};
	MOGU.Globe_Short_Link_From = function() {
		d(".mg_slink").live("click", function() {
			if (!(window.location.toString().indexOf("is_qzone=1") >= 0)) {
				var a = this, c = a.href, b = d(a).attr("s"), e = d(a)
						.attr("c");
				if (e == "")
					e = MOGUPROFILE.userid;
				var f = c, g = "", g = c.indexOf("?") == -1 ? "?c=" + e + "&s="
						+ b : "&c=" + e + "&s=" + b;
				f += g;
				a.href = f;
				setTimeout(function() {
							a.href = c
						}, 500)
			}
		})
	};
	MOGU.Globe_Short_Link_From();
	MOGU.Globe_Bind_Keybord_Submit = function(a, c, b) {
		b = b || "need_focus";
		b == "need_focus" && (a.focus(function() {
					d("body").unbind("keydown");
					d("body").bind("keydown", function(a) {
								a.ctrlKey && a.keyCode == 13 && c.click()
							})
				}), a.blur(function() {
					d("body").unbind("keydown")
				}));
		b == "not_need_focus" && d(document).bind("keydown", function(a) {
			a.ctrlKey && a.keyCode == 13
					&& (c.click(), d("body").unbind("keydown"))
		})
	};
	MOGU.GLobe_GetObj_Length = function(a) {
		var c, b = 0;
		for (c in a)
			a.hasOwnProperty(c) && b++;
		return b
	};
	MOGU.Empty_Message_Tip = function(a) {
		var c = (a ? a : {}).pub_obj, b = null, d = 0, b = setInterval(
				function() {
					d++;
					d == 6 ? (clearInterval(b), c.focus()) : d % 2 == 0 ? c
							.addClass("empty_tip") : c.removeClass("empty_tip")
				}, 120)
	}
})(jQuery);
(function(c) {
	c.fn.floatUp = function(b) {
		b = c.extend({}, b || {});
		return this.each(function() {
					$this = c(this);
					var d = $this.height();
					$this.css({
								height : 0,
								opacity : 0
							});
					$this.show();
					var a = $this.position().top;
					MGTOOL.empty($this.data("top"))
							? $this.data("top", a)
							: (a = $this.data("top"), $this.css("top", a));
					$this.animate({
								height : d + "px",
								top : a - d + "px",
								opacity : "1"
							}, b.time || 1E3)
				})
	};
	c.fn.floatDown = function(b) {
		b = c.extend({}, b || {});
		return this.each(function() {
					$this = c(this);
					var d = $this.height(), a = $this.position().top;
					MGTOOL.empty($this.data("top"))
							? $this.data("top", a)
							: (a = $this.data("top"), $this.css("top", a));
					$this.animate({
								height : "0px",
								top : a + d + "px",
								opacity : "0"
							}, b.time || 1E3, function() {
								$this.remove()
							})
				})
	}
})(jQuery);
(function(e) {
	MGLightBox = function(j) {
		var a = this, f = null, c = e.extend({
					title : "",
					titleLink : "",
					titleLinkText : "",
					lightBoxId : "",
					ajax : !1,
					contentHtml : "",
					scroll : !1,
					isBgClickClose : !0,
					resizeshow : !0,
					closeCallBack : function() {
					}
				}, j), d = null, h = null, g = null, i = function() {
			var b = (document.documentElement.scrollTop || document.body.scrollTop)
					+ ((document.documentElement.clientHeight || document.body.clientHeight) - d
							.height()) / 2, a = window.location.toString();
			b < 0 ? b = 0 : a.indexOf("is_qzone") > 0 && (b /= 6);
			return b
		};
		a.getBoxFrame = function() {
			return d
		};
		a.getFrameId = function() {
			return c.lightBoxId
		};
		a.getBackground = function() {
			return g
		};
		a.close = function() {
			f && f.abort();
			d.hide();
			c.closeCallBack();
			d.remove();
			e(".light_box").size() == 0 && g.remove();
			e("body").unbind("keydown")
		};
		a.hide = function() {
			d.hide();
			g.hide();
			e("body").unbind("keydown")
		};
		a.show = function() {
			d.show();
			g.show()
		};
		a.resize = function() {
			var b = (e(window).width() - d.width()) / 2, a = i();
			h.css({
						width : d.width(),
						height : d.height()
					});
			e.browser.msie
					&& e.browser.version == "6.0"
					&& g.css("height", document.documentElement.clientHeight
									|| document.body.clientHeight);
			if (c.scroll)
				if (e.browser.msie && e.browser.version == "6.0")
					d.css({
								left : b,
								top : a
							}).show(), e(window).scroll(function() {
								var a = i();
								d.css("top", a)
							});
				else {
					var a = ((document.documentElement.clientHeight || document.body.clientHeight) - d
							.height())
							/ 2, f = window.location.toString();
					a < 0 ? a = 0 : f.indexOf("is_qzone") > 0 && (a /= 6);
					d.css({
								left : b,
								top : a,
								position : "fixed"
							}).show()
				}
			else
				d.css({
							left : b,
							top : a
						}).show()
		};
		a.init = function() {
			if (c.lightBoxId != "") {
				var b = '<div id="{id}" class="light_box"><iframe frameborder="0" scrolling="no" class="lb_fix"></iframe>{content}</div>'
						.replace(/{id}/g, c.lightBoxId)
						.replace(
								/{content}/,
								'<table class="lb_wrap clearfix r5"><tbody><tr><td><div class="lb_hd">{title}{title_link}<a href="javascript:;" class="lb_close">\u00d7</a></div><div class="lb_bd">{body}</div></td></tr></tbody></table>');
				c.title
						&& c.title != ""
						&& (b = b.replace(/{title}/g, '<span class="lb_title">'
										+ c.title + "</span>"));
				b = c.titleLinkText != "" ? b.replace(/{title_link}/g,
						'<span class="lb_lnk">\uff08<a href="' + c.titleLink
								+ '" target="_blank">' + c.titleLinkText
								+ "</a>\uff09</span>") : b.replace(
						/{title_link}/g, "");
				b = c.ajax ? b.replace(/{body}/g, "") : b.replace(/{body}/g,
						c.contentHtml);
				e(".light_box_fullbg").size() == 0 ? e("body").append(b
						+ '<div class="light_box_fullbg"></div>') : e("body")
						.append(b);
				d = e("#" + c.lightBoxId);
				h = e(".lb_fix");
				g = e(".light_box_fullbg");
				c.ajax ? a.loading() : (a.resize(), c.resizeshow
						&& e(window).resize(function() {
									a.resize()
								}), d.find(".lb_close").click(function() {
							a.close()
						}));
				c.isBgClickClose && e(".light_box_fullbg").click(function() {
							a.close()
						})
			}
		};
		a.fadeout = function() {
			f && f.abort();
			d.fadeOut(500);
			g.fadeOut(500, function() {
						a.close()
					})
		};
		a.startAjax = function(a) {
			f = a
		};
		a.buildContent = function(b) {
			d.find(".lb_wrap").size() == 0
					? (html = '<table class="lb_wrap clearfix r5"><tbody><tr><td><div class="lb_hd">{title}{title_link}<a href="javascript:;" class="lb_close">\u00d7</a></div><div class="lb_bd">{body}</div></td></tr></tbody></table>'
							.replace(/{body}/, b), c.title
							&& c.title != ""
							&& (html = html.replace(/{title}/g,
									'<span class="lb_title">' + c.title
											+ "</span>")), html = c.titleLinkText != ""
							? html.replace(/{title_link}/g,
									'<span class="lb_lnk">\uff08<a href="'
											+ c.titleLink
											+ '" target="_blank">'
											+ c.titleLinkText
											+ "</a>\uff09</span>")
							: html.replace(/{title_link}/g, ""), d
							.find(".lb_info").after(html).remove(), e("#"
							+ c.lightBoxId + " .lb_close").click(function() {
								a.close()
							}))
					: d.find(".lb_bd").html(b);
			a.resize()
		};
		a.success = function(b) {
			b = '<table class="lb_info r5"><tbody><tr><td><div class="lb_s">{text}</div></td></tr></tbody></table>'
					.replace(/{text}/, b);
			d.find(".lb_wrap").after(b).remove();
			a.resize();
			setTimeout(function() {
						a.fadeout()
					}, 1E3)
		};
		a.success_close = function(b, c) {
			var e = '<table class="lb_info r5"><tbody><tr><td><div class="lb_s">{text}</div></td></tr></tbody></table>'
					.replace(/{text}/, b);
			d.find(".lb_wrap").after(e).remove();
			a.resize();
			setTimeout(function() {
						a.close()
					}, c || 1E3)
		};
		a.fail = function(b, c) {
			var e = '<table class="lb_info r5"><tbody><tr><td><div class="lb_f">{text}</div></td></tr></tbody></table>'
					.replace(/{text}/, b);
			d.find(".lb_wrap").after(e).remove();
			a.resize();
			setTimeout(function() {
						a.close()
					}, c || 2E3)
		};
		a.loading = function(b) {
			b = '<table class="lb_info r5"><tbody><tr><td><div class="lb_l">{text}......\uff08<a class="lb_cs" href="javascript:;">\u53d6\u6d88</a>\uff09</div></td></tr></tbody></table>'
					.replace(/{text}/, b || "\u8bf7\u7a0d\u540e");
			d.find(".lb_wrap").after(b).remove();
			a.resize();
			d.find(".lb_l .lb_cs").click(function() {
						a.close()
					});
			a.resize()
		}
	}
})(jQuery);
var io = "undefined" === typeof module ? {} : module.exports;
(function() {
	(function(g, d) {
		g.version = "0.9.11";
		g.protocol = 1;
		g.transports = [];
		g.j = [];
		g.sockets = {};
		g.connect = function(e, a) {
			var f = g.util.parseUri(e), c, b;
			if (d && d.location)
				f.protocol = f.protocol || d.location.protocol.slice(0, -1), f.host = f.host
						|| (d.document
								? d.document.domain
								: d.location.hostname), f.port = f.port
						|| d.location.port;
			c = g.util.uniqueUri(f);
			var h = {
				host : f.host,
				secure : "https" == f.protocol,
				port : f.port || ("https" == f.protocol ? 443 : 80),
				query : f.query || ""
			};
			g.util.merge(h, a);
			if (h["force new connection"] || !g.sockets[c])
				b = new g.Socket(h);
			!h["force new connection"] && b && (g.sockets[c] = b);
			b = b || g.sockets[c];
			return b.of(f.path.length > 1 ? f.path : "")
		}
	})("object" === typeof module ? module.exports : this.io = {}, this);
	(function(g, d) {
		var e = g.util = {}, a = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, f = [
				"source", "protocol", "authority", "userInfo", "user",
				"password", "host", "port", "relative", "path", "directory",
				"file", "query", "anchor"];
		e.parseUri = function(b) {
			for (var b = a.exec(b || ""), h = {}, c = 14; c--;)
				h[f[c]] = b[c] || "";
			return h
		};
		e.uniqueUri = function(b) {
			var h = b.protocol, c = b.host, b = b.port;
			"document" in d
					? (c = c || document.domain, b = b
							|| (h == "https"
									&& document.location.protocol !== "https:"
									? 443
									: document.location.port))
					: (c = c || "localhost", !b && h == "https" && (b = 443));
			return (h || "http") + "://" + c + ":" + (b || 80)
		};
		e.query = function(b, c) {
			var a = e.chunkQuery(b || ""), f = [];
			e.merge(a, e.chunkQuery(c || ""));
			for (var d in a)
				a.hasOwnProperty(d) && f.push(d + "=" + a[d]);
			return f.length ? "?" + f.join("&") : ""
		};
		e.chunkQuery = function(b) {
			for (var c = {}, b = b.split("&"), a = 0, e = b.length, f; a < e; ++a)
				f = b[a].split("="), f[0] && (c[f[0]] = f[1]);
			return c
		};
		var c = !1;
		e.load = function(b) {
			if ("document" in d && document.readyState === "complete" || c)
				return b();
			e.on(d, "load", b, !1)
		};
		e.on = function(b, c, a, f) {
			b.attachEvent ? b.attachEvent("on" + c, a) : b.addEventListener
					&& b.addEventListener(c, a, f)
		};
		e.request = function(b) {
			if (b && "undefined" != typeof XDomainRequest && !e.ua.hasCORS)
				return new XDomainRequest;
			if ("undefined" != typeof XMLHttpRequest && (!b || e.ua.hasCORS))
				return new XMLHttpRequest;
			if (!b)
				try {
					return new (window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
				} catch (c) {
				}
			return null
		};
		"undefined" != typeof window && e.load(function() {
					c = !0
				});
		e.defer = function(b) {
			if (!e.ua.webkit || "undefined" != typeof importScripts)
				return b();
			e.load(function() {
						setTimeout(b, 100)
					})
		};
		e.merge = function(b, c, a, f) {
			var f = f || [], a = typeof a == "undefined" ? 2 : a, d;
			for (d in c)
				c.hasOwnProperty(d)
						&& e.indexOf(f, d) < 0
						&& (typeof b[d] !== "object" || !a ? (b[d] = c[d], f
								.push(c[d])) : e.merge(b[d], c[d], a - 1, f));
			return b
		};
		e.mixin = function(b, c) {
			e.merge(b.prototype, c.prototype)
		};
		e.inherit = function(b, c) {
			function a() {
			}
			a.prototype = c.prototype;
			b.prototype = new a
		};
		e.isArray = Array.isArray || function(b) {
			return Object.prototype.toString.call(b) === "[object Array]"
		};
		e.intersect = function(b, c) {
			for (var a = [], f = b.length > c.length ? b : c, d = b.length > c.length
					? c
					: b, i = 0, r = d.length; i < r; i++)
				~e.indexOf(f, d[i]) && a.push(d[i]);
			return a
		};
		e.indexOf = function(b, c, a) {
			for (var f = b.length, a = a < 0 ? a + f < 0 ? 0 : a + f : a || 0; a < f
					&& b[a] !== c; a++);
			return f <= a ? -1 : a
		};
		e.toArray = function(b) {
			for (var c = [], a = 0, f = b.length; a < f; a++)
				c.push(b[a]);
			return c
		};
		e.ua = {};
		e.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
			try {
				var b = new XMLHttpRequest
			} catch (c) {
				return !1
			}
			return b.withCredentials != void 0
		}();
		e.ua.webkit = "undefined" != typeof navigator
				&& /webkit/i.test(navigator.userAgent);
		e.ua.iDevice = "undefined" != typeof navigator
				&& /iPad|iPhone|iPod/i.test(navigator.userAgent)
	})("undefined" != typeof io ? io : module.exports, this);
	(function(g, d) {
		function e() {
		}
		g.EventEmitter = e;
		e.prototype.on = function(a, f) {
			if (!this.$events)
				this.$events = {};
			this.$events[a]
					? d.util.isArray(this.$events[a])
							? this.$events[a].push(f)
							: this.$events[a] = [this.$events[a], f]
					: this.$events[a] = f;
			return this
		};
		e.prototype.addListener = e.prototype.on;
		e.prototype.once = function(a, f) {
			function c() {
				b.removeListener(a, c);
				f.apply(this, arguments)
			}
			var b = this;
			c.listener = f;
			this.on(a, c);
			return this
		};
		e.prototype.removeListener = function(a, f) {
			if (this.$events && this.$events[a]) {
				var c = this.$events[a];
				if (d.util.isArray(c)) {
					for (var b = -1, h = 0, e = c.length; h < e; h++)
						if (c[h] === f || c[h].listener && c[h].listener === f) {
							b = h;
							break
						}
					if (b < 0)
						return this;
					c.splice(b, 1);
					c.length || delete this.$events[a]
				} else
					(c === f || c.listener && c.listener === f)
							&& delete this.$events[a]
			}
			return this
		};
		e.prototype.removeAllListeners = function(a) {
			if (a === void 0)
				return this.$events = {}, this;
			this.$events && this.$events[a] && (this.$events[a] = null);
			return this
		};
		e.prototype.listeners = function(a) {
			if (!this.$events)
				this.$events = {};
			this.$events[a] || (this.$events[a] = []);
			d.util.isArray(this.$events[a])
					|| (this.$events[a] = [this.$events[a]]);
			return this.$events[a]
		};
		e.prototype.emit = function(a) {
			if (!this.$events)
				return !1;
			var f = this.$events[a];
			if (!f)
				return !1;
			var c = Array.prototype.slice.call(arguments, 1);
			if ("function" == typeof f)
				f.apply(this, c);
			else if (d.util.isArray(f))
				for (var f = f.slice(), b = 0, h = f.length; b < h; b++)
					f[b].apply(this, c);
			else
				return !1;
			return !0
		}
	})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io
					? io
					: module.parent.exports);
	(function(g, d) {
		function e(b) {
			return b < 10 ? "0" + b : b
		}
		function a(b) {
			h.lastIndex = 0;
			return h.test(b) ? '"' + b.replace(h, function(b) {
						var c = j[b];
						return typeof c === "string" ? c : "\\u"
								+ ("0000" + b.charCodeAt(0).toString(16))
										.slice(-4)
					}) + '"' : '"' + b + '"'
		}
		function f(b, c) {
			var h, d, j, g, q = k, o, l = c[b];
			l instanceof Date
					&& (l = isFinite(b.valueOf()) ? b.getUTCFullYear() + "-"
							+ e(b.getUTCMonth() + 1) + "-" + e(b.getUTCDate())
							+ "T" + e(b.getUTCHours()) + ":"
							+ e(b.getUTCMinutes()) + ":" + e(b.getUTCSeconds())
							+ "Z" : null);
			typeof i === "function" && (l = i.call(c, b, l));
			switch (typeof l) {
				case "string" :
					return a(l);
				case "number" :
					return isFinite(l) ? String(l) : "null";
				case "boolean" :
				case "null" :
					return String(l);
				case "object" :
					if (!l)
						return "null";
					k += p;
					o = [];
					if (Object.prototype.toString.apply(l) === "[object Array]") {
						g = l.length;
						for (h = 0; h < g; h += 1)
							o[h] = f(h, l) || "null";
						j = o.length === 0 ? "[]" : k ? "[\n" + k
								+ o.join(",\n" + k) + "\n" + q + "]" : "["
								+ o.join(",") + "]";
						k = q;
						return j
					}
					if (i && typeof i === "object") {
						g = i.length;
						for (h = 0; h < g; h += 1)
							typeof i[h] === "string"
									&& (d = i[h], (j = f(d, l))
											&& o.push(a(d) + (k ? ": " : ":")
													+ j))
					} else
						for (d in l)
							Object.prototype.hasOwnProperty.call(l, d)
									&& (j = f(d, l))
									&& o.push(a(d) + (k ? ": " : ":") + j);
					j = o.length === 0 ? "{}" : k ? "{\n" + k
							+ o.join(",\n" + k) + "\n" + q + "}" : "{"
							+ o.join(",") + "}";
					k = q;
					return j
			}
		}
		if (d && d.parse)
			return g.JSON = {
				parse : d.parse,
				stringify : d.stringify
			};
		var c = g.JSON = {}, b = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, h = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, k, p, j = {
			"\u0008" : "\\b",
			"\t" : "\\t",
			"\n" : "\\n",
			"\u000c" : "\\f",
			"\r" : "\\r",
			'"' : '\\"',
			"\\" : "\\\\"
		}, i;
		c.stringify = function(b, c, a) {
			var h;
			p = k = "";
			if (typeof a === "number")
				for (h = 0; h < a; h += 1)
					p += " ";
			else
				typeof a === "string" && (p = a);
			if ((i = c) && typeof c !== "function"
					&& (typeof c !== "object" || typeof c.length !== "number"))
				throw Error("JSON.stringify");
			return f("", {
						"" : b
					})
		};
		c.parse = function(c, a) {
			function h(b, c) {
				var f, d, e = b[c];
				if (e && typeof e === "object")
					for (f in e)
						Object.prototype.hasOwnProperty.call(e, f)
								&& (d = h(e, f), d !== void 0
										? e[f] = d
										: delete e[f]);
				return a.call(b, c, e)
			}
			var f, c = String(c);
			b.lastIndex = 0;
			b.test(c) && (c = c.replace(b, function(b) {
						return "\\u"
								+ ("0000" + b.charCodeAt(0).toString(16))
										.slice(-4)
					}));
			if (/^[\],:{}\s]*$/
					.test(c
							.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									"]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
				return f = eval("(" + c + ")"), typeof a === "function" ? h({
							"" : f
						}, "") : f;
			throw new SyntaxError("JSON.parse");
		}
	})("undefined" != typeof io ? io : module.exports,
			typeof JSON !== "undefined" ? JSON : void 0);
	(function(g, d) {
		var e = g.parser = {}, a = e.packets = ["disconnect", "connect",
				"heartbeat", "message", "json", "event", "ack", "error", "noop"], f = e.reasons = [
				"transport not supported", "client not handshaken",
				"unauthorized"], c = e.advice = ["reconnect"], b = d.JSON, h = d.util.indexOf;
		e.encodePacket = function(d) {
			var e = h(a, d.type), k = d.id || "", g = d.endpoint || "", n = d.ack, m = null;
			switch (d.type) {
				case "error" :
					var s = d.reason ? h(f, d.reason) : "", d = d.advice ? h(c,
							d.advice) : "";
					if (s !== "" || d !== "")
						m = s + (d !== "" ? "+" + d : "");
					break;
				case "message" :
					if (d.data !== "")
						m = d.data;
					break;
				case "event" :
					m = {
						name : d.name
					};
					if (d.args && d.args.length)
						m.args = d.args;
					m = b.stringify(m);
					break;
				case "json" :
					m = b.stringify(d.data);
					break;
				case "connect" :
					if (d.qs)
						m = d.qs;
					break;
				case "ack" :
					m = d.ackId
							+ (d.args && d.args.length ? "+"
									+ b.stringify(d.args) : "")
			}
			e = [e, k + (n == "data" ? "+" : ""), g];
			m !== null && m !== void 0 && e.push(m);
			return e.join(":")
		};
		e.encodePayload = function(b) {
			var c = "";
			if (b.length == 1)
				return b[0];
			for (var a = 0, d = b.length; a < d; a++)
				c += "\ufffd" + b[a].length + "\ufffd" + b[a];
			return c
		};
		var k = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
		e.decodePacket = function(d) {
			var h = d.match(k);
			if (!h)
				return {};
			var e = h[2] || "", d = h[5] || "", g = {
				type : a[h[1]],
				endpoint : h[4] || ""
			};
			if (e)
				g.id = e, g.ack = h[3] ? "data" : !0;
			switch (g.type) {
				case "error" :
					h = d.split("+");
					g.reason = f[h[0]] || "";
					g.advice = c[h[1]] || "";
					break;
				case "message" :
					g.data = d || "";
					break;
				case "event" :
					try {
						var n = b.parse(d);
						g.name = n.name;
						g.args = n.args
					} catch (m) {
					}
					g.args = g.args || [];
					break;
				case "json" :
					try {
						g.data = b.parse(d)
					} catch (s) {
					}
					break;
				case "connect" :
					g.qs = d || "";
					break;
				case "ack" :
					if (h = d.match(/^([0-9]+)(\+)?(.*)/))
						if (g.ackId = h[1], g.args = [], h[3])
							try {
								g.args = h[3] ? b.parse(h[3]) : []
							} catch (t) {
							}
			}
			return g
		};
		e.decodePayload = function(b) {
			if (b.charAt(0) == "\ufffd") {
				for (var c = [], a = 1, d = ""; a < b.length; a++)
					b.charAt(a) == "\ufffd"
							? (c.push(e.decodePacket(b.substr(a + 1).substr(0,
									d))), a += Number(d) + 1, d = "")
							: d += b.charAt(a);
				return c
			} else
				return [e.decodePacket(b)]
		}
	})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io
					? io
					: module.parent.exports);
	(function(g, d) {
		function e(a, d) {
			this.socket = a;
			this.sessid = d
		}
		g.Transport = e;
		d.util.mixin(e, d.EventEmitter);
		e.prototype.heartbeats = function() {
			return !0
		};
		e.prototype.onData = function(a) {
			this.clearCloseTimeout();
			(this.socket.connected || this.socket.connecting || this.socket.reconnecting)
					&& this.setCloseTimeout();
			if (a !== "" && (a = d.parser.decodePayload(a)) && a.length)
				for (var f = 0, c = a.length; f < c; f++)
					this.onPacket(a[f]);
			return this
		};
		e.prototype.onPacket = function(a) {
			this.socket.setHeartbeatTimeout();
			if (a.type == "heartbeat")
				return this.onHeartbeat();
			if (a.type == "connect" && a.endpoint == "")
				this.onConnect();
			if (a.type == "error" && a.advice == "reconnect")
				this.isOpen = !1;
			this.socket.onPacket(a);
			return this
		};
		e.prototype.setCloseTimeout = function() {
			if (!this.closeTimeout) {
				var a = this;
				this.closeTimeout = setTimeout(function() {
							a.onDisconnect()
						}, this.socket.closeTimeout)
			}
		};
		e.prototype.onDisconnect = function() {
			this.isOpen && this.close();
			this.clearTimeouts();
			this.socket.onDisconnect();
			return this
		};
		e.prototype.onConnect = function() {
			this.socket.onConnect();
			return this
		};
		e.prototype.clearCloseTimeout = function() {
			if (this.closeTimeout)
				clearTimeout(this.closeTimeout), this.closeTimeout = null
		};
		e.prototype.clearTimeouts = function() {
			this.clearCloseTimeout();
			this.reopenTimeout && clearTimeout(this.reopenTimeout)
		};
		e.prototype.packet = function(a) {
			this.send(d.parser.encodePacket(a))
		};
		e.prototype.onHeartbeat = function() {
			this.packet({
						type : "heartbeat"
					})
		};
		e.prototype.onOpen = function() {
			this.isOpen = !0;
			this.clearCloseTimeout();
			this.socket.onOpen()
		};
		e.prototype.onClose = function() {
			this.isOpen = !1;
			this.socket.onClose();
			this.onDisconnect()
		};
		e.prototype.prepareUrl = function() {
			var a = this.socket.options;
			return this.scheme() + "://" + a.host + ":" + a.port + "/"
					+ a.resource + "/" + d.protocol + "/" + this.name + "/"
					+ this.sessid
		};
		e.prototype.ready = function(a, d) {
			d.call(this)
		}
	})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io
					? io
					: module.parent.exports);
	(function(g, d, e) {
		function a(c) {
			this.options = {
				port : 80,
				secure : !1,
				document : "document" in e ? document : !1,
				resource : "socket.io",
				transports : d.transports,
				"connect timeout" : 1E4,
				"try multiple transports" : !0,
				reconnect : !0,
				"reconnection delay" : 500,
				"reconnection limit" : Infinity,
				"reopen delay" : 3E3,
				"max reconnection attempts" : 10,
				"sync disconnect on unload" : !1,
				"auto connect" : !0,
				"flash policy port" : 10843,
				manualFlush : !1
			};
			d.util.merge(this.options, c);
			this.reconnecting = this.connecting = this.open = this.connected = !1;
			this.namespaces = {};
			this.buffer = [];
			this.doBuffer = !1;
			if (this.options["sync disconnect on unload"]
					&& (!this.isXDomain() || d.util.ua.hasCORS)) {
				var b = this;
				d.util.on(e, "beforeunload", function() {
							b.disconnectSync()
						}, !1)
			}
			this.options["auto connect"] && this.connect()
		}
		function f() {
		}
		g.Socket = a;
		d.util.mixin(a, d.EventEmitter);
		a.prototype.of = function(c) {
			this.namespaces[c]
					|| (this.namespaces[c] = new d.SocketNamespace(this, c), c !== ""
							&& this.namespaces[c].packet({
										type : "connect"
									}));
			return this.namespaces[c]
		};
		a.prototype.publish = function() {
			this.emit.apply(this, arguments);
			var c, b;
			for (b in this.namespaces)
				this.namespaces.hasOwnProperty(b)
						&& (c = this.of(b), c.$emit.apply(c, arguments))
		};
		a.prototype.handshake = function(c) {
			function b(b) {
				b instanceof Error
						? (a.connecting = !1, a.onError(b.message))
						: c.apply(null, b.split(":"))
			}
			var a = this, e = this.options, e = [
					"http" + (e.secure ? "s" : "") + ":/",
					e.host + ":" + e.port, e.resource, d.protocol,
					d.util.query(this.options.query, "t=" + +new Date)]
					.join("/");
			if (this.isXDomain() && !d.util.ua.hasCORS) {
				var g = document.getElementsByTagName("script")[0], j = document
						.createElement("script");
				j.src = e + "&jsonp=" + d.j.length;
				g.parentNode.insertBefore(j, g);
				d.j.push(function(c) {
							b(c);
							j.parentNode.removeChild(j)
						})
			} else {
				var i = d.util.request();
				i.open("GET", e, !0);
				if (this.isXDomain())
					i.withCredentials = !0;
				i.onreadystatechange = function() {
					if (i.readyState == 4)
						if (i.onreadystatechange = f, i.status == 200)
							b(i.responseText);
						else if (i.status == 403)
							a.onError(i.responseText);
						else
							a.connecting = !1, !a.reconnecting
									&& a.onError(i.responseText)
				};
				i.send(null)
			}
		};
		a.prototype.getTransport = function(c) {
			for (var c = c || this.transports, b = 0, a; a = c[b]; b++)
				if (d.Transport[a]
						&& d.Transport[a].check(this)
						&& (!this.isXDomain() || d.Transport[a]
								.xdomainCheck(this)))
					return new d.Transport[a](this, this.sessionid);
			return null
		};
		a.prototype.connect = function(c) {
			if (this.connecting)
				return this;
			var b = this;
			b.connecting = !0;
			this.handshake(function(a, e, f, g) {
				function i(c) {
					b.transport && b.transport.clearTimeouts();
					b.transport = b.getTransport(c);
					if (!b.transport)
						return b.publish("connect_failed");
					b.transport.ready(b, function() {
						b.connecting = !0;
						b.publish("connecting", b.transport.name);
						b.transport.open();
						if (b.options["connect timeout"])
							b.connectTimeoutTimer = setTimeout(function() {
								if (!b.connected
										&& (b.connecting = !1, b.options["try multiple transports"])) {
									for (var c = b.transports; c.length > 0
											&& c.splice(0, 1)[0] != b.transport.name;);
									c.length ? i(c) : b
											.publish("connect_failed")
								}
							}, b.options["connect timeout"])
					})
				}
				b.sessionid = a;
				b.closeTimeout = f * 1E3;
				b.heartbeatTimeout = e * 1E3;
				if (!b.transports)
					b.transports = b.origTransports = g
							? d.util.intersect(g.split(","),
									b.options.transports)
							: b.options.transports;
				b.setHeartbeatTimeout();
				i(b.transports);
				b.once("connect", function() {
							clearTimeout(b.connectTimeoutTimer);
							c && typeof c == "function" && c()
						})
			});
			return this
		};
		a.prototype.setHeartbeatTimeout = function() {
			clearTimeout(this.heartbeatTimeoutTimer);
			if (!this.transport || this.transport.heartbeats()) {
				var c = this;
				this.heartbeatTimeoutTimer = setTimeout(function() {
							c.transport.onClose()
						}, this.heartbeatTimeout)
			}
		};
		a.prototype.packet = function(c) {
			this.connected && !this.doBuffer
					? this.transport.packet(c)
					: this.buffer.push(c);
			return this
		};
		a.prototype.setBuffer = function(c) {
			this.doBuffer = c;
			!c && this.connected && this.buffer.length
					&& (this.options.manualFlush || this.flushBuffer())
		};
		a.prototype.flushBuffer = function() {
			this.transport.payload(this.buffer);
			this.buffer = []
		};
		a.prototype.disconnect = function() {
			if (this.connected || this.connecting)
				this.open && this.of("").packet({
							type : "disconnect"
						}), this.onDisconnect("booted");
			return this
		};
		a.prototype.disconnectSync = function() {
			var c = d.util.request(), b = [
					"http" + (this.options.secure ? "s" : "") + ":/",
					this.options.host + ":" + this.options.port,
					this.options.resource, d.protocol, "", this.sessionid]
					.join("/")
					+ "/?disconnect=1";
			c.open("GET", b, !1);
			c.send(null);
			this.onDisconnect("booted")
		};
		a.prototype.isXDomain = function() {
			var c = e.location.port
					|| ("https:" == e.location.protocol ? 443 : 80);
			return this.options.host !== e.location.hostname
					|| this.options.port != c
		};
		a.prototype.onConnect = function() {
			if (!this.connected)
				this.connected = !0, this.connecting = !1, this.doBuffer
						|| this.setBuffer(!1), this.emit("connect")
		};
		a.prototype.onOpen = function() {
			this.open = !0
		};
		a.prototype.onClose = function() {
			this.open = !1;
			clearTimeout(this.heartbeatTimeoutTimer)
		};
		a.prototype.onPacket = function(c) {
			this.of(c.endpoint).onPacket(c)
		};
		a.prototype.onError = function(c) {
			if (c && c.advice && c.advice === "reconnect"
					&& (this.connected || this.connecting))
				this.disconnect(), this.options.reconnect && this.reconnect();
			this.publish("error", c && c.reason ? c.reason : c)
		};
		a.prototype.onDisconnect = function(c) {
			var b = this.connected, a = this.connecting;
			this.open = this.connecting = this.connected = !1;
			if (b || a)
				this.transport.close(), this.transport.clearTimeouts(), b
						&& (this.publish("disconnect", c), "booted" != c
								&& this.options.reconnect && !this.reconnecting
								&& this.reconnect())
		};
		a.prototype.reconnect = function() {
			function c() {
				if (a.connected) {
					for (var c in a.namespaces)
						a.namespaces.hasOwnProperty(c) && "" !== c
								&& a.namespaces[c].packet({
											type : "connect"
										});
					a.publish("reconnect", a.transport.name,
							a.reconnectionAttempts)
				}
				clearTimeout(a.reconnectionTimer);
				a.removeListener("connect_failed", b);
				a.removeListener("connect", b);
				a.reconnecting = !1;
				delete a.reconnectionAttempts;
				delete a.reconnectionDelay;
				delete a.reconnectionTimer;
				delete a.redoTransports;
				a.options["try multiple transports"] = e
			}
			function b() {
				if (a.reconnecting) {
					if (a.connected)
						return c();
					if (a.connecting && a.reconnecting)
						return a.reconnectionTimer = setTimeout(b, 1E3);
					a.reconnectionAttempts++ >= d
							? a.redoTransports
									? (a.publish("reconnect_failed"), c())
									: (a.on("connect_failed", b), a.options["try multiple transports"] = !0, a.transports = a.origTransports, a.transport = a
											.getTransport(), a.redoTransports = !0, a
											.connect())
							: (a.reconnectionDelay < f
									&& (a.reconnectionDelay *= 2), a.connect(), a
									.publish("reconnecting",
											a.reconnectionDelay,
											a.reconnectionAttempts), a.reconnectionTimer = setTimeout(
									b, a.reconnectionDelay))
				}
			}
			this.reconnecting = !0;
			this.reconnectionAttempts = 0;
			this.reconnectionDelay = this.options["reconnection delay"];
			var a = this, d = this.options["max reconnection attempts"], e = this.options["try multiple transports"], f = this.options["reconnection limit"];
			this.options["try multiple transports"] = !1;
			this.reconnectionTimer = setTimeout(b, this.reconnectionDelay);
			this.on("connect", b)
		}
	})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io
					? io
					: module.parent.exports, this);
	(function(g, d) {
		function e(d, c) {
			this.socket = d;
			this.name = c || "";
			this.flags = {};
			this.json = new a(this, "json");
			this.ackPackets = 0;
			this.acks = {}
		}
		function a(a, c) {
			this.namespace = a;
			this.name = c
		}
		g.SocketNamespace = e;
		d.util.mixin(e, d.EventEmitter);
		e.prototype.$emit = d.EventEmitter.prototype.emit;
		e.prototype.of = function() {
			return this.socket.of.apply(this.socket, arguments)
		};
		e.prototype.packet = function(a) {
			a.endpoint = this.name;
			this.socket.packet(a);
			this.flags = {};
			return this
		};
		e.prototype.send = function(a, c) {
			var b = {
				type : this.flags.json ? "json" : "message",
				data : a
			};
			if ("function" == typeof c)
				b.id = ++this.ackPackets, b.ack = !0, this.acks[b.id] = c;
			return this.packet(b)
		};
		e.prototype.emit = function(a) {
			var c = Array.prototype.slice.call(arguments, 1), b = c[c.length
					- 1], d = {
				type : "event",
				name : a
			};
			if ("function" == typeof b)
				d.id = ++this.ackPackets, d.ack = "data", this.acks[d.id] = b, c = c
						.slice(0, c.length - 1);
			d.args = c;
			return this.packet(d)
		};
		e.prototype.disconnect = function() {
			this.name === "" ? this.socket.disconnect() : (this.packet({
						type : "disconnect"
					}), this.$emit("disconnect"));
			return this
		};
		e.prototype.onPacket = function(a) {
			function c() {
				b.packet({
							type : "ack",
							args : d.util.toArray(arguments),
							ackId : a.id
						})
			}
			var b = this;
			switch (a.type) {
				case "connect" :
					this.$emit("connect");
					break;
				case "disconnect" :
					if (this.name === "")
						this.socket.onDisconnect(a.reason || "booted");
					else
						this.$emit("disconnect", a.reason);
					break;
				case "message" :
				case "json" :
					var e = ["message", a.data];
					a.ack == "data" ? e.push(c) : a.ack && this.packet({
								type : "ack",
								ackId : a.id
							});
					this.$emit.apply(this, e);
					break;
				case "event" :
					e = [a.name].concat(a.args);
					a.ack == "data" && e.push(c);
					this.$emit.apply(this, e);
					break;
				case "ack" :
					this.acks[a.ackId]
							&& (this.acks[a.ackId].apply(this, a.args), delete this.acks[a.ackId]);
					break;
				case "error" :
					if (a.advice)
						this.socket.onError(a);
					else
						a.reason == "unauthorized" ? this.$emit(
								"connect_failed", a.reason) : this.$emit(
								"error", a.reason)
			}
		};
		a.prototype.send = function() {
			this.namespace.flags[this.name] = !0;
			this.namespace.send.apply(this.namespace, arguments)
		};
		a.prototype.emit = function() {
			this.namespace.flags[this.name] = !0;
			this.namespace.emit.apply(this.namespace, arguments)
		}
	})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io
					? io
					: module.parent.exports);
	(function(g, d, e) {
		function a() {
			d.Transport.apply(this, arguments)
		}
		g.websocket = a;
		d.util.inherit(a, d.Transport);
		a.prototype.name = "websocket";
		a.prototype.open = function() {
			var a = d.util.query(this.socket.options.query), c = this, b;
			b || (b = e.MozWebSocket || e.WebSocket);
			this.websocket = new b(this.prepareUrl() + a);
			this.websocket.onopen = function() {
				c.onOpen();
				c.socket.setBuffer(!1)
			};
			this.websocket.onmessage = function(a) {
				c.onData(a.data)
			};
			this.websocket.onclose = function() {
				c.onClose();
				c.socket.setBuffer(!0)
			};
			this.websocket.onerror = function(a) {
				c.onError(a)
			};
			return this
		};
		a.prototype.send = d.util.ua.iDevice ? function(a) {
			var c = this;
			setTimeout(function() {
						c.websocket.send(a)
					}, 0);
			return this
		} : function(a) {
			this.websocket.send(a);
			return this
		};
		a.prototype.payload = function(a) {
			for (var c = 0, b = a.length; c < b; c++)
				this.packet(a[c]);
			return this
		};
		a.prototype.close = function() {
			this.websocket.close();
			return this
		};
		a.prototype.onError = function(a) {
			this.socket.onError(a)
		};
		a.prototype.scheme = function() {
			return this.socket.options.secure ? "wss" : "ws"
		};
		a.check = function() {
			return "WebSocket" in e && !("__addTask" in WebSocket)
					|| "MozWebSocket" in e
		};
		a.xdomainCheck = function() {
			return !0
		};
		d.transports.push("websocket")
	})("undefined" != typeof io ? io.Transport : module.exports,
			"undefined" != typeof io ? io : module.parent.exports, this);
	(function(g, d, e) {
		function a(a) {
			if (a)
				d.Transport.apply(this, arguments), this.sendBuffer = []
		}
		function f() {
		}
		g.XHR = a;
		d.util.inherit(a, d.Transport);
		a.prototype.open = function() {
			this.socket.setBuffer(!1);
			this.onOpen();
			this.get();
			this.setCloseTimeout();
			return this
		};
		a.prototype.payload = function(a) {
			for (var b = [], e = 0, f = a.length; e < f; e++)
				b.push(d.parser.encodePacket(a[e]));
			this.send(d.parser.encodePayload(b))
		};
		a.prototype.send = function(a) {
			this.post(a);
			return this
		};
		a.prototype.post = function(a) {
			function b() {
				if (this.readyState == 4)
					if (this.onreadystatechange = f, g.posting = !1, this.status == 200)
						g.socket.setBuffer(!1);
					else
						g.onClose()
			}
			function d() {
				this.onload = f;
				g.socket.setBuffer(!1)
			}
			var g = this;
			this.socket.setBuffer(!0);
			this.sendXHR = this.request("POST");
			e.XDomainRequest && this.sendXHR instanceof XDomainRequest
					? this.sendXHR.onload = this.sendXHR.onerror = d
					: this.sendXHR.onreadystatechange = b;
			this.sendXHR.send(a)
		};
		a.prototype.close = function() {
			this.onClose();
			return this
		};
		a.prototype.request = function(a) {
			var b = d.util.request(this.socket.isXDomain()), e = d.util.query(
					this.socket.options.query, "t=" + +new Date);
			b.open(a || "GET", this.prepareUrl() + e, !0);
			if (a == "POST")
				try {
					b.setRequestHeader
							? b.setRequestHeader("Content-type",
									"text/plain;charset=UTF-8")
							: b.contentType = "text/plain"
				} catch (f) {
				}
			return b
		};
		a.prototype.scheme = function() {
			return this.socket.options.secure ? "https" : "http"
		};
		a.check = function(a, b) {
			try {
				var f = d.util.request(b), g = e.XDomainRequest
						&& f instanceof XDomainRequest, p = a && a.options
						&& a.options.secure ? "https:" : "http:", j = e.location
						&& p != e.location.protocol;
				if (f && (!g || !j))
					return !0
			} catch (i) {
			}
			return !1
		};
		a.xdomainCheck = function(c) {
			return a.check(c, !0)
		}
	})("undefined" != typeof io ? io.Transport : module.exports,
			"undefined" != typeof io ? io : module.parent.exports, this);
	(function(g, d) {
		function e() {
			d.Transport.XHR.apply(this, arguments)
		}
		g.htmlfile = e;
		d.util.inherit(e, d.Transport.XHR);
		e.prototype.name = "htmlfile";
		e.prototype.get = function() {
			this.doc = new (window[["Active"].concat("Object").join("X")])("htmlfile");
			this.doc.open();
			this.doc.write("<html></html>");
			this.doc.close();
			this.doc.parentWindow.s = this;
			var a = this.doc.createElement("div");
			a.className = "socketio";
			this.doc.body.appendChild(a);
			this.iframe = this.doc.createElement("iframe");
			a.appendChild(this.iframe);
			var e = this, a = d.util.query(this.socket.options.query, "t="
							+ +new Date);
			this.iframe.src = this.prepareUrl() + a;
			d.util.on(window, "unload", function() {
						e.destroy()
					})
		};
		e.prototype._ = function(a, d) {
			this.onData(a);
			try {
				var c = d.getElementsByTagName("script")[0];
				c.parentNode.removeChild(c)
			} catch (b) {
			}
		};
		e.prototype.destroy = function() {
			if (this.iframe) {
				try {
					this.iframe.src = "about:blank"
				} catch (a) {
				}
				this.doc = null;
				this.iframe.parentNode.removeChild(this.iframe);
				this.iframe = null;
				CollectGarbage()
			}
		};
		e.prototype.close = function() {
			this.destroy();
			return d.Transport.XHR.prototype.close.call(this)
		};
		e.check = function(a) {
			if (typeof window != "undefined"
					&& ["Active"].concat("Object").join("X") in window)
				try {
					return new (window[["Active"].concat("Object").join("X")])("htmlfile")
							&& d.Transport.XHR.check(a)
				} catch (e) {
				}
			return !1
		};
		e.xdomainCheck = function() {
			return !1
		};
		d.transports.push("htmlfile")
	})("undefined" != typeof io ? io.Transport : module.exports,
			"undefined" != typeof io ? io : module.parent.exports);
	(function(g, d, e) {
		function a() {
			d.Transport.XHR.apply(this, arguments)
		}
		function f() {
		}
		g["xhr-polling"] = a;
		d.util.inherit(a, d.Transport.XHR);
		d.util.merge(a, d.Transport.XHR);
		a.prototype.name = "xhr-polling";
		a.prototype.heartbeats = function() {
			return !1
		};
		a.prototype.open = function() {
			d.Transport.XHR.prototype.open.call(this);
			return !1
		};
		a.prototype.get = function() {
			function a() {
				if (this.readyState == 4)
					if (this.onreadystatechange = f, this.status == 200)
						g.onData(this.responseText), g.get();
					else
						g.onClose()
			}
			function b() {
				this.onerror = this.onload = f;
				g.retryCounter = 1;
				g.onData(this.responseText);
				g.get()
			}
			function d() {
				g.retryCounter++;
				if (!g.retryCounter || g.retryCounter > 3)
					g.onClose();
				else
					g.get()
			}
			if (this.isOpen) {
				var g = this;
				this.xhr = this.request();
				e.XDomainRequest && this.xhr instanceof XDomainRequest
						? (this.xhr.onload = b, this.xhr.onerror = d)
						: this.xhr.onreadystatechange = a;
				this.xhr.send(null)
			}
		};
		a.prototype.onClose = function() {
			d.Transport.XHR.prototype.onClose.call(this);
			if (this.xhr) {
				this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = f;
				try {
					this.xhr.abort()
				} catch (a) {
				}
				this.xhr = null
			}
		};
		a.prototype.ready = function(a, b) {
			var e = this;
			d.util.defer(function() {
						b.call(e)
					})
		};
		d.transports.push("xhr-polling")
	})("undefined" != typeof io ? io.Transport : module.exports,
			"undefined" != typeof io ? io : module.parent.exports, this);
	(function(g, d, e) {
		function a() {
			d.Transport["xhr-polling"].apply(this, arguments);
			this.index = d.j.length;
			var a = this;
			d.j.push(function(b) {
						a._(b)
					})
		}
		var f = e.document
				&& "MozAppearance" in e.document.documentElement.style;
		g["jsonp-polling"] = a;
		d.util.inherit(a, d.Transport["xhr-polling"]);
		a.prototype.name = "jsonp-polling";
		a.prototype.post = function(a) {
			function b() {
				e();
				f.socket.setBuffer(!1)
			}
			function e() {
				f.iframe && f.form.removeChild(f.iframe);
				try {
					n = document.createElement('<iframe name="' + f.iframeId
							+ '">')
				} catch (a) {
					n = document.createElement("iframe"), n.name = f.iframeId
				}
				n.id = f.iframeId;
				f.form.appendChild(n);
				f.iframe = n
			}
			var f = this, g = d.util.query(this.socket.options.query, "t="
							+ +new Date + "&i=" + this.index);
			if (!this.form) {
				var j = document.createElement("form"), i = document
						.createElement("textarea"), r = this.iframeId = "socketio_iframe_"
						+ this.index, n;
				j.className = "socketio";
				j.style.position = "absolute";
				j.style.top = "0px";
				j.style.left = "0px";
				j.style.display = "none";
				j.target = r;
				j.method = "POST";
				j.setAttribute("accept-charset", "utf-8");
				i.name = "d";
				j.appendChild(i);
				document.body.appendChild(j);
				this.form = j;
				this.area = i
			}
			this.form.action = this.prepareUrl() + g;
			e();
			this.area.value = d.JSON.stringify(a);
			try {
				this.form.submit()
			} catch (m) {
			}
			this.iframe.attachEvent ? n.onreadystatechange = function() {
				f.iframe.readyState == "complete" && b()
			} : this.iframe.onload = b;
			this.socket.setBuffer(!0)
		};
		a.prototype.get = function() {
			var a = this, b = document.createElement("script"), e = d.util
					.query(this.socket.options.query, "t=" + +new Date + "&i="
									+ this.index);
			if (this.script)
				this.script.parentNode.removeChild(this.script), this.script = null;
			b.async = !0;
			b.src = this.prepareUrl() + e;
			b.onerror = function() {
				a.onClose()
			};
			e = document.getElementsByTagName("script")[0];
			e.parentNode.insertBefore(b, e);
			this.script = b;
			f && setTimeout(function() {
						var a = document.createElement("iframe");
						document.body.appendChild(a);
						document.body.removeChild(a)
					}, 100)
		};
		a.prototype._ = function(a) {
			this.onData(a);
			this.isOpen && this.get();
			return this
		};
		a.prototype.ready = function(a, b) {
			var e = this;
			if (!f)
				return b.call(this);
			d.util.load(function() {
						b.call(e)
					})
		};
		a.check = function() {
			return "document" in e
		};
		a.xdomainCheck = function() {
			return !0
		};
		d.transports.push("jsonp-polling")
	})("undefined" != typeof io ? io.Transport : module.exports,
			"undefined" != typeof io ? io : module.parent.exports, this);
	typeof define === "function" && define.amd && define([], function() {
				return io
			})
})();
(function(a) {
	MOGU.Globe_Socket_Info_Update = function() {
		if (!(MOGUPROFILE == void 0 || MOGUPROFILE.userid == void 0 || MOGUPROFILE.userid == "")) {
			var i = a(".message_menu").size() > 0 ? !0 : !1;
			if (i)
				var b = a(".mess_type_list"), j = b.find(".info_atme"), k = b
						.find(".info_fav"), l = b.find(".info_privatemsg"), m = b
						.find(".info_sysmsg");
			var n = [
					'<li>{{? it.catmeNew > 0 }} <a href="/infocenter/atme">\u5bf9\u8bdd<span>({{= it.catmeNew }})</span></a>{{??}} <a href="/infocenter/atme">\u5bf9\u8bdd</a>{{?}} </li><li>{{? it.cfavedNew > 0 }} <a href="/infocenter/fav/">\u559c\u6b22\u6211\u7684(<span>{{= it.cfavedNew }})</span></a>{{??}} <a href="/infocenter/fav/">\u559c\u6b22\u6211\u7684</a>{{?}} </li><li>{{? it.cmsgNew > 0 }} <a href="/infocenter/privatemsg/">\u6211\u7684\u79c1\u4fe1<span>({{= it.cmsgNew }})</span></a>{{??}} <a href="/infocenter/privatemsg/">\u6211\u7684\u79c1\u4fe1</a>{{?}} </li><li>{{? it.csysmsgNew > 0 }} <a href="/infocenter/sysmsg/">\u7cfb\u7edf\u901a\u77e5<span>({{= it.csysmsgNew }})</span></a>{{??}} <a href="/infocenter/sysmsg/">\u7cfb\u7edf\u901a\u77e5</a>{{?}} </li><li>{{? it.fansNew > 0 }} ',
					'<a href="/u/'
							+ MOGUPROFILE.userid
							+ '/fans">\u6211\u7684\u7c89\u4e1d<span>({{= it.fansNew }})</span></a>',
					"{{??}} ",
					'<a href="/u/' + MOGUPROFILE.userid
							+ '/fans">\u6211\u7684\u7c89\u4e1d</a>',
					'{{?}} </li><li class="clear_notice"><a href="javascript:;">\u6211\u77e5\u9053\u4e86</a></li>']
					.join(""), p = {
				catmeNew : 0,
				cfavedNew : 0,
				cmsgNew : 0,
				csysmsgNew : 0,
				fansNew : 0
			};
			a("#notice_menu .clear_notice a").live("click", function() {
				a("#notice_menu").html(MGTOOL.template(n, p)).hide();
				a(".my_shotcuts .msg_notice").text("\u6d88\u606f")
						.removeClass("h");
				MGTOOL.setCookie("__mgjccInfo", null, {
							path : "/"
						});
				a.post("/collect/cancelinfo")
			});
			var q = function(c) {
				parseInt(c.cmessageNew);
				var d = parseInt(c.a), e = parseInt(c.b), f = parseInt(c.c), b = parseInt(c.d), g = parseInt(c.e), h = parseInt(c.f), c = a(".my_shotcuts .msg_notice");
				h > 0
						? (a(".user_active_num").each(function() {
									a(this).find(".con").html(h);
									a(this).show()
								}), a("#wb_active_new").remove(), a("#active_new_messages_box")
								.size() > 0
								&& a("#active_new_messages_box")
										.append('<div class="r5" id="wb_active_new"><a href="/active">\u6709{num}\u6761\u65b0\u52a8\u6001\uff0c\u70b9\u6b64\u5237\u65b0...</a></div>'
												.replace(/{num}/g, h)))
						: (a(".user_active_num").hide(), a("#wb_active_new")
								.remove());
				var o = d + b + e + f + g;
				o > 0 ? c.text("\u6d88\u606f(" + o + ")").addClass("h") : c
						.text("\u6d88\u606f").removeClass("h");
				b = {
					catmeNew : d,
					cfavedNew : e,
					cmsgNew : f,
					csysmsgNew : g,
					fansNew : b
				};
				a("#notice_menu").html(MGTOOL.template(n, b));
				i
						&& (d > 0 ? j.html('\u5bf9\u8bdd <b class="atme r5">'
								+ (d > 999 ? "999+" : d) + "</b>") : j
								.html("\u5bf9\u8bdd"), e > 0
								? k
										.html('\u559c\u6b22\u6211\u7684 <b class="info_fav r5">'
												+ (e > 999 ? "999+" : e)
												+ "</b>")
								: k.html("\u559c\u6b22\u6211\u7684"), f > 0 ? l
								.html('\u79c1\u4fe1 <b class="info_fav r5">'
										+ (f > 999 ? "999+" : f) + "</b>") : l
								.html("\u79c1\u4fe1"), g > 0
								? m
										.html('\u7cfb\u7edf\u901a\u77e5 <b class="info_fav r5">'
												+ (g > 999 ? "999+" : g)
												+ "</b>")
								: m.html("\u7cfb\u7edf\u901a\u77e5"))
			};
			(function() {
				var a = MOGUPROFILE.userid, b = io
						.connect("http://cinfo.juangua.com:8089");
				b.emit("userid", {
							userid : a
						});
				b.on("cinfonew_" + a, function(a) {
							q(a)
						})
			})()
		}
	};
	MOGU.Globe_Socket_Info_Update()
})(jQuery);
(function(a) {
	MOGU.Globe_Back_To_Top_Init = function() {
		if (a(".back2top_ex")[0]) {
			var b = a(".back2top_ex"), e = !1, h = !0, f = null, c = 960;
			a.browser.msie && a.browser.version == "6.0" ? (c = 950, b.css(
					"position", "absolute")) : (c = 953, b.css("top", a(window)
							.height()
							- 200 + "px"));
			b.css("left", Math.floor((a(window).width() - c) / 2) + c + 5
							+ "px");
			a(window).width() < 1100 && b.css("left", a(window).width() - 65);
			var g = !1;
			a(window).scroll(function() {
				g && clearTimeout(g);
				g = setTimeout(function() {
							a(window).scrollTop() == 0
									? (b.hide(), e = !0)
									: e == !0 ? (e = !1, b.show()) : h == !0
											&& (b.show(), h = !1);
							a.browser.msie
									&& a.browser.version == "6.0"
									&& (b.css("top", a(window).height()
													+ a(window).scrollTop()
													- 200 + "px"), f != null
											&& (clearTimeout(f), b.css(
													"display", "none")), a(window)
											.scrollTop() > 0
											&& (f = setTimeout(
													"$('.back2top_ex').show('10');",
													100)))
						}, 1E3)
			});
			a(window).resize(function() {
				a.browser.msie && a.browser.version == "6.0" ? b
						.css("top", a(window).height() + a(window).scrollTop()
										- 200 + "px") : b.css("top", a(window)
								.height()
								- 200 + "px");
				c = a.browser.msie && a.browser.version == "6.0" ? 950 : 953;
				b.css("left", Math.floor((a(window).width() - c) / 2) + c + 5
								+ "px");
				var d = Math.floor((a(window).width() - c) / 2);
				d > 10 && b.css("left", d + c + 5 + "px");
				a(window).width() < 1100
						&& b.css("left", a(window).width() - 65)
			})
		} else if (a("#back2top")[0])
			b = a("#back2top"), c = 960, c = a.browser.msie
					&& a.browser.version == "6.0" ? 950 : 953, b.css("left",
					Math.floor((a(window).width() - c) / 2) + c + 5 + "px"), a(window)
					.scroll(function() {
								i(b)
							}), a(window).resize(function() {
						var d = Math.floor((a(window).width() - c) / 2);
						d > 10 && b.css("left", d + c + 5 + "px")
					});
		else if (a(".back2top_fat")[0]) {
			var b = a(".back2top_fat"), j = a(".back2top_fat .b_img");
			a(window).scroll(function() {
						i(j)
					})
		}
		var i = function(b) {
			setTimeout(function() {
						a(window).scrollTop() == 0
								? b.css("display", "none")
								: b.css("display", "block")
					}, 200);
			b.live("click", function() {
						a("html, body").animate({
									scrollTop : 0
								}, 0)
					})
		}
	};
	MOGU.Globe_Back_To_Top_Init()
})(jQuery);
(function(a) {
	a.fn.extend({
		MOGU_Follow : function(b) {
			var c = {
				a_addfo : "<a href='javascript:;' class='addfo'>\u52a0\u5173\u6ce8</a>",
				a_delfo : "<a href='javascript:;' class='delfo'>\u53d6\u6d88\u5173\u6ce8</a>",
				span_fook : "<span class='fo_ok'>OK</span>",
				span_followed : "<span class='followed'>\u5df2\u5173\u6ce8</span>",
				add_all : "<span class='addall'>\u4e92\u76f8\u5173\u6ce8</span><a class='unfollow' href='javascript:void(0);' >\u53d6\u6d88</a>",
				add_ok : '<span class="add_ok">\u5df2\u5173\u6ce8</span><a href="javascript:void(0);" class="unfollow">\u53d6\u6d88</a>',
				add_e : "<a class='add_e' href='javascript:;'>\u5173\u6ce8</a>",
				add_a : "<span class='addall' href='javascript:;'>\u4e92\u76f8\u5173\u6ce8</span>"
			}, f = a.extend({
						wrap_div_class : "followdiv",
						add_fos : "one",
						addfo_class : "addfo"
					}, b), b = a("." + f.wrap_div_class), d = {};
			a(".addfo,.add_e", b).live("click", function() {
						if (MOGUPROFILE.userid == "") {
							MOGU.user_handsome_login_init();
							var c = a(this);
							MOGU.user_handsome_login(!1, {
										callback : function() {
											c.click()
										}
									})
						} else {
							if ("one" === f.add_fos)
								var b = a(this).parent().attr("uid"), b = Array(b);
							d = {
								followIds : b
							};
							g("/collect/addfollow", d, a(this), "add_follow")
						}
					});
			a(".unfollow", b).live("click", function() {
				if (!confirm("\u786e\u5b9a\u8981\u53d6\u6d88\u5173\u6ce8\u4e48\uff1f"))
					return !1;
				d = {
					followIds : a(this).parent().attr("uid")
				};
				g("/collect/unfollow", d, a(this), "del_fo")
			});
			a(".addfo_all").click(function() {
				var c = [], b = [];
				a(".si_friends .sif_f").each(function() {
					a(this).find(".s_in").attr("checked") == "checked"
							&& (c.push(a(this).find(".foit").attr("uid")), b
									.push(a(this).find(".foit").attr("sname")), a(this)
									.parent().remove(), a(this).fadeOut(500,
									function() {
									}))
				});
				if (c.length == 0)
					return alert("\u8bf7\u9009\u62e9\u7528\u6237!"), !1;
				a(".si_friends li").size() == 0
						&& a(".sina_invite, .si_down").fadeOut();
				d = {
					followIds : c,
					zone_sina_fo : "zone_sina_fo",
					sina_name_array : b
				};
				g("/collect/addfollow", d, a(this), "add_follow")
			});
			var g = function(b, d, e, g) {
				a.ajax({
					url : b,
					type : "POST",
					timeout : 6E4,
					data : d,
					dataType : "json",
					success : function(a) {
						if (a == null)
							alert(MGLANG.msgTimeout);
						else {
							var b = a.status.msg;
							a.status.code == 1001
									? (a = a.result.data.relationships[0], "add_follow" == g
											? e.parent().attr("type") == "all"
													? a == "r1"
															? e
																	.parent()
																	.html(c.add_ok)
															: a == "r3"
																	&& e
																			.parent()
																			.html(c.add_all)
													: e.attr("type") != "sina"
															&& (e
																	.parent()
																	.attr("type") == "group"
																	? e
																			.parent()
																			.html(c.span_followed)
																	: a == "r1"
																			? e
																					.parent()
																					.html(c.span_followed)
																			: a == "r3"
																					&& e
																							.parent()
																							.html(c.add_a))
											: "del_fo" == g
													&& (a == "r2"
															? e
																	.parent()
																	.html(c.add_e)
															: a == "r0"
																	&& e
																			.parent()
																			.html(c.a_addfo)))
									: alert(b)
						}
					},
					error : function(a, c) {
						"timeout" == c && alert(MGLANG.msgTimeout)
					}
				})
			};
			return this
		}
	});
	MOGU.FollowStar = function() {
		a(".follow_star_div .addfo").live("click", function() {
			if (MOGUPROFILE.userid == "") {
				MOGU.user_handsome_login_init();
				var b = a(this);
				MOGU.user_handsome_login(!1, {
							callback : function() {
								b.click()
							}
						})
			} else {
				var c = a(this).parent(), f = c.attr("sid"), d = '<span class="add_ok">\u5df2\u5173\u6ce8</span><a href="javascript:;" class="unfollow">\u53d6\u6d88</a>';
				c.attr("type") == "noadd"
						&& (d = '<span class="followed">\u5df2\u5173\u6ce8</span>');
				a.ajax({
							url : "/star/follow",
							data : {
								starId : f
							},
							type : "post",
							dataType : "json",
							success : function(a) {
								if (a == null)
									alert(MGLANG.msgTimeout);
								else {
									var b = a.status.msg;
									a.status.code == 1001
											? c.html(d)
											: alert(b)
								}
							}
						})
			}
		});
		a(".follow_star_div .unfollow").live("click", function() {
			if (MOGUPROFILE.userid == "") {
				MOGU.user_handsome_login_init();
				var b = a(this);
				MOGU.user_handsome_login(!1, {
							callback : function() {
								b.click()
							}
						})
			} else {
				var c = a(this).parent(), f = c.attr("sid");
				a.ajax({
					url : "/star/delfollow",
					data : {
						starId : f
					},
					type : "post",
					dataType : "json",
					success : function(a) {
						if (a == null)
							alert(MGLANG.msgTimeout);
						else {
							var b = a.status.msg;
							a.status.code == 1001
									? c
											.html('<a class="addfo" href="javascript:;">\u5173\u6ce8</a>')
									: alert(b)
						}
					}
				})
			}
		})
	};
	a(".followdiv").MOGU_Follow();
	MOGU.FollowStar()
})(jQuery);
(function(c) {
	c.fn.pubimg = function(h) {
		var e = c.extend({}, {
					callback : function(a, c, e, b) {
						MGTOOL.log("code:" + a);
						MGTOOL.log("msg:" + c);
						MGTOOL.log("imgId:" + e);
						MGTOOL.log("path:" + b)
					},
					prefun : function() {
						return !0
					},
					ifUserLogin : !0
				}, h), g = function() {
			var a = "publish_tool_photo_success_"
					+ Math.floor(Math.random() * 99 + 1);
			return window[a] ? g() : a
		};
		e.funName = g();
		return this.each(function() {
			var a = c(this), d = !0;
			a.unbind("click");
			a.bind("click", function() {
						if (e.ifUserLogin && MOGUPROFILE.userid == "")
							return MOGU.user_handsome_login_init(), MOGU
									.user_handsome_login(!1, {
												callback : function() {
													a.show();
													a.click()
												}
											}), d = !1;
						if (e.prefun && !e.prefun())
							return d = !1;
						d = !0
					});
			a.unbind("change");
			a.bind("change", function() {
				if (!d)
					return !1;
				loading_light_box = new MGLightBox({
							title : "",
							lightBoxId : "lb_loading",
							ajax : !0,
							isBgClickClose : !1
						});
				loading_light_box.init();
				var f = null;
				setTimeout(function() {
					c("#ifr_picup").parent().remove();
					f && clearInterval(f);
					var b = a.parents("form");
					location.hostname != "www.mogujie.com"
							? b.find("input[name=host]").size() == 0
									&& b.append('<input type="hidden" value="'
											+ location.host + '" name="host">')
							: (b.find("input[name=host]").size() == 0
									&& b.append('<input type="hidden" value="'
											+ location.host + '" name="host">'), b
									.attr("action",
											"http://upload.mogujie.com/upload/addpic/"));
					b.find("input[name=callback]").size() == 0
							&& b.append('<input type="hidden" value="'
									+ e.funName + '" name="callback">');
					c("#ifr_picup").size() == 0
							&& c("body")
									.append('<div style="display: none;"><iframe frameborder="0" name="ifr_picup" id="ifr_picup" src="about:blank"></iframe></div>');
					b.attr("target", "ifr_picup");
					b.submit();
					a.val("");
					var d = 0;
					f = setInterval(function() {
						d == 180
								&& (c("#ifr_picup").parent().remove(), alert(MGLANG.msgTimeout), clearInterval(f));
						d++
					}, 1E3);
					window[e.funName] = function(a, b, c, d) {
						loading_light_box.close();
						clearInterval(f);
						a != 1001 ? alert(b) : e.callback(a, b, c, d)
					}
				}, 0)
			})
		})
	}
})(jQuery);
(function(a) {
	MOGU.Zone_Choose_Album = function() {
		var f = a(".chose_album .choose"), g = a(".chose_album .choose_r");
		a(".chose_album .choose").live("click", function() {
			a("#zone_album").size() == 0
					&& a("body")
							.append('<div class="my_album" id="zone_album"><div class="album_pr"><div class="my_album_list"></div><div class="create clearfix"><input type="text" class="album_name" value="\u8f93\u5165\u65b0\u4e13\u8f91\u540d"><a href="javascript:;" class="blue_button to_create r3">\u521b\u5efa</a></div></div></div>');
			var e = a(".my_album"), d = a(this).offset();
			e.css({
						top : d.top + a(this).height(),
						left : d.left
					});
			e.toggle();
			if (e.css("display") == "none")
				return a("body").unbind("click"), !1;
			else
				a.ajax({
					url : "/album/useralbums",
					type : "post",
					timeout : 6E4,
					dataType : "json",
					success : function(c) {
						if (c == null)
							alert(MGLANG.msgTimeOut);
						else {
							var b = c.status.msg;
							if (c.status.code == 1001) {
								b = c.result.html;
								c = c.result.pages;
								f.addClass("slide");
								g.addClass("slide_r");
								a(".chose_album .choose");
								var e = a("#zone_album .my_album_list");
								e.html(b);
								c > 1 && e.addClass("scroll");
								MOGU
										.Globe_Input_Text(a("#zone_album .album_name"));
								i()
							} else
								alert(b)
						}
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout)
					}
				})
		});
		a("#zone_album .album_ul li").live("click", function() {
					var e = a("#zone_album"), d = a(this).find(".m_i"), c = a(this);
					if (!d.prop("checked")) {
						a("#zone_album .album_ul li").removeClass("checked");
						d.prop("checked", !0);
						var d = c.find(".m_a"), b = a(".chose_album .choose");
						b.data("albumid", c.attr("album"));
						b.html(MGTOOL.jsMbSubstr(d.text(), 10) + "<b></b>")
					}
					e.hide();
					f.removeClass("slide");
					g.removeClass("slide_r");
					a(".chose_album .cancel").show()
				}).live({
					mouseenter : function() {
						a(this).addClass("checked")
					},
					mouseleave : function() {
						a(this).removeClass("checked")
					}
				});
		a("#zone_album .create .to_create").live("click", function() {
			var e = a("#zone_album"), d = a("#zone_album .album_name")
					.attr("value");
			d === "" || d === "\u8f93\u5165\u65b0\u4e13\u8f91\u540d"
					? (e.show(), alert("\u8bf7\u8f93\u5165\u65b0\u4e13\u8f91\u540d"))
					: a.ajax({
						url : "/album/newajax",
						type : "post",
						timeout : 6E4,
						data : {
							title : d,
							type : 0
						},
						dataType : "json",
						success : function(c) {
							if (c == null)
								alert(MGLANG.msgTimeOut);
							else {
								var b = c.status.msg;
								if (c.status.code == 1001) {
									var b = c.result.title, c = c.result.albumId, d = a(".chose_album .choose");
									d.data("albumid", c);
									d
											.html(MGTOOL.jsMbSubstr(b, 10)
													+ "<b></b>");
									e.hide();
									f.removeClass("slide");
									g.removeClass("slide_r");
									a(".chose_album .cancel").show()
								} else
									alert(b)
							}
						},
						error : function(a, b) {
							"timeout" == b && alert(MGLANG.msgTimeout)
						},
						complete : function() {
							e.hide()
						}
					})
		});
		var i = function() {
			if (a("#zone_album").css("display") == "block") {
				var e = a("#zone_album .create .album_name"), d = a("#zone_album .page_slide"), c = a(".chose_album");
				a("body").bind("click", function(b) {
					b = b || window.event;
					b = b.target || b.srcElement;
					!h(b, e[0])
							&& !h(b, d[0])
							&& !h(b, c[0])
							&& (a("#zone_album").hide(), a("body")
									.unbind("click"))
				})
			}
		}, h = function(a, d) {
			for (; a != void 0 && a != null
					&& a.tagName.toUpperCase() != "BODY";) {
				if (a == d)
					return !0;
				a = a.parentNode
			}
			return !1
		};
		a(".chose_album .cancel").live("click", function() {
					a(".chose_album .choose").removeData("albumid");
					a(".chose_album .choose")
							.html("\u9009\u62e9\u4e13\u8f91<b></b>");
					a(".chose_album .cancel").hide()
				})
	};
	MOGU.Zone_Choose_Album()
})(jQuery);
(function(a) {
	MOGU.WB_Add_Face_Init_New = function(i) {
		var d = a.extend({
					output : "#pub_content",
					fix : 25,
					left_fix : 0
				}, i), e = null, b = null, f = d.output;
		this.init = function() {
			a("#lb_face_v2").remove();
			a("#lb_face_v2 .lb_tab li a").unbind("click");
			a("#lb_face_v2 .lb_close").unbind("click");
			a("#lb_face_v2 .lb_bd li a").unbind("click");
			clearTimeout(e);
			var c = MGTEMPLATE.twitterLightBox, c = c.replace(/{title}/g,
					MGFACE.faceTab).replace(/{body}/g, MGFACE.facePage.f1)
					.replace(/{id}/g, "lb_face_v2");
			a("body").append(c);
			b = a("#lb_face_v2");
			var c = d.click_obj.offset(), g = c.left - d.left_fix;
			c.left + 500 > a(window).width()
					&& (g = c.left - 470, b.find(".arrows").css("left", 475));
			b.css({
						top : c.top + d.fix + "px",
						left : g + "px"
					});
			b.show();
			e = setTimeout(function() {
						b.remove()
					}, 3E3);
			b.hover(function() {
						clearTimeout(e);
						b.show()
					}, function() {
						clearTimeout(e);
						e = setTimeout(function() {
									b.remove()
								}, 500)
					});
			a("#lb_face_v2 .lb_tab li a").bind("click", function() {
				a("#lb_face_v2 .lb_tab li").removeClass("c");
				a(this).parent().addClass("c");
				a("#lb_face_v2 .lb_bd").html(MGFACE.facePage["f"
						+ a(this).parent().attr("f")]);
				h()
			});
			var h = function() {
				a("#lb_face_v2 .lb_bd li a").bind("click", function() {
							var b = f.val();
							b == f.attr("def-v") && (f.val(""), b = "");
							f.focus();
							var c = "[" + a(this).parent().attr("title") + "]";
							if (typeof document.selection != "undefined")
								document.selection.createRange().text = c;
							else {
								var d = f[0].selectionStart;
								f.val(b.substr(0, d) + c
										+ b.substring(d, b.length));
								f[0].setSelectionRange(d + c.length, d
												+ c.length)
							}
							clearTimeout(e);
							a("#lb_face_v2").show();
							e = setTimeout(function() {
										a("#lb_face_v2").remove()
									}, 2E3)
						})
			};
			h();
			a("#lb_face_v2 .lb_close").bind("click", function() {
						a("#lb_face_v2").remove()
					})
		}
	}
})(jQuery);
(function(d) {
	MOGU.Img_Pub_Widget = function(i) {
		var j = {
			img_limit : 3,
			pub_img_content : d(".pub_img_content"),
			up_another_div : d(".pub_img_content .up_another"),
			up_default_div : d(".pub_img_content .default"),
			del_wrap : "img_wrap",
			hide_img_content : !1
		}, b = d.extend(j, i), g = function(a) {
			a == 0
					? b.up_default_div.show()
					: a < b.img_limit
							? (b.up_default_div.hide(), b.up_another_div.show(), b.pub_img_content
									.show())
							: (b.up_default_div.hide(), b.up_another_div.hide())
		}, f = {
			get_img_array : function() {
				return typeof b.pub_img_content.data("img_array") === "undefined"
						? ""
						: b.pub_img_content.data("img_array")
			},
			get_img_count : function() {
				var a = this.get_img_array();
				return d.trim(a) == "" ? 0 : a.replace(/^,+/, "").replace(
						/,+$/, "").split(/,+/).length
			},
			set_img_count : function(a) {
				var c = this.get_img_array();
				MGTOOL.log("1:" + c);
				c += a + ",";
				MGTOOL.log("2:" + c);
				b.pub_img_content.data("img_array", c);
				return this.get_img_count()
			},
			del_img_count : function(a) {
				var c = this.get_img_array(), c = c.replace(a + ",", "");
				b.pub_img_content.data("img_array", c);
				return this.get_img_count()
			}
		};
		(function() {
			b.pub_img_content.find(".add_file").pubimg({
				prefun : function() {
					b.pub_img_content.data("img_array");
					var a = f.get_img_count();
					return b.img_limit > a
				},
				callback : function(a, c, e, h) {
					b.uppic_cb
							? b.uppic_cb(a, c, e, h)
							: (a = {
								imgId : e,
								path : h + "_100x100.jpg"
							}, d(".up_another")
									.before(MGTOOL
											.template(
													'<div class="img_wrap r5"><img src="{{= it.path }}" class="r5"><a href="javascript:;" class="del" iid="{{= it.imgId }}"></a></div>',
													a)));
					e = f.set_img_count(e);
					g(e)
				}
			})
		})();
		(function() {
			b.pub_img_content.find(".del").live("click", function() {
						var a = d(this);
						a.parents("." + b.del_wrap).remove();
						a = f.del_img_count(a.attr("iid"));
						g(a)
					})
		})()
	}
})(jQuery);
(function(a) {
	MOGU.WB_Add_Face_Init = function() {
		var f = null, b = null, d = null, i = !1;
		a(".add_face").live("click", function() {
			var c = a(this).attr("w");
			(i = c == "fw" || c == "sm" || c == "at_ta" || c == "lpt"
					|| c == "book_addalbum" || c == "acc" || c == "follow_add"
					|| c == "whisper" || c == "group_add"
					|| c == "message_talk")
					|| a(".light_box").remove();
			clearTimeout(f);
			var e = MGTEMPLATE.twitterLightBox, e = e.replace(/{title}/g,
					MGFACE.faceTab).replace(/{body}/g, MGFACE.facePage.f1)
					.replace(/{id}/g, "lb_face");
			a("body").append(e);
			d = a("#lb_face");
			var e = a(this).offset(), g = 25;
			c == "fw" && (g = 60);
			var h = e.left;
			e.left + 500 > a(window).width()
					&& (h = e.left - 470, d.find(".arrows").css("left", 475));
			d.css({
						top : e.top + g + "px",
						left : h + "px"
					});
			c == "album_rpl" && d.css({
						top : e.top + g + "px",
						left : h - 400 + "px"
					});
			d.show();
			switch (c) {
				case "tpk" :
				case "evt" :
				case "note" :
					b = a("#pub_content");
					break;
				case "pub" :
					b = a("#pub_content");
					break;
				case "f" :
					b = a(this).parents(".cf_pub_b").find(".pub_txt");
					break;
				case "fw" :
					b = a("#lb_forward .fw_content");
					break;
				case "cm" :
					b = a(this).next(".reply_content");
					break;
				case "newtpk" :
					b = a("#topic_con textarea");
					break;
				case "single" :
					b = a("#comment_box .comment_content");
					break;
				case "singlef" :
					b = a(".single_talk .forward_content");
					break;
				case "share" :
					b = a("#publish_editor");
					break;
				case "sm" :
					b = a("#lb_message .sm_content");
					break;
				case "at_ta" :
					b = a("#lb_home_at_ta .at_content");
					break;
				case "lpt" :
					b = a(".lbp_box .pub_txt");
					break;
				case "book_rpl" :
					b = a("#reply_body .rep_cont");
					break;
				case "dapei_rpl" :
					b = a("#reply_body_dapei .rep_cont");
					break;
				case "book_addalbum" :
					b = a("#lb_addalbum .album_text");
					break;
				case "follow_add" :
					b = a("#lb_album_tuijian .content_test");
					break;
				case "addalbum" :
					b = a(this).parents(".content").find(".album_all");
					break;
				case "whisper" :
					b = a(".sub_final_stat .sub_text");
					break;
				case "album_rpl" :
					b = a(this).parents(".pub_box_all").find(".txt");
					break;
				case "cover_rpl" :
					b = a(this).parents(".pub_box").find(".txt");
					break;
				case "acc" :
					b = a("#lb_fillalbum .lb_edit_box .cont");
					break;
				case "mg_share" :
					b = a(this).parents(".text").find("textarea");
					break;
				case "mg_sharegoods" :
					b = a(this).parents(".edit").find("textarea");
					break;
				case "cover_talk" :
					b = a(this).parent(".pub_bottom").prev(".pub_content");
					break;
				case "album_talk" :
					b = a(this).parent(".pub_bottom").prev(".pub_content");
					break;
				case "group_add" :
					b = a(this).parents(".t_follow").find("textarea");
					break;
				case "message_talk" :
					b = a(this).parent().prev("textarea");
					break;
				case "book_jia_rpl" :
					b = a(this).parents(".reply_box").find("textarea")
			}
			f = setTimeout(function() {
						d.fadeOut()
					}, 3E3);
			d.hover(function() {
						clearTimeout(f);
						d.show()
					}, function() {
						clearTimeout(f);
						f = setTimeout(function() {
									d.fadeOut()
								}, 500)
					})
		});
		a("#lb_face .lb_tab li a").live("click", function() {
			a("#lb_face .lb_tab li").removeClass("c");
			a(this).parent().addClass("c");
			a("#lb_face .lb_bd").html(MGFACE.facePage["f"
					+ a(this).parent().attr("f")])
		});
		a("#lb_face .lb_close").live("click", function() {
					a("#lb_face").remove()
				});
		a("#lb_face .lb_bd li a").live("click", function() {
			var c = b.val();
			b.focus();
			var e = "[" + a(this).parent().attr("title") + "]";
			if (typeof document.selection != "undefined")
				document.selection.createRange().text = e;
			else {
				var d = b[0].selectionStart;
				b.val(c.substr(0, d) + e + c.substring(d, c.length));
				b[0].setSelectionRange(d + e.length, d + e.length)
			}
			i
					&& (clearTimeout(f), a("#lb_face").show(), f = setTimeout(
							function() {
								a("#lb_face").fadeOut()
							}, 2E3))
		})
	};
	MOGU.WB_Add_Face_Init()
})(jQuery);
(function(b) {
	MOGU.Publish_Imgs_Init = function(a, d) {
		b("#lb_publish_box .add_file").pubimg({
			callback : function(c, f, e, g) {
				a.close();
				var h = new MGLightBox({
							title : "\u6211\u8981\u5206\u4eab",
							lightBoxId : "lb_publish_imgs",
							scroll : !1,
							ajax : !0,
							isBgClickClose : !1
						});
				h.init();
				getImgInfo = b.ajax({
					url : "/twitter/imgpubview",
					type : "POST",
					timeout : 6E4,
					data : {
						imgId : e,
						path : g
					},
					dataType : "json",
					success : function(a) {
						if (a == null || a == "")
							alert(MGLANG.msgTimeout), goods_frame.remove();
						else {
							var c = a.status.msg;
							if (a.status.code == 1001) {
								h.buildContent(a.result.data.html);
								d
										&& d.albumId
										&& b("#lb_publish_imgs .chose_album")
												.hide();
								MOGU
										.Globe_Input_Text_Hide(b(".pub_box_op .pub_txt"));
								var k = MOGUPROFILE.is_subsite == "0"
										? 140
										: 300;
								MOGU.WB_Word_Count("lb_publish_imgs",
										"pub_content_img", k);
								a = {
									img_limit : 3,
									pub_img_content : b(".pub_img_content"),
									up_another_div : b(".pub_img_content .up_another"),
									up_default_div : b(".pub_img_content .default")
								};
								b(".pub_img_content")
										.data("img_array", e + ",");
								MOGU.Img_Pub_Widget(a);
								b("#lb_publish_imgs .pub_submit").click(
										function() {
											var a = b(".pub_img_content")
													.data("img_array"), c = b("#lb_publish_imgs"), e = c
													.find(".pub_out input")
													.prop("checked"), f = c
													.find(".pub_txt"), g = f
													.val(), g = f.attr("def-v") == g
													? ""
													: g;
											if (MGTOOL.getMsgLength(b.trim(g)) > k)
												return alert("\u6700\u591a\u53ef\u4ee5\u8f93\u5165"
														+ k
														+ "\u4e2a\u5b57\uff0c\u60a8\u8f93\u5165\u5f97\u592a\u591a\u4e86\u3002"), !1;
											var i = c.find(".choose")
													.data("albumid"), a = {
												content : g,
												imgIds : a,
												albumId : i,
												sync : e,
												local : MOGUPROFILE.local
											};
											if (d)
												for (var j in d)
													d[j] && (a[j] = d[j]);
											if (typeof a.albumId == "undefined") {
												i = c.find(".choose")
														.attr("albumid");
												if (typeof i == "undefined")
													return alert("\u4f60\u8fd8\u672a\u9009\u62e9\u4e13\u8f91"), !1;
												a.albumId = i
											}
											MOGU.Publish_Pub_Submit({
												data : a,
												succ_cb : function() {
													d
															? d.albumId
																	? (h
																			.success_close("\u53d1\u8868\u6210\u529f\uff01"), d.reload == "true"
																			&& setTimeout(
																					function() {
																						window.location
																								.reload()
																					},
																					1E3))
																	: d.starId
																			? h
																					.success_close(
																							'\u53d1\u8868\u6210\u529f\uff0c\u8bf7\u7b49\u5f85\u5ba1\u6838\uff01 <a href="/album/show/'
																									+ i
																									+ '" class="to_see">\u53bb\u770b\u770b</a>',
																							2E3)
																			: h
																					.success_close(
																							'\u53d1\u8868\u6210\u529f\uff01 <a href="/album/show/'
																									+ i
																									+ '" class="to_see">\u53bb\u770b\u770b</a>',
																							2E3)
															: h
																	.success_close(
																			'\u53d1\u8868\u6210\u529f\uff01 <a href="/album/show/'
																					+ i
																					+ '" class="to_see">\u53bb\u770b\u770b</a>',
																			2E3);
													b(".pub_img_content").data(
															"img_array", "")
												},
												fail_cb : function() {
													h
															.fail('\u53d1\u8868\u5931\u8d25\uff01 <a href="javascript:;" class="try_again">\u518d\u8bd5\u4e00\u6b21</a>');
													b(".pub_img_content").data(
															"img_array", "")
												}
											})
										})
							} else
								alert(c)
						}
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout)
					},
					complete : function() {
					}
				})
			}
		})
	};
	MOGU.Publish_Goods_Init = function(a, b) {
		a
				.buildContent('<div class="pub_goods_url clearfix"><div class="clearfix"><input class="g_url fl" type="text" value="\u5c06\u5546\u54c1\u7f51\u5740\u7c98\u8d34\u5230\u8fd9\u91cc" placeholder="\u5c06\u5546\u54c1\u7f51\u5740\u7c98\u8d34\u5230\u8fd9\u91cc"><input class="g_s fl" value="\u786e\u5b9a" type="button"></div><div class="support_site"><span class="title">\u5df2\u652f\u6301\u4ee5\u4e0b\u7f51\u7ad9</span><p class="support_list"><a href="http://www.taobao.com/" target="_blank">\u6dd8\u5b9d</a><a href="http://www.paipai.com/" target="_blank">\u62cd\u62cd</a><a href="http://www.dangdang.com/" target="_blank">\u5f53\u5f53</a><a href="http://www.vancl.com/" target="_blank">\u51e1\u5ba2</a><a href="http://www.360buy.com/" target="_blank">\u4eac\u4e1c</a><a href="http://www.topshop.com/" target="_blank">Topshop</a><a href="http://buy.caomeipai.com/" target="_blank">\u8349\u8393\u6d3e</a><a href="http://www.mbaobao.com/" target="_blank">\u9ea6\u5305\u5305</a><a href="http://www.nala.com.cn/" target="_blank">NALA</a><a href="http://www.maymay.cn/" target="_blank">Maymay</a><a href="http://www.asos.com/" target="_blank">asos</a><a href="http://www.100f1.com/" target="_blank">\u6211\u7684\u767e\u5206\u4e4b\u4e00</a><a href="http://www.51yugou.com/" target="_blank">\u7a00\u54c1\u7f51</a><a href="http://www.rosebeauty.com.cn/" target="_blank">\u73ab\u7470\u793e\u533a</a></p></div></div>');
		MOGU.Publish_Goods_Func(a, b)
	};
	MOGU.Publish_Goods_Func = function(a, d) {
		var c = b("#lb_publish_box");
		MOGU.Globe_Input_Text(c.find(".g_url"));
		c.find(".g_s").click(function() {
			a.close();
			var f = b(this);
			if (f.data("isSubmit") != 1) {
				var e = MGTOOL.trim(c.find(".g_url").val());
				if (e == "")
					return alert("\u8bf7\u586b\u5199\u5546\u54c1\u5730\u5740"), !1;
				if (!MOGU.Globe_Goods_URL_Support(e))
					return alert("\u8bf7\u586b\u5199\u6b63\u786e\u7684\u5546\u54c1\u5730\u5740"), !1;
				var g = new MGLightBox({
							title : "\u6211\u8981\u5206\u4eab",
							lightBoxId : "lb_publish_goods",
							scroll : !1,
							ajax : !0,
							isBgClickClose : !1
						});
				g.init();
				f.data("isSubmit", 1);
				getGoodInfo = b.ajax({
					url : "/twitter/goodsinfo",
					type : "POST",
					timeout : 6E4,
					data : {
						url : e
					},
					dataType : "json",
					success : function(a) {
						if (a == null || a == "")
							alert(MGLANG.msgTimeout), c.remove();
						else {
							var e = a.status.msg;
							a.status.code == 1001
									? (e = a.result.data.detail, MOGU.WB_Goods_Array[e.num_id] = e, g
											.buildContent(a.result.data.html), MOGU
											.WB_Word_Count("lb_publish_goods",
													"pub_content_goods", 140), MOGU
											.Globe_Input_Text_Hide(b(".pub_box_op .pub_txt")), d
											&& d.albumId
											&& b("#lb_publish_goods .chose_album")
													.hide(), b("#lb_publish_goods .pub_submit")
											.click(function() {
												var a = b("#lb_publish_goods"), c = a
														.find(".pub_out input")
														.prop("checked"), e = a
														.find(".pub_txt"), f = e
														.val(), i = "/twitter/newtwitter", f = e
														.attr("def-v") == f
														? ""
														: f;
												if (MGTOOL.getMsgLength(b
														.trim(f)) > 140)
													return alert("\u6700\u591a\u53ef\u4ee5\u8f93\u5165140\u4e2a\u5b57\uff0c\u60a8\u8f93\u5165\u5f97\u592a\u591a\u4e86\u3002"), !1;
												var h = a.find(".choose")
														.data("albumid"), c = {
													content : f,
													albumId : h,
													goods : MGTOOL
															.objToJson(MOGU.WB_Goods_Array),
													sync : c,
													local : MOGUPROFILE.local
												};
												if (d)
													for (var l in d)
														d[l] && (c[l] = d[l]);
												if (typeof c.albumId == "undefined") {
													h = a.find(".choose")
															.attr("albumid");
													if (typeof h == "undefined")
														return alert("\u4f60\u8fd8\u672a\u9009\u62e9\u4e13\u8f91"), !1;
													c.albumId = h
												}
												if (c.url && c.url.length > 0)
													i = c.url;
												MOGU.Publish_Pub_Submit({
													data : c,
													url : i,
													succ_cb : function() {
														d
																? (d.albumId
																		&& g
																				.success_close("\u53d1\u8868\u6210\u529f"), d.reload == "true"
																		&& setTimeout(
																				function() {
																					window.location
																							.reload()
																				},
																				1E3))
																: g
																		.success_close(
																				'\u53d1\u8868\u6210\u529f\uff01 <a href="/album/show/'
																						+ h
																						+ '" class="to_see">\u53bb\u770b\u770b</a>',
																				2E3);
														MOGU.WB_Goods_Array = {}
													},
													fail_cb : function() {
														g
																.fail('\u53d1\u8868\u5931\u8d25\uff01 <a href="javascript:;" class="try_again">\u518d\u8bd5\u4e00\u6b21</a>');
														MOGU.WB_Goods_Array = {}
													}
												})
											}))
									: (alert(e), c.remove())
						}
					},
					error : function(a, c) {
						"timeout" == c && alert(MGLANG.msgTimeout)
					},
					complete : function() {
						f.removeData("isSubmit")
					}
				})
			}
		})
	};
	MOGU.Publish_Pub_Submit = function(a) {
		var d = {
			url : "/twitter/newtwitter",
			data : {},
			pub_btn : b(".pub_submit"),
			succ_cb : function() {
			},
			fail_cb : function() {
			}
		}, c = b.extend(d, a);
		if (c.pub_btn.data("isSubmit") != 1)
			a = c.data, a._fk = 1, b.ajax({
						url : c.url,
						type : "POST",
						timeout : 6E4,
						data : a,
						dataType : "json",
						beforeSend : function() {
							c.pub_btn.data("isSubmit", 1)
						},
						success : function(a) {
							if (a == null || a == "")
								alert(MGLANG.msgTimeout);
							else {
								var b = a.status;
								if (b == void 0 || b == null)
									alert(MGLANG.msgTimeout);
								else {
									var d = b.msg;
									b.code == 1001 ? c.succ_cb(b, a) : (c
											.fail_cb(b, a), alert(d))
								}
							}
						},
						error : function(a, b) {
							"timeout" == b && alert(MGLANG.msgTimeout)
						},
						complete : function() {
							c.pub_btn.removeData("isSubmit")
						}
					})
	};
	MOGU.Publish_Pub_Box_Init = function(a) {
		var d = {
			title : "\u6211\u8981\u5206\u4eab",
			lightBoxId : "lb_publish_box",
			scroll : !1,
			contentHtml : [
					'<div class="pub_chose clearfix"><a href="javascript:;" class="chose_goods chose_type r5"><b></b><p>\u5546\u54c1</p><span>\u8f93\u5165\u7f51\u8d2d\u5546\u54c1\u7684\u94fe\u63a5</span></a><a href="javascript:;" class="chose_pic chose_type r5"><div class="up_pic_wrap"><form action="/upload/addpic" method="post" enctype="multipart/form-data" target="ifr_picup" class="add_pic_form"><input type="hidden" id="coverImgId" value=""><input type="file" hidefocus="true" id="upload_img" name="image" class="add_file"></form></div><b></b><p>\u56fe\u7247</p>',
					"<span>"
							+ (MOGUPROFILE.is_subsite == "1"
									? "\u4e0a\u4f20\u7f8e\u56fe"
									: "\u4e0a\u4f20\u6211\u7684\u642d\u914d\u6652\u8d27\u7b49\u7f8e\u56fe")
							+ "</span>", "</a></div>"].join(""),
			isBgClickClose : !1,
			type : "default"
		}, c = new MGLightBox(d);
		c.init();
		b("#lb_publish_box .chose_goods").click(function() {
					MOGU.Publish_Goods_Init(c, a)
				});
		MOGU.Publish_Imgs_Init(c, a)
	};
	MOGU.Home_Pub_Face = function() {
		b(".pub_box_op .add_face_new").live("click", function() {
					var a = b(this).parents(".pub_box_op").find(".pub_txt"), a = {
						click_obj : b(this),
						output : a
					};
					(new MOGU.WB_Add_Face_Init_New(a)).init()
				})
	};
	MOGU.Home_Pub_Face()
})(jQuery);
(function(a) {
	MOGU.Globe_UserInfo_Tip_Init = function() {
		var h = null, o = null, i = a(".u_name,.icard");
		i.live("mouseenter", function() {
			clearTimeout(h);
			clearTimeout(o);
			a("#u_info_tip").hide();
			var c = "";
			this.tagName.toLowerCase() == "img"
					? c = a(this).attr("alt")
					: (c = a(this).attr("username"), MGTOOL.empty(c)
							&& (c = a(this).text().replace(/@/g, "")));
			if (!(c == "" || c == void 0)) {
				var c = MGTOOL.trim(c), i = 0;
				typeof MOGUPROFILE.groupId != "undefined"
						&& (i = MGTOOL.trim(MOGUPROFILE.groupId));
				var q = a(this).offset(), l = q.left, d = a(this).width(), r = d
						/ 2 - 8, s = a(window).width();
				l + 300 > s && (l = l - 300 + d, r = 300 - d / 2 - 8);
				d = a(this).attr("href");
				if (d == null || d == void 0)
					d = a(this).parent().attr("href");
				a("#u_info_tip")[0]
						? a("#u_info_tip")
								.html('<div class="tip_info"><img class="avatar r3" src="/img/loading.gif" alt=""><div><p><a href="#">&nbsp;</a></p><p>\u83b7\u53d6\u7528\u6237\u4fe1\u606f...</p><p>&nbsp;</p></div></div><div class="tip_toolbar">&nbsp;</div><div class="tip_arrow"></div>')
						: a("body")
								.append('<div id="u_info_tip"><div class="tip_info"><img class="avatar r3" src="/img/loading.gif" alt=""><div><p><a href="#">&nbsp;</a></p><p>\u83b7\u53d6\u7528\u6237\u4fe1\u606f...</p><p>&nbsp;</p></div></div><div class="tip_toolbar">&nbsp;</div><div class="tip_arrow"></div></div>');
				a("#u_info_tip")
						.html('<div class="tip_info"><img class="avatar r3" src="/img/loading.gif" alt=""><div><p><a href="#">&nbsp;</a></p><p>\u83b7\u53d6\u7528\u6237\u4fe1\u606f...</p><p>&nbsp;</p></div></div><div class="tip_toolbar">&nbsp;</div><div class="tip_arrow"></div>');
				a("#u_info_tip").css({
							top : q.top - 167 + "px",
							left : l + "px"
						});
				a("#u_info_tip .tip_arrow").css("margin-left", r + "px");
				h = setTimeout(function() {
							a("#u_info_tip").show()
						}, 200);
				a("#u_info_tip").hover(function() {
							clearTimeout(h);
							a("#u_info_tip").show()
						}, function() {
							a("#u_info_tip").hide()
						});
				a("body").data(c) != void 0 && a("body").data(c) != ""
						? (a("#u_info_tip").html(a("body").data(c)), a("#u_info_tip .tip_arrow")
								.css("margin-left", r + "px"), a("#u_info_tip .medal_a")
								.size() == 0
								&& a("#u_info_tip").css({
											top : q.top - 145 + "px",
											left : l + "px"
										}))
						: o = setTimeout(function() {
							a.ajax({
								url : "/card/user",
								type : "POST",
								timeout : 6E4,
								data : {
									uname : c,
									groupId : i
								},
								dataType : "json",
								success : function(e) {
									if (e == null)
										clearTimeout(h), clearTimeout(o), a("#u_info_tip .tip_info p")
												.eq(1).text(MGLANG.msgTimeout), a("#u_info_tip")
												.hide();
									else {
										var m = e.status.msg;
										if (e.status.code == 1001) {
											var b = e.result.data.user, m = '<div class="tip_info"><a href="/u/{url}" class="fl" ><img class="avatar" src="{avatar}" alt=""></a><div class="info fl"><p><a href="/u/{url}" class="uname" >{name}</a>{bz}</p><p>{address}</p><p><a href="/u/{userId}/fans" target="_blank"><span>{fans}</span></a>\u7c89\u4e1d<a style="margin-left:10px;" href="/u/{userId}/bao" target="_blank"><span>{goods}</span></a>\u5206\u4eab<a style="margin-left:10px;" href="/u/{userId}/bao" target="_blank"><span>{faved}</span></a>\u559c\u6b22</p></div><div class="intro">{intro}</div>{medal}</div><div class="tip_toolbar">{toolbar}</div><div class="tip_arrow"></div>', d = e.result.data.gadminurl, i = '<a target="_blank" href="'
													+ e.result.data.adminurl
													+ '">\u8fdb\u5165\u7ba1\u7406\u9875\u9762</a>', t = "";
											typeof d != "undefined"
													&& d != null
													&& (t = '<a target="_blank" href="'
															+ d
															+ '">\u53bb\u7ba1\u7406'
															+ (b.sex == 1
																	? "\u4ed6"
																	: "\u5979")
															+ "</a>");
											var d = b.avatar, s = b.cfans, w = b.cgoods, x = b.cfaved, f = b.member_user;
											if (f == 1)
												var n = "<img src='/img/new_xiaoxian_s.png' />";
											else
												f == 2
														? n = "<img src='/img/new_xiaoxia_s.png' />"
														: f == 3
																? n = "<img src='/img/tag_daren_s.png' />"
																: f == 4
																		? n = ""
																		: f == 5
																				? n = "<img src='/img/tag_meizhuang_daren_s.png' />"
																				: f == 6
																						&& (n = "<img src='/img/tag_daren_s.png' /><img src='/img/tag_meizhuang_daren_s.png' />");
											var p = void 0 == b.medal
													? ""
													: b.medal, f = "", j;
											for (j in p) {
												var g = p[j];
												if (g
														&& !(g == void 0 || g.honorId == void 0))
													f += '<a href="/honor/show/1/my/{userId}?honorId='
															+ g.honorId
															+ '" target="_blank" ><img src="/img/medal/'
															+ g.honorId
															+ '/16.jpg" alt="'
															+ g.title
															+ '" title="'
															+ g.title
															+ '"></a>'
											}
											f != ""
													&& (f = '<div class="medal_a">'
															+ f + "</div>");
											j = b.introduce;
											if (j == null
													|| MGTOOL.trim(j) == "")
												j = "<span>\u8fd9\u9897\u5c0f\u8611\u83c7\u771f\u61d2\u554a\uff0c\u8fde\u81ea\u6211\u4ecb\u7ecd\u90fd\u4e0d\u5199\u3002</span>";
											p = b.userId;
											b = b.province + " " + b.city;
											b == "" && (b = "&nbsp;");
											var g = e.result.data.isMyfollow, y = e.result.data.isMyfans, z = e.result.data.eachother, u = e.result.data.isadmin, A = e.result.data.isgadmin, v = e.result.data.msgPrivate, k = "";
											if (e.result.data.isself)
												k = "\u81ea\u5df1\u90fd\u4e0d\u8ba4\u8bc6\u4e86\uff1f";
											else {
												k += z
														? '<div style="display:inline"  class="followdiv" type="all" uid="{userId}"><span class="fl addall">\u5df2\u4e92\u76f8\u5173\u6ce8</span><a href="javascript:;" class="unfollow">\u53d6\u6d88</a></div>'
														: g
																? '<div style="display:inline"  class="followdiv" type="all" uid="{userId}"><span class="fl add_ok">\u5df2\u5173\u6ce8</span><a href="javascript:;" class="unfollow">\u53d6\u6d88</a></div>'
																: "";
												g
														|| (k += '<div style="display:inline"  class="followdiv" type="all" uid="{userId}"><a href="javascript:void(0);" class="addfo">+\u52a0\u5173\u6ce8</a></div>');
												if (u || v == 0 && y || v == 1)
													k += '<a href="/infocenter/privatemsg/write/{userId}" target="_blank">\u53d1\u79c1\u4fe1</a>';
												u && (k += i);
												A && (k += t)
											}
											m = m.replace(/{avatar}/, d)
													.replace(/{url}/g, p)
													.replace(/{name}/g, c)
													.replace(/{address}/, b)
													.replace(/{fans}/, s)
													.replace(/{goods}/, w)
													.replace(/{medal}/, f)
													.replace(/{intro}/, j)
													.replace(/{toolbar}/, k)
													.replace(/{userId}/g, p)
													.replace(/{faved}/g, x)
													.replace(/{bz}/g, n);
											a("#u_info_tip").html(m);
											a("#u_info_tip .medal_a").size() == 0
													&& a("#u_info_tip").css({
														top : q.top - 145
																+ "px",
														left : l + "px"
													});
											a("#u_info_tip .tip_arrow").css(
													"margin-left", r + "px");
											a("body").data(c, m);
											clearTimeout(h)
										} else
											a("#u_info_tip .tip_info p").eq(1)
													.text(m)
									}
								},
								error : function(c, d) {
									clearTimeout(h);
									clearTimeout(o);
									"timeout" == d
											&& a("#u_info_tip .tip_info p")
													.eq(1)
													.text(MGLANG.msgTimeout);
									a("#u_info_tip").hide()
								}
							})
						}, 500)
			}
		});
		i.live("mouseleave", function() {
					clearTimeout(h);
					clearTimeout(o);
					h = setTimeout(function() {
								a("#u_info_tip").hide()
							}, 500)
				})
	};
	MOGU.Globe_UserInfo_Tip_Init()
})(jQuery);
(function(a) {
	MGTEMPLATE.favTip_ok = '<div id="fav_tip" class="fav_tip"><div class="fok"><a href="javascript:;" onclick="MOGU.Fav_Reason_Add_Init(\'{tid}\',\'{editid}\',\'{favid}\',\'{where}\')">\u518d\u7ed9\u4e2a\u8bc4\u8bba\u5427~</a></div></div>';
	MGTEMPLATE.favTip_had = '<div id="fav_tip" class="fav_tip"><div class="ffail"><span>\u559c\u6b22\u8fc7\u4e86</span><a href="javascript:;" onclick="MOGU.Favorite_Del(\'{favid}\',\'{twitterid}\')">\u5220\u6389</a></div></div>';
	MGTEMPLATE.favTip_me = '<div id="fav_tip" class="fav_tip"><div class="ffail">\u8fd9\u662f\u4f60\u81ea\u5df1\u7684\u54e6</div></div>';
	MGTEMPLATE.favForward = '<p class="fw_root">{rootTweet}</p><div class="fw_pub_area"><div class="fwpa_tool"><a href="javascript:;"><img class="fl add_face" style="margin-top:5px" w="fw" src="/img/add_face_c.png"></a><span class="fw_count">\u8fd8\u53ef\u4ee5\u8f93\u5165<b>140</b>\u4e2a\u6c49\u5b57</span></div><textarea class="fw_content">{tweet}</textarea><div class="fw_submit_box">{is_forword_root_tweet}<div class="sub_div" rtid="{rtid}"><a href="javascript:;" class="fw_submit"><img src="/img/confirm_btn.png"></a><a class="fw_cancel" href="javascript:;">\u53d6\u6d88</a></div></div></div>';
	MOGU.Favorite_Tweet_Add_Init = function() {
		a(".t_f").live({
			mouseenter : function() {
				a(this).find(".tl .fav").hasClass("fav_no")
						&& a(this).find(".tl .fav").show()
			},
			mouseleave : function() {
				a(this).find(".tl .fav").hasClass("fav_no")
						&& a(this).find(".tl .fav").hide()
			}
		});
		a(".t_f .add_fav").live("click", function() {
					if (MOGUPROFILE.userid == "") {
						MOGU.user_handsome_login_init();
						var e = a(this);
						MOGU.user_handsome_login(!1, {
									callback : function() {
										e.show();
										e.click()
									}
								})
					} else
						MOGU.Favorite_Add_Submit(this)
				})
	};
	MOGU.Favorite_Add_Submit = function(e) {
		if (a(e).data("submit") != 1) {
			a(e).data("submit", 1);
			a("#fav_tip").remove();
			a("#fav_yaya").remove();
			var b = a(e).parents(".t_f"), h = b[0].id.replace("tk_", ""), c = a(b[0])
					.attr("tid"), f = {
				twitterid : c,
				content : "\u6211\u559c\u6b22\u8fd9\u4e2a\uff0c\u8c22\u8c22\u4f60\u7684\u5206\u4eab[\u5fc3]",
				local : MOGUPROFILE.local,
				favtype : !1
			};
			b.find(".inf .n").text();
			if (b.find(".q")[0])
				f.favtype = !0, b = b.find(".q").attr("qtid"), f.rootRetweetId = b;
			b = a(e).offset();
			a("body").append('<div id="fav_yaya" class="fav_yaya"></div>');
			a("#fav_yaya").css({
						top : b.top + "px",
						left : b.left + 10 + "px"
					}).floatUp({
						time : 500
					});
			a.ajax({
				url : "/collect/favtwitter",
				type : "POST",
				timeout : 6E4,
				data : f,
				dataType : "json",
				success : function(b) {
					if (b == null)
						alert(MGLANG.msgTimeout);
					else {
						var d = b.status.code, f = b.status.msg, j = a(e)
								.offset(), i = !1;
						d == 1001
								? (tip_html = MGTEMPLATE.favTip_ok.replace(
										/{tid}/g, c).replace(/{editid}/g,
										b.result.data.tid).replace(/{favid}/g,
										b.result.data.id).replace(/{where}/g,
										"feed"), i = !0, b = b.result.data.cfav, a("#tk_"
										+ h + " .tl .favDiv")[0]
										? a("#tk_" + h + " .tl .favCount")
												.text(b)
										: a("#tk_" + h + " .tl .add_fav")
												.after('<div class="favDiv"><a class="favCount" target="_blank" href="/note/'
														+ h
														+ '">1</a><i></i></div>'), a("#tk_"
										+ h + " .tl .fav")
										.removeClass("fav_no"))
								: d == 6002
										? (tip_html = MGTEMPLATE.favTip_had
												.replace(/{favid}/g,
														b.result.data.id)
												.replace(/{twitterid}/g, h), i = !0)
										: d == 6003
												? (tip_html = MGTEMPLATE.favTip_me
														.replace(
																/{uid}/g,
																MOGUPROFILE.userid), i = !0)
												: d == 2034
														? (i = !1, b = b.result.data.favs, b = parseInt(b)
																+ 1, b < 5
																? (d = "", b == 1
																		? d = "http://www.mogujie.com/book/shoes/"
																		: b == 2
																				? d = "http://www.mogujie.com/book/bags/"
																				: b == 3
																						? d = "http://www.mogujie.com/book/accessories/"
																						: b == 4
																								&& (d = "http://www.mogujie.com/book/home/"), b = {
																	title : "\u7b2c\u4e8c\u6b65\uff1a\u559c\u6b22\u6709\u5956",
																	lightBoxId : "lb_jifenbao_second_step_two",
																	scroll : !0,
																	isBgClickClose : !1,
																	contentHtml : '<div class="all_main"><div class="prompt">\u60a8\u5df2\u7ecf\u559c\u6b22\u4e86\u7b2c'
																			+ b
																			+ "\u4ef6\u5b9d\u8d1d\uff0c\u53bb\u6311\u7b2c"
																			+ (b + 1)
																			+ '\u4ef6\u5427\u3002</div><div class="go_register"><a href="'
																			+ d
																			+ '">&nbsp;</a></div></div>'
																})
																: b = {
																	title : "\u7b2c\u4e8c\u6b65\uff1a\u559c\u6b22\u6709\u5956",
																	lightBoxId : "lb_jifenbao_second_step_three",
																	scroll : !0,
																	isBgClickClose : !1,
																	contentHtml : '<div class="all_main"><div class="prompt">\u606d\u559c\u60a8\u5b8c\u6210\u8611\u83c7\u8857\u559c\u6b22\u5b9d\u8d1d\u6b65\u9aa4\uff0c\u60a8\u5c06\u83b7\u5f9715\u4e2a\u96c6\u5206\u5b9d</div><div class="go_register"><a href="/webapp/jifenbao">&nbsp;</a></div></div>'
																}, (new MGLightBox(b))
																.init())
														: alert(f);
						if (i) {
							a("body").append(tip_html);
							setTimeout(function() {
										a("#fav_tip").css({
													top : j.top - 25 - 71
															+ "px",
													left : j.left - 15 + "px"
												}).show()
									}, 500);
							var n = setTimeout(function() {
										a("#fav_tip,#fav_yaya").remove()
									}, 5E3);
							a("#fav_tip,#fav_yaya").hover(function() {
										clearTimeout(n);
										a("#fav_tip,#fav_yaya").show()
									}, function() {
										clearTimeout(n);
										n = setTimeout(function() {
													a("#fav_tip,#fav_yaya")
															.remove()
												}, 5E3)
									})
						}
					}
				},
				error : function(a, b) {
					"timeout" == b && alert(MGLANG.msgTimeout)
				},
				complete : function() {
					setTimeout(function() {
								a(e).removeData("submit")
							}, 4E3)
				}
			})
		}
	};
	MOGU.Favorite_Del = function(e, b) {
		a("#fav_tip,#fav_yaya").remove();
		a.ajax({
			url : "/collect/delfav",
			type : "POST",
			timeout : 6E4,
			data : {
				id : e
			},
			dataType : "json",
			success : function(e) {
				if (e == null)
					alert(MGLANG.msgTimeout);
				else {
					var c = e.status.msg;
					if (e.status.code == 1001) {
						var c = e.result.data.cfav, f = e.result.data.userid;
						c != null && c != 0
								? a(".i_w_f[tid=" + b + "]")[0]
										? (a(".i_w_f[tid=" + b + "] .favCount")
												.text(c), a("div.new_fav a[aid="
												+ b + "]").slideUp(1E3,
												function() {
													a("div.new_fav a[aid=" + b
															+ "]").remove()
												}))
										: a("#tk_" + b)[0]
												? (a("#tk_" + b + " .u_like")
														.remove(), a("#tk_" + b
														+ " .tl .favCount")
														.text(c), a("#tk_" + b
														+ " .tl")
														.after(e.result.html))
												: a("#topitter_" + b)[0]
														? (a("#topitter_" + b
																+ " .u_like")
																.remove(), a("#topitter_"
																+ b
																+ " .favDiv .favCount")
																.text(c), a(".wb_infobar")
																.after(e.result.html))
														: a("#style_"
																+ b
																+ " .nwl_img .fav_"
																+ f)[0]
																? (a("#style_"
																		+ b
																		+ " .nwl_img .fav_"
																		+ f)
																		.parent()
																		.remove(), a("#style_"
																		+ b
																		+ " .nwl_cfav")
																		.find("span")
																		.text(c))
																: a(".nwl_img .fav_"
																		+ f)[0]
																		&& (a(".nwl_img .fav_"
																				+ f)
																				.parent()
																				.remove(), a(".note_who_like")
																				.find("span")
																				.find("span")
																				.text(c))
								: a(".i_w_f[tid=" + b + "]")[0]
										? (a(".i_w_f[tid=" + b + "] .favDiv")
												.remove(), a("div.new_fav a[aid="
												+ b + "]").slideUp(1E3,
												function() {
													a("div.new_fav a[aid=" + b
															+ "]").remove()
												}))
										: a("#tk_" + b)[0]
												? (a("#tk_" + b
														+ " .tl .favDiv")
														.remove(), a("#tk_" + b)
														.removeClass("favt"), a("#tk_"
														+ b + " .u_like")
														.remove(), a("#tk_" + b
														+ " .tl")
														.after(e.result.html))
												: a("#topitter_" + b)[0]
														? (a("#topitter_" + b
																+ " .favDiv")
																.remove(), a("#topitter_"
																+ b
																+ " .u_like")
																.remove(), a("#topitter_"
																+ b + " .tl")
																.after(e.result.html))
														: a("#style_" + b
																+ " .nwl_img")[0]
																? (a("#style_"
																		+ b
																		+ " .nwl_img")
																		.remove(), a("#style_"
																		+ b
																		+ " .nwl_cfav")
																		.remove())
																: a(".nwl_img")[0]
																		&& (a(".nwl_img")
																				.remove(), a(".note_who_like")
																				.find("span")
																				.remove())
					} else
						alert(c)
				}
			},
			error : function(a, b) {
				"timeout" == b && alert(MGLANG.msgTimeout)
			}
		})
	};
	MOGU.Fav_Reason_Add_Init = function(e, b, h, c) {
		a("#fav_tip,#fav_yaya").remove();
		var f = new MGLightBox({
					title : "\u7ed9\u559c\u6b22\u52a0\u4e2a\u8bc4\u8bba",
					lightBoxId : "lb_forward",
					ajax : !0,
					scroll : !0,
					isBgClickClose : !1
				});
		f.init();
		if (c == "feed") {
			var c = a('.t_f[tid="' + e + '"]'), g = e, d = {
				retweetId : g,
				isfav : 1
			}, l = c.find(".inf .n").text();
			if (c.find(".q")[0]) {
				var c = c.find(".q"), j = c.attr("qtid");
				d.rootRetweetId = j;
				var i = c.find(".sms .n").text().replace(/@/, "")
			}
		} else if (c == "topic")
			c = a(".topic_info .u_name"), g = e, d = {
				retweetId : g,
				isfav : 1
			}, l = c.text();
		else if (c == "book")
			g = e, c = a('.i_w_f[tid="' + g + '"]').find(".tk"), d = {
				retweetId : g,
				isfav : 1
			}, l = c.find(".n").text();
		else if (c == "note") {
			if (g = e, c = a("#note_" + g), d = {
				retweetId : g,
				isfav : 1
			}, l = c.find(".note_profile").find(".name").text(), c.find(".q")[0])
				c = c.find(".q"), j = c.attr("qtid"), d.rootRetweetId = j, i = c
						.find(".sms .n").text().replace(/@/, "")
		} else if (c == "notenoall" && (g = e, c = a("#note_" + g), d = {
			retweetId : g,
			isfav : 1
		}, l = c.find(".note_profile").find(".name").text(), c.find(".q")[0]))
			c = c.find(".q"), j = c.attr("qtid"), d.rootRetweetId = j, i = c
					.find(".sms .n").text().replace(/@/, "");
		a.ajax({
			url : "/twitter/startforward?fr=fav",
			type : "POST",
			timeout : 6E4,
			data : d,
			dataType : "json",
			success : function(c) {
				if (c == null)
					alert(MGLANG.msgTimeout);
				else {
					var d = c.status.msg;
					if (c.status.code == 1001) {
						var d = c.result.data.rootTweet, c = c.result.data.tweet, o = "";
						i
								&& (o = '<input type="checkbox" id="fw_root_tweet" checked rrtid="'
										+ j
										+ '"/><label for="fw_root_tweet">\u540c\u65f6\u8bc4\u8bba\u7ed9\u539f\u6587\u4f5c\u8005 '
										+ i + "</label><br>");
						d = MGTEMPLATE.favForward.replace(/{rtid}/, g).replace(
								/{tweet}/, c).replace(/{rootTweet}/, d)
								.replace(/{tweet_name}/, l).replace(
										/{is_forword_root_tweet}/, o);
						f.buildContent(d);
						var m = f.getBoxFrame();
						m.find(".fw_cancel").click(function() {
									f.close()
								});
						var k = m.find(".fw_content");
						k[0]
								&& (k[0].createTextRange ? (d = k[0]
										.createTextRange(), d.moveStart(
										"character", 0), d.collapse(), d
										.select()) : (k[0].setSelectionRange(0,
										0), k.focus()));
						d = function() {
							var a = MGTOOL.getMsgLength(k.val()), b = m
									.find(".fw_count b");
							a == 0 ? (b.text(140), b.css("color", "#690")) : (b
									.text(140 - a), a > 140 ? b.css("color",
									"#F92D09") : b.css("color", "#690"))
						};
						d();
						k.bind("keyup", d).bind("input", d).bind(
								"propertychange", d);
						MOGU.Globe_Textarea_Auto_Height(k);
						var p = null;
						try {
							p = a("#topic_head").attr("tpcid")
						} catch (q) {
						}
						d = m.find(".fw_submit");
						d.click(function() {
									MOGU.Fav_Reason_Add_Submit(e, b, h, p, f)
								});
						MOGU.Globe_Bind_Keybord_Submit(k, d, "not_need_focus")
					} else
						alert(d), f.close()
				}
			},
			error : function(a, b) {
				"timeout" == b && alert(MGLANG.msgTimeout);
				f.close()
			}
		})
	};
	MOGU.Fav_Reason_Add_Submit = function(e, b, h, c, f) {
		e = f.getBoxFrame().find(".fw_content").val();
		if (e == "")
			alert("\u8bf7\u8f93\u5165\u8f6c\u53d1\u5185\u5bb9");
		else if (MGTOOL.getMsgLength(e) > 140)
			alert("\u8f6c\u53d1\u5185\u5bb9\u8d85\u8fc7140\u4e2a\u5b57\u4e86\u3002");
		else {
			var g = a(".sub_div").attr("rtid"), d = a("#fw_tweet")
					.prop("checked"), b = {
				topicId : c,
				retweetId : g,
				content : e,
				isReply : d,
				editid : b,
				favid : h,
				local : MOGUPROFILE.local
			};
			if (a("#fw_root_tweet")[0])
				b.rootRetweetId = a("#fw_root_tweet").attr("rrtid"), b.isReplyRoot = a("#fw_root_tweet")
						.prop("checked");
			a.ajax({
						url : "/twitter/editfav",
						type : "POST",
						timeout : 6E4,
						data : b,
						dataType : "json",
						success : function(a) {
							if (a == null)
								alert(MGLANG.msgTimeout);
							else if (a = a.status, a == void 0 || a == null)
								alert(MGLANG.msgTimeout);
							else {
								var b = a.msg;
								a.code == 1001
										? f
												.success_close(
														"\u53d1\u9001\u6210\u529f",
														800)
										: (alert(b), f.close())
							}
						},
						error : function(a, b) {
							"timeout" == b && alert(MGLANG.msgTimeout);
							f.close()
						}
					})
		}
	};
	MOGU.Favorite_Tweet_Add_Init()
})(jQuery);
(function(a) {
	MOGU.Add_To_Album_Init = function(f, g) {
		if (MOGU.Globe_Check_Login()) {
			var d = new MGLightBox({
						title : "\u52a0\u5165\u4e13\u8f91",
						lightBoxId : "lb_addalbum",
						scroll : !1,
						ajax : !0,
						isBgClickClose : !0,
						type : "default"
					});
			d.init();
			var e = f.attr("type"), h = f.attr("iid");
			a.ajax({
				url : "/album/beforeaddalbum",
				type : "post",
				timeout : 6E4,
				data : {
					img_type : e,
					img_id : h,
					tid : g
				},
				dataType : "json",
				success : function(b) {
					if (b == null)
						alert(MGLANG.msgTimeOut);
					else {
						var c = b.status.msg;
						b.status.code == 1001
								? (d.buildContent(b.result.html), MOGU
										.WB_Word_Count("lb_addalbum",
												"pub_content"), MOGU
										.Globe_Input_Text_Hide(a(".pub_box_op .pub_txt")), MOGU
										.Album_Add_To_Album(g, e, h, d))
								: alert(c)
					}
				},
				error : function(a, c) {
					"timeout" == c && alert(MGLANG.msgTimeout)
				}
			})
		}
	};
	MOGU.Album_Add_To_Album = function(f, g, d, e) {
		a(".album_add_content .album_text").focus(function() {
					a("#lb_addalbum .album_add_content")
							.removeClass("hide_content")
				});
		a("#lb_addalbum .submit").click(function() {
			var h = a("#lb_addalbum"), b = a("#lb_addalbum .album_text"), c = a
					.trim(b.val()), b = a.trim(b.attr("def-v"));
			c == b && (c = "");
			var b = a("#lb_addalbum .choose").data("albumid"), j = a("#lb_addalbum .choose")
					.attr("valid"), k = a("#lb_addalbum .choose")
					.attr("validcode"), i = "";
			a("#lb_addalbum #pub_out_check").attr("checked") == "checked"
					&& (i = 1);
			c = {
				tid : f,
				imgType : g,
				imgId : d,
				content : c,
				albumId : b,
				sync : i,
				valid : j,
				validcode : k
			};
			if (typeof c.albumId == "undefined"
					&& (b = h.find(".choose").attr("albumid"), typeof b == "undefined"))
				return alert("\u4f60\u8fd8\u672a\u9009\u62e9\u4e13\u8f91"), !1;
			c.albumId = b;
			a(this).hide();
			a(this).next().show();
			a.ajax({
						url : "/album/addajax",
						type : "POST",
						timeout : 6E4,
						data : c,
						dataType : "json",
						success : function(a) {
							if (a == null)
								alert(MGLANG.msgTimeout);
							else {
								var b = a.status.msg;
								a.status.code == 1001
										? e
												.success_close(
														"\u52a0\u5165\u4e13\u8f91\u6210\u529f\uff01",
														600)
										: (e.close(), alert(b))
							}
						},
						error : function(a, b) {
							"timeout" == b && alert(MGLANG.msgTimeout)
						}
					})
		});
		MOGU.Globe_Bind_Keybord_Submit(a("#lb_addalbum .album_text"),
				a("#lb_addalbum .submit"), "not_need_focus")
	}
})(jQuery);
(function(c) {
	MOGU.Message_Report_Init = function(e, d) {
		var a = MOGUPROFILE.userid, f = new MGLightBox({
					title : "\u4e3e\u62a5\u4e0d\u826f\u4fe1\u606f",
					lightBoxId : "lb_jubao",
					ajax : !0,
					scroll : !1
				});
		f.init();
		c.ajax({
			url : "/report/getreportinfo",
			data : {
				messageid : e,
				type : d,
				userid : a
			},
			dataType : "json",
			type : "POST",
			timeout : 6E4,
			success : function(b) {
				if (b == null)
					alert(MGLANG.msgTimeout);
				else {
					var a = b.status.msg;
					b.status.code == 1001
							? (b = b.result.data, f
									.buildContent(doT
											.template('<div class="lb_border"><p class="fw_root"><img src="/img/message-icon.png">\u4e0d\u826f\u4fe1\u606f\u662f\u6307\u542b\u6709\u5404\u7c7b\u5356\u5bb6\u5e97\u94fa\u3001\u5546\u54c1\u5e7f\u544a\u3001\u865a\u5047\u4e2d\u5956\u4fe1\u606f\u6216\u5176\u4ed6\u9a9a\u6270\u4f60\u6b63\u5e38\u8611\u83c7\u8857\u751f\u6d3b\u7684\u5185\u5bb9</p></div><div class="fw_pub_area"><div class="fwpa_tool">\u4f60\u8981\u4e3e\u62a5\u7684\u662f<a class="fwpa_a" href="/u/{{= it.fromId }}">@{{= it.uname }}</a>\u7684{{= it.type_text }}\uff1a</div><div class="fwpa_s"><a href="/u/{{= it.fromId }}"><img class="pic_t r3" src="{{= it.avatar }}"></a><div class="fwpa_c">{{ if(!MGTOOL.empty(it.title)){ }}<div class="fwpa_f">{{= it.title }}</div><br />{{ } }}<span >{{= it.content }}</span></div></div><div class="fwpa_p"><span>\u4e3e\u62a5\u7c7b\u578b\uff1a</span><input id="s_m" style="margin-left:3px;" type="radio" name="s" value="0" checked="checked" ><label for="s_m">\u5356\u5bb6\u5e7f\u544a\uff08\u5e97\u94fa\u3001\u5546\u54c1\uff09</label><input id="s_j" type="radio" name="s" value="1"><label for="s_j">\u865a\u5047\u4e2d\u5956\u4fe1\u606f</label><input id="s_e" type="radio" name="s" value="2"><label for="s_e">\u5176\u4ed6</label></div><div class="fwpa_ww">\u8865\u5145\u8bf4\u660e<span>(\u9009\u586b)</span>\uff1a<input class="fwpa_shu r3" type="text" name="n" ></div></div><div class="sub_div"><a href="javascript:;"  class="subreport"><img src="/img/message-button.png"></a><span class="fw_cancel">\u8bf7\u653e\u5fc3,\u6211\u4eec\u4f1a\u5c3d\u5feb\u5904\u7406\uff0c\u4f60\u7684\u9690\u79c1\u5c06\u4f1a\u5f97\u5230\u4fdd\u62a4</span></div>')(b)), b = {
								reportpage : d,
								messageId : e,
								reportFromId : b.toId,
								reportToId : b.fromId
							}, MOGU
									.Globe_Bind_Keybord_Submit("",
											c("#lb_jubao .subreport"),
											"not_need_focus"), MOGU
									.Message_Report_Submit(f, b))
							: alert(a)
				}
			},
			error : function(b, a) {
				"timeout" == a && alert(MGLANG.msgTimeout)
			}
		})
	};
	MOGU.Message_Report_Submit = function(e, d) {
		c("#lb_jubao .subreport").click(function() {
			var a = c("#lb_jubao .fwpa_p input[name='s']:checked").val();
			a == null || a == void 0
					? alert("\u8bf7\u9009\u62e9\u4e3e\u62a5\u7c7b\u578b")
					: (d.type = a, a = c("#lb_jubao .fwpa_shu").val(), d.remark = a, c
							.ajax({
								url : "/report/subreport",
								data : d,
								dataType : "json",
								type : "POST",
								timeout : 6E4,
								success : function(a) {
									if (a == null)
										alert(MGLANG.msgTimeout);
									else {
										var b = a.status.msg;
										a.status.code == 1001
												? e
														.success_close("\u4e3e\u62a5\u6210\u529f\uff0c\u8c22\u8c22\uff01\u7259\u7259\u4f1a\u7a0d\u5019\u5904\u7406\u3002")
												: alert(b)
									}
								},
								error : function(a, b) {
									"timeout" == b && alert(MGLANG.msgTimeout)
								}
							}))
		})
	}
})(jQuery);
(function(a) {
	MOGU.Globe_Search_tip_Init = function() {
		if (a(".seatch_type_msearch").size() != 0) {
			var b = !1;
			window.saarch_tip_if_get_tip = !0;
			var c = !1;
			a(".top_search .ts_txt").focus(function() {
				if (a("#select_type").val() === "bao") {
					var i = a("#top_search_form").offset().top + 33, b = a("#top_search_form")
							.offset().left;
					a("#seach_type").css({
								left : b,
								top : i
							})
				}
			});
			var g = a(".ts_txt"), h = g.attr("def-val"), f = 0, e = function(a,
					e) {
				if ((!a || !(a.keyCode == "38" || a.keyCode == "40")) && !e)
					b && clearTimeout(b), b = setTimeout(function() {
								MOGU.seacrh_tip_input_words()
							}, 200)
			};
			this.seacrh_tip_input_words = function() {
				if (a("#select_type").val() === "bao"
						&& window.saarch_tip_if_get_tip) {
					var b = "";
					a("#seach_type .input_words");
					var e = a(".ts_txt").val(), b = MGTOOL.getMsgLength(e);
					if (b == 0)
						return a("#seach_type").hide(), !1;
					else
						a.ajax({
							url : "/msearch/tips/item",
							type : "POST",
							timeout : 6E4,
							data : {
								input : e
							},
							dataType : "json",
							success : function(b) {
								if (b == null)
									alert(MGLANG.msgTimeout);
								else {
									var e = b.status.msg;
									if (b.status.code == 1001) {
										var e = b.result.tipCount, i = b.result.tips, b = b.result.nums, d = "";
										f = e;
										if (e == 0)
											a("#seach_type").show(), a("#seach_type .search_tip")
													.hide(), a("#seach_type .tip_none")
													.show();
										else {
											for (var k = 0; k < e; k++) {
												data = {
													title : i[k],
													num : b[k]
												};
												var h = MGTOOL
														.template(
																'<li class=""><a href="javascript:;" title="{{= it.title }}" >{{= it.title }}</a><br/><span class="nums">\u7ea6{{= it.num }}\u4e2a\u5b9d\u8d1d</span></li>',
																data);
												d += h
											}
											a("#seach_type .search_tip")
													.html(d);
											a("#seach_type").show();
											a("#seach_type .search_tip").show();
											a("#seach_type .tip_none").hide()
										}
										c = !0
									} else
										alert(e)
								}
							},
							error : function(a, b) {
								"timeout" == b && alert(MGLANG.msgTimeout)
							},
							complete : function() {
								window.saarch_tip_if_get_tip = !0
							}
						})
				}
			};
			a("#seach_type .search_sub_tip a").live("click", function() {
						var b = a(this).attr("s-type");
						a("#select_type").val(b);
						a("#search_form").submit();
						a("#select_type").val("")
					});
			a("#search_form").submit(function() {
						var b = a("#search_form .ts_txt");
						b.val() == b.attr("def-val") && b.val("")
					});
			a("#search_form .ts_txt").focus(function() {
				if (a("#select_type").val() === "bao") {
					var b = a.trim(g.val());
					c && b != "" && b != h && a("#seach_type").show();
					g.unbind("keyup").unbind("input");
					g.bind("keyup", e).bind("input", e);
					var d = a("#search_form .ts_txt"), j = 0;
					g.unbind("keydown");
					g.bind("keydown", function(b) {
						if (b.keyCode == "38") {
							b.preventDefault();
							j = a("#seach_type .search_tip li")
									.index(a("#seach_type .search_tip li.checked"));
							a("#seach_type .search_tip li")
									.removeClass("checked");
							j--;
							j < 0 && (j = f - 1);
							var e = a("#seach_type .search_tip li:eq(" + j
									+ ")").addClass("checked").find("a").html();
							e && d.val(e)
						}
						b.keyCode == "40"
								&& (b.preventDefault(), j = a("#seach_type .search_tip li")
										.index(a("#seach_type .search_tip li.checked")), a("#seach_type .search_tip li")
										.removeClass("checked"), j++, j >= f
										&& (j = 0), (e = a("#seach_type .search_tip li:eq("
										+ j + ")").addClass("checked")
										.find("a").html())
										&& d.val(e))
					});
					a("#seach_type .search_tip li").unbind("click");
					a("#seach_type .search_tip li").live("mouseenter",
							function() {
								a("#seach_type .search_tip li")
										.removeClass("checked");
								a(this).addClass("checked")
							}).live("click", function() {
								var b = a(this).find("a").html();
								d.val(b);
								a("#search_form").submit()
							})
				}
			});
			a(".ts_txt, .ts_btn").blur(function() {
				a("body").bind("click", function(b) {
					b = b || window.event;
					MGTOOL.isParent(b.target || b.srcElement,
							a("#seach_type")[0])
							|| (a("#seach_type").hide(), a("body")
									.unbind("click"))
				});
				g.unbind("keyup");
				g.unbind("keydown")
			});
			var d = g.attr("def-val");
			d && d.length > 0 && MOGU.Globe_Input_Text(g, d)
		}
	};
	MOGU.Globe_Search_Box_Init = function() {
		if (a(".seatch_type_msearch").size() == 0) {
			var b = MOGUPROFILE.is_subsite == "1";
			a(".top_search .ts_txt").focus(function() {
				if (a("#select_type").val() === "bao") {
					var e = b
							? a("#top_search_form").position().top + 33
							: a("#top_search_form").offset().top + 33, d = b
							? a("#top_search_form").position().left
							: a("#top_search_form").offset().left;
					a("#seach_type").css({
								left : d,
								top : e
							})
				}
			});
			var c = a(".ts_txt"), g = c.attr("def-val"), h = function() {
				var b = "", d = a("#seach_type .input_words"), c = a(this)
						.val(), b = MGTOOL.getMsgLength(c);
				if (b == 0)
					return a("#seach_type").hide(), !1;
				else
					b > 4 ? d.text(MGTOOL.jsMbSubstr(c, 4) + "...") : d.text(c);
				a("#seach_type").show()
			};
			a("#search_form").submit(function() {
						var b = a("#search_form .ts_txt");
						b.val() == b.attr("def-val") && b.val("");
						b = a("#seach_type li.checked").attr("s-type");
						a("#select_type").val(b)
					});
			a(".top_search .ts_txt").focus(function() {
				if (a("#select_type").val() === "bao") {
					var b = a.trim(c.val());
					b != "" && b != g && a("#seach_type").show();
					c.unbind("keyup").unbind("input").unbind("propertychange");
					c.bind("keyup", h).bind("input", h).bind("propertychange",
							h);
					var d = 0, f = a("#seach_type li").size();
					c.unbind("keydown");
					c.bind("keydown", function(b) {
						b.keyCode == "38"
								&& (d = a("#seach_type li")
										.index(a("#seach_type li.checked")), a("#seach_type li")
										.removeClass("checked"), d--, d < 0
										&& (d = f - 1), a("#seach_type li:eq("
										+ d + ")").addClass("checked"));
						b.keyCode == "40"
								&& (d = a("#seach_type li")
										.index(a("#seach_type li.checked")), a("#seach_type li")
										.removeClass("checked"), d++, d >= f
										&& (d = 0), a("#seach_type li:eq(" + d
										+ ")").addClass("checked"))
					});
					a("#seach_type li").unbind("click");
					a("#seach_type li").bind("mouseenter", function() {
								a("#seach_type li").removeClass("checked");
								a(this).addClass("checked")
							}).click(function() {
								a("#search_form").submit()
							})
				}
			});
			a(".ts_txt, .ts_btn").blur(function() {
				a("body").bind("click", function(b) {
					b = b || window.event;
					MGTOOL.isParent(b.target || b.srcElement,
							a("#seach_type")[0])
							|| (a("#seach_type").hide(), a("body")
									.unbind("click"))
				});
				c.unbind("keyup");
				c.unbind("keydown")
			});
			var f = c.attr("def-val");
			f && f.length > 0 && MOGU.Globe_Input_Text(c, f)
		}
	};
	MOGU.Globe_Nav_Show_Ershou = function(b, c) {
		var g = "222px", h = "40px";
		a(".jia_navigation").length > 0 && (g = "76px", h = "37px");
		var f = null;
		b.hover(function() {
					b.offset();
					b.height();
					c.css({
								left : g,
								top : h
							}).slideDown(100)
				}, function() {
					f = setTimeout(function() {
								c.hide()
							}, 300)
				});
		c.hover(function() {
					clearTimeout(f)
				}, function() {
					c.slideUp(100)
				})
	};
	MOGUPROFILE.is_subsite == "1"
			&& MOGU.Globe_Nav_Show_Ershou(a(".n_l_market"), a(".market_nav"));
	MOGU.Globe_Dropdown_List_Init = function(b, c, g, h, f, e, d) {
		var d = d ? d : {}, i = null;
		b.hover(function() {
			d.nohide === void 0 && b.hasClass(d.nohide) === !1
					&& a(".s_m").hide();
			clearTimeout(i);
			var k = b.offset(), j = b.width(), l = b.height(), m = a(window)
					.width(), n = parseInt(b.css("padding-left").replace("px",
					"")), o = parseInt(b.css("padding-right").replace("px", "")), j = g
					? m - k.left - j - n - o
					: m - k.left - j - n;
			f ? e ? c.css({
						right : j + e.left,
						top : k.top + l + e.top
					}) : c.css({
						right : j,
						top : k.top + l + 5
					}) : c.css({
						right : j,
						top : k.top + 20
					});
			d.nohide && b.hasClass(d.nohide) ? c.show() : d.later
					? i = setTimeout(function() {
								c.slideDown(250)
							}, d.later)
					: c.slideDown(250);
			h && b.addClass(h)
		}, function() {
			if (!d.nohide || !b.hasClass(d.nohide))
				clearTimeout(i), i = setTimeout(function() {
							c.hide();
							h && b.removeClass(h)
						}, 100)
		});
		c.hover(function() {
					if (!d.nohide || !b.hasClass(d.nohide))
						clearTimeout(i), h && b.addClass(h), c.show()
				}, function() {
					if (!d.nohide || !b.hasClass(d.nohide))
						clearTimeout(i), i = setTimeout(function() {
									c.hide();
									h && b.removeClass(h)
								}, 100)
				})
	};
	MOGU.NavFixJia = function() {
		if (!(MOGUPROFILE.is_subsite != "1"
				|| a(".show_history_jia").length > 0 || a(".jia_navigation").length > 0)) {
			var b = !0, c = a("#navigation").height()
					+ parseInt(a("#navigation").css("margin-bottom")), g = a("#info_bar")
					.css("margin-bottom");
			a(window).scroll(function() {
				a(window).scrollTop() <= 96
						? (a("#navigation").removeClass("nav_fix"), a("#info_bar")
								.css({
											"margin-bottom" : g
										}), b = !0)
						: b
								&& (a("#navigation").addClass("nav_fix"), a("#info_bar")
										.css({
													"margin-bottom" : c + "px"
												}), b = !1)
			})
		}
	};
	MOGU.Nav_Shopping_Slide = function() {
		var b = a(".cate_list_show");
		if (b.size() != 0) {
			var c, g = function() {
				var c = a(".start_shopping"), f = c.offset().top + 36, c = c
						.offset().left;
				b.css({
							left : c,
							top : f
						})
			};
			g();
			a(window).resize(function() {
						g()
					});
			a(".cate_show li").hover(function() {
						a(this).addClass("hover")
					}, function() {
						a(this).removeClass("hover")
					});
			b.hasClass("no_slide") ? b.show() : (a(".start_shopping").hover(
					function() {
						clearTimeout(c);
						b.show()
					}, function() {
						c = setTimeout(function() {
									b.hide()
								}, 100)
					}), a(".cate_list_show .cate_show").hover(function() {
						clearTimeout(c);
						b.show()
					}, function() {
						c = setTimeout(function() {
									b.hide()
								}, 100)
					}))
		}
	};
	MOGU.Search_Select_Input = function() {
		var b = a("#top_search_form .selectbox"), c = a("#top_search_form .selected"), g = a("#select_type"), h = a("#search_form");
		b.hover(function() {
					a("#seach_type").hide();
					a(this).addClass("hover")
				}, function() {
					a(this).removeClass("hover")
				});
		a("#top_search_form a").click(function(f) {
			f.preventDefault();
			var f = a(this).parent(), e = f.attr("data-index"), d = a(this)
					.text();
			e
					&& (g.val(e), c.text("\u641c" + d), f.siblings("li")
							.removeClass("current"), f.addClass("current"), e == 4
							? h.attr("action", "/group/search/")
							: h.attr("action", "/search/"));
			b.removeClass("hover");
			e = a("#top_search_form .ts_txt")[0];
			f = a(e).val().length;
			e.setSelectionRange
					? (e.focus(), e.setSelectionRange(f, f))
					: e.createTextRange
							&& (e = e.createTextRange(), e.collapse(!0), e
									.moveEnd("character", f), e.moveStart(
									"character", f), e.select())
		})
	};
	MOGUPROFILE.is_subsite != "1"
			? (a(".cate_list_show").size() == 0
					? MOGU.Globe_Dropdown_List_Init(
							a("#info_bar .my_shotcuts .setting"),
							a("#setting_menu"))
					: (MOGU.Globe_Dropdown_List_Init(a(".info_show .uname"),
							a("#setting_menu"), !0, "", !0, {
								top : 0,
								left : 0
							}), a("#add_follow_frames").size() === 0
							&& a("#follow_menu")
									.append('<li id="add_follow_frames"><iframe width="136" height="26" frameborder="0" allowtransparency="true" marginwidth="0" marginheight="0" scrolling="no" border="0" src="http://widget.weibo.com/relationship/followbutton.php?language=zh_cn&width=136&height=24&uid=1879044834&style=2&btn=light&dpc=1"></iframe></li><li><iframe src="http://open.qzone.qq.com/like?url=http%3A%2F%2Fuser.qzone.qq.com%2F1927997462&type=button_num&width=400&height=30&style=2" allowtransparency="true" scrolling="no" border="0" frameborder="0" style="width:400px;height:26px;border:none;overflow:hidden;"></iframe></li><li><iframe src="http://follow.v.t.qq.com/index.php?c=follow&a=quick&name=mogujiewei&style=5&t=1333261751927&f=1" frameborder="0" scrolling="auto" width="150" height="24" marginwidth="0" marginheight="0" allowtransparency="true"></iframe></li>'), MOGU
							.Globe_Dropdown_List_Init(
									a(".follow_mogujie_wrap"),
									a("#follow_menu"), !0, "", !0, {
										top : 8,
										left : 0
									}, {
										later : 400
									}), a(".globe_publish").click(function() {
								MOGU.Publish_Pub_Box_Init()
							})), MOGU.Globe_Dropdown_List_Init(
					a(".my_shotcuts .msg_notice"), a("#notice_menu"), !0, "",
					!0, {
						top : 9,
						left : 0
					}), MOGU.Search_Select_Input())
			: (MOGU.Globe_Dropdown_List_Init(a(".info_show .mb_name"),
					a("#setting_menu"), !0, "mb_name_hover", !0), MOGU
					.Globe_Dropdown_List_Init(a(".my_shotcuts .msg_notice"),
							a("#notice_menu")));
	var o = a(".tuangou .tuan");
	a("#nav_slide").css("left", "auto");
	MOGU.Active_tip = function() {
		MOGUPROFILE.is_subsite != "1" && a(".nav_active_tip").size() > 0
				&& a(".nav_active_tip .active_know").click(function() {
							a.post("/active/guide/iknown", function() {
										a(".nav_active_tip").hide()
									})
						})
	};
	MOGU.Setindex_Addfav_Init = function() {
		function b() {
			setTimeout(function() {
				MOGU.IS_PROTO_IE = !1;
				if (a.browser.msie) {
					var b = MOGU.IS_360 || i.indexOf("360se") != -1, c = i
							.indexOf("se 2.x") != -1, l = i
							.indexOf("tencenttraveler") != -1
							|| i.indexOf("qqbrowser") != -1, m = i
							.indexOf("theworld") != -1, n = i
							.indexOf("maxthon") != -1;
					if (!b && !c && !c && !l && !m && !n)
						MOGU.IS_PROTO_IE = !0
				}
				b = "";
				MOGU.IS_PROTO_IE
						? b = e
						: (b = a.browser.msie || window.sidebar ? d : g + f + h, i
								.indexOf("mac", 0) != -1
								&& (b = b.replace("CTRL+D", "command+D")));
				a("#header").css({
							"margin-top" : "28px"
						}).before(b);
				if (a("#cate_slide").hasClass("cate_list_show"))
					c = a(".start_shopping"), b = c.offset().top + 36, c = c
							.offset().left, a(".cate_list_show").css({
								left : c,
								top : b
							});
				a.get("/mbs_fav_index.html?tip_index_fav=1&timestamp="
						+ (new Date).valueOf())
			}, 1E3)
		}
		function c() {
			a("#header").css({
						"margin-top" : "0"
					});
			a(".tip_index_fav").remove();
			if (a("#cate_slide").hasClass("cate_list_show")) {
				var b = a(".start_shopping"), c = b.offset().top + 36, b = b
						.offset().left;
				a(".cate_list_show").css({
							left : b,
							top : c
						})
			}
			MGTOOL.setCookie("if_show_index_fav", 1, {
						expires : 7,
						path : "/"
					})
		}
		if (MOGUPROFILE.is_subsite != "1") {
			var g = '<div class="tip_index_fav"><div class="fm960 clearfix">', h = '<div class="index_fav_close fr"> <a href="javascript:;" class="index_fav_close_link fl"></a> \u4e0d\u518d\u63d0\u793a </div> </div> </div>', f = '<div class="add_fav fl"><p class="fl" >\u6309CTRL+D\u628a\u8611\u83c7\u8857\u52a0\u5165\u6536\u85cf\u5939\uff0c\u5b85\u5728\u5bb6\u91cc\u968f\u65f6\u901b\u8857\u3002</p></div>', e = g
					+ '<div class="set_index fl"><p class="fl" >\u628a\u8611\u83c7\u8857\u8bbe\u4e3a\u9996\u9875\uff0c\u5b85\u5728\u5bb6\u91cc\u968f\u65f6\u901b\u8857\u3002</p><a href="javascript:;" class="set_index_link fl">\u8bbe\u4e3a\u9996\u9875</a></div>'
					+ h, d = g
					+ '<div class="add_fav fl"><p class="fl" >\u6309CTRL+D\u628a\u8611\u83c7\u8857\u52a0\u5165\u6536\u85cf\u5939\uff0c\u5b85\u5728\u5bb6\u91cc\u968f\u65f6\u901b\u8857\u3002</p><a href="javascript:;" class="add_fav_link fl">\u52a0\u5165\u6536\u85cf</a></div>'
					+ h, i = navigator.userAgent.toLowerCase();
			(function() {
				MOGU.IS_360 = !1;
				if (!i.match(/msie ([\d.]+)/))
					return MOGU.IS_360;
				var a = new Image;
				a.onload = function() {
					if (a.fileSize > 0)
						MOGU.IS_360 = !0
				};
				a.src = "res://360se.exe/2/2025"
			})();
			(function() {
				var a = MGTOOL.getCookie("if_show_index_fav"), b = MGTOOL
						.getCookie("index_fav_show_time") ? MGTOOL
						.getCookie("index_fav_show_time") : 0;
				return a == "1" || b >= "2" ? (MGTOOL.setCookie(
						"if_show_index_fav", 1, {
							expires : 7,
							path : "/"
						}), MGTOOL.setCookie("index_fav_show_time", 0, {
							expires : 7,
							path : "/"
						}), !1) : (MGTOOL.setCookie("index_fav_show_time",
						parseInt(b) + 1, {
							expires : 7,
							path : "/"
						}), !0)
			})()
					&& (b(), a(".tip_index_fav .set_index").live("click",
							function() {
								c();
								a
										.get("/mbs_fav_index.html?tip_index_fav=2&timestamp="
												+ (new Date).valueOf());
								try {
									this.style.behavior = "url(#default#homepage)", this
											.setHomePage("http://www.mogujie.com/?f=tip_from_index")
								} catch (b) {
								}
							}), a(".tip_index_fav .add_fav_link").live("click",
							function() {
								c();
								a
										.get("/mbs_fav_index.html?tip_index_fav=3&timestamp="
												+ (new Date).valueOf());
								try {
									window.external
											.addFavorite(
													"http://www.mogujie.com/?f=tip_from_fav",
													"\u8611\u83c7\u8857")
								} catch (b) {
									try {
										window.sidebar
												.addPanel(
														"\u8611\u83c7\u8857",
														"http://www.mogujie.com/?f=tip_from_fav",
														"")
									} catch (d) {
										i.indexOf("mac", 0) != -1
												? alert("\u62b1\u6b49\uff01\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u76f4\u63a5\u52a0\u5165\u6536\u85cf\u5939\uff0c\u8bf7\u6309 Ctrl + D \u624b\u52a8\u52a0\u5165\u6536\u85cf\u5939"
														.replace("Ctrl + D",
																"command + D"))
												: alert("\u62b1\u6b49\uff01\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u76f4\u63a5\u52a0\u5165\u6536\u85cf\u5939\uff0c\u8bf7\u6309 Ctrl + D \u624b\u52a8\u52a0\u5165\u6536\u85cf\u5939")
									}
								}
							}), a(".tip_index_fav .index_fav_close_link").live(
							"click", function() {
								c();
								a
										.get("/mbs_fav_index.html?tip_index_fav=4&timestamp="
												+ (new Date).valueOf())
							}))
		}
	};
	MOGU.Active_tip();
	MOGU.Globe_Dropdown_List_Init(o, a("#nav_slide"), !0, "", !0, {
				top : 0,
				left : -10
			});
	MOGU.Globe_Search_Box_Init();
	MOGU.Globe_Search_tip_Init();
	MOGU.Setindex_Addfav_Init();
	MOGU.Nav_Shopping_Slide();
	MOGU.NavFixJia()
})(jQuery);
(function(d) {
	MOGU.imgCodeCheck = function() {
		var b = !1, a = d(".img_code_spin");
		if (a.length == 0)
			return !0;
		for (var c = 0; c < a.length; c++)
			if (d(a[c]).val() != 0) {
				b = !0;
				break
			}
		return b
	};
	MOGU.imgCaptchaInit = function() {
		var b = d(".imgcheck_image_div"), a = d("#imgcheck_code_change");
		b.click(function() {
			var c = d(this).attr("f"), c = d("#img_code_spin_" + c), a = parseInt(c
					.val()), b = d(this), f = -75 * ((a + 1) % 4), e = b[0].style.backgroundPosition
					.split(" ");
			b[0].style.backgroundPosition = e[0] + " " + f + "px";
			c.val(a + 1)
		});
		a.click(function() {
					MOGU.imgCaptchaRecaptcha()
				})
	};
	MOGU.imgCaptchaRecaptcha = function(b) {
		var a = function(c) {
			for (var a = d(".imgcheck_image_div"), b = a.length, f = 0; f < b; f++) {
				var e = a[f], g = e.getAttribute("f");
				d("#img_code_spin_" + g).val(0);
				e = d(e);
				e.css("background-image", "url(/captchaimg/" + c + ")");
				e.css({
							"background-position" : -75 * f + "px 0"
						})
			}
		};
		b === void 0 ? d.ajax({
					url : "/reimgcaptcha",
					type : "POST",
					timeout : 6E4,
					data : {},
					dataType : "json",
					success : function(c) {
						c.status.code == 1001 && a(c.result.data.captchaId)
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout)
					}
				}) : setTimeout(function() {
					a(b)
				}, 1)
	};
	MOGU.imgCaptchaInit()
})(jQuery);