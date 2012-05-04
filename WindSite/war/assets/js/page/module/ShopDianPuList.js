/**
 * 双列显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopDianPuList", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopDianPuList(this.element);
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
function initShopDianPuListModuleConfig(func) {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'mall' :
				return PageB2CMallListConfig.initCommonB2CMallListConfig(func);
				break;
			default :
				return PageDianPuListConfig.initCommonDianPuListConfig(func);
		}
	}
	return PageDianPuListConfig.initCommonDianPuListConfig(func);
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopDianPuListModuleConfig() {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'mall' :
				return PageB2CMallListConfig
						.validateCommonB2CMallListConfig(func);
				break;
			default :
				return PageDianPuListConfig
						.validateCommonDianPuListConfig(func);
		}
	}
	return PageDianPuListConfig.validateCommonDianPuListConfig();
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
function createShopDianPuListModuleContent(name, title, region, next, func) {
	var params = null;
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'mall' :
				params = PageB2CMallListConfig.createCommonB2CMallListParams();
				break;
			default :
				params = PageDianPuListConfig.createCommonDianPuListParams();
		}
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
function updateShopDianPuListModuleContent(id, title, func) {
	var params = null;
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'mall' :
				params = PageB2CMallListConfig.createCommonB2CMallListParams();
				break;
			default :
				params = PageDianPuListConfig.createCommonDianPuListParams();
		}
	}
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}