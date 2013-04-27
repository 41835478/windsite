G.def("beforeLogin", function() {
	function b(b, d, e, f, g, h, i) {
		if (a)
			return;
		var j = i || 1e3, k = '<div class="guokr-layer-beforelogin">                            <div class="guokr-layer-bl-con">                                <p class="guokr-layer-bl-text">'
				+ b
				+ '</p>                                <div class="guokr-layer-bl-btn">                                    <a class="gl-weibo" href="'
				+ d
				+ '" data-gaevent="footer_login:v1.1.1.1:login" target="_blank"></a>                                </div>                                <div class="guokr-layer-bl-btn">                                    <a class="gl-qq" href="'
				+ e
				+ '"  data-gaevent="footer_login:v1.1.1.1:login" target="_blank"></a>                                </div>                                <div class="guokr-layer-bl-btn">                                    <a class="gl-renren" href="'
				+ f
				+ '"  data-gaevent="footer_login:v1.1.1.1:login" target="_blank"></a>                                </div>                                <div class="guokr-layer-bl-reg">                                    <a href="'
				+ g
				+ '"  data-gaevent="footer_login:v1.1.1.1:login" target="_blank">登录</a><span>或直接</span>                                </div>                                <div class="guokr-layer-bl-btn">                                    <a class="gl-reg" href="'
				+ h
				+ '"  data-gaevent="footer_login:v1.1.1.1:login" target="_blank"></a>                                </div>                                <div class="gclear"></div>                            </div>                            <div class="guokr-beforelogin-close"><a href="javascript:void(0)">关闭</a></div>                        </div>';
		$("body").append($(k)), $(".guokr-beforelogin-close").click(function() {
					c(j)
				}), $(".guokr-layer-beforelogin").fadeIn(j), a = !0
	}
	function c(b) {
		if (!a)
			return;
		var c = b || 1e3;
		$(".guokr-layer-beforelogin").fadeOut(c)
	}
	"use strict";
	var a = !1;
	return function(a, d, e) {
		var f = e || 1e3, g = d || 3e3, h = a.layer_str, i = a.wb_url, j = a.qq_url, k = a.rr_url, l = a.login_url, m = a.reg_url, n = !1;
		return $(window).one("scroll", function() {
					b(h, i, j, k, l, m, f)
				}), setTimeout(function() {
					b(h, i, j, k, l, m, f)
				}, d), {
			delLayer : function(a) {
				var b = a || 1e3;
				c(b)
			}
		}
	}
}), G.def("./site/articlePage",
		["../lib/share", "../lib/screenTop", "../lib/scrollTo",
				"../lib/placeholder", "../lib/Overlay", "../lib/UBB",
				"../lib/UEditor", "../lib/tmpl", "../lib/AliasUtils",
				"../lib/Recommend", "../lib/draft", "../lib/ValidateUtils",
				"../lib/validate", "../lib/beforeLogin"], function(a, b, c, d,
				e, f, g, h, i, j, k, l, m, n) {
			function x(a, b, d, e) {
				a.doOnce(function() {
					this.delegate("a[data-operation]", "click", function(a) {
								a.preventDefault();
								var f = $(this);
								if (f.data("operation") === d)
									confirm("确定删除这条评论？")
											&& v.deleteComment(f.data("id"),
													function() {
														f.closest("li")
																.fadeOut()
													});
								else if (f.data("operation") === e)
									if (b) {
										var g = f.parent(), h = b.getContent();
										b
												.setContent([
														h,
														h ? "\n" : "",
														"<blockquote>引用@",
														g
																.siblings(".cmtAuthor")
																.text(),
														" 的话：", y(g.prev()),
														"</blockquote><br/>"]
														.join("")), b.focus(!0), c($(t))
									} else
										c($(t))
							})
				})
			}
			function y(a) {
				var b = w.HTMLtoUBB(a[0]);
				return b.length > 100 ? b.slice(1, 100) + "..." : b
			}
			function z(a, b) {
				var c = $("#replyAlsoReco");
				a.submit(function(c) {
							var d = this, e = $("#captcha");
							if (d.sign === !0)
								return !1;
							d.sign = !0;
							var f = b.getContentTxt(), g = f.trim().length, h, i;
							if (!b.getContent().trim())
								return alert("请填写内容"), d.sign = !1, !1;
							if (g > 3e3)
								return alert("回应内容不能超过3000字"), d.sign = !1, !1;
							i = G.unique(f.match(u));
							if (i && i.length > 20)
								return alert("对不起，不能@超过20个人"), d.sign = !1, !1;
							if (e.length && e.attr("type") === "text"
									&& !e.val())
								return alert("验证码不能为空"), d.sign = !1, !1;
							a.find("textarea").val(function() {
										return b.getUBB()
									}), h.insertAfter($(":submit", a))
						})
			}
			"use strict";
			var o = g_obj_id, p = "article", q = $("#comments"), r = "#replyForm", s = "reply", t = "#commentsReplyer", u = /@[\u3400-\u4db5\u4e00-\u9fcba-zA-Z0-9\._\-]+/g, v = {
				deleteComment : function(a, b) {
					$.ajax({
								url : "/apis/minisite/article_reply.json",
								data : {
									reply_id : a
								},
								type : "DELETE",
								success : function(a) {
									a.ok && b && b()
								},
								dataType : "json"
							})
				}
			}, w = new f({
						tags : {
							image : null,
							video : null,
							flash : null,
							blockquote : {
								parseHTML : function(a, b, c) {
									var d = c.pop();
									while (d)
										d = c.pop()
								}
							},
							url : null,
							color : null,
							ref : null
						}
					});
			return {
				login : function(a) {
					var b = $("#" + s), c = $(r), d, f, g;
					b.doOnce(function() {
								function a(a, b) {
									$.ajax({
												url : "/apis/community/draft.json",
												type : "post",
												data : a,
												success : function(a) {
													a.ok && b && b()
												},
												dataType : "json"
											})
								}
								d = new UE.ui.Editor, d.render(s);
								var b = {
									success : function() {
									},
									interval : 5e3,
									$title : $("#articleTitle"),
									checkTitle : !1,
									prefix : "文章"
								};
								f = k(d, a, b), z(c, d)
							}), x(q, d, "deleteComment", "quoteComment"), $(".document")
							.mouseup(function(a) {
								function j() {
									return document.selection
											? i = $.trim(document.selection
													.createRange().text)
											: window.getSelection()
													&& (i = $.trim(window
															.getSelection())), i.length > 100
											&& (i = i.substring(0, 100) + "..."), i
								}
								var b = 5, c = 5, f, h = null, i = "";
								j()
										&& (g
												? $("#quoteToCmt").css({
															top : a.pageY + b
																	+ "px",
															left : a.pageX + c
																	+ "px",
															position : "absolute",
															"z-index" : 999,
															"font-size" : "12px"
														}).show("fast")
												: (g = '<a class="gbtn quote_to_cmt" href="javascript:void 0;" id="quoteToCmt">引用到评论</a>', $("body")
														.append(g), $("#quoteToCmt")
														.css({
															top : a.pageY + b
																	+ "px",
															left : a.pageX + c
																	+ "px",
															position : "absolute",
															"z-index" : 999,
															"font-size" : "12px"
														}).show("fast").click(
																function(a) {
																	var b = d
																			.getContent();
																	d
																			.setContent([
																					b,
																					b
																							? "\n"
																							: "",
																					"<blockquote>引用文章内容：",
																					j(),
																					"</blockquote><br/>"]
																					.join("")), $("#quoteToCmt")
																			.hide(), f = (new e)
																			.open("<div>已将“"
																					+ i
																					+ "”引用到评论框。</div>")
																			.title("引用到评论框")
																			.closeCallBack(
																					function() {
																						h
																								&& clearTimeout(h)
																					}), h = setTimeout(
																			function() {
																				f
																						.close()
																			},
																			2e3)
																})))
							}).mousedown(function() {
										$("#quoteToCmt").hide()
									}), $("#recommendBt").doOnce(function() {
								var a = $(this);
								a.click(function() {
											var b = new j;
											b.show(g_share_data, a)
										})
							}), $("#captchaImage").doOnce(function() {
						function e(b) {
							b.preventDefault(), a.attr("src", c + "?v=" + d++)
						}
						var a = $("#captchaImage"), b = $("#changeCaptchaImage"), c = a
								.attr("src"), d = 1;
						b.click(e), a.click(e)
					})
				},
				all : function() {
					b(), a();
					var c = $("#share");
					c.doOnce(function(a) {
						function d(a) {
							var b = $("#share"), c = $("#articleDescription")
									.text().trim(), d = $("#sharePic")
									.attr("src")
									|| $("#articleContent img:eq(0)")
											.attr("src"), e = $("#articleTitle")
									.text()
									|| document.title, f = b.data("author"), g = c.length
									+ e.length + f.length, h = 85 - e.length
									- f.length, i = {
								url : location.protocol + "//" + location.host
										+ location.pathname,
								title : "",
								summary : G.ellipsis(c, h),
								pic : ""
							};
							return d == null && (d = ""), i.pic = d, a === "qqmb"
									&& i.summary
									? (i.summary = "这个有意思 →_→【" + e + "】" + f
											+ "：" + i.summary + "（分享自 @果壳网）", i.title = "")
									: a === "sinaminiblog" && i.summary
											? (i.title = "", i.summary = "这个有意思 →_→【"
													+ e
													+ "】"
													+ (b.data("xlnickname") || f)
													+ "：" + i.summary)
											: (i.summary = "这个有意思 →_→【" + e
													+ "】" + f + "：" + i.summary
													+ "（来自 果壳网）", i.title = e), i
						}
						var b = '分享到：                            <a data-type="sinaminiblog" class="gicon-share-sina" href="#" title="分享到新浪微博">新浪微博</a>                            <a data-type="renren" class="gicon-share-rr" href="#" title="分享到人人">人人</a>                            <a data-type="douban" class="gicon-share-db" href="#" title="分享到豆瓣">豆瓣</a>                            <a data-type="qzone" class="gicon-share-qzone" href="#" title="分享到QQ空间">QQ空间</a>                            <a data-type="qqmb" class="gicon-share-qqmb" href="#" title="分享到腾讯微博">腾讯微博</a>', c = b
								+ '<div class="counter"><b><s></s></b><span class="BSHARE_COUNT share_counter"></span></div>';
						a($("#share"), d, null, b)
					}, "share"), $("#recommendArticle").delegate("a", "click",
							function() {
								_gaq
										.push(["_trackEvent",
												"article_recommend",
												"v1.1.1.1",
												"/article/" + g_obj_id + "/",
												g_obj_id])
							}), $("#recommendArticleRelated").delegate("a",
							"click", function() {
								_gaq
										.push(["_trackEvent",
												"article_recommend_related",
												"v1.1.1.1",
												"/article/" + g_obj_id + "/",
												g_obj_id])
							})
				},
				unlogin : function() {
					$("#recommendBt").click(function() {
								location = url_signin
							});
					var a = {
						layer_str : "成为果壳青年，一起记录科技时代",
						wb_url : weibo_signin,
						qq_url : qq_signin,
						rr_url : renren_signin,
						login_url : url_signin,
						reg_url : url_signup
					};
					n(a, 2e3)
				}
			}
		});
var moduleName = g_page_name.replace(/site/g, "");
moduleName = moduleName.slice(0, 1).toLowerCase() + moduleName.slice(1), G.req(
		"./site/" + moduleName, function(a) {
			var b = ukey ? "login" : "unlogin";
			a[b] && a[b](ukey), a.all && a.all()
		})