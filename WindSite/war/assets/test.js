
fml.define("component/select", ["jquery", "component/regString"],
		function(a, b) {
			var c = a("jquery"), d = a("component/regString");
			return {
				createSelect : function(a, b) {
					function g(a) {
						arr = [], arr.push('<div class="selectPanel">'), arr
								.push('<div class="select"><div class="selectText" val="'
										+ a.find("option:selected").attr("id")
										+ '" >'
										+ a.find("option:selected").text()
										+ '</div><div class="selectBtn"></div></div>'), arr
								.push('<div class="options" >'), arr
								.push("<ul></ul>"), arr.push("</div>"), arr
								.push("</div>");
						var e = c(arr.join(""));
						a.before(e);
						var f = a.find("option"), g = f.size(), h = [];
						for (var i = 0; i < g; i++) {
							var j = d.escapeString(f.eq(i).val());
							h.push('<li role="' + f.eq(i).attr("role")
									+ '" id="' + f.eq(i).attr("id")
									+ '"  value="' + j + '">' + j + "</li>")
						}
						c(e).find(".options ul").html(h.join("")), b && b(e), c(".createPanel")
								.bind("click", function(a) {
											c(".options").show()
										}), c(e).find(".select").bind("click",
								function(a) {
									c(this).attr("isSelect") != "true"
											? (c(this).css({
														visibility : "hidden"
													}), c(e).find(".options")
													.show(), c(this).attr(
													"isSelect", "true"))
											: (c(this).css({
														visibility : "visible"
													}), c(e).find(".options")
													.hide(), c(this)
													.removeAttr("isSelect"))
								}), c(e).delegate(".options ul li",
								"mouseover", function() {
									c(this).css({
												background : "#ffeef4"
											})
								}), c(e).delegate(".options ul li", "mouseout",
								function() {
									c(this).css({
												background : "#fff"
											})
								}), c(e).delegate(".options ul li", "click",
								function() {
									c(e).find(".selectText").text(c(this)
											.text()), c(e).find(".selectText")
											.attr("val", c(this).attr("id")), a
											.attr("value", c(this).text()), c(e)
											.find(".options").hide(), c(e)
											.find(".select").css("visibility",
													"visible")
											.removeAttr("isSelect")
								}), c(e).find(".select").hover(function() {
									c(this).addClass("selectbg")
								}, function() {
									c(this).removeClass("selectbg")
								})
					}
					a = c(a);
					var e = a.size();
					a.css("display") == "none" && a.prev().remove(), a.hide();
					for (var f = 0; f < e; f++)
						g(a.eq(f))
				}
			}
		});
