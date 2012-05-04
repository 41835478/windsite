(function($) {
	$.widget("ui.designerFooter", {
				/**
				 * 参数
				 */
				options : {},
				/**
				 * 返回最终源码
				 */
				toSource : function() {
					var _footer = this.element.clone();
					_footer.css('border-style', 'none');// 修改边框样式
					return $('<div></div>').append(_footer).html();
				},
				/**
				 * 移入事件
				 */
				_footerOver : function(footer) {

				},
				/**
				 * 移出事件
				 */
				_footerOut : function(footer) {

				},
				/**
				 * 创建组件
				 */
				_create : function() {

				},
				/**
				 * 组件初始化
				 */
				_init : function() {
					var self = this;
					o = self.options;
					var footer = self.element;// 组件
					footer.load('/designer/assets/toolbar/footer.html');
					// footer.css("border-style", "solid")
					// 注册移入移出事件
					footer.hover(function(event) {// over
								self._footerOver($(this));
							}, function(event) {// out
								self._footerOut($(this));
							});
				}
			});
})(jQuery);
