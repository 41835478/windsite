/**
 * 内容区工具栏
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.contentHandle", {
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
			var handle = self.element;
			var content = handle.parents('.ui-designer-content');// 当前内容区
			// 移除容器
			$(".contentRemove", handle).button({
						icons : {
							primary : 'ui-icon-trash'
						},
						text : false
					}).unbind("click").click(function() {
						var content = $(this).parents('.ui-designer-content');
						if (confirm('您确定要删除此容器吗？')) {
							content.remove();
						}
					});
			$('.contentHide', handle).button().unbind('click').click(
					function() {
						var content = $(this).parents('.ui-designer-content');// 当前内容区
						if ($(this).button('option', 'label') == '暂时隐藏此容器') {// 隐藏
							$(this).parents('.ui-designer-content')
									.designerContent('hideContainer');// 当前内容区
						} else {// 显示
							$(this).parents('.ui-designer-content')
									.designerContent('showContainer');

						}
					});
			// 切换当前容器布局
			$('.layoutsContentSelect', handle).unbind('change').change(
					function() {
						var content = $(this).parents('.ui-designer-content');// 当前内容区
						if ($(this).val() == '0') {
							$(this).val(content.attr('layout'));
							return;
						}
						if (content.find('.ui-designer-widget').length > 0) {
							if (window.confirm("切换布局将移除现有组件,您确定要这么做吗？")) {
								self.changeLayout($(this).val());
							} else {
								$(this).val(content.attr('layout'));
							}
						} else {
							self.changeLayout($(this).val());
						}
					}).hover(function(event) {// 停止mouse事件传播至父组件
						event.stopPropagation();
					}, function(event) {
						event.stopPropagation();
					}).val(content.attr('layout'));
		},
		changeLayout : function(layout) {
			var content = this.element.parents('.ui-designer-content');
			$('.ui-designer-container', content).remove();
			var _content = '';
			switch (layout) {
				case '1-3-1' :
					_content = '<div class="ui-designer-container left-1-3-1"></div>'
							+ '<div class="ui-designer-container middle-1-3-1"></div>'
							+ '<div class="ui-designer-container right-1-3-1"></div>';
					break;
				case '1-3' :
					_content = '<div class="ui-designer-container left-1-3"></div>'
							+ '<div class="ui-designer-container right-1-3"></div>';
					break;
				case '1' :
					_content = '<div class="ui-designer-container middle-1"></div>';
					break;
			}
			content.append(_content).designerContent().attr('layout',
					$(this).val());// 存储布局;
			return content;
		}
	});
})(jQuery);
