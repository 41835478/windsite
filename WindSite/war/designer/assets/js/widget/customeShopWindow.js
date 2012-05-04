/**
 * 主题推广组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.customeShopWindow", $.ui.widgetCustomer, {
				options : {
					template : 'customeShopWindow1_lady'
				},
				_initCustomeWidget : function() {
					var widget = this.element;
					$('.widget-customer', widget).load(
							'/zone/widgets/' + this.options.template
									+ '.html?v=' + Math.random(), function() {
								widget.customeShopWindow('customeWidgetBuild');
							});
				},
				_widgetOver : function() {
					$('#ui-designer-widget-handle').widgetHandle(
							'display',
							[$('#widgetSet'), $('#widgetRemove'),
									$('#customeShopWindowSelect')]);// 显示工具栏

				},
				_widgetOut : function() {
				}
			});
})(jQuery);
