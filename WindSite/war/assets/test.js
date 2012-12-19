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
	var i = function() {
		var b = a(".siderbarlist");
		if (b.length > 0) {
			var c = parseInt(a(window).width());
			c >= 960 ? b.css("left", c / 2 + 490 + "px").show() : b.css("left",
					"1000px").show()
		}
	};
	i();
	a(window).resize(function() {
				i()
			});
	MOGU.Event_Mori_Light = function() {
		var b = window.location.href, c = MGTOOL
				.getCacheCookie("ued_cookie_shopping_bags_pop");
		if (b.indexOf("pop=1") > 0 && (!1 == c || MGTOOL.empty(c)))
			(new MGLightBox({
				title : " ",
				lightBoxId : "lb_mori",
				contentHtml : '<div class="lb_guide"><span></span><a href="javascript:;"></a></div>',
				scroll : !1,
				isBgClickClose : !1
			})).init(), b = a("#col1").offset(), c = b.top - 100, a("#lb_mori")
					.css({
								left : b.left,
								top : c
							}), a("#lb_mori .lb_close").css("display", "none"), a(".lb_guide a")
					.click(function() {
						MGTOOL.setCacheCookie("ued_cookie_shopping_bags_pop",
								"1", {
									expires : 3
								});
						a("#lb_mori,.light_box_fullbg").remove()
					})
	};
	MOGU.Event_Mori_Light();
	MOGU.Event_Mori_Body_bag = function() {
		parseInt(MGTOOL.getCookie("_eventmori")) != 1
				&& a("body")
						.append('<div class="backpack_img"><i></i><span class="bag1"></span><a href="/webapp/bags?f=zn20121218tuqiangbag" target="_blank" class="event_rule">\u672b\u65e5\u653b\u7565\u6d3b\u52a8>></a></div>')
	};
	MOGU.Event_Mori_Body_bag();
	a(".backpack_img i").live("click", function() {
				a(this).parent().remove();
				a(".my_package_box,.backpack_img .db_ok").remove();
				MGTOOL.setCookie("_eventmori", 1, {
							expires : 1,
							path : "/"
						})
			});
	var h = function() {
		a.ajax({
			url : "/webapp/bags/addbags",
			type : "POST",
			timeout : 6E4,
			data : {
				isshare : 1,
				url : window.location.href
			},
			dataType : "json",
			success : function(b) {
				if (b == null)
					alert(MGLANG.msgTimeout);
				else {
					var c = b.status.code, b = b.status.msg;
					c == 1001
							? (a(".my_package_box").remove(), a(".backpack_img .bag1")
									.removeClass("bag3"))
							: c == 1002 ? ((new MGLightBox({
								title : " ",
								lightBoxId : "lb_mori",
								contentHtml : '<div class="lb_mori_content bag_all"><img src="http://s6.mogujie.cn/pic/121218/bech_kqyuqx2km5bhsytwgfjeg5sckzsew_452x159.jpg"><a class="over_btn" href="http://www.mogujie.com/webapp/bags?f=zn2-121218tskbag#show_event_body1" target="_blank"></a></div>',
								scroll : !0
							})).init(), a(".bag_all .over_btn").click(
									function() {
										a("#lb_mori,.light_box_fullbg")
												.remove()
									}))
									: alert(b)
				}
			}
		})
	};
	MOGU.Event_Mori_Package = function() {
		a(".i_w_f .pic li,.product_list .image").live({
			mouseenter : function() {
				if (!(window.location.href.indexOf("/mylist") > 0)) {
					var b = a(this), c = b.find(".add_backpack");
					if (b.attr("type") == "goods"
							|| b.parent().attr("class") == "item")
						c.length == 0
								? b
										.append('<a href="javascript:;" class="add_backpack"></a>')
								: c.show()
				}
			},
			mouseleave : function() {
				a(this).find(".add_backpack").hide()
			}
		});
		a(".mz_content").size() != 0 && a(".mz_content .mz_addbag").live({
			mouseenter : function() {
				var b = a(this), c = b.find(".add_backpack");
				c.length == 0
						? b.append('<span class="add_backpack"></span>')
						: c.show()
			},
			mouseleave : function() {
				a(this).find(".add_backpack").hide()
			}
		});
		a(".jia_hover .jia_addbag").size() != 0 && a(".jia_hover").live({
					mouseenter : function() {
						var b = a(this), c = b.offset().left + 20, f = b
								.offset().top;
						b.append('<span class="add_backpack"></span>');
						a(".add_backpack").css({
									left : c,
									top : f
								})
					},
					mouseleave : function() {
						a(this).find(".add_backpack").remove()
					}
				});
		a(".add_backpack").live("click", function() {
			var b = a(this);
			if (MOGUPROFILE.userid == "")
				return MOGU.user_handsome_login_init(), MOGU
						.user_handsome_login(!1, {
									callback : function() {
										b.click()
									}
								}), !1;
			a(".backpack_img").size() == 0
					&& (a("body")
							.append('<div class="backpack_img"><i></i><span class="bag1"></span><a href="/webapp/bags?f=zn20121218tuqiangbag" target="_blank" class="event_rule">\u672b\u65e5\u653b\u7565\u6d3b\u52a8>></a></div>'), MGTOOL
							.setCookie("_eventmori", 0, {
										expires : 1,
										path : "/"
									}));
			var c = window.location.href;
			if (b.parents("li").attr("class") == "item")
				var f = b.parents("li").find(".favorite .favaImg").attr("tid"), e = b
						.prev().attr("href").replace("/magic/spu/", ""), c = {
					twitterId : f,
					spuId : e,
					isbeauty : 1,
					url : c
				}, g = b.prev().find("img").attr("src");
			else
				b.parents("#mz_box").attr("class") == "event_wrap_mori"
						? (f = b.prev().attr("tid"), e = b.prev().attr("spuid"), c = {
							twitterId : f,
							spuId : e,
							isbeauty : 1,
							url : c
						})
						: (b.parent().attr("class") == "jia_hover"
								? (f = b.prev().attr("tid"), e = b.prev()
										.attr("iid"))
								: (f = b.parents(".i_w_f").attr("tid"), e = b
										.parents("li").attr("iid")), c = {
							twitterId : f,
							goodsId : e,
							isbeauty : 0,
							url : c
						}), g = b.parent().find("img").attr("src");
			a.ajax({
				url : "/webapp/bags/bagaddgoods",
				type : "POST",
				timeout : 6E4,
				data : c,
				dataType : "json",
				success : function(c) {
					if (c == null)
						alert(MGLANG.msgTimeout);
					else {
						var d = c.status.code, e = c.status.msg;
						d == 1001
								? (e = b.parent().offset(), a("body")
										.append('<img class="animate_img" src="'
												+ g + '">'), a(".animate_img")
										.css({
													left : e.left,
													top : e.top
												}), a(".backpack_img .bag1")
										.removeClass("bag2").addClass("bag3"), d = a(".backpack_img")
										.offset().left
										- e.left + 20, e = a(".backpack_img")
										.offset().top
										- e.top, a(".animate_img").animate({
											left : "+=" + d,
											top : "+=" + e,
											width : "30"
										}, 800, function() {
											a(".animate_img").animate({
														top : "+=60",
														height : "toggle"
													}, 400, function() {
														a(".animate_img")
																.remove();
														a(".backpack_img .bag1")
																.removeClass("bag3");
														var b = c.result.bagId;
														c.result.nowcount == 3
																&& a(".backpack_img")
																		.append('<span class="db_ok"><a bagid="'
																				+ b
																				+ '" href="javascript:;">&nbsp;</a></span>')
													})
										}))
								: d == 1002
										? (d = '<div class="lb_mori_content"><img src="http://s6.mogujie.cn/pic/121215/zmfu_kqyv6rcem5bfqzcugfjeg5sckzsew_452x102.jpg"><a bagid="'
												+ c.result.bagId
												+ '" class="go_link link_btn2" href="javascript:;"></a></div>', d = {
											title : " ",
											lightBoxId : "lb_mori",
											contentHtml : d,
											scroll : !0
										}, d = new MGLightBox(d), d.init(), a(".lb_mori_content .go_link,#lb_mori .lb_close")
												.click(function() {
													a("#lb_mori,.light_box_fullbg")
															.remove()
												}))
										: d == 1003 ? (d = {
											title : " ",
											lightBoxId : "lb_mori",
											contentHtml : '<div class="lb_mori_content"><img src="http://s7.mogujie.cn/pic/121213/1v7n_kqyu4z27m5bfqzdwgfjeg5sckzsew_452x102.jpg"><a class="go_link" href="javascript:;"></a></div>',
											scroll : !0
										}, d = new MGLightBox(d), d.init(), a(".lb_mori_content .go_link,#lb_mori .lb_close")
												.click(function() {
													a("#lb_mori,.light_box_fullbg")
															.remove()
												}))
												: d == 1004 ? (d = {
													title : " ",
													lightBoxId : "lb_mori",
													contentHtml : '<div class="lb_mori_content"><img src="http://s6.mogujie.cn/pic/121215/zmfu_kqyukx22m5bdktcugfjeg5sckzsew_452x102.jpg"><a class="go_link link_btn1" href="/webapp/bags" target="_blank"></a></div>',
													scroll : !0
												}, d = new MGLightBox(d), d
														.init(), a(".lb_mori_content .go_link,#lb_mori .lb_close")
														.click(function() {
															a("#lb_mori,.light_box_fullbg")
																	.remove()
														}))
														: d == 1005
																? (d = c.result.imgsrc, e = (new Date)
																		.getTime(), d = '<div class="lb_mori_content"><img src="http://s7.mogujie.cn/pic/121213/3x51_kqyvoz3cm5bgev2ugfjeg5sckzsew_452x148.jpg"><a class="share_btn" href="http://service.weibo.com/share/share.php?url='
																		+ encodeURIComponent("http://www.mogujie.com/webapp/bags?time="
																				+ e)
																		+ "&title="
																		+ encodeURIComponent("\u5982\u679c2012\u771f\u7684\u6765\u4e86\uff0c\u6211\u7684#\u672b\u65e5\u80cc\u5305#\u91cc\u4e00\u5b9a\u8981\u5e26\u4e0a\u5b83\u4eec\uff01\u4f60\u5462\uff1f")
																		+ "&appkey=709410795&pic="
																		+ d
																		+ ' " target="_blank"></a></div>', d = {
																	title : " ",
																	lightBoxId : "lb_mori",
																	contentHtml : d,
																	scroll : !0
																}, d = new MGLightBox(d), d
																		.init(), a(".lb_mori_content a,#lb_mori .lb_close")
																		.click(
																				function() {
																					a("#lb_mori,.light_box_fullbg")
																							.remove();
																					h()
																				}))
																: d == 1006
																		? (d = {
																			title : " ",
																			lightBoxId : "lb_mori",
																			contentHtml : '<div class="lb_mori_content"><img src="http://s6.mogujie.cn/pic/121218/bech_kqyuqx2km5bhsytwgfjeg5sckzsew_452x159.jpg"><a class="over_btn" href="http://www.mogujie.com/webapp/bags?f=zn2-121218tskbag#show_event_body1" target="_blank"></a></div>',
																			scroll : !0
																		}, d = new MGLightBox(d), d
																				.init(), a(".lb_mori_content .over_btn,#lb_mori .lb_close")
																				.click(
																						function() {
																							a("#lb_mori,.light_box_fullbg")
																									.remove()
																						}))
																		: alert(e)
					}
				}
			})
		})
	};
	MOGU.Event_Mori_Bag = function() {
		a(".backpack_img .bag1").hover(function() {
			a(".backpack_img .tip").size() == 0 && a(".db_ok").size() == 0
					&& a(".backpack_img").append('<span class="tip"></span>')
		}, function() {
			a(".backpack_img .tip").remove()
		});
		a(".backpack_img .bag1").live("click", function() {
			var b = a(this);
			a(".backpack_img .db_ok").remove();
			a(".backpack_img .tip").hide();
			if (MOGUPROFILE.userid == "")
				return MOGU.user_handsome_login_init(), MOGU
						.user_handsome_login(!1, {
									callback : function() {
										b.click()
									}
								}), !1;
			if (a(".my_package_box").size() != 0)
				return a(".my_package_box").remove(), a(".backpack_img .bag1")
						.removeClass("bag3"), !1;
			a.ajax({
				url : "/webapp/bags/getallbags",
				type : "POST",
				timeout : 6E4,
				data : {},
				dataType : "json",
				success : function(b) {
					if (b == null)
						alert(MGLANG.msgTimeout);
					else {
						var f = b.status.code, e = b.status.msg;
						f == 1001
								? (a(".backpack_img .bag1").addClass("bag3"), b = b.result.html, a("body")
										.append(b), b = a(".backpack_img")
										.offset().left
										- 265, a(".my_package_box").css({
											left : b
										}))
								: f == 1002 ? ((new MGLightBox({
									title : " ",
									lightBoxId : "lb_mori",
									contentHtml : '<div class="lb_mori_content bag_list"><img src="http://s6.mogujie.cn/pic/121215/zmfu_kqyukx22m5bdktcugfjeg5sckzsew_452x102.jpg"><a class="go_link link_btn1" href="/webapp/bags" target="_blank"></a></div>',
									scroll : !0
								})).init(), a(".bag_list .go_link").click(
										function() {
											a("#lb_mori,.light_box_fullbg")
													.remove()
										}))
										: alert(e)
					}
				}
			})
		});
		document.onclick = function(b) {
			b = b || window.event;
			b = b.srcElement || b.target;
			a(b).attr("class") != "my_package_box r5"
					&& a(b).parents(".my_package_box").attr("class") != "my_package_box r5"
					&& a(b).parent().attr("class") != "backpack_img"
					&& a(b).attr("class") != "db_ok"
					&& (a(".my_package_box,.backpack_img .db_ok").remove(), a(".backpack_img .bag1")
							.removeClass("bag3"))
		};
		a(".my_package_box ul li p span").live("click", function() {
			var b = a(this), c = b.parents("li").find("h2 a").attr("bagid"), f = b
					.attr("tid");
			a.ajax({
						url : "/webapp/bags/bagdelgoods",
						type : "POST",
						timeout : 6E4,
						data : {
							twitterId : f,
							bagId : c
						},
						dataType : "json",
						success : function(a) {
							if (a == null)
								alert(MGLANG.msgTimeout);
							else {
								var c = a.status.msg;
								a.status.code == 1001
										? b.parent().remove()
										: alert(c)
							}
						}
					})
		});
		a(".my_package_box ul li h2 .package_btn, .backpack_img .db_ok a,#lb_mori .lb_mori_content .link_btn2")
				.live("click", function() {
					var b = a(this).attr("bagid"), c = window.location.href;
					(new MGLightBox({
						title : " ",
						lightBoxId : "lb_mori",
						contentHtml : '<div class="lb_mori_content db_list"><img src="http://s5.mogujie.cn/pic/121217/3nq8_kqyvmx2km5bgu2cugfjeg5sckzsew_452x114.jpg"><a class="go_link" href="javascript:;"></a></div>',
						scroll : !0
					})).init();
					a(".db_list .go_link").click(function() {
						a("#lb_mori,.light_box_fullbg").remove();
						a.ajax({
							url : "/webapp/bags/package",
							type : "POST",
							timeout : 6E4,
							data : {
								bagId : b,
								url : c
							},
							dataType : "json",
							success : function(b) {
								if (b == null)
									alert(MGLANG.msgTimeout);
								else {
									var c = b.status.msg;
									if (b.status.code == 1001) {
										var c = b.result.imgsrc, b = b.result.total, g = (new Date)
												.getTime(), c = b == 3
												? '<div class="lb_mori_content"><img src="http://s4.mogujie.cn/pic/121216/1v7n_kqyuwx2em5bdiwkugfjeg5sckzsew_452x148.jpg"><a class="share_btn_v1" href="http://service.weibo.com/share/share.php?url='
														+ encodeURIComponent("http://www.mogujie.com/webapp/bags?time="
																+ g)
														+ "&title="
														+ encodeURIComponent("\u5982\u679c2012\u771f\u7684\u6765\u4e86\uff0c\u6211\u7684#\u672b\u65e5\u80cc\u5305#\u91cc\u4e00\u5b9a\u8981\u5e26\u4e0a\u5b83\u4eec\uff01\u4f60\u5462\uff1f")
														+ "&appkey=709410795&pic="
														+ c
														+ ' " target="_blank"></a></div>'
												: '<div class="lb_mori_content"><img src="http://s7.mogujie.cn/pic/121213/3x51_kqyvoz3cm5bgev2ugfjeg5sckzsew_452x148.jpg"><a class="share_btn" href="http://service.weibo.com/share/share.php?url='
														+ encodeURIComponent("http://www.mogujie.com/webapp/bags?time="
																+ g)
														+ "&title="
														+ encodeURIComponent("\u5982\u679c2012\u771f\u7684\u6765\u4e86\uff0c\u6211\u7684#\u672b\u65e5\u80cc\u5305#\u91cc\u4e00\u5b9a\u8981\u5e26\u4e0a\u5b83\u4eec\uff01\u4f60\u5462\uff1f")
														+ "&appkey=709410795&pic="
														+ c
														+ ' " target="_blank"></a></div>', c = {
											title : " ",
											lightBoxId : "lb_mori",
											contentHtml : c,
											scroll : !0
										}, c = new MGLightBox(c);
										c.init();
										a(".lb_mori_content a").click(
												function() {
													a("#lb_mori,.light_box_fullbg")
															.remove();
													h()
												})
									} else
										alert(c)
								}
							}
						})
					})
				});
		a(".my_package_box ul li h2 .share_btn").live("click", function() {
			var b = a(this).attr("imgsrc"), c = (new Date).getTime();
			window
					.open("http://service.weibo.com/share/share.php?url="
							+ encodeURIComponent("http://www.mogujie.com/webapp/bags?time="
									+ c)
							+ "&title="
							+ encodeURIComponent("\u5982\u679c2012\u771f\u7684\u6765\u4e86\uff0c\u6211\u7684#\u672b\u65e5\u80cc\u5305#\u91cc\u4e00\u5b9a\u8981\u5e26\u4e0a\u5b83\u4eec\uff01\u4f60\u5462\uff1f")
							+ "&appkey=709410795&pic=" + b);
			h()
		})
	};
	MOGU.Event_Mori_Package();
	MOGU.Event_Mori_Bag()
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
						.getAbsoluteLocation(b), e = a(this).attr("fc"), g = d
						.find(".pic img").first().attr("src").replace(
								"180x999", "100x100"), e = {
					twitterid : c,
					content : "\u6211\u559c\u6b22\u8fd9\u4e2a\uff0c\u8c22\u8c22\u4f60\u7684\u5206\u4eab[\u5fc3]",
					local : MOGUPROFILE.local,
					imgsrc : g,
					from_cate : e
				};
				if (g = a(this).attr("bwp"))
					e.bwp = g;
				if (g = a(this).attr("valid"))
					e.valid = g;
				if (g = a(this).attr("validcode"))
					e.validcode = g;
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
							var h = f.status.code, e = f.status.msg;
							h == 1001
									? (show_tip = !1, h = f.result.data.cfav, a(b)
											.next(".favDiv")[0]
											? (a(b).next(".favDiv")
													.find(".favCount").text(h), MOGUPROFILE.is_subsite == "1"
													&& a(b)
															.nextAll(".fav_show")
															.find("p")
															.html(h
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
									: h == 6002
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
																clearTimeout(g);
																a("#fav_tip,#fav_yaya")
																		.show()
															}, function() {
																clearTimeout(g);
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
											: h == 6003
													? (tip_html = MGTEMPLATE.favTip_me
															.replace(
																	/{uid}/g,
																	MOGUPROFILE.userid), show_tip = !0)
													: h == 2034
															? (show_tip = !1, f = f.result.data.favs, f = parseInt(f)
																	+ 1, f < 5
																	? (h = "", f == 1
																			? h = "http://www.mogujie.com/book/shoes/"
																			: f == 2
																					? h = "http://www.mogujie.com/book/bags/"
																					: f == 3
																							? h = "http://www.mogujie.com/book/accessories/"
																							: f == 4
																									&& (h = "http://www.mogujie.com/book/home/"), f = {
																		title : "\u7b2c\u4e8c\u6b65\uff1a\u559c\u6b22\u6709\u5956",
																		lightBoxId : "lb_jifenbao_second_step_two",
																		scroll : !0,
																		isBgClickClose : !1,
																		contentHtml : '<div class="all_main"><div class="prompt">\u60a8\u5df2\u7ecf\u559c\u6b22\u4e86\u7b2c'
																				+ f
																				+ "\u4ef6\u5b9d\u8d1d\uff0c\u53bb\u6311\u7b2c"
																				+ (f + 1)
																				+ '\u4ef6\u5427\u3002</div><div class="go_register"><a href="'
																				+ h
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
								var g = setTimeout(function() {
											a("#fav_tip,#fav_yaya").remove()
										}, 3E3);
								a("#fav_tip,#fav_yaya").hover(function() {
											clearTimeout(g);
											a("#fav_tip,#fav_yaya").show()
										}, function() {
											clearTimeout(g);
											g = setTimeout(function() {
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
	MOGU.Image_Wall_Show_Reply_Box = function(b, d, c) {
		MGTEMPLATE.book_pub_content_frame = '<div id="reply_body" class="rep_bd" type="{type}">{pub_content}</div>';
		MGTEMPLATE.book_pub_content = '<i class="{tip_class}"></i><div class="i_w_rep r5">{yaya}<textarea class="rep_cont r3">{content}</textarea><div class="i_w_pub clearfix"><a href="javascript:;"><img class="fl add_face" style="margin-top:5px" w="book_rpl" onclick="return false;" src="/img/add_face_c.png"></a><a class="pub fr" href="javascript:;" id="book_'
				+ d + '_{tid}">{btn}</a></div></div>';
		var i = "", e = "", g = "", f = "";
		if ("cmt" == d)
			i = "tri_tip_r", e = "\u559c\u6b22\u5c31\u8bf4\u4e24\u53e5\u5427", g = "\u53d1\u8868";
		else if ("fav" == d)
			i = "tri_tip_l", e = "\u6c42\u8bc4\u8bba\uff01", g = "\u786e\u5b9a", f = '<img style="margin:0 0 -5px 10px;" src="/img/imgwall_cmt_yaya.png">';
		else
			return;
		var h = b.attr("tid");
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
						/{btn}/, g).replace(/{yaya}/, f).replace(/{tid}/, h));
				var j = a("#reply_body .rep_cont");
				MOGU.Globe_Input_Text(j);
				MOGU.Globe_Bind_Keybord_Submit(j, a("book_" + d + "_" + h));
				if ("cmt" == d)
					c.replyId = h, MOGU.Image_Wall_Reply(c,
							"/replytwitter/add", e);
				else if ("fav" == d)
					c.retweetId = h, MOGU.Image_Wall_Reply(c,
							"/twitter/editfav", e)
			}
		if (a("#reply_body").size() == 0)
			if (b = b.find(".bd"), i = MGTEMPLATE.book_pub_content_frame
					.replace(/{type}/, d)
					.replace(
							/{pub_content}/,
							MGTEMPLATE.book_pub_content.replace(/{tip_class}/,
									i).replace(/{content}/, e).replace(/{btn}/,
									g).replace(/{yaya}/, f).replace(/{tid}/, h)), b
					.append(i), j = a("#reply_body .rep_cont"), a("#reply_body")
					.slideDown(300, function() {
						MOGU.Globe_Bind_Keybord_Submit(j, a("#book_" + d + "_"
										+ h))
					}), MOGU.Globe_Input_Text(j), "cmt" == d)
				c.replyId = h, MOGU.Image_Wall_Reply(c, "/replytwitter/add", e);
			else if ("fav" == d)
				c.retweetId = h, MOGU
						.Image_Wall_Reply(c, "/twitter/editfav", e);
		a("#reply_body .add_face").click(function() {
			a("#reply_body .rep_cont").val() == e
					&& a("#reply_body .rep_cont").val("")
		})
	};
	MOGU.Image_Wall_Show_Fav_Reply_Box = function(b, d) {
		MGTEMPLATE.book_fav_pub_box = '<div id="reply_body" class="fav_say s" ><span class="removeparents">X</span><div class="fav_say_bg"></div><input class="t" type="text" value="\u6c42\u8bc4\u8bba\uff01"><textarea class="rep_cont">\u6c42\u8bc4\u8bba\uff01</textarea><div class="tb"><img class="fl add_face" w="book_rpl" onclick="return false;" src="/img/add_face_c.png"><a class="pub fr" href="javascript:;">\u786e\u5b9a</a></div></div>';
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
		});
		c.find(".removeparents").click(function() {
					c.remove()
				})
	};
	MOGU.Image_Wall_Reply = function(b, d, c, i) {
		a("#reply_body .pub").click(function() {
			var e = a("#reply_body .rep_cont").val(), g = i;
			if (i == void 0 || i == void 0)
				g = a(this).parents(".i_w_f");
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
								? (a("#reply_body").remove(), c = c.result, b = g
										.find(".reply_l"), b.size() == 0
										&& (g
												.find(".ws_ft")
												.before('<ul class="rep_list reply_l"></ul>'), b = g
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
(function(a) {
	MOGU.Wall_Loader = function(l) {
		var m = {
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
			m.ajax_url = "/book/ajaxjia";
		if (MOGUPROFILE.bookajax)
			m.ajax_url = MOGUPROFILE.bookajax;
		var c = a.extend(m, l);
		if (a("." + c.container_class).size() != 0) {
			var n = MOGUPROFILE.lastTweetId, u = MOGUPROFILE.book;
			if (u != void 0) {
				typeof n === "undefined" && (n = "");
				var f = 0, j = !1, p = null, v = !1, o = [], q = !1, r = "";
				if (!Array.indexOf)
					Array.prototype.indexOf = function(a) {
						for (var c = 0; c < this.length; c++)
							if (this[c] == a)
								return c;
						return -1
					};
				if (null == c.image_cols)
					c.image_cols = a("." + c.container_class).find(".col");
				for (var s = parseInt(c.image_cols.size()), w = [], d = [], g = null, l = 0; l < s; l++)
					g = a(c.image_cols.get(l)), w.push(g), d.push(g.height()
							+ g.offset().top);
				var x = function() {
					if (c.iwff_html != "") {
						d = [];
						for (var b = 0; b < s; b++)
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
					var A = function() {
						var b = a("." + c.container_class).attr("id"), d = MGTOOL
								.getCookie("qzone_add"), h = MGTOOL
								.getCookie("pop_type"), y = MGTOOL
								.getCookie("is_shop_ex"), g = MGTOOL
								.getQueryString("gdtt") == "" ? !0 : !1;
						MOGUPROFILE.userid == ""
								&& a("#lb_login").size() == 0
								&& MOGUPROFILE.showqq != "is_qzone"
								&& g
								&& (f == 2 && h
										? h == 1
												? MOGU.Sina_Box_Login_Init()
												: h == 2
														? MOGU
																.Qzone_Box_Login_Init()
														: MOGU
																.user_handsome_login_init()
										: f == 0 && d == 3 || f == 4 && d == 3
												? MOGU.Qzone_Box_Login_Init()
												: f == 2 && y == 1
														? MOGU
																.Qzone_Box_Login_Init()
														: MOGUPROFILE.showqq
																&& f == 0
																? (MOGU
																		.user_handsome_login_init(), MOGU
																		.user_handsome_login())
																: f == 2
																		&& d != 3
																		&& y != 1
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
						MOGU.show_is_follow && g && MOGU.show_is_follow(f);
						MOGU.qzone_bind && g && MOGU.qzone_bind(f);
						j = !0;
						a("#" + c.loading_id).size() == 0
								&& a("#" + b).after(c.loading_html);
						a.ajax({
							url : c.ajax_url,
							type : "POST",
							timeout : 6E4,
							data : {
								lastTweetId : n,
								book : u,
								totalCol : s,
								page : f,
								total : MOGUPROFILE.totalCnt,
								eventId : MOGUPROFILE.eventId
							},
							dataType : "json",
							success : function(b) {
								if (b != null)
									if (b.status.code == 1001) {
										f++;
										a("#" + m.loading_id).remove();
										var d = [];
										if (b.result.html.book)
											d = b.result.html.book;
										for (var g = [], k = [], i = [], e = 0; d.length > e; e++)
											if (i[e] = 0, a(d[e])
													.find(".pic li").each(
															function() {
																i[e] += parseInt(a(this)
																		.css("height"))
															}), !a.browser.msie) {
												a(d[e]).find(".favorite")
														.size() > 0
														&& (i[e] += 32);
												a(d[e]).find(".who_share_s")
														.size() > 0
														&& (i[e] += 50);
												if (a(d[e])
														.find(".tweet_content")
														.size() > 0) {
													k = a(d[e])
															.find(".tweet_content")
															.clone();
													k.find("img").remove();
													var h = a.trim(k.html()).length
															- 48;
													i[e] += 19
															* Math.ceil(h / 25)
															+ 5;
													k.remove()
												}
												a(d[e]).find(".rep_list")
														.size() > 0
														&& (a(d[e])
																.find(".rep_list li")
																.each(
																		function() {
																			i[e] += 20
																		}), i[e] += 8)
											}
										k = i.slice();
										k.sort(function(a, b) {
													return a - b
												});
										for (e = k.length - 1; e >= 0; e--)
											h = a.inArray(k[e], i), i[h] = -1, g
													.push(d[h]);
										o = o.concat(g);
										j = !1;
										n = b.result.data.lastTweetId;
										q = b.result.data.is_end;
										d.length === 0 && (q = !0);
										q
												? (r = b.result.html.pagination, v = !0, clearTimeout(p))
												: t();
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
										a("#" + m.loading_id).remove(), j = !1
							}
						})
					}, t = function() {
						if (!j && !v) {
							clearTimeout(p);
							var b = Math.max(document.body.scrollHeight,
									document.documentElement.scrollHeight)
									- Math.min.apply(Math, d)
									- MGTOOL.getAbsoluteLocation(a("."
											+ c.container_class)[0]).absoluteTop;
							MGTOOL.distance2Bottom(b + 1500) && o.length < 5
									|| MOGUPROFILE.bookajaxnow == "1"
									? (MOGUPROFILE.bookajaxnow = "0", A())
									: p = setTimeout(t, 500)
						}
					}, z = function() {
						if (q && o.length == 0) {
							a("." + c.container_class)
									.after('<div class="image_wall_more clr "></div>');
							x();
							if (!MGTOOL.empty(r)) {
								a(".image_wall_more").prepend(r);
								if (MOGUPROFILE.is_subsite != "1") {
									var b = window.location.toString();
									b.indexOf("/elegant") > 0
											? a(".image_wall_more")
													.after('<div id="ad_tanx_note_middle_show" class="mt20 pb20"><iframe src="/mbs_wall_bottom.php?showpage=elegant" frameborder="0" width="960" height="90" scrolling="no" frameborder="0"></iframe></div>')
											: (b.indexOf("/book/") > 0 || b
													.indexOf("/shopping") > 0)
													&& a(".image_wall_more")
															.after('<div id="ad_tanx_note_middle_show" class="mt20 pb20"><iframe src="/mbs_wall_bottom.php" frameborder="0" width="960" height="90" scrolling="no" frameborder="0"></iframe></div>')
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
								var h = "/book/girlladyguide?stat=parent", f = MOGUPROFILE.showParent_name, l = MOGUPROFILE.showParent_url
										.replace(/&amp;/g, "&"), f = '<a href="javascript:;" class="lady_btn">\u53bb\u201c'
										+ f + "\u201d\u901b\u901b</a>";
								b();
								a(".pagination").prepend(f);
								a(".pagination .lady_btn").click(function() {
											window.location.href = l;
											g(h)
										})
							}
							if (MOGUPROFILE.showGirl) {
								var h = "/book/girlladyguide?stat=girl", m = MOGUPROFILE.showGirl_url
										.replace(/&amp;/g, "&");
								b();
								a(".pagination")
										.append('<a href="javascript:;" class="girl_btn">\u6362\u6210<b></b>Girl\u98ce\u683c\u770b\u770b</a>');
								a(".pagination .girl_btn").click(function() {
											window.location.href = m;
											g(h)
										})
							}
							if (MOGUPROFILE.showLady) {
								var h = "/book/girlladyguide?stat=lady", n = MOGUPROFILE.showLady_url
										.replace(/&amp;/g, "&");
								a(".image_wall_more")
										.append('<div class="wall_bottom_bg"><a class="w_l_c" href="javascript:;"></a><span>\u60f3\u770b\u4e0d\u540c\u98ce\u683c\u7684\u5b9d\u8d1d\u5417?</span><a class="w_b_l" href="javascript:;">\u53bb<b></b>Lady\u98ce\u683c\u901b\u901b</a></div>');
								a(".wall_bottom_bg .w_l_c").click(function() {
											a(".wall_bottom_bg").remove()
										});
								a(".wall_bottom_bg .w_b_l").click(function() {
											window.location.href = n;
											g(h)
										})
							}
						} else {
							if (o.length > 0) {
								var b = a(o.shift()), f = d.indexOf(Math.min
										.apply(Math, d)), j = w[f];
								j.append(b);
								d[f] = j.height() + j.offset().top
							}
							setTimeout(z, c.sort_interval)
						}
					};
					setTimeout(z, c.sort_interval);
					p = setTimeout(t, c.check_interval)
				}
			}
		}
	}
})(jQuery);
(function(a) {
	MOGU.Top_Catgray = function() {
		function d() {
			var b = a("#imagewall_container").offset().top, c = a(".suspension_category"), d = !1;
			g == !0 || h > 3 ? (a.browser.msie && a.browser.version == "6.0"
					&& (d = !0, c.css("position", "absolute")), i(c), a(window)
					.scroll(function() {
								var e = a(window).scrollTop();
								e >= b ? c.fadeIn("slow") : c.fadeOut("slow");
								d && c.css("top", e)
							})) : (j(), h++)
		}
		var g = !1, f, h = 0, i = function(b) {
			var c = b.find(".cate_detail"), d = b.find(".cate_simple"), b = a(".suspension_category .showall"), e = MOGUPROFILE.fcid;
			e && (a(".cate_simple a").each(function(b, c) {
						var d = a(c).attr("data-id");
						e == parseInt(d, 10) && a(c).addClass("current")
					}), a(".cate_detail span").each(function(b, c) {
						var d = a(c).attr("data-id");
						e == parseInt(d, 10)
								&& a(c).children("a").addClass("current")
					}));
			b.click(function() {
						var b = a(this);
						f && clearTimeout(f);
						a(this).hasClass("hideall")
								? (d.show(), c.hide(), b.removeClass("hideall"), b
										.text("\u5c55\u5f00"))
								: f = setTimeout(function() {
											d.hide();
											c.show();
											b.addClass("hideall");
											b.text("\u6536\u8d77")
										}, 300)
					})
		}, j = function() {
			a.ajax({
				url : "/book/bottom",
				type : "POST",
				timeout : 6E4,
				data : {
					action : MOGUPROFILE.action,
					fcid : MOGUPROFILE.fcid,
					f3cid : MOGUPROFILE.f3cid,
					sort : MOGUPROFILE.sort
				},
				dataType : "json",
				success : function(b) {
					if (b == null)
						alert(MGLANG.msgTimeout);
					else {
						var c = b.status.msg;
						b.status.code == 1001
								? (b = b.result.html, a("body").append(b), a(".suspension_category .category_wrap")
										.append('<span class="showall" >\u5c55\u5f00</span>'), g = !0, d())
								: alert(c)
					}
				},
				error : function(a, c) {
					"timeout" == c && alert(MGLANG.msgTimeout)
				}
			})
		};
		a(".show_history_btn").length > 0 && d()
	};
	MOGU.Top_Catgray();
	MOGU.Book_Dapei_Change_Tab = function() {
		a(".dapei_tab").mouseenter(function() {
					a(".dapei_tab").toggleClass("c");
					a(".dapei_daren_list").toggle()
				})
	};
	MOGU.Globe_Input_Text(a(".book_search .book_s_txt"));
	a(".imagewall").size() != 0 && MOGU.Wall_Loader({
				end_callback : function() {
					typeof MOGU.Elegant_GetWabao_Countdown === "function"
							&& MOGU.Elegant_GetWabao_Countdown()
				}
			});
	a("#dapei_daren_tab").size() > 0 && MOGU.Book_Dapei_Change_Tab();
	a("#werfare_tpk").size() != 0
			&& MGPLUGIN.Photo_Slide
			&& MGPLUGIN.Photo_Slide("werfare_tpk", "werfare_tpk_btn",
					"werfare_tpk_f", 205);
	a(".category_color li .c").hover(function() {
				a(this).find("img").attr("src", "/img/category_icon_close.png")
			}, function() {
				a(this).find("img").attr("src", "/img/category_icon.png")
			});
	a(".clothes_category").hover(function() {
				var d = a(this);
				setTimeout(function() {
							d.toggleClass("category_bg");
							d.find(".more_btn a").toggleClass("hover")
						}, 400)
			});
	a("#xiaozu_show")[0]
			&& (typeof MGPLUGIN.Photo_Slide == "undefined" ? a.getScript(
					"/js2/module-photoslide.js", function() {
						MGPLUGIN.Photo_Slide({
									listID : "xiaozu_show",
									listBtnID : "dot_show",
									feedClassName : "xiao_show_li",
									feedWidth : 210
								})
					}) : MGPLUGIN.Photo_Slide({
						listID : "xiaozu_show",
						listBtnID : "dot_show",
						feedClassName : "xiao_show_li",
						feedWidth : 210
					}));
	MOGUPROFILE.is_subsite == "1" && a("#col0 .add_highlight").size() != 0
			&& (a("#col0").css("_margin-right", "6px"), setTimeout(function() {
						a("#col0 .i_w_f:eq(0)").removeClass("add_style")
					}, 300), setTimeout(function() {
						a("#col0 .i_w_f:eq(0)").addClass("add_style")
					}, 600), setTimeout(function() {
						a("#col0 .i_w_f:eq(0)").removeClass("add_style")
					}, 900))
})(jQuery);
(function(a) {
	MOGU.Qzone_Box_Init = function() {
		lb_share_pk_info = new MGLightBox({
			title : "\u5173\u6ce8QQ\u7a7a\u95f4",
			lightBoxId : "lb_qzone_add",
			contentHtml : MOGUPROFILE.is_subsite == "1"
					? '<div class="qzone_add"><img src="http://s6.mogujie.cn/pic/120503/1v7n_kqytcqlyozbhmx2ugfjeg5sckzsew_305x111.jpg" /><iframe src="http://open.qzone.qq.com/like?url=http%3A%2F%2Fuser.qzone.qq.com%2F2242823487&type=button&width=400&height=30&style=3" allowtransparency="true" scrolling="no" border="0" frameborder="0" style="width:145px;height:30px;border:none;overflow:hidden;margin:0 0 0 98px;"></iframe></div>'
					: '<div class="qzone_add"><img src="http://s6.mogujie.cn/pic/120503/1v7n_kqytcqlyozbhmx2ugfjeg5sckzsew_305x111.jpg" /><iframe src="http://open.qzone.qq.com/like?url=http%3A%2F%2Fuser.qzone.qq.com%2F1927997462&type=button&width=400&height=30&style=3" allowtransparency="true" scrolling="no" border="0" frameborder="0" style="width:145px;height:30px;border:none;overflow:hidden;margin:0 0 0 98px;"></iframe></div>',
			ajax : !1,
			scroll : !0,
			isBgClickClose : !1,
			closeCallBack : function() {
				a.ajax({
							url : "/collect/qzonefollownewclose",
							type : "POST",
							timeout : 6E4,
							async : !1,
							dataType : "json",
							success : function() {
							}
						})
			}
		});
		lb_share_pk_info.init();
		setTimeout(function() {
					a("#lb_qzone_add .lb_close").show()
				}, 4E3);
		a.ajax({
					url : "/collect/qzonefollownewpop",
					type : "POST",
					timeout : 6E4,
					async : !1,
					dataType : "json",
					success : function() {
					}
				})
	};
	MOGU.Qzone_Box_Login_Init = function() {
		var b;
		b = '<div class="qzone_login"><a class="login_btn mb30" href="$url$"></a><p style="text-align:right;">\u5df2\u6709\u8d26\u53f7\uff0c\u76f4\u63a5<a href="/login">\u767b\u5f55</a></p></div>'
				.replace("$url$", "/oauth/login/qq/"
								+ (MOGUPROFILE.is_subsite == 1
										? "mogujia"
										: "mogujie"));
		lb_share_pk_info = new MGLightBox({
					title : "\u767b\u5f55",
					lightBoxId : "lb_qzone_add",
					contentHtml : b,
					ajax : !1,
					scroll : !0,
					isBgClickClose : !1
				});
		lb_share_pk_info.init();
		a("#lb_qzone_add .lb_close").show()
	};
	MOGU.Qzone_Add_Init = function() {
		MGTOOL.getRequest("is_qq_pop_register") == "1"
				&& MOGUPROFILE.is_qq_not_follow == "1" && MOGU.Qzone_Box_Init()
	};
	MOGU.Qzone_Add_Init();
	MOGU.Sina_Box_Login_Init = function() {
		var b;
		b = '<div class="qzone_login sina_login"><a class="login_btn mb30" href="$url$"></a><p style="text-align:right;">\u5df2\u6709\u8d26\u53f7\uff0c\u76f4\u63a5<a href="/login">\u767b\u5f55</a></p></div>'
				.replace("$url$", "/oauth/login/sina/"
								+ (MOGUPROFILE.is_subsite == 1
										? "mogujia"
										: "mogujie"));
		lb_share_pk_info = new MGLightBox({
					title : "\u767b\u5f55",
					lightBoxId : "lb_qzone_add",
					contentHtml : b,
					ajax : !1,
					scroll : !0,
					isBgClickClose : !1
				});
		lb_share_pk_info.init();
		a("#lb_qzone_add .lb_close").show()
	}
})(jQuery);