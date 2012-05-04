/**
 * 综合类组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopComplexB", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					gid : '',// 推广组标识
					cat : '0',// 默认分类类目
					isHd : 'true'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopComplexB(this.element);
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
function initShopComplexBModuleConfig(func) {
	return PagePosterConfig.initCommonPosterConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopComplexBModuleConfig() {
	return PagePosterConfig.validateCommonPosterConfig(func);
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
function createShopComplexBModuleContent(name, title, region, next, func) {
	var params = {};
	params = PagePosterConfig.createCommonPosterParams();
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
function updateShopComplexBModuleContent(id, title, func) {
	var params = {};
	params = PagePosterConfig.createCommonPosterParams();
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}