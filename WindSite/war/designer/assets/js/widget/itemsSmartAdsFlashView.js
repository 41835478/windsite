/**
 * 阿里妈妈智能广告牌
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsSmartAdsFlashView", $.ui.designerWidget, {
		options : {
			resizable : 'true',
			align : 'center',
			count : 20,// 显示数量
			fcatid : '',// 总类目(还原时使用)
			scatid : '',// 二级类目(还原时使用)
			catid : 0,// 类目ID
			h_h : '',// 高度
			h_w : '',// 宽度
			sz : 9999,
			type : 1,// 智能广告类型,1为类目下智能,2为主题智能
			st_tc : '3366CC',// 标题颜色
			st_bgc : 'FFFFFF',// 背景颜色
			st_bdc : 'CCCCCC',// 边框颜色
			st_pc : '434343',// 价格颜色
			st_lg : 0,// logo显示类型,0为竖排,1为横排,2为去除LOGO
			st_pb : 0
			// 排列方式,0为左右排版,1为上下排版
		},
		/**
		 * 返回当前组件源码
		 */
		_toSource : function() {
			return '<div class="widget-itemssmartadsflashview-items"></div>';
		},
		_initDesignerWidget : function() {
			var self = this;
			var widget = this.element;
			var component = widget.find(".widget-itemssmartadsflashview-items");
			$('.ui-designer-widget-header', widget).remove();
			WidgetUtils.itemsSmartAdsFlashView_init(component);
		},
		widgetSet : function() {
			var self = this;
			var widget = this.element;
			var component = widget.find(".widget-itemssmartadsflashview-items");
			if (widget.find('.loading').length > 0) {
				alert('尚未加载完成！');
				return;
			}
			// 存储前一个智能广告组件
			// if (editingSmartAdsFlash && editingSmartAdsFlash != null
			// && editingSmartAdsFlash != component) {
			// $('#smartAdsFlashEditor').smartAdsFlashEditor('storeEditor',
			// editingSmartAdsFlash.parent());
			// }
			var left = component.offset().left;
			var top = component.offset().top - $(window).scrollTop()
					+ component.height();
			var position = "center";
			if (left > 0 && top > 0) {
				position = [left, top];
			}
			// 还原
			$('#smartAdsFlashEditor').smartAdsFlashEditor('restoreEditor',
					self.options);
			$('#smartAdsFlashEditor').dialog('option', 'position', position)
					.dialog('open');
			editingSmartAdsFlash = component;
		},
		_createDesignerWidget : function() {
		},
		_widgetOver : function() {
			$('#ui-designer-widget-handle').widgetHandle('display',
					[$('#widgetRemove')]);// 显示工具栏
		},
		_widgetOut : function() {

		},
		_refresh : function(type) {
			if (type == 'init') {// 如果是拖拽组件初始化后事件直接返回
				return;
			}
			var widget = this.element;
			WidgetUtils.itemsSmartAdsFlashView_init(widget
					.find(".widget-itemssmartadsflashview-items"));
		}
	});
})(jQuery);
