/**
 * 显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopCategoryVancl", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopCategoryVancl(this.element);
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
function initShopCategoryVanclModuleConfig(func) {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'cat' :
				return PageCategoryVanclConfig.initCommonCatConfig(func);
				break;
			case 'keyword' :
				return PagePageConfig.initCommonPageConfig(func);
				break;
			default :
				return PageCategoryVanclConfig.initCommonCatConfig(func);
		}
	} else {
		return PageCategoryVanclConfig.initCommonCatConfig(func);
	}

}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopCategoryVanclModuleConfig() {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'cat' :
				return PageCategoryVanclConfig.validateCommonCatConfig();
				break;
			case 'keyword' :
				return PagePageConfig.validateCommonPageConfig(func);
				break;
			default :
				return PageCategoryVanclConfig.validateCommonCatConfig();
		}

	} else {
		return PageCategoryVanclConfig.validateCommonCatConfig();
	}
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
function createShopCategoryVanclModuleContent(name, title, region, next, func) {
	var params = {};
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'cat' :
				params = PageCategoryVanclConfig.createCommonCatParams();
				break;
			case 'keyword' :
				params = PagePageConfig.createCommonPageParams();
				break;
			default :
				params = PageCategoryVanclConfig.createCommonCatParams();
		}
	} else {
		params = PageCategoryVanclConfig.createCommonCatParams();
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
function updateShopCategoryVanclModuleContent(id, title, func) {
	var params = {};
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'cat' :
				params = PageCategoryVanclConfig.createCommonCatParams();
				break;
			case 'keyword' :
				params = PagePageConfig.createCommonPageParams();
				break;
			default :
				params = PageCategoryVanclConfig.createCommonCatParams();
		}
	} else {
		params = PageCategoryVanclConfig.createCommonCatParams();
	}
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}