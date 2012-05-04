/**
 * 依赖:jquery,jquery.later.js
 */
(function($) {
	function PostersTips($elem, options) {
		var self = this, laters = {}, tagContainer = $elem, imageArea = $(
				'img', $elem), layoutController = [], markerCountsInCurrentImage = 0, tipWidth = 0, tipHeight = 0;
		// 默认
		var defaults = {
			tagCount : 3,
			isShowTag : true,
			markerTagCls : "poster-point",
			markerTipCls : "goods-tip"
		};
		// 配置
		var o = $.extend(defaults, options);
		var POSTERS = o.posters;
		for (i = 0; i < o.tagCount; i++) {
			var marker = $([
					'<div class="marker" style="top:-9999px;left:-9999px"><b class="',
					o.markerTagCls, ' J_MarkerTag" style="z-index:1">',
					(i + 1), '</b><div class="', o.markerTipCls,
					' J_MarkerTip" style="display:none;z-index:2"></div></div>']
					.join(''));
			var tag = $('.J_MarkerTag', marker);
			var tip = $('.J_MarkerTip', marker);
			layoutController.push({
						layoutRef : marker,
						tagRef : tag,
						tipRef : tip,
						layoutId : 'J_Layout' + i
					});

			tagContainer.append(marker);
			tipWidth = tip.width();
			tipHeight = tip.height() + 20;
			// TIPS
		}
		$.each(layoutController, function(index, value) {
					// TAG事件
					value.tagRef.hover(function() {
						if (laters['tagTimer' + index]) {
							laters['tagTimer' + index].cancel();
						}
						self.showTagAndTip(index);
							// TODO
							// if (d.UA.ie && d.UA.ie == 6) {
							// e.addClass(h, "pthover")
							// }
						}, function() {
							// TODO
							// if (d.UA.ie && d.UA.ie == 6) {
							// e.removeClass(h, "pthover")
							// }
							laters['tagTimer' + index] = $.later(200, self,
									function() {
										self.hideTip(index);
									});
						});
					// TIPS事件
					value.tipRef.hover(function() {
								if (laters['tagTimer' + index]) {
									laters['tagTimer' + index].cancel();
								}
								if (laters['tipTimer' + index]) {
									laters['tipTimer' + index].cancel();
								}
								self.showTagAndTip(index);
							}, function() {
								laters['tipTimer' + index] = $.later(200, self,
										function() {
											self.hideTip(index);
										});
							});
				});
		imageArea.hover(function() {
					$('.J_MarkerTag', $elem).show();
				}, function() {
					$('.J_MarkerTag', $elem).hide();
				});
		// methods
		$.extend(self, {
			getConf : function() {
				return o;
			},
			/**
			 * 当前画报
			 */
			getPosters : function() {
				return POSTERS;
			},
			getLayoutController : function() {
				return layoutController;
			},
			/**
			 * 重置Tips
			 */
			resetLayout : function() {
				$.each(layoutController, function(index, value) {
							value.layoutRef.css({
										top : '-9999px',
										left : '-9999px'
									});
						});
				markerCountsInCurrentImage = 0;
			},
			showTagAndTip : function(g) {
				self.showTag(g);
				self.showTip(g)
			},
			hideTagAndTip : function(g) {
				self.hideTag(g);
				self.hideTip(g)
			},
			/**
			 * 显示指定TIPS
			 */
			showTip : function(index) {
				if (index >= layoutController.length) {
					return;
				}
				var tag = layoutController[index];
				if (tag) {
					tag.tipRef.css('zIndex', 3).show();
				}
			},
			/**
			 * 隐藏指定TIPS
			 */
			hideTip : function(index) {
				if (index >= layoutController.length) {
					return;
				}
				var tag = layoutController[index];
				if (tag) {
					tag.tipRef.css('zIndex', 3).hide();
				}
			},
			/**
			 * 显示指定的商品图钉
			 */
			showTag : function(index) {
				if (index >= layoutController.length) {
					return;
				}
				var tag = layoutController[index];
				if (tag) {
					tag.tagRef.fadeIn();
					tag.layoutRef.css('zIndex', 10);
				}
			},
			/**
			 * 隐藏指定的商品图钉
			 */
			hideTag : function(h) {
				if (index >= layoutController.length) {
					return;
				}
				var tag = layoutController[index];
				if (tag) {
					tag.tagRef.hide().css('zIndex', 1);
					tag.layoutRef.css('zIndex', 2);
				}
			},
			/**
			 * 重设Tips位置
			 */
			setLayout : function(items) {
				self.resetLayout();
				if (!o.isShowTag) {
					return
				}
				var i = 0;
				for (; i < items.length; i++) {
					if (i == 3) {// 不能超过3个
						break;
					}
					self._setTag(layoutController[i], items[i]);
					self._setTip(layoutController[i], items[i]);
				}
				markerCountsInCurrentImage = i;
			},
			_setTag : function(layout, item) {
				if (item.hasOwnProperty('markerSize')) {
					var position = item.markerSize;
					var lRef = layout.layoutRef, tRef = layout.tagRef, x = position[0]
							* 1, y = position[1] * 1;
					tRef.height(32).width(32);
					var j = (tagContainer.width() - imageArea[0].offsetWidth)
							/ 2;
					lRef.css({
								left : x + j + 'px',
								top : y + 'px'
							});
				}
			},
			_setTip : function(layout, item) {
				var tip = layout.tipRef, x = item.markerSize[0] * 1, y = item.markerSize[1]
						* 1;
				var width = imageArea.width(), height = imageArea.height(), w = tipWidth, s = tipHeight, top = 0, left = -1
						* w / 2;
				if (width - x < w) {
					left = -1 * (w - (width - x))
				}
				if (left + x < 0) {
					left = left - (left + x)
				}
				var B = 217;
				if ((height - y - 32 < B)) {
					top = top - B - 32
				}
				if (top + y + 32 < 0) {
					top = 0
				}
				tip.css({
							marginLeft : left,
							marginTop : top
						});
			}

		});
	}
	$.fn.postersTips = function(options) {
		// already constructed --> return API
		var el = this.data("postersTips");
		if (el) {
			return el;
		}
		this.each(function() {
					el = new PostersTips($(this), options);
					$(this).data("postersTips", el);
				});

		return el;

	};
})(jQuery);
(function($) {
	function Posters($elem, options) {
		var self = this;
		var defaults = {
			direction : "v",
			itemInView : 4,
			imageAreaMinHeight : 600,
			indicatorCls : "thumbCurrent",
			indicatorPosition : 1,
			defaultIndex : 0,
			indicatorIndex : 0,
			defaultLink : '/item/id-NUMIID.html'
			/** 默认的推广链接格式[默认是微博系统]* */
		}
		var o = $.extend(defaults, options);
		/**
		 * 商品数据
		 */
		var DATA = [];
		if (o && o.hasOwnProperty('data')
				&& o.data.hasOwnProperty('markerData')) {
			DATA = o.data.markerData;
		}
		var IMAGE = [];
		if (o && o.hasOwnProperty('image')
				&& o.image.hasOwnProperty('imageData')) {
			IMAGE = o.image.imageData;
		}
		/**
		 * 当前容器
		 */
		var posterContainer = $elem
		/**
		 * 图片加载
		 */
		, posterImageLoading = $('#J_PosterImageLoading', $elem)
		/**
		 * 画报图片区
		 */
		, posterImageArea = $(".J_PosterImageArea", $elem)
		/**
		 * 大图
		 */
		, posterImage = $('.J_ImageWrap img', $elem)
		/**
		 * 画报列表区
		 */
		, thumbContainer = $(".J_PosterThumb", $elem)
		/**
		 * 画报列表
		 */
		, thumbContent = $(".J_ThumbContent", $elem)
		/**
		 * 图片描述
		 */
		, thumbDesc = $('#J_DescRgn')
		/**
		 * 取第二个小图（第一个是默认假图）
		 */
		, firstThumb = thumbContent.find('li:eq(1)');
		if (firstThumb.length == 0) {// 没有则返回
			return;
		}

		/**
		 * 高度是否自动
		 */
		var adjustImageAreaHeightComplete = false
		/**
		 * 上一个图集
		 */
		, prevPosterURL = $(".J_LocateToPrevPoster", $elem)
		/**
		 * 下一个图集
		 */
		, nextPosterURL = $(".J_LocateToNextPoster", $elem)
		/**
		 * 上一页
		 */
		, prevScrollTrigger = $("#J_ThumbScrollPrev", $elem)
		/**
		 * 下一页
		 */
		, nextScrollTrigger = $("#J_ThumbScrollNext", $elem)
		/**
		 * 上一张
		 */
		, showPrevImageTrigger = $(".J_ShowPrevImage", $elem)
		/**
		 * 下一张
		 */
		, showNextImageTrigger = $(".J_ShowNextImage", $elem)
		/**
		 * 总页码
		 */
		, totalPage = $("#J_TotalPage", $elem)
		/**
		 * 当前页码
		 */
		, currentPage = $("#J_CurrentPage", $elem)
		/**
		 * 选中
		 */
		, currentIndicator = $('#J_ThumbCurrent', $elem)
		/**
		 * 图片数量
		 */
		, thumbLength = thumbContent.children().length - 2
		/**
		 * 小图宽度
		 */
		, thumbItemWidth = firstThumb[0].offsetWidth
		/**
		 * 小图高度
		 */
		, thumbItemHeight = firstThumb[0].offsetHeight
		/**
		 * 小图当前索引
		 */
		, currentIndexInThumb = 0
		/**
		 * 当前页码第一个索引
		 */
		, currentFirstIndexInViewport = 0;

		// 处理当前选中位置样式
		if (o.direction === "h") {// 如果横排
			currentIndicator.css({
						position : "absolute",
						left : o.indicatorPosition * thumbItemWidth
					});

		} else {// 如果竖排
			currentIndicator.css({
						position : "absolute",
						top : o.indicatorPosition * thumbItemHeight
					});
		}
		// 根据指针添加前置，后置空列
		thumbAddedPrevCount = o.indicatorPosition;
		thumbAddedNextCount = o.itemInView - o.indicatorPosition - 1;
		var b = -1;
		// thumbContent
		// .prepend('<li class="thumb-first-notice"
		// data-thumbItemIndex="-1"></li>');
		// for (var e = 0; e < thumbAddedPrevCount - 1; e++) {
		// b = b - 1;
		// thumbContent.prepend('<li class="blank" data-thumbItemIndex="' + b
		// + '"></li>');
		// }
		// thumbContent
		// .append('<li class="thumb-last-notice" data-thumbItemIndex="'
		// + thumbLength + '"></li>');
		b = thumbLength;
		for (var e = 0; e < thumbAddedNextCount - 1; e++) {
			b = b + 1;
			thumbContent.append('<li class="blank" data-thumbItemIndex="' + b
					+ '"></li>');
		}
		// 增加默认PostersTips
		posterImageArea.postersTips();

		// methods
		$.extend(self, {
			getConf : function() {
				return o;
			},
			/**
			 * 设置当前显示图片索引
			 */
			_setCurrentPage : function(index) {
				currentPage.text(index);
			},
			/**
			 * 上一张
			 */
			displayPrevImage : function() {
				if (currentIndexInThumb - 1 > -1) {
					self._scrollThumb(currentIndexInThumb + thumbAddedPrevCount
							- 1)
				} else {
				}
			},
			/**
			 * 下一张
			 */
			displayNextImage : function() {
				if (currentIndexInThumb + 1 < thumbLength) {
					self._scrollThumb(currentIndexInThumb + thumbAddedPrevCount
							+ 1)
				} else {
				}
			},
			/**
			 * 上一页
			 */
			scrollThumbPrev : function() {
				self._scrollThumb(currentIndexInThumb + thumbAddedPrevCount
						- o.itemInView);
			},
			/**
			 * 下一页
			 */
			scrollThumbNext : function() {
				self._scrollThumb(currentIndexInThumb + thumbAddedPrevCount
						+ o.itemInView);
			},
			/**
			 * 滚动到指定图片
			 */
			_scrollThumb : function(index) {
				if (index > thumbLength - 1 + thumbAddedPrevCount) {
					index = thumbLength - 1 + thumbAddedPrevCount
				}
				if (index < thumbAddedPrevCount) {
					index = thumbAddedPrevCount
				}
				// 滚动
				if (o.direction === "v") {
					thumbContent.animate({
								top : -1 * (index - o.indicatorPosition)
										* thumbItemHeight + 'px'
							}, 500);
				} else {
					thumbContent.animate({
								left : -1 * (index - o.indicatorPosition)
										* thumbItemWidth + 'px'
							}, 500);
				}
				self.displaySpecifiedImage(index - thumbAddedPrevCount)
			},
			/**
			 * 显示指定图片
			 */
			displaySpecifiedImage : function(index) {
				var img = thumbContent.find('.J_ThumbItems img:eq(' + index
						+ ')');
				var src = img.attr('data-original-src') + '_620x10000.jpg';
				posterImage.removeAttr('src');
				posterImage.attr('src', src);
				posterImageLoading.show();// 显示加载
				posterImage.hide();// 隐藏大图
				if (posterImage[0].complete || posterImage[0].readyState === 4) {// TODO
					// ？是否需要处理跨浏览器
					self.updateMarkers(img);
				} else {
					posterImage.unbind('load').bind('load', function() {
								posterImage.unbind('load');// 完成后移除该事件
								self.updateMarkers(img);

							})
				}
				currentIndexInThumb = index;
				self._setCurrentPage(index + 1);
				// 同时加载下一个大图
				var nextImg = thumbContent.find('.J_ThumbItems img:eq('
						+ (index + 1) + ')');
				if (nextImg.length == 1) {
					var nextSrc = nextImg.attr('data-original-src');
					if (nextSrc) {
						var image = new Image();
						image.src = nextSrc + '_620x10000.jpg';
					}
				}
			},
			/**
			 * 更新指定图片TIPS
			 */
			updateMarkers : function(thumb) {
				// 调整大图区域高度
				var imageHeight = posterImage.height();
				posterImage.parent().height(imageHeight > o.imageAreaMinHeight
						? imageHeight
						: o.imageAreaMinHeight);
				posterImageLoading.hide();// 隐藏加载
				posterImage.show();// 显示大图

				var data = thumb.data('items');
				if (!data) {// 如果未缓存，则查找
					data = [];
					var picId = thumb.attr('data-picid');// 图片标识
					for (var i = DATA.length - 1; i > -1; i--) {// 查找当前图片商品
						var item = DATA[i];
						if (item.picId == picId) {
							data = item.markers;
							DATA.splice(i, 1);// 移除
							break;
						}
					}
					thumb.data('items', data);
				}
				thumbDesc.html(thumb.attr('alt'));// 图片描述【暂时不启用相关宝贝链接，移至商品判断后边，避免显示】
				var posterTips = posterImageArea.data('postersTips');
				if (data.length == 0) {
					var image = thumb.data('image');
					if (!image) {
						var picId = thumb.attr('data-picid');// 图片标识
						for (var i = IMAGE.length - 1; i > -1; i--) {// 查找当前图片商品
							var item = IMAGE[i];
							if (item.picId == picId) {
								image = item;
								IMAGE.splice(i, 1);// 移除
								break;
							}
						}
						thumb.data('image', image);
					}
					if (image && image.hasOwnProperty('relatedGoodsLink')) {
						$('#J_RelatedGoodsLink').attr('href',
								self._convertGoodLink(image.relatedGoodsLink))
								.parent().show();
					}
					// TODO 显示相关宝贝按钮
					posterTips.resetLayout();
					return;
				} else {// 隐藏相关宝贝
					$('#J_RelatedGoodsLink').attr('href', '#').parent().hide();
				}
				var layoutControllers = posterTips.getLayoutController();
				// TODO
				// 需请求淘宝获取评论或评分数。http://count.taobao.com/counter2?keys=ICE_3_feedcount-NUM_ID&callback=PosterDetailApp.AsyncCallback.setGoodsRate1270993976738388048484921455&t=0.2819804474711418
				for (var i = 0; i < data.length; i++) {
					var item = data[i];
					var link = self._convertLink(item);
					layoutControllers[i].tipRef
							.html([
									'<b class="tl"><b class="tr"></b></b><div class="tip-wrap"><div class="tip-info"><div class="s160 pic goods-pic"><a href="',
									link,
									'" target="_blank" class="J_GoodsImageLink J_ToDetailPageLink"><img src="',
									item.markerItemPicSrc,
									'_170x170.jpg" class="J_GoodsImage" /></a></div><div class="goods-name"><a href="',
									link,
									'" target="_blank" class="J_GoodsTitleLink J_ToDetailPageLink">',
									item.markerItemTitle,
									'</a></div><div class="tip-pri" class="J_TmallTag"><b class="J_Buyers"><span>',
									item.markerItemSaleVolume,
									'</span>人购买</b>',
									item.isTmallBrand === '1'
											? '<b class="ic1"></b>'
											: '',
									'</div><p class="desc" title="\u7b80\u8ff0:',
									item.markerItemDesc,
									'">\u7b80\u8ff0:',
									item.markerItemDesc,
									'</p><ul>',
									((item.isTmallBrand === '1'
											? '<li class="tp4">评分<br />'
											: '<li class="tp4">评论数<br />')),
									'<span class="J_GoodsRate">0</span></li><li class="tp5">一口价<br /><span class="rmb">&yen;</span><em class="J_GoodsFixedPrice">',
									item.markerItemPrice,
									'</em></li></ul><a href="',
									link,
									'" target="_blank" class="info J_ToDetailPageLink">宝贝详情</a></div><div class="poster-share"><ul><li><a href="#" class="s1 J_ShareToWeiBo">分享微博</a></li><li><a href="#" class="s2 J_AddBookmarks">收藏宝贝</a></li><li><a href="',
									link,
									'&on_comment=1" target="_blank" class="s3 J_ViewBuyerComments">购买评价</a></li></ul></div><div class="share-area J_ShareArea" style="display:none;"><textarea class="J_ShareContent">\u5728#\u6dd8\u753b\u62a5#\u770b\u5230\u5f88\u8d5e\u7684\u56fe\u7247\uff0c\u5b9d\u8d1d\u8fd8\u80fd\u8d2d\u4e70\uff0c\u5c3c\u739b\u597d\u60f3\u4e70\uff01\uff01\uff01\u8dea\u6c42\u62d4\u8349~~~~~~</textarea><div class="share_other"><span>\u66f4\u591a</span><a class="jh" title="\u5206\u4eab\u5230\u6dd8\u5b9d" href="#"></a><a class="ren" title="\u5206\u4eab\u5230\u4eba\u4eba\u7f51" href="#"></a><a class="zone" title="\u5206\u4eab\u5230QQ\u7a7a\u95f4" href="#"></a><a class="dou" title="\u5206\u4eab\u5230\u8c46\u74e3" href="#"></a>{{#if detailType === "star"}}<a class="fetion" title="\u5206\u4eab\u5230\u98de\u4fe1" href="#"></a>{{/if}}<a class="s_pub" title="\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a" href="#">\u53d1\u5e03\u81f3\u65b0\u6d6a</a></div></div></div><b class="bl"><b class="br"></b></b>']
									.join(''));
				}
				posterTips.setLayout(data);
				// 更新图片列表
				self.updateRelatedGoods(data);
			},
			/**
			 * 转换推广链接
			 */
			_convertLink : function(item) {
//				if (PID && item.markerItemLink) {
//					return item.markerItemLink.replace(
//							/mm_\d{0,24}_\d{0,24}_\d{0,24}/gi, PID).split('#')[0]
//							+ '&pid=' + PID;
//				}
				return o.defaultLink.replace('NUMIID', item.markerItemId);
			},
			/**
			 * 转换relatedgoogdlink
			 */
			_convertGoodLink : function(goodlink) {
				if (PID && goodlink) {
					return goodlink.replace(/mm_\d{0,24}_\d{0,24}_\d{0,24}/gi,
							PID).split('#')[0]
							+ '&pid=' + PID;
				}
				return '#';
			},
			/**
			 * 更新相关商品
			 */
			updateRelatedGoods : function(items) {
				var relatedGoodsArea = $("#J_PosterRelatedGoods");
				var h4 = relatedGoodsArea.parent().find('h4:first');
				relatedGoodsArea.html("");
				if (items.length > 0) {
					h4.show();
					relatedGoodsArea.fadeIn();
					for (var i = 0; i < items.length; i++) {
						var item = items[i];
						var link = self._convertLink(item);
						relatedGoodsArea
								.append([
										'<div class="goods-wrap" data-relatedGoodsIndex="',
										i,
										'" style="float:left;"><b>',
										(i + 1),
										'</b><div class="pic s70 goods-pic"><a href="',
										link,
										'" target="_blank" class="J_DetailPageLink"><img src="',
										item.markerItemPicSrc,
										'_70x70.jpg" /></a></div><div class="goods-description"><div class="goods-name"><a href="',
										link,
										'" target="_blank" class="goods-name J_DetailPageLink">',
										item.markerItemTitle,
										'</a></div>',
										item.markerItemStatus == 0
												? ('<ul class="goods-info"><li>一口价：<span class="rmb">&yen;</span><em class="g2">'
														+ item.markerItemPrice
														+ '</em></li><li><a class="J_DetailPageLink buyit" href="'
														+ link
														+ '" target="_blank"></a>已售'
														+ item.markerItemSaleVolume + '件</li></ul>')
												: ('<div class="goods-info"><p class="not-onsale">该商品已下架</p></div>'),
										'</div></div>'].join(''));
					}
					var posterTips = posterImageArea.data('postersTips');
					relatedGoodsArea.find('.goods-wrap').hover(function() {
						posterTips.showTag($(this)
								.attr('data-relatedGoodsIndex'));

					}, function() {
						posterTips.hideTag($(this)
								.attr('data-relatedGoodsIndex'));
					});
				} else {
					h4.hide();
					relatedGoodsArea.hide();
				}
			}
		});
		// 小图点击
		thumbContent.find('.J_ThumbItems').click(function() {
					self._scrollThumb($(this).index());
				});
		$(document).unbind('keydown').bind('keydown', 'left', function() {
					self.displayPrevImage();
				}).bind('keydown', 'right', function() {
					self.displayNextImage();
				});
		// 上一张，下一张
		posterImageArea.bind('mousemove click', function(e) {
					var width = posterImageArea.width(), offset = posterImageArea
							.offset(), eventType = e.type, x = e.pageX, y = e.pageY;
					if (eventType === "click") {
						if ($(e.target).parents('.marker').length == 1) {
							return
						}
						(x - offset.left >= width / 2) ? self
								.displayNextImage() : self.displayPrevImage()
					} else {
						if (x - offset.left >= width / 2) {
							if (posterImageArea
									.hasClass("poster-image-arrow-next")) {
								return
							}
							posterImageArea
									.removeClass("poster-image-arrow-prev");
							posterImageArea.addClass("poster-image-arrow-next")
						} else {
							if (posterImageArea
									.hasClass("poster-image-arrow-prev")) {
								return
							}
							posterImageArea
									.removeClass("poster-image-arrow-next");
							posterImageArea.addClass("poster-image-arrow-prev")
						}
					}
				});
		// 上一页，下一页
		prevScrollTrigger.click(function() {
					self.scrollThumbPrev();
					return false;
				});
		nextScrollTrigger.click(function() {
					self.scrollThumbNext();
					return false;
				});
		self._scrollThumb(0);
	}
	$.fn.posters = function(options) {
		// already constructed --> return API
		var el = this.data("posters");
		if (el) {
			return el;
		}
		this.each(function() {
					el = new Posters($(this), options);
					$(this).data("posters", el);
				});

		return el;

	};
})(jQuery);