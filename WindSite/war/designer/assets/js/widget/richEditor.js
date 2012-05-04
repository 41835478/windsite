/**
 * html编辑器
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.richEditor", $.ui.designerWidget, {
				options : {
					resizable : 'true'
				},
				/**
				 * 返回当前组件源码
				 */
				_toSource : function() {
					var widget = this.element;// 当前组件
					var component = $('.widget-richeditor', widget);
					var _source = $('<div></div>').append(component.clone()
							.attr('title', '')).html();
					return _source;
				},
				_initDesignerWidget : function() {
					var widget = this.element;
					var component = widget.find("div.widget-richeditor");
					component.show();
					$('.ui-designer-widget-header', widget).remove();
				},
				widgetSet : function() {
					var widget = this.element;
					var component = widget.find("div.widget-richeditor");
					editing = component;
					$('#richEditorTextAreaDialog').dialog('open');
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

				}
			});
})(jQuery);
