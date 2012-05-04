/**
 * 百度联盟组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopBaidu", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopBaidu(this.element);
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
function initShopBaiduModuleConfig(func) {
	return PageBaiduConfig.initCommonBaiduConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopBaiduModuleConfig() {
	return PageBaiduConfig.validateCommonBaiduConfig();
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
function createShopBaiduModuleContent(name, title, region, next, func) {
	var params = PageBaiduConfig.createCommonBaiduParams();
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
function updateShopBaiduModuleContent(id, title, func) {
	var params = PageBaiduConfig.createCommonBaiduParams();
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}