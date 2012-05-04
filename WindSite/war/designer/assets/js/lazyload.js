/*
 * 新淘网组件延迟加载组件
 * 
 */
(function($) {

	$.fn.widgetLazyload = function(options) {
		var settings = {
			threshold : 0,
			failurelimit : 0,
			event : "scroll",
			effect : "show",
			container : window
		};

		if (options) {
			$.extend(settings, options);
		}

		/* Fire one scroll event per scroll. Not one scroll event per image. */
		var elements = this;
		if ("scroll" == settings.event) {
			$(settings.container).bind("scroll", function(event) {
				var counter = 0;
				elements.each(function() {
							if ($.abovethetop(this, settings)
									|| $.leftofbegin(this, settings)) {
								/* Nothing. */
							} else if (!$.belowthefold(this, settings)
									&& !$.rightoffold(this, settings)) {
								$(this).trigger("appear");
							} else {

								if (counter++ > settings.failurelimit) {
									return false;
								}
							}
						});
				/* Remove image from array so it is not looped next time. */
				var temp = $.grep(elements, function(element) {
							return !element.loaded;
						});
				elements = $(temp);
			});
		}

		this.each(function() {
					var self = this;
					if ("scroll" != settings.event
							|| ($.abovethetop(self, settings)
									|| $.leftofbegin(self, settings)
									|| $.belowthefold(self, settings) || $
									.rightoffold(self, settings))) {
						self.loaded = false;
					} else {
						$.widgetLoad(self);
					}
					/* When appear is triggered load original image. */
					$(self).one("appear", function() {
								if (!this.loaded) {
									$.widgetLoad(self);
								};
							});

					/* When wanted event is triggered load original image */
					/* by triggering appear. */
					if ("scroll" != settings.event) {
						$(self).bind(settings.event, function(event) {
									if (!self.loaded) {
										$(self).trigger("appear");
									}
								});
					}
				});

		/* Force initial check if images should appear. */
		$(settings.container).trigger(settings.event);
		return this;

	};
	/**
	 * 组件加载
	 */
	$.widgetLoad = function(self) {
		var name = $(self).attr('name');
		switch (name) {
			// case 'itemsRotatorView' :// 右侧五图初始化
			// $(".widget-itemsrotatorview-items", $(self)).each(function() {
			// WidgetUtils.itemsRotatorView_init($(this).show());
			// });
			// break;
			// case 'itemsZoomView' :// 放大组件初始化
			// $(".widget-itemszoomview-items", $(self)).each(function() {
			// WidgetUtils.itemsZoomView_init($(this).show());
			// });
			// break;
			// case 'itemsAppleView' :// 仿苹果初始化
			// $(".widget-itemsappleview-items", $(self)).each(function() {
			// WidgetUtils.itemsAppleView_init($(this).show());
			// });
			// break;
			// case 'itemsCycleView' :// 轮换初始化
			// $(".widget-itemscycleview-items", $(self)).each(function() {
			// WidgetUtils.itemsCycleView_init($(this).show());
			// });
			// break;
			// case 'itemsScrollableView' :// 滚动初始化
			// $(".widget-itemsscrollableview-items", $(self)).each(
			// function() {
			// WidgetUtils
			// .itemsScrollableView_init($(this).show());
			// });
			// break;
			case 'flashView' :// 广告牌初始化
				$(".widget-flashview", $(self)).each(function() {
							WidgetUtils.flashView_init($(this).show());
						});
				break;
			case 'itemsSmartAdsFlashView' :// 智能广告
				$(".widget-itemssmartadsflashview-items", $(self)).each(
						function() {
							WidgetUtils.itemsSmartAdsFlashView_init($(this)
									.show());
						});
				break;
			case 'itemsFixedSmartAdsFlashView' :// 固定智能广告
				$(".widget-itemsfixedsmartadsflashview-items", $(self)).each(
						function() {
							WidgetUtils
									.itemsFixedSmartAdsFlashView_init($(this)
											.show());
						});
				break;
			case 'itemsShopWindowView' :// 橱窗
				$(".widget-itemsshopwindowview-items", $(self)).each(
						function() {
							WidgetUtils
									.itemsShopWindowView_init($(this).show());
						});
				break;
			case 'channelView' :// 频道
				$(".widget-channelview", $(self)).each(function() {
							WidgetUtils.channelView_init($(this).show());
						});
				break;
		}
		$(self).fadeIn();
		self.loaded = true;// 当前组件加载完成
	}
	/* Convenience methods in jQuery namespace. */
	/* Use as $.belowthefold(element, {threshold : 100, container : window}) */

	$.belowthefold = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).height() + $(window).scrollTop();
		} else {
			var fold = $(settings.container).offset().top
					+ $(settings.container).height();
		}
		return fold <= $(element).offset().top - settings.threshold;
	};

	$.rightoffold = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).width() + $(window).scrollLeft();
		} else {
			var fold = $(settings.container).offset().left
					+ $(settings.container).width();
		}
		return fold <= $(element).offset().left - settings.threshold;
	};

	$.abovethetop = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).scrollTop();
		} else {
			var fold = $(settings.container).offset().top;
		}
		return fold >= $(element).offset().top + settings.threshold
				+ $(element).height();
	};

	$.leftofbegin = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).scrollLeft();
		} else {
			var fold = $(settings.container).offset().left;
		}
		return fold >= $(element).offset().left + settings.threshold
				+ $(element).width();
	};
	/* Custom selectors for your convenience. */
	/* Use as $("img:below-the-fold").something() */

	$.extend($.expr[':'], {
		"below-the-fold" : "$.belowthefold(a, {threshold : 0, container: window})",
		"above-the-fold" : "!$.belowthefold(a, {threshold : 0, container: window})",
		"right-of-fold" : "$.rightoffold(a, {threshold : 0, container: window})",
		"left-of-fold" : "!$.rightoffold(a, {threshold : 0, container: window})"
	});

})(jQuery);