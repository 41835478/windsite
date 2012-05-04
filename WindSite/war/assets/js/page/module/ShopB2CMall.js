/**
 * 显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopB2CMall", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopB2cMall(this.element);
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
function initShopB2CMallModuleConfig(func) {
	return PageB2CMallConfig.initCommonB2CMallConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopB2CMallModuleConfig() {
	return PageB2CMallConfig.validateCommonB2CMallConfig();
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
function createShopB2CMallModuleContent(name, title, region, next, func) {
	var params = PageB2CMallConfig.createCommonB2CMallParams();
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
function updateShopB2CMallModuleContent(id, title, func) {
	var params = PageB2CMallConfig.createCommonB2CMallParams();
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}