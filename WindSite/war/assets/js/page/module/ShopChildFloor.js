/**
 * 显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopChildFloor", $.ui.pageModule, {
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
					// PageModuleUtils.initShopChildFloor(this.element);
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
function initShopChildFloorModuleConfig(func) {
	return PageItemConfig.initCommonItemConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopChildFloorModuleConfig() {
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
function createShopChildFloorModuleContent(name, title, region, next, func) {
	var params = PageItemConfig.createCommonItemParams();
	var layout = $('#page-module-editor').pageModuleEditor('option', 'layout');
	if ('3' == layout) {
		params.itemnum = '8';// 显示数量
	} else if ('4' == layout) {
		params.itemnum = '12';// 显示数量
	}
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
function updateShopChildFloorModuleContent(id, title, func) {
	var params = PageItemConfig.createCommonItemParams();
	var layout = $('#page-module-editor').pageModuleEditor('option', 'layout');
	if ('3' == layout) {
		params.itemnum = '8';// 显示数量
	} else if ('4' == layout) {
		params.itemnum = '12';// 显示数量
	}
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}