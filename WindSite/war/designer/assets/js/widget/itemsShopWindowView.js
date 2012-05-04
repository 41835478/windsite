/**
 * 主题推广
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsShopWindowView", $.ui.designerWidget, {
		options : {
			align : 'center',
			revision : '',// 版本标识
			bannerWidth : 950,// 主题宽度
			bannerHeight : 436,// 主题高度
			bannerSID : '',// 主题标识
			dataSource : '',// 主题资源标识
			appSource : 'taoke',// 主题应用标识
			bid : '' // 主题BID
		},
		/**
		 * 返回当前组件源码
		 */
		_toSource : function() {
			var source = '<div class="widget-itemsshopwindowview-items"></div>';
			return source;
		},
		_initDesignerWidget : function() {
			var self = this;
			var widget = this.element;
			var component = widget.find(".widget-itemsshopwindowview-items");
			$('.ui-designer-widget-header', widget).remove();
			WidgetUtils.itemsShopWindowView_init(component);
		},
		_createDesignerWidget : function() {
		},
		_widgetOver : function() {
			if (this.element.width() < 900) {
				$('#ui-designer-widget-handle').widgetHandle('display',
						[$('#widgetRemove')]);// 显示工具栏
			} else {
				$('#ui-designer-widget-handle').widgetHandle('display',
						[$('#widgetRemove')]);// 显示工具栏
			}
		},
		_widgetOut : function() {

		},
		_refresh : function(type) {
		}
	});
})(jQuery);
