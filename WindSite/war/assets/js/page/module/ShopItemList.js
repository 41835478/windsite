/**
 * 商品列表排行
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopItemList", $.ui.pageModule, {
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
function initShopItemListModuleConfig(func) {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'item' :
				return PageItemConfig.initCommonItemConfig(func);
				break;
			case 'shop' :
				return PageShopConfig.initCommonShopConfig(func);
				break;
			case 'poster' :
				return PagePosterConfig.initCommonPosterConfig(func);
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
function validateShopItemListModuleConfig() {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'item' :
				return PageItemConfig.validateCommonItemConfig();
				break;
			case 'shop' :
				return PageShopConfig.validateCommonShopConfig();
				break;
			case 'poster' :
				return PagePosterConfig.validateCommonPosterConfig(func);
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
function createShopItemListModuleContent(name, title, region, next, func) {
	var params = {};
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'item' :
				params = PageItemConfig.createCommonItemParams();
				break;
			case 'shop' :
				params = PageShopConfig.createCommonShopParams();
				break;
			case 'poster' :
				params = PagePosterConfig.createCommonPosterParams();
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
function updateShopItemListModuleContent(id, title, func) {
	var params = {};
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'item' :
				params = PageItemConfig.createCommonItemParams();
				break;
			case 'shop' :
				params = PageShopConfig.createCommonShopParams();
				break;
			case 'poster' :
				params = PagePosterConfig.createCommonPosterParams();
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