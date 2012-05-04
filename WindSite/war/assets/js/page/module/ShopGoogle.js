/**
 * 综合类组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopGoogle", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopGoogle(this.element);
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
function initShopGoogleModuleConfig(func) {
	return PageGoogleConfig.initCommonGoogleConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopGoogleModuleConfig() {
	return PageGoogleConfig.validateCommonGoogleConfig();
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
function createShopGoogleModuleContent(name, title, region, next, func) {
	var params = PageGoogleConfig.createCommonGoogleParams();
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
function updateShopGoogleModuleContent(id, title, func) {
	var params = PageGoogleConfig.createCommonGoogleParams();
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}