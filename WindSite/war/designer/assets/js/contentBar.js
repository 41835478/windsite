/**
 * 内容下方工具栏
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.contentBar", {
		/**
		 * 参数
		 */
		options : {},

		/**
		 * 创建
		 */
		_create : function() {

		},
		/**
		 * 初始化
		 */
		_init : function() {
			var self = this;
			var bar = self.element;
			$('#content-insert').button().unbind('click').click(function() {
				var content = $('<div class="ui-designer-content" layout="1-3"><div class="ui-designer-container left-1-3"></div><div class="ui-designer-container right-1-3"></div></div>');
				bar.after(content);
				content.designerContent().designerContent('changeDesigner');
			});
			$('#content-hide').button().unbind('click').click(function() {// 隐藏
						if ($(this).button('option', 'label') == '暂时隐藏所有布局容器') {
							$('#main .ui-designer-content')
									.designerContent('hideContainer');
							$(this).button('option', 'label', '显示所有布局容器');
						} else {// 显示
							$('#main .ui-designer-content')
									.designerContent('showContainer');
							$(this).button('option', 'label', '暂时隐藏所有布局容器');
						}
					});
		}
	});
})(jQuery);
