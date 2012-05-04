/**
 * 站点管理向导
 */
(function($) {
	$.widget("ui.siteManagerGuide", {
		/**
		 * 参数
		 */
		options : {},
		/**
		 * 创建组件
		 */
		_create : function() {
			this.addBorder($('#gtSynTaobao'));
		},
		/**
		 * 组件初始化
		 */
		_init : function() {
			var self = this;
			o = self.options;
		},
		addBorder : function(attr) {
			var offset = attr.offset();
			var top = attr.offset().top - 6;
			var left = attr.offset().left - 6;
			var height = attr.height() + 12;
			var width = attr.width() + 12;
			$('.gt-border').remove();
			$('body')
					.append('<div class="gt-border" style="left:'
							+ left
							+ 'px;top:'
							+ top
							+ 'px;width:4px;height:'
							+ (height)
							+ 'px;"></div><div class="gt-border" style="width:4px;left:'
							+ (left + width)
							+ 'px;top:'
							+ top
							+ 'px;height:'
							+ (height)
							+ 'px;"></div><div class="gt-border" style="height:4px;left:'
							+ left
							+ 'px;top:'
							+ top
							+ 'px;height:4px;width:'
							+ (width)
							+ 'px;"></div><div class="gt-border" style="height:4px;left:'
							+ left + 'px;top:' + (top + height) + 'px;width:'
							+ (width + 4) + 'px;"></div>');
			$('body').append('<div id="gt-border" style="left:' + (left + 6)
					+ 'px;top:' + (top + 6) + 'px;width:' + (width - 12)
					+ 'px;height:' + (height - 12) + 'px;"></div>');
			$('#gt-border').click(function() {
						attr.click();
					});
			// attr.tooltip('#guidetooltip').show();
			// $('#gtSynTaobao[title]').tooltip('#guidetooltip');
			setInterval(function() {
						$('.gt-border').toggleClass('flash');
					}, 1000);
		}
	});
})(jQuery);
