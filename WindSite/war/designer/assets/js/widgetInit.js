var noPicture = "/assets/min/images/nopicture.gif";
var isDesigner = false;
var DEBUG = true;
var pageTracker;
$(document).ready(function() {
	try {
		var browser = $.browser;
		if (browser.msie) {
			if (browser.version == '6.0') {
			}
		}
		$(window).resize(function() {
					$(".widget-channelview").each(function() {
								WidgetUtils.channelView_init($(this).show());
							});
				});
		$.ajax({
					url : '/router/site/siteFooter?v' + Math.random(),
					type : 'GET',
					data : {},
					dataType : 'html',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("WindType", "AJAX");// 请求方式
						xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
					},
					error : function(request, textStatus, errorThrown) {
					},
					success : function(data) {
						$('#footer').empty().append(data);
					}
				});
		// 初始化追踪代码
		initLog();
		if ($('#main .ui-designer-content').length == 0) {// 如果未设置
			$('#main')
					.empty()
					.append('<div class="ui-designer-content"><div class="ui-designer-container middle-1" style="margin-right:0px"><div class="ui-designer-widget"  name="channelView" style="display:block;width:948px;height:2742px;" metadata=\'{disabled:false,align:"center",version:"1.0",name:"综合频道",value:"channelcode",pic:"channelcode.png",height:2432,resizable:"false",minWidth:"900",data_type:"none",handles:"s"}\' align="center"><div class="widget-channelview"></div></div></div></div>');
		}
		$('.item-commission').remove();// 移除所有佣金
		var flash = $('.header-flash');
		var headerImage = $('.header-image');
		if (flash.length > 0) {// 标题Flash
			if (flash.attr('src') != '') {
				WidgetUtils.addHeaderFlash(flash);// 自定义广告牌
			} else {
				WidgetUtils.addHeaderSmartAdsFlash(flash);// 智能广告牌
			}
		} else if (headerImage.length > 0) {
			WidgetUtils.addHeaderImage(headerImage);
		}
		try {
			$('body')
					.css('background',
							'white url(/assets/min/images/body.png) repeat-x 0px -74px !important');
		} catch (e) {
		}
		$('#wrap').prepend($('#xintaoBar'));
		$.ajax({
					url : '/router/site/siteHeader?v=' + Math.random(),
					type : 'GET',
					data : {},
					dataType : 'html',
					beforeSend : function(xhr) {
						xhr.setRequestHeader("WindType", "AJAX");// 请求方式
						xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
					},
					error : function(request, textStatus, errorThrown) {
					},
					success : function(data) {
						$('#xintaoBar').empty().append(data);
					}
				});
		if ($.browser.msie && $.browser.version == '6.0') {
			$('#main .ui-designer-widget').css({
						'float' : 'none',
						'display' : 'inline',
						'overflow-x' : 'hidden'
					});
			$("img").error(function() {
						$(this).removeAttr('alt');
					});
		}
		$('#rssDialog').load('/designer/assets/toolbar/rss.html', function() {
			$('#rssUl li a').each(function() {
				$(this).attr(
						'href',
						$(this).attr('href')
								+ document.location.href.split('?')[0] + 'rss');
			});
		});
		if (document.location.href.indexOf('/pages/') != -1) {// 如果是子页面
			var hu = $('#ui-designer-header .ui-designer-header-tabs ul');
			if (hu.children().length > 0) {
				hu.prepend('<li><a href="/"><h2>首页</h2></a></li>');
			}
		}
		$('#rss').parent().hover(function() {
					$('#rssDialog').show();
				}, function() {
					$('#rssDialog').hide();
				});
		$('#main .ui-designer-content').each(function() {
			if ($.browser.msie && $.browser.version == '6.0') {
				$(this).find('.ui-designer-container:last').css('margin-right',
						0).siblings().css('margin-right', 2);
			} else {
				$(this).find('.ui-designer-container:last').css('margin-right',
						0).siblings().css('margin-right', 5);
			}
		});
		if ($('#poster-detail').length == 1) {
			initHuabao();
		}
		// $('#main .ui-designer-widget').widgetLazyload({
		// effect : "fadeIn",
		// failurelimit : 10000
		// });
		// 搜索框
		$('.widget-searchbox').each(function() {
					WidgetUtils.searchBox_init($(this).show());
				});
		// 右侧五图
		$(".widget-itemsrotatorview-items").each(function() {
					WidgetUtils.itemsRotatorView_init($(this).show());
				});
		// 放大
		$(".widget-itemszoomview-items").each(function() {
					WidgetUtils.itemsZoomView_init($(this).show());
				});
		// 仿苹果
		$(".widget-itemsappleview-items").each(function() {
					WidgetUtils.itemsAppleView_init($(this).show());
				});
		// 循环
		$(".widget-itemscycleview-items").each(function() {
					WidgetUtils.itemsCycleView_init($(this).show());
				});
		// FLash
		$(".widget-flashview").each(function() {
					WidgetUtils.flashView_init($(this).show());
				});
		// 滚动
		$(".widget-itemsscrollableview-items").each(function() {
					WidgetUtils.itemsScrollableView_init($(this).show());
				});
		// 智能广告
		$(".widget-itemssmartadsflashview-items").each(function() {
					WidgetUtils.itemsSmartAdsFlashView_init($(this).show());
				});
		// 固定智能广告
		$(".widget-itemsfixedsmartadsflashview-items").each(function() {
					WidgetUtils
							.itemsFixedSmartAdsFlashView_init($(this).show());
				});
		// 橱窗
		$(".widget-itemsshopwindowview-items").each(function() {
					WidgetUtils.itemsShopWindowView_init($(this).show());
				});
		// 频道
		$(".widget-channelview").each(function() {
					WidgetUtils.channelView_init($(this).show());
				});

	} catch (e) {
		$.log(e);
	}
});

