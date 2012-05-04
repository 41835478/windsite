/**
 * 分类模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopShiYi", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopShiYiModuleConfig(func) {
	if (func) {
		func();
	}
	return true;
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopShiYiModuleConfig() {
	return true;
}
/**
 * 新增模块
 * 
 * @param {}
 *            name
 * @param {}
 *            title
 * @param {}
 *            region
 * @param {}
 *            next
 * @param {}
 *            func
 */
function createShopShiYiModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + "")
			}, function(data) {
				if (func) {
					func(data);
				}
			});

}
/**
 * 更新模块
 * 
 * @param {}
 *            id
 * @param {}
 *            title
 * @param {}
 *            func
 */
function updateShopShiYiModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
				isHd : $('#module-ishd').attr('checked') + ""
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}