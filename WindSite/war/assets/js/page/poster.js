$(function() {
	var currentNum, mod, length, posterInfo, REGPID = /mm_\d{0,24}_\d{0,24}_\d{0,24}/gmi;
	var ul = $('#J_thumbList ul'), cn = $('#currentNum'), tc = $('#thumbCurrent'), jo = $('#J_posterOriginalImage'), ji = $('#J_Image'), jp = $('#J_PosterDesc'), rg = $('#related-goods'), rbt = $('#related-goods-v1-btn'), rbta = $('#related-goods-v1-btn a');
	if (typeof(data) != 'undefined' && data.hasOwnProperty('posterInfo')) {// 如果画报存在
		posterInfo = data['posterInfo'];
		length = posterInfo.length;
		var height = parseInt($('#J_thumbList').height() / 5);
		if (PICID != 0) {// 如果指定PICID访问
			switchImage(PICID, true);
		} else {// 默认访问
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
						switchImage(posterInfo[currentNum + 1]['picId']);
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
						switchImage(posterInfo[currentNum - 1]['picId']);
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
						switchImage(posterInfo[currentNum + 1]['picId']);
					}
					return false;
				});
	}
	/*
	 * $('#J_RelateHuabaos') .append('<div class="loading"
	 * align="left">正在加载数据,请稍候...</div>'); $.ajax({ url :
	 * '/router/huabao/relate/' + HID + '?v=' + Math.random(), type : 'GET',
	 * data : {}, dataType : 'html', beforeSend : function(xhr) { }, error :
	 * function(request, textStatus, errorThrown) { }, success : function(data) {
	 * $('#J_RelateHuabaos').empty().append(data); } });
	 */
	function switchImage(id, isAutoMod) {
		$('dd', rg).remove();// 移除相关商品
		$('.related-goods-marker', jo).remove();// 移除相关商品框
		if (posterInfo == null) {
			return;
		}
		var picItem;
		for (var i = 0; i < posterInfo.length; i++) {
			var d = posterInfo[i];
			if (id == d["picId"]) {
				picItem = d;
				currentNum = i;
				if (i < length - 1) {
					new Image().src = posterInfo[i + 1].picSrc;// 加载下一个图片
				}
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
		var items = picItem.markedItem;
		if (items == null || !items || items.length == 0) {
			rg.hide();
			if (picItem.relatedGoodsLink) {// 相关宝贝
				var href = picItem.relatedGoodsLink.replace(/&amp;/ig, "&")
						.replace(REGPID, PID);
				jp.empty().append('<a href="' + href + '&pid='+PID+'" target="_blank">'
						+ picItem.picDesc + '</a>');// 图片描述
				rbta.attr('href', href);
				rbt.show();
			} else {
				jp.empty().append(picItem.picDesc);// 图片描述
				rbt.hide();
			}
		} else {
			if (data.version == "1.0") {// 非导购类
				rg.hide();
				if (picItem.relatedGoodsLink) {// 相关宝贝
					var href = picItem.relatedGoodsLink.replace(/&amp;/ig, "&")
							.replace(REGPID, PID);
					jp.empty().append('<a href="' + href + '&pid='+PID+'" target="_blank">'
							+ picItem.picDesc + '</a>');// 图片描述
					rbta.attr('href', href);
					rbt.show();
				} else {
					jp.empty().append(picItem.picDesc);// 图片描述
					rbt.hide();
				}
			} else {// 导购类
				rg.show();
				jp.empty().append(picItem.picDesc);// 图片描述
				rbt.hide();
			}

		}
		ji.unbind('load').load(function() {
			cn.text(currentNum + 1);
			var numiids = [];
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

			var am = $(this).width() > 660 ? 660 : $(this).width(), ax = $(this)
					.height();
			if (!(items == null || !items || items.length == 0)) {
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					numiids.push(item.itemId);
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
							+ 'px;opacity: 1;"></b>');
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
							+ '</dd><dt class="hb-fl-desc" style="display:none;">返利:</dt><dd numiid="'
							+ item.itemId
							+ '" class="hb-fl" picid="'
							+ id
							+ '" style="display:none;font-size:14px;font-weight:700;color:#f60;"></dd><dt>\u7b80\u8ff0:</dt><dd>'
							+ item.itemDesc
							+ '</dd></dl><a href="/titem/'
							+ item.itemId
							+ '.html?'
							+ item.P4PKeyword
							+ '" style="position:absolute;right:10px;bottom:7px;background:#232323 url(http://img04.taobaocdn.com/tps/i4/T1KLBOXc0uXXXXXXXX.png) right -21px no-repeat;display:inline-block;padding-right:12px;" target="_blank">宝贝详情</a><div style="clear:both;"></div></div><div class="p4p-goods-tip"></div><b class="corner"></b></div>');
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
								if ($.contains(
										area.parent().find('.tip-wrap')[0],
										e.relatedTarget)) {
									return;
								}
							}
							hideTip(area)
						});
				$('dd', rg).fadeIn("slow").unbind('hover').hover(function() {
					$(this).addClass('current').siblings()
							.removeClass('current');
					showTip($('.related-goods-marker[data-tipid='
									+ $(this).attr('data-tipid')
									+ '] .marked-area', jo));
				}, function() {
					$(this).removeClass('current');
					hideTip($('.related-goods-marker[data-tipid='
									+ $(this).attr('data-tipid')
									+ '] .marked-area', jo));
				})
				if (ISFANLI && numiids.length > 0) {// 如果支持返利
					var co = $('#J_posterContainer').data('pic-' + id);
					if (co != null) {// 如果已缓存
						$('.hb-fl', jo).each(function() {
							var com = co[$(this).attr('numiid')];
							if (com && '0' != com) {
								$(this).empty().append(com + '元').show()
										.parent().find('.hb-fl-desc').show();
							}
						});
					} else {// 当前商品未缓存，则抓取
						var sender = new WindSender('/router/huabao/convert?v='
										+ Math.random(), true);
						sender.load("GET", {
									picid : id,
									numiids : numiids.join(',')
								}, function(response) {
									if (response.isSuccess()) {// 转换佣金返利成功
										var co = response.body.commissions;
										$('#J_posterContainer').data(
												('pic-' + response.body.picid),
												response.body.commissions);
										$('.hb-fl', jo).each(function() {
											var com = co[$(this).attr('numiid')];
											if (com && '0' != com) {
												$(this).empty().append(com
														+ '元').show().parent()
														.find('.hb-fl-desc')
														.show();
											}
										});
									}
								});
					}
				}
			}
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
});
