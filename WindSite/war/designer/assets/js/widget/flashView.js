/**
 * html编辑器
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.flashView", $.ui.designerWidget, {
				options : {},
				/**
				 * 返回当前组件源码
				 */
				_toSource : function() {
					var widget = this.element;// 当前组件
					var _source = '<div class="widget-flashview" src="'
							+ $('.widget-flashview', widget).attr('src')
							+ '"></div>';
					return _source;
				},
				_initDesignerWidget : function() {
					var widget = this.element;
					var component = widget.find(".widget-flashview");
					WidgetUtils.flashView_init(component);
					$('.ui-designer-widget-header', widget).remove();
				},
				widgetSet : function() {
					var widget = this.element;
					var component = widget.find(".widget-flashview")
					if (editingAlimamaFlashBM && editingAlimamaFlashBM != null
							&& editingAlimamaFlashBM != component) {
						var oldSrc = editingAlimamaFlashBM.attr('src');
						var newSrc = $('#alimamaBM').val();
						if (oldSrc != newSrc) {
							editingAlimamaFlashBM.attr('src', newSrc);
							WidgetUtils.flashView_init(editingAlimamaFlashBM);
						}
					}
					if (component.attr('src')) {
						$('#alimamaBM').val(component.attr('src'));
					} else {
						$('#alimamaBM').val('');
					}
					$('#alimamaBMDialog').dialog('open');
					editingAlimamaFlashBM = component;
				},
				_createDesignerWidget : function() {
				},
				_widgetOver : function() {
					$('#ui-designer-widget-handle').widgetHandle('display',
							[$('#widgetSet'), $('#widgetRemove')]);// 显示工具栏
				},
				_widgetOut : function() {

				},
				_refresh : function(type) {
					var self = this;
					var widget = self.element;
					var o = this.options;
					WidgetUtils
							.flashView_init(widget.find(".widget-flashview"));
				}
			});
})(jQuery);
