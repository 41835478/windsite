$(function() {
	$.extend($.fn, {

		/**
		 * 文本输入框加上聚焦清空，失焦停留提示功能。<br/> 如果利用{@link Xwb.ax.ValidationMgr}类作表单验证，制作类似功能时不必直接采用该方法，
		 * Validator类提供一系列验证器无需写代码即可轻松实现，详见该类的各种验证器。<br/> 如果当前文本框已经过{@link Xwb.ax.SelectionHolder}实例处理，
		 * 则focusText方法会利用当前{@link Xwb.ax.SelectionHolder}实例输出文本。
		 * 
		 * @param {String}
		 *            hoverText 停留提示文字
		 * @param {String}
		 *            [focusStyle] 修饰样式类
		 * @param {DomSelector}
		 *            [cssNode]
		 * @param {Boolean}
		 *            [removeOnFocus] 如果为false，当聚焦后添加css类，否则移除css类
		 * 
		 * <pre><code>
		 * $('#id').focusText('这里输入用户名', 'focusStyle');
		 * </code></pre>
		 */
		focusText : function(text, css, cssNode, removeOnFocus) {
			this.each(function() {
				$(this).focus(function() {
					if (this.value === text) {
						var selHolder = $(this).data('xwb_selholder');
						if (selHolder)
							selHolder.setText('');
						else
							this.value = '';
					}
					if (css) {
						if (removeOnFocus)
							$(cssNode || this).removeClass(css);
						else
							$(cssNode || this).addClass(css);
					}
				}).blur(function() {
					if ($.trim(this.value) === '') {
						var selHolder = $(this).data('xwb_selholder');
						if (selHolder)
							selHolder.setText(text);
						else
							this.value = text;
					}
					if (css) {
						if (removeOnFocus)
							$(cssNode || this).addClass(css);
						else
							$(cssNode || this).removeClass(css);
					}
				});
			});
		}

	});
})
function QQ_LOGIN(qq) {
	if (typeof (QC) != 'undefined' && typeof (qq) != 'undefined' && qq != '') {
		if (QC.Login.check()) {// 如果已登录
			QC.Login
					.getMe(function(openId, accessToken) {
						QC
								.api("get_user_info")
								.success(
										function(s) {// 成功回调
											$
													.post(
															'/router/fanli/loginfl/third',
															{
																third_type : 'qq',
																third_id : ''
																		+ openId,
																third_nick : s.data.nickname,
																referer : document.location.href
															},
															function(state) {
																if (typeof (IS_LOGIN) != 'undefined'
																		&& IS_LOGIN) {
																	if (state == 202) {
																		document.location.href = '/router/fanli/registe';
																	} else {
																		document.location.href = '/router/fanlimember';
																	}

																} else {
																	if (state == 202) {
																		document.location.href = '/router/fanli/registe?referer='
																				+ document.location.href;
																	} else {
																		document.location.href = document.location.href;
																	}
																}
															});
											QC.Login.signOut();
										}).error(function(f) {// 失败回调
								}).complete(function(c) {// 完成请求回调
								});

					});
		}

	}
}
window.XT = {};
window.XT.Suggest = {};
window.XT.Suggest.ItemSearchCallback = function(d) {
	var q = $('.search-auto input[name="q"].focus');
	if (q.length == 1 && typeof d == "object" && typeof d.result != "undefined") {
		var r = d.result;
		// TODO 暂未写入缓存
		q.data('autocompleter').filterAndShowResults(r);
	}
}
var PageModuleUtils = {
	unlogin : function(sina, qq) {
		PageModuleUtils.unLoginSite('true', sina, qq);
	},
	unLoginSite : function(isLogin, sina, qq) {
		if ('true' == isLogin) {
			$('#J_LinkBuy').click(
					function() {
						$('#J_FanliLoginBox').data('overlay').load();
						var link = $(this).attr('href');
						$('#J_FanliLoginButton').attr('data-url', link);
						$('#J_FanliRegiste').attr('href',
								'/router/fanli/registe?referer=' + link);// 注册链接
						$('#J_FanliLink').attr('href', link);
						return false;
					});
		}
		
		if (typeof (QC) != 'undefined') {
			QQ_LOGIN(qq);
			if ($('#nav_third_login_qq').length > 0) {
				QC.Login({
					btnId : "nav_third_login_qq",// 插入按钮的html标签id
					size : "A_M",// 按钮尺寸
					scope : "get_user_info",// 展示授权，全部可用授权可填 all
					display : "pc"// 应用场景，可选
				}, function(reqData, opts) {// 登录成功
					QQ_LOGIN(qq);
				});
			}
			if ($('#third_login_qq').length > 0) {
				QC.Login({
					btnId : "third_login_qq",// 插入按钮的html标签id
					size : "A_M",// 按钮尺寸
					scope : "get_user_info",// 展示授权，全部可用授权可填 all
					display : "pc"// 应用场景，可选
				}, function(reqData, opts) {// 登录成功
					QQ_LOGIN();
				});
			}
		}

		if (typeof (sina) != 'undefined' && sina != '') {
			$
					.getScript(
							'http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey='
									+ sina,
							function() {
								if (typeof (WB2) != 'undefined') {
									WB2
											.anyWhere(function(W) {
												if ($('#nav_third_login_sina').length > 0
														&& $('#nav_third_login_sina .weibo_widget_connect_btn').length == 0) {
													W.widget
															.connectButton({
																id : "nav_third_login_sina",
																type : '3,2',
																callback : {
																	login : function(
																			o) {
																		$
																				.post(
																						'/router/fanli/loginfl/third',
																						{
																							third_type : 'sina',
																							third_id : ''
																									+ o.id,
																							third_nick : o.screen_name,
																							referer : document.location.href
																						},
																						function(
																								state) {
																							if (typeof (IS_LOGIN) != 'undefined'
																									&& IS_LOGIN) {
																								if (state == 202) {
																									document.location.href = '/router/fanli/registe';
																								} else {
																									document.location.href = '/router/fanlimember';
																								}

																							} else {
																								if (state == 202) {
																									document.location.href = '/router/fanli/registe?referer='
																											+ document.location.href;
																								} else {
																									document.location.href = document.location.href;
																								}
																							}
																						});
																		WB2
																				.logout();
																	},
																	logout : function() {
																	}
																}
															});
												}
												if ($('#third_login_sina').length > 0
														&& $('#third_login_sina .weibo_widget_connect_btn').length == 0) {
													W.widget
															.connectButton({
																id : "third_login_sina",
																type : '3,2',
																callback : {
																	login : function(
																			o) {
																		$
																				.post(
																						'/router/fanli/loginfl/third',
																						{
																							third_type : 'sina',
																							third_id : ''
																									+ o.id,
																							third_nick : o.screen_name,
																							referer : document.location.href
																						},
																						function(
																								state) {
																							if (typeof (IS_LOGIN) != 'undefined'
																									&& IS_LOGIN) {
																								if (state == 202) {
																									document.location.href = '/router/fanli/registe';
																								} else {
																									document.location.href = '/router/fanlimember';
																								}

																							} else {
																								if (state == 202) {
																									document.location.href = '/router/fanli/registe?referer='
																											+ document.location.href;
																								} else {
																									document.location.href = document.location.href;
																								}
																							}
																						});
																		WB2
																				.logout();
																	},
																	logout : function() {
																	}
																}
															});
												}
											});
								}
							});

		}
	},

	addFanliCommission : function(rate) {
		if (rate == 0) {
			return;
		}
		$('.b2c-fl').show();
		$(
				'#content .shop-display .item,#content .list-view .list-item,#content .shop-tenorder .pic,#content .shop-complex-a .item,#content .shop-dianpu .shop-dianpu-ul li,#content .shop-child-floor .child-grid li')
				.each(
						function() {
							var pre = '返利:';
							var last = '元';
							var c = $(this).attr('co');
							if (c) {
								var co = Math.floor(parseFloat(c) * rate * 100) / 100.00;
								$(this).append(
										'<div class="c-c" title="' + pre + co
												+ last + '" style="">' + pre
												+ co + last + '</div>');
							} else {
								c = $(this).attr('cr');
								pre = '返利比例:';
								last = '%';
								if (c) {
									var co = Math.floor(parseFloat(c) * rate
											* 100) / 100.00;
									$(this).append(
											'<div class="c-c" title="' + pre
													+ co + last + '" style="">'
													+ pre + co + last
													+ '</div>');
								}
							}
						});
		$('#detail .xt-detail-price:first')
				.each(
						function() {
							var pre = '返　　利：';
							var last = '元';
							var self = $(this);
							var nid = $('#detail .xt-gallery .xt-s310').attr(
									'data-id');
							if (nid) {
								var sender = new WindSender(
										'/router/site/getCommission/' + nid
												+ '?v=' + Math.random(), true);
								sender
										.load(
												"GET",
												{},
												function(response) {
													if (response.isSuccess()) {// 转换佣金返利成功
														var c = response.body.co;
														var price = response.body.price;
														if (c == 0) {
															return;
														}
														if (c > 0) {
															var co = Math
																	.floor(parseFloat(c)
																			* rate
																			* 100) / 100.00;
															self
																	.after('<li class="xt-detail-commission xt-clearfix"><span style="color:red;">'
																			+ pre
																			+ '</span>'
																			+ '<strong style="vertical-align: baseline;font-family: Tahoma,Arial,Helvetica,sans-serif;color: #F50;font-size: 24px;font-weight: normal;padding-right: 5px;line-height: 25px;">'
																			+ co
																			+ '</strong>'
																			+ last
																			+ '<li>');
															if (price > 0) {
																// var strong =
																// self.find('strong');
																// if
																// (strong.text()
																// != price) {
																// strong.text(price);
																// $.ajax({
																// url :
																// '/router/site/synitem/'
																// + nid + '?v='
																// +
																// Math.random(),
																// type : 'GET',
																// data : {},
																// beforeSend :
																// function(xhr)
																// {
																// xhr.setRequestHeader(
																// "WindType",
																// "AJAX");//
																// 请求方式
																// xhr.setRequestHeader(
																// "WindDataType",
																// "HTML");//
																// 请求返回内容类型
																// },
																// error :
																// function(request,
																// textStatus,
																// errorThrown)
																// {
																// },
																// success :
																// function(data)
																// {
																// }
																// });
																// }
															}
														}
													}
												});
							}
						});
		// $('#detail .xt-gallery .xt-s310').each(function() {
		// var pre = '返利:';
		// var last = '元';
		// var self = $(this);
		// var nid = $(this).attr('data-id');
		// if (nid) {
		// var sender = new WindSender('/router/site/getCommission/' + nid
		// + '?v=' + Math.random(), true);
		// sender.load("GET", {}, function(response) {
		// if (response.isSuccess()) {// 转换佣金返利成功
		// var c = response.body.co;
		// if (c == 0) {
		// return;
		// }
		// if (c > 0) {
		// var co = Math.floor(parseFloat(c) * rate * 100)
		// / 100.00;
		// self
		// .prepend('<a class="commission-action clearfix" style="display:
		// block;margin: 0 auto auto auto;width: 310px;height: 52px;line-height:
		// 52px;text-decoration: none;position: relative;cursor:
		// pointer;background:
		// url(http://img02.taobaocdn.com/imgextra/i2/71614142/T208mhXo4aXXXXXXXX_!!71614142.png)
		// no-repeat 0 0;"><span class="price J_MorePrice" style="color:
		// white;font-weight: bold;font-size:40px;letter-spacing:
		// -2px;text-shadow: 0 0 0 transparent,1px 1px 1px #8A181B;"><em
		// style="font-size: 26px;font-style: normal;font-weight:
		// bold;margin-right: 3px;font-family: "Microsoft
		// Yahei","Arial","Verda","tahoma";">'
		// + pre
		// + '</em>'
		// + co
		// + '<span style="font-size: 28px;">'
		// + last + '</span></span></a>');
		// }
		// }
		// });
		// }
		//
		// });

	},
	/**
	 * 初始化Header
	 * 
	 * @param {}
	 *            widget
	 */
	initHeader : function(widget) {

	},
	/**
	 * 初始化内容
	 * 
	 * @param {}
	 *            widget
	 */
	initContent : function(widget) {

	},
	/**
	 * 获取模块名称（将）
	 */
	getModuleName : function(module) {
		return module.substring(0, 1).toUpperCase()
				+ module.substring(1, module.length);
	},
	/**
	 * 顶部下拉菜单
	 * 
	 * @param {}
	 *            widget
	 */
	initShopTabNav : function(widget) {
		$('body').append($('.J_MenuSub'));
		var left = widget.offset().left;
		widget
				.find('.J_TabNav')
				.each(
						function() {
							var self = $(this);
							var cat = $(this).attr('cat');
							var popId = '#J_SubMenuPopup_' + cat;
							var pop = $(popId);
							$(this)
									.tooltip(
											{
												tip : pop,
												position : 'bottom center',
												onBeforeShow : function(event,
														offset) {
													self
															.addClass(
																	'submenu-active-item')
															.siblings()
															.removeClass(
																	'submenu-active-item');
													if (typeof (this.getConf().isTrue) == 'undefined') {
														this.getConf().offset = [
																-4,
																left
																		- offset.left ];
														this.getConf().isTrue = true;
													} else {

													}
												},
												onHide : function() {
													self
															.removeClass('submenu-active-item');
												}
											});
						});
	},
	initShopChongzhi : function(widget) {
		var width = 300;
		var height = 170;
		var src = "http://www.taobao.com/go/app/tbk_app/chongzhi_300_170.php?pid="
				+ PID
				+ "&page=chongzhi_300_170.php&size_w=300&size_h=170&stru_phone=1&stru_game=1&stru_travel=1&size_cat=std";
		var layout = widget.parents('.layout:first');
		var region = widget.parents('.J_TRegion:first');
		if (layout.hasClass('grid-m')) {// 单栏
			width = 956;
			height = 30;
			src = "http://www.taobao.com/go/app/tbk_app/chongzhi_950_30.php?pid="
					+ PID
					+ "&page=chongzhi_950_30.php&size_w=956&size_h=30&stru_phone=1&stru_game=1&stru_travel=1&size_cat=std";
		} else if (layout.hasClass('grid-s5m0') || layout.hasClass('grid-m0s5')) {// 两栏
			if (region.hasClass('col-main')) {
				width = 750;
				height = 170;
				src = "http://www.taobao.com/go/app/tbk_app/chongzhi_300_170.php?pid="
						+ PID
						+ "&page=chongzhi_300_170.php&size_w=750&size_h=170&stru_phone=1&stru_game=1&stru_travel=1&size_cat=cst";
			} else {
				width = 210;
				height = 200;
				src = "http://www.taobao.com/go/app/tbk_app/chongzhi_210_200.php?pid="
						+ PID
						+ "&page=chongzhi_210_200.php&size_w=210&size_h=200&stru_phone=1&stru_game=1&stru_travel=1&size_cat=cst";
			}

		} else if (layout.hasClass('grid-s5m0e5')
				|| layout.hasClass('grid-s5e5m0')
				|| layout.hasClass('grid-m0s5e5')) {
			if (!region.hasClass('col-main')) {
				width = 210;
				height = 200;
				src = "http://www.taobao.com/go/app/tbk_app/chongzhi_210_200.php?pid="
						+ PID
						+ "&page=chongzhi_210_200.php&size_w=210&size_h=200&stru_phone=1&stru_game=1&stru_travel=1&size_cat=cst";
			}
		}
		widget.find('#J_ShopChongzhiIframe').width(width).height(height).attr(
				'src', src);
	},
	initShopB2cMall : function(widget) {
		widget.find('a').each(function() {
			var _href = $(this).attr('href');
			if (_href && _href.indexOf('ymall-') != -1) {
				var $href = _href.replace('/ymall-', '/ymall-go-');
				$(this).attr('href', $href);
			}
		});
	},
	/**
	 * 顶部下拉菜单
	 * 
	 * @param {}
	 *            widget
	 */
	initShopMallTabNav : function(widget) {
		$('body').append($('.J_MallSub'));
		var left = widget.offset().left;
		widget
				.find('.J_TabNav')
				.each(
						function() {
							var self = $(this);
							var cat = $(this).attr('cat');
							var popId = '#J_MallSubMenuPopup_' + cat;
							var pop = $(popId);
							$(this)
									.tooltip(
											{
												events : {
													def : "click,mouseleave"
												},
												tip : pop,
												position : 'bottom center',
												onBeforeShow : function(event,
														offset) {
													self
															.addClass(
																	'submenu-active-item')
															.siblings()
															.removeClass(
																	'submenu-active-item');
													if (typeof (this.getConf().isTrue) == 'undefined') {
														this.getConf().offset = [
																-4,
																left
																		- offset.left ];
														this.getConf().isTrue = true;
													} else {

													}
												},
												onHide : function() {
													self
															.removeClass('submenu-active-item');
												}
											});
						});
	},
	/**
	 * 初始化母婴分类模块
	 * 
	 * @param {}
	 *            widget
	 */
	initShopChildCategory : function(widget) {
		widget.find('#J_ChildCats li').each(function() {
			var cat = $(this).attr('data-body');
			$(this).hover(function() {
				$(this).addClass('current').siblings().removeClass('current');
				$('.tab-list-con', widget).removeClass('current');
				$('.tab-list-con-' + cat, widget).addClass('current');
			}, function() {
			});
		});
	},
	/**
	 * 初始化惊喜
	 * 
	 * @param {}
	 *            widget
	 */
	initShopMallJingXi : function(widget) {
		widget
				.find('.jingxi-section')
				.each(
						function() {
							var self = $(this);
							var current = $(this).find('.items a.current');
							var round = $(this).find('.round');
							var details = $(this).find('.detail');
							$(this)
									.find('.items .trigger')
									.each(
											function() {
												$(this)
														.hover(
																function() {
																	var dround = $(
																			this)
																			.attr(
																					'data-round');
																	current
																			.attr(
																					'href',
																					$(
																							this)
																							.attr(
																									'href'))
																			.attr(
																					'style',
																					'background-image:url('
																							+ $(
																									this)
																									.attr(
																											'data-image')
																							+ ');');
																	var browser = $.browser;
																	if (browser.msie) {// IE修订
																		round
																				.attr(
																						'class',
																						'round IERound-'
																								+ dround);
																	} else {
																		round
																				.attr(
																						'class',
																						'round round-'
																								+ dround);
																	}
																	details
																			.hide();
																	self
																			.find(
																					'.detail-'
																							+ dround)
																			.show();
																}, function() {
																});
											});
						});
	},
	/**
	 * 初始化商城浮动分类
	 * 
	 * @param {}
	 *            widget
	 */
	initShopMallCategory : function(widget) {
		$('body').append($('.J_PopSubCategory'));
		var top = widget.offset().top;
		widget.find('.J_MenuItem').each(function() {
			var cat = $(this).attr('cat');
			var pop = $('.J_PopSubCategory[cat="' + cat + '"]');
			$(this).tooltip({
				offset : [ 0, -40 ],
				tip : pop,
				position : 'center right',
				onBeforeShow : function(event, offset) {
					if (typeof (this.getConf().isTrue) == 'undefined') {
						this.getConf().offset = [ top - offset.top, -40 ];
						this.getConf().isTrue = true;
					} else {

					}
				}
			});
		});
	},
	/**
	 * 初始化返利商城分类浮动分类
	 * 
	 * @param {}
	 *            widget
	 */
	initShopMallSideNav : function(widget) {
		$('body').append($('.J_MallPopSubCategory'));
		var top = widget.offset().top;
		widget
				.find('.J_MenuItem')
				.each(
						function() {
							var cat = $(this).attr('cat');
							var pop = $('.J_MallPopSubCategory[cat="' + cat
									+ '"]');
							$(this)
									.tooltip(
											{
												offset : [ 0, -40 ],
												tip : pop,
												position : 'center right',
												onBeforeShow : function(event,
														offset) {
													if (typeof (this.getConf().isTrue) == 'undefined') {
														this.getConf().offset = [
																(top > offset.top ? top
																		- offset.top
																		: 0),
																-40 ];
														this.getConf().isTrue = true;
													} else {

													}
												}
											});
						});
	},
	/**
	 * 初始化淘店铺列表模块
	 * 
	 * @param {}
	 *            widget
	 */
	initShopDianPuList : function(widget) {
		var hoverT = 0, hideT = 0;
		if ($('#popinfo_wrap').length == 0) {
			$('body')
					.append(
							'<div id="popinfo_wrap" class="area"> <div id="popinfo_bg"></div><div id="popinfo"><div class="loading"><img src="http://img02.taobaocdn.com/tps/i2/T16WJqXaXeXXXXXXXX-32-32.gif"><br><span>正在加载，请稍后...</span></div></div></div>');
		}
		var piw = $("#popinfo_wrap");
		var img = new Image();
		widget
				.find(".shop-dianpu-ctr")
				.find("a")
				.hover(
						function() {
							if ($(this).hasClass('shop-mall-a')) {
								var t = this, b2cId = $(t).attr('data-b2cId');
								if (b2cId) {
									hoverT = setTimeout(
											function() {
												var o = $(t).offset(), win = $(window), ot = o.top
														- win.scrollTop(), ol = o.left
														- win.scrollLeft(), wh = win
														.height(), ww = win
														.width(), lto = 25, tto = 19;
												var rate = $(t).attr(
														'data-rate'), cat = $(t)
														.attr('data-cat'), start = $(
														t).attr('data-start'), end = $(
														t).attr('data-end'), picPath = $(
														t).attr('data-pic');
												var html = [
														'<a class="shop_logo" href="'
																+ $(t).attr(
																		"href")
																+ '" target="_blank">',
														'<img class="wait" src="http://img02.taobaocdn.com/tps/i2/T16WJqXaXeXXXXXXXX-32-32.gif">',
														'</a>',
														'<h4><a href="'
																+ $(t).attr(
																		"href")
																+ '" target="_blank">'
																+ $(t).text()
																+ '</a></h4>',
														'<div>',
														'<label style="float:left;">最高返利：</label>',
														'<span class="shop-dianpu-goods" style="float:left;" title="'
																+ rate + '">'
																+ rate
																+ '</span>',
														'<div class="ks-clear"></div></div>',
														'<div>',
														'<label>所属分类：</label>',
														'<span>' + cat
																+ '</span>',
														'</div>',
														'<div>',
														'<label>开始时间：</label>',
														'<span>' + start
																+ '</span>',
														'</div>',
														'<div>',
														'<label>结束时间：</label>',
														'<span>' + end
																+ '</span>',
														'</div>' ].join('');
												$("#popinfo .loading").hide()
														.nextAll().remove();
												$("#popinfo").append(html);
												$(img)
														.attr("src", picPath)
														.load(
																function() {
																	$(
																			"#popinfo .wait")
																			.attr(
																					"alt",
																					$(
																							t)
																							.text())
																			.attr(
																					"src",
																					this.src)
																			.removeClass(
																					"wait")
																			.hide()
																			.fadeIn(
																					"slow");
																});
												if (ww / 1.5 > ol) {
													lto = o.left - lto;
												} else {
													lto = o.left - 345
															+ $(t).width()
															+ lto;
												}
												if (wh / 1.7 > ot) {
													tto = o.top + tto;
												} else {
													tto = o.top - 150;
												}
												piw.css({
													top : tto,
													left : lto
												}).show();
											}, 500);
								}
							} else {
								var t = this, sid = $(t).attr("data-sid");
								if (sid) {
									hoverT = setTimeout(
											function() {
												var o = $(t).offset(), win = $(window), ot = o.top
														- win.scrollTop(), ol = o.left
														- win.scrollLeft(), wh = win
														.height(), ww = win
														.width(), lto = 25, tto = 19;
												var zhuying = $(t).attr(
														'data-zhuying'), haoping = $(
														t).attr('data-haoping'), credit = $(
														t).attr('data-credit'), city = $(
														t).attr('data-city'), picPath = $(
														t).attr('data-pic');
												var html = [
														'<a class="shop_logo" href="'
																+ $(t).attr(
																		"href")
																+ '" target="_blank">',
														'<img class="wait" src="http://img02.taobaocdn.com/tps/i2/T16WJqXaXeXXXXXXXX-32-32.gif">',
														'</a>',
														'<h4><a href="'
																+ $(t).attr(
																		"href")
																+ '" target="_blank">'
																+ $(t).text()
																+ '</a></h4>',
														'<div>',
														'<label style="float:left;">主营宝贝：</label>',
														'<span class="shop-dianpu-goods" style="float:left;" title="'
																+ zhuying
																+ '">'
																+ zhuying
																+ '</span>',
														'<div class="ks-clear"></div></div>',
														'<div>',
														'<label>好评率：</label>',
														'<span>' + haoping
																+ '</span>',
														'</div>',
														'<div>',
														'<label>店铺等级：</label>',
														'<span class="rank r'
																+ credit
																+ '"></span>',
														'</div>',
														'<div>',
														'<label>卖家地址：</label>',
														'<span>' + city
																+ '</span>',
														'</div>' ].join('');
												$("#popinfo .loading").hide()
														.nextAll().remove();
												$("#popinfo").append(html);
												$(img)
														.attr("src", picPath)
														.load(
																function() {
																	$(
																			"#popinfo .wait")
																			.attr(
																					"alt",
																					$(
																							t)
																							.text())
																			.attr(
																					"src",
																					this.src)
																			.removeClass(
																					"wait")
																			.hide()
																			.fadeIn(
																					"slow");
																});
												if (ww / 1.5 > ol) {
													lto = o.left - lto;
												} else {
													lto = o.left - 345
															+ $(t).width()
															+ lto;
												}
												if (wh / 1.7 > ot) {
													tto = o.top + tto;
												} else {
													tto = o.top - 150;
												}
												piw.css({
													top : tto,
													left : lto
												}).show();
											}, 500);
								}
							}
						}, function() {
							clearTimeout(hoverT);
							hideT = setTimeout(function() {
								piw.hide();
							}, 500);
						});
		piw.mouseenter(function() {
			clearTimeout(hideT);
		}).mouseleave(function() {
			$(this).hide();
		});
	},
	/**
	 * 初始化浮动模块
	 * 
	 * @param {}
	 *            widget
	 */
	initShopFloat : function(widget) {
		var x = widget.find('.shop-float').attr('x');
		var y = widget.find('.shop-float').attr('y');
		if (x && y) {
			widget.floating({
				targetX : x,
				targetY : y
			});
		}
	},
	/**
	 * 初始化店铺信息展示
	 * 
	 * @param {}
	 *            widget
	 */
	initShopDetailShop : function(widget) {
		if (SELLERNICK) {
			$.ajax({
				url : '/router/site/itemdetail/shopinfo?v=' + Math.random(),
				type : 'POST',
				data : {
					nick : SELLERNICK
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
				},
				success : function(data) {
					widget.find('.bd').empty().append(data);
				}
			});
		}
	},
	/**
	 * 初始化同类热卖推荐展示
	 * 
	 * @param {}
	 *            widget
	 */
	initShopSearchHot : function(widget) {
		if ((typeof (KEYWORD) == 'undefined' && typeof (CID) == 'undefined')
				|| ('' == KEYWORD && '' == CID)) {
			return;
		}
		var hot = widget.find('.shop-searchhot');
		var sort = hot.attr('data-sort');
		var count = hot.attr('data-count');
		var data = {};
		if (sort && '' != sort)
			data.sort = sort;
		data.q = KEYWORD;// 关键词
		data.cid = CID;// 分类
		if (count) {
			data.count = count;
		} else {
			data.count = 5;
		}
		$.ajax({
			url : '/router/site/itemsearch/hot?v=' + Math.random(),
			type : 'POST',
			data : data,
			dataType : 'html',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("WindType", "AJAX");// 请求方式
				xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
			},
			error : function(request, textStatus, errorThrown) {
			},
			success : function(data) {
				widget.find('.bd').empty().append(data);
			}
		});
	},
	/**
	 * 初始化同类热卖推荐展示
	 * 
	 * @param {}
	 *            widget
	 */
	initShopDetailHot : function(widget) {
		if (typeof (SELLERNICK) == 'undefined') {
			return;
		}
		var hot = widget.find('.shop-detailhot');
		var type = hot.attr('data-rtype');
		var count = hot.attr('data-count');
		var data = {};
		if (type && 'seller' == type && SELLERNICK) {
			data.nick = SELLERNICK;
		} else {
			if (CID) {
				data.cid = CID;
			} else {
				return;
			}
		}
		if (count) {
			data.count = count;
		} else {
			data.count = 5;
		}
		$.ajax({
			url : '/router/site/itemdetail/hot?v=' + Math.random(),
			type : 'POST',
			data : data,
			dataType : 'html',
			beforeSend : function(xhr) {
				xhr.setRequestHeader("WindType", "AJAX");// 请求方式
				xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
			},
			error : function(request, textStatus, errorThrown) {
			},
			success : function(data) {
				widget.find('.bd').empty().append(data);
			}
		});
	},
	/**
	 * 初始化通用商品展示
	 * 
	 * @param {}
	 *            widget
	 */
	initModule : function(widget) {
		var id = widget.attr('data-id');
		if (id) {
			$.ajax({
				url : '/router/site/module/' + id + '?v=' + Math.random(),
				type : 'POST',
				data : {
					nick : USERNICK,
					pid : PID
				},
				dataType : 'html',
				beforeSend : function(xhr) {
					xhr.setRequestHeader("WindType", "AJAX");// 请求方式
					xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
				},
				error : function(request, textStatus, errorThrown) {
				},
				success : function(data) {
					widget.replaceWith(data);
				}
			});
		}
	},
	/**
	 * 初始化滚动模块
	 * 
	 * @param {}
	 *            widget
	 */
	initShopScrollable : function(widget) {
		var wScroll = widget.find('.shop-scrollable');
		var isVertical = false;
		if (wScroll.hasClass('shop-scrollable-v')) {// 竖向滚动
			isVertical = true;
		}
		wScroll.find('.hd h3 span:first').after('<span class="navi"></span>');
		wScroll.find('.bd').scrollable({
			items : '.shop-scrollable-items',
			vertical : isVertical,
			circular : true
		}).autoscroll({
			autoplay : true,
			interval : 4000
		}).navigator({
			navi : wScroll.find('.navi')
		});
	},
	/**
	 * 初始化滚动
	 * 
	 * @param {}
	 *            widget
	 */
	initShopSlider : function(widget) {
		var lis = widget.find('.lst-trigger li');
		if (lis.length <= 1) {// 如果只有一个则不滚动
			return;
		}
		var slider = widget.find('.J_Slider').scrollable(
				{
					items : '.ks-switchable-content',
					vertical : true,
					circular : true,
					onBeforeSeek : function(event, index) {
						lis.eq(index).addClass('current').siblings()
								.removeClass('current');
					}
				}).autoscroll({
			autoplay : true,
			interval : 5000
		}).data('scrollable');
		lis.click(function() {
			slider.seekTo($(this).index());
		});
	},
	/**
	 * 初始化商城楼层
	 * 
	 * @param {}
	 *            widget
	 */
	initShopMallFloor : function(widget) {
		var lis = widget.find('.f-trigger li');
		if (lis.length <= 1) {// 如果只有一个则不滚动
			return;
		}
		var slider = widget.find('.J_Slider').scrollable(
				{
					items : '.ks-switchable-content',
					vertical : true,
					circular : true,
					onBeforeSeek : function(event, index) {
						lis.eq(index).addClass('ks-active').siblings()
								.removeClass('ks-active');
					}
				}).autoscroll({
			autoplay : true,
			interval : 5000
		}).data('scrollable');
		lis.hover(function() {
			slider.seekTo($(this).index());
		}, function() {
			//	
		});
	},
	/**
	 * 初始化频道推广
	 * 
	 * @param {}
	 *            widget
	 */
	initShopChannel : function(widget) {
		if (typeof (VERSIONNO) != 'undefined' && 1.5 == VERSIONNO) {
			widget
					.find('.shop-custom')
					.empty()
					.append(
							'<div>您当前使用的是新淘网淘客分成版，无法使用淘宝频道推广模块，请删除此模块，或者升级为淘客返利版（月租型）或卖家版</div>');
		} else {
			var value = $('.shop-channel', widget).attr('channel');
			if (value) {
				var channel = channels[value];
				var iframe = $('<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" id="alimamaifrm" name="alimamaifrm" scrolling="no" height="100%" width="100%"></iframe>');
				var src = channel.clickUrl.replace('mm_10011550_0_0', PID)
						.replace('mm_13667242_0_0', PID);
				iframe.attr('src', src).height(parseInt(channel.height));
				widget.find('.shop-custom').empty().append(iframe);
			}
		}
	},
	/**
	 * 初始化Flash广告牌
	 * 
	 * @param {}
	 *            widget
	 */
	initShopFlashShow : function(widget) {
		var flash = $('.custom-area', widget);
		if (flash.children().length > 0) {// 新版本已生成
			return;
		}
		try {
			var src = widget.find('.shop-flashshow').attr('flash');
			if (!src || src == '') {
				return;
			}
			var splits = src.split('.swf')[0].split('_');
			var wh = splits[splits.length - 1].split('x');
			var width = widget.width();
			var height = parseInt(wh[1]) + 10;
			var conf = {
				src : src,
				wmode : "opaque",
				width : width,
				height : height - 10
			}
			flash.flashembed(conf);
			this.flashWidget_preLoader(flash);
		} catch (e) {
			alert(e);
			$.log(e);
		}
	},
	/**
	 * 初始化店标模块
	 * 
	 * @param {}
	 *            widget
	 */
	initShopHeader : function(widget) {
		var o = {};
		var shopHeader = $('.shop-header', widget);
		o.type = shopHeader.attr('t');
		if ($('#J_HeaderPages').length == 1
				&& $('#J_HeaderPagesPopup').length == 1) {// 页头下拉
			$('body').append($('#J_HeaderPagesPopup'));
			$('#J_HeaderPages').tooltip({
				effect : 'fade',
				tip : $('#J_HeaderPagesPopup'),
				position : 'bottom center'
			});
		}
		if ('nobg' == o.type) {
			return;
		}
		o.image = shopHeader.attr('image');
		o.image_url = shopHeader.attr('image_url');
		o.flash = shopHeader.attr('flash');
		if ('image' == o.type) {// 图片背景
		} else if ('flash' == o.type) {// 阿里妈妈广告牌
			try {
				var flash = widget.find('.header-bd');
				if (flash.children().length > 0) {// 如果是新版本flash，说明已被加载
					return;
				}
				var src = o.flash;
				if (!src || src == '') {
					return;
				}
				var splits = src.split('.swf')[0].split('_');
				var wh = splits[splits.length - 1].split('x');
				var conf = {
					src : src,
					wmode : "transparent",
					width : parseInt(widget.width()),
					height : parseInt(wh[1])
				};
				flash.height(parseInt(wh[1]));
				flash.flashembed(conf);
				this.flashWidget_preLoader(flash);
			} catch (e) {
				$.log(e);
			}
		} else {
			try {
				var flash = widget.find('.header-bd');
				if (flash.length == 1 && flash.children().length > 0) {// 如果是新版本flash，说明已被加载
					return;
				}
				var src = "http://a.alimama.cn/widget/yr1/yr1fixed_950_90.swf";
				var conf = {
					src : src,
					wmode : "opaque",
					width : 950,
					height : 90
				};
				var flashvars = {
					catid : '',
					count : '20',
					sz : '15',
					type : '2',
					i : PID
				}
				if (flash.length == 0) {
					flash = $('<div style="height:90px;"></div>');
					widget.find('.bd').prepend(flash);
				}
				flash.height(90);
				flash.flashembed(conf, flashvars);
				this.flashWidget_preLoader(flash);
			} catch (e) {
				$.log(e);
			}
		}
	},
	/**
	 * 初始化搜索框
	 * 
	 * @param {}
	 *            widget
	 */
	initItemSearch : function(widget) {
		var self = this;
		var q = $('input[name="q"]', widget);
		// 为当前Suggest框增加聚焦Class，标识Suggest回调
		q.focus(function() {
			$(this).addClass('focus');
		}).blur(function() {
			$(this).removeClass('focus');
		});
		var TIPS = [ '输入 宝贝 名称或宝贝地址', '输入 店铺 名称', '输入 宝贝 名称', '输入 画报 关键词' ]
				.join('');
		$('.search-tab li', widget)
				.click(
						function() {
							var rel = $(this).attr('rel');
							var form = $('form', widget);
							$('input[name="is_mall"]', widget).val('');
							if ('item' == rel) {// 商品搜索
								form.attr('action', '/searchbox?v='
										+ Math.random());
								if (!q.val() || TIPS.indexOf(q.val()) != -1) {
									q.val('输入 宝贝 名称或宝贝地址');
								}
								q.unbind('focus').unbind('blur').focusText(
										'输入 宝贝 名称或宝贝地址', 'focus');
							} else if ('shop' == rel) {// 店铺搜索
								form
										.attr('action', '/shops?v='
												+ Math.random());
								if (!q.val() || TIPS.indexOf(q.val()) != -1) {
									q.val('输入 店铺 名称');
								}
								q.unbind('focus').unbind('blur').focusText(
										'输入 店铺 名称');
							} else if ('mall' == rel) {// 商城搜索
								$('input[name="is_mall"]', widget).val('true');
								form.attr('action', '/searchbox?v='
										+ Math.random());
								if (!q.val() || TIPS.indexOf(q.val()) != -1) {
									q.val('输入 宝贝 名称');
								}
								q.unbind('focus').unbind('blur').focusText(
										'输入 宝贝 名称');
							} else if ('poster' == rel) {// 画报搜索
								form.attr('action',
										'/router/huabao/search?words='
												+ encodeURIComponent(q.val())
												+ 'v=' + Math.random());
								if (!q.val() || TIPS.indexOf(q.val()) != -1) {
									q.val('输入 画报 关键词');
								}
								q.unbind('focus').unbind('blur').focusText(
										'输入 画报 关键词');
							}
							// if (q.val()) {// 如果已经有关键词
							// form.submit();
							// } else {// 没有关键词则切换
							$(this).addClass('selected').siblings()
									.removeClass('selected');
							// }
						});
		$('.search-tab li.selected', widget).click();
		$('#search-button', widget)
				.click(
						function() {
							var rel = $('.search-tab li.selected', widget)
									.attr('rel');
							var form = $('form', widget);
							if (TIPS.indexOf(q.val()) != -1) {
								q.val('');
							}
							if ('item' == rel) {// 商品搜索
								form.attr('action', '/searchbox?v='
										+ Math.random());
								if (q.val()) {
									var _url = q.val();
									q.val(_url.replace('-', ' '));
									q.val(_url.replace('/', ' '));
									var regExp = /(.*\.?taobao.com(\/|$))|(.*\.?tmall.com(\/|$))/i;
									if (_url.match(regExp)) {
										var parames = parse_url(_url);
										if (typeof (parames) == 'object') {
											var iid = parames['id'];
											if (iid == null
													|| iid == "undefined") {
												var iid = parames['item_num_id'];
												if (iid == null
														|| iid == "undefined") {
													var iid = parames['default_item_id'];
												}
											}
											q.val(iid);
											if (_url
													.match(/(.*\.?tmall.com(\/|$))/i)) {
												form
														.find(
																'input[name="is_mall"]')
														.val('true');
											}
										}
									}
								}

							} else if ('shop' == rel) {// 店铺搜索
								form
										.attr('action', '/shops?v='
												+ Math.random());
							} else if ('poster' == rel) {// 画报搜索
								form.attr('action',
										'/router/huabao/search?words='
												+ encodeURIComponent($(
														'input[name="q"]',
														widget).val()) + 'v='
												+ Math.random());
							}
							form.submit();
						});
		$('.search-auto input[name="q"]')
				.autocomplete(
						{
							url : "http://suggest.taobao.com/sug?code=utf-8&extras=1&callback=XT.Suggest.ItemSearchCallback",
							filterResults : false,
							sortResults : false,
							showResult : function(value, data) {
								return '<span class="ks-suggest-key">'
										+ value
										+ '</span><span class="ks-suggest-result">约'
										+ data + '个宝贝</span>';
							}
						});
		var content = $('.bd', widget);
		if (content.length != 1) {
			return;
		}
		var o = {};
		o.line = $('.item-search', widget).attr('line');
		o.cat = $('.item-search', widget).attr('cat');

		var line = o.line;
		var cid = o.cat;
		if (!line || !cid) {
			return;
		}
		if (line == 0) {
			$('ul.words,br', content).remove();
			return;
		}
		if (typeof (KEYWORDS) == 'undefined') {
			$.getScript('/assets/min/js/keywords.min.js?v=' + Math.random(),
					function() {
						if (KEYWORDS)
							self._initItemSearch(widget, content, line, cid);
					});
		} else {
			self._initItemSearch(widget, content, line, cid);
		}
	},
	/**
	 * 初始化搜索框关键词
	 * 
	 * @param {}
	 *            widget
	 */
	_initItemSearch : function(widget, content, line, cid) {
		var arr_data = [];
		var data = '';
		var length = parseInt((widget.width() - 10) / 40);// 每行关键词长度
		if (cid != '0') {
			for ( var i in KEYWORDS[cid].sub) {
				arr_data
						.push([ KEYWORDS[cid].sub[i].w, KEYWORDS[cid].sub[i].c ]);
			}
		} else {
			for ( var cat in KEYWORDS) {
				for ( var i in KEYWORDS[cat].sub) {
					arr_data.push([ KEYWORDS[cat].sub[i].w,
							KEYWORDS[cat].sub[i].c ]);
				}
			}
		}
		arr_data.sort(function(a, b) {
			return Math.random() > 0.5 ? -1 : 1;
		});
		if (arr_data.length < line * length) {
			var newarr_data = [];
			for ( var cat in KEYWORDS) {
				for ( var i in KEYWORDS[cat].sub) {
					if ((arr_data.length + newarr_data.length) > line * length) {
						break;
					}
					newarr_data.push([ KEYWORDS[cat].sub[i].w,
							KEYWORDS[cat].sub[i].c ]);
				}
			}
			newarr_data.sort(function(a, b) {
				return Math.random() > 0.5 ? -1 : 1;
			});
			arr_data = arr_data.concat(newarr_data);
		}
		$('ul.words,br', content).remove();
		for ( var j = 0; j < line; j++) {
			var ul = $('<ul class="words" style="width:'
					+ (widget.width() - 10) + 'px;font-size:12px;"></ul>');
			for ( var i = 0; i < length; i++) {
				try {
					ul.append('<li><a target="_blank" href="/searchbox?q='
							+ (encodeURIComponent(arr_data[i + j * length][0]))
							+ '">' + arr_data[i + j * length][0] + '</a></li>');
				} catch (e) {
				}
			}
			content.append(ul);
		}
		content.append('<br class="ks-clear">');
	},
	/**
	 * FLASH加载工具
	 * 
	 * @param {}
	 *            widget
	 */
	flashWidget_preLoader : function(widget) {
		var parent = widget.parent();
		parent.find('.page-loading').remove();
		parent
				.prepend('<div align="center" class="page-loading" style="position:absolute;top:0px;">正在载入<span class="flash_p">0%</span>...</div>');
		var swf = widget.children().first();
		var flash_p = parent.find('.flash_p');
		parent.find('.page-loading').everyTime(1000, 'flash', function() {
			try {
				var p = swf[0].PercentLoaded();
				flash_p.text(p + "%");
				if (p == 100) {
					$(this).stopTime('flash');
					parent.find('.page-loading').remove();
				}
			} catch (e) {
				$(this).stopTime('flash');
				parent.find('.page-loading').remove();
			}
		});
	}
};
/**
 * 充值框所需函数
 * 
 * @param {}
 *            c
 * @param {}
 *            d
 */
function toggleIframe(c, d) {
	document.getElementById("ew-tab-item0").className = "ew-tab-item-0";
	document.getElementById("ew-tab-item1").className = "ew-tab-item-1";
	document.getElementById("ew-tab-item2").className = "ew-tab-item-2";
	document.getElementById("tabPanel0").style.display = "none";
	document.getElementById("tabPanel1").style.display = "none";
	document.getElementById("tabPanel2").style.display = "none";
	document.getElementById(c).className += " selected";
	document.getElementById(d).style.display = "block";
}
function parse_url(url) {
	var pattern = /(\w+)=(\w+)/ig;
	var parames = {};
	url.replace(pattern, function(a, b, c) {
		parames[b] = c;
	});
	return parames;
}