/**
 * 商城底部分类品牌
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopChildCategory", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopChildCategory(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopChildCategoryModuleConfig(func) {
	return PageFtlConfig.initCommonFtlConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopChildCategoryModuleConfig() {
	return PageFtlConfig.validateCommonFtlConfig();
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
function createShopChildCategoryModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, PageFtlConfig
					.createCommonFtlParams(), function(data) {
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
function updateShopChildCategoryModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, PageFtlConfig.createCommonFtlParams(),
			function(data) {
				if (func) {
					func(data);
				}
			});
}