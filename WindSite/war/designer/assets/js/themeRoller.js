(function($) {
	$.widget("ui.themeRoller", {
				/**
				 * 参数
				 */
				options : {},
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
					var themeRoller = self.element;// 皮肤设计器
					themeRoller.hide();
					$('#confirmTheme').button().click(function() {
						if (confirm('确认使用当前皮肤设计')) {
							var selected = $('#sysThemes li[class="ui-selected"]');
							if (selected.length == 0) {
								alert('尚未选择主题皮肤');
								return;
							}
							var li = selected;
							self.changeSysTheme(li.attr('systheme'), li
											.attr('navtheme'));
							$('#ui-designer-topbar').tabs({
										selected : -1
									});
							$('body').data('skin',
									li.attr('systheme').split('-')[1]);// 存储皮肤
						}
					});
					$('#previewTempButton').button().click(function() {
						var selected = $('#sysThemes li[class="ui-selected"]');
						if (selected.length == 0) {
							alert('尚未选择主题皮肤');
							return;
						}
						var li = selected;
						self.changeSysTheme(li.attr('systheme'), li
										.attr('navtheme'));
						$('body').data('skin',
								li.attr('systheme').split('-')[1]);// 存储皮肤
						$('#ui-designer-topbar')
								.designerTopBar('preview', true);
					});
					$('#sysThemes li').click(function() {
						$(this).toggleClass("ui-selected").siblings()
								.removeClass("ui-selected");
						$('#previewTempButton').button('option', 'label',
								'预览【' + $(this).attr('title') + '】主题');
					}).hover(function() {
						$(this).toggleClass("ui-selecting").siblings()
								.removeClass("ui-selecting");
					}, function() {
						$(this).removeClass("ui-selecting");
					});
					themeRoller.show();
				},
				/**
				 * 系统主题切换
				 */
				changeSysTheme : function(sysTheme, navTheme) {
					$('link[title="siteStyle"]').attr(
							'href',
							'/assets/min/css/' + sysTheme.split('-')[1]
									+ '.css?v=' + Math.random());
				}
			});
})(jQuery);
