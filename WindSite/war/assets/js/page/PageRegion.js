(function($) {
	$.widget("ui.pageRegion", {
		/**
		 * 参数
		 */
		options : {
			layout : '0'
		},
		_create : function() {
		},
		/**
		 * Page-Bd初始化
		 */
		_init : function() {
			var self = this;
			var region = self.element;// 区域
			self.options.layout = self.getLayout(region);// 设置当前区域的布局参数
			var isEdit = region.attr('data-edit');
			if ('false' == isEdit) {
				// TODO
			} else {
				// 初始化添加模块按钮
				if (typeof(ISLAYOUT) == 'undefined') {
					var addmodbar = $('.addmodbar', region);
					if (addmodbar.length == 0) {// 目前只允许内容区添加模块
						addmodbar = $('<div class="addmodbar"><i></i>在此处添加新模块</div>');
						region.append(addmodbar);
					}
					if (addmodbar.length == 1) {
						addmodbar.unbind('click').click(function() {
									MODULE = region;
									$('#page-module-editor').dialog('open');
								});
					}
				}
			}
			// TODO 屏蔽掉容器内模块拖拽
			// 此处需修订jquery-ui-sortable的源码。将创建placeholder提前至创建helper之前。保证鼠标移动时，当前区域已被填充，不会改变当前页面高度，造成页面临时变化影响操作
			// if ($.contains($('#bd')[0], region[0])) {// 目前仅内容区模块支持拖拽
			// region.sortable({
			// iframeFix : true,
			// revert : true,
			// handle : ".module-bar-bd",
			// placeholder : 'ui-state-highlight',
			// forcePlaceholderSize : true,
			// // 暂时屏蔽掉多容器间拖拽connectWith :
			// // ['.ui-designer-container'],
			// start : function() {
			// },
			// receive : function(event, ui) {
			// // 容器间拖拽判断是否可放入当前容器
			// },
			// stop : function() {
			// },
			// over : function(event, ui) {
			// },
			// start : function(event, ui) {
			// },
			// update : function(event, ui) {
			// }
			// }).disableSelection();
			// }
			$('.J_TBox', region).each(function() {// 初始化布局内模块
						var module = $(this).attr('name');
						if (module)
							$(this)['page'
									+ PageModuleUtils.getModuleName(module)]();
					});

		},
		getLayout : function(region) {
			if (region.parents('.layout:first').hasClass('grid-s310m0e310')) {// 如果是三栏相同的
				return '5';
			}
			if (region.hasClass('col-extra')) {// 如果是extra，则必定是190
				return '1';
			} else {
				var extra = region.parents('.layout:first').find('.col-extra');
				if (extra.length == 0) {// 如果没有extra则是两栏布局
					var sub = region.parents('.layout:first').find('.col-sub');
					if (sub.length == 0) {// 如果没有sub则是950
						return '4';
					} else {
						if (region.hasClass('main-wrap')) {// 如果是主内容区，则是750
							return '3';
						} else {// 否则是190
							return '1';
						}
					}
				} else {// 如果有extra则是三栏布局
					if (region.hasClass('main-wrap')) {// 如果是主内容区，则是550
						return '2';
					} else {// 否则是190
						return '1';
					}
				}
			}
		},
		toSource : function(isValidate, isTemp) {
			var self = this;
		}
	});

})(jQuery);
