/**
 * 双列显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopDianPu", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认显示标题栏
				},
				_initModule : function() {
					// PageModuleUtils.initShopDianPu(this.element);
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
function initShopDianPuModuleConfig(func) {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'dianpu' :
				return PageDianPuConfig.initCommonDianPuConfig(func);
				break;
			case 'item' :
				return PageItemConfig.initCommonItemConfig(func);
				break;
			case 'shop' :
				return PageShopConfig.initCommonShopConfig(func);
				break;
			case 'poster' :
				return PagePosterConfig.initCommonPosterConfig(func);
				break;
			case 'mall' :
				return PageB2CMallConfig.initCommonB2CMallConfig(func);
				break;
			default :
				return PageItemConfig.initCommonItemConfig(func);
		}
	} else {
		return PageItemConfig.initCommonItemConfig(func);
	}

}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopDianPuModuleConfig() {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'dianpu' :
				return PageDianPuConfig.validateCommonDianPuConfig(func);
				break;
			case 'item' :
				return PageItemConfig.validateCommonItemConfig();
				break;
			case 'shop' :
				return PageShopConfig.validateCommonShopConfig();
				break;
			case 'poster' :
				return PagePosterConfig.validateCommonPosterConfig(func);
				break;
			case 'mall' :
				return PageB2CMallConfig.validateCommonB2CMallConfig(func);
				break;
			default :
				return PageItemConfig.validateCommonItemConfig();
		}

	} else {
		return PageItemConfig.validateCommonItemConfig();
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
function createShopDianPuModuleContent(name, title, region, next, func) {
	var params = {};
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'dianpu' :
				params = PageDianPuConfig.createCommonDianPuParams();
				break;
			case 'item' :
				params = PageItemConfig.createCommonItemParams();
				break;
			case 'shop' :
				params = PageShopConfig.createCommonShopParams();
				break;
			case 'poster' :
				params = PagePosterConfig.createCommonPosterParams();
				break;
			case 'mall' :
				params = PageB2CMallConfig.createCommonB2CMallParams();
				break;
			default :
				params = PageItemConfig.createCommonItemParams();
		}
	} else {
		params = PageItemConfig.createCommonItemParams();
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
function updateShopDianPuModuleContent(id, title, func) {
	var params = {};
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'dianpu' :
				params = PageDianPuConfig.createCommonDianPuParams();
				break;
			case 'item' :
				params = PageItemConfig.createCommonItemParams();
				break;
			case 'shop' :
				params = PageShopConfig.createCommonShopParams();
				break;
			case 'poster' :
				params = PagePosterConfig.createCommonPosterParams();
				break;
			case 'mall' :
				params = PageB2CMallConfig.createCommonB2CMallParams();
				break;
			default :
				params = PageItemConfig.createCommonItemParams();
		}
	} else {
		params = PageItemConfig.createCommonItemParams();
	}
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}