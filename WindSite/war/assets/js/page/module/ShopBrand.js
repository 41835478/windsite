/**
 * 品牌库组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopBrand", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					bids : '',
					isHd : 'true'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopBrand(this.element);
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
function initShopBrandModuleConfig(func) {
	return PageBrandConfig.initCommonBrandConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopBrandModuleConfig() {
	return PageBrandConfig.validateCommonBrandConfig();
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
function createShopBrandModuleContent(name, title, region, next, func) {
	var params = PageBrandConfig.createCommonBrandParams();
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
function updateShopBrandModuleContent(id, title, func) {
	var params = PageBrandConfig.createCommonBrandParams();
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}