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
(function(c) {
	MOGU.CountDown_Time_Init = function() {
		c(".time").each(function() {
					var b = c(this).find(".left_time"), d = b.val();
					MOGU.CountDown_Time(b, d)
				})
	};
	MOGU.CountDown_Time = function(b, d) {
		var a = d;
		if (a >= 0) {
			var c = parseInt(a / 86400), e = parseInt(a / 3600) - c * 24, f = parseInt(a
					/ 60)
					- parseInt(a / 3600) * 60, g = parseInt(a / 1)
					- parseInt(a / 60) * 60;
			b.parent().find(".d").text(c);
			b.parent().find(".h").text(e);
			b.parent().find(".m").text(f);
			b.parent().find(".s").text(g);
			a -= 1;
			b.val(a);
			setTimeout(function() {
						MOGU.CountDown_Time(b, a)
					}, 1E3)
		}
	}
})(jQuery);
(function(a) {
	MOGU.Note_Favorite_Add = function() {
		a(".favorite .favaImg").click(function() {
			if (MOGUPROFILE.userid == "")
				MOGU.user_handsome_login_init(), MOGU.user_handsome_login();
			else if (a(this).data("submit") != 1) {
				a(this).data("submit", 1);
				a("#fav_tip").remove();
				a("#fav_yaya").remove();
				var c = this, b = a(c).offset(), d = a(this).attr("tid"), e = a(this)
						.attr("bwp"), f = a(this).attr("fc"), e = {
					twitterid : d,
					content : "\u6211\u559c\u6b22\u8fd9\u4e2a\uff0c\u8c22\u8c22\u4f60\u7684\u5206\u4eab[\u5fc3]",
					local : MOGUPROFILE.local,
					bwp : e,
					from_cate : f
				};
				if (a(".note_talk").find(".q")[0])
					f = a(".note_talk").find(".q").attr("qtid"), e.rootRetweetId = f, e.favtype = !0;
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
					data : e,
					dataType : "json",
					success : function(e) {
						if (e == null)
							alert(MGLANG.msgTimeout);
						else {
							var f = e.status.code, j = e.status.msg;
							f == 1001
									? (tip_html = MGTEMPLATE.favTip_ok.replace(
											/{tid}/g, d).replace(/{editid}/g,
											e.result.data.tid).replace(
											/{favid}/g, e.result.data.id)
											.replace(/{where}/g, "notenoall"), show_tip = !0, a(".favDiv")[0]
											? (e = parseInt(a(c)
													.parent(".favorite")
													.find(".favDiv a").text()), a(".favDiv a")
													.text(e + 1))
											: a(c)
													.after('<div class="favDiv"><span class="favCount" >1</span><i></i></div>'))
									: f == 6002
											? (tip_html = MGTEMPLATE.favTip_had
													.replace(/{favid}/g,
															e.result.data.id)
													.replace(/{twitterid}/g, d), show_tip = !0)
											: f == 6003
													? (tip_html = MGTEMPLATE.favTip_me
															.replace(
																	/{uid}/g,
																	MOGUPROFILE.userid), show_tip = !0)
													: alert(j);
							if (show_tip) {
								a("body").append(tip_html);
								setTimeout(function() {
											a("#fav_tip").css({
														top : b.top - 25 - 71
																+ "px",
														left : b.left - 15
																+ "px"
													}).show()
										}, 500);
								var i = setTimeout(function() {
											a("#fav_tip,#fav_yaya").remove()
										}, 3E3);
								a("#fav_tip,#fav_yaya").hover(function() {
											clearTimeout(i);
											a("#fav_tip,#fav_yaya").show()
										}, function() {
											clearTimeout(i);
											i = setTimeout(function() {
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
									a(c).removeData("submit")
								}, 4E3)
					}
				})
			}
		})
	};
	MOGU.Note_Get_HeightDiff = function() {
		a(".show_body .body_info");
		var c = a(".show_body .show_big_wrap").height(), b = a(".show_body .body_info")
				.height();
		return c - b
	};
	MOGU.Note_Commnet_List_Load = function() {
		var c = a(".note_comment .pagination"), b = a(".note_content")[0].id
				.replace(/note_/, ""), d = function(b) {
			a.ajax({
				url : b,
				type : "POST",
				timeout : 6E4,
				data : {},
				dataType : "json",
				success : function(b) {
					if (b != null) {
						var d = b.status.msg;
						b.status.code == 1001
								? (d = b.result.html.list, b = b.result.html.pageinator, d != ""
										? (a("#note_comment_list")[0]
												? a("#note_comment_list")
														.html(d)
												: a(".pub_box")
														.after('<ul class="c_l rb5" id="note_comment_list">'
																+ d + "</ul>"), a
												.trim(b) != ""
												&& c.size() == 0
												&& a(".note_comment")
														.append('<div class="pagination"></div>'), c = a(".note_comment .pagination"), c
												.html(b))
										: a(".comment_empty")[0]
												|| a(".pub_box")
														.after('<div class="comment_empty">\u8fd8\u6ca1\u6709\u4eba\u8bc4\u8bba\u8fc7\uff0c\u4f60\u6765\u5f53\u7b2c\u4e00\u4e2a\u5427\uff01</div>'))
								: alert(d)
					}
				},
				error : function() {
				}
			})
		}, e = 8;
		if (a(".show_body").hasClass("note_book_qq")) {
			var f = MOGU.Note_Get_HeightDiff();
			f <= 60 ? e = 1 : f > 60 && f < 120 ? e = 2 : f >= 120 && f < 180
					? e = 3
					: f >= 180 && f < 250 ? e = 4 : f >= 250 && (e = 7)
		}
		var b = "/replytwitter/newnote?twitterId=" + b + "&perpagenum=" + e, e = a
				.parseJSON(a(".note_content").attr("data")), g;
		for (g in e)
			e.hasOwnProperty(g) && (b += "&" + g + "=" + e[g]);
		d(b);
		a(".note_comment .pagination a").live("click", function() {
					var b = a(this).attr("href");
					d(b);
					window.scrollTo(0, a("#pub_content").offset().top);
					return !1
				})
	};
	MOGU.Note_Commnet_Init = function() {
		a("#note_comment_list li").live("mouseenter", function() {
					a(this).addClass("hover")
				});
		a("#note_comment_list li").live("mouseleave", function() {
					a(this).removeClass("hover")
				});
		MOGU
				.Globe_Input_Text(
						a("#pub_content"),
						"\u4f60\u4e5f\u53ef\u4ee5\u987a\u4fbf\u8bf4\u70b9\u4ec0\u4e48 O(\u2229_\u2229)O");
		var c = a(".note_content")[0].id.replace(/note_/, ""), b = a("#pub_content");
		MOGU.Globe_Bind_Keybord_Submit(a("#pub_content"), a("#pub_submit"),
				"need_focus");
		a("#pub_submit").click(function() {
			var d = a(this);
			if (MOGUPROFILE.userid == "")
				MOGU.user_handsome_login_init(), MOGU.user_handsome_login();
			else if (!d.data("submiting")) {
				var e = b.val();
				if (e == ""
						|| e == "\u4f60\u4e5f\u53ef\u4ee5\u987a\u4fbf\u8bf4\u70b9\u4ec0\u4e48 O(\u2229_\u2229)O")
					alert("\u8bf7\u8f93\u5165\u8bc4\u8bba\u5185\u5bb9");
				else if (MGTOOL.getMsgLength(e) > 140)
					alert("\u8bc4\u8bba\u5185\u5bb9\u8d85\u8fc7140\u4e2a\u5b57\u4e86\u3002");
				else {
					var f = a("#pub_out_check").prop("checked"), g = b
							.data("commentId"), h = b.data("commentUserId"), e = {
						replyId : c,
						content : e,
						isRetweet : f,
						commentId : g,
						commentUserId : h,
						print : 2,
						local : MOGUPROFILE.local,
						nttype : "newnote"
					}, f = a.parseJSON(a(".note_content").attr("data"));
					a.extend(e, f);
					d.data("submiting", !0);
					a.ajax({
						url : "/replytwitter/add",
						type : "POST",
						timeout : 6E4,
						data : e,
						dataType : "json",
						success : function(d) {
							if (d == null)
								alert(MGLANG.msgTimeout);
							else {
								var c = d.status.msg;
								d.status.code == 1001
										? (a(".comment_empty")[0]
												&& a(".comment_empty").remove(), d = d.result.html.comment, a("#note_comment_list")[0]
												|| a(".pub_box")
														.after('<ul class="c_l rb5" id="note_comment_list"></ul>'), a("#note_comment_list")
												.prepend(d), a("#note_comment_list li:first")
												.hide().fadeIn(500), b.val(""), b
												.removeData("commentId"), b
												.removeData("commentUserId"))
										: alert(c)
							}
							a("#publish_note .word_count").text("140")
						},
						error : function(a, b) {
							"timeout" == b && alert(MGLANG.msgTimeout)
						},
						complete : function() {
							d.data("submiting", !1)
						}
					})
				}
			}
		});
		a(".c_f .rpl").live("click", function() {
			var d = a(this).parents(".c_f"), c = d.find(".sms .n").text(), f = b
					.val(), f = f == ""
					|| f == "\u4f60\u4e5f\u53ef\u4ee5\u987a\u4fbf\u8bf4\u70b9\u4ec0\u4e48 O(\u2229_\u2229)O"
					? "\u56de\u590d@" + c + ": "
					: f.indexOf("\u56de\u590d@") == -1 ? "\u56de\u590d@" + c
							+ ": " + f : f.replace(/@\S+?\:/, "@" + c + ":");
			b.val(f);
			b.data("commentId", d.attr("tid")).data("commentUserId",
					d.attr("uid"));
			b[0].createTextRange ? (d = b[0].createTextRange(), d.moveEnd(
					"character", b.val().length), d.moveStart("character", b
							.val().length), d.select()) : (b[0]
					.setSelectionRange(b.val().length, b.val().length), b
					.focus());
			d = b.parents(".pub_area").offset();
			d.top < a(window).scrollTop() && window.scrollTo(0, d.top)
		});
		a(".c_f .del").live("click", function() {
			if (!confirm("\u5220\u9664\u540e\u4e0d\u53ef\u6062\u590d\uff0c\u60a8\u786e\u5b9a\u4e48\uff1f"))
				return !1;
			var b = this, c = a(b).parents(".c_f").attr("tid");
			a.ajax({
						url : "/twitter/delete",
						type : "POST",
						timeout : 6E4,
						data : {
							twitterid : c
						},
						dataType : "json",
						success : function(c) {
							if (c == null)
								alert(MGLANG.msgTimeout);
							else {
								var e = c.status.msg;
								c.status.code == 1001 ? a(b).parents(".c_f")
										.remove() : alert(e)
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
	MOGU.Note_Delete = function(c, b) {
		alertTest = b
				? b
				: "\u5220\u9664\u540e\u4e0d\u53ef\u6062\u590d\uff0c\u60a8\u786e\u5b9a\u4e48\uff1f";
		if (!confirm(alertTest))
			return !1;
		a.ajax({
					url : "/twitter/delete",
					type : "POST",
					timeout : 6E4,
					data : {
						twitterid : c
					},
					dataType : "json",
					success : function(a) {
						if (a == null)
							alert(MGLANG.msgTimeout);
						else {
							var b = a.status.msg;
							a.status.code == 1001
									? window.location = "/me"
									: alert(b)
						}
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout)
					}
				})
	};
	MOGU.Note_Topic_Talk_Del = function(c, b) {
		alertTest = b
				? b
				: "\u5220\u9664\u540e\u4e0d\u53ef\u6062\u590d\uff0c\u60a8\u786e\u5b9a\u4e48\uff1f";
		if (!confirm(alertTest))
			return !1;
		a.ajax({
					url : "/twitter/delete",
					type : "POST",
					timeout : 6E4,
					data : {
						twitterid : c,
						filter : 1
					},
					dataType : "json",
					success : function(a) {
						if (a == null)
							alert(MGLANG.msgTimeout);
						else {
							var b = a.status.msg;
							a.status.code == 1001
									? alert("\u5220\u9664\u6210\u529f")
									: alert(b)
						}
					},
					error : function(a, b) {
						"timeout" == b && alert(MGLANG.msgTimeout)
					}
				})
	};
	MOGU.Note_Message_Report_Init = function() {
		a(".note_who_like .report").click(function() {
					var c = a(this).attr("tid"), b = a(this).attr("r-type");
					MOGU.Message_Report_Init(c, b)
				})
	};
	MOGU.Tweet_Item_Init = function() {
		var c = a(".pic div"), b = a(".pic_b li");
		a(".note_content").size();
		c.live("click", function() {
			var b = a(this), c = function() {
				if (b.children(".load_gif")[0])
					b.children(".load_gif").show();
				else {
					b
							.append('<img src="/img/loading_blue1.gif" class="load_gif">');
					var a = b.children(".load_gif"), c = b.width() / 2, f = b
							.height()
							/ 2;
					a.css({
								left : c,
								top : f
							})
				}
				$img.load(function() {
							b.parent().hide();
							h.show()
						}).attr("src", $img.attr("d-src"))
			}, f = a(this).parent().next(), g = a(this).index();
			g > 3 && g--;
			var h = f.find("li:eq(" + g + ")");
			$img = h.find(".pic_b_bd img");
			$img.attr("r") == void 0 || $img.attr("r") == "1" ? (b.parent()
					.hide(), f.find(".show_big").show(), h.show()) : $img
					.attr("r") == "0"
					&& c()
		});
		b.find(".pic_b_bd img").live("click", function() {
			var b = a(this).parent(), c = b.parents(".pic_b_f");
			if (c.attr("ttype") != "bigMode") {
				var f = b.parents(".pic_b").prev();
				f.find(".load_gif").hide();
				f.show();
				c.hide();
				c.find(".pic_b_fav").remove();
				"tpc" != b.attr("w")
						&& b.parents(".t_f").find(".cf_b").remove()
			}
		});
		b.live("mouseover", function() {
					if (a(this).attr("ttype") == "bigMode") {
						a(this).find(".pic_b_bd").css("cursor", "default");
						var b = a(this).find(".show_big");
						b.css("position", "absolute");
						b.show()
					}
				});
		b.live("mouseout", function() {
					a(this).attr("ttype") == "bigMode"
							&& a(this).find(".show_big").hide()
				})
	};
	MOGU.Note_Add_To_Album_Init = function() {
		a(".fav_wrap_content .add_to_album").click(function() {
					var c = a(this), b = a(this).attr("tid");
					MOGU.Add_To_Album_Init(c, b)
				})
	};
	MOGU.Wall_Loader && !a("#imagewall_container").hasClass("noajax")
			&& MOGU.Wall_Loader({
						ajax_url : "/notebook/ajax"
					});
	MOGU.Note_tuan_tip = function() {
		a(".step_one a.get_notify").click(function() {
			var c = a(this), b = c.parents(".body_info").attr("tid"), d = c
					.parents(".body_info").attr("gid");
			MOGUPROFILE.userid == ""
					? (MOGU.user_handsome_login_init(), c = a(this), MOGU
							.user_handsome_login(!1, {
										callback : function() {
											c.click()
										}
									}))
					: a.ajax({
						url : "/free/u/notifyme",
						type : "POST",
						timeout : 6E4,
						data : {
							twitterId : b,
							goodsId : d
						},
						dataType : "json",
						success : function(b) {
							if (b == null)
								alert(MGLANG.msgTimeout);
							else {
								var c = b.status.msg;
								b.status.code == 1001
										? b.result.status == 1
												? (a(".step_one")
														.append('<span class="s">\u901a\u77e5\u8bbe\u7f6e\u6210\u529f\uff01</span>'), a(".step_one a")
														.remove())
												: alert("\u8bbe\u7f6e\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u54e6~~")
										: alert(c)
							}
						}
					})
		})
	};
	MOGU.Freetuan_Btn_Init = function() {
		a(".tuan_btn .tuan_img, .tuan_btn .tuanImg").live("click", function() {
			if (MOGUPROFILE.userid == "") {
				MOGU.user_handsome_login_init();
				var c = a(this);
				MOGU.user_handsome_login(!1, {
							callback : function() {
								c.click()
							}
						})
			} else {
				a(this).data("submit", 1);
				a("#tuan_tip").remove();
				a("#tuan_yaya").remove();
				var c = this, b = a(c).parents(".body_info").attr("gid"), d = a(c)
						.parents(".body_info").attr("tid"), e = a(c)
						.parents(".body_info").attr("tuanId"), f = MGTOOL
						.getAbsoluteLocation(c);
				a.ajax({
					url : "/free/u/wannatuan",
					type : "POST",
					timeout : 6E4,
					data : {
						goodsId : b,
						twitterId : d,
						tuanId : e
					},
					dataType : "json",
					success : function(b) {
						if (b == null)
							alert(MGLANG.msgTimeout);
						else {
							var c = b.status.msg;
							if (b.status.code == 1001) {
								var c = b.result.status, d = b.result.tuanId;
								if (c == 1) {
									a(".tuan_div .tuan_account").size() > 0
											? (b = parseInt(a(".tuan_div .tuan_account")
													.text()), a(".tuan_div .tuan_account")
													.html(++b + "\u4eba"))
											: a(".tuan_btn")
													.after('<div class="tuan_div"><span class="tuan_account">1\u4eba</span><i></i></div>');
									b = '<div id="tuan_tip"><div class="freetuan_success_bg "></div></div>';
									a("body")
											.append('<div id="fav_yaya" class="fav_yaya"></div>');
									a("#fav_yaya").css({
												top : f.absoluteTop + "px",
												left : f.absoluteLeft + 10
														+ "px"
											}).floatUp({
												time : 500
											});
									a("body").append(b);
									setTimeout(function() {
												a("#tuan_tip").css({
													top : f.absoluteTop - 27
															- 60 + "px",
													left : f.absoluteLeft - 25
															+ "px"
												}).show()
											}, 500);
									var e = setTimeout(function() {
												a("#tuan_tip,#fav_yaya")
														.remove()
											}, 3E3)
								} else
									c == 2
											? (b = '<div id="tuan_tip"><div class="freetuan_box_bg">\u4f60\u5df2\u7ecf\u6c42\u8fc7\u56e2\u8d2d\u4e86\u54e6</div></div>', a("body")
													.append('<div id="fav_yaya" class="fav_yaya"></div>'), a("#fav_yaya")
													.css({
														top : f.absoluteTop
																+ "px",
														left : f.absoluteLeft
																+ 10 + "px"
													}).floatUp({
																time : 500
															}), a("body")
													.append(b), setTimeout(
													function() {
														a("#tuan_tip").css({
															top : f.absoluteTop
																	- 27 - 70
																	+ "px",
															left : f.absoluteLeft
																	- 25 + "px"
														}).show()
													}, 500), e = setTimeout(
													function() {
														a("#tuan_tip,#fav_yaya")
																.remove()
													}, 3E3), a("#tuan_tip,#fav_yaya")
													.hover(function() {
														clearTimeout(e);
														a("#tuan_tip,#fav_yaya")
																.show()
													}, function() {
														clearTimeout(e);
														e = setTimeout(
																function() {
																	a("#tuan_tip,#fav_yaya")
																			.remove()
																}, 3E3)
													}))
											: c == 3
													? (b = null, golink_html = '<div class="freetuan_link"><p>\u8fd9\u4ef6\u5546\u54c1\u5df2\u7ecf\u6709\u4eba\u5728\u6c42\u56e2\u5566\uff0c\u53bb\u76f4\u63a5\u52a0\u5165\u4ed6\u4eec\u5427~</p><a href="javascript:;">\u53bb\u770b\u770b</a></div>', b = new MGLightBox(
															{
																title : "\u5c0f\u63d0\u793a",
																lightBoxId : "lb_freetuan_go",
																contentHtml : golink_html,
																scroll : !0,
																isBgClickClose : !1
															}), b.init(), a(".freetuan_link a")
															.click(function() {
																window
																		.open("/free/detail/"
																				+ d);
																setTimeout(
																		function() {
																			window.location
																					.reload()
																		}, 1E3)
															}))
													: alert("\u5f53\u524d\u6c42\u56e2\u7684\u4eba\u6570\u592a\u591a\u4e86\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5")
							} else
								alert(c)
						}
					}
				})
			}
		})
	};
	MOGU.Freetuan_Jion_Buy_Init = function() {
		a(".join_buy_btn").click(function() {
			var c = a(this);
			if (MOGUPROFILE.userid == "" && !c.hasClass("join_elegant"))
				return MOGU.user_handsome_login_init(), c = a(this), MOGU
						.user_handsome_login(!1, {
									callback : function() {
										c.click()
									}
								}), !1;
			if (c.hasClass("join_elegant")) {
				var b = c.parents(".body_info").find(".shop_link").attr("href"), d = null;
				buy_html = '<div class="t_anhao"><h1>\u8d2d\u4e70\u6697\u53f7\uff1a<span>\u8611\u83c7\u8857</span><span class="use_limit"></span></h1><a target="blank" class="buy_tuan" href="'
						+ b
						+ '">\u9a6c\u4e0a\u53bb\u8d2d\u4e70</a></div><div class="tuan_help clearfix"><div class="what_for">\u6697\u53f7\u8d2d\u4e70\u6d41\u7a0b:</div><div class="pt10 for_help"><div class="th_c"><span class="th_step">1</span>\u53bb\u5546\u5e97\u9875\u9762\u62cd\u4e0b\u5546\u54c1\uff0c\u4f46\u4e0d\u8981\u4ed8\u6b3e</div><div class="th_c"><span class="th_step">2</span>\u8054\u7cfb\u65fa\u65fa\u5ba2\u670d\u62a5\u4e0a\u6697\u53f7</div><div class="th_c"><span class="th_step">3</span>\u5f85\u5ba2\u670d\u4fee\u6539\u4ef7\u683c\u540e\uff0c\u5b8c\u6210\u4ed8\u6b3e</div><div class="th_c" style="padding:10px 1px 5px;color:#666;">\u6ce8\uff1a\u56e2\u8d2d\u6697\u53f7\u53ea\u5728\u56e2\u8d2d\u671f\u5185\u4ed8\u6b3e\u6709\u6548\u3002</div></div></div>';
				d = new MGLightBox({
					title : "\u6309\u6d41\u7a0b\u8d2d\u4e70\u624d\u80fd\u83b7\u5f97\u56e2\u8d2d\u4ef7\u54e6",
					lightBoxId : "lb_jion_btn",
					contentHtml : buy_html,
					scroll : !0,
					isBgClickClose : !0
				});
				d.init()
			} else {
				var e = c.parents(".body_info").attr("tuanId"), b = a(".detail_name a")
						.size() != 0 ? c.parents(".body_info")
						.find(".detail_name a").attr("href") : c
						.parents(".body_info").find(".shop_link").attr("href");
				a.ajax({
					url : "/free/u/queryAnHao",
					type : "POST",
					data : {
						tuanId : e
					},
					dataType : "json",
					success : function(a) {
						if (a == null)
							alert(MGLANG.msgTimeout);
						else {
							var b = a.status.msg;
							a.status.code == 1001
									? (b = null, buy_html = [
											'<div class="t_anhao">',
											"<h1>\u8d2d\u4e70\u6697\u53f7\uff1a<span>\u8611\u83c7\u8857"
													+ a.result.anhao
													+ '</span><span class="use_limit"></span></h1>',
											'<a href="/free/buy/'
													+ e
													+ '" target="_blank" class="orange_btn buy_btn "><span class="s">\u9a6c\u4e0a\u53bb\u8d2d\u4e70</span></a>',
											'</div><div class="tuan_help clearfix"><div class="what_for">\u6697\u53f7\u8d2d\u4e70\u6d41\u7a0b:</div><div class="pt10 for_help"><div class="th_c"><span class="th_step">1</span>\u53bb\u5546\u5e97\u9875\u9762\u62cd\u4e0b\u5546\u54c1\uff0c\u4f46\u4e0d\u8981\u4ed8\u6b3e</div><div class="th_c"><span class="th_step">2</span>\u8054\u7cfb\u65fa\u65fa\u5ba2\u670d\u62a5\u4e0a\u6697\u53f7</div><div class="th_c"><span class="th_step">3</span>\u5f85\u5ba2\u670d\u4fee\u6539\u4ef7\u683c\u540e\uff0c\u5b8c\u6210\u4ed8\u6b3e</div><div class="th_c" style="padding:10px 1px 5px;color:#666;">\u6ce8\uff1a\u56e2\u8d2d\u6697\u53f7\u53ea\u5728\u56e2\u8d2d\u671f\u5185\u4ed8\u6b3e\u6709\u6548\u3002</div></div></div>']
											.join(""), b = new MGLightBox({
										title : "\u6309\u6d41\u7a0b\u8d2d\u4e70\u624d\u80fd\u83b7\u5f97\u56e2\u8d2d\u4ef7\u54e6",
										lightBoxId : "lb_jion_btn",
										contentHtml : buy_html,
										scroll : !0,
										isBgClickClose : !0
									}), b.init())
									: alert(b)
						}
					}
				})
			}
		})
	};
	MOGU.Note_Iphone_Down = function() {
		var c = 1;
		a("body")
				.append('<div class="download_iphone"><a class="j_d_h" target="_blank" href="http://mogujie.cn/0147Qx?f=cn20120728notedownload">iphone</a><a class="j_d_a" target="_blank" href="http://mogujie.cn/0147Qx?f=cn20120728notedownload">iPad</a></div>');
		a(".download_iphone").hover(function() {
					c = 0;
					setTimeout(function() {
								c == 0
										&& a(".download_iphone .j_d_a")
												.animate({
															marginLeft : "0px"
														}, 500)
							}, 600)
				}, function() {
					c = 1;
					c == 1 && a(".download_iphone .j_d_a").animate({
								marginLeft : "-245px"
							}, 500)
				})
	};
	MOGU.Fix_url = function() {
		var c = location.href.split("#"), b = function(b) {
			b = a("a[name=" + b + "]");
			if (b.length > 0)
				b = b.offset().top, a("body").animate({
							scrollTop : b
						}, 500)
		};
		c.length > 1
				&& (c = c[1].split(","), b(c[0]), b = a(".favaImg"), b.length > 0
						&& c.length > 1
						&& (c[1] && b.attr("bwp", c[1]), c[2]
								&& b.attr("fc", c[2])))
	};
	MOGU.Fix_anchor = function() {
		a(".anchor").click(function(c) {
			c.preventDefault();
			var c = a(this).attr("href"), b = location.href, d = b.split("#");
			d.length > 0 ? (b = d[1].split(","), b.length > 1
					? (b[0] = c, console.log(b), b = d[0] + b.join(","))
					: b = d[0] + name) : b += name;
			console.log(b);
			window.location.href = b
		})
	};
	MOGU.Fix_url();
	MOGU.Fix_anchor();
	MOGU.Tweet_Item_Init();
	MOGU.Note_Add_To_Album_Init();
	MOGU.Note_Commnet_List_Load();
	MOGU.Note_Commnet_Init();
	MOGU.Note_Favorite_Add();
	MOGU.Note_Message_Report_Init();
	MOGU.Note_tuan_tip();
	MOGU.Freetuan_Btn_Init();
	MOGU.Freetuan_Jion_Buy_Init();
	MOGU.CountDown_Time_Init && MOGU.CountDown_Time_Init();
	a(document).ready(function() {
		for (var c = a("#imagewall_container .col").size(), b = [], d = 0; d < c; d++)
			b.push(a("#imagewall_container .col").eq(d).height());
		c = Math.max.apply(Math, b);
		Math.min.apply(Math, b);
		for (d = 0; d < b.length; d++)
			a("#imagewall_container .col")
					.eq(d)
					.append('<div class="i_w_f_f"><div class="hd"></div><div class="bd" style="height:{h}px"></div><div class="ft"></div></div>'
							.replace(/{h}/, c - b[d]))
	});
	MOGU.Note_Iphone_Down();
	MOGU.QQ_xiangce_share = function() {
		var c = a(".shop_link").text(), b = a(".qplus_link img").attr("src");
		window.hulian_config = window.hulian_config || {
			src : b,
			desc : c
		};
		if (!window.__qqPinHulian && !window.__qqPinHulianClicked)
			c = document.head || document.getElementsByTagName("head")[0]
					|| document.documentElement, b = document
					.createElement("script"), b.setAttribute("type",
					"text/javascript"), b.async = !0, b.setAttribute("charset",
					"UTF-8"), b.setAttribute("id", "__qqHulianScriptId"), b
					.setAttribute(
							"src",
							"http://qzonestyle.gtimg.cn/campus/v4/js/photo2/module/hulian/init_easy.js?btnCssId=3&random="
									+ Math.floor(+new Date / 1E7) + "&"), c
					.insertBefore(b, c.firstChild), window.__qqPinHulianClicked = !0
	};
	MOGU.QQ_xiangce_share()
})(jQuery);
Rookie.get_browser = function() {
	var a = navigator.userAgent.toLowerCase();
	if (window.ActiveXObject)
		return "ie";
	if (/firefox/i.test(a))
		return "firefox";
	if (/chrome/i.test(a) && /webkit/i.test(a) && /mozilla/i.test(a))
		return "chrome";
	if (window.opera)
		return "opera";
	if (window.openDatabase)
		return "safari";
	return "other"
};
Rookie.getSWF = function(a) {
	return window.document[a] ? window.document[a] : document.getElementById(a)
};
Rookie.swfReady = function() {
	Rookie.asToJs = !0
};
Rookie.cross = function() {
	return Rookie.crossDomain
};
Rookie.addswf = function() {
	var a = "/swf/rookie.swf";
	if (/http:\/\//i.test(a) && a.indexOf(window.location.host) == -1)
		Rookie.crossDomain = !0;
	a += "?" + Math.floor(Math.random() * 1E5);
	var c = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="1" height="1" id="rookieswf"><param name="movie" value="'
			+ a
			+ '" /><param name="allowScriptAccess" value="always" /><embed src="'
			+ a
			+ '" width="1" height="1" name="rookieswf" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>', b = document
			.createElement("div");
	b.style.height = 0;
	b.style.fontSize = 0;
	b.style.lineHeight = 0;
	document.body ? (b.innerHTML = c, document.body.insertBefore(b,
			document.body.firstChild)) : setTimeout(function() {
				b.innerHTML = c;
				document.body.insertBefore(b, document.body.firstChild)
			}, 15)
};
Rookie.addlocal = function(a) {
	try {
		Rookie.local.available = Rookie.local.callAS()
	} catch (c) {
	}
	a.call(Rookie.local)
};
function Rookie(a) {
	Rookie.addswf();
	var c = 1;
	(Rookie.local = Rookie.getSWF("rookieswf")) && function() {
		c++;
		Rookie.asToJs
				? Rookie.addlocal(a)
				: (c > 200 && a.call(localStorage), setTimeout(
						arguments.callee, 20))
	}()
}
var history_tid = $(".tid_view").val();
if (history_tid)
	Rookie(function() {
				if (this.read) {
					var a = [];
					(tid = this.read("tid")) && (a = tid.split(","));
					for (i = 0; i < a.length; i++)
						history_tid == a[i] && a.splice(i, 1);
					a.length >= 100 && (a[0] = history_tid, a.splice(100, 1));
					a.push(history_tid);
					tid = a.join(",");
					this.write("tid", tid)
				} else if (this.getItem) {
					tid = this.getItem("tid");
					a = tid.split(",");
					for (i = 0; i < a.length; i++)
						history_tid == a[i] && a.splice(i);
					a.length >= 100 && (a[0] = history_tid, a.splice(100, 1));
					a.push(history_tid);
					tid = a.join(",");
					this.setItem("tid", tid)
				}
			});
else {
	$("#histroy_h").length > 0 && Rookie(function() {
		this.read ? (tid = this.read("tid")) ? jQuery.ajax({
			url : "/collect/gettwitters",
			type : "POST",
			dataType : "json",
			data : {
				twid : tid
			},
			success : function(a) {
				a.code == 1
						? (a = a.html.replace("src=", "data-lazyload="), $("#imagewall_container")
								.html(a), new MOGU.DataLazyload, setTimeout(
								function() {
									fill()
								}, 300))
						: alert(a.msg)
			}
		})
				: $("#imagewall_container")
						.html('<div class="home_empty"><a href="/shopping" class="new_upload">\u53bb\u901b\u8857\u5566</a></div>')
				: this.getItem && (tid = this.getItem("tid"))
	});
	var fill = function() {
		for (var a = $("#imagewall_container").find(".col"), c = [], b = 0; b < 4; b++)
			image_col = $(a.get(b)), c.push(image_col.height()
					+ image_col.offset().top);
		for (var d = Math.max.apply(Math, c) + 26, b = 0; b < c.length; b++)
			$(a.get(b))
					.append('<div class="i_w_f_f"><div class="hd"></div><div class="bd" style="height:{h}px"></div><div class="ft"></div></div>'
							.replace(/{h}/, d - c[b]))
	}
};