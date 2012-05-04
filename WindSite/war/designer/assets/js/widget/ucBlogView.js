/**
 * UCHome日志显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.ucBlogView", $.ui.designerWidget, {
				options : {
					autoSize : 'true'
				},
				_toSource : function() {
					var widget = this.element;// 当前组件
					var clone = $('.widget-ucblog', widget).clone();
					var _source = $('<div></div>').append(clone).html();
					return _source;
				},
				_initDesignerWidget : function() {
					this.element.find(".widget-ucblog").show();
				},
				widgetSet : function() {
					var self = this;
					var component = this.element.find(".widget-ucblog");
					editingUCBlog = component;
					$('#ucBlogEditor').dialog('open');
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

				}

			});
})(jQuery);