fml.define("app/insertAtCaret", ["jquery"], function(a, b) {
	var c = a("jquery");
	return function(a, b) {
		typeof a[0].name != "undefined" && (a = a[0]);
		if (c.browser.msie)
			a.focus(), sel = document.selection.createRange(), sel.text = b, a
					.focus();
		else if (c.browser.mozilla || c.browser.webkit) {
			var d = a.selectionStart, e = a.selectionEnd, f = a.scrollTop;
			a.value = a.value.substring(0, d) + b
					+ a.value.substring(e, a.value.length), a.focus(), a.selectionStart = d
					+ b.length, a.selectionEnd = d + b.length, a.scrollTop = f
		} else
			a.value += b, a.focus()
	}
});
fml.define("app/magazine", ["jquery", "app/smile", "app/checkStatusCode",
				"component/storage", "app/insertAtCaret", "component/shareTmp",
				"component/select", "component/focus",
				"component/cursorPostion", "component/regString"], function(a,
				b) {
			var c = a("jquery"), d = a("component/shareTmp"), e = a("component/focus"), f = a("component/select"), g = a("app/smile"), h = a("app/insertAtCaret"), i = !0, j = a("component/storage"), k = a("component/cursorPostion"), l = "", m = a("app/checkStatusCode"), n = a("component/regString"), o = function() {
				function f(b, c, e) {
					c.attr("s_type", b);
					var f = d[e];
					switch (b) {
						case 0 :
							c.attr("title", a[e].not_auth), c.removeClass("i_"
									+ f).addClass("g_" + f);
							break;
						case 1 :
							c.attr("title", a[e].syn), c.removeClass("g_" + f)
									.addClass("i_" + f);
							break;
						case 2 :
							c.attr("title", a[e].not_syn), c.removeClass("i_"
									+ f).addClass("g_" + f)
					}
				}
				function g(a, d, e) {
					switch (a) {
						case 0 :
							f(1, d, e), fml.vars[e] = 1, window
									.open(
											b[e].not_auth,
											"mb",
											[
													"toolbar=0,status=0,resizable=1,width=620,height=450,left=",
													(screen.width - 620) / 2,
													",top=",
													(screen.height - 450) / 2]
													.join(""));
							break;
						case 1 :
							f(2, d, e), c.get("/settings/ajax_remove_sync", {
										type : e
									}), fml.vars[e] = 2;
							break;
						case 2 :
							f(1, d, e), c.get("/settings/ajax_add_sync", {
										type : e
									}), fml.vars[e] = 1
					}
				}
				var a = {
					weibo : {
						not_auth : "你还没有绑定新浪微博，点击去绑定",
						not_syn : "未同步到新浪微博",
						syn : "取消同步到新浪微博"
					},
					qzone : {
						not_auth : "你还没有绑定QQ空间，点击去绑定",
						not_syn : "未同步到QQ空间",
						syn : "取消同步到QQ空间"
					}
				}, b = {
					weibo : {
						not_auth : "/settings/bind/weibo"
					},
					qzone : {
						not_auth : "/settings/bind/qzone"
					}
				}, d = {
					weibo : "sina",
					qzone : "qzone"
				}, e = c(".share_published");
				e.children("span").each(function() {
					var a = c(this), b = a.attr("s_type"), d = a.attr("s_name");
					b = b == "undefined" ? 0 : parseInt(b), typeof fml.vars[d] != "undefined"
							&& (b = fml.vars[d]), f(b, a, d), a.unbind("click")
							.click(function() {
								b = parseInt(c(this).attr("s_type")), g(b, a, d)
							})
				})
			};
			return function() {
				var a = j.get("magazineName"), b = j.get("magazineId");
				if (c(".forwardMagazin").size() == 0) {
					var h = d("shareGoodsUploadPanelTpl");
					c(".add_share_goods").append(h), o();
					var k = c("#createPanel").show();
					c(".selectList").html(l), f.createSelect(".selectList",
							function(d) {
								d.find(".options ul").after(k), d
										.find(".options ul")
										.children("[role=1]:last")
										.addClass("border_bc"), e
										.inputFocus("#createMagaValue"), e
										.inputFocus("#forwardContent"), a
										&& (c(".selectText").text(a), c(".selectText")
												.attr("val", b), c(".selectList")
												.val(a), c(".selectList").attr(
												"id", b))
							})
				}
				l == ""
						&& c.post(Meilishuo.config.server_url
										+ "group/ajax_getUserGroups", {},
								function(d) {
									for (var g = 0, h = d.length; g < h; g++) {
										var i = d[g];
										l += '<option role="' + i.role
												+ '" id="' + i.group_id
												+ '" value="'
												+ n.escapeString(i.name)
												+ '" >'
												+ n.escapeString(i.name)
												+ "</option>";
										if (a && n.escapeString(a) == i.name)
											var m = !0
									}
									c(".selectList").html(l), c(".selectText")
											.text("读取中..."), f.createSelect(
											".selectList", function(d) {
												d.find(".options ul").after(k), d
														.find(".options ul")
														.children("[role=1]:last")
														.addClass("border_bc"), e
														.inputFocus("#createMagaValue"), e
														.inputFocus("#forwardContent"), j
														.set(
																"magazineName",
																c(".selectText")
																		.text()), j
														.set(
																"magazineId",
																c(".selectText")
																		.attr("val")), a
														&& m
														&& (c(".selectText")
																.text(a), c(".selectText")
																.attr("val", b), c(".selectList")
																.val(a), c(".selectList")
																.attr("id", b))
											})
								}, "json"), c("#forwardContent")[0].focus(), c(".forwardMagazin")
						.on("click", ".options ul li", function() {
							j.set("magazineName", c(this).text()), j.set(
									"magazineId", c(this).attr("id"))
						}), c(".createMaga").live("click", function() {
					var a = c(this).parent().find("#ForwardMsg"), b = c(this)
							.parent().find("#createMagaValue").val();
					a.hide();
					if (b == "" || b == "创建一个杂志")
						return a.show().html("杂志名称不能为空哦!"), !1;
					var d = /[\$|&|#|\|"| |]/.test(b);
					if (d)
						return a.show().html("杂志名称含有非法字符!"), !1;
					a.show().html("正在创建...");
					var e = c(this), f = Meilishuo.config.server_url
							+ "group/ajax_creategroup", g = {
						name : b
					}, h = function(d) {
						if (d == 0)
							a.show().html("哎呀，这个名称已经有人使用了，请换个名称吧!");
						else if (d == 2)
							a.show().html("您输入的字符不对哦~请换个名称吧!");
						else if (!m(d)) {
							var f = e.parent().prev().children(":first"), g = c('<li class="l22 f14n p5" role="1" value="'
									+ n.escapeString(b)
									+ '" id="'
									+ d
									+ '">'
									+ n.escapeString(b) + "</li>");
							f.after(g);
							var h = e.parent().parent().parent().next(), j = '<option value="'
									+ n.escapeString(b)
									+ '" id="'
									+ d
									+ '" >'
									+ n.escapeString(b) + "</option>";
							h.prepend(j), c("#createMagaValue").val("创建一个杂志"), g
									.trigger("click"), l = "", a.hide()
						}
						i = !0
					};
					i && (c.post(f, g, h, "json"), i = !1)
				}), g.showSmile(".forwardMagazin", ".share_smileys", "share")
			}
		});
fml.define("component/regString", ["jquery"], function(b, c) {
	var d = b("jquery"), e = null, f = function(a, b) {
		var c = 0, d = 0;
		for (var e = a.length; d < e;) {
			var f = "";
			f = a.charAt(d), /[^\x00-\xff]/.test(f) ? c += 2 : c += 1, d++;
			if (c >= b * 2)
				break
		}
		return d
	};
	return {
		isUrl : function(a) {
			this.trim(a);
			var b = "((^http)|(^https)|(^ftp))://[-\\w]+\\.(\\w)+", c = new RegExp(b);
			return c.test(a) ? !0 : !1
		},
		trim : function(a) {
			return a.trim ? a.trim() : a.replace(/^\s+/, "")
					.replace(/\s+$/, "")
		},
		GetStringLength : function(a) {
			var b = 0;
			for (var c = 0; c < a.length; c++) {
				var d = a.charCodeAt(c);
				d >= 1 && d <= 126 || 65376 <= d && d <= 65439
						? b += .5
						: b += 1
			}
			return b
		},
		getStringLength : function(a) {
			return a.replace(/[^\x00-\xff]/g, "**").length / 2
		},
		WidthCheck : function(a, b) {
			return this.GetStringLength(a) > b ? !1 : !0
		},
		cutstrX : function(a, b, c) {
			return !a || 0 == a.length
					? ""
					: (undefined == c && (c = "..."), b = f(a, b), a.substr(0,
							b)
							+ (c && a.length > b ? c : ""))
		},
		cutstr : function(b, c, d) {
			var e = 0, f = 0;
			str_cut = "", f = b.length, undefined == d && (d = "...");
			for (var g = 0; g < f; g++) {
				a = b.charAt(g), e++, escape(a).length > 4 && e++, str_cut += a;
				if (e > c)
					return str_cut += d, str_cut
			}
			if (e <= c)
				return b
		},
		escapeString : function(a) {
			return !a || a == "" ? "" : a.replace(/</g, "&lt;").replace(/>/g,
					"&gt;")
		}
	}
});
fml.define("app/dialogSuccess", ["jquery", "app/closeFrame",
				"component/regString", "component/shareTmp", "ui/dialog",
				"app/closeWindow"], function(a, b) {
			var c = a("jquery"), d = a("component/shareTmp"), e = a("ui/dialog"), f = a("app/closeFrame"), g = a("app/closeWindow"), h = a("component/regString"), i = function(
					a, b, i, j) {
				var k = {};
				k.magaName = h.cutstr(h.escapeString(a), 20), k.magaId = b, k.magaTitle = i;
				var l = j == "分享按钮" ? d("shareMagaSucTpl") : d("magaSucTpl", k), m = j == "分享按钮"
						? 520
						: 370;
				j == "分享按钮" && (i = "提示");
				var n = new e({
							title : i,
							content : c(l),
							width : m,
							onStart : function() {
								c(".smileysbox").hide()
							},
							onClose : function() {
								j && (j == "分享按钮" ? g() : f())
							}
						});
				j == "分享按钮"
						&& (n.drive.overlay.destroy(), c("#dialogLayer").css({
									top : "60px",
									"margin-left" : "auto",
									"margin-right" : "auto",
									position : "static"
								}).find("#closeDialog").hide()), window
						.setTimeout(function() {
									n.drive.destroyModel()
								}, 2e3)
			};
			b.shareSuccess = i
		});
fml.define("component/iframeShim", ["jquery"], function(a, b) {
	function d(a) {
		this.target = c(a).length == 0 ? c(document.getElementById(a)) : c(a)
				.eq(0), this.iframe = e(), this.iframe.appendTo(document.body)
	}
	function e() {
		return c("<iframe>", {
					frameborder : 0,
					src : "javascript:void(0)",
					"class" : "iframeShim",
					css : {
						display : "none",
						border : "none",
						opacity : 0,
						position : "absolute"
					}
				})
	}
	var c = a("jquery");
	d.prototype.sync = function() {
		var a = this.target, b = this.iframe, c = a.outerHeight(), d = a
				.outerWidth(), e = a.offset().top, f = a.offset().left, g = parseInt(a
				.css("zIndex"))
				- 1 || 0;
		!c || !d || a.is(":hidden") ? b.hide() : (b.css({
					width : d,
					height : c,
					zIndex : g,
					top : e,
					left : f
				}), b.show())
	}, d.prototype.destroy = function() {
		this.iframe
				&& (c(".iframeShim").remove(), delete this.iframe, delete this.target)
	};
	if (c.browser.msie && c.browser.version == 6)
		return d;
	function f() {
	}
	return f.prototype.sync = f, f.prototype.destroy = f, f
});
fml.define("component/window", ["jquery", "component/position",
				"component/windowScroll"], function(a, b) {
			function g(a) {
				var b = {
					width : 520,
					height : "auto",
					windowId : "dialogLayer",
					titleId : "dialogTitle",
					contentId : "dialogContent",
					title : "提示",
					content : "",
					hasTitle : !0
				};
				this.opts = c.extend({}, b, a)
			}
			function h() {
				return c("<div>", {
							id : this.opts.windowId,
							"class" : this.opts.windowId,
							css : {
								width : this.opts.width,
								height : this.opts.height
							}
						})
			}
			function i() {
				return c("<div>", {
							id : this.opts.titleId,
							"class" : this.opts.titleId
						})
						.append('<span class="close_z" id="closeDialog"></span><span id="dialogTitleText">'
								+ this.opts.title + "</span>")
			}
			function j() {
				return c("<div>", {
							id : this.opts.titleId,
							"class" : this.opts.titleId
						})
						.append('<span class="close_z" id="closeDialog"></span>')
			}
			function k() {
				return c("<div>", {
							id : this.opts.contentId,
							"class" : this.opts.contentId
						}).append(this.opts.content)
			}
			var c = a("jquery"), d = a("component/position"), e = a("component/windowScroll"), f = c.browser.msie
					|| c.browser.version == "6.0";
			return g.prototype.sync = function() {
				this.window = h.call(this), this.opts.hasTitle ? this.title = i
						.call(this) : this.title = j.call(this), this.content = k
						.call(this), this.title.appendTo(this.window), this.content
						.appendTo(this.window), c('<div class="clear_f"></div>')
						.appendTo(this.content), this.window
						.appendTo(document.body), this.toCenter()
			}, g.prototype.destroy = function() {
				this.window
						&& (this.window.remove(), this.title.remove(), this.content
								.remove(), delete this.window, delete this.title, delete this.content)
			}, g.prototype.toCenter = function() {
				this.window.css("position") == "fixed" ? d.winCenter(
						this.window, window) : this.opts.isOverflow ? (d
						.docCenter(this.window, window), c(window).bind(
						"scroll", c.proxy(function() {
									d.docCenter(this.window, window)
								}, this))) : d.winCenter(this.window, window)
			}, g.prototype.onClose = function(a) {
				c("." + this.opts.titleId).on("click", "#closeDialog",
						function() {
							a()
						})
			}, g
		});
fml.define("component/overlay", ["jquery", "component/iframeShim"], function(a,
		b) {
	function f(a) {
		a = a || {}, this.id = a.id || "overlay", this.className = a.className
				|| "transmaskLayer", this.transparent = a.transparent || !1, this.isOverflow = a.isOverflow
	}
	function g() {
		$document = c(document);
		var a = $document.height(), b = $document.width();
		return c("<div>", {
					css : {
						width : b,
						height : a
					}
				})
	}
	var c = a("jquery"), d = a("component/iframeShim"), e = c.browser.msie;
	return f.prototype.sync = function() {
		this.overlay = g(), this.overlay.attr("id", this.id), this.overlay
				.get(0).className = this.transparent
				? this.className
				: "maskLayer", this.overlay.appendTo(document.body), this.iframe = new d(this.id), this.iframe
				.sync(), this.isOverflow || this.overflow()
	}, f.prototype.destroy = function() {
		this.iframe.destroy(), this.overlay.remove(), this.isOverflow
				|| (c("body").css("overflow", "auto"), e && c("html").css({
							overflow : "auto",
							"overflow-x" : "hidden"
						}))
	}, f.prototype.overflow = function() {
		c(document.body).css("overflow", "hidden"), e
				&& c("html").css("overflow", "visible"), this.overlay
				.width(this.overlay.width() + 20)
	}, f
});
fml.define("component/windowDrive", ["component/position", "component/overlay",
				"component/window", "jquery"], function(a, b) {
			function g(a) {
				return this.opts = a || {}, this.overlay = new e(this.opts), this.window = new f(this.opts), this
			}
			var c = a("jquery"), d = a("component/position"), e = a("component/overlay"), f = a("component/window");
			return g.prototype.createOverlay = function() {
				this.overlay.sync()
			}, g.prototype.createWindow = function() {
				this.opts.onStart && this.opts.onStart(), this.window.sync(), this.window
						.onClose(c.proxy(function() {
									this.destroyModel()
								}, this)), c(document).bind("keyup",
						c.proxy(function(a) {
									a.keyCode == 27 && this.destroyModel()
								}, this))
			}, g.prototype.destroyModel = function() {
				this.opts.onClose && this.opts.onClose(), this.overlay
						.destroy(), this.window.destroy()
			}, g
		});
fml.define("core/sjt", [], function(a, b) {
			var c = {};
			return function d(a, b) {
				var e = /\W/.test(a)
						? new Function("obj",
								"var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"
										+ a.replace(/[\r\t\n]/g, " ")
												.split("<?").join("	").replace(
														/((^|\?>)[^\t]*)'/g,
														"$1\r").replace(
														/\t=(.*?)\?>/g,
														"',$1,'").split("	")
												.join("');").split("?>")
												.join("p.push('").split("\r")
												.join("\\'")
										+ "');}return p.join('');")
						: c[a] = c[a]
								|| d(document.getElementById(a).innerHTML);
				return b ? e(b) : e
			}
		});
fml.define("app/tracking", ["jquery", "component/iStorage"], function(a, b) {
	function j(a) {
		var b = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ", c = "", d = a;
		while (d--)
			c += b.substr(Math.floor(Math.random() * 62), 1);
		return c
	}
	function k() {
		return g = j(10) + "-"
				+ ((new Date).getTime() - (new Date(2012, 6, 1)).getTime()), m(), g
	}
	function l(a) {
		var b = [];
		for (var c in a)
			b.push(c + "=" + encodeURIComponent(a[c]));
		return b.join("&")
	}
	function m() {
		q("device", {
					refer : document.referrer,
					userid : Meilishuo.config.user_id,
					w_w : window.screen.width,
					w_h : window.screen.height
				})
	}
	function n(a) {
		var b = window.onbeforeunload;
		window.onbeforeunload = function(c) {
			a(), b && b()
		}
	}
	function o() {
	}
	function p() {
		var a = document.documentElement || document.body, b = window.name;
		b || (b = window.name = j(6)), q("pv/in", {
					refer : document.referrer,
					url : window.location.href,
					win : b,
					userid : Meilishuo.config.user_id,
					b_w : a.clientWidth,
					b_h : a.clientHeight
				}), n(function() {
					q("pv/out", {
								pgout : (new Date).getTime()
							})
				})
	}
	function q(a, b) {
		if (!g) {
			if (f--)
				return window.setTimeout(function() {
							q(a, b)
						}, 25);
			g = "unknown"
		}
		a = a ? a + "/" : "", a += "?";
		var c = 2e3, d = 0, j, k;
		for (var m in b) {
			var n = b[m];
			if (!n)
				continue;
			"function" == typeof n ? n = n() : "object" == typeof n && n.length
					? n = n.join("+")
					: n = encodeURIComponent(n), b[m] = n, d++
		}
		i++;
		while (d >= 0) {
			k = l({
						device_id : g,
						pgid : h,
						seqid : i
					});
			for (var m in b) {
				var o = b[m];
				j = c - k.length;
				if (j <= 0)
					break;
				if (m.length + o.length > j) {
					var p = o.substr(0, j), r = p.lastIndexOf("+");
					r > -1
							? (b[m] = o.substr(r + 1), o = o.substr(0, r))
							: (b[m] = o.substr(j), o = p)
				} else
					delete b[m], d--;
				k += "&" + m + "=" + o
			}
			d--;
			var s = new Image;
			s.src = e + a + k
		}
	}
	var c = a("jquery"), d = a("component/iStorage"), e = "http://log.meilishuo.com/", f = 100, g, h = (new Date)
			.getTime(), i = 0;
	d.get("device", function(a) {
				"undefined" == a && (a = null), g = a || d.set("device", k())
			}), b.logIt = function(a, b) {
		q(a, b || {})
	}, b.cr = function(a, b) {
		q("cr/" + a, b || {})
	}, b.logClick = function() {
		function b() {
			q("click", {
						click : a
					}), a = []
		}
		var a = [];
		return c(document).click(function(c) {
			c = c || window.event, a.push(c.pageX + "," + c.pageY + ","
					+ (c.target.getAttribute("frm") || "")), a.length > 5
					&& b()
		}), n(b), this
	}, b.logPoster = function() {
		function a(a) {
			if (!a || !a.tInfo)
				return;
			var b = [];
			try {
				for (var c = 0, d = a.tInfo.length; c < d; c++)
					b.push(a.tInfo[c].twitter_id + ",0,0");
				q("poster", {
							site_userid : Meilishuo.config.user_id,
							site_refer : window.location.pathname,
							site_tid : b
						})
			} catch (e) {
			}
		}
		return fml.eventProxy("logPoster", a), this
	}, p()
});
fml.define("ui/dialog", ["component/windowDrive", "jquery"], function(a, b) {
	function e(a) {
		return this.opts = a || {}, this.drive = new d(this.opts), this.sync(), this
	}
	var c = a("jquery"), d = a("component/windowDrive");
	return e.prototype.sync = function() {
		return this.opts.isDestory
				|| (c("#" + this.drive.overlay.id).remove(), c("#"
						+ this.drive.window.opts.windowId).remove()), this.drive
				.createOverlay(), this.drive.createWindow(), this
	}, e
});