(function($) {
	// TODO 修订AutoComplete
	$.Autocompleter.prototype.fetchData = function(value) {
		var data = this.cacheRead(value);// 缓存
		if (data) {
			this.filterAndShowResults(data);
		} else {
			$.getScript(this.makeUrl(value));
		}
	};
	$.Autocompleter.prototype.activate = function() {
		var self = this;
		var itemSearch = self.dom.$elem.parents('form:first')
				.find('.search-tab li.selected');
		if (itemSearch.length == 1) {
			var rel = itemSearch.attr('rel');
			if ('item' != rel && 'mall' != rel)
				return;
		}
		var activateNow = function() {
			self.activateNow();
		};
		var delay = parseInt(this.options.delay, 10);
		if (isNaN(delay) || delay <= 0) {
			delay = 250;
		}
		if (this.keyTimeout_) {
			clearTimeout(this.keyTimeout_);
		}
		this.keyTimeout_ = setTimeout(activateNow, delay);
	};
	$.widget("ui.page", {
				/**
				 * 参数
				 */
				options : {},
				_create : function() {
				},
				/**
				 * Page初始化
				 */
				_init : function() {
					var self = this;
					var o = self.options;
					var page = self.element;// 内容区
					$('#module-bar').pageModuleBar();
					$('#page-header-editor').pageHeaderEditor();
					$('#page-module-editor').pageModuleEditor();
					$('#page-cids-editor').pageCidsEditor();
					if (typeof(PAGEID) != 'undeifned' && '' != PAGEID) {// 加载页面内容区
						PageUtils.loadContent(PAGEID, USERID, USERNICK, PID,
								true);
					}
					// 初始化页头，内容区
					// $('#bd .J_TRegion,#hd .J_TRegion', page).each(function()
					// {
					// if ($(this).attr('data-id')) {
					// PageUtils.loadRegion($(this));
					// }
					// });
					// 切换展现模式
					$('#J_TSwitchMod').click(function() {
						if ($(this).hasClass('view-commission')) {// 切换为佣金模式
							$('.c-c').remove();
							$(this).removeClass('view-commission');
						} else {// 切换为正常模式
							$('#content .shop-display .item').each(function() {
										PageUtils.addViewCommission($(this));
									});
							$('#content .shop-tenorder .pic').each(function() {
										PageUtils.addViewCommission($(this),
												false);
									});
							$('#content .shop-complex-a .item').each(
									function() {
										PageUtils.addViewCommission($(this),
												false);
									});
							$('#content .shop-dianpu .shop-dianpu-ul li').each(
									function() {
										PageUtils.addViewCommission($(this));
									});
							$('#content .shop-child-floor .child-grid li')
									.each(function() {
												PageUtils
														.addViewCommission($(this));
											});
							$(this).addClass('view-commission');
						}
						return false;
					});
					$('#J_SpeedTips').hover(function() {
								$(this).addClass('hover');
							}, function() {
								$(this).removeClass('hover');
							});
				},
				toSource : function(isValidate, isTemp) {
					var self = this;
				}
			});

})(jQuery);