function initLog() {
	/**
	 * 商品直连追踪
	 */
	$('.ui-designer-widget a[xt="i"]').click(function() {
				trackDirectItem($(this));
			});
	/**
	 * 店铺直连追踪
	 */
	$('.ui-designer-widget a[xt="s"]').click(function() {
				trackDirectShop($(this));
			});
}
function initHuabao(hid, picId, type) {
	if (!hid) {
		hid = HID;
	}
	if (!picId) {
		picId = PICID;
	}
	if (!type) {
		type = HOTTYPE;
	}
	var currentNum, mod, length, data;
	var ul = $('#J_thumbList ul'), cn = $('#currentNum'), tc = $('#thumbCurrent'), jo = $('#J_posterOriginalImage'), ji = $('#J_Image'), jp = $('#J_PosterDesc'), rg = $('#related-goods');
	var height = parseInt($('#J_thumbList').height() / 5);
	$.getJSON('/router/huabao/data/' + hid + '?v=' + Math.random(),
			function(d) {
				data = d;
				$('body').data('hbs', data);
				length = data.length;
				if (picId != 0) {
					switchImage(picId, true);
				} else {
					switchImage($('#J_thumbList ul li div img:first')
							.attr('data-picid'));
				}
				$('#J_thumbList li').click(function() {
					switchImage($('div img:first', $(this)).attr('data-picid'));
					return false;
				});
				$('#J_prevThumb').click(function() {
							mod = mod > 5 ? mod - 5 : 0;
							var W = -1 * mod * height;
							ul.animate({
										top : W
									}, 500);
							var Z = mod - currentNum;
							var U = -1 * Z * height;
							tc.animate({
										'top' : U
									}, 500);
							return false;
						});
				$('#J_nextThumb').click(function() {
							if (length - mod <= 5) {
								return;
							}
							mod += 5;
							var W = -1 * mod * height;
							ul.animate({
										top : W
									}, 500);
							var Z = mod - currentNum;
							var U = -1 * Z * height;
							tc.animate({
										'top' : U
									}, 500);
							return false;
						});
				ji.click(function() {
							if (currentNum < length - 1) {
								if (currentNum - mod >= 4) {
									var temp = mod + 5;
									var W = -1 * temp * height;
									ul.animate({
												top : W
											}, 500);
								}
								switchImage(data[currentNum + 1]['picId']);
							}
							return false;
						});
				$('#J_prevPage').click(function() {
							if (currentNum > 0) {
								if (currentNum - mod == 0) {
									var temp = mod - 5;
									var W = -1 * temp * height;
									ul.animate({
												top : W
											}, 500);
								}
								switchImage(data[currentNum - 1]['picId']);
							}
							return false;
						});
				$('#J_nextPage').click(function() {
							if (currentNum < length - 1) {
								if (currentNum - mod >= 4) {
									var temp = mod + 5;
									var W = -1 * temp * height;
									ul.animate({
												top : W
											}, 500);
								}
								switchImage(data[currentNum + 1]['picId']);
							}
							return false;
						});
			});
	// 加载推荐画报
	if ($('#poster-recommended li').length == 0) {
		$('#poster-recommended')
				.append('<div id="loading" align="left" style="color:white;">正在加载...</div>');
		$.getJSON('/router/huabao/data/hot/' + hid + '/' + type + '/?v='
						+ Math.random(), function(data) {
					var str = '';
					if (data && data.length > 0) {
						for (var i = 0; i < data.length; i++) {
							var h = data[i];
							str += '<li><div class="poster-pic-box thumb-wrap"><a href="/huabao/'
									+ h.id
									+ '.html" target="_blank" hid="'
									+ h.id
									+ '"><img alt="'
									+ h.name
									+ '" src="'
									+ h.cover.replace('_250x250', '_120x120')
									+ '"></a></div><span><a href="/huabao/'
									+ h.id
									+ '.html" target="_blank" hid="'
									+ h.id
									+ '">'
									+ h.shortName
									+ '</a></span></li>';
						}
					} else {
						str += '无推荐画报';
					}
					$("#loading").remove();
					$('#poster-recommended').append(str);
					$('#poster-recommended li a').click(function() {
						var aHid = $(this).attr('hid');
						$("#col-main").empty();
						$("#col-main")
								.append("<div id='loading' align='left' style='color:white;'>正在加载数据,请稍候...</div>");
						$.ajax({
									url : '/router/huabao/html/album/' + aHid
											+ '?v=' + Math.random(),
									type : 'GET',
									data : {
										nick : USERNICK
									},
									dataType : 'html',
									beforeSend : function(xhr) {
										xhr
												.setRequestHeader("WindType",
														"AJAX");// 请求方式
										xhr.setRequestHeader("WindDataType",
												"HTML");// 请求返回内容类型
									},
									error : function(request, textStatus,
											errorThrown) {
										$("#loading").remove();
										alert(textStatus);
									},
									success : function(data) {
										$("#loading").remove();
										$("#col-main").empty().append(data);
										initHuabao(aHid);
									}
								});
						return false;
					});
				});
	}
	function switchImage(id, isAutoMod) {
		$('dd', rg).remove();// 移除相关商品
		$('.related-goods-marker', jo).remove();// 移除相关商品框
		if (data == null) {
			return;
		}
		var picItem;
		for (var i = 0; i < data.length; i++) {
			var d = data[i];
			if (id == d["picId"]) {
				picItem = d;
				currentNum = i;
				break;
			}
		}
		if (picItem == null || !picItem) {
			return;
		}
		mod = parseInt(currentNum / 5) * 5;
		if (true == isAutoMod && currentNum > 5) {// 如果动态调整当前显示
			var W = -1 * mod * height;
			ul.animate({
						top : W
					}, 500);// 动态切换至指定图片的指定位置(指定图片访问时会需要)
		}
		tc.animate({
					'top' : height * (currentNum - mod)
				}, 500);
		ji.unbind('load').load(function() {
			cn.text(currentNum + 1);
			jp.empty().append(picItem.picDesc);// 图片描述
			// 调整图片高度
			var au = $(this).height() <= 502 ? 508 : $(this).height() + 6, ai, ae, ay;
			ai = parseInt(jo.height());
			if (isNaN(ai)) {
				ai = 0
			}
			ai = Math.abs(ai - au);
			ae = ai > 15 ? 0.5 : 0.1;
			jo.animate({
						height : au
					}, ae > 15 ? 500 : 1000);
			var items = picItem.markedItem;
			if (items == null || !items || items.length == 0) {
				return;
			}
			var am = $(this).width() > 660 ? 660 : $(this).width(), ax = $(this)
					.height();
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var dd = $('<dd style="display:none" data-tipid="' + i + '">'
						+ item.itemTitle + '</dd>');
				rg.append(dd);// 顶部商品标题
				var marker = $('<div class="related-goods-marker" style="left:'
						+ ((660 - 6 - am) / 2 + item.x) + 'px;top:' + item.y
						+ 'px" data-tipid="' + i + '"></div>');// 商品框
				var area = $('<span class="marked-area" style="width:'
						+ (item.width + 8) + 'px;height:' + (item.height + 8)
						+ 'px;"></span>');
				for (var aw = 1; aw < 4; aw++) {
					area.append('<b class="shadow-' + aw + '" style="width:'
							+ (item.width + (4 - aw) * 2) + 'px;height:'
							+ (item.height + (4 - aw) * 2) + 'px;"></b>');
				}
				var b = $('<b class="inner-border" style="width:' + item.width
						+ 'px;height:' + item.height
						+ 'px;opacity: 1; filter:Alpha(Opacity=100);"></b>');
				area.append(b);
				var aq = (-1) * (item.height + 8) / 2, ah = (item.width + 8)
						/ 2;
				aq = aq + item.y + 270 > $(this).height() ? aq - 123 : aq;
				ah = ah + (660 - 6 - am) / 2 + item.x + 254 > $(this).width()
						? ah - 270
						: ah;
				var tipWrap = $('<div class="tip-wrap" href="/titem/'
						+ item.itemId
						+ '.html?'
						+ item.P4PKeyword
						+ '" style="margin-left:'
						+ ah
						+ 'px;margin-top:'
						+ aq
						+ 'px;display:none;"><b class="corner"></b><div class="goods-tip clearfix"><div class="pic goods-image"><a href="/titem/'
						+ item.itemId
						+ '.html?'
						+ item.P4PKeyword
						+ '" target="_blank"><img src="'
						+ item.itemPic
						+ '" /></a></div><dl class="goods-detail"><dt class="goods-name">\u5546\u54c1\u540d\u79f0:</dt><dd><a href="/titem/'
						+ item.itemId
						+ '.html?'
						+ item.P4PKeyword
						+ '" target="_blank">'
						+ item.itemTitle
						+ '</a></dd><dt class="overwritten">\u4e00\u53e3\u4ef7:</dt><dd class="goods-price overwritten">\uffe5'
						+ item.itemPrice
						+ '</dd><dt>\u7b80\u8ff0:</dt><dd>'
						+ item.itemDesc
						+ '</dd></dl><div style="clear:both;"></div></div><div class="p4p-goods-tip"></div><b class="corner"></b></div>');
				jo.append(marker.append(area).append(tipWrap));
			}

			$('.marked-area', jo).animate({
						opacity : 0
					}, 2000);
			$('.inner-border', jo).hover(function() {
						showTip($(this).parent())
					}, function(e) {
						var area = $(this).parent();
						if (e.relatedTarget) {
							if ($.contains(area.parent().find('.tip-wrap')[0],
									e.relatedTarget)) {
								return;
							}
						}
						hideTip(area)
					});
			$('dd', rg).fadeIn("slow").unbind('hover').hover(function() {
				$(this).addClass('current').siblings().removeClass('current');
				showTip($(
						'.related-goods-marker[data-tipid='
								+ $(this).attr('data-tipid') + '] .marked-area',
						jo));
			}, function() {
				$(this).removeClass('current');
				hideTip($(
						'.related-goods-marker[data-tipid='
								+ $(this).attr('data-tipid') + '] .marked-area',
						jo));
			})
		}).attr('src', picItem.picSrc);

	}
	function showTip(area) {
		area.animate({
					opacity : 1
				}, 500);
		area.parent().find('.tip-wrap').animate({
					opacity : 1
				}, 500).css('z-Index', 1).show();
	}
	function hideTip(area) {
		area.animate({
					opacity : 0
				}, 1000);
		area.parent().find('.tip-wrap').animate({
					opacity : 0
				}, 1000).css('z-Index', 0).show();
	}
}