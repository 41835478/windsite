/**
 * 频道推广组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.channelView", $.ui.designerWidget, {
				options : {
					align : 'center',
					name : '综合频道',
					value : 'channelcode',
					pic : 'channelcode.png',
					height : 2432
				},
				widgetSet : function() {
					var self = this;
					var component = this.element;
					editingChannelEditor = component;
					$('#widget-channels-dialog').dialog('open');
				},
				/**
				 * 返回当前组件源码
				 */
				_toSource : function() {
					return '<div class="widget-channelview"></div>';
				},
				_initDesignerWidget : function() {
					var self = this;
					var widget = this.element;
					if ($('#alimamaifrm').length > 0) {
						alert('您只能配置一个频道推广组件!');
						widget.remove();
						isRemoveAddA = false;
						return;
					}
					var component = widget.find(".widget-channelview");
					$('.ui-designer-widget-header', widget).remove();
					WidgetUtils.channelView_init(component);
				},
				_createDesignerWidget : function() {
				},
				_widgetOver : function() {
					if (this.element.width() < 900) {
						$('#ui-designer-widget-handle').widgetHandle('display',
								[$('#widgetRemove')]);// 显示工具栏
					} else {
						$('#ui-designer-widget-handle').widgetHandle('display',
								[$('#widgetRemove'), $('#channelsSelect')]);// 显示工具栏
					}
				},
				_widgetOut : function() {

				},
				_refresh : function(type) {
				}
			});
})(jQuery);
