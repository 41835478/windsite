
(function(a) {
	a.xt = a.xt || {
		version : "v1.0.0"
	};
	a.extend(a.xt, {
		util : {
			isIE6 : function() {
				return a.browser.msie && "6.0" == a.browser.version ? !0 : !1
			},
			isIOS : function() {
				return /\((iPhone|iPad|iPod)/i.test(navigator.userAgent)
			},
			trim : function(a) {
				return a.replace(/(^\s*)|(\s*$)/g, "")
			},
			lTrim : function(a) {
				return a.replace(/(^\s*)/g, "")
			},
			rTrim : function(a) {
				return a.replace(/(\s*$)/g, "")
			},
			getStrLength : function(b) {
				var b = a.xt.util.trim(b), c = 0, b = b.replace(
						/[^\x00-\xff]/g, "**").length;
				return c = parseInt(b / 2) == b / 2 ? b / 2 : parseInt(b / 2)
						+ 0.5
			},
			substring4ChAndEn : function(b, c) {
				for (var d = a.xt.util.htmlToTxt(b.substring(0, 2 * c)); a.xt.util
						.getStrLength(d) > c;)
					d = d.substring(0, d.length - 1);
				return d
			},
			htmlToTxt : function(a) {
				return a = a.replace(/\<|\>|\"|\'|\&/g, function(a) {
							switch (a) {
								case "<" :
									return "\uff1c";
								case ">" :
									return "\uff1e";
								case '"' :
									return "\uff3c";
								case "'" :
									return "\uff07";
								case "&" :
									return "\uff06"
							}
						})
			},
			ellipse : function(b, c) {
				var d = 2 * a.xt.util.getStrLength(b) > c;
				return b && d ? b.replace(RegExp("([\\s\\S]{" + c
								+ "})[\\s\\S]*"), "$1\u2026") : b
			},
			isEmpty : function(b) {
				return "" == a.xt.util.trim(b) ? !1 : !0
			},
			isEmail : function(a) {
				return /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
						.test(a)
			},
			isNick : function(a) {
				return /^[a-zA-Z\d\u4e00-\u9fa5_-]*$/.test(a)
			},
			nickMin : function(b) {
				return 4 > 2 * a.xt.util.getStrLength(b) ? !1 : !0
			},
			nickMax : function(b) {
				return 30 < 2 * a.xt.util.getStrLength(b) ? !1 : !0
			},
			tooShort : function(a, c) {
				return a.length < c ? !1 : !0
			},
			noLink : function(a) {
				return null == a
						.match(/(http[s]?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+/)
						? !0
						: !1
			},
			getPosition : function(b) {
				var c = b.offset().top, d = b.offset().left, e = c
						+ b.outerHeight(), f = d + b.outerWidth(), g = d
						+ b.outerWidth() / 2, h = c + b.outerHeight() / 2;
				/iPad/i.test(navigator.userAgent)
						&& (c -= a(window).scrollTop(), e -= a(window)
								.scrollTop(), h -= a(window).scrollTop());
				return {
					leftTop : function() {
						return {
							x : d,
							y : c
						}
					},
					leftMid : function() {
						return {
							x : d,
							y : h
						}
					},
					leftBottom : function() {
						return {
							x : d,
							y : e
						}
					},
					topMid : function() {
						return {
							x : g,
							y : c
						}
					},
					rightTop : function() {
						return {
							x : f,
							y : c
						}
					},
					rightMid : function() {
						return {
							x : f,
							y : h
						}
					},
					rightBottom : function() {
						return {
							x : f,
							y : e
						}
					},
					MidBottom : function() {
						return {
							x : g,
							y : e
						}
					},
					middle : function() {
						return {
							x : g,
							y : h
						}
					}
				}
			},
			getDomain : function(a) {
				var c = "null", a = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
						.exec(a);
				"undefined" != typeof a && null != a && (c = a[0]);
				return c
			},
			validSite : function(b) {
				var c = a.xt.util.getDomain(b);
				if (-1 != b.indexOf("tmall.com")) {
					var d = !0, e;
					e = "detail.tmall.com" == c && -1 != b.indexOf("item.htm?");
					bool4 = "detail.tmall.com" == c
							&& -1 != b.indexOf("spu_detail.htm?");
					switch (d) {
						case e :
							return "tmall3";
						case bool4 :
							return "tmall4";
						default :
							return !1
					}
				} else if (-1 != b.indexOf("taobao.com"))
					switch (d = !0, b = ("item.taobao.com" == c
							|| "item.beta.taobao.com" == c || "item.lp.taobao.com" == c)
							&& -1 != b.indexOf("item.htm?"), d) {
						case b :
							return "taobao";
						default :
							return !1
					}
				else {
					if (-1 != b.indexOf("item.buy.qq.com"))
						return "item.buy.qq.com" == c ? "qqbuy" : !1;
					if (-1 != b.indexOf("vancl.com"))
						switch (b = "item.vancl.com" == c
								&& -1 == b.indexOf("ch_vt"), c = "item.vt.vancl.com" == c, !0) {
							case b :
								return "vancl";
							case c :
								return "vancl";
							default :
								return !1
						}
					else
						return -1 != b.indexOf("item.mbaobao.com")
								? "item.mbaobao.com" == c ? "mbaobao" : !1
								: !1
				}
			},
			openWin : function(a) {
				var c = a.substr(a.lastIndexOf("snsType=") + 8, 1);
				4 == c || 5 == c
						? (c = 820 < document.body.clientWidth
								? (document.body.clientWidth - 820) / 2
								: 0, window
								.open(
										a,
										"connect_window",
										"height=700, width=820, toolbar=no, menubar=no, scrollbars=yes, resizable=no,top=190,left="
												+ c
												+ ", location=no, status=no"))
						: 8 == c
								? (c = (document.body.clientWidth - 580) / 2, window
										.open(
												a,
												"connect_window",
												"height=620, width=580, toolbar=no, menubar=no, scrollbars=yes, resizable=no,top=190,left="
														+ c
														+ ", location=no, status=no"))
								: 9 == c
										? (c = 900 < document.body.clientWidth
												? (document.body.clientWidth - 900)
														/ 2
												: 0, window
												.open(
														a,
														"connect_window",
														"height=550, width=900, toolbar=no, menubar=no, scrollbars=yes, resizable=no,top=190,left="
																+ c
																+ ", location=no, status=no"))
										: (c = (document.body.clientWidth - 580)
												/ 2, window
												.open(
														a,
														"connect_window",
														"height=420, width=580, toolbar=no, menubar=no, scrollbars=yes, resizable=no,top=190,left="
																+ c
																+ ", location=no, status=no"))
			}
		},
		msg : {}
	});
	a.fn.extend({
		returntop : function() {
			if (this[0]) {
				var b = this.click(function() {
							a("html, body").animate({
										scrollTop : 0
									}, 120)
						}), c = null;
				a(window).bind("scroll", function() {
					var d = a(document).scrollTop(), e = a(window).height();
					0 < d ? b.fadeIn() : b.fadeOut();
					a.xt.util.isIE6()
							&& (b.hide(), clearTimeout(c), c = setTimeout(
									function() {
										b.show();
										clearTimeout(c)
									}, 1E3), b.css("top", d + e - 125))
				})
			}
		},
		resizeImage : function(b, c) {
			this.each(function() {
						var d = a(this)[0], e = d.width, f = d.height;
						if (!(e <= b && f <= c))
							if (e <= b && f > c)
								d.width = e * c / f, d.height = c;
							else if (e > b && f <= c)
								d.width = b, d.height = f * b / e;
							else if (d.width = b, d.height = f * b / e, f * b
									/ e > c)
								d.width = e * c / f, d.height = c
					})
		},
		textareaAutoHeight : function() {
			var b = this, c = b.height();
			b.bind("keyup input propertychange focus", function() {
						0 > c && (c = b.height());
						(a.browser.mozilla || a.browser.safari) && b.height(c);
						var d = b[0].scrollHeight, e = d < c ? c : d, e = e < 1.5
								* c ? c : d;
						b.height(e)
					})
		},
		disableBtn : function(a) {
			this[0].disabled = "disabled";
			this.removeClass(a).addClass("disabled")
		},
		enableBtn : function(a) {
			this[0].disabled = "";
			this.removeClass("disabled").addClass(a)
		},
		dropDown : function(b) {
			var c = {
				event : "mouseover",
				classNm : ".dropdown",
				timer : null,
				fadeSpeed : 100,
				duration : 500,
				offsetX : 82,
				offsetY : 8,
				isLocation : !1
			};
			b && a.extend(c, b);
			var d = a(c.classNm);
			this.each(function() {
						$this = a(this);
						$this.hover(function() {
									clearTimeout(c.timer);
									if (c.isLocation) {
										var b = a.xt.util.getPosition($this)
												.rightBottom();
										d.css({
													left : b.x - c.offsetX
															+ "px",
													top : b.y + c.offsetY
															+ "px"
												})
									}
									d.fadeIn(c.fadeSpeed)
								}, function() {
									c.timer = setTimeout(function() {
												d.fadeOut(c.fadeSpeed)
											}, c.duration)
								});
						d.hover(function() {
									clearTimeout(c.timer);
									d.show()
								}, function() {
									c.timer = setTimeout(function() {
												d.fadeOut(c.fadeSpeed)
											}, c.duration)
								})
					})
		}
	})
})(jQuery);
(function(a) {
	a.xt.judgement = {
		identityCallback : function() {
		},
		repeatIdentityClk : function() {
		},
		identityOper : function(b, c, d) {
			a.ajax({
				url : XTER.path
						+ ("0" == d ? "/goods/favor" : "/goods/identity"),
				type : "post",
				dataType : "json",
				data : {
					goodId : c,
					identify : "1" == d ? "1" : "0"
				},
				success : function(c) {
					switch (c.code) {
						case 100 :
							a.xt.judgement.identityCallback(b, d);
							break;
						case 101 :
							a.xt.tip.conf.tipClass = "xt-tipmodal xt-tipmodal-error";
							a.xt.tip.show(b, c.msg);
							break;
						case 103 :
							a.xt.judgement.repeatIdentityClk(b, c.desirable)
					}
				}
			})
		},
		cmtSubmitOkClk : function() {
		},
		cmtSubmitErrorClk : function() {
		},
		cmtSubmit : function(b, c, d) {
			var e = a.xt.util.trim(d.find("textarea[name='commentContent']")
					.val()), f = d.find("input[name='commentType']").val();
			c.find(".error-row");
			$this = d;
			"" != e ? 256 > a.xt.util.getStrLength(e) ? a.ajax({
				url : XTER.path + "/goods/comment",
				type : "post",
				dataType : "json",
				data : {
					goodId : b,
					commentContent : e,
					commentType : f
				},
				success : function(b) {
					switch (b.code) {
						case 100 :
							a.xt.tip.conf.tipClass = "xt-tipmodal xt-tipmodal-ok";
							a.xt.tip
									.show($this,
											"\u8bc4\u8bba\u53d1\u8868\u6210\u529f\uff01");
							a.xt.judgement.cmtSubmitOkClk();
							break;
						case 101 :
							a.xt.tip.conf.tipClass = "xt-tipmodal xt-tipmodal-error", a.xt.tip
									.show($this, b.msg), a.xt.judgement
									.cmtSubmitErrorClk()
					}
				}
			})
					: (a.xt.tip.conf.tipClass = "xt-tipmodal xt-tipmodal-general", a.xt.tip
							.show(
									$this,
									">_< \u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc7256\u4e2a\u6c49\u5b57\uff01"))
					: (a.xt.tip.conf.tipClass = "xt-tipmodal xt-tipmodal-general", a.xt.tip
							.show($this,
									">_< \u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\uff01"))
		},
		commentAndAddTagsSubmitOkClk : function() {
		},
		commentAndAddTagsSubmitErrorClk : function() {
		},
		commentAndAddTagsSubmit : function(b, c) {
			$this = c;
			a.ajax({
				url : XTER.path + "/goods/commentMore",
				type : "post",
				dataType : "json",
				data : b,
				success : function(b) {
					switch (b.code) {
						case 100 :
							a.xt.tip.conf.tipClass = "xt-tipmodal xt-tipmodal-ok";
							a.xt.tip
									.show($this,
											"\u8bc4\u8bba\u53d1\u8868\u6210\u529f\uff01");
							a.xt.judgement.commentAndAddTagsSubmitOkClk();
							break;
						case 101 :
							a.xt.tip.conf.tipClass = "xt-tipmodal xt-tipmodal-error", a.xt.tip
									.show($this, b.msg), a.xt.judgement
									.commentAndAddTagsSubmitErrorClk()
					}
				}
			})
		}
	};
	a.xt.dialog = {
		isLogin : function() {
			return "" == XTER.userId ? (a.xt.dialog.login(), !1) : !0
		},
		login : function() {
			if (a("#loginDialog")[0])
				a("#loginDialog").data("overlay").load();
			else {
				var b;
				b = '<div id="loginDialog" class="g-dialog"><div class="dialog-content"><div class="hd"><h3>\u767b\u5f55</h3></div><div class="bd clearfix"><div class="bd-l">'
						+ ('<form id="J_LoginDForm" action="' + XTER.path + '/emailLogin" method="POST">');
				b = b
						+ '<div class="error-row"><p class="error"></p></div><div class="form-row"><label>Email\uff1a</label><input type="text" class="base-input" name="email" id="email" value="" placeholder="" /></div><div class="form-row"><label>\u5bc6\u7801\uff1a</label><input type="password" class="base-input" name="password" id="password" value="" /></div><div class="form-row"><label>&nbsp;</label><input type="checkbox" class="check" name="remember" value="1" checked="checked" /><span>\u4e24\u5468\u5185\u81ea\u52a8\u767b\u5f55</span></div><div class="form-row act-row clearfix"><label>&nbsp;</label><input type="submit" class="bbl-btn login-submit" value="\u767b\u5f55" />'
						+ ('<a class="ml10 l30" href="' + XTER.path + '/resetpwd">\u5fd8\u8bb0\u5bc6\u7801\uff1f</a></div>');
				b = b
						+ '</form></div><div class="bd-r"><p>\u4f60\u4e5f\u53ef\u4ee5\u4f7f\u7528\u8fd9\u4e9b\u5e10\u53f7\u767b\u5f55</p><div class="snslogin mt15 clearfix"><ul class="fl mr20 outlogin-b">'
						+ ('<li><a class="l-tao" href="' + XTER.path + '/snsLogin?snsType=8&backType=1">\u6dd8\u5b9d\u5e10\u53f7\u767b\u5f55</a></li>');
				b += '<li><a class="l-sina" href="'
						+ XTER.path
						+ '/snsLogin?snsType=3&backType=1">\u65b0\u6d6a\u5fae\u535a\u767b\u5f55</a></li>';
				b += '<li><a class="l-qq" href="'
						+ XTER.path
						+ '/snsLogin?snsType=4&backType=1">QQ\u5e10\u53f7\u767b\u5f55</a></li>';
				b = b
						+ '</ul><ul class="fl outlogin-s share-link">'
						+ ('<li><a class="s-alipay" href="' + XTER.path + '/snsLogin?snsType=9&backType=1">\u652f\u4ed8\u5b9d</a></li>');
				b += '<li><a class="s-tencent" href="'
						+ XTER.path
						+ '/snsLogin?snsType=5&backType=1">\u817e\u8baf\u5fae\u535a</a></li>';
				b += '<li><a class="s-douban" href="'
						+ XTER.path
						+ '/snsLogin?snsType=6&backType=1">\u8c46\u74e3</a></li>';
				b += '<li><a class="s-renren" href="'
						+ XTER.path
						+ '/snsLogin?snsType=7&backType=1">\u4eba\u4eba\u7f51</a></li>';
				a("body")
						.append(b
								+ '</ul></div></div></div><a class="close" href="javascript:;"></a></div></div>');
				a("#loginDialog").overlay({
							top : "center",
							mask : {
								color : "#000",
								loadSpeed : 200,
								opacity : 0.3
							},
							closeOnClick : !1,
							load : !0
						});
				a("#J_LoginDForm").submit(function() {
					$this = a(this);
					a.post($this.attr("action"), $this.serializeArray(),
							function(b) {
								100 == b.code
										? (a("#loginDialog").overlay().close(), window.location
												.reload())
										: 101 == b.code
												&& (a("#loginDialog")
														.find(".error-row")
														.fadeIn(), a("#loginDialog")
														.find(".error")
														.html(b.message), a("#loginDialog input[name=password]")
														.val(""))
							});
					return !1
				});
				a(".snslogin a").unbind("click").click(function() {
							var b = a(this).attr("href");
							a.xt.util.openWin(b);
							return !1
						});
				a("#loginDialog").overlay().getClosers().bind("click",
						function() {
							a("#J_LoginDForm")[0].reset();
							a("#loginDialog").find(".error-row").hide()
						})
			}
		},
		reg : function() {
			if (a("#setDialog")[0])
				a("#setDialog").data("overlay").load();
			else {
				var b;
				a("body")
						.append('<div id="setDialog" class="g-dialog"><div class="hd"><h3>\u6b22\u8fce</h3><a class="close" href="javascript:;">X</a></div><div class="bd"><div class="set-box"><div class="title-info clearfix"><div class="face"><img src="../img/face.jpg" width="50" height="50" alt="" /></div><div class="info"><span class="name">Hi\uff0c\u6b22\u8fce\u6765\u5230\u901b.com~</span><p>\u5feb\u901f\u8bbe\u7f6e\u4e00\u4e2a\u90ae\u7bb1\u5e10\u53f7\uff0c\u65b9\u4fbf\u4ee5\u540e\u76f4\u63a5\u767b\u5f55\u548c\u627e\u56de\u5bc6\u7801</p></div></div><form class="set-form" action=""><div class="form-row"><label>\u6635\u79f0\uff1a</label><input type="text" class="base-input" name="nick" id="nick" value="" /></div><div class="form-row"><label>\u90ae\u7bb1\uff1a</label><input type="text" class="base-input" name="email" id="email" value="" placeholder="\u7528\u4e8e\u767b\u5f55\u548c\u627e\u56de\u5bc6\u7801" /></div><div class="form-row"><label>&nbsp;</label><input type="submit" class="bbl-btn reg-submit" value="\u5b8c\u6210" /></div><div class="form-row"><label>&nbsp;</label><input type="checkbox" class="check" name="remember" value="1" checked="checked" /><span>\u6211\u5df2\u9605\u8bfb\u5e76\u540c\u610f<a href="#">\u300a\u4f7f\u7528\u534f\u8bae\u300b</a></span></div></form></div></div></div>');
				a("#setDialog").overlay({
							top : "center",
							mask : {
								color : "#000",
								loadSpeed : 200,
								opacity : 0.3
							},
							closeOnClick : !1,
							load : !0
						})
			}
		},
		lkCommentSubmitOkClk : function() {
		},
		lkComment : function(b) {
			var c = a("#J_HiddenProductId").val();
			if (a("#cmtDialog")[0])
				a("#cmtDialog").find("textarea").val(""), a("#cmtDialog")
						.fadeIn();
			else {
				var d;
				a("body")
						.append('<div id="cmtDialog" class="c-dialog"><p class="title clearfix"><a class="cmtclose fr" href="javascript:;">x</a>\u559c\u6b22\u4e86~</p><div id="cmt-form"><div class="error-row error-like"><p class="error"></p></div><div><textarea class="cmt-txa" name="commentContent" placeholder="\u8bf4\u8bf4\u559c\u6b22\u7684\u7406\u7531\u5427~"></textarea><input type="hidden" name="commentType" value="0"/></div><div class="cmt-act tar"><input type="submit" id="J_LkCommentSubmit" class="pub" value="\u53d1\u5e03"/></div></div>');
				a(".cmt-txa").focus(function() {
							var b = a("#cmtDialog").offset().top;
							a("#cmtDialog").css({
										top : b - 50 + "px",
										height : 104
									});
							a(this).height(50);
							a(".cmt-txa").unbind("focus")
						})
			}
			d = a.xt.util.getPosition(b).topMid();
			var e = a("#cmtDialog").outerWidth(), f = a("#cmtDialog")
					.outerHeight();
			a("#cmtDialog").css({
						left : d.x - e / 2 + "px",
						top : d.y - f - 12 + "px"
					}).fadeIn();
			var g = "true";
			a("#J_LkCommentSubmit").unbind("click").click(function(d) {
				d.preventDefault();
				if ("false" == g)
					return !1;
				g = "false";
				a("#J_HiddenProductId")[0] || (c = b.attr("data-proid"));
				a.xt.judgement.cmtSubmitOkClk = function() {
					a("#cmtDialog").fadeOut();
					a.xt.dialog.lkCommentSubmitOkClk(a.xt.util
							.trim(a("#cmtDialog")
									.find("textarea[name='commentContent']")
									.val()))
				};
				a.xt.judgement.cmtSubmit(c, a("#cmtDialog"), a("#cmt-form"),
						"like");
				g = "true"
			});
			a(".cmtclose").unbind("click").click(function() {
						a("#cmtDialog").fadeOut()
					})
		},
		commentSubmitOkClk : function() {
		},
		comment : function(b) {
			var c = b.attr("data-type"), d = a("#J_HiddenProductId").val();
			if (a("#commentDialog")[0])
				a("#commentDialog").data("overlay").load(), a("#commentDialog")
						.find("textarea").text("");
			else {
				a("body")
						.append('<div id="commentDialog" class="g-dialog"><div class="dialog-content"><div class="hd"><h3>\u6dfb\u52a0\u8bc4\u8bba</h3></div><div class="bd clearfix"><div id="comment-form"><div class="error-row error-worth"><p class="error worth-error"></p></div><div class="form-row">'
								+ ('<textarea class="b-textarea cmt-txa" name="commentContent" placeholder="\u8bf4\u8bf4\u4f60\u7684\u7406\u7531\u5427~"></textarea><input type="hidden" name="commentType" value="'
										+ c + '"/></div>')
								+ '<div class="clearfix"><input type="submit" class="bbl-btn pub" id="J_WorthCommentSubmit" value="\u53d1\u5e03"/></div></div></div><a class="close" href="javascript:;"></a></div></div>');
				a("#commentDialog").overlay({
							top : "center",
							mask : {
								color : "#000",
								loadSpeed : 200,
								opacity : 0.3
							},
							closeOnClick : !1,
							load : !0
						});
				var e = "true";
				a("#J_WorthCommentSubmit").click(function() {
					if ("false" == e)
						return !1;
					e = "false";
					a("#J_HiddenProductId")[0] || (d = b.attr("data-proid"));
					a.xt.judgement.cmtSubmitOkClk = function() {
						a("#commentDialog").overlay().close();
						a.xt.dialog
								.commentSubmitOkClk(a.xt.util
										.trim(a("#commentDialog")
												.find("textarea[name='commentContent']")
												.val()))
					};
					a.xt.judgement.cmtSubmit(d, a("#commentDialog"),
							a("#comment-form"), "worth");
					e = "true"
				})
			}
		},
		commentAndAddTagsSubmitOkClk : function() {
		},
		commentAndAddTags : function(b, c, d, e, f, g, h, j) {
			var p = function(c, d, j) {
				var h = {}, p = {
					identify : "",
					bought : ""
				}, q = "\u8bc4\u8bba", m = "\u6211\u89c9\u5f97\u8fd9\u4e2a\u5b9d\u8d1d\uff1a", d = "1" == d
						? ""
						: '<input type="checkbox" id="J_Bought" name="bought"/>', k = '<a href="javascript:void(0);" class="radioclick worth-radioclick-off mr10" name="worth" data-type="1"><span>\u503c\u5f97</span></a><a href="javascript:void(0);" class="radioclick worth-radioclick-off mr10" name="worth" data-type="0"><span>\u4e0d\u503c\u5f97</span></a>', u = "\u8bf4\u8bf4\u4f60\u7684\u7406\u7531\u5427~";
				jQuery.trim(c).length
						&& (m = "\u6211\u8ba4\u4e3a\u5b83\uff1a", k = "1" == c
								? '<span class="ml10 mr10 fl worth" style="color:#090">\u503c\u5f97</span>'
								: '<span class="ml10 mr10 fl worth" style="color:#F60">\u4e0d\u503c\u5f97</span>');
				0 == b.data("type")
						? (q = "\u559c\u6b22\u4e86\uff5e", h.like = 1, u = "\u8bf4\u8bf4\u559c\u6b22\u7684\u7406\u7531\u5457\uff5e")
						: 1 == b.data("type") || 2 == b.data("type")
								? (q = "\u9274\u5b9a", k = 1 == b.data("type")
										? '<span class="ml10 mr10 fl worth" style="color:#090">\u503c\u5f97</span>'
										: '<span class="ml10 mr10 fl worth" style="color:#F60">\u4e0d\u503c\u5f97</span>', h.identify = 1 == b
										.data("type") ? 1 : 0)
								: 3 == b.data("type")
										&& (q = "\u8bc4\u8bba", u = "");
				c = "";
				if (j[0])
					for (var v = 0; v < j.length; v++)
						c += "<li>" + j[v] + "</li>";
				j = '<div id="commentDialog" class="g-dialog" style="z-index: 9999; top: 363.5px; left: 643px; position: fixed; display: block; "><div class="dialog-content"><div class="hd"><h3>'
						+ q
						+ '</h3></div><div class="bd clearfix"><div id="comment-form"><div class="error-row error-worth"><p class="error worth-error"></p></div><div class="commentText-row"><div class="commentText-hd clearfix"><h4 class="fl">'
						+ m
						+ "</h4>"
						+ k
						+ '<span class="bought fl">'
						+ d
						+ '<label for="J_Bought">\u6211\u4e70\u8fc7</label></span></div><div class="commentText-bd"><textarea class="b-textarea cmt-txa" name="commentContent" id="J_CommentContent" placeholder="'
						+ u
						+ '"></textarea></div></div><div class="commentTags-row"><h4>\u5b9d\u8d1d\u6807\u7b7e<span>\uff08\u591a\u4e2a\u6807\u7b7e\u7528\u4e2d\u6587\u6216\u82f1\u6587\u9017\u53f7\u9694\u5f00\uff09</span>\uff1a</h4><input class="b-input" type="input" name="commentTags" id="J_CommentTags"/></div><div class="usedTags-row"><h4>\u5e38\u7528\u6807\u7b7e\uff1a</h4><ul class="clearfix">'
						+ c
						+ '</ul></div><div class="clearfix pt10"><input type="submit" class="bbl-btn pub" id="J_WorthCommentSubmit" value="\u786e\u5b9a"><div class="share-comment"><span class="gc">\u540c\u6b65\u5206\u4eab\uff1a</span><ul id="J_UserSns"></ul><span><a href="'
						+ XTER.path
						+ '/account/sns" target="_blank">\u8bbe\u7f6e</a></span></div></div></div></div><a class="close" href="javascript:;"></a></div></div>';
				a("body").append(j);
				a("#commentDialog").overlay({
							top : "center",
							mask : {
								color : "#000",
								loadSpeed : 200,
								opacity : 0.3
							},
							closeOnClick : !0,
							load : !0,
							onClose : function() {
								a("#commentDialog,#exposeMask").remove()
							}
						});
				var w = {
					type_3 : '<li class="share-switch ss-sina-btnclick-on btnclick" data-status="on" data-snsid="3" data-webname="ss-sina"></li>',
					type_5 : '<li class="share-switch ss-tencent-btnclick-on btnclick" data-status="on" data-snsid="5" data-webname="ss-tencent"></li>'
				}, x = a("#J_UserSns");
				a.ajax({
					url : XTER.path + "/account/getUserSns.html",
					type : "post",
					dataType : "json",
					success : function(b) {
						if (100 == b.code) {
							for (var c = "", b = b.userSns, d = 0; d < b.length; d++)
								w["type_" + b[d]] && (c += w["type_" + b[d]]);
							x.append(c);
							a(".btnclick").bind("click", function() {
								var b = a(this), c = b.attr("data-webname")
										+ "-btnclick-on", d = b
										.attr("data-webname")
										+ "-btnclick-off";
								"on" == b.data("status") ? b.removeClass(c)
										.addClass(d).data("status", "off") : b
										.removeClass(d).addClass(c).data(
												"status", "on")
							})
						}
					}
				});
				a(".usedTags-row li").click(function() {
					var b = a("#J_CommentTags").val().replace(/^[\uff0c\,]+/,
							"").replace(/[\uff0c\,]+$/, ""), c = "," + b + ",", d = a(this);
					if (d.hasClass("selected")) {
						b = "," + d.text() + ",";
						for (c = c.replace(b, ","); 0 <= c.indexOf(b);)
							c = c.replace(b, ",");
						c = c.replace(/^[\uff0c\,]+/, "").replace(
								/[\uff0c\,]+$/, "");
						a("#J_CommentTags").val(c);
						d.removeClass("selected")
					} else
						c = b.length ? b + "," + d.text() : d.text(), 64 >= a.xt.util
								.getStrLength(a.xt.util.htmlToTxt(c))
								? (a("#J_CommentTags").val(c), d
										.addClass("selected"))
								: (a.xt.tip.conf.tipClass = "tipmodal tipmodal-general", a.xt.tip
										.show(
												d,
												">_< \u6807\u7b7e\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc764\u4e2a\u6c49\u5b57\uff01"))
				});
				a("#J_CommentTags").keyup(function() {
					if (64 >= a.xt.util.getStrLength(a.xt.util
							.htmlToTxt(this.value))) {
						var b = a(this);
						this.value = this.value.replace(/\uff0c/g, ",");
						var c = this.value.replace(/^[\uff0c\,]+/, "").replace(
								/[\uff0c\,]+$/, "");
						a(".usedTags-row li").each(function() {
							0 <= ("," + c + ",").indexOf("," + b.text() + ",")
									? b.hasClass("selected")
											|| b.addClass("selected")
									: b.hasClass("selected")
											&& b.removeClass("selected")
						})
					} else
						this.value = a.xt.util.substring4ChAndEn(this.value,
								64)
				});
				a("#J_CommentContent").keyup(function() {
					if (1E3 < a.xt.util.getStrLength(a.xt.util
							.htmlToTxt(this.value)))
						this.value = a.xt.util.substring4ChAndEn(this.value,
								1E3)
				});
				a(".radioclick").click(function() {
					var b = a(this), c = b.attr("name") + "-radioclick-on", d = b
							.attr("name")
							+ "-radioclick-off";
					b.hasClass(c) ? b.removeClass(c).addClass(d) : (a("." + c)
							.removeClass(c).addClass(d), b.removeClass(d)
							.addClass(c))
				});
				var t = "true";
				a("#J_WorthCommentSubmit").click(function() {
					var c = a(this);
					if ("false" == t)
						return !1;
					t = "false";
					var d = a("#J_CommentContent").val(), j = a("#J_CommentTags")
							.val();
					if ("" != d) {
						if (1E3 < a.xt.util.getStrLength(d))
							return a.xt.tip.conf.tipClass = "tipmodal tipmodal-general", a.xt.tip
									.show(
											c,
											">_< \u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc71000\u4e2a\u6c49\u5b57\uff01"), t = "true", !1
					} else
						return a.xt.tip.conf.tipClass = "tipmodal tipmodal-general", a.xt.tip
								.show(c,
										">_< \u8bc4\u8bba\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\uff01"), t = "true", !1;
					if (64 < a.xt.util.getStrLength(j))
						return a.xt.tip.conf.tipClass = "tipmodal tipmodal-general", a.xt.tip
								.show(
										c,
										">_< \u6807\u7b7e\u5185\u5bb9\u4e0d\u80fd\u8d85\u8fc764\u4e2a\u6c49\u5b57\uff01"), t = "true", !1;
					if (0 < a("#J_Bought:checked").length)
						h.bought = 1, p.bought = "1";
					if (0 < a(".worth-radioclick-on").length)
						h.identify = parseInt(a(".worth-radioclick-on").eq(0)
										.attr("data-type"), 10), p.identify = a(".worth-radioclick-on")
								.eq(0).attr("data-type");
					c = {
						productId : b.attr("data-proid"),
						commentContent : d,
						tagNames : a("#J_CommentTags").val(),
						snsSiteIds : "",
						productImgUrl : f,
						commentContent4Sns : ""
					};
					a.extend(c, h);
					if (0 < a("#J_UserSns li").length)
						for (j = 0; j < a("#J_UserSns li").length; j++)
							if ("on" == a("#J_UserSns li").eq(j).data("status")) {
								var k = a("#J_UserSns li").eq(j).data("snsid");
								c.snsSiteIds += 0 < c.snsSiteIds.length ? ","
										+ k : k
							}
					j = {
						"0" : "\u559c\u6b22\u8fd9\u4e2a\u5b9d\u8d1d\uff0c",
						1 : "\u8fd9\u5b9d\u8d1d\u503c\uff0c\u63a8\u8350\uff1a",
						2 : "\u8fd9\u5b9d\u8d1d\u4e0d\u503c\uff1a",
						3 : "\u8bc4\u8bba\u4e86\u300a$\u300b:"
					};
					k = 135
							- a.xt.util.getStrLength(j[b.data("type")] + e
									+ g);
					c.commentContent4Sns = a.xt.util.getStrLength(d) > k
							? 0 <= j[b.data("type")].indexOf("$") ? j[b
									.data("type")].replace("$", e)
									+ a.xt.util.substring4ChAndEn(d, k)
									+ "..." + g : j[b.data("type")]
									+ a.xt.util.substring4ChAndEn(d, k)
									+ "..." + e + g
							: 0 <= j[b.data("type")].indexOf("$") ? j[b
									.data("type")].replace("$", e)
									+ d + "\u3002" + g : j[b.data("type")] + d
									+ "\u3002" + e + g;
					a.xt.judgement.commentAndAddTagsSubmitOkClk = function() {
						a("#commentDialog").overlay().close();
						a.xt.dialog.commentAndAddTagsSubmitOkClk(d, p)
					};
					a.xt.judgement.commentAndAddTagsSubmitErrorClk = function() {
						a("#commentDialog").overlay().close()
					};
					a.xt.judgement.commentAndAddTagsSubmit(c, a(this))
				})
			};
			"fromNonDetail" == j ? a.ajax({
				url : XTER.path + "/baobei/getUserIdentifyAndBuyAndTag.html",
				type : "post",
				dataType : "json",
				data : {
					productId : b.attr("data-proid")
				},
				success : function(a) {
					if (100 == a.code) {
						var b = [];
						if (a.tagList[0])
							for (var c = 0; c < a.tagList.length; c++)
								b[b.length] = a.tagList[c].tagKeyword;
						p(a.identify, a.bought, b)
					}
				}
			})
					: p(c, d, h)
		}
	}
})(jQuery);
(function(a) {
	a.xt.goods = {
		conf : {
			distance : 400,
			timeout : null,
			timeoutLength : 2E3,
			timeoutLengthMax : 32E3,
			page : 1,
			container : ".goods-block",
			colArray : [],
			containerW : 960,
			columns : 4,
			columnWidthInner : 210,
			columnMargin : 13,
			columnPadding : 20,
			columnWidthOuter : 243,
			ajaxUrl : XTER.path + "/xihuan/book",
			ajaxData : {
				spage : null,
				bpage : null,
				cateId : null,
				tagId : null,
				userId : null,
				pubTime : null
			},
			isAjaxLoad : "true"
		},
		init : function() {
			var b = a.xt.goods, c = a.xt.goods.conf;
			c.columnWidthOuter = c.columnWidthInner + c.columnMargin
					+ c.columnPadding;
			if (0 == c.colArray.length)
				for (var d = 0; d < c.columns; d++)
					c.colArray[d] = 0;
			d = a(".goods-wall").find(".goods");
			0 < d.length && "true" == c.isAjaxLoad ? b.flowGoods(d) : b
					.ajaxLoad();
			a(window).bind("scroll", b.lazyLoad);
			d.live("mouseover mouseout", function(b) {
				var c = a(this);
				"mouseover" == b.type ? (c.css({
							color : "#666",
							"box-shadow" : "0 1px 5px rgba(35,25,25,0.5)",
							"-moz-box-shadow" : "0 1px 5px rgba(35,25,25,0.5)",
							"-webkit-box-shadow" : "0 1px 5px rgba(35,25,25,0.5)"
						}), c.find(".ilike-m")[0]
						? c.find(".ilike-m").show()
						: c.find(".ilike-del")[0]
								&& c.find(".ilike-del").show())
						: (c.css({
							color : "#999",
							"box-shadow" : "0 1px 3px rgba(34,25,25,0.2)",
							"-moz-box-shadow" : "0 1px 3px rgba(34,25,25,0.2)",
							"-webkit-box-shadow" : "0 1px 3px rgba(34,25,25,0.2)"
						}), c.find(".ilike-m")[0]
								? c.find(".ilike-m").hide()
								: c.find(".ilike-del")[0]
										&& c.find(".ilike-del").hide())
			})
		},
		isLoading : !1,
		lazyLoad : function() {
			var b = a.xt.goods, c = a.xt.goods.conf, d = a(document)
					.height()
					- a(window).scrollTop() - a(window).height();
			if (!b.isLoading && d < c.distance)
				b.isLoading = !0, b.ajaxLoad()
		},
		setTimeout : function() {
			var b = a.xt.goods, c = a.xt.goods.conf;
			c.timeout = setTimeout(function() {
						b.ajaxLoad()
					}, c.timeoutLength)
		},
		resetTimeout : function() {
			var b = a.xt.goods, c = a.xt.goods.conf;
			if (3E3 < c.timeoutLength)
				c.timeoutLength = 3E3, window.clearTimeout(c.timeout), b
						.setTimeout()
		},
		ajaxLoad : function() {
			var b = a.xt.goods, c = a.xt.goods.conf;
			a.xt.goods.conf.ajaxData.spage = c.page;
			a(".goods-loading").show();
			if ("false" == c.isAjaxLoad) {
				var d = a("#J_GoodsShow"), e, f = 20 * (c.page - 1), g = 20
						* c.page, f = d.find(".goods").slice(f, g);
				d.find(".goods").slice(g, goodsPage.sumGoodsNum).each(
						function() {
							a(this)[0].style.display = "none"
						});
				f.each(function() {
					var b = a(this)[0], d = jQuery.inArray(Math.min.apply(Math,
									c.colArray), c.colArray), f = c.colArray[d];
					b.style.top = f + "px";
					b.style.left = d * c.columnWidthOuter + "px";
					b.style.display = "block";
					1 < c.page
							&& (e = a(this).find("img"), e.attr("src", e
											.attr("data-src")));
					c.colArray[d] = f + b.offsetHeight + c.columnMargin
				}).animate({
							opacity : "1"
						}, 500);
				a(".goods-wall")[0].style.height = Math.max.apply(Math,
						c.colArray)
						+ "px";
				c.page += 1;
				b.isLoading = !1;
				if (6 == c.page || 20 > f.length
						|| 20 >= d.find(".goods").length)
					b.fill(), a(".goods-loading").remove(), a(".page-box")
							.show(), a(window).unbind("scroll", b.lazyLoad)
			} else
				a.post(c.ajaxUrl, c.ajaxData, function(d) {
					var e = a("<div>" + d + "</div>").find(".goods"), f = a("<div>"
							+ d + "</div>").find(".J_HiddenSpage:last").val(), g = a("<div>"
							+ d + "</div>").find(".J_HiddenIsEnd:last").val(), d = a("<div>"
							+ d + "</div>").find(".J_HiddenLastPubTime:last")
							.val();
					a.xt.goods.conf.ajaxData.pubTime = d;
					b.flowGoods(e);
					c.page += 1;
					b.isLoading = !1;
					if (6 == c.page || "true" == g || "5" == f)
						b.fill(), a(".goods-loading").remove(), a(".page-box")
								.show(), a(window).unbind("scroll", b.lazyLoad)
				})
		},
		flowGoods : function(b) {
			var c = a.xt.goods, d = a.xt.goods.conf;
			a(".goods-wall").append('<div class="goods-block"></div>');
			b.each(function() {
						var b = a(this)[0], c = jQuery.inArray(Math.min.apply(
										Math, d.colArray), d.colArray), g = d.colArray[c];
						b.style.top = g + "px";
						b.style.left = c * d.columnWidthOuter + "px";
						a(d.container + ":last").append(b);
						d.colArray[c] = g + b.offsetHeight + d.columnMargin
					});
			a(".goods-wall")[0].style.height = Math.max.apply(Math, d.colArray)
					+ "px";
			c.showGoods()
		},
		showGoods : function() {
			var b = a.xt.goods.conf;
			2 < b.page ? a(b.container + ":last").animate({
						opacity : "1"
					}, 500) : a(b.container + ":last").css("opacity", "1")
		},
		fill : function() {
			for (var b = a.xt.goods.conf, c = Math.max.apply(Math,
					b.colArray), d = jQuery.inArray(c, b.colArray), e = 0; e < b.columns; e++)
				e != d
						&& a(b.container + ":last")
								.append('<div class="goods-fill" style="top:'
										+ b.colArray[e] + "px;left:" + e
										* b.columnWidthOuter + "px;height:"
										+ (c - b.colArray[e] - b.columnMargin)
										+ 'px"></div>')
		}
	}
})(jQuery);
(function(a) {
	function b(b, f) {
		var g = this, h = b.find(":input")
				.not(":button, :image, :reset, :submit");
		a.each(c, function() {
					var b = this, c = b[0], e = b[1], o = b[2];
					if (h.filter(a(c))) {
						var l = a(c);
						l.data("vali", 0);
						"info" == o ? l.bind(f.infoEvent, function() {
									d.effects(l, e, o)
								}) : l.bind(f.valiEvent, function() {
									b[3].call(g, l, l.val())
											? "error" == o
													? (l.data("vali", 1), d
															.effects(l, "OK",
																	"correct"))
													: "empty" == o
															&& (l.data("vali",
																	1), "" == l
																	.val()
																	? d
																			.effects(
																					l,
																					"",
																					"empty")
																	: d
																			.effects(
																					l,
																					"OK",
																					"correct"))
											: (l.data("vali", 0), d.effects(l,
													e, o))
								})
					}
				});
		a("input[name=email]")[0]
				&& a("input[name=email]").bind("blur", function() {
					var b = a(this);
					1 == b.data("vali")
							&& 11 != b.data("vali")
							&& (b.data("vali", 0), d.effects(b, "", "ajax"), a
									.ajax({
										type : "post",
										url : XTER.path + "/checkEmailExist",
										dataType : "json",
										data : "email=" + b.val(),
										success : function(a) {
											0 == a.code
													? (b.data("vali", 11), d
															.effects(b, "OK",
																	"correct"))
													: 1 == a.code
															? (b
																	.data(
																			"vali",
																			0), d
																	.effects(
																			b,
																			"\u6b64Email\u5df2\u88ab\u6ce8\u518c",
																			"error"))
															: (b
																	.data(
																			"vali",
																			0), d
																	.effects(
																			b,
																			"\u7cfb\u7edf\u51fa\u9519\u4e86\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u2026",
																			"error"))
										}
									}))
				});
		a("input[name=nickname]")[0]
				&& a("input[name=nickname]").bind("blur", function() {
					var b = a(this);
					if (1 == b.data("vali") && 11 != b.data("vali")) {
						if (b.val() == XTER.nick)
							return !1;
						b.data("vali", 0);
						d.effects(b, "", "ajax");
						a.ajax({
							type : "post",
							url : XTER.path + "/checkEmailExist",
							dataType : "json",
							data : "nickname=" + b.val(),
							success : function(a) {
								0 == a.code
										? (b.data("vali", 11), d.effects(b,
												"OK", "correct"))
										: 2 == a.code
												? (b.data("vali", 0), d
														.effects(
																b,
																"\u6b64\u6635\u79f0\u5df2\u88ab\u6ce8\u518c",
																"error"))
												: (b.data("vali", 0), d
														.effects(
																b,
																"\u7cfb\u7edf\u51fa\u9519\u4e86\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u2026",
																"error"))
							}
						})
					}
				});
		a("input.check")[0] && a("input.check").click(function() {
			!1 == a(this)[0].checked
					? (a("input[type=submit]")[0].disabled = "disabled", a("input[type=submit]")
							.removeClass("bbl-btn").addClass("disabled"))
					: (a("input[type=submit]")[0].disabled = "", a("input[type=submit]")
							.removeClass("disabled").addClass("bbl-btn"))
		});
		b.submit(function() {
					var b = !0;
					h.each(function() {
								0 == a(this).data("vali") && (b = !1)
							});
					b || h.trigger("blur");
					a("input.check")[0] && !1 == a("input.check")[0].checked
							&& (b = !1);
					return b
				})
	}
	a.xt.validator = {
		conf : {
			infoEvent : "focus",
			valiEvent : "blur",
			speed : 100
		},
		message : {},
		fn : function(b, d, g, h) {
			a.isFunction(d) && (h = d, d = "");
			c.push([b, d, g, h])
		},
		effects : function(b, c, d) {
			if (!b.next("span")[0]) {
				b.after('<span class="tip"></span>');
				var h = a.xt.util.getPosition(b).rightTop();
				b.next("span").css({
							left : h.x + 10 + "px",
							top : h.y + "px"
						})
			}
			switch (d) {
				case "info" :
					b.next(".tip").removeClass().addClass("tip").html(c)
							.fadeIn();
					break;
				case "require" :
					b.next(".tip").removeClass().addClass("tip error").html(c)
							.fadeIn();
					b.unbind("focus");
					break;
				case "empty" :
					"" == c ? b.next(".tip").hide() : b.next(".tip")
							.removeClass().addClass("tip error").html(c)
							.fadeIn();
					break;
				case "error" :
					b.next(".tip").removeClass().addClass("tip error").html(c)
							.fadeIn();
					b.unbind("focus");
					break;
				case "ajax" :
					b.next(".tip").removeClass().addClass("tip ajaxvali")
							.html("").fadeIn();
					b.unbind("focus");
					break;
				case "correct" :
					b.next(".tip").removeClass().addClass("tip correct")
							.html("").fadeIn(), b.unbind("focus")
			}
		}
	};
	var c = [], d = a.xt.validator;
	d.fn("input[name=email]",
			"\u8bf7\u8f93\u5165\u4f60\u7684\u5e38\u7528Email", "info");
	d.fn("input[name=email]", "Email\u683c\u5f0f\u4e0d\u6b63\u786e", "error",
			function(b, c) {
				return a.xt.util.isEmail(c)
			});
	d.fn("input[name=email]", "\u8bf7\u586b\u5199Email", "require", function(b,
					c) {
				return a.xt.util.isEmpty(c)
			});
	d
			.fn(
					"input[name=nickname]",
					"4-30\u4e2a\u5b57\u7b26\uff0c\u652f\u6301\u4e2d\u82f1\u6587\u3001\u6570\u5b57\u3001\u201c_\u201d\u548c\u51cf\u53f7",
					"info");
	d
			.fn(
					"input[name=nickname]",
					"\u4ec5\u652f\u6301\u4e2d\u82f1\u6587\u3001\u6570\u5b57\u3001\u201c_\u201d\u548c\u51cf\u53f7",
					"error", function(b, c) {
						return a.xt.util.isNick(c)
					});
	d.fn("input[name=nickname]",
			"\u6700\u957f\u4e0d\u80fd\u8d85\u8fc730\u4e2a\u5b57\u7b26",
			"require", function(b, c) {
				return a.xt.util.nickMax(c)
			});
	d.fn("input[name=nickname]",
			"\u8bf7\u8f93\u5165\u81f3\u5c114\u4e2a\u5b57\u7b26", "require",
			function(b, c) {
				return a.xt.util.nickMin(c)
			});
	d.fn("input[name=nickname]", "\u8bf7\u586b\u5199\u6635\u79f0", "require",
			function(b, c) {
				return a.xt.util.isEmpty(c)
			});
	d
			.fn(
					"input[name=password]",
					"6-16\u4e2a\u534a\u89d2\u5b57\u7b26\uff0c\u652f\u6301\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u7b26\u53f7\uff0c\u533a\u5206\u5927\u5c0f\u5199",
					"info");
	d.fn("input[name=password]",
			"\u5bc6\u7801\u4e2d\u4e0d\u80fd\u5305\u542b\u7a7a\u683c", "error",
			function(a, b) {
				return /^\S+$/.test(b)
			});
	d.fn("input[name=password]",
			"\u5bc6\u7801\u592a\u957f\u4e86\uff0c\u6700\u591a16\u4f4d",
			"require", function(a, b) {
				return 16 < b.length ? !1 : !0
			});
	d.fn("input[name=password]",
			"\u5bc6\u7801\u592a\u77ed\u4e86\uff0c\u6700\u5c116\u4f4d",
			"require", function(b, c) {
				return a.xt.util.tooShort(c, 6)
			});
	d.fn("input[name=password]", "\u8bf7\u8f93\u5165\u5bc6\u7801", "require",
			function(a, b) {
				return 0 == b.length ? !1 : !0
			});
	d.fn("input[name=password2]",
			"\u8bf7\u91cd\u590d\u8f93\u5165\u4e00\u6b21\u5bc6\u7801", "info");
	d
			.fn(
					"input[name=password2]",
					"\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
					"error", function(b, c) {
						return c == a("#password").val()
					});
	d.fn("input[name=password2]",
			"\u8bf7\u91cd\u590d\u8f93\u5165\u4e00\u6b21\u5bc6\u7801",
			"require", function(b, c) {
				return a.xt.util.isEmpty(c)
			});
	d.fn("input[name=blog]", "\u5982\uff1ahttp://blog.xt.com/xt", "info");
	d.fn("input[name=blog]",
			"\u8bf7\u586b\u5199\u6b63\u786e\u7684\u7f51\u7ad9\u5730\u5740",
			"empty", function(a, b) {
				return "" == b
						? !0
						: RegExp("^http:\\/\\/([\\w-]+(\\.[\\w-]+)+(\\/[\\w-   .\\/\\?%@&+=\\u4e00-\\u9fa5]*)?)?$")
								.test(b)
			});
	d.fn("textarea[name=intro]", "\u6700\u957f70\u4e2a\u5b57", "info");
	d.fn("textarea[name=intro]",
			"\u6700\u957f\u4e0d\u80fd\u8d85\u8fc770\u4e2a\u5b57", "empty",
			function(b, c) {
				return 70 < a.xt.util.getStrLength(c) ? !1 : !0
			});
	a.fn.validator = function(c) {
		var d = this.data("validator");
		d && (d.destroy(), this.removeData("validator"));
		c = a.extend(!0, {}, a.xt.validator.conf, c);
		if (this.is("form"))
			return this.each(function() {
						var g = a(this);
						d = new b(g, c);
						g.data("validator", d)
					});
		d = new b(this.eq(0).closest("form"), c);
		return this.data("validator", d)
	}
})(jQuery);
(function(a) {
	a.fn.textSlider = function(b) {
		b = a.extend({
					speed : "normal",
					step : 1,
					timer : 1E3
				}, b || {});
		return this.each(function() {
					a.fn.textSlider.scllor(a(this), b)
				})
	};
	a.fn.textSlider.scllor = function(b, c) {
		var d = b.find("ul:eq(0)"), e = d.children(), f = a(e[0]).height(), g = 0
				- c.step * f;
		7 < e.length && window.setInterval(function() {
					d.animate({
								marginTop : g
							}, c.speed, function() {
								for (i = 0; i < c.step; i++)
									d.find("li:first").removeClass("fade"), d
											.find("li:first").appendTo(d);
								d.css({
											marginTop : 0
										});
								d.find("li:first").addClass("fade")
							})
				}, c.timer)
	}
})(jQuery);
(function(a) {
	a.xt.tip = {
		conf : {
			timer : null,
			timerLength : 3E3,
			tipClass : ""
		},
		show : function(b, c) {
			clearTimeout(a.xt.tip.conf.timer);
			var d = a.xt.util.getPosition(b).topMid();
			a(".tipbox")[0] || a("body").append('<div class="tipbox"></div>');
			a(".tipbox").attr("class", "tipbox " + a.xt.tip.conf.tipClass);
			a(".tipbox").html(c);
			var e = a(".tipbox").outerWidth(), f = a(".tipbox").outerHeight();
			a(".tipbox").css({
						left : d.x - e / 2 + "px",
						top : d.y - f - 10 + "px"
					}).fadeIn();
			a.xt.tip.conf.timer = setTimeout(function() {
						a(".tipbox").fadeOut()
					}, a.xt.tip.conf.timerLength)
		}
	}
})(jQuery);
(function(a) {
	a.cookie = function(a, c, d) {
		if ("undefined" != typeof c) {
			d = d || {};
			if (null === c)
				c = "", d.expires = -1;
			var e = "";
			if (d.expires
					&& ("number" == typeof d.expires || d.expires.toUTCString))
				"number" == typeof d.expires ? (e = new Date, e.setTime(e
						.getTime()
						+ 864E5 * d.expires)) : e = d.expires, e = "; expires="
						+ e.toUTCString();
			var f = d.path ? "; path=" + d.path : "", g = d.domain
					? "; domain=" + d.domain
					: "", d = d.secure ? "; secure" : "";
			document.cookie = [a, "=", encodeURIComponent(c), e, f, g, d]
					.join("")
		} else {
			c = null;
			if (document.cookie && "" != document.cookie) {
				d = document.cookie.split(";");
				for (e = 0; e < d.length; e++)
					if (f = jQuery.trim(d[e]), f.substring(0, a.length + 1) == a
							+ "=") {
						c = decodeURIComponent(f.substring(a.length + 1));
						break
					}
			}
			return c
		}
	}
})(jQuery);
(function(a) {
	a.fn.lazyload = function(b) {
		var c = {
			threshold : 0,
			failure_limit : 0,
			event : "scroll",
			effect : "show",
			container : window,
			data_attribute : "original",
			skip_invisible : !0,
			appear : null,
			load : null
		};
		if (b) {
			if (void 0 !== b.failurelimit)
				b.failure_limit = b.failurelimit, delete b.failurelimit;
			if (void 0 !== b.effectspeed)
				b.effect_speed = b.effectspeed, delete b.effectspeed;
			a.extend(c, b)
		}
		var d = this;
		0 == c.event.indexOf("scroll")
				&& a(c.container).bind(c.event, function() {
					var b = 0;
					d.each(function() {
								$this = a(this);
								if ((!c.skip_invisible || $this.is(":visible"))
										&& !a.abovethetop(this, c)
										&& !a.leftofbegin(this, c))
									if (!a.belowthefold(this, c)
											&& !a.rightoffold(this, c))
										$this.trigger("appear");
									else if (++b > c.failure_limit)
										return !1
							})
				});
		this.each(function() {
			var b = this, f = a(b);
			b.loaded = !1;
			f.one("appear", function() {
				this.loaded
						|| (c.appear && c.appear.call(b, d.length, c), a("<img />")
								.bind("load", function() {
									f.hide().attr("src",
											f.data(c.data_attribute))[c.effect](c.effect_speed);
									b.loaded = !0;
									var g = a.grep(d, function(a) {
												return !a.loaded
											});
									d = a(g);
									c.load && c.load.call(b, d.length, c)
								}).attr("src", f.data(c.data_attribute)))
			});
			0 != c.event.indexOf("scroll") && f.bind(c.event, function() {
						b.loaded || f.trigger("appear")
					})
		});
		a(window).bind("resize", function() {
					a(c.container).trigger(c.event)
				});
		a(c.container).trigger(c.event);
		return this
	};
	a.belowthefold = function(b, c) {
		return (void 0 === c.container || c.container === window ? a(window)
				.height()
				+ a(window).scrollTop() : a(c.container).offset().top
				+ a(c.container).height()) <= a(b).offset().top - c.threshold
	};
	a.rightoffold = function(b, c) {
		return (void 0 === c.container || c.container === window ? a(window)
				.width()
				+ a(window).scrollLeft() : a(c.container).offset().left
				+ a(c.container).width()) <= a(b).offset().left - c.threshold
	};
	a.abovethetop = function(b, c) {
		return (void 0 === c.container || c.container === window ? a(window)
				.scrollTop() : a(c.container).offset().top) >= a(b).offset().top
				+ c.threshold + a(b).height()
	};
	a.leftofbegin = function(b, c) {
		return (void 0 === c.container || c.container === window ? a(window)
				.scrollLeft() : a(c.container).offset().left) >= a(b).offset().left
				+ c.threshold + a(b).width()
	};
	a.inviewport = function(b, c) {
		return !a.rightofscreen(b, c) && !a.leftofscreen(b, c)
				&& !a.belowthefold(b, c) && !a.abovethetop(b, c)
	};
	a.extend(a.expr[":"], {
				"below-the-fold" : function(b) {
					return a.belowthefold(b, {
								threshold : 0,
								container : window
							})
				},
				"above-the-top" : function(b) {
					return !a.belowthefold(b, {
								threshold : 0,
								container : window
							})
				},
				"right-of-screen" : function(b) {
					return a.rightoffold(b, {
								threshold : 0,
								container : window
							})
				},
				"left-of-screen" : function(b) {
					return !a.rightoffold(b, {
								threshold : 0,
								container : window
							})
				},
				"in-viewport" : function(b) {
					return !a.inviewport(b, {
								threshold : 0,
								container : window
							})
				},
				"above-the-fold" : function(b) {
					return !a.belowthefold(b, {
								threshold : 0,
								container : window
							})
				},
				"right-of-fold" : function(b) {
					return a.rightoffold(b, {
								threshold : 0,
								container : window
							})
				},
				"left-of-fold" : function(b) {
					return !a.rightoffold(b, {
								threshold : 0,
								container : window
							})
				}
			})
})(jQuery);
(function(a) {
	function b(b, d) {
		var e = b.find("ul:eq(0)"), f = e.children(), g = a(f[0]).outerWidth(), h = d.step
				* g, j = function() {
			e.animate({
						opacity : 1
					}, d.timer, function() {
						e.find("li:eq(6)").css("opacity", 0.5);
						e.animate({
									marginLeft : -1 * h
								}, d.speed, function() {
									e.find("li:eq(6)").css("opacity", 1);
									e.find("li:first").appendTo(e);
									e.css({
												marginLeft : 0
											})
								});
						r()
					})
		}, p = function() {
			e.animate({
						opacity : 1
					}, d.timer, function() {
						e.animate({
									marginLeft : h
								}, d.speed, function() {
									e.find("li:last").hide().prependTo(e)
											.fadeIn();
									e.css({
												marginLeft : 0
											})
								});
						r()
					})
		}, r = function() {
			"left" == d.direction ? j() : p()
		};
		f.length > d.length && r();
		e.hover(function() {
					e.stop()
				}, r)
	}
	a.fn.feedSlider = function(c) {
		c = a.extend({
					speed : "normal",
					step : 1,
					length : 7,
					timer : 3E3,
					direction : "left"
				}, c || {});
		return this.each(function() {
					new b(a(this), c)
				})
	}
})(jQuery);
(function(a) {
	function b(b, d) {
		var e = b.find(".items:eq(0)"), f = e.find(".item").length, g = 0, h = null, j = a(d.navis), p = function(
				a) {
			e.stop();
			var b = g + 1 == f ? 0 : g + 1;
			a + 1 && (g = a);
			e.animate({
						left : a + 1 ? -(d.width * a) : -(d.width * b)
					}, d.speed, function() {
						-1 == a && (g = b, n(g))
					})
		}, r = function(a) {
			"left" == d.direction && p(a)
		}, o = function() {
			l();
			h = setTimeout(function() {
						r(-1);
						o()
					}, d.timer)
		}, l = function() {
			null != h && clearTimeout(h)
		}, n = function(b) {
			a("." + d.naviClass).removeClass(d.naviClass);
			j.eq(b).addClass(d.naviClass)
		};
		j.each(function(b) {
					a(this).hover(function() {
								n(b);
								l();
								r(b)
							}, o)
				});
		b.hover(l, o);
		var s = {
			playlol : r,
			autoPlay : o,
			stopAuto : l,
			changeClass : n
		};
		null != d.startHandle ? d.startHandle(s) : o()
	}
	a.fn.scrollImg = function(c) {
		c = a.extend({
					speed : 500,
					timer : 3E3,
					direction : "left",
					navis : ".navi li",
					naviClass : "active",
					eventName : "hover",
					width : this.width(),
					startHandle : null
				}, c || {});
		return this.each(function() {
					new b(a(this), c)
				})
	}
})(jQuery);
(function(a) {
	a.fn.addPic = function(b) {
		b = a.extend({
					handler : function() {
					}
				}, b || {});
		if (a("#J_AddPicD")[0])
			a(".ap-input").val(""), a(".text-tip").html("");
		else {
			var c;
			a("body")
					.append('<div id="J_AddPicD" class="g-dialog ap-dialog"><div class="content"><p class="pb5">\u5c06\u56fe\u7247\u7f51\u5740\u7c98\u8d34\u5230\u4e0b\u9762\u7684\u6846\u4e2d\uff1a</p><form class="ap-form" name="addPic" action=""><div class="clearfix"><input class="base-input ap-input" name="photos" value="" placeholder="http://" /><input type="submit" class="sbl-btn src-sub" value="\u6dfb\u52a0" /></div><div class="text-tip"></div></form><a class="close" href="javascript:;"></a></div></div>');
			a(".ap-dialog .close").click(function() {
						a("#J_AddPicD").fadeOut("fast")
					});
			a("#J_AddPicD .ap-form").submit(function() {
				a(this);
				"" == a.xt.util.trim(a("#J_AddPicD .ap-input").val())
						? a(".text-tip")
								.html('<span class="errc">\u56fe\u7247\u7f51\u5740\u4e0d\u80fd\u4e3a\u7a7a~</span>')
								.show()
						: (b.handler(), a("#J_AddPicD").fadeOut("fast"));
				return !1
			})
		}
		c = a.xt.util.getPosition(this).topMid();
		var d = a("#J_AddPicD").outerWidth(), e = a("#J_AddPicD").outerHeight();
		a("#J_AddPicD").css({
					left : c.x - d / 2 + "px",
					top : c.y - e - 10 + "px"
				}).fadeIn("fast")
	};
	a.xt.ugc = {
		pubJson : {},
		getCmt : function(b) {
			var c = a.xt.util
					.trim(a(b + " textarea[name=proComment]").val());
			return 1E3 < a.xt.util.getStrLength(c)
					? (a(b + " .goods-act")
							.find(".errc")
							.show()
							.html("\u8bc4\u8bba\u6570\u4e0d\u80fd\u8d85\u8fc71000\u5b57"), !1)
					: "" == c ? "none" : c
		},
		getTags : function(b) {
			for (var c = a.xt.util.trim(a(b + " input[name=tags]").val()), d = c
					.replace(/&/g, "ï¼†").replace(/\//g, "ï¼").replace(/#/g,
							"ï¼ƒ").replace(/\ï¼Œ/g, ",").split(","), e = [], f = 0, g = d.length; f < g; f++)
				"" != d[f] && e.push({
							tagKeyword : d[f]
						});
			if (-1 != a.inArray("\u7cbe\u54c1", d))
				return a(b + " .goods-act")
						.find(".errc")
						.show()
						.html("\u6807\u7b7e\u4e2d\u4e0d\u80fd\u5305\u542b\u201c\u7cbe\u54c1\u201d"), !1;
			return 200 < a.xt.util.getStrLength(c)
					? (a(b + " .goods-act")
							.find(".errc")
							.show()
							.html("\u6807\u7b7e\u4e0d\u80fd\u8d85\u8fc7200\u5b57"), !1)
					: e
		},
		pubSuccess : function() {
			if (a("#J_PubSuccessD")[0])
				a("#J_PubSuccessD").data("overlay").load();
			else {
				var b;
				b = '<div id="J_PubSuccessD" class="g-dialog"><div class="dialog-content"><div class="bd clearfix"><p class="success-text"><span class="correct">\u5b9d\u8d1d\u53d1\u5e03\u6210\u529f\uff01</span></p>'
						+ ('<p class="clearfix"><a class="bbl-btn goCheck" href="'
								+ XTER.path + "/u/share/" + XTER.userId + '">\u524d\u5f80\u67e5\u770b\u5b9d\u8d1d</a>');
				a("body")
						.append(b
								+ '<a class="bgr-btn closeD ml10" href="javascript:;">\u5173\u95ed</a></p></div></div></div>');
				a("#J_PubSuccessD").overlay({
							top : "center",
							mask : {
								color : "#000",
								loadSpeed : 200,
								opacity : 0.3
							},
							closeOnClick : !1,
							load : !0
						})
			}
			a("#J_PubSuccessD .closeD").click(function() {
						a("#J_PubSuccessD").overlay().close()
					})
		},
		goodsExist : function(b) {
			a.xt.ugc.pubJson = {
				proId : b.proId,
				productVoId : b.productVoId,
				productName : "",
				productMerchant : "",
				url : "",
				price : "",
				salesVolume : "",
				proComment : "",
				tags : null,
				photos : [],
				favor : "false",
				typeVO : b.typeVO,
				statusVO : b.statusVO
			};
			var c = 0 < b.pictures.length
					? b.pictures[0].src
					: "http://static.xt.com/images/user/photo/avatar-80.png";
			if (a("#J_GoodsExistD")[0])
				a("#J_GoodsExistD").data("overlay").load();
			else {
				var d;
				d = '<div id="J_GoodsExistD" class="g-dialog ugc-dialog"><div class="dialog-content"><div class="hd"><h3>\u901b\u901b\u4e0a\u5df2\u7ecf\u6709\u8fd9\u4e2a\u5b9d\u8d1d\u5566</h3></div><div class="bd clearfix">'
						+ ('<form id="J_GoodsExistForm" action="'
								+ XTER.path + '/ugc/api/upateProduct" method="POST">');
				d = d + '<div class="clearfix"><div class="goods-avatar">'
						+ ('<img src="' + c + '" alt="" />')
						+ '</div><div class="goods-info">'
						+ ('<p class="goodsNm">' + b.productName + "</p>");
				a("body")
						.append(d
								+ '<p class="pb5">\u8bc4\u8bba\u4e00\u4e0b\uff1a</p><p><textarea class="base-txa" name="proComment" placeholder="\u559c\u6b22\u5b83\u4ec0\u4e48\u5462\uff1f"></textarea></p><p class="pt10 pb5">\u5b9d\u8d1d\u6807\u7b7e\uff1a</p><p><input type="text" class="base-input" name="tags" value="" /></p><p class="pt5 gc">\u591a\u4e2a\u6807\u7b7e\u7528\u4e2d\u6587\u6216\u82f1\u6587\u9017\u53f7\u9694\u5f00</p></div></div><div class="goods-act"><div class="clearfix"><a class="bbl-btn" id="J_GoodsSave" href="javascript:;">\u786e\u5b9a</a><label class="fl mt15 ml15 gc6"><input type="checkbox" name="tomyfav" /> \u52a0\u5165\u6211\u559c\u6b22\u7684\u5b9d\u8d1d</label></div><div class="errc mt10"></div></div></form></div><a class="close" href="javascript:;"></a></div></div>');
				a("#J_GoodsExistD").overlay({
							top : "center",
							mask : {
								color : "#000",
								loadSpeed : 200,
								opacity : 0.3
							},
							closeOnClick : !1,
							load : !0
						});
				a("#J_GoodsSave").unbind().bind("click", function() {
					$this = a(this);
					if ($this.hasClass("disabled"))
						return !1;
					var b = a.xt.ugc.getCmt("#J_GoodsExistD");
					if ("none" == b)
						b = "";
					else if (!b)
						return !1;
					var c = a.xt.ugc.getTags("#J_GoodsExistD");
					if (!c)
						return !1;
					a.xt.ugc.pubJson.proComment = b;
					a.xt.ugc.pubJson.tags = c;
					a.xt.ugc.pubJson.favor = a("#J_GoodsExistForm input[name=tomyfav]")[0].checked
							? "true"
							: "false";
					a.ajax({
						url : a("#J_GoodsExistForm").attr("action"),
						type : "post",
						dataType : "json",
						data : {
							data : JSON.stringify(a.xt.ugc.pubJson)
						},
						beforeSend : function() {
							$this.disableBtn("bbl-btn");
							a(".goods-act")
									.find(".errc")
									.show()
									.html('<p class="ajaxvali pl20">\u4fdd\u5b58\u4e2d...</p>')
						},
						success : function(b) {
							100 == b.code
									? (a("#J_GoodsExistD").overlay().close(), a("#J_GoodsExistD")
											.empty().remove(), -1 != window.location.href
											.indexOf("u/share")
											? (a.xt.tip.conf.tipClass = "tipmodal tipmodal-ok", a.xt.tip
													.show($this,
															"\u5b9d\u8d1d\u53d1\u5e03\u6210\u529f\uff01"), window.location.href = window.location.href)
											: a.xt.ugc.pubSuccess())
									: 101 == b.code
											? (a("#J_GoodsExistD")
													.find(".errc").show(), a("#J_GoodsExistD")
													.find(".errc")
													.html("\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u8bd5\u2026"), $this
													.enableBtn("bbl-btn"))
											: 102 == b.code
													&& (a(".text-tip")
															.html('<span class="errc">\u8f93\u5165\u7684\u6807\u7b7e\u6216\u8bc4\u8bba\u8fc7\u957f</span>')
															.show(), $this
															.enableBtn("bbl-btn"))
						}
					});
					return !1
				});
				a("#J_GoodsExistForm").submit(function() {
							return !1
						});
				a("#J_GoodsExistD").overlay().getClosers().bind("click",
						function() {
							a("#J_GoodsExistD").empty().remove()
						})
			}
		},
		goodspub : function(b) {
			a.xt.ugc.pubJson = {
				proId : b.proId,
				productVoId : b.productVoId,
				productName : b.productName,
				productMerchant : b.productMerchant,
				url : b.url,
				price : b.price,
				salesVolume : b.salesVolume,
				proComment : "",
				tags : null,
				photos : [],
				favor : "false",
				typeVO : b.typeVO,
				statusVO : b.statusVO,
				likeNum : b.likeNum,
				collectionNumber : b.collectionNumber,
				commentNumber : b.commentNumber
			};
			if (a("#J_GoodsPubD")[0])
				a("#J_GoodsPubD").data("overlay").load();
			else {
				var c;
				c = '<div id="J_GoodsPubD" class="g-dialog ugc-dialog"><div class="dialog-content"><div class="hd"><h3>\u55ef~ \u5c31\u662f\u5b83\u5427</h3></div><div class="bd clearfix">'
						+ ('<form id="J_GoodsPubForm" action="' + XTER.path + '/ugc/api/saveProduct" method="POST">');
				c = c
						+ '<div class="form-row"><label>\u5b9d\u8d1d\u540d\u79f0\uff1a</label>'
						+ ('<span class="goodsNm">' + b.productName + "</span>");
				a("body")
						.append(c
								+ '</div><div class="form-row"><label>\u8bc4\u8bba\u4e00\u4e0b\uff1a</label><textarea class="base-txa" name="proComment" placeholder="\u559c\u6b22\u5b83\u4ec0\u4e48\u5462\uff1f"></textarea></div><div class="form-row"><label>\u5b9d\u8d1d\u6807\u7b7e\uff1a</label><div class="inlineblock"><input type="text" class="base-input" name="tags" value="" /><p class="pt5 gc">\u591a\u4e2a\u6807\u7b7e\u7528\u4e2d\u6587\u6216\u82f1\u6587\u9017\u53f7\u9694\u5f00</p></div></div><div class="form-row clearfix"><label>\u5b9d\u8d1d\u56fe\u7247\uff1a</label><div class="goods-gallery"><div class="gallery-bd"><div class="items"></div></div><div class="gallery-ft clearfix"><span class="status">\u5df2\u9009 <em>0</em> \u5f20</span><span class="errc"></span><div class="gallery-pagin"><a href="javascript:;" class="sgr-btn prev">\u4e0a\u9875</a><span class="num-box"><em class="curP">1</em>/<em class="totalP"></em></span><a href="javascript:;" class="sgr-btn next">\u4e0b\u9875</a></div></div></div></div><div class="goods-act"><div class="clearfix"><a class="bbl-btn" id="J_GoodsPub" href="javascript:;">\u53d1\u5e03</a><label class="fl mt15 ml15 gc6"><input type="checkbox" name="tomyfav" /> \u52a0\u5165\u6211\u559c\u6b22\u7684\u5b9d\u8d1d</label></div><div class="errc mt10"></div></div></form></div><a class="close" href="javascript:;"></a></div></div>');
				a("#J_GoodsPubD").overlay({
							top : "center",
							mask : {
								color : "#000",
								loadSpeed : 200,
								opacity : 0.3
							},
							closeOnClick : !1,
							load : !0
						});
				c = b.photos;
				var d = "";
				if (0 < c.length) {
					d += "<ul>";
					if ("item.buy.qq.com" == a.xt.util.getDomain(b.url))
						d += '<li><a href="javascript:;"><img src="' + c[0]
								+ '" alt="" /></a><i></i></li>';
					else
						for (var b = 0, e = c.length; b < e; b++)
							d += '<li><a href="javascript:;"><img src="' + c[b]
									+ '" alt="" /></a><i></i></li>', 0 == (b + 1)
									% 8
									&& b != c.length - 1 && (d += "</ul><ul>");
					a("#J_GoodsPubD .items").append(d + "</ul>");
					a("#J_GoodsPubD .gallery-bd").scrollable({
								vertical : !0
							});
					a("#J_GoodsPubD .prev").click(function() {
								var b = parseInt(a(".curP").text());
								parseInt(a(".totalP").text());
								1 < b && a(".curP").text(b - 1)
							});
					a("#J_GoodsPubD .next").click(function() {
						var b = parseInt(a(".curP").text()), c = parseInt(a(".totalP")
								.text());
						b < c && a(".curP").text(b + 1)
					});
					a("#J_GoodsPubD .totalP").text(a("#J_GoodsPubD ul").length)
				}
				a("#J_GoodsPubD li a, #J_GoodsPubD li i").die().live("click",
						function(b) {
							b.preventDefault();
							a("#J_GoodsPubD .gallery-ft").find(".status")
									.show();
							a("#J_GoodsPubD .gallery-ft").find(".errc").hide();
							a(this).parent("li").hasClass("selected")
									? a(this).parent("li")
											.removeClass("selected")
									: a(this).parent("li").addClass("selected");
							a("#J_GoodsPubD .status em")
									.text(a("#J_GoodsPubD li.selected").length)
						});
				a("#J_GoodsPub").unbind().bind("click", function() {
					$this = a(this);
					if ($this.hasClass("disabled"))
						return !1;
					var b = [];
					a("#J_GoodsPubD li.selected").each(function() {
								b.push(a(this).find("img").attr("src"))
							});
					var c = a.xt.ugc.getCmt("#J_GoodsPubD");
					if ("none" == c)
						c = "";
					else if (!c)
						return !1;
					var d = a.xt.ugc.getTags("#J_GoodsPubD");
					if (!d)
						return !1;
					a.xt.ugc.pubJson.proComment = c;
					a.xt.ugc.pubJson.tags = d;
					a.xt.ugc.pubJson.photos = b;
					a.xt.ugc.pubJson.favor = a("#J_GoodsPubForm input[name=tomyfav]")[0].checked
							? "true"
							: "false";
					if (0 == b.length)
						return a("#J_GoodsPubD .gallery-ft").find(".status")
								.hide(), a("#J_GoodsPubD .gallery-ft")
								.find(".errc").show(), a("#J_GoodsPubD .gallery-ft")
								.find(".errc")
								.html("\u81f3\u5c11\u8981\u9009\u4e00\u5f20\u54e6"), !1;
					a.ajax({
						url : a("#J_GoodsPubForm").attr("action"),
						type : "post",
						dataType : "json",
						data : {
							data : JSON.stringify(a.xt.ugc.pubJson)
						},
						beforeSend : function() {
							$this.disableBtn("bbl-btn");
							a(".goods-act")
									.find(".errc")
									.show()
									.html('<p class="ajaxvali pl20">\u53d1\u5e03\u4e2d...</p>')
						},
						success : function(b) {
							100 == b.code
									? (a("#J_GoodsPubD").overlay().close(), a("#J_GoodsPubD")
											.empty().remove(), -1 != window.location.href
											.indexOf("u/share")
											? (a.xt.tip.conf.tipClass = "tipmodal tipmodal-ok", a.xt.tip
													.show($this,
															"\u5b9d\u8d1d\u53d1\u5e03\u6210\u529f\uff01"), window.location.href = window.location.href)
											: a.xt.ugc.pubSuccess())
									: 101 == b.code
											? (a("#J_GoodsPubD .goods-act")
													.find(".errc").show(), a("#J_GoodsPubD .goods-act")
													.find(".errc")
													.html("\u51fa\u9519\u4e86\uff0c\u8bf7\u91cd\u8bd5\u2026"), $this
													.enableBtn("bbl-btn"))
											: 102 == b.code
													&& (a(".text-tip")
															.html('<span class="errc">\u8f93\u5165\u7684\u6807\u7b7e\u6216\u8bc4\u8bba\u8fc7\u957f</span>')
															.show(), $this
															.enableBtn("bbl-btn"))
						}
					});
					return !1
				});
				a("#J_GoodsPubForm").submit(function() {
							return !1
						});
				a("#J_GoodsPubD").overlay().getClosers().bind("click",
						function() {
							a("#J_GoodsPubD").empty().remove()
						})
			}
		}
	};
	a("a[rel=shareGoods]")[0] && a("a[rel=shareGoods]").click(function() {
		if (!a.xt.dialog.isLogin())
			return !1;
		if ("true" == XTER.isBlack)
			return alert("\u60a8\u7684\u5206\u4eab\u529f\u80fd\u5df2\u88ab\u7981\u7528"), !1;
		var b = a(this);
		if (a("#J_ShareGoodsD")[0])
			a(".sg-input").val(""), a(".text-tip").html("");
		else {
			var c;
			c = '<div id="J_ShareGoodsD" class="g-dialog sg-dialog"><div class="content"><p class="title">\u5c06\u5b9d\u8d1d\u7f51\u5740\u7c98\u8d34\u5230\u4e0b\u9762\u6846\u4e2d\uff1a</p>'
					+ ('<form class="sg-form" name="shareGoods" action="'
							+ XTER.path + '/ugc/api/findProduct">');
			a("body")
					.append(c
							+ '<div class="clearfix"><input class="base-input sg-input" name="url" value="" placeholder="http://" autocomplete="off" /><input type="submit" id="J_GoodsUrlSubmit" class="bbl-btn url-sub" value="\u786e\u5b9a" /></div><div class="text-tip"></div></form><div class="sg-source"><p class="pt10 pb5">\u5df2\u652f\u6301\u7f51\u7ad9\uff08<a href="http://xt.com/contact" target="_blank">\u5546\u5bb6\u7533\u8bf7\u52a0\u5165</a>\uff09\uff1a</p><div class="source-list clearfix"><a class="icon-source icon-taobao" href="http://www.taobao.com/" target="_blank">\u6dd8\u5b9d\u7f51</a><a class="icon-source icon-tmall" href="http://www.tmall.com/" target="_blank">\u5929\u732b\u5546\u57ce</a><a class="icon-source icon-paipai" href="http://buy.qq.com/" target="_blank">QQ\u7f51\u8d2d</a><a class="icon-source icon-mbaobao" href="http://www.mbaobao.com/" target="_blank">\u9ea6\u5305\u5305</a><a class="icon-source icon-vancl" href="http://www.vancl.com/" target="_blank">\u51e1\u5ba2\u8bda\u54c1</a></div></div><div class="tipbox-up"><em>\u25c6</em><span>\u25c6</span></div><a class="close" href="javascript:;"></a></div></div>');
			a(".sg-dialog .close").click(function() {
						a("#J_ShareGoodsD").fadeOut("fast")
					});
			a(".sg-form").submit(function() {
				var b = a(this), c = a.xt.util.trim(a(".sg-input").val());
				"" == c
						? a(".text-tip")
								.html('<span class="errc">\u5b9d\u8d1d\u7f51\u5740\u4e0d\u80fd\u4e3a\u7a7a~</span>')
								.show()
						: a.xt.util.validSite(c)
								? (a(".text-tip")
										.html('<span class="gc6">\u5b9d\u8d1d\u4fe1\u606f\u6293\u53d6\u4e2d\u2026</span>')
										.show(), a("#J_GoodsUrlSubmit")
										.disableBtn("bbl-btn"), a.post(b
												.attr("action"), b
												.serializeArray(), function(b) {
											100 == b.code
													? (a("#J_ShareGoodsD")
															.hide(), a.xt.ugc
															.goodspub(b.product))
													: 105 == b.code
															? (a("#J_ShareGoodsD")
																	.hide(), a.xt.ugc
																	.goodsExist(b.product))
															: 101 == b.code
																	|| 106 == b.code
																	? a(".text-tip")
																			.html('<span class="errc">\u5b9d\u8d1d\u4fe1\u606f\u6293\u53d6\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\u2026</span>')
																			.show()
																	: 107 == b.code
																			? a(".text-tip")
																					.html('<span class="errc">\u6682\u65f6\u8fd8\u4e0d\u652f\u6301\u8fd9\u4e2a\u5b9d\u8d1d\u2026</span>')
																					.show()
																			: 108 == b.code
																					? a(".text-tip")
																							.html('<span class="errc">\u4f60\u5df2\u7ecf\u5206\u4eab\u8fc7\u8fd9\u4e2a\u5b9d\u8d1d\u5566\u2026</span>')
																							.show()
																					: 110 == b.code
																							&& a(".text-tip")
																									.html('<span class="errc">\u5bf9\u4e0d\u8d77\uff0c\u4e0d\u652f\u6301\u6b64\u5546\u54c1</span>')
																									.show();
											a("#J_GoodsUrlSubmit")
													.enableBtn("bbl-btn")
										}))
								: a(".text-tip")
										.html('<span class="errc">\u6682\u65f6\u8fd8\u4e0d\u652f\u6301\u8fd9\u4e2a\u7f51\u7ad9\u5462~</span>')
										.show();
				return !1
			})
		}
		b.parent().hasClass("pos-r") ? a(".m-nav .pos-r")
				.append(a("#J_ShareGoodsD")) : a("body")
				.append(a("#J_ShareGoodsD"));
		c = a.xt.util.getPosition(b).leftBottom();
		var d = a("#J_ShareGoodsD").outerWidth();
		a("#J_ShareGoodsD").outerHeight();
		var e = b.outerWidth(), f = c.x, g = e / 2 - 8;
		960 < c.x + d && (f = c.x - (d - e), g = d - e / 2 - 8);
		a("#J_ShareGoodsD .tipbox-up").css({
					left : g + "px"
				});
		b.parent().hasClass("pos-r") ? a("#J_ShareGoodsD").css({
					left : "auto",
					right : "55px",
					top : "41px"
				}).fadeIn("fast") : a("#J_ShareGoodsD").css({
					right : "auto",
					left : f + "px",
					top : c.y + 10 + "px"
				}).fadeIn("fast");
		a(".sg-input").focus()
	})
})(jQuery);
$(function() {
	var a = null, b = function(a) {
		0 == a && $("a[rel=signIn]").removeClass("checked");
		1 == a && $("a[rel=signIn]").addClass("checked")
	}, c = function(c, e) {
		c
				.after('<div id="checkin_intro">\u4eca\u5929\u5df2\u7b7e\u5230<br/>\u79ef\u5206\uff1a<b>'
						+ e.userScore
						+ "</b><br/>\u8fde\u7eed\u7b7e\u5230\uff1a<b>"
						+ e.userCheckinDays
						+ '</b>\u5929<br/><img src="http://static.xt.com/images/ui/duihuan.png" alt="\u8fd1\u671f\u5f00\u653e" title="\u8fd1\u671f\u5f00\u653e"/><p>\u7b7e\u5230\uff1a10\u79ef\u5206/\u5929<br/>\u8fde\u7b7e7\u5929\uff1a\u9001100<br/>\u8fde\u7b7e15\u5929\uff1a\u9001300<br/>\u8fde\u7b7e22\u5929\uff1a\u90011000</p></div>');
		$("#checkin_intro").hover(function() {
					null != a && clearTimeout(a)
				}, function() {
					a = setTimeout(function() {
								$("#checkin_intro").remove()
							}, 500)
				});
		b(1)
	};
(function() {
		if (1 >= XTER.userId.length)
			return "Not login";
		$.ajax({
			url : XTER.path + "/user_score",
			type : "post",
			dataType : "json",
			success : function(a) {
				if (100 == a.code) {
					var c = new Date(a.modifyTime), f = c.getUTCDate() + 1;
					Date.UTC(c.getUTCFullYear(), c.getUTCMonth(), f, 1, 0, 0) < a.currentTime
							? b(0)
							: b(1)
				} else
					101 != a.code && 300 == a.code && b(0)
			}
		})
	})();
	$("a[rel=signIn]").click(function() {
		if (!$.xt.dialog.isLogin() || $("a[rel=signIn]").hasClass("checked"))
			return !1;
		var a = $(this);
		$.ajax({
			url : XTER.path + "/user_checkin",
			type : "post",
			dataType : "json",
			success : function(b) {
				100 == b.code
						? c(a, b)
						: 101 == b.code
								? ($.xt.tip.conf.tipClass = "tipmodal tipmodal-error3", $.xt.tip
										.show(a,
												">_< \u7b7e\u5230\u5931\u8d25\uff01"))
								: 103 == b.code ? c(a, b) : 300 == b.code
										&& $.xt.dialog.login()
			}
		})
	});
	$("a[rel=signIn]").hover(function() {
		$("a[rel=signIn]").hasClass("checked") && ($this = $(this), $.ajax({
			url : XTER.path + "/user_score",
			type : "post",
			dataType : "json",
			success : function(a) {
				100 == a.code
						? c($this, a)
						: 101 == a.code
								? ($.xt.tip.conf.tipClass = "tipmodal tipmodal-error3", $.xt.tip
										.show($this,
												">_<\u79ef\u5206\u83b7\u53d6\u5931\u8d25"))
								: 300 == a.code && $.xt.dialog.login()
			}
		}))
	}, function() {
		$("#checkin_intro")[0] && (a = setTimeout(function() {
					$("#checkin_intro").remove()
				}, 500))
	})
});
$(function() {
			$(window).bind("scroll", function() {
				var a = $(document).scrollTop();
				83 < a ? $(".m-nav").addClass("fixed") : $(".m-nav")
						.removeClass("fixed");
				$.xt.util.isIE6()
						&& (83 < a ? $(".m-nav").css("top", a) : $(".m-nav")
								.css("top", "83px"))
			});
			$(".login-dropdown a").unbind("click").click(function() {
						var a = $(this).attr("href");
						$.xt.util.openWin(a);
						return !1
					});
			$(".regLogin").dropDown({
						classNm : ".login-dropdown"
					});
			$(".gohome").dropDown({
						classNm : ".set-dropdown"
					});
			$("#returnTop").returntop()
		});
		