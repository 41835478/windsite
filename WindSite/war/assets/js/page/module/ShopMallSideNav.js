/**
 * 返利商城左侧浮动分类
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopMallSideNav", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopMallSideNav(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopMallSideNavModuleConfig(func) {
	return PageFtlConfig.initCommonFtlConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopMallSideNavModuleConfig() {
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
function createShopMallSideNavModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, PageFtlConfig
					.createCommonFtlParams(), function(data) {
				if (func) {
					$('.J_MallPopSubCategory').remove();
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
function updateShopMallSideNavModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, PageFtlConfig.createCommonFtlParams(),
			function(data) {
				$('.J_MallPopSubCategory').remove();
				if (func) {
					func(data);
				}
			});
}