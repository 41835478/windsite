(function() {
	function f(a, b, c) {
		return (typeof b === "string" ? b : b.toString()).replace(a.define,
				function(b, a, d, h) {
					a.indexOf("def.") === 0 && (a = a.substring(4));
					a in c || (d === ":" ? c[a] = h : eval("def[code]=" + h));
					return ""
				}).replace(a.use, function(b, e) {
					var d = eval(e);
					return d ? f(a, d, c) : d
				})
	}
	var c = {
		version : "0.1.6"
	};
	typeof module !== "undefined" && module.exports
			? module.exports = c
			: this.doT = c;
	c.templateSettings = {
		evaluate : /\{\{([\s\S]+?)\}\}/g,
		interpolate : /\{\{=([\s\S]+?)\}\}/g,
		encode : /\{\{!([\s\S]+?)\}\}/g,
		use : /\{\{#([\s\S]+?)\}\}/g,
		define : /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
		varname : "it",
		strip : !0,
		append : !0
	};
	c.template = function(a, b, i) {
		var b = b || c.templateSettings, g = b.append ? "'+(" : "';out+=(", e = b.append
				? ")+'"
				: ");out+='", a = b.use || b.define ? f(b, a, i || {}) : a, a = ("var out='"
				+ (b.strip
						? a
								.replace(
										/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g,
										"")
						: a).replace(/\\/g, "\\\\").replace(/'/g, "\\'")
						.replace(b.interpolate, function(b, a) {
							return g
									+ a.replace(/\\'/g, "'").replace(/\\\\/g,
											"\\").replace(/[\r\t\n]/g, " ") + e
						}).replace(b.encode, function(a, b) {
							return g
									+ b.replace(/\\'/g, "'").replace(/\\\\/g,
											"\\").replace(/[\r\t\n]/g, " ")
									+ ").toString().replace(/&(?!\\w+;)/g, '&#38;').split('<').join('&#60;').split('>').join('&#62;').split('\"').join('&#34;').split(\"'\").join('&#39;').split('/').join('&#47;'"
									+ e
						}).replace(b.evaluate, function(b, a) {
							return "';"
									+ a.replace(/\\'/g, "'").replace(/\\\\/g,
											"\\").replace(/[\r\t\n]/g, " ")
									+ "out+='"
						}) + "';return out;").replace(/\n/g, "\\n").replace(
				/\t/g, "\\t").replace(/\r/g, "\\r").split("out+='';").join("")
				.split("var out='';out+=").join("var out=");
		try {
			return new Function(b.varname, a)
		} catch (d) {
			throw d;
		}
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
			var c = "{", b;
			for (b in a)
				a[b] != null
						&& (c += typeof a[b] === "object" ? '"' + b + '":'
								+ MGTOOL.objToJson(a[b]) + "," : '"' + b
								+ '":"' + a[b] + '",');
			c += "}";
			return c = c.replace(/,}/g, "}")
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
		var c = /tmall.com/i, b = /auction\d?.paipai.com/i, d = /buy.caomeipai.com\/goods/i, f = /www.360buy.com\/product/i, g = /product.dangdang.com\/Product.aspx\?product_id=/i, h = /book.360buy.com/i, i = /www.vancl.com\/StyleDetail/i, j = /www.vancl.com\/Product/i, k = /vt.vancl.com\/item/i, l = /item.vancl.com\/\d+/i, m = /item.vt.vancl.com\/\d+/i, n = /mbaobao.com\/pshow/i, o = /item.buy.qq.com\/item/i, p = /[www|us].topshop.com\/webapp\/wcs\/stores\/servlet\/ProductDisplay/i, q = /quwan.com\/goods/i, r = /nala.com.cn\/product/i, s = /maymay.cn\/pitem/i, t = /asos.com/i, u = /www.100f1.com\/ProductInfo_/i, v = /www.gaojie.com\/product/i, w = /a.m.taobao.com\/i/i, x = /www.51yugou.com\//i;
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
				|| w.test(a) || x.test(a)
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
					.find(".word_count").html(g), b > e ? d("#" + a)
					.find(".word_count").addClass("out") : d("#" + a)
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
				c.ajax ? a.loading() : (a.resize(), e(window).resize(
						function() {
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
(function(b) {
	MOGU.Globe_Info_Update = function() {
		if (!(MOGUPROFILE == void 0 || MOGUPROFILE.userid == void 0 || MOGUPROFILE.userid == "")) {
			var f = !1;
			b("#notice_menu .clear_notice a").live("click", function() {
				b("#notice_menu")
						.html('<li><a href="/comments#zone_tab">\u67e5\u770b\u8bc4\u8bba</a></li><li><a href="/atme#zone_tab">\u67e5\u770b@\u6211\u7684</a></li><li><a href="/atme/1/faved#zone_tab">\u67e5\u770b\u559c\u6b22\u6211\u7684</a></li><li><a href="/u/'
								+ MOGUPROFILE.userid
								+ '/fans">\u67e5\u770b\u7c89\u4e1d</a></li><li><a href="/message/inbox">\u67e5\u770b\u79c1\u4fe1</a></li>');
				b("#notice_menu").hide();
				b(".my_shotcuts .msg_notice").text("\u6d88\u606f");
				b(".my_shotcuts .msg_notice").removeClass("h");
				MGTOOL.setCookie("__mgjccInfo", null, {
							path : "/"
						});
				b.post("/collect/cancelinfo")
			});
			var m = function(c) {
				var a = parseInt(c.cmessageNew), d = parseInt(c.cmsgNew), f = parseInt(c.csysmsgNew), h = parseInt(c.catmeNew), i = parseInt(c.creplyNew), j = parseInt(c.cfansNew), k = parseInt(c.cfavedNew), l = parseInt(c.ctopicMsgNew), c = parseInt(c.cgroup_inviteNew), g = b(".my_shotcuts .msg_notice");
				b(".my_shotcuts .message");
				var e = MOGUPROFILE.is_subsite != "1" ? h + i + j + l + k + d
						+ f + c : h + i + j + l + k + d + c;
				a > 0
						? (b(".info_show .my_btn .dongtai")
								.html("\u52a8\u6001<span>(" + a + ")</span>"), b("#wb_new_messages")
								.remove(), b("#talk_list_box").size() > 0
								&& b("#talk_list_box").attr("newshow") == "do"
								&& b("#talk_list_box")
										.before('<div class="r5" id="wb_new_messages"><a href="/me">\u6709{num}\u6761\u65b0\u5fae\u535a\uff0c\u70b9\u6b64\u5237\u65b0...</a></div>'
												.replace(/{num}/g, a)))
						: (b("#header .dongtai span").html(""), b("#wb_new_messages")
								.remove());
				e > 0
						? (g.size() == 0
								? (b(".my_shotcuts")
										.prepend('<a href="javascript:;" class="msg_notice h">\u6d88\u606f('
												+ e + ")</a>"), MOGU
										.Globe_Dropdown_List_Init(
												b(".my_shotcuts .msg_notice"),
												b("#notice_menu")))
								: g.text("\u6d88\u606f(" + e + ")"), g
								.addClass("h"), b("#notice_menu").html(""), a = "", i > 0
								&& (a += '<li><a href="/comments#zone_tab">\u65b0\u8bc4\u8bba<span>('
										+ i + ")</span></a></li>"), h > 0
								&& (a += '<li><a href="/atme#zone_tab">\u65b0@\u6211\u7684<span>('
										+ h + ")</span></a></li>"), k > 0
								&& (a += '<li><a href="/atme/1/faved#zone_tab">\u65b0\u559c\u6b22\u6211\u7684<span>('
										+ k + ")</span></a></li>"), j > 0
								&& (a += '<li><a href="/u/'
										+ MOGUPROFILE.userid
										+ '/fans">\u65b0\u7c89\u4e1d<span>('
										+ j + ")</span></a></li>"), d > 0
								&& (a += '<li><a href="/message/inbox">\u65b0\u79c1\u4fe1<span>('
										+ d + ")</span></a></li>"), f > 0
								&& MOGUPROFILE.is_subsite != "1"
								&& (a += '<li><a href="/message/sysmsg">\u65b0\u901a\u77e5<span>(1)</span></a></li>'), l > 0
								&& (a += '<li><a href="/u/'
										+ MOGUPROFILE.userid
										+ '/topic">\u65b0\u4e3b\u9898\u56de\u5e94<span>('
										+ l + ")</span></a></li>"), c > 0
								&& (a += '<li><a href="/atme/1/atgroup">\u65b0\u5c0f\u7ec4\u7533\u8bf7<span>('
										+ c + ")</span></a></li>"), a += '<li class="showline"><div class="segment"></div></li>', i <= 0
								&& (a += '<li><a href="/comments#zone_tab">\u67e5\u770b\u8bc4\u8bba</a></li>'), h <= 0
								&& (a += '<li><a href="/atme#zone_tab">\u67e5\u770b@\u6211\u7684</a></li>'), k <= 0
								&& (a += '<li><a href="/atme/1/faved#zone_tab">\u67e5\u770b\u559c\u6b22\u6211\u7684</a></li>'), j <= 0
								&& (a += '<li><a href="/u/'
										+ MOGUPROFILE.userid
										+ '/fans">\u67e5\u770b\u7c89\u4e1d</a></li>'), d <= 0
								&& (a += '<li><a href="/message/inbox">\u67e5\u770b\u79c1\u4fe1</a></li>'), a += '<li class="clear_notice"><a href="javascript:;">\u6211\u77e5\u9053\u4e86</a></li>')
						: (g.size() == 0
								? (b(".my_shotcuts")
										.prepend('<a href="javascript:;" class="msg_notice">\u6d88\u606f</a>'), MOGU
										.Globe_Dropdown_List_Init(
												b(".my_shotcuts .msg_notice"),
												b("#notice_menu")))
								: (g.removeClass("h"), g.text("\u6d88\u606f")), b("#notice_menu")
								.html(""), a = "", a += '<li><a href="/comments#zone_tab">\u67e5\u770b\u8bc4\u8bba</a></li>', a += '<li><a href="/atme#zone_tab">\u67e5\u770b@\u6211\u7684</a></li>', a += '<li><a href="/atme/1/faved#zone_tab">\u67e5\u770b\u559c\u6b22\u6211\u7684</a></li>', a += '<li><a href="/u/'
								+ MOGUPROFILE.userid
								+ '/fans">\u67e5\u770b\u7c89\u4e1d</a></li>', a += '<li><a href="/message/inbox">\u67e5\u770b\u79c1\u4fe1</a></li>');
				b("#notice_menu").html(a)
			}, n = function() {
				var c = window.location.hostname == "www.mogujie.com"
						? "http://cinfo.mogujie.com/users/cinfo/"
						: "http://cinfo.mogujia.com/users/cinfo/";
				f = !0;
				b.ajax({
							url : c + "?userId=" + MOGUPROFILE.userid,
							type : "POST",
							timeout : 6E4,
							dataType : "jsonp",
							jsonpCallback : "cinfoCallBack",
							success : function(a) {
								if (a != null && a.status.code == 1001) {
									var a = a.result.data, b = {};
									b.time = (new Date).getTime();
									b = MGTOOL.objToJson(b);
									MGTOOL.setCookie("__mgjccInfo", b, {
												path : "/"
											});
									m(a)
								}
							},
							error : function() {
							},
							complete : function() {
								f = !1;
								setTimeout(function() {
											e()
										}, 5E3)
							}
						})
			}, e = function(b) {
				var b = b || "", a = MGTOOL.getCookie("__mgjccInfo");
				a != "" && (a = eval("(" + a + ")"));
				var d = new Date;
				"nocache" == b || !f
						&& (a == "" || d.getTime() - a.time > 4900)
						? n()
						: (m(a), setTimeout(function() {
									e()
								}, 5E3))
			};
			e("nocache");
			b(window).focus(function() {
					});
			b(window).blur(function() {
					})
		}
	};
	MOGU.Globe_Info_Update()
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
		} else
			a("#back2top")[0]
					? (b = a("#back2top"), c = 960, c = a.browser.msie
							&& a.browser.version == "6.0" ? 950 : 953, b.css(
							"left", Math.floor((a(window).width() - c) / 2) + c
									+ 5 + "px"), a(window).scroll(function() {
								i(b)
							}), a(window).resize(function() {
								var d = Math.floor((a(window).width() - c) / 2);
								d > 10 && b.css("left", d + c + 5 + "px")
							}))
					: a(".back2top_fat")[0]
							&& (b = a(".back2top_fat"), a(window).scroll(
									function() {
										i(b)
									}));
		var i = function(b) {
			setTimeout(function() {
						a(window).scrollTop() == 0 ? b.hide() : b.show()
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
		MOGU_Follow : function(f) {
			var b = {
				a_addfo : "<a href='javascript:;' class='addfo'>\u52a0\u5173\u6ce8</a>",
				a_delfo : "<a href='javascript:;' class='delfo'>\u53d6\u6d88\u5173\u6ce8</a>",
				span_fook : "<span class='fo_ok'>OK</span>",
				span_followed : "<span class='followed'>\u5df2\u5173\u6ce8</span>",
				add_all : "<span class='addall'>\u4e92\u76f8\u5173\u6ce8</span><a class='unfollow' href='javascript:void(0);' >\u53d6\u6d88</a>",
				add_ok : '<span class="add_ok">\u5df2\u5173\u6ce8</span><a href="javascript:void(0);" class="unfollow">\u53d6\u6d88</a>',
				add_e : "<a class='add_e' href='javascript:;'>\u5173\u6ce8</a>",
				add_a : "<span class='addall' href='javascript:;'>\u4e92\u76f8\u5173\u6ce8</span>"
			}, h = a.extend({
						wrap_div_class : "followdiv",
						add_fos : "one",
						addfo_class : "addfo"
					}, f), f = a("." + h.wrap_div_class), c = {};
			a(".addfo,.add_e", f).live("click", function() {
						if (MOGUPROFILE.userid == "") {
							MOGU.user_handsome_login_init();
							var b = a(this);
							MOGU.user_handsome_login(!1, {
										callback : function() {
											b.click()
										}
									})
						} else {
							if ("one" === h.add_fos)
								var e = a(this).parent().attr("uid"), e = Array(e);
							c = {
								followIds : e
							};
							g("/collect/addfollow", c, a(this), "add_follow")
						}
					});
			a(".unfollow", f).live("click", function() {
				if (!confirm("\u786e\u5b9a\u8981\u53d6\u6d88\u5173\u6ce8\u4e48\uff1f"))
					return !1;
				c = {
					followIds : a(this).parent().attr("uid")
				};
				g("/collect/unfollow", c, a(this), "del_fo")
			});
			a(".addfo_all").click(function() {
				var b = [], e = [];
				a(".si_friends .sif_f").each(function() {
					a(this).find(".s_in").attr("checked") == "checked"
							&& (b.push(a(this).find(".foit").attr("uid")), e
									.push(a(this).find(".foit").attr("sname")), a(this)
									.parent().remove(), a(this).fadeOut(500,
									function() {
									}))
				});
				if (b.length == 0)
					return alert("\u8bf7\u9009\u62e9\u7528\u6237!"), !1;
				a(".si_friends li").size() == 0
						&& a(".sina_invite, .si_down").fadeOut();
				c = {
					followIds : b,
					zone_sina_fo : "zone_sina_fo",
					sina_name_array : e
				};
				g("/collect/addfollow", c, a(this), "add_follow")
			});
			var g = function(c, e, d, f) {
				a.ajax({
					url : c,
					type : "POST",
					timeout : 6E4,
					data : e,
					dataType : "json",
					success : function(a) {
						if (a == null)
							alert(MGLANG.msgTimeout);
						else {
							var c = a.status.msg;
							a.status.code == 1001
									? (a = a.result.data.relationships[0], "add_follow" == f
											? d.parent().attr("type") == "all"
													? a == "r1"
															? d
																	.parent()
																	.html(b.add_ok)
															: a == "r3"
																	&& d
																			.parent()
																			.html(b.add_all)
													: d.attr("type") != "sina"
															&& (d
																	.parent()
																	.attr("type") == "group"
																	? d
																			.parent()
																			.html(b.span_followed)
																	: a == "r1"
																			? d
																					.parent()
																					.html(b.span_followed)
																			: a == "r3"
																					&& d
																							.parent()
																							.html(b.add_a))
											: "del_fo" == f
													&& (a == "r2"
															? d
																	.parent()
																	.html(b.add_e)
															: a == "r0"
																	&& d
																			.parent()
																			.html(b.a_addfo)))
									: alert(c)
						}
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout)
					}
				})
			};
			return this
		}
	});
	a(".followdiv").MOGU_Follow()
})(jQuery);
(function(b) {
	b.fn.pubimg = function(h) {
		var e = b.extend({}, {
					callback : function(a, b, e, c) {
						MGTOOL.log("code:" + a);
						MGTOOL.log("msg:" + b);
						MGTOOL.log("imgId:" + e);
						MGTOOL.log("path:" + c)
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
			var a = b(this), d = !0;
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
					b("#ifr_picup").parent().remove();
					f && clearInterval(f);
					var c = a.parents("form");
					location.hostname != "www.mogujie.com" ? c
							.find("input[name=host]").size() == 0
							&& c.append('<input type="hidden" value="'
									+ location.host + '" name="host">') : c
							.attr("action",
									"http://upload.mogujie.com/upload/addpic/");
					c.find("input[name=callback]").size() == 0
							&& c.append('<input type="hidden" value="'
									+ e.funName + '" name="callback">');
					b("#ifr_picup").size() == 0
							&& b("body")
									.append('<div style="display: none;"><iframe frameborder="0" name="ifr_picup" id="ifr_picup" src="about:blank"></iframe></div>');
					c.attr("target", "ifr_picup");
					c.submit();
					var d = 0;
					f = setInterval(function() {
						d == 180
								&& (b("#ifr_picup").parent().remove(), alert(MGLANG.msgTimeout), clearInterval(f));
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
		}, a = d.extend(j, i), g = function(b) {
			b == 0
					? (a.up_another_div.hide(), a.up_default_div.show(), a.hide_img_content
							&& a.pub_img_content.hide())
					: b < a.img_limit
							? (a.up_default_div.hide(), a.up_another_div.show(), a.pub_img_content
									.show())
							: (a.up_default_div.hide(), a.up_another_div.hide())
		}, f = {
			get_img_array : function() {
				return a.pub_img_content.data("img_array")
			},
			get_img_count : function() {
				var a = this.get_img_array();
				return d.trim(a) == "" ? 0 : a.replace(/^,+/, "").replace(
						/,+$/, "").split(/,+/).length
			},
			set_img_count : function(b) {
				var c = this.get_img_array();
				MGTOOL.log("1:" + c);
				c += b + ",";
				MGTOOL.log("2:" + c);
				a.pub_img_content.data("img_array", c);
				return this.get_img_count()
			},
			del_img_count : function(b) {
				var c = this.get_img_array(), c = c.replace(b + ",", "");
				a.pub_img_content.data("img_array", c);
				return this.get_img_count()
			}
		};
		(function() {
			a.pub_img_content.find(".add_file").pubimg({
				prefun : function() {
					a.pub_img_content.data("img_array");
					var b = f.get_img_count();
					return a.img_limit > b
				},
				callback : function(b, c, e, h) {
					a.uppic_cb
							? a.uppic_cb(b, c, e, h)
							: (b = {
								imgId : e,
								path : h + "_100x100.jpg"
							}, d(".up_another")
									.before(MGTOOL
											.template(
													'<div class="img_wrap r5"><img src="{{= it.path }}" class="r5"><a href="javascript:;" class="del" iid="{{= it.imgId }}"></a></div>',
													b)));
					e = f.set_img_count(e);
					g(e)
				}
			})
		})();
		(function() {
			a.pub_img_content.find(".del").live("click", function() {
						var b = d(this);
						b.parents("." + a.del_wrap).remove();
						b = f.del_img_count(b.attr("iid"));
						g(b)
					})
		})()
	}
})(jQuery);
(function(b) {
	MOGU.Publish_Imgs_Init = function(a, d) {
		b("#lb_publish_box .add_file").pubimg({
			callback : function(c, f, e, h) {
				a.close();
				var g = new MGLightBox({
							title : "\u6211\u8981\u5206\u4eab",
							lightBoxId : "lb_publish_imgs",
							scroll : !1,
							ajax : !0,
							isBgClickClose : !1
						});
				g.init();
				getImgInfo = b.ajax({
					url : "/twitter/imgpubview",
					type : "POST",
					timeout : 6E4,
					data : {
						imgId : e,
						path : h
					},
					dataType : "json",
					success : function(a) {
						if (a == null || a == "")
							alert(MGLANG.msgTimeout), goods_frame.remove();
						else {
							var c = a.status.msg;
							if (a.status.code == 1001) {
								g.buildContent(a.result.data.html);
								d
										&& d.albumId
										&& b("#lb_publish_imgs .chose_album")
												.hide();
								MOGU
										.Globe_Input_Text_Hide(b(".pub_box_op .pub_txt"));
								var f = MOGUPROFILE.is_subsite == "0"
										? 140
										: 300;
								MOGU.WB_Word_Count("lb_publish_imgs",
										"pub_content_img", f);
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
													.prop("checked"), h = c
													.find(".pub_txt"), i = h
													.val(), i = h.attr("def-v") == i
													? ""
													: i;
											if (MGTOOL.getMsgLength(b.trim(i)) > f)
												return alert("\u6700\u591a\u53ef\u4ee5\u8f93\u5165"
														+ f
														+ "\u4e2a\u5b57\uff0c\u60a8\u8f93\u5165\u5f97\u592a\u591a\u4e86\u3002"), !1;
											var j = c.find(".choose")
													.data("albumid"), a = {
												content : i,
												imgIds : a,
												albumId : j,
												sync : e,
												local : MOGUPROFILE.local
											};
											if (d)
												for (var k in d)
													d[k] && (a[k] = d[k]);
											if (typeof a.albumId == "undefined") {
												j = c.find(".choose")
														.attr("albumid");
												if (typeof j == "undefined")
													return alert("\u4f60\u8fd8\u672a\u9009\u62e9\u4e13\u8f91"), !1;
												a.albumId = j
											}
											MOGU.Publish_Pub_Submit({
												data : a,
												succ_cb : function() {
													d
															? d.albumId
																	? (g
																			.success_close("\u53d1\u8868\u6210\u529f\uff01"), d.reload == "true"
																			&& setTimeout(
																					function() {
																						window.location
																								.reload()
																					},
																					1E3))
																	: g
																			.success_close(
																					'\u53d1\u8868\u6210\u529f\uff01 <a href="/album/show/'
																							+ j
																							+ '" class="to_see">\u53bb\u770b\u770b</a>',
																					2E3)
															: g
																	.success_close(
																			'\u53d1\u8868\u6210\u529f\uff01 <a href="/album/show/'
																					+ j
																					+ '" class="to_see">\u53bb\u770b\u770b</a>',
																			2E3);
													b(".pub_img_content").data(
															"img_array", "")
												},
												fail_cb : function() {
													g
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
				.buildContent('<div class="pub_goods_url clearfix"><div class="clearfix"><input class="g_url fl" type="text" value="\u5c06\u5546\u54c1\u7f51\u5740\u7c98\u8d34\u5230\u8fd9\u91cc" placeholder="\u5c06\u5546\u54c1\u7f51\u5740\u7c98\u8d34\u5230\u8fd9\u91cc"><input class="g_s fl" value="\u786e\u5b9a" type="button"></div><div class="support_site"><span class="title">\u5df2\u652f\u6301\u4ee5\u4e0b\u7f51\u7ad9</span><p class="support_list"><a href="http://www.taobao.com/" target="_blank">\u6dd8\u5b9d</a><a href="http://www.paipai.com/" target="_blank">\u62cd\u62cd</a><a href="http://www.dangdang.com/" target="_blank">\u5f53\u5f53</a><a href="http://www.vancl.com/" target="_blank">\u51e1\u5ba2</a><a href="http://www.360buy.com/" target="_blank">\u4eac\u4e1c</a><a href="http://www.topshop.com/" target="_blank">Topshop</a><a href="http://buy.caomeipai.com/" target="_blank">\u8349\u8393\u6d3e</a><a href="http://www.mbaobao.com/" target="_blank">\u9ea6\u5305\u5305</a><a href="http://www.nala.com.cn/" target="_blank">NALA</a><a href="http://www.maymay.cn/" target="_blank">Maymay</a><a href="http://www.asos.com/" target="_blank">asos</a><a href="http://www.100f1.com/" target="_blank">\u6211\u7684\u767e\u5206\u4e4b\u4e00</a><a href="http://www.51yugou.com/" target="_blank">\u7a00\u54c1\u7f51</a></p></div></div>');
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
				var h = new MGLightBox({
							title : "\u6211\u8981\u5206\u4eab",
							lightBoxId : "lb_publish_goods",
							scroll : !1,
							ajax : !0,
							isBgClickClose : !1
						});
				h.init();
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
									? (e = a.result.data.detail, MOGU.WB_Goods_Array[e.num_id] = e, h
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
														.val(), f = e
														.attr("def-v") == f
														? ""
														: f;
												if (MGTOOL.getMsgLength(b
														.trim(f)) > 140)
													return alert("\u6700\u591a\u53ef\u4ee5\u8f93\u5165140\u4e2a\u5b57\uff0c\u60a8\u8f93\u5165\u5f97\u592a\u591a\u4e86\u3002"), !1;
												var g = a.find(".choose")
														.data("albumid"), c = {
													content : f,
													albumId : g,
													goods : MGTOOL
															.objToJson(MOGU.WB_Goods_Array),
													sync : c,
													local : MOGUPROFILE.local
												};
												if (d)
													for (var i in d)
														d[i] && (c[i] = d[i]);
												if (typeof c.albumId == "undefined") {
													g = a.find(".choose")
															.attr("albumid");
													if (typeof g == "undefined")
														return alert("\u4f60\u8fd8\u672a\u9009\u62e9\u4e13\u8f91"), !1;
													c.albumId = g
												}
												MOGU.Publish_Pub_Submit({
													data : c,
													succ_cb : function() {
														d
																? (d.albumId
																		&& h
																				.success_close("\u53d1\u8868\u6210\u529f"), d.reload == "true"
																		&& setTimeout(
																				function() {
																					window.location
																							.reload()
																				},
																				1E3))
																: h
																		.success_close(
																				'\u53d1\u8868\u6210\u529f\uff01 <a href="/album/show/'
																						+ g
																						+ '" class="to_see">\u53bb\u770b\u770b</a>',
																				2E3);
														MOGU.WB_Goods_Array = {}
													},
													fail_cb : function() {
														h
																.fail('\u53d1\u8868\u5931\u8d25\uff01 <a href="javascript:;" class="try_again">\u518d\u8bd5\u4e00\u6b21</a>');
														MOGU.WB_Goods_Array = {}
													}
												})
											}))
									: (alert(e), c.remove())
						}
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout)
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
									: "\u4e0a\u4f20\u4f60\u7684\u642d\u914d\u6652\u8d27\u7b49\u7f8e\u56fe")
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
(function(a) {
	MOGU.Globe_UserInfo_Tip_Init = function() {
		var h = null, n = null, i = a(".u_name,.icard");
		i.live("mouseenter", function() {
			clearTimeout(h);
			clearTimeout(n);
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
				var p = a(this).offset(), l = p.left, d = a(this).width(), q = d
						/ 2 - 8, s = a(window).width();
				l + 300 > s && (l = l - 300 + d, q = 300 - d / 2 - 8);
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
							top : p.top - 167 + "px",
							left : l + "px"
						});
				a("#u_info_tip .tip_arrow").css("margin-left", q + "px");
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
								.css("margin-left", q + "px"), a("#u_info_tip .medal_a")
								.size() == 0
								&& a("#u_info_tip").css({
											top : p.top - 145 + "px",
											left : l + "px"
										}))
						: n = setTimeout(function() {
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
										clearTimeout(h), clearTimeout(n), a("#u_info_tip .tip_info p")
												.eq(1).text(MGLANG.msgTimeout), a("#u_info_tip")
												.hide();
									else {
										var m = e.status.msg;
										if (e.status.code == 1001) {
											var b = e.result.data.user, m = '<div class="tip_info"><img class="avatar" src="{avatar}" alt=""><div class="info"><p><a href="/u/{url}" class="uname" >{name}</a>{bz}</p><p>{address}</p><p><a href="/u/{userId}/fans" target="_blank"><span>{fans}</span></a>\u7c89\u4e1d<a style="margin-left:10px;" href="/u/{userId}/bao" target="_blank"><span>{goods}</span></a>\u5206\u4eab<a style="margin-left:10px;" href="/u/{userId}/bao" target="_blank"><span>{faved}</span></a>\u559c\u6b22</p></div><div class="intro">{intro}</div>{medal}</div><div class="tip_toolbar">{toolbar}</div><div class="tip_arrow"></div>', d = e.result.data.gadminurl, i = '<a target="_blank" href="'
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
												var r = "<img src='/img/new_xiaoxian_s.png' />";
											else
												f == 2
														? r = "<img src='/img/new_xiaoxia_s.png' />"
														: f == 3
																? r = "<img src='/img/tag_daren_s.png' />"
																: f == 4
																		&& (r = "");
											var o = void 0 == b.medal
													? ""
													: b.medal, f = "", j;
											for (j in o) {
												var g = o[j];
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
											o = b.userId;
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
													k += '<a href="/message/send/?uid={userId}" target="_blank">\u53d1\u79c1\u4fe1</a>';
												u && (k += i);
												A && (k += t)
											}
											m = m.replace(/{avatar}/, d)
													.replace(/{url}/, o)
													.replace(/{name}/g, c)
													.replace(/{address}/, b)
													.replace(/{fans}/, s)
													.replace(/{goods}/, w)
													.replace(/{medal}/, f)
													.replace(/{intro}/, j)
													.replace(/{toolbar}/, k)
													.replace(/{userId}/g, o)
													.replace(/{faved}/g, x)
													.replace(/{bz}/g, r);
											a("#u_info_tip").html(m);
											a("#u_info_tip .medal_a").size() == 0
													&& a("#u_info_tip").css({
														top : p.top - 145
																+ "px",
														left : l + "px"
													});
											a("#u_info_tip .tip_arrow").css(
													"margin-left", q + "px");
											a("body").data(c, m);
											clearTimeout(h)
										} else
											a("#u_info_tip .tip_info p").eq(1)
													.text(m)
									}
								},
								error : function(c, d) {
									clearTimeout(h);
									clearTimeout(n);
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
					clearTimeout(n);
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
			var b = a("#lb_addalbum .choose").data("albumid"), i = "";
			a("#lb_addalbum #pub_out_check").attr("checked") == "checked"
					&& (i = 1);
			c = {
				tid : f,
				imgType : g,
				imgId : d,
				content : c,
				albumId : b,
				sync : i
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
			window.saarch_tip_if_input_words = !0;
			window.saarch_tip_if_get_tip = !0;
			var c = !1;
			a(".top_search .ts_txt").focus(function() {
				var e = a("#top_search_form").offset().top + 33, b = a("#top_search_form")
						.offset().left;
				a("#seach_type").css({
							left : b,
							top : e
						})
			});
			var b = a(".ts_txt"), i = b.attr("def-val");
			b.val(i);
			var d = 0, h = function(a, b) {
				if ((!a || !(a.keyCode == "38" || a.keyCode == "40")) && !b)
					window.saarch_tip_if_input_words
							|| clearTimeout(seacrh_tip_input_words_t), window.saarch_tip_if_input_words = !1, seacrh_tip_input_words_t = setTimeout(
							function() {
								window.saarch_tip_if_input_words = !0;
								MOGU.seacrh_tip_input_words(null, !0)
							}, 100)
			};
			this.seacrh_tip_input_words = function() {
				if (window.saarch_tip_if_get_tip) {
					var b = "";
					a("#seach_type .input_words");
					var h = a(".ts_txt").val(), b = MGTOOL.getMsgLength(h);
					if (b == 0)
						return a("#seach_type").hide(), !1;
					else
						a.ajax({
							url : "/msearch/tips/item",
							type : "POST",
							timeout : 6E4,
							data : {
								input : h
							},
							dataType : "json",
							success : function(b) {
								if (b == null)
									alert(MGLANG.msgTimeout);
								else {
									var e = b.status.msg;
									if (b.status.code == 1001) {
										var e = b.result.tipCount, b = b.result.tips, h = "";
										d = e;
										if (e == 0)
											a("#seach_type").hide(), c = !1;
										else {
											for (var f = 0; f < e; f++) {
												data = {
													title : b[f]
												};
												var i = MGTOOL
														.template(
																'<li class=""><a href="javascript:;" title="{{= it.title }}" >{{= it.title }}</a></li>',
																data);
												h += i
											}
											a("#seach_type .search_tip")
													.html(h);
											a("#seach_type").show();
											c = !0
										}
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
			a(".top_search").focusin(function() {
				var e = a.trim(b.val());
				c && e != "" && e != i && a("#seach_type").show();
				b.unbind("keyup").unbind("input");
				b.bind("keyup", h).bind("input", h);
				var f = a("#search_form .ts_txt"), g = 0;
				b.unbind("keydown");
				b.bind("keydown", function(b) {
					if (b.keyCode == "38") {
						b.preventDefault();
						g = a("#seach_type .search_tip li")
								.index(a("#seach_type .search_tip li.checked"));
						a("#seach_type .search_tip li").removeClass("checked");
						g--;
						g < 0 && (g = d - 1);
						var c = a("#seach_type .search_tip li:eq(" + g + ")")
								.addClass("checked").find("a").html();
						c && f.val(c)
					}
					b.keyCode == "40"
							&& (b.preventDefault(), g = a("#seach_type .search_tip li")
									.index(a("#seach_type .search_tip li.checked")), a("#seach_type .search_tip li")
									.removeClass("checked"), g++, g >= d
									&& (g = 0), (c = a("#seach_type .search_tip li:eq("
									+ g + ")").addClass("checked").find("a")
									.html())
									&& f.val(c))
				});
				a("#seach_type .search_tip li").unbind("click");
				a("#seach_type .search_tip li").live("mouseenter", function() {
							a("#seach_type .search_tip li")
									.removeClass("checked");
							a(this).addClass("checked")
						}).live("click", function() {
							var b = a(this).find("a").html();
							f.val(b);
							a("#search_form").submit()
						})
			});
			a(".ts_txt, .ts_btn").blur(function() {
				a("body").bind("click", function(b) {
					b = b || window.event;
					MGTOOL.isParent(b.target || b.srcElement,
							a("#seach_type")[0])
							|| (a("#seach_type").hide(), a("body")
									.unbind("click"))
				});
				b.unbind("keyup");
				b.unbind("keydown")
			});
			MOGU.Globe_Input_Text(b)
		}
	};
	MOGU.Globe_Search_Box_Init = function() {
		if (a(".seatch_type_msearch").size() == 0) {
			var c = MOGUPROFILE.is_subsite == "1";
			a(".top_search .ts_txt").focus(function() {
				var b = c
						? a("#top_search_form").position().top + 33
						: a("#top_search_form").offset().top + 33, d = c
						? a("#top_search_form").position().left
						: a("#top_search_form").offset().left;
				a("#seach_type").css({
							left : d,
							top : b
						})
			});
			var b = a(".ts_txt"), i = b.attr("def-val"), d = function() {
				var b = "", c = a("#seach_type .input_words"), d = a(this)
						.val(), b = MGTOOL.getMsgLength(d);
				if (b == 0)
					return a("#seach_type").hide(), !1;
				else
					b > 4 ? c.text(MGTOOL.jsMbSubstr(d, 4) + "...") : c.text(d);
				a("#seach_type").show()
			};
			a("#search_form").submit(function() {
						var b = a("#search_form .ts_txt");
						b.val() == b.attr("def-val") && b.val("");
						b = a("#seach_type li.checked").attr("s-type");
						a("#select_type").val(b)
					});
			a(".top_search").focusin(function() {
				var c = a.trim(b.val());
				c != "" && c != i && a("#seach_type").show();
				b.unbind("keyup").unbind("input").unbind("propertychange");
				b.bind("keyup", d).bind("input", d).bind("propertychange", d);
				var e = 0, f = a("#seach_type li").size();
				b.unbind("keydown");
				b.bind("keydown", function(b) {
					b.keyCode == "38"
							&& (e = a("#seach_type li")
									.index(a("#seach_type li.checked")), a("#seach_type li")
									.removeClass("checked"), e--, e < 0
									&& (e = f - 1), a("#seach_type li:eq(" + e
									+ ")").addClass("checked"));
					b.keyCode == "40"
							&& (e = a("#seach_type li")
									.index(a("#seach_type li.checked")), a("#seach_type li")
									.removeClass("checked"), e++, e >= f
									&& (e = 0), a("#seach_type li:eq(" + e
									+ ")").addClass("checked"))
				});
				a("#seach_type li").unbind("click");
				a("#seach_type li").bind("mouseenter", function() {
							a("#seach_type li").removeClass("checked");
							a(this).addClass("checked")
						}).click(function() {
							a("#search_form").submit()
						})
			});
			a(".ts_txt, .ts_btn").blur(function() {
				a("body").bind("click", function(b) {
					b = b || window.event;
					MGTOOL.isParent(b.target || b.srcElement,
							a("#seach_type")[0])
							|| (a("#seach_type").hide(), a("body")
									.unbind("click"))
				});
				b.unbind("keyup");
				b.unbind("keydown")
			});
			MOGU.Globe_Input_Text(b)
		}
	};
	MOGU.Globe_Dropdown_List_Init = function(c, b, i, d, h, e, f) {
		var f = f ? f : {}, g = null;
		c.hover(function() {
			f.nohide === void 0 && c.hasClass(f.nohide) === !1
					&& a(".s_m").hide();
			clearTimeout(g);
			var l = c.offset(), j = c.width(), k = c.height(), m = a(window)
					.width(), n = parseInt(c.css("padding-left").replace("px",
					"")), o = parseInt(c.css("padding-right").replace("px", "")), j = i
					? m - l.left - j - n - o
					: m - l.left - j - n;
			h ? e ? b.css({
						right : j + e.left,
						top : l.top + k + e.top
					}) : b.css({
						right : j,
						top : l.top + k + 5
					}) : b.css({
						right : j,
						top : l.top + 20
					});
			f.nohide && c.hasClass(f.nohide) ? b.show() : f.later
					? g = setTimeout(function() {
								b.slideDown(250)
							}, f.later)
					: b.slideDown(250);
			d && c.addClass(d)
		}, function() {
			if (!f.nohide || !c.hasClass(f.nohide))
				clearTimeout(g), g = setTimeout(function() {
							b.hide();
							d && c.removeClass(d)
						}, 800)
		});
		b.hover(function() {
					if (!f.nohide || !c.hasClass(f.nohide))
						clearTimeout(g), d && c.addClass(d), b.show()
				}, function() {
					if (!f.nohide || !c.hasClass(f.nohide))
						clearTimeout(g), g = setTimeout(function() {
									b.hide();
									d && c.removeClass(d)
								}, 800)
				})
	};
	MOGU.NavFixJia = function() {
		if (MOGUPROFILE.is_subsite == "1") {
			var c = !0, b = a("#navigation").height()
					+ parseInt(a("#navigation").css("margin-bottom")), i = a("#info_bar")
					.css("margin-bottom");
			a(window).scroll(function() {
				a(window).scrollTop() <= 96
						? (a("#navigation").removeClass("nav_fix"), a("#info_bar")
								.css({
											"margin-bottom" : i
										}), c = !0)
						: c
								&& (a("#navigation").addClass("nav_fix"), a("#info_bar")
										.css({
													"margin-bottom" : b + "px"
												}), c = !1)
			})
		}
	};
	MOGU.Nav_Shopping_Slide = function() {
		var c = a(".cate_list_show");
		if (c.size() != 0) {
			var b, i = function() {
				var b = a(".start_shopping"), i = b.offset().top + 36, b = b
						.offset().left;
				c.css({
							left : b,
							top : i
						})
			};
			i();
			a(window).resize(function() {
						i()
					});
			a(".cate_show li").hover(function() {
						a(this).addClass("hover")
					}, function() {
						a(this).removeClass("hover")
					});
			c.hasClass("no_slide") ? c.show() : (a(".start_shopping").hover(
					function() {
						clearTimeout(b);
						c.show()
					}, function() {
						b = setTimeout(function() {
									c.hide()
								}, 100)
					}), a(".cate_list_show .cate_show").hover(function() {
						clearTimeout(b);
						c.show()
					}, function() {
						b = setTimeout(function() {
									c.hide()
								}, 100)
					}))
		}
	};
	MOGU.Nav_Cookie_Know = function() {
		var c = function(b, c) {
			MGTOOL.setCacheCookie("ued_cookie_navgation_showhide", "1", {
						expires : 14
					}, MOGUPROFILE.userid);
			a("#setting_menu .showhidden").remove();
			c.removeClass("nohide");
			b.hide()
		}, b = function(b, d) {
			a("#setting_menu .showhidden").live("click", function(h) {
				jQuery.browser.version == "6.0" ? c(b, d) : a(h.target)
						.hasClass("konw")
						&& c(b, d)
			})
		};
		(function() {
			var c = a("#setting_menu"), d = a(".my_btn .uname");
			if (!(MOGUPROFILE.userid == void 0 || MOGUPROFILE.userid.length < 1
					|| d.length === 0 || c.length === 0)) {
				var h = 0, e = MGTOOL.getCacheCookie(
						"ued_cookie_navgation_showhide", MOGUPROFILE.userid);
				d.addClass("nohide");
				e && e === "1" && (h = 1);
				h === 0 && (setTimeout(function() {
					var b = a("#setting_menu .hs_posr");
					d.offset();
					var e = d.offset().top + d.height(), h = d.offset().left;
					c.css({
								top : e,
								left : h,
								display : "block"
							});
					b
							.append('<div class="showhidden"><a href="#" class="konw">\u77e5\u9053\u4e86</a></div>')
							.addClass("hover")
				}, 1E3), b(c, d))
			}
		})()
	};
	MOGUPROFILE.is_subsite != "1" && MOGU.Nav_Cookie_Know();
	if (MOGUPROFILE.is_subsite != "1") {
		if (a(".cate_list_show").size() == 0)
			MOGU.Globe_Dropdown_List_Init(a("#info_bar .my_shotcuts .setting"),
					a("#setting_menu"));
		else {
			var k = a(".mb_name").width() - a("#setting_menu").width() + 12;
			MOGU.Globe_Dropdown_List_Init(a(".info_show .uname"),
					a("#setting_menu"), !0, "", !0, {
						top : 0,
						left : k
					}, {
						nohide : "nohide"
					});
			MOGU.Globe_Dropdown_List_Init(a(".follow_mogujie_wrap"),
					a("#follow_menu"), !0, "", !0, {
						top : 8,
						left : 0
					}, {
						later : 400
					});
			a(".globe_publish").click(function() {
						MOGU.Publish_Pub_Box_Init()
					})
		}
		MOGU.Globe_Dropdown_List_Init(a(".my_shotcuts .msg_notice"),
				a("#notice_menu"), !0, "", !0, {
					top : 9,
					left : 0
				})
	} else
		MOGU.Globe_Dropdown_List_Init(a(".info_show .mb_name"),
				a("#setting_menu"), !0, "mb_name_hover", !0), MOGU
				.Globe_Dropdown_List_Init(a(".my_shotcuts .msg_notice"),
						a("#notice_menu"));
	k = a(".tuangou .tuan");
	a("#nav_slide").css("left", "auto");
	MOGU.Globe_Dropdown_List_Init(k, a("#nav_slide"), !0, "", !0, {
				top : 0,
				left : -10
			});
	MOGU.Globe_Search_Box_Init();
	MOGU.Globe_Search_tip_Init();
	MOGU.Nav_Shopping_Slide();
	MOGU.NavFixJia()
})(jQuery);