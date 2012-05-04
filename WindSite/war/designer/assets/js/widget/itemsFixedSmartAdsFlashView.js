/**
 * 阿里妈妈固定尺寸智能广告牌
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.itemsFixedSmartAdsFlashView", $.ui.designerWidget, {
		options : {
			align : 'center',
			count : 20,// 显示数量
			catid : '',// 类目ID
			fcatid : '',// 总类目
			scatid : '',// 子类目
			height : '0',// 高度
			width : '0',// 宽度
			sz : '',// 尺寸类型
			type : '1'
			// 智能广告类型,1为类目下智能,2为主题智能
		},
		/**
		 * 返回当前组件源码
		 */
		_toSource : function() {
			return '<div class="widget-itemsfixedsmartadsflashview-items"></div>';
		},
		_initDesignerWidget : function() {
			var self = this;
			var widget = this.element;
			var component = widget
					.find(".widget-itemsfixedsmartadsflashview-items");
			$('.ui-designer-widget-header', widget).remove();
			WidgetUtils.itemsFixedSmartAdsFlashView_init(component);
		},
		widgetSet : function() {
			var self = this;
			var widget = this.element;
			var component = widget
					.find(".widget-itemsfixedsmartadsflashview-items");
			if (widget.find('.loading').length > 0) {
				alert('尚未加载完成！');
				return;
			}

			var left = component.offset().left;
			var top = component.offset().top - $(window).scrollTop()
					+ component.height();
			var position = "center";
			if (left > 0 && top > 0) {
				position = [left, top];
			}
			// 还原
			$('#fixedSmartAdsFlashEditor').fixedSmartAdsFlashEditor(
					'restoreEditor', self.options, widget.width());
			$('#fixedSmartAdsFlashEditor').dialog('option', 'position',
					position).dialog('open');
			editingFixedSmartAdsFlash = component;
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
			// if (type == 'init' || type == 'refresh') {//
			// 如果是拖拽组件初始化后事件直接返回
			// return;
			// }
			// var widget = this.element;
			// WidgetUtils.itemsFixedSmartAdsFlashView_init(widget
			// .find(".widget-itemsfixedsmartadsflashview-items"));
		}
	});
})(jQuery);
