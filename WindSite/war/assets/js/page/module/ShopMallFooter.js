/**
 * 商城底部分类品牌
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopMallFooter", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopMallFooter(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopMallFooterModuleConfig(func) {
	return PageFtlConfig.initCommonFtlConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopMallFooterModuleConfig() {
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
function createShopMallFooterModuleContent(name, title, region, next, func) {
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
function updateShopMallFooterModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, PageFtlConfig.createCommonFtlParams(),
			function(data) {
				if (func) {
					func(data);
				}
			});
}