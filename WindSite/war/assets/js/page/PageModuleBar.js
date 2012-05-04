(function($) {
	$.widget("ui.pageModuleBar", {
		/**
		 * 参数
		 */
		options : {},
		_create : function() {
		},
		/**
		 * Page-Module-Bar初始化
		 */
		_init : function() {
			var self = this;
			$('#module-bar-edit').click(function() {
				var module = $('#module-bar').parent();

				if (module.hasClass('J_TBox')) {// 如果是模块
					MODULE = module;
					module['page'
							+ PageModuleUtils
									.getModuleName(module.attr('name'))]('moduleEdit');

				} else {
					alert('当前元素不是模块');
				}
			});
			$('#module-bar-del').click(function() {
				var module = $('#module-bar').parent();
				if (module.hasClass('J_TBox')) {
					if (confirm('您确定要删除当前模块吗?')) {
						$('body').append($('#module-bar').hide());// 隐藏工具条，并追加至BODY
						module['page'
								+ PageModuleUtils.getModuleName(module
										.attr('name'))]('autoSave', 'delete',
								function() {
									PageUtils.showMsg('模块删除成功');
								});
					}
				}
			});
			$('#module-bar-up').click(function() {
				if ($(this).hasClass('no-move-up')) {
					return false;
				}
				var module = $('#module-bar').parent();// 当前模块
				if (module.hasClass('J_TBox')) {
					var prevModule = module.prevAll('.J_TBox:first');
					if (prevModule.length == 0) {// 如果前边没有
						// module.parent().append(module);//
						// 追加至最后（暂时不循环移动）
					} else {
						prevModule.before(module);// 向前移动一位
						module['page'
								+ PageModuleUtils.getModuleName(module
										.attr('name'))]('autoSave', 'sort',
								function() {
									PageUtils.showMsg('模块排序成功');
								}, prevModule.attr('data-id'));
					}

				}
			});
			$('#module-bar-down').click(function() {
				if ($(this).hasClass('no-move-down')) {
					return false;
				}
				var module = $('#module-bar').parent();// 当前组件
				if (module.hasClass('J_TBox')) {
					var nextModule = module.nextAll('.J_TBox:first');
					if (nextModule.length == 0) {// 如果后边没有
						// module.parent().prepend(module);//
						// 追加至最前（暂时不循环移动）
					} else {
						nextModule.after(module);// 向前移动一位
						module['page'
								+ PageModuleUtils.getModuleName(module
										.attr('name'))]('autoSave', 'sort',
								function() {
									PageUtils.showMsg('模块排序成功');
								}, nextModule.attr('data-id'));
					}

				}
			});
		}
	});

})(jQuery);
