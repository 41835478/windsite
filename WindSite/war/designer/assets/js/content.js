/**
 * 内容区
 */
(function($) {
	$.widget("ui.designerContent", {
		/**
		 * 参数
		 */
		options : {},
		/**
		 * 返回当前组件源码
		 */
		toSource : function(isValidate) {
			// var height = this.element.attr('cHeight');
			// height = height ? height : this.element.height();
			var _content = '<div class="ui-designer-content">';// 容器
			$('.ui-designer-container', this.element).each(function() {
						_content += $(this).designerContainer('toSource',
								isValidate);// containers,widgets
					});
			_content += "</div>";
			return _content;
		},
		/**
		 * 创建容器
		 */
		_create : function() {
		},
		/**
		 * 容器初始化
		 */
		_init : function() {
			var self = this;
			var content = this.element;
			//content.css('overflow', 'hidden');// 内容修剪
			var cid = content.attr('id');
			if (!cid) {
				content
						.attr('id', 'c_'
										+ parseInt((Math.random()) * 100000000));
			}
			if (content.find('.ui-designer-container').length > 1) {
				if ($.browser.msie && $.browser.version == '6.0') {
					content.find('.ui-designer-container:last').css(
							'margin-right', 0).siblings()
							.css('margin-right', 2);
				} else {
					content.find('.ui-designer-container:last').css(
							'margin-right', 0).siblings()
							.css('margin-right', 5);
				}
			}
			$('.ui-designer-container', content).designerContainer();// 容器
		},
		/**
		 * 切换模式
		 */
		changeDesigner : function() {
			var content = this.element;
			if (!isWidgetHandle) {// 如果不是组件设计则启动编辑模式
				content.css('border', '2px inset #348feb');
				$('.ui-designer-content-handle', content).show();
				$('.layoutsContentSelect', content).val(content.attr('layout'));
			} else {// 如果是组件设计则隐藏编辑模式
				content.css('border', '');
				$('.ui-designer-content-handle', content).hide();
			}
		},
		/**
		 * 隐藏所有容器
		 */
		hideContainer : function() {
			this.element.attr('cHeight', this.element.height()).height(33)
					.resizable('disable');
			$('.ui-designer-container', this.element).each(function() {
						$(this).attr('cHeight', $(this).height()).height(0);
					});
			$('.contentHide', this.element).button('option', 'label', '显示此容器');
		},
		/**
		 * 显示所有容器
		 */
		showContainer : function() {
			this.element.height(parseInt(this.element.attr('cHeight')))
					.resizable('enable');
			$('.ui-designer-container', this.element).each(function() {
						$(this).height(parseInt($(this).attr('cHeight')));
					})
			$('.contentHide', this.element)
					.button('option', 'label', '暂时隐藏此容器');
		}
	});
})(jQuery);
