var noPicture = '/assets/min/images/nopicture.gif';

/**
 * 检查PID
 */
function checkPID(pid) {
	if (!pid) {
		pid = PID;
	}
	$('body')
			.append('<div id="checkPID" align="center"><div id="checkPID-desc"><h2>PID正在检测中...</h2></div><button class="close" style="padding:2px;cursor:pointer;">关闭</button></div>');
	$('#checkPID').overlay({
				top : 200,
				mask : {
					color : 'lightSlateGray',
					opacity : 1
				},
				closeOnClick : false,
				load : true
			});
	var errorA = [], errorI = [], as = $('a'), is = $('iframe');
	as.each(function() {
				var href = $(this).attr('href');
				if (href && typeof(href) == 'string' && '' != href) {
					var reg = /mm_\d{0,24}_\d{0,24}_\d{0,24}/gi;
					var result = href.match(reg);
					if (result != null) {
						for (var i = 0; i < result.length; i++) {
							var temp = result[i];
							if (temp != pid) {
								errorA.push({
											'n' : $(this),
											'v' : temp
										});
							}
						}
					}
				}
			});
	is.each(function() {
				var src = $(this).attr('src');
				if (src && typeof(src) == 'string' && '' != src) {
					var reg = /mm_\d{0,24}_\d{0,24}_\d{0,24}/gi;
					var result = src.match(reg);
					if (result != null) {
						for (var i = 0; i < result.length; i++) {
							var temp = result[i];
							if (temp != pid) {
								errorI.push({
											'n' : $(this),
											'v' : temp
										});
							}
						}
					}
				}
			});
	if (errorA.length > 0) {
		for (var i = 0; i < errorA.length; i++) {
			var a = errorA[i].n;
			a.attr('title', '当前链接含错误PID【' + errorA[i].v + '】').css('border',
					'2px solid red');
		}
	}
	$('#checkPID-desc')
			.empty()
			.append('<h2>PID检测结果:</h2><p style="font-size:14px;padding-top:10px;">本次共检测【<strong>'
					+ as.length
					+ '</strong>】个链接,其中有【<strong>'
					+ errorA.length
					+ '</strong>】个错误链接，含错误PID的链接已经标识在当前页面</p>');
}
/**
 * 充值框
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
/**
 * 替换SPAN标签
 */
function convertTitle(title) {
	if (title && title.indexOf('span') != -1) {
		return title.replace('<span class=H>', '').replace('</span>', '');
	}
	return title;
}
/**
 * 还原包邮
 */
function restoreTitle(title) {
	if (title && title.indexOf('包邮') != -1) {
		return title.replace('包邮', '<span class=H>包邮</span>');
	}
	return title;
}
function addWidgetA() {
	var a = $('<div class="add-widget-a">添加新组件</div>');
	a.click(function() {
				try {
					$('#designer-widgets-dialog .add-widget-button').each(
							function() {
								var minWidth = $(this).attr('minWidth');
								if (minWidth) {
									minWidth = parseInt(minWidth);
									if (minWidth > a.parent().width()) {
										$(this).button('disable');
									} else {
										$(this).button('enable');
									}
								} else {
									$(this).button('enable');
								}
							});
					editingWidget = a.parent();
					$('#designer-widgets-dialog').dialog('open');
				} catch (e) {
				};
				return false;
			}).hover(function() {
				$(this).css('background', 'white');
			}, function() {
				$(this).css('background', ' #E8EAEA');
			});
	return a;
}
var WidgetUtils = {
	/**
	 * 均匀布局LI
	 * 
	 * @param {}
	 *            widget
	 */
	widgetLiLayout : function(widget) {
		var width = widget.width();
		if (width) {
			if (isNaN(width)) {
				return;
			}
			var li = widget.find('li:first');
			var liWidth = li.width();
			var hCount = Math.floor(width / liWidth);// 计算横排可以放置的数量
			if (hCount == 1) {
				widget.find('li').css('margin-left',
						Math.floor((width - liWidth) / 2));
			} else {
				var margin = Math.floor((width % liWidth - 30) / (hCount - 1));
				var i = 1;
				widget.find('li').each(function() {
							var mode = i % hCount;
							// alert('总宽度:' + width + '|单个宽度:' + liWidth +
							// '|间隔:' + margin
							// + '|余数：' + mode + '|索引：' + i + '|数量：' + hCount);
							switch (mode) {
								case 0 :// 最后一个
									$(this).css({
												'margin-left' : margin + 'px',
												'margin-right' : '10px'
											});
									break;
								case 1 :// 第一个
									$(this).css({
												'margin-left' : '10px',
												'margin-right' : '0px'
											});
									break;
								default :// 中间
									$(this).css({
												'margin-left' : margin + 'px',
												'margin-right' : '0px'
											});
							}
							i++;
						});
			}
		}
	},
	/**
	 * 自定义页头广告牌
	 * 
	 * @param {}
	 *            widget
	 */
	addHeaderFlash : function(widget) {
		try {
			var src = widget.attr('src');
			if (!src || src == '') {
				return;
			}
			widget.show().empty();
			var splits = src.split('.swf')[0].split('_');
			var wh = splits[splits.length - 1].split('x');
			var conf = {
				src : src,
				wmode : "opaque",
				width : parseInt(widget.parent().width() - 2),
				height : parseInt(wh[1]) - 2
			};
			widget.width(widget.parent().width());
			widget.height(parseInt(wh[1]));
			widget.parent().height(parseInt(wh[1]));
			widget.flashembed(conf);
			this.flashWidget_preLoader(widget);
		} catch (e) {
			$.log(e);
		}
	},
	/**
	 * 顶部广告图片
	 * 
	 * @param {}
	 *            widget
	 */
	addHeaderImage : function(widget) {
		try {
			var src = widget.attr('src');
			var href = widget.attr('href');
			if (!src || src == '') {
				return;
			}
			if (href && href.indexOf('http://') == -1) {
				href = 'http://' + href;
			}
			var img = new Image();
			img.onload = function() {
				widget.parent().height(img.height);
			};
			img.src = src;
			widget.show().empty().append('<a href="' + href
					+ '" target="_blank"><img src="' + src + '"/></a>');
		} catch (e) {
			$.log(e);
		}
	},
	/**
	 * 启用智能广告牌
	 * 
	 * @param {}
	 *            widget
	 */
	addHeaderSmartAdsFlash : function(widget) {
		try {
			widget.show().empty();
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
			widget.height(90);
			widget.parent().height(90);
			widget.flashembed(conf, flashvars);
			this.flashWidget_preLoader(widget);
			var position = $('#ui-designer-header .ui-designer-header-tabs')
					.position();
			var top = position.top;
			if (top > 65) {// 如果菜单位置过高。调整
				$('.ui-designer-header-tabs').css('top', 65);
			}
		} catch (e) {
			$.log(e);
		}
	},
	/**
	 * 初始化搜索框组件(关键词列表)
	 * 
	 * @param {}
	 *            widget
	 */
	searchBox_init : function(widget) {
		var content = $('.preview_content', widget);
		if (content.length != 1) {
			return;
		}
		var parent = widget.parent();
		var o = {};
		if (isDesigner) {// 设计模式
			o = parent.searchBox('option');
		} else {// 浏览模式
			o = eval('(' + parent.attr('metadata') + ')');
		}
		var line = o.line;
		var cid = o.cat;
		if (line == 0) {
			$('ul.words,br', content).remove();
			return;
		}
		$.getScript('/assets/min/js/keywords.min.js', function() {
					var arr_data = [];
					var data = '';
					var length = parseInt((parent.width() - 10) / 40);// 每行关键词长度
					if (cid != '0') {
						for (var i in keywords[cid].sub) {
							arr_data.push([keywords[cid].sub[i].w,
									keywords[cid].sub[i].c]);
						}
					} else {
						for (var cat in keywords) {
							for (var i in keywords[cat].sub) {
								arr_data.push([keywords[cat].sub[i].w,
										keywords[cat].sub[i].c]);
							}
						}
					}
					arr_data.sort(function(a, b) {
								return Math.random() > 0.5 ? -1 : 1;
							});
					if (arr_data.length < line * length) {
						var newarr_data = [];
						for (var cat in keywords) {
							for (var i in keywords[cat].sub) {
								if ((arr_data.length + newarr_data.length) > line
										* length) {
									break;
								}
								newarr_data.push([keywords[cat].sub[i].w,
										keywords[cat].sub[i].c]);
							}
						}
						newarr_data.sort(function(a, b) {
									return Math.random() > 0.5 ? -1 : 1;
								});
						arr_data = arr_data.concat(newarr_data);
					}
					$('ul.words,br', content).remove();
					for (var j = 0; j < line; j++) {
						var ul = $('<ul class="words" style="width:'
								+ (parent.width() - 10)
								+ 'px;font-size:12px;"></ul>');
						for (var i = 0; i < length; i++) {
							ul
									.append('<li><a target="_blank" href="/search?q='
											+ (encodeURIComponent(arr_data[i
													+ j * length][0]))
											+ '&cid='
											+ arr_data[i + j * length][1]
											+ '">'
											+ arr_data[i + j * length][0]
											+ '</a></li>');
						}
						content.append(ul);
					}
					content.append('<br style="clear:both;">');
				});

	},

	/**
	 * 图形相册
	 * 
	 * @param {}
	 *            widget
	 */
	itemsThumbView_init : function(widget) {
		if (isDesigner) {
			WidgetUtils.widgetLiLayout(widget.show());
		}
	},
	/**
	 * 主题推广广告列表组件
	 * 
	 * @param {}
	 *            widget
	 */
	topicView_init : function(widget) {
		widget.css('margin-left', '0px').show();
		if (isDesigner) {
			$('li a', widget).each(function() {
						var href = $(this).attr('href').replace('%7Bpid%7D',
								PID);
						$(this).attr('href', href);
					});
			WidgetUtils.widgetLiLayout(widget);
		}
		return widget;
	},
	/**
	 * 类目初始化(修改链接)
	 * 
	 * @param {}
	 *            widget
	 */
	catsListView_init : function(widget) {
		widget.width(widget.parent().width());
		if (isDesigner) {
			$('li a', widget).each(function() {
				var href = $(this).attr('href').replace('%7Bpid%7D', PID)
						.replace('%7Bpid%7D', PID);
				$(this).attr('href', href);
			});
		}
	},
	/**
	 * 导航栏初始化(修改链接)
	 * 
	 * @param {}
	 *            widget
	 */
	designerHeaderTabs_init : function(widget) {
		// var width = 0;
		if (isDesigner) {
			$("ul li", widget).each(function() {
				var a = $('a', $(this));
				var href = a.attr('href').replace('%7Bpid%7D', PID).replace(
						'%7Bpid%7D', PID);
				a.attr('href', href);
			});
		}
	},
	/**
	 * 文字链接组件
	 * 
	 * @param {}
	 *            widget
	 */
	itemsLinkView_init : function(widget) {
		$('li:first', widget.show()).css('border-top',
				'1px solid 1px solid #EBEBEB');
	},
	itemsRotatorView_init : function(widget) {
		var self = widget;
		self.show();
		$('.main_image .desc', self).show();
		var li = $(".image_thumb ul li:first", self);
		if (li.length == 0) {// 如果没有显示元素则返回(处理从组件树拖拽至设计器时)
			return;
		}
		WidgetUtils.itemsRotatorView_showMain(self, li);
		$('.image_thumb ul li', self).click(function() {
					var li = $(this);
					var main = $(".main_image", self);
					if (li.is(".active")) {
						return false;
					} else {
						WidgetUtils.itemsRotatorView_animateMain(self, li);
					}
					li.addClass('active').siblings().removeClass("active");
					return false;
				}).hover(function() {
					$(this).addClass('hover');
				}, function() {
					$(this).removeClass('hover');
				});
	},
	itemsRotatorView_showMain : function(widget, li) {
		var main = widget.find(".main_image");
		var imgTitle = li.find('img').attr("alt");
		var title = restoreTitle(imgTitle);
		var imgSrc = li.find('a').attr("href");
		if (imgSrc != noPicture) {
			imgSrc = imgSrc.replace('bao/uploaded', 'imgextra')
					+ "_310x310.jpg";
		}
		var divTitle = li.find('.title');
		var imgCommission = divTitle.attr('commission');
		var imgPrice = divTitle.attr('price');
		var clickUrl = divTitle.attr('href');
		$(".desc .title", main).empty().append('<a href="' + clickUrl
				+ '" target="_blank" title="' + imgTitle + '">' + title
				+ '</a>');
		$(".desc .price", main).text(imgPrice + "元");
		$("img", main).fadeTo("medium", 0.5).attr('alt', imgTitle).attr(
				'title', imgTitle);
		var imgA = $("img", main).parent();
		imgA.attr('href', clickUrl);
		if (!isDesigner) {
			if (li.attr('nid')) {
				imgA.attr('onClick', "_gaq.push(['_trackEvent', 'xt-" + PID
								+ "', 'item-d-" + li.attr('nk') + "-"
								+ li.attr('nid') + "', '" + title + "']);");
				$(".desc .title a", main).attr(
						'onClick',
						"_gaq.push(['_trackEvent', 'xt-" + PID + "', 'item-d-"
								+ li.attr('nk') + "-" + li.attr('nid') + "', '"
								+ title + "']);");
			}
		}
		var img = new Image();
		img.onload = function() {
			$("img", main).fadeTo("fast", 1).attr({
						src : imgSrc
					});
		};
		img.src = imgSrc;
	},
	itemsRotatorView_animateMain : function(widget, li) {
		var self = this;
		var main = widget.find(".main_image");
		var imgDescHeight = main.find('.title').height();
		$(".title", main).animate({
					marginBottom : -imgDescHeight
				}, 250, function() {
					$(".title", main).animate({
								marginBottom : "0"
							}, 250);
					self.itemsRotatorView_showMain(widget, li);
				}).show();
	},
	itemsZoomView_init : function(widget) {
		var self = this;
		widget.show();
		self.itemsZoomView_init_func(widget, $(".thumb li a:first", widget));
		if ($.browser.msie && $.browser.version == '6.0') {// 如果是IE6.0
			// 暂不处理
		} else {
			$(".thumb li .div-cell", widget).hover(function() {
						$(this).css({
									'z-index' : '10'
								});
						var img = $('img', $(this));
						$(this).find('.a-cell').addClass("hover").stop()
								.animate({
											marginTop : '-100px',
											marginLeft : '-100px',
											top : '50%',
											left : '50%',
											width : '160px',
											height : '160px',
											padding : '20px'
										}, 200);

					}, function() {
						$(this).css({
									'z-index' : '0'
								});
						$(this).find('.a-cell').removeClass("hover").stop()
								.animate({
											marginTop : '0',
											marginLeft : '0',
											top : '0',
											left : '0',
											width : '100px',
											height : '100px',
											padding : '0px'
										}, 400);
					});
		}
		$(".thumb li a", widget).click(function() {
					self.itemsZoomView_init_func(widget, $(this));
					return false;
				});
	},
	itemsZoomView_init_func : function(widget, a) {
		var self = a;
		var mainImage = self.attr("href"); // Find Image Name
		$(".main-view img", widget).fadeTo("medium", 0.5);
		var img = new Image();
		var imgTitle = self.attr('title');
		var title = restoreTitle(imgTitle);
		img.onload = function() {
			$(".main-view img", widget).fadeTo("fast", 1).attr({
						src : mainImage,
						alt : imgTitle,
						title : imgTitle
					});
			var imgA = $(".main-view a:first", widget).attr('href',
					self.attr('click'));
			var titleA = $('.main-view .title a', widget).empty().append(title)
					.attr('href', self.attr('click'));
			if (!isDesigner) {

				if (self.attr('nid')) {
					imgA.attr('onClick', "_gaq.push(['_trackEvent', 'xt-" + PID
									+ "', 'item-d-" + self.attr('nk') + "-"
									+ self.attr('nid') + "', '" + title
									+ "']);");
					titleA.attr('onClick', "_gaq.push(['_trackEvent', 'xt-"
									+ PID + "', 'item-d-" + self.attr('nk')
									+ "-" + self.attr('nid') + "', '" + title
									+ "']);");
				}
			}
			$('.main-view .price', widget).text(self.attr("price") + "元");
		};
		img.src = mainImage;

	},
	/**
	 * 仿苹果组件
	 * 
	 * @param {}
	 *            widget
	 */
	itemsAppleView_init : function(widget) {
		$('.slides .slide', widget).width(widget.width() - 2);
		widget.show();
		$('.menu table tr td img', widget).click(function(e) {
					$('td.menuItem', widget).removeClass('act')
							.addClass('inact');
					var td = $(this).parents('td');
					td.addClass('act');
					var pos = td.prevAll($('.menuItem', widget)).length;
					$('.slides', widget).stop().animate({
								marginLeft : -pos * widget.width() + 'px'
							}, 450);
					e.preventDefault();
				});
		$('.menu table tr td.menuItem:first', widget).addClass('act')
				.siblings().addClass('inact');
	},
	/**
	 * 图片轮换
	 * 
	 * @param {}
	 *            widget
	 */
	itemsCycleView_init : function(widget) {
		widget.show();
		// var component = widget.find(".pics");
		// if (component.children().size() == 0) {
		// return;
		// }
		// component.cycle('stop');
		// component.cycle({
		// fx : 'fade',
		// delay : -2000,
		// pause : true,
		// cleartype : 1,
		// fit : true,
		// pauseOnPagerHover : true,
		// before : function(curr, next, opts) {
		// next = $(next).find('img');
		// ($('.title a', widget).empty().append(restoreTitle(next
		// .attr('title'))).attr('href', next
		// .attr('click')));
		// $('.price', widget).text(next.attr('price') + '元');
		// }
		// });
		// $('span.prev', widget).unbind('click').click(function() {
		// component.cycle('prev');
		// });
		// $('span.next', widget).unbind('click').click(function() {
		// component.cycle('next');
		// });
		// $('.title a', widget).unbind('hover').hover(function() {
		// component.cycle('pause');
		// }, function() {
		// component.cycle('resume');
		// });
	},
	/**
	 * flash组件
	 * 
	 * @param {}
	 *            widget
	 */
	flashView_init : function(widget) {
		try {
			var src = widget.attr('src');
			if (!src || src == '') {
				widget.height(200).parent().height(200);
				return;
			}
			widget.show().empty();
			var splits = src.split('.swf')[0].split('_');
			var wh = splits[splits.length - 1].split('x');
			var width = widget.parent().width();
			widget.width(width);
			var height = parseInt(wh[1]) + 10;
			widget.height(height - 5);
			widget.parent().height(height);
			var conf = {
				src : src,
				wmode : "opaque",
				width : width,
				height : height - 10
			}
			widget.flashembed(conf);
			this.flashWidget_preLoader(widget);
		} catch (e) {
			$.log(e);
		}
	},
	/**
	 * 横向滚动
	 * 
	 * @param {}
	 *            widget
	 */
	itemsScrollableView_init : function(widget) {
		var parent = widget.parent();
		var nav = $('.navi', parent);
		if (nav.length == 0) {
			$('.ui-designer-widget-header', parent)
					.append('<div class="navi"></div>');
		}
		widget.show();
		var scrollable = widget.width(widget.width() - 2).height(200);
		var items = $('.item', scrollable).width(widget.width() - 2);
		var size = items.length;
		if (size > 0) {
			scrollable.scrollable({
						circular : true
					});
			scrollable.navigator({
						navi : widget.parent().find('.navi').empty()
					});
			if (!isDesigner) {// 如果是浏览模式则启用自动滚动
				scrollable.autoscroll({
							interval : 5000
						});
			}
		}
	},
	/**
	 * 智能广告
	 * 
	 * @param {}
	 *            widget
	 */
	itemsSmartAdsFlashView_init : function(widget) {
		try {
			var parent = widget.show().parent();
			var src = 'http://a.alimama.cn/widget/yr1/yr1any.swf?r='
					+ Math.random();
			var o = {};
			if (isDesigner) {// 设计模式
				o = parent.itemsSmartAdsFlashView('option');
			} else {// 浏览模式
				o = eval('(' + parent.attr('metadata') + ')');
			}
			o.h_h = parent.height() - 5;
			o.h_w = parent.width() - 5;
			widget.empty();
			var conf = {
				src : src,
				wmode : "transparent",
				width : o.h_w + '',
				height : o.h_h + ''
			}
			var flashvars = {
				count : o.count + '',
				catid : o.catid + '',
				h_h : o.h_h + '',
				h_w : o.h_w + '',
				sz : o.sz + '',
				type : o.type + '',
				i : PID,
				st_tc : o.st_tc + '',
				st_bgc : o.st_bgc + '',
				st_bdc : o.st_bdc + '',
				st_pc : o.st_pc + '',
				st_lg : o.st_lg + '',
				st_pb : o.st_pb + ""
			}
			widget.width(o.h_w);
			widget.height(o.h_h);
			widget.flashembed(conf, flashvars);
			this.flashWidget_preLoader(widget);
		} catch (e) {
			$.log(e);
		}
	},
	/**
	 * 固定尺寸智能广告
	 * 
	 * @param {}
	 *            widget
	 */
	itemsFixedSmartAdsFlashView_init : function(widget) {
		try {
			var parent = widget.show().parent();
			var src = 'http://a.alimama.cn/widget/yr1/yr1fixed_';
			var o = {};
			if (isDesigner) {// 设计模式
				o = parent.itemsFixedSmartAdsFlashView('option');
			} else {// 浏览模式
				o = eval('(' + parent.attr('metadata') + ')');
			}
			widget.empty();
			var height = parseInt(o.height);
			var width = parseInt(o.width);
			var sz = o.sz;
			var type = parseInt(o.type);
			var pwidth = parent.width();
			if (height == "0" || width == "0" || width > pwidth) {// 如果未设置高度或宽度
				var tempObj = null;
				for (var i = 0; i < fixedSmartAdsSz.length; i++) {
					if (fixedSmartAdsSz[i].width < pwidth) {// 过滤小于当前容器的尺寸
						if (tempObj == null) {
							tempObj = fixedSmartAdsSz[i];
						} else {
							if (fixedSmartAdsSz[i].width > tempObj.width) {
								tempObj = fixedSmartAdsSz[i];
							} else if (fixedSmartAdsSz[i].width == tempObj.width) {
								if (fixedSmartAdsSz[i].height > tempObj.height) {
									tempObj = fixedSmartAdsSz[i];
								}
							}
						}
					}
				}
				if (tempObj != null) {
					width = tempObj.width;
					height = tempObj.height;
					sz = tempObj.sz;
					type = tempObj.type;
					if (isDesigner) {
						parent.itemsFixedSmartAdsFlashView('option', 'type',
								type);
					}
				}
				if (isDesigner) {// 设计模式(存储)
					parent.itemsFixedSmartAdsFlashView('option', 'height',
							height);
					parent
							.itemsFixedSmartAdsFlashView('option', 'width',
									width);
					parent.itemsFixedSmartAdsFlashView('option', 'sz', sz);
				}
			}
			var conf = {
				src : src + width + '_' + height + '.swf?version'
						+ Math.random(),
				wmode : "transparent",
				width : width + '',
				height : height + ''
			}
			var flashvars = {
				count : o.count + '',
				catid : o.catid + '',
				sz : sz + '',
				type : type + '',
				i : PID
			}
			widget.width(width);
			widget.height(height + 10);
			parent.height(height + 10);
			widget.flashembed(conf, flashvars);
			this.flashWidget_preLoader(widget);
		} catch (e) {
			$.log(e);
		}
	},
	/**
	 * 橱窗广告
	 * 
	 * @param {}
	 *            widget
	 */
	itemsShopWindowView_init : function(widget) {
		try {
			widget.show().empty();
			var parent = widget.parent();
			var o = {}
			if (isDesigner) {// 设计模式
				o = parent.itemsShopWindowView('option');
			} else {// 浏览模式
				o = eval('(' + parent.attr('metadata') + ')');
			}
			var src = "http://bm.alimama.cn/bcv1.swf?v=" + o.revision;
			var conf = {
				src : src,
				wmode : "opaque",
				width : o.bannerWidth,
				height : o.bannerHeight
			}
			var flashvars = {
				bannerWidth : o.bannerWidth,
				bannerHeight : o.bannerHeight,
				bannerSID : o.bannerSID,
				bannerPID : PID,
				dataSource : o.dataSource,
				bid : o.bid,
				pid : PID,
				ass_rep : 'pid%3D' + PID + '%26unid=%3D',
				appSource : o.appSource
			}
			widget.height(o.bannerHeight);
			parent.height(o.bannerHeight + 10);
			widget.flashembed(conf, flashvars);
			this.flashWidget_preLoader(widget);
		} catch (e) {
			$.log(e);
		}

	},
	/**
	 * 频道广告
	 * 
	 * @param {}
	 *            widget
	 */
	channelView_init : function(widget) {
		widget.show().empty();
		var parent = widget.parent();
		var o = {};
		if (isDesigner) {// 设计模式
			o = parent.channelView('option');
		} else {// 浏览模式
			o = eval('(' + parent.attr('metadata') + ')');
		}
		var channel = channels[o.value];
		var iframe = $('<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" id="alimamaifrm" name="alimamaifrm" scrolling="no" height="100%" width="100%"></iframe>');
		var src = channel.clickUrl.replace('mm_10011550_0_0', PID).replace(
				'mm_13667242_0_0', PID);
		iframe.attr('src', src).height(parseInt(channel.height));
		widget.height(channel.height + 5);
		parent.height(channel.height + 5);
		widget.append(iframe);
	},
	flashWidget_preLoader : function(widget) {
		var parent = widget.parent();
		parent.find('.ui-designer-loading').remove();
		parent
				.prepend('<div align="center" class="ui-designer-loading">正在载入<span class="flash_p">0%</span>...</div>');
		if (isDesigner) {
			parent.resizable('disable');
		}
		var swf = widget.children().first();
		var flash_p = parent.find('.flash_p');
		parent.find('.ui-designer-loading').everyTime(1000, 'flash',
				function() {
					try {
						var p = swf[0].PercentLoaded();
						flash_p.text(p + "%");
						if (p == 100) {
							$(this).stopTime('flash');
							// 3秒后移除
							if (isDesigner) {
								$(this).oneTime(3000, 'showflash', function() {
									parent.find('.ui-designer-loading')
											.remove();
									parent.resizable('enable');
								});
							} else {
								parent.find('.ui-designer-loading').remove();
							}
						}
					} catch (e) {
						$(this).stopTime('flash');
						// 3秒后移除
						if (isDesigner) {
							$(this).oneTime(3000, 'showflash', function() {
										parent.find('.ui-designer-loading')
												.remove();
										parent.resizable('enable');
									});
						} else {
							parent.find('.ui-designer-loading').remove();
						}
					}
				});
	}
};