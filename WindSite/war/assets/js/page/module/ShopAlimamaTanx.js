/**
 * 淘宝联盟组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopAlimamaTanx", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopAlimamaTanx(this.element);
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
function initShopAlimamaTanxModuleConfig(func) {
	return PageAlimamaTanxConfig.initCommonAlimamaTanxConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopAlimamaTanxModuleConfig() {
	return PageAlimamaTanxConfig.validateCommonAlimamaTanxConfig();
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
function createShopAlimamaTanxModuleContent(name, title, region, next, func) {
	var params = PageAlimamaTanxConfig.createCommonAlimamaTanxParams();
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
function updateShopAlimamaTanxModuleContent(id, title, func) {
	var params = PageAlimamaTanxConfig.createCommonAlimamaTanxParams();
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}