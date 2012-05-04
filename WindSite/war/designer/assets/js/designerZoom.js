/**
 * 扫视缩放组件
 */
(function($) {
	$.widget("ui.designerZoom", {
				/**
				 * 参数
				 */
				options : {},

				/**
				 * 创建扫视区
				 */
				_create : function() {
				},
				/**
				 * 初始化
				 */
				_init : function() {
					var self = this;
					var zoom = this.element;
					var dHeight = $(document).height();
					var mHeight = $('#main').height();
					$('#main .ui-designer-content').each(function() {
						$('#designerZoomContents')
								.append('<div class="zoom-content" style="height:'
										+ ($(this).height() / mHeight)
										* 100
										+ '%;"></div>');
					});
					$('.designerZoom-header', zoom).button().click(function() {
								$('html,body').animate({
											scrollTop : 0
										}, 500);

							});
					$('.designerZoom-footer', zoom).button().click(function() {
						$('html,body').animate({
									scrollTop : mHeight - $('body').height()
											+ 1000
								}, 500);

					});
					$('#designerZoomContents .designerZoom-handle').draggable({
						containment : 'parent',
						cursor : 'move',
						stop : function(event, ui) {
							var top = $(this).position().top;
							var targetTop = (top + 10) * mHeight / 160;
							if (top == 0) {
								targetTop = 0;
							} else if (top > 130) {
								targetTop = targetTop + 1000;
							}
							var targetOffset = targetTop
									- $('#ui-designer-topbar').height() - 10;
							$('html,body').animate({
										scrollTop : targetOffset
									}, 500);
						}
					});
				}

			});
})(jQuery);
