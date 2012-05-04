/**
 * 双列显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopDianPuCat", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopDianPuCat(this.element);
				},
				/**
				 * 返回当前模块源码
				 */
				toSource : function(isValidate) {

				}

			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopDianPuCatModuleConfig(func) {
	return PageDianPuCatConfig.initCommonDianPuCatConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopDianPuCatModuleConfig() {
	return PageDianPuCatConfig.validateCommonDianPuCatConfig();
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
function createShopDianPuCatModuleContent(name, title, region, next, func) {
	var params = PageDianPuCatConfig.createCommonDianPuCatParams();
	PageUtils.addModule(name, title, region, next, params, function(data) {
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
function updateShopDianPuCatModuleContent(id, title, func) {
	var params = PageDianPuCatConfig.createCommonDianPuCatParams();
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}