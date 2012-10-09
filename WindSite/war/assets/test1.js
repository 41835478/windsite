(function() {
	MOGU.qzone_bind = function(c) {
		if (MOGUPROFILE.userid != "") {
			var d = $("#sina_weibo_follow").size(), b = window.location.href;
			c == 3 && d == 0 && b.indexOf("is_qzone") < 0
					&& b.indexOf("/elegant") < 0 && b.indexOf("/note") < 0
					&& $.ajax({
						url : "/collect/ispopqqnewbind",
						type : "POST",
						timeout : 6E4,
						data : {},
						dataType : "json",
						success : function(a) {
							if (a == null)
								alert(MGLANG.msgTimeout);
							else {
								var b = a.status.msg;
								a.status.code == 1001 ? a.result.is_pop == !0
										&& (a = null, a = new MGLightBox({
											title : " ",
											lightBoxId : "qzone_xz",
											contentHtml : '<div class="lb_qzone"><a class="right_btn" href="javascript:;">\u63a5\u53d7</a><a class="left_btn" href="javascript:;">\u62d2\u7edd</a></div>',
											scroll : !0,
											isBgClickClose : !1
										}), a.init(), $("#qzone_xz .left_btn")
												.click(function() {
													$.ajax({
														url : "/collect/popqqbindcancel",
														type : "POST",
														timeout : 6E4,
														data : {},
														dataType : "json",
														success : function(a) {
															if (a == null)
																alert(MGLANG.msgTimeout);
															else {
																var b = a.status.msg;
																a.status.code == 1001
																		? $("#qzone_xz,.light_box_fullbg")
																				.remove()
																		: alert(b)
															}
														}
													})
												}), $("#qzone_xz .right_btn")
												.click(function() {
													window
															.open(
																	"http://www.mogujie.com/collect/qqbindoauth",
																	"_blank");
													$("#qzone_xz,.light_box_fullbg")
															.remove()
												}))
										: alert(b)
							}
						}
					})
		}
	}
})(jQuery);
(function(a) {
	MOGU.Wall_Loader = function(k) {
		var l = {
			container_class : "imagewall",
			feed_class : "i_w_f",
			loading_id : "iw_loading",
			loading_html : '<div class="clr" style="text-align:center;" id="iw_loading"><img src="/img/wall-loading.gif"></div>',
			sort_interval : 25,
			check_interval : 500,
			iwff_html : '<div class="i_w_f_f"><div class="hd"></div><div class="bd" style="height:{h}px"></div><div class="ft"></div></div>',
			ajax_url : "/book/ajax",
			end_callback : null,
			image_cols : null
		};
		if (MOGUPROFILE.is_subsite == "1")
			l.ajax_url = "/book/ajaxjia";
		if (MOGUPROFILE.bookajax)
			l.ajax_url = MOGUPROFILE.bookajax;
		var c = a.extend(l, k);
		if (a("." + c.container_class).size() != 0) {
			var n = MOGUPROFILE.lastTweetId, t = MOGUPROFILE.book;
			if (t != void 0) {
				typeof n === "undefined" && (n = "");
				var f = 0, o = !1, p = null, u = !1, m = [], v = !1, q = "";
				if (!Array.indexOf)
					Array.prototype.indexOf = function(a) {
						for (var c = 0; c < this.length; c++)
							if (this[c] == a)
								return c;
						return -1
					};
				if (null == c.image_cols)
					c.image_cols = a("." + c.container_class).find(".col");
				for (var r = parseInt(c.image_cols.size()), w = [], d = [], g = null, k = 0; k < r; k++)
					g = a(c.image_cols.get(k)), w.push(g), d.push(g.height()
							+ g.offset().top);
				var x = function() {
					if (c.iwff_html != "") {
						d = [];
						for (var b = 0; b < r; b++)
							g = a(c.image_cols.get(b)), d.push(g.height()
									+ g.offset().top);
						for (var f = Math.max.apply(Math, d) + 26, b = 0; b < d.length; b++)
							a(c.image_cols.get(b)).append(c.iwff_html.replace(
									/{h}/, f - d[b]))
					}
				};
				if (MOGUPROFILE.nobookajax)
					x();
				else {
					var z = function() {
						var b = a("." + c.container_class).attr("id"), d = MGTOOL
								.getCookie("qzone_add"), i = MGTOOL
								.getCookie("is_shop_ex");
						MOGUPROFILE.userid == ""
								&& a("#lb_login").size() == 0
								&& MOGUPROFILE.showqq != "is_qzone"
								&& (f == 0 && d == 3
										? MOGU.Qzone_Box_Login_Init()
										: f == 3 && i == 1
												? MOGU.Qzone_Box_Login_Init()
												: MOGUPROFILE.showqq && f == 0
														? (MOGU
																.user_handsome_login_init(), MOGU
																.user_handsome_login())
														: f == 3
																&& d != 3
																&& i != 1
																&& (MOGU
																		.user_handsome_login_init(), a
																		.post("/ologin/logindialogpop"), a("#lb_login")
																		.addClass("login_box_log"), a(".light_box_fullbg")
																		.addClass("login_box_log_bg"), a(".login_box_log .reg_or_weibo a")
																		.click(
																				function() {
																					a
																							.post("/ologin/logindialogsucc")
																				}), a(".login_box_log .lb_close, .login_box_log_bg")
																		.click(
																				function() {
																					a
																							.post("/ologin/logindialogfail")
																				}), MOGU
																		.user_handsome_login(
																				!1,
																				{
																					callback : function() {
																						a
																								.post("/ologin/logindialogsucc")
																					}
																				})));
						MOGU.show_is_follow && MOGU.show_is_follow(f);
						MOGU.qzone_bind && MOGU.qzone_bind(f);
						o = !0;
						a("#" + c.loading_id).size() == 0
								&& a("#" + b).after(c.loading_html);
						a.ajax({
							url : c.ajax_url,
							type : "POST",
							timeout : 6E4,
							data : {
								lastTweetId : n,
								book : t,
								totalCol : r,
								page : f
							},
							dataType : "json",
							success : function(b) {
								if (b != null)
									if (b.status.code == 1001) {
										f++;
										a("#" + l.loading_id).remove();
										var d = [];
										if (b.result.html.book)
											d = b.result.html.book;
										for (var i = [], j = [], h = [], e = 0; d.length > e; e++)
											if (h[e] = 0, a(d[e])
													.find(".pic li").each(
															function() {
																h[e] += parseInt(a(this)
																		.css("height"))
															}), !a.browser.msie) {
												a(d[e]).find(".favorite")
														.size() > 0
														&& (h[e] += 32);
												a(d[e]).find(".who_share_s")
														.size() > 0
														&& (h[e] += 50);
												if (a(d[e])
														.find(".tweet_content")
														.size() > 0) {
													j = a(d[e])
															.find(".tweet_content")
															.clone();
													j.find("img").remove();
													var g = a.trim(j.html()).length
															- 48;
													h[e] += 19
															* Math.ceil(g / 25)
															+ 5;
													j.remove()
												}
												a(d[e]).find(".rep_list")
														.size() > 0
														&& (a(d[e])
																.find(".rep_list li")
																.each(
																		function() {
																			h[e] += 20
																		}), h[e] += 8)
											}
										j = h.slice();
										j.sort(function(a, b) {
													return a - b
												});
										for (e = j.length - 1; e >= 0; e--)
											g = a.inArray(j[e], h), h[g] = -1, i
													.push(d[g]);
										m = m.concat(i);
										o = !1;
										n = b.result.data.lastTweetId;
										(v = b.result.data.is_end)
												? (q = b.result.html.pagination, u = !0, clearTimeout(p))
												: s();
										b = log_stat_url_tmp
												+ "&refer="
												+ encodeURIComponent(c.ajax_url)
												+ "&rerefer="
												+ encodeURIComponent(window.location.href)
												+ "&anchor=" + log_stat_anchor;
										a.ajax({
													url : b,
													type : "post",
													dataType : "jsonp",
													jsonpCallback : "logCallBack",
													success : function() {
													}
												})
									} else
										a("#" + l.loading_id).remove(), o = !1
							}
						})
					}, s = function() {
						if (!o && !u) {
							clearTimeout(p);
							var b = Math.max(document.body.scrollHeight,
									document.documentElement.scrollHeight)
									- Math.min.apply(Math, d)
									- MGTOOL.getAbsoluteLocation(a("."
											+ c.container_class)[0]).absoluteTop;
							MGTOOL.distance2Bottom(b + 1500) && m.length < 5
									|| MOGUPROFILE.bookajaxnow == "1"
									? (MOGUPROFILE.bookajaxnow = "0", z())
									: p = setTimeout(s, 500)
						}
					}, y = function() {
						if (v && m.length == 0) {
							a("." + c.container_class)
									.after('<div class="image_wall_more clr "></div>');
							x();
							if (!MGTOOL.empty(q)) {
								a(".image_wall_more").prepend(q);
								if (MOGUPROFILE.is_subsite != "1") {
									var b = window.location.toString();
									(b.indexOf("/book/") > 0 || b
											.indexOf("/shopping") > 0)
											&& a(".image_wall_more")
													.after('<div id="ad_tanx_note_middle_show" class="mt20 pb20"><iframe src="/page/mbs/mbs03" frameborder="0" width="960" height="90" scrolling="no" frameborder="0"></iframe></div>')
								}
								MOGUPROFILE.page_tpl
										&& (a(".page_num input").focus(
												function() {
													a(".allpage").show()
												}), a(".page_num input").blur(
												function() {
													a(".allpage").hide()
												}), a(".page_num a").click(
												function() {
													var b = a(".page_num input")
															.val();
													b != "" && !isNaN(b)
															? (b = MOGUPROFILE.page_tpl
																	.replace(
																			/{page}/g,
																			b)
																	.replace(
																			/&amp;/g,
																			"&"), window.location.href = b)
															: isNaN(b)
																	&& (a(".page_num input")
																			.val(""), alert("\u8bf7\u8f93\u5165\u6570\u5b57"))
												}))
							}
							c.end_callback && c.end_callback("image_wall_more");
							var g = function(b) {
								a.ajax({
											url : b,
											type : "POST",
											timeout : 6E4,
											async : !1,
											dataType : "json",
											success : function() {
											}
										})
							}, b = function() {
								a(".pagination").size() == 0
										&& a(".image_wall_more")
												.prepend('<div class="pagination pd_tb"></div>')
							};
							if (MOGUPROFILE.showParent) {
								var i = "/book/girlladyguide?stat=parent", f = MOGUPROFILE.showParent_name, k = MOGUPROFILE.showParent_url
										.replace(/&amp;/g, "&"), f = '<a href="javascript:;" class="lady_btn">\u53bb\u201c'
										+ f + "\u201d\u901b\u901b</a>";
								b();
								a(".pagination").prepend(f);
								a(".pagination .lady_btn").click(function() {
											window.location.href = k;
											g(i)
										})
							}
							if (MOGUPROFILE.showGirl) {
								var i = "/book/girlladyguide?stat=girl", l = MOGUPROFILE.showGirl_url
										.replace(/&amp;/g, "&");
								b();
								a(".pagination")
										.append('<a href="javascript:;" class="girl_btn">\u6362\u6210<b></b>Girl\u98ce\u683c\u770b\u770b</a>');
								a(".pagination .girl_btn").click(function() {
											window.location.href = l;
											g(i)
										})
							}
							if (MOGUPROFILE.showLady) {
								var i = "/book/girlladyguide?stat=lady", j = MOGUPROFILE.showLady_url
										.replace(/&amp;/g, "&");
								a(".image_wall_more")
										.append('<div class="wall_bottom_bg"><a class="w_l_c" href="javascript:;"></a><span>\u60f3\u770b\u4e0d\u540c\u98ce\u683c\u7684\u5b9d\u8d1d\u5417?</span><a class="w_b_l" href="javascript:;">\u53bb<b></b>Lady\u98ce\u683c\u901b\u901b</a></div>');
								a(".wall_bottom_bg .w_l_c").click(function() {
											a(".wall_bottom_bg").remove()
										});
								a(".wall_bottom_bg .w_b_l").click(function() {
											window.location.href = j;
											g(i)
										})
							}
						} else {
							if (m.length > 0) {
								var b = a(m.shift()), f = d.indexOf(Math.min
										.apply(Math, d)), h = w[f];
								h.append(b);
								d[f] = h.height() + h.offset().top
							}
							setTimeout(y, c.sort_interval)
						}
					};
					setTimeout(y, c.sort_interval);
					p = setTimeout(s, c.check_interval)
				}
			}
		}
	}
})(jQuery);
(function(a) {
	MGTEMPLATE.favTip_ok = '<div id="fav_tip" class="fav_tip"><div class="fok"><a href="javascript:;" onclick="MOGU.Fav_Reason_Add_Init(\'{tid}\',\'{editid}\',\'{favid}\',\'{where}\')">\u518d\u7ed9\u4e2a\u8bc4\u8bba\u5427~</a></div></div>';
	MGTEMPLATE.favTip_had = '<div id="fav_tip" class="fav_tip"><div class="ffail"><span>\u559c\u6b22\u8fc7\u4e86</span><a href="javascript:;" onclick="MOGU.Favorite_Del(\'{favid}\',\'{twitterid}\')">\u5220\u6389</a></div></div>';
	MGTEMPLATE.favTip_had_jia = '<div id="fav_tip" class="fav_tip"><div class="fail_jia"><a href="javascript:;" class="del" onclick="MOGU.Favorite_Del(\'{favid}\',\'{twitterid}\')">\u5220\u6389</a></div></div>';
	MGTEMPLATE.favTip_me = '<div id="fav_tip" class="fav_tip"><div class="ffail">\u8fd9\u662f\u4f60\u81ea\u5df1\u7684\u54e6</div></div>';
	MGTEMPLATE.favForward = '<p class="fw_root">{rootTweet}</p><div class="fw_pub_area"><div class="fwpa_tool"><a href="javascript:;"><img class="fl add_face" style="margin-top:5px" w="fw" src="/img/add_face_c.png"></a><span class="fw_count">\u8fd8\u53ef\u4ee5\u8f93\u5165<b>140</b>\u4e2a\u6c49\u5b57</span></div><textarea class="fw_content">{tweet}</textarea><div class="fw_submit_box">{is_forword_root_tweet}<div class="sub_div" rtid="{rtid}"><a href="javascript:;" class="fw_submit"><img src="/img/confirm_btn.png"></a><a class="fw_cancel" href="javascript:;">\u53d6\u6d88</a></div></div></div>';
	MOGU.Book_Favorite = function() {
		a(".imagewall").attr("is_me");
		a(".i_w_f .favorite a.favaImg").live("click", function() {
			if (MOGUPROFILE.userid == "") {
				MOGU.user_handsome_login_init();
				var b = a(this);
				MOGU.user_handsome_login(!1, {
							callback : function() {
								b.click()
							}
						})
			} else if (a(this).data("submit") != 1) {
				a(this).data("submit", 1);
				a("#fav_tip").remove();
				a("#fav_yaya").remove();
				var b = this, d = a(b).parents(".i_w_f"), c = d.attr("tid"), i = MGTOOL
						.getAbsoluteLocation(b), e = a(this).attr("fc"), h = d
						.find(".pic img").first().attr("src").replace(
								"180x999", "100x100"), e = {
					twitterid : c,
					content : "\u6211\u559c\u6b22\u8fd9\u4e2a\uff0c\u8c22\u8c22\u4f60\u7684\u5206\u4eab[\u5fc3]",
					local : MOGUPROFILE.local,
					imgsrc : h,
					from_cate : e
				};
				if (h = a(this).attr("bwp"))
					e.bwp = h;
				if (h = a(this).attr("valid"))
					e.valid = h;
				a.ajax({
					url : "/collect/favtwitter",
					type : "POST",
					timeout : 6E4,
					data : e,
					dataType : "json",
					success : function(f) {
						if (f == null)
							alert(MGLANG.msgTimeout);
						else {
							var g = f.status.code, e = f.status.msg;
							g == 1001
									? (show_tip = !1, g = f.result.data.cfav, a(b)
											.next(".favDiv")[0]
											? (a(b).next(".favDiv")
													.find(".favCount").text(g), MOGUPROFILE.is_subsite == "1"
													&& a(b)
															.nextAll(".fav_show")
															.find("p")
															.html(g
																	+ "\u4eba\u559c\u6b22"))
											: (a(b)
													.after('<div class="favDiv"><a class="favCount" target="_blank" href="/note/'
															+ c
															+ '">1</a><i></i></div>'), MOGUPROFILE.is_subsite == "1"
													&& a(b)
															.nextAll(".fav_show")
															.find("p")
															.html("1\u4eba\u559c\u6b22")), MOGU
											.Image_Wall_Show_Fav_Reply_Box(d, {
														editid : f.result.data.tid,
														favid : f.result.data.id,
														retweetId : c
													}))
									: g == 6002
											? MOGUPROFILE.is_subsite == "1"
													? (show_tip = !1, tip_html = MGTEMPLATE.favTip_had_jia
															.replace(
																	/{favid}/g,
																	f.result.data.id)
															.replace(
																	/{twitterid}/g,
																	c), a("body")
															.append(tip_html), a("#fav_tip")
															.css({
																top : i.absoluteTop
																		- 60
																		+ "px",
																left : i.absoluteLeft
																		- 28
																		+ "px",
																width : "196px"
															}).show(), setTimeout(
															function() {
																a("#fav_tip")
																		.remove()
															}, 3E3), a("#fav_tip")
															.hover(function() {
																clearTimeout(h);
																a("#fav_tip,#fav_yaya")
																		.show()
															}, function() {
																clearTimeout(h);
																setTimeout(
																		function() {
																			a("#fav_tip")
																					.remove()
																		}, 3E3)
															}))
													: (tip_html = MGTEMPLATE.favTip_had
															.replace(
																	/{favid}/g,
																	f.result.data.id)
															.replace(
																	/{twitterid}/g,
																	c), show_tip = !0)
											: g == 6003
													? (tip_html = MGTEMPLATE.favTip_me
															.replace(
																	/{uid}/g,
																	MOGUPROFILE.userid), show_tip = !0)
													: g == 2034
															? (show_tip = !1, f = f.result.data.favs, f = parseInt(f)
																	+ 1, f < 5
																	? (g = "", f == 1
																			? g = "http://www.mogujie.com/book/shoes/"
																			: f == 2
																					? g = "http://www.mogujie.com/book/bags/"
																					: f == 3
																							? g = "http://www.mogujie.com/book/accessories/"
																							: f == 4
																									&& (g = "http://www.mogujie.com/book/home/"), f = {
																		title : "\u7b2c\u4e8c\u6b65\uff1a\u559c\u6b22\u6709\u5956",
																		lightBoxId : "lb_jifenbao_second_step_two",
																		scroll : !0,
																		isBgClickClose : !1,
																		contentHtml : '<div class="all_main"><div class="prompt">\u60a8\u5df2\u7ecf\u559c\u6b22\u4e86\u7b2c'
																				+ f
																				+ "\u4ef6\u5b9d\u8d1d\uff0c\u53bb\u6311\u7b2c"
																				+ (f + 1)
																				+ '\u4ef6\u5427\u3002</div><div class="go_register"><a href="'
																				+ g
																				+ '">&nbsp;</a></div></div>'
																	})
																	: f = {
																		title : "\u7b2c\u4e8c\u6b65\uff1a\u559c\u6b22\u6709\u5956",
																		lightBoxId : "lb_jifenbao_second_step_three",
																		scroll : !0,
																		isBgClickClose : !1,
																		contentHtml : '<div class="all_main"><div class="prompt">\u606d\u559c\u60a8\u5b8c\u6210\u8611\u83c7\u8857\u559c\u6b22\u5b9d\u8d1d\u6b65\u9aa4\uff0c\u60a8\u5c06\u83b7\u5f9715\u4e2a\u96c6\u5206\u5b9d</div><div class="go_register"><a href="/webapp/jifenbao">&nbsp;</a></div></div>'
																	}, (new MGLightBox(f))
																	.init())
															: alert(e);
							if (show_tip) {
								a("body")
										.append('<div id="fav_yaya" class="fav_yaya"></div>');
								a("#fav_yaya").css({
											top : i.absoluteTop + "px",
											left : i.absoluteLeft + 10 + "px"
										}).floatUp({
											time : 500
										});
								a("body").append(tip_html);
								setTimeout(function() {
											a("#fav_tip").css({
												top : i.absoluteTop - 25 - 71
														+ "px",
												left : i.absoluteLeft - 28
														+ "px"
											}).show()
										}, 500);
								var h = setTimeout(function() {
											a("#fav_tip,#fav_yaya").remove()
										}, 3E3);
								a("#fav_tip,#fav_yaya").hover(function() {
											clearTimeout(h);
											a("#fav_tip,#fav_yaya").show()
										}, function() {
											clearTimeout(h);
											h = setTimeout(function() {
														a("#fav_tip,#fav_yaya")
																.remove()
													}, 3E3)
										})
							}
						}
					},
					error : function(a, c) {
						"timeout" == c && alert(MGLANG.msgTimeout)
					},
					complete : function() {
						setTimeout(function() {
									a(b).removeData("submit")
								}, 4E3)
					}
				})
			}
		})
	};
	MOGU.Image_Wall_Reply_Init = function() {
		a(".favorite .creply").live("click", function() {
					console.log(122333);
					if (MOGUPROFILE.userid == "")
						MOGU.user_handsome_login_init(), MOGU
								.user_handsome_login();
					else {
						var b = a(this).parents(".i_w_f");
						MOGU.Image_Wall_Show_Reply_Box(b, "cmt", {})
					}
					return !1
				})
	};
	MOGU.Image_Wall_Reply_Init();
	MOGU.Image_Wall_Show_Reply_Box = function(b, d, c) {
		MGTEMPLATE.book_pub_content_frame = '<div id="reply_body" class="rep_bd" type="{type}">{pub_content}</div>';
		MGTEMPLATE.book_pub_content = '<i class="{tip_class}"></i><div class="i_w_rep r5">{yaya}<textarea class="rep_cont r3">{content}</textarea><div class="i_w_pub clearfix"><a href="javascript:;"><img class="fl add_face" style="margin-top:5px" w="book_rpl" onclick="return false;" src="/img/add_face_c.png"></a><a class="pub fr" href="javascript:;" id="book_'
				+ d + '_{tid}">{btn}</a></div></div>';
		var i = "", e = "", h = "", f = "";
		if ("cmt" == d)
			i = "tri_tip_r", e = "\u559c\u6b22\u5c31\u8bf4\u4e24\u53e5\u5427", h = "\u53d1\u8868";
		else if ("fav" == d)
			i = "tri_tip_l", e = "\u6c42\u8bc4\u8bba\uff01", h = "\u786e\u5b9a", f = '<img style="margin:0 0 -5px 10px;" src="/img/imgwall_cmt_yaya.png">';
		else
			return;
		var g = b.attr("tid");
		b.find("#reply_body").size() == 0 && a("#reply_body").size() != 0
				&& a("#reply_body").remove();
		if (b.find("#reply_body").size() != 0)
			if (a("#reply_body").attr("type") == d)
				a("#reply_body").slideUp(function() {
							a("#reply_body").remove()
						});
			else {
				a("#reply_body").attr("type", d);
				a("#reply_body").html(MGTEMPLATE.book_pub_content.replace(
						/{tip_class}/, i).replace(/{content}/, e).replace(
						/{btn}/, h).replace(/{yaya}/, f).replace(/{tid}/, g));
				var j = a("#reply_body .rep_cont");
				MOGU.Globe_Input_Text(j);
				MOGU.Globe_Bind_Keybord_Submit(j, a("book_" + d + "_" + g));
				if ("cmt" == d)
					c.replyId = g, MOGU.Image_Wall_Reply(c,
							"/replytwitter/add", e);
				else if ("fav" == d)
					c.retweetId = g, MOGU.Image_Wall_Reply(c,
							"/twitter/editfav", e)
			}
		if (a("#reply_body").size() == 0)
			if (b = b.find(".bd"), i = MGTEMPLATE.book_pub_content_frame
					.replace(/{type}/, d)
					.replace(
							/{pub_content}/,
							MGTEMPLATE.book_pub_content.replace(/{tip_class}/,
									i).replace(/{content}/, e).replace(/{btn}/,
									h).replace(/{yaya}/, f).replace(/{tid}/, g)), b
					.append(i), j = a("#reply_body .rep_cont"), a("#reply_body")
					.slideDown(300, function() {
						MOGU.Globe_Bind_Keybord_Submit(j, a("#book_" + d + "_"
										+ g))
					}), MOGU.Globe_Input_Text(j), "cmt" == d)
				c.replyId = g, MOGU.Image_Wall_Reply(c, "/replytwitter/add", e);
			else if ("fav" == d)
				c.retweetId = g, MOGU
						.Image_Wall_Reply(c, "/twitter/editfav", e);
		a("#reply_body .add_face").click(function() {
			a("#reply_body .rep_cont").val() == e
					&& a("#reply_body .rep_cont").val("")
		})
	};
	MOGU.Image_Wall_Show_Fav_Reply_Box = function(b, d) {
		MGTEMPLATE.book_fav_pub_box = '<div id="reply_body" class="fav_say s" ><div class="fav_say_bg"></div><input class="t" type="text" value="\u6c42\u8bc4\u8bba\uff01"><textarea class="rep_cont">\u6c42\u8bc4\u8bba\uff01</textarea><div class="tb"><img class="fl add_face" w="book_rpl" onclick="return false;" src="/img/add_face_c.png"><a class="pub fr" href="javascript:;">\u786e\u5b9a</a></div></div>';
		a("#reply_body").remove();
		a("body").append(MGTEMPLATE.book_fav_pub_box);
		var c = a("#reply_body");
		c.css({
					left : b.offset().left,
					top : b.find(".favorite").offset().top - 89
				});
		MOGU.Globe_Input_Text(c.find(".rep_cont"));
		MOGU.Globe_Bind_Keybord_Submit(c.find(".rep_cont"), c.find(".pub"));
		c.find(".t").click(function() {
					c.removeClass("s").addClass("b");
					c.css({
								top : b.find(".favorite").offset().top - 137
							});
					c.find(".rep_cont").val("").focus()
				});
		var i = b.attr("tid");
		d.retweetId = i;
		MOGU.Image_Wall_Reply(d, "/twitter/editfav",
				"\u6c42\u8bc4\u8bba\uff01", b);
		var e = setTimeout(function() {
					c.remove()
				}, 3E3);
		c.hover(function() {
					clearTimeout(e)
				}, function() {
					clearTimeout(e);
					e = setTimeout(function() {
								a("#lb_face").size() == 0 && c.remove()
							}, 3E3)
				});
		c.find(".add_face").click(function() {
			clearTimeout(e);
			c.find(".rep_cont").val() == "\u6c42\u8bc4\u8bba\uff01"
					&& c.find(".rep_cont").val("")
		})
	};
	MOGU.Image_Wall_Reply = function(b, d, c, i) {
		a("#reply_body .pub").click(function() {
			var e = a("#reply_body .rep_cont").val(), h = i;
			if (i == void 0 || i == void 0)
				h = a(this).parents(".i_w_f");
			if (e == c || e == "")
				return alert("\u8bf7\u8f93\u5165\u5185\u5bb9\uff01"), !1;
			b.content = e;
			b.print = 4;
			a.ajax({
				url : d,
				type : "POST",
				timeout : 6E4,
				data : b,
				dataType : "json",
				success : function(c) {
					if (c == null)
						alert(MGLANG.msgTimeout);
					else {
						var b = c.status.msg;
						c.status.code == 1001
								? (a("#reply_body").remove(), c = c.result, b = h
										.find(".reply_l"), b.size() == 0
										&& (h
												.find(".ws_ft")
												.before('<ul class="rep_list reply_l"></ul>'), b = h
												.find(".reply_l")), b
										.append(doT
												.template('<li class="rep_f"><a href="/u/{{= it.userId }}" target="_blank"><img alt="{{= it.uname }}" class="avt icard fl r3" src="{{= it.avatar }}"></a><p class="rep_content"><a class="n icard fl" href="/u/{{= it.userId }}" target="_blank">{{= it.uname }}</a>\uff1a{{= it.content }}</p></li>')(c)), b
										.find(".rep_f").last().hide()
										.slideDown())
								: alert(b)
					}
				},
				error : function(a, c) {
					"timeout" == c && alert(MGLANG.msgTimeout)
				}
			})
		})
	};
	MOGU.Book_Add_To_Album_Init = function() {
		a(".i_w_f .pic li").live({
			mouseenter : function() {
				var b = a(this), d = b.find(".add_to_album_btn");
				d.length == 0
						? b
								.append('<a href="javascript:;" class="add_to_album_btn"></a>')
						: d.show()
			},
			mouseleave : function() {
				a(this).find(".add_to_album_btn").hide()
			}
		});
		a(".i_w_f .favorite, .i_w_f .rep_list, .i_w_f .tweet_content, .i_w_f .who_share_b")
				.live({
					mouseenter : function() {
						var b = a(this), d = b.parent().find(".pic li").last()
								.find(".add_to_album_btn");
						d.length == 0
								? b
										.parent()
										.find(".pic li")
										.last()
										.append('<a href="javascript:;" class="add_to_album_btn"></a>')
								: d.show()
					},
					mouseleave : function() {
						a(this).parent().find(".add_to_album_btn").hide()
					}
				});
		a(".i_w_f .add_to_album_btn").live("click", function() {
			var b = a(this).parent(), d = a(this).parents(".i_w_f").attr("tid");
			MOGU.Add_To_Album_Init(b, d)
		})
	};
	MOGU.Book_Delete_My_Photo = function() {
		var b = a(".imagewall").attr("is_me");
		if (b != "0" && b == "1") {
			var d = '<a class="del_pic" href="javascript:;" title="\u5220\u9664"></a>';
			a("#photowall_container").attr("w") == "fav"
					&& (d = '<a class="del_pic" href="javascript:;" title="\u4e0d\u559c\u6b22\u4e86"></a>');
			a(".imagewall .i_w_f").live({
				mouseenter : function() {
					var c = a(this);
					c.hasClass("no_del")
							|| (c.find(".del_pic").size() == 0
									&& c.find(".guess_tag").size() == 0
									&& c.find(".know_it").size() == 0 ? c
									.prepend(d) : c.find(".del_pic").show())
				},
				mouseleave : function() {
					a(this).find(".del_pic").hide()
				}
			});
			a(".i_w_f .del_pic").live("click", function() {
				var c = a(this).parents(".i_w_f"), b = "", d = {}, b = c
						.attr("tid");
				a("#photowall_container").attr("w") == "fav"
						? (b = c.attr("favid"), d.id = b, b = "/collect/delfav")
						: (d.twitterid = b, b = "/twitter/delete");
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
											? c.slideUp()
											: alert(b)
								}
							},
							error : function(a, b) {
								"timeout" == b && alert(MGLANG.msgTimeout)
							},
							complete : function() {
							}
						})
			})
		}
	};
	MOGU.Book_Siderbar = function() {
		(a(".show_history_btn").length > 0 || a(".tid_view").length > 0)
				&& a(".back2top_fat .b_img")
						.after('<a id="history_a" href="/history" target="_blank" alt="\u6d4f\u89c8\u5386\u53f2">\u6d4f\u89c8\u5386\u53f2</a>')
	};
	MOGU.Book_Siderbar();
	a(".imagewall").size() != 0
			? (MOGU.Book_Favorite(), MOGU.Book_Add_To_Album_Init(), MOGU
					.Book_Delete_My_Photo())
			: setTimeout(function() {
				a(".imagewall").size() != 0
						&& (MOGU.Book_Favorite(), MOGU.Book_Add_To_Album_Init(), MOGU
								.Book_Delete_My_Photo())
			}, 2E3)
})(jQuery);
(function(b) {
	MOGU.Module_Comment_Pub = function(h, e) {
		b(".comment_pub_box .conmment_list li").live({
					mouseenter : function() {
						b(this).find(".rpl").show()
					},
					mouseleave : function() {
						b(this).find(".rpl").hide()
					}
				});
		b(".comment_pub_box .conmment_list .rpl").live("click", function() {
			var a = b(this).parents(".comment_pub_box");
			a.find(".pub_content");
			var a = a.find(".pub_content"), c = b(this).parent("")
					.find(".name").text();
			b(this).attr("tid");
			b(this).attr("uid");
			a.val("\u56de\u590d@" + c + ":");
			MOGU.Globe_Range_Input(a)
		});
		var f = b(".comment_pub_box .submit");
		MOGU.Globe_Bind_Keybord_Submit(b(".comment_pub_box .pub_content"), f,
				"need_focus");
		f.click(function() {
			var a = b(this).parents(".comment_pub_box"), c = a
					.find(".pub_content"), d = MGTOOL.trim(c.val()), f = a
					.find(".conmment_list"), i = c.attr("def_val"), a = a
					.attr("tid"), a = {
				content : d,
				replyId : a,
				commentId : "",
				commentUserId : ""
			};
			if (e)
				for (var g in e)
					e[g] && (a[g] = e[g]);
			if (d.length == 0 || d == i)
				return alert("\u8bf7\u8f93\u5165\u5185\u5bb9"), !1;
			else if (d.length > 140)
				return alert("\u5185\u5bb9\u8d85\u8fc7140\u4e2a\u5b57"), !1;
			else
				c.val(""), b.ajax({
					url : h,
					type : "POST",
					data : a,
					timeout : 6E4,
					dataType : "json",
					success : function(a) {
						if (a == null)
							alert(MGLANG.msgTimeout);
						else {
							var b = a.status.msg;
							a.status.code == 1001
									? (a = a.result.comment, f
											.prepend(doT
													.template('<li><a target="_blank" href="/u/{{= it.userId }}"><img src="{{= it.avatar }}" class="icard avt fl r3" alt="{{= it.avatar }}"></a><p class="comment" uid="{{= it.userId }}" tid="{{= it.twitterId }}"><a class="name" href="/u/{{= it.userId }}">{{= it.uname }}</a> : {{= it.content }}<a href="javascript:;" class="rpl fr">\u56de\u590d</a></p></li>')(a)))
									: (alert(b), c.val(d))
						}
					},
					error : function() {
						alert(MGLANG.msgTimeout);
						c.val(d)
					}
				})
		});
		MOGU.Globe_Input_Text(b(".comment_pub_box .pub_content"));
		b(".pub_bottom .add_face").click(function() {
			var a = b(this).parents(".comment_pub_box").find(".pub_content"), c = a
					.attr("def_val");
			a.val() == c && a.val("")
		})
	}
})(jQuery);
(function(a) {
	MOGU.Album_Add_Follow = function() {
		a(".album_intro .title").text();
		a(".follow_album .follow_it").live("click", function() {
			var b = a(this), e = b.parents(".follow_album"), d = e.attr("aid"), c = "\u4e13\u8f91\u300a"
					+ MGTOOL.trim(a(".album_nav_h1").text())
					+ "\u300b\u5f88\u8d5e\uff0c\u5076\u559c\u6b22[\u5475\u5475]";
			a.ajax({
				url : "/album/follow_album",
				type : "POST",
				timeout : 6E4,
				data : {
					albumId : d,
					content : c
				},
				dataType : "json",
				success : function(c) {
					if (c == null)
						alert(MGLANG.msgTimeout);
					else {
						var b = c.status.msg;
						c.status.code == 1001
								? (b = new MGLightBox({
											title : "\u6536\u85cf\u4e13\u8f91",
											lightBoxId : "lb_album_look_id",
											scroll : !0,
											isBgClickClose : !1
										}), b.init(), c = c.result.albumFollowedNum, a(".user_count")
										.text(c + "\u4eba"), b
										.success_close("\u6536\u85cf\u4e13\u8f91\u6210\u529f"), e
										.find(".s")
										.html('<span class="followed">\u5df2\u6536\u85cf</span><a href="javascript:;" class="c">\u53d6\u6d88</a>'))
								: alert(b)
					}
				},
				error : function(a, c) {
					"timeout" == c && alert(MGLANG.msgTimeout)
				},
				complete : function() {
					setTimeout(function() {
								a(b).removeData("submit")
							}, 4E3)
				}
			})
		});
		a(".follow_album .cancel_album_tuijian").live("click", function() {
			if (!window
					.confirm("\u4f60\u786e\u5b9a\u53d6\u6d88\u6536\u85cf\u5417\uff1f"))
				return !1;
			var b = a(this), e = b.parents(".follow_album"), d = e.attr("aid");
			a.ajax({
				url : "/album/unfollow_album",
				type : "POST",
				timeout : 6E4,
				data : {
					albumId : d
				},
				dataType : "json",
				success : function(c) {
					if (c == null)
						alert(MGLANG.msgTimeout);
					else {
						var b = c.status.msg;
						c.status.code == 1001
								? (c = c.result.albumFollowedNum, a(".user_count")
										.text(c + "\u4eba"), e
										.find(".s")
										.html('<a class="follow_it" href="javascript:;">\u6536\u85cf\u4e13\u8f91</a>'))
								: alert(b)
					}
				},
				error : function(a, b) {
					"timeout" == b && alert(MGLANG.msgTimeout)
				},
				complete : function() {
					setTimeout(function() {
								a(b).removeData("submit")
							}, 4E3)
				}
			})
		})
	};
	MOGU.Album_Del_Album = function() {
		a(".add_album_content .delete, .edit_album .delete").click(function() {
			if (window
					.confirm("\u5220\u9664\u4e13\u8f91\uff0c\u4e13\u8f91\u91cc\u6240\u6709\u7684\u56fe\u7247\u90fd\u4f1a\u88ab\u5220\u9664\u54e6\uff01\n\u4f60\u786e\u5b9a\u8981\u5220\u9664\u6b64\u4e13\u8f91\u5417\uff1f")) {
				var b = MOGUPROFILE.userid, e = {
					albumId : a(this).attr("aid")
				};
				a.ajax({
							url : "/album/delalbumajax",
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
											? window.location = "/u/" + b
													+ "/album/"
											: alert(c)
								}
							},
							error : function(a, c) {
								"timeout" == c && alert(MGLANG.msgTimeout)
							},
							complete : function() {
							}
						})
			}
		})
	};
	MOGU.Album_Add_Content = function() {
		if (a(".add_album_content").size() != 0) {
			MOGU.Globe_Input_Text(a(".add_album_content .url"));
			var b = a(".add_album_content").attr("aid"), e = null, d = null, c = null, f = function(
					a, b) {
				c = new MGLightBox({
					title : '\u52a0\u5165\u4e13\u8f91<span>(<a href="/webapp/shoushou/">\u201c\u8611\u6cd5\u6536\u6536\u201d\u5e2e\u4f60\u53d1\u8868\u66f4\u5feb\u66f4\u65b9\u4fbf</a>)</span>',
					lightBoxId : a,
					contentHtml : '<div class="lb_upload posr clearfix"></div>',
					scroll : b,
					isBgClickClose : !1
				});
				c.init();
				e = c.getBoxFrame()
			}, h = function(b, f) {
				if ("img" == b) {
					for (var d = [], h = [], d = f.pics, g = d.length, m = 0; m < g; m++)
						m % 4 == 3
								? h
										.push('<li {style}><div class="pic"><img src="{src}" ><a class="cancel" href="javascript:;"></a></div><div class="text mt5"><textarea></textarea><div>\u70b9\u51fb\u6dfb\u52a0\u63cf\u8ff0</div></div></li>'
												.replace(/{src}/, d[m])
												.replace(/{style}/,
														'class="mr0"'))
								: h
										.push('<li {style}><div class="pic"><img src="{src}" ><a class="cancel" href="javascript:;"></a></div><div class="text mt5"><textarea></textarea><div>\u70b9\u51fb\u6dfb\u52a0\u63cf\u8ff0</div></div></li>'
												.replace(/{src}/, d[m])
												.replace(/{style}/, ""));
					d = '<ul class="pic_edit clr clearfix pt15">'
							+ h.join("")
							+ '</ul><button class="sub_btn ml15 r3">\u786e\u5b9a</button>';
					c.buildContent(d);
					a(".pic_edit .text div").hover(function() {
								a(this).addClass("h")
							}, function() {
								a(this).removeClass("h")
							}).click(function() {
								a(this).hide();
								a(this).prev().show().focus()
							});
					var r = function(b) {
						a(".mogunum").size() == 0
								? a(".sub_btn")
										.after('<span class="mogunum" style="color:#5555;font-size:14px;padding-left: 40px;">\u5df2\u9009\u62e9<em style="color:#690;font-weight: bold;padding:0 2px;font-style:normal;">1</em>\u5f20\u56fe\u7247</span>')
								: a(".mogunum em").text(b)
					};
					r();
					a("#lb_fillalbumimg .pic_edit li:first")
							.addClass("checked");
					a("#lb_fillalbumimg .pic_edit .pic:first")
							.append('<i class="select"></i>');
					a("#lb_fillalbumimg .pic_edit .pic").click(function() {
						var b = a(this);
						b.parents("li").hasClass("checked") ? (b
								.find(".select").remove(), b.parents("li")
								.removeClass("checked")) : b
								.append('<i class="select"></i>').parents("li")
								.addClass("checked");
						b = a(".pic_edit").find("li.checked").length;
						r(b)
					});
					p()
				} else
					"goods" == b
							&& (d = '<div class="lb_form clearfix"><div class="fl simg"><img src="{src}">{price}</div><div class="lb_edit_box fl"><textarea class="cont">\u6dfb\u52a0\u63cf\u8ff0</textarea><input type="button" class="btn r3 mt10" value="\u786e\u5b9a"></div></div>'
									.replace(/{src}/, f.imgsrc), f.price
									&& (d = d.replace(/{price}/, "<span>\u00a5"
													+ f.price + "</span>")), c
									.buildContent('<div class="lb_upload posr clearfix">'
											+ d + "</div>"), MOGU
									.Globe_Input_Text(e
											.find(".lb_edit_box .cont")), q())
			}, j = function(b) {
				var f = a.ajax({
					url : "/twitter/goodsinfo",
					type : "POST",
					timeout : 6E4,
					data : {
						url : b
					},
					dataType : "json",
					success : function(a) {
						if (a == null)
							alert(MGLANG.msgTimeout);
						else {
							var f = a.status.msg;
							if (a.status.code == 1001) {
								var g = a.result.data.detail, a = g.num_id, f = g.iid == ""
										|| g.iid == void 0 ? null : g.iid, e = g.pic_url, o = g.pic_url;
								if (g.pic_small != void 0)
									o = g.pic_small;
								var j = g.title, k = g.price, l = g.brand, l = l != null
										&& l.indexOf("\u5176\u4ed6") == -1
										? g.brand
										: null, n = g.shop_seller, p = g.from == void 0
										? null
										: g.from, q = g.currency == void 0
										? null
										: g.currency, s = g.cid == void 0
										? null
										: g.cid, g = g.tag == void 0
										? null
										: g.tag, i = {};
								i.iid = f;
								i.goodsUrl = b;
								i.picUrl = e;
								i.goodsShow = o;
								i.title = j.replace(/\\/g, "\\\\").replace(
										/\"/g, '\\"');
								i.price = k;
								l != null
										&& (l = l.replace(/\\/g, "\\\\")
												.replace(/\"/g, '\\"'));
								i.brand = l;
								i.unick = n;
								i.from = p;
								i.cid = s;
								i.tag = g;
								i.currency = q;
								d = {};
								d[a] = i;
								h("goods", {
											imgsrc : o,
											price : k
										})
							} else
								alert(f), c.close()
						}
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout);
						c.close()
					}
				});
				c.startAjax(f)
			}, k = function(b) {
				b = a.ajax({
					url : "/collect/getpics",
					type : "POST",
					timeout : 6E4,
					data : {
						url : b
					},
					dataType : "json",
					success : function(a) {
						a == null
								? alert(MGLANG.msgTimeout)
								: a.status.code == 1001
										? (a = a.result.data, a.pics.length == 0
												? c
														.fail("\u6ca1\u6709\u5206\u6790\u51fa\u5408\u9002\u7684\u5546\u54c1\u6216\u56fe\u7247\uff0c\u6362\u4e2a\u94fe\u63a5\u8bd5\u8bd5")
												: h("img", a))
										: c
												.fail("\u8bf7\u8f93\u5165\u6709\u6548\u7684\u94fe\u63a5\uff0c\u6b64\u94fe\u63a5\u4e0d\u53ef\u7528")
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout);
						c
								.fail("\u8bf7\u8f93\u5165\u6709\u6548\u7684\u94fe\u63a5\uff0c\u6b64\u94fe\u63a5\u4e0d\u53ef\u7528")
					}
				});
				c.startAjax(b)
			}, q = function() {
				var b = {};
				a("#lb_fillalbumgoods .lb_upload .btn").click(function() {
					if (!b.goods)
						d != null
								? b.goods = MGTOOL.objToJson(d)
								: alert("\u8bf7\u81f3\u5c11\u5206\u4eab\u4e00\u4ef6\u5546\u54c1\u3002");
					var c = a(".lb_edit_box .cont").val();
					MGTOOL.trim(c) == "\u6dfb\u52a0\u63cf\u8ff0" && (c = "");
					b.content = c;
					b.tab = 1;
					b.ifshowbook = 1;
					n(b, "/twitter/newtwitter", "goods", a(this))
				})
			}, p = function() {
				var b = {};
				a("#lb_fillalbumimg .sub_btn").click(function() {
					var c = [];
					a(".pic_edit li.checked").each(function() {
								c.push({
											imgs : [a(this).find("img")
													.attr("src")],
											content : a(this).find("textarea")
													.val()
										})
							});
					c = JSON.stringify(c);
					b.twitters = c;
					n(b, "/album/addtweetsajax", "img", a(this))
				})
			}, n = function(f, e, h, j) {
				f.albumId = b;
				f.local = MOGUPROFILE.local;
				a.ajax({
					url : e,
					type : "POST",
					timeout : 6E4,
					data : f,
					dataType : "json",
					beforeSend : function() {
						j.prop("disabled", !0);
						"goods" == h
								? j
										.after('<img src="/img/loading_green.gif" style="position: absolute;margin-left: 10px;margin-top:10px;">')
								: j
										.after('<img src="/img/loading_green.gif" style="position: absolute;margin-left: 10px;">')
					},
					success : function(b) {
						if (b == null || b == "")
							alert(MGLANG.msgTimeout), lpb_remove();
						else {
							var f = b.status;
							if (f == void 0 || f == null)
								alert(MGLANG.msgTimeout);
							else {
								var d = f.msg;
								if (f.code == 1001)
									if (a(".add_album_content .url").val(""), c
											.success_close(
													"\u52a0\u5165\u4e13\u8f91\u6210\u529f\uff01",
													1E3), "goods" == h) {
										b = b.result.html;
										f = a("#album_container");
										f.find(".col").size() == 0
												&& f
														.html('<div class="col"></div><div class="col"></div><div class="col"></div><div class="col mr0"></div>');
										f.find(".i_w_f_f").remove();
										var e = [];
										f.find(".col").each(function() {
													e.push(a(this).height())
												});
										if (!Array.indexOf)
											Array.prototype.indexOf = function(
													a) {
												for (var b = 0; b < this.length; b++)
													if (this[b] == a)
														return b;
												return -1
											};
										d = e.indexOf(Math.min.apply(Math, e));
										d = a("#album_container .col:eq(0)");
										d.find(".i_cmt").size() == 0 ? d
												.prepend(b) : d.find(".i_cmt")
												.after(b);
										b = f.find(".col");
										e = [];
										b.each(function() {
													e.push(a(this).height())
												});
										f = Math.max.apply(Math, e) + 26;
										for (d = 0; d < e.length; d++)
											a(b.get(d))
													.append('<div class="i_w_f_f"><div class="hd"></div><div class="bd" style="height:{h}px"></div><div class="ft"></div></div>'
															.replace(/{h}/,
																	f - e[d]))
									} else
										"img" == h && window.location.reload();
								else
									alert(d)
							}
						}
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout);
						c.close()
					},
					complete : function() {
						d = null;
						j.prop("disabled", !1);
						j.next().remove()
					}
				})
			};
			a(".add_album_content .url").focus(function() {
						this.select()
					});
			a(".add_album_content .add").click(function() {
				var b = a(".add_album_content .url").val(), d = b.replace(
						"http://", ""), d = d.substr(0, d.indexOf("/"));
				/mogujie.[com|cn]/i.test(d)
						? alert("\u4f60\u5c31\u5728\u8611\u83c7\u8857\u901b\u5462\uff0c\u4e0d\u80fd\u5206\u4eab\u672c\u7ad9\u56fe\u7247\u54e6\u3002")
						: b == ""
								|| b == "http://...\u5c0f\u6280\u5de7\uff1a\u8f93\u5165\u7f51\u5740\u5373\u53ef\u83b7\u53d6\u7f51\u9875\u4e2d\u6240\u6709\u56fe\u7247"
								? alert("\u8bf7\u8f93\u5165\u5730\u5740\u3002")
								: MOGU.Globe_Goods_URL_Support(b)
										? (f("lb_fillalbumgoods", !0), c
												.loading("\u6b63\u5728\u5206\u6790\uff0c\u8bf7\u7b49\u5f85..."), j(b))
										: (f("lb_fillalbumimg", !1), c
												.loading("\u6b63\u5728\u5206\u6790\uff0c\u8bf7\u7b49\u5f85..."), k(b))
			})
		}
	};
	MOGU.Note_Favorite_Add = function() {
		a(".dapei_item .favorite .favaImg").click(function() {
			if (MOGUPROFILE.userid == "")
				MOGU.user_handsome_login_init(), MOGU.user_handsome_login();
			else if (a(this).data("submit") != 1) {
				a(this).data("submit", 1);
				a("#fav_tip").remove();
				a("#fav_yaya").remove();
				var b = this, e = a(b).offset(), d = a(b)
						.parents(".dapei_item").attr("tid");
				MGTOOL.getAbsoluteLocation(b);
				var c = {
					twitterid : d,
					content : "\u6211\u559c\u6b22\u8fd9\u4e2a\uff0c\u8c22\u8c22\u4f60\u7684\u5206\u4eab[\u5fc3]"
				};
				a("body").append('<div id="fav_yaya" class="fav_yaya"></div>');
				a("#fav_yaya").css({
							top : e.top + "px",
							left : e.left + 10 + "px"
						}).floatUp({
							time : 500
						});
				a.ajax({
					url : "/collect/favtwitter",
					type : "POST",
					timeout : 6E4,
					data : c,
					dataType : "json",
					success : function(c) {
						if (c == null)
							alert(MGLANG.msgTimeout);
						else {
							var h = c.status.code, j = c.status.msg;
							h == 1001
									? (tip_html = MGTEMPLATE.favTip_ok.replace(
											/{tid}/g, d).replace(/{editid}/g,
											c.result.data.tid).replace(
											/{favid}/g, c.result.data.id)
											.replace(/{where}/g, "notenoall"), show_tip = !0, a(b)
											.parent(".favorite")
											.find(".favDiv")[0]
											? (c = parseInt(a(b)
													.parent(".favorite")
													.find(".favDiv a").text()), a(b)
													.parent(".favorite")
													.find(".favDiv a").text(c
															+ 1))
											: a(b)
													.after('<div class="favDiv"><span class="favCount" >1</span><i></i></div>'))
									: h == 6002
											? (tip_html = MGTEMPLATE.favTip_had
													.replace(/{favid}/g,
															c.result.data.id)
													.replace(/{twitterid}/g, d), show_tip = !0)
											: h == 6003
													? (tip_html = MGTEMPLATE.favTip_me
															.replace(
																	/{uid}/g,
																	MOGUPROFILE.userid), show_tip = !0)
													: h == 2034
															? (show_tip = !1, c = c.result.data.favs, c = parseInt(c)
																	+ 1, c < 5
																	? (h = "", c == 1
																			? h = "http://www.mogujie.com/book/shoes/"
																			: c == 2
																					? h = "http://www.mogujie.com/book/bags/"
																					: c == 3
																							? h = "http://www.mogujie.com/book/accessories/"
																							: c == 4
																									&& (h = "http://www.mogujie.com/book/home/"), c = {
																		title : "\u7b2c\u4e8c\u6b65\uff1a\u559c\u6b22\u6709\u5956",
																		lightBoxId : "lb_jifenbao_second_step_two",
																		scroll : !0,
																		isBgClickClose : !1,
																		contentHtml : '<div class="all_main"><div class="prompt">\u60a8\u5df2\u7ecf\u559c\u6b22\u4e86\u7b2c'
																				+ c
																				+ "\u4ef6\u5b9d\u8d1d\uff0c\u53bb\u6311\u7b2c"
																				+ (c + 1)
																				+ '\u4ef6\u5427\u3002</div><div class="go_register"><a href="'
																				+ h
																				+ '">&nbsp;</a></div></div>'
																	})
																	: c = {
																		title : "\u7b2c\u4e8c\u6b65\uff1a\u559c\u6b22\u6709\u5956",
																		lightBoxId : "lb_jifenbao_second_step_three",
																		scroll : !0,
																		isBgClickClose : !1,
																		contentHtml : '<div class="all_main"><div class="prompt">\u606d\u559c\u60a8\u5b8c\u6210\u8611\u83c7\u8857\u559c\u6b22\u5b9d\u8d1d\u6b65\u9aa4\uff0c\u60a8\u5c06\u83b7\u5f9715\u4e2a\u96c6\u5206\u5b9d</div><div class="go_register"><a href="/webapp/jifenbao">&nbsp;</a></div></div>'
																	}, (new MGLightBox(c))
																	.init())
															: alert(j);
							if (show_tip) {
								a("body").append(tip_html);
								setTimeout(function() {
											a("#fav_tip").css({
														top : e.top - 25 - 71
																+ "px",
														left : e.left - 15
																+ "px"
													}).show()
										}, 500);
								var k = setTimeout(function() {
											a("#fav_tip,#fav_yaya").remove()
										}, 3E3);
								a("#fav_tip,#fav_yaya").hover(function() {
											clearTimeout(k);
											a("#fav_tip,#fav_yaya").show()
										}, function() {
											clearTimeout(k);
											k = setTimeout(function() {
														a("#fav_tip,#fav_yaya")
																.remove()
													}, 3E3)
										})
							}
						}
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout)
					},
					complete : function() {
						setTimeout(function() {
									a(b).removeData("submit")
								}, 4E3)
					}
				})
			}
		})
	};
	MOGU.Album_Add_To_Album_Init = function() {
		a(".dapei_imglist li").hover(function() {
					a(this).find(".add_to_album_btn").show()
				}, function() {
					a(this).find(".add_to_album_btn").hide()
				});
		a(".add_to_album_btn").live("click", function() {
			var b = a(this).parents(".dapei_imglist li"), e = a(this)
					.parents(".dapei_imglist li").attr("tid");
			MOGU.Add_To_Album_Init(b, e)
		})
	};
	MOGU.Album_Commnet_List_Load = function() {
		var b = a(".note_comment .pagination"), e = a(".album_pub")[0].id
				.replace(/album_/, ""), d = function(c) {
			a.ajax({
				url : c,
				type : "POST",
				timeout : 6E4,
				data : {},
				dataType : "json",
				success : function(c) {
					if (c != null) {
						var d = c.status.msg;
						c.status.code == 1001
								? (d = c.result.html.list, c = c.result.html.pageinator, d != ""
										&& (a("#note_comment_list")[0]
												? a("#note_comment_list")
														.html(d)
												: a(".pub_box")
														.after('<ul class="c_l rb5" id="note_comment_list">'
																+ d + "</ul>"), b
												.html(c)))
								: alert(d)
					}
				},
				error : function() {
				}
			})
		};
		d("/replytwitter/newnote?twitterId=" + e);
		a(".note_comment .pagination a").live("click", function() {
					var b = a(this).attr("href");
					d(b);
					window.scrollTo(0, a("#pub_content").offset().top);
					return !1
				})
	};
	MOGU.Album_Commnet_Init = function() {
		MOGU
				.Globe_Input_Text(
						a("#pub_content"),
						"\u4f60\u4e5f\u53ef\u4ee5\u987a\u4fbf\u8bf4\u70b9\u4ec0\u4e48 O(\u2229_\u2229)O");
		MOGU.Globe_Bind_Keybord_Submit(a("#pub_content"), a("#pub_submit"),
				"need_focus");
		a("#pub_submit").click(function() {
			var b = a(".album_reply_content ")[0].id.replace(/album_/, ""), e = a("#pub_content");
			if (MOGUPROFILE.userid == "")
				MOGU.user_handsome_login_init(), MOGU.user_handsome_login();
			else {
				var d = e.val();
				if (d == ""
						|| d == "\u4f60\u4e5f\u53ef\u4ee5\u987a\u4fbf\u8bf4\u70b9\u4ec0\u4e48 O(\u2229_\u2229)O")
					alert("\u8bf7\u8f93\u5165\u8bc4\u8bba\u5185\u5bb9");
				else if (MGTOOL.getMsgLength(d) > 140)
					alert("\u8bc4\u8bba\u5185\u5bb9\u8d85\u8fc7140\u4e2a\u5b57\u4e86\u3002");
				else {
					var c = a("#pub_out_check").prop("checked"), f = e
							.data("commentId"), h = e.data("commentUserId");
					a.ajax({
						url : "/replytwitter/add",
						type : "POST",
						timeout : 6E4,
						data : {
							replyId : b,
							content : d,
							isRetweet : c,
							commentId : f,
							commentUserId : h,
							print : 2,
							local : MOGUPROFILE.local,
							nttype : "newnote"
						},
						dataType : "json",
						success : function(b) {
							if (b == null)
								alert(MGLANG.msgTimeout);
							else {
								var c = b.status.msg;
								b.status.code == 1001
										? (a(".comment_empty")[0]
												&& a(".comment_empty").remove(), b = b.result.html.comment, a("#note_comment_list")[0]
												|| a(".pub_box")
														.after('<ul class="c_l rb5" id="note_comment_list"></ul>'), a("#note_comment_list")
												.prepend(b), a("#note_comment_list li:first")
												.hide().fadeIn(500), e.val(""), e
												.removeData("commentId"), e
												.removeData("commentUserId"))
										: alert(c)
							}
							a("#publish_note .word_count").text("140")
						},
						error : function(a, b) {
							"timeout" == b && alert(MGLANG.msgTimeout)
						}
					})
				}
			}
		});
		a(".c_f").live("mouseenter", function() {
					a(this).addClass("hover")
				});
		a(".c_f").live("mouseleave", function() {
					a(this).removeClass("hover")
				});
		a(".c_f .rpl").live("click", function() {
			var b = a("#pub_content"), e = a(this).parents(".c_f"), d = e
					.find(".sms .n").text(), c = b.val(), c = c == ""
					|| c == "\u4f60\u4e5f\u53ef\u4ee5\u987a\u4fbf\u8bf4\u70b9\u4ec0\u4e48 O(\u2229_\u2229)O"
					? "\u56de\u590d@" + d + ": "
					: c.indexOf("\u56de\u590d@") == -1 ? "\u56de\u590d@" + d
							+ ": " + c : c.replace(/@\S+?\:/, "@" + d + ":");
			b.val(c);
			b.data("commentId", e.attr("tid")).data("commentUserId",
					e.attr("uid"));
			b[0].createTextRange ? (e = b[0].createTextRange(), e.moveEnd(
					"character", b.val().length), e.moveStart("character", b
							.val().length), e.select()) : (b[0]
					.setSelectionRange(b.val().length, b.val().length), b
					.focus());
			b = b.parents(".pub_area").offset();
			b.top < a(window).scrollTop() && window.scrollTo(0, b.top)
		});
		a(".c_f .del").live("click", function() {
			if (!confirm("\u5220\u9664\u540e\u4e0d\u53ef\u6062\u590d\uff0c\u60a8\u786e\u5b9a\u4e48\uff1f"))
				return !1;
			var b = this, e = a(b).parents(".c_f").attr("tid");
			a.ajax({
						url : "/twitter/delete",
						type : "POST",
						timeout : 6E4,
						data : {
							twitterid : e
						},
						dataType : "json",
						success : function(d) {
							if (d == null)
								alert(MGLANG.msgTimeout);
							else {
								var c = d.status.msg;
								d.status.code == 1001 ? a(b).parents(".c_f")
										.remove() : alert(c)
							}
						},
						error : function(a, b) {
							"timeout" == b && alert(MGLANG.msgTimeout)
						}
					})
		});
		a(".pub_area .add_face_new").click(function() {
					var b = a(this).parents(".pub_area").find(".pub_txt"), b = {
						click_obj : a(this),
						output : b
					};
					(new MOGU.WB_Add_Face_Init_New(b)).init()
				})
	};
	a(".dapei_con").size() != 0 && MOGU.Album_Add_To_Album_Init();
	MOGU.Note_Favorite_Add();
	MOGU.Album_Del_Album();
	MOGU.Album_Add_Content();
	MOGU.Album_Add_Follow();
	MOGU.Wall_Loader && MOGU.Wall_Loader();
	MOGU.Album_Commnet_Init();
	MOGU.Album_Commnet_List_Load()
})(jQuery);