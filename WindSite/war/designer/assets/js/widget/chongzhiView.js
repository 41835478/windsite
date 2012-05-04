/**
 * 主题推广组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.chongzhiView", $.ui.designerWidget, {
		options : {
			autoSize : 'true'
		},
		_toSource : function() {
			var widget = this.element;// 当前组件
			var clone = $('.widget-chongzhiview', widget).clone();
			var _source = $('<div></div>').append(clone).html();
			return _source;
		},
		/**
		 * 移入组件事件(生成组件工具栏)
		 */
		widgetOver : function() {
			if (!isWidgetHandle) {
				return;
			}
			var bar = $('#ui-designer-widget-handle');
			this.element.prepend(bar);
			bar.width(this.element.width());
			$('#widgetSet').hide();
			$('#ui-designer-widget-handle').fadeIn();
			if (!isDragWidget) {
				$('#add-widget').fadeIn();
			} else {
				$('#add-widget').hide();
			}
		},
		/**
		 * 移出组件事件
		 */
		widgetOut : function() {

		},
		_initDesignerWidget : function() {
			var self = this;
			var widget = this.element;
			$('.ui-designer-widget-header', widget).remove();
			if ($('#main .widget-chongzhiview').length > 1) {
				alert('当前模板已经配置充值组件!');
				widget.remove();
				isRemoveAddA = false;
				return;
			}
			var component = $('.widget-chongzhiview', widget).show();
			var width = component.width();
			var type = "float";// 横向排版
			if (width < 230) {
				alert('当前布局宽度太小，充值组件无法放入当前布局');
				widget.remove();
				isRemoveAddA = false;
				return;
			} else if (width > 230 && width < 470) {
				type = "vertical";// 竖向排版
			}
			this.customeWidgetLoad(type);// 加载最新
		},
		/**
		 * 加载指定自定义组件(如果未指定，则加载默认第一个)
		 */
		customeWidgetLoad : function(type) {
			var self = this;
			var widget = this.element;
			var component = $('.widget-chongzhiview', widget).empty();
			component
					.prepend('<strong style="font-size:14px;">正在更新充值框最新内容...</strong>');
			$.ajax({
						url : '/router/member/designer/chongzhi?v='
								+ Math.random(),
						type : 'GET',
						data : {
							layout : type
						},
						dataType : 'html',
						contentType : "charset=utf-8",
						beforeSend : function(xhr) {
							xhr.setRequestHeader("WindType", "AJAX");// 请求方式
							xhr.setRequestHeader("WindDataType", "HTML");// 请求返回内容类型
						},
						error : function(request, textStatus, errorThrown) {
							component.empty();
							alert('充值组件加载失败,请重新刷新设计器');
						},
						success : function(data) {
							component.empty().append(data);
						}
					});
		},
		widgetSet : function() {

		},

		_createDesignerWidget : function() {
		},
		_refresh : function(type) {

		}

	});
})(jQuery);
