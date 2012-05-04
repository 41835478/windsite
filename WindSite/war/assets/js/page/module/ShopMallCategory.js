/**
 * 商城左侧浮动分类
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopMallCategory", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopMallCategory(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopMallCategoryModuleConfig(func) {
	return PageFtlConfig.initCommonFtlConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopMallCategoryModuleConfig() {
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
function createShopMallCategoryModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, PageFtlConfig
					.createCommonFtlParams(), function(data) {
				if (func) {
					$('.J_PopSubCategory').remove();
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
function updateShopMallCategoryModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, PageFtlConfig.createCommonFtlParams(),
			function(data) {
				$('.J_PopSubCategory').remove();
				if (func) {
					func(data);
				}
			});
}