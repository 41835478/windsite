/**
 * 画报组件
 * 
 * @author fxy
 */
(function($) {
	var currentNum, mod, length, data, height;
	var ul, cn, tc, jo, ji, jp, rg;
	$.widget("ui.huabaoView", $.ui.designerWidget, {
		options : {
			autoSize : 'true'
		},
		_toSource : function() {
			var widget = this.element;// 当前组件
			if (!HID || HID == 0) {
				throw new Error('画报组件发生错误【未选择画报】！');
			}
			if (!HOTTYPE) {
				HOTTYPE = 0;
			}
			return '<div class="widget-huabaoview">${widgetCustomer("' + HID
					+ '","0","' + HOTTYPE + '","' + USERNICK + '")}</div>';
		},
		reInit : function(hid, hType) {
			this._initDesignerWidget();
		},
		_initDesignerWidget : function() {
			var self = this;
			var widget = this.element;
			var component = this.element.find(".widget-huabaoview").show();
			$('.ui-designer-widget-header', widget).remove();
			if ($('#main .widget-huabaoview').length > 1) {
				alert('当前模板已经配置画报组件!');
				widget.remove();
				isRemoveAddA = false;
				return;
			}
			if (HID == 0) {
				return;
			}
			ul = $('#J_thumbList ul');
			cn = $('#currentNum');
			tc = $('#thumbCurrent');
			jo = $('#J_posterOriginalImage');
			ji = $('#J_Image');
			jp = $('#J_PosterDesc');
			rg = $('#related-goods');
			height = parseInt($('#J_thumbList').height() / 5);
			// 加载推荐画报
			if ($('#poster-recommended li').length == 0) {
				$('#poster-recommended')
						.append('<div id="loading" align="left" style="color:white;">正在加载...</div>');
				$.getJSON('/router/huabao/data/hot/' + HID + '/' + HOTTYPE
								+ '/?v=' + Math.random(), function(data) {
							var str = '';
							if (data && data.length > 0) {
								for (var i = 0; i < data.length; i++) {
									var h = data[i];
									str += '<li><div class="poster-pic-box thumb-wrap"><a href="#" target="_blank" hid="'
											+ h.id
											+ '"><img alt="'
											+ h.name
											+ '" src="'
											+ h.cover.replace('_250x250',
													'_120x120')
											+ '"></a></div><span><a href="#" target="_blank" hid="'
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
											url : '/router/huabao/html/album/'
													+ aHid + '?v='
													+ Math.random(),
											type : 'GET',
											data : {
												nick : USERNICK
											},
											dataType : 'html',
											beforeSend : function(xhr) {
												xhr.setRequestHeader(
														"WindType", "AJAX");// 请求方式
												xhr.setRequestHeader(
														"WindDataType", "HTML");// 请求返回内容类型
											},
											error : function(request,
													textStatus, errorThrown) {
												$("#loading").remove();
												alert(textStatus);
											},
											success : function(data) {
												$("#loading").remove();
												$("#col-main").empty()
														.append(data);
												HID = aHid;
												self._initDesignerWidget();
											}
										});
								return false;
							});
						});
			}
			$.getJSON('/router/huabao/data/' + HID + '?v=' + Math.random(),
					function(d) {
						data = d;
						$('body').data('hbs', data);
						length = data.length;
						self.switchImage($('#J_thumbList ul li div img:first')
								.attr('data-picid'));
						$('#J_thumbList li').click(function() {
							self.switchImage($('div img:first', $(this))
									.attr('data-picid'));
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
								self.switchImage(data[currentNum + 1]['picId']);
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
								self.switchImage(data[currentNum - 1]['picId']);
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
								self.switchImage(data[currentNum + 1]['picId']);
							}
							return false;
						});
					});
			// }
			// });

		},
		widgetSet : function() {
			var self = this;
			var component = this.element.find(".widget-huabaoview");
			editingHuabaoEditor = component;
			$('#huabaoEditorDialog').dialog('open');
		},
		_createDesignerWidget : function() {
		},
		_widgetOver : function() {
			$('#ui-designer-widget-handle').widgetHandle('display',
					[$('#widgetRemove'), $('#widgetSet')]);// 显示工具栏

		},
		_widgetOut : function() {
		},
		_refresh : function(type) {

		},
		switchImage : function(id, isAutoMod) {
			var self = this;
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
					var dd = $('<dd style="display:none" data-tipid="' + i
							+ '">' + item.itemTitle + '</dd>');
					rg.append(dd);// 顶部商品标题
					var marker = $('<div class="related-goods-marker" style="left:'
							+ ((660 - 6 - am) / 2 + item.x)
							+ 'px;top:'
							+ item.y + 'px" data-tipid="' + i + '"></div>');// 商品框
					var area = $('<span class="marked-area" style="width:'
							+ (item.width + 8) + 'px;height:'
							+ (item.height + 8) + 'px;"></span>');
					for (var aw = 1; aw < 4; aw++) {
						area.append('<b class="shadow-' + aw
								+ '" style="width:'
								+ (item.width + (4 - aw) * 2) + 'px;height:'
								+ (item.height + (4 - aw) * 2) + 'px;"></b>');
					}
					var b = $('<b class="inner-border" style="width:'
							+ item.width + 'px;height:' + item.height
							+ 'px;opacity: 1; filter:Alpha(Opacity=100);"></b>');
					area.append(b);
					var aq = (-1) * (item.height + 8) / 2, ah = (item.width + 8)
							/ 2;
					aq = aq + item.y + 270 > $(this).height() ? aq - 123 : aq;
					ah = ah + (660 - 6 - am) / 2 + item.x + 254 > $(this)
							.width() ? ah - 270 : ah;
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
							self.showTip($(this).parent())
						}, function(e) {
							var area = $(this).parent();
							if (e.relatedTarget) {
								if ($.contains(
										area.parent().find('.tip-wrap')[0],
										e.relatedTarget)) {
									return;
								}
							}
							self.hideTip(area)
						});
				$('dd', rg).fadeIn("slow").unbind('hover').hover(function() {
					$(this).addClass('current').siblings()
							.removeClass('current');
					self.showTip($('.related-goods-marker[data-tipid='
									+ $(this).attr('data-tipid')
									+ '] .marked-area', jo));
				}, function() {
					$(this).removeClass('current');
					self.hideTip($('.related-goods-marker[data-tipid='
									+ $(this).attr('data-tipid')
									+ '] .marked-area', jo));
				})
			}).attr('src', picItem.picSrc);

		},
		showTip : function(area) {
			area.animate({
						opacity : 1
					}, 500);
			area.parent().find('.tip-wrap').animate({
						opacity : 1
					}, 500).css('z-Index', 1).show();
		},
		hideTip : function(area) {
			area.animate({
						opacity : 0
					}, 1000);
			area.parent().find('.tip-wrap').animate({
						opacity : 0
					}, 1000).css('z-Index', 0).show();
		}
	});
})(jQuery);
