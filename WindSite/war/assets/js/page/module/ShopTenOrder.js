/**
 * 十大排行模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopTenOrder", $.ui.pageModule, {
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
					// PageModuleUtils.initShopDisplay(this.element);
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
function initShopTenOrderModuleConfig(func) {
	return PageItemConfig.initCommonItemConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopTenOrderModuleConfig() {
	return PageItemConfig.validateCommonItemConfig();
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
function createShopTenOrderModuleContent(name, title, region, next, func) {
	var params = {};
	params = PageItemConfig.createCommonItemParams();
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
function updateShopTenOrderModuleContent(id, title, func) {
	var params = {};
	params = PageItemConfig.createCommonItemParams();
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}