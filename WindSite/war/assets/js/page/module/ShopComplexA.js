/**
 * 综合类组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopComplexA", $.ui.pageModule, {
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
					// PageModuleUtils.initShopComplexA(this.element);
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
function initShopComplexAModuleConfig(func) {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'poster' :
				return PagePosterConfig.initCommonPosterConfig(func);
				break;
			default :
				return PageComplexAConfig.initCommonComplexAConfig(func);
		}
	} else {
		return PageComplexAConfig.initCommonComplexAConfig(func);
	}
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopComplexAModuleConfig() {
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'poster' :
				return PagePosterConfig.validateCommonPosterConfig(func);
				break;
			default :
				return PageComplexAConfig.validateCommonComplexAConfig();
		}
	} else {
		return PageComplexAConfig.validateCommonComplexAConfig();
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
function createShopComplexAModuleContent(name, title, region, next, func) {
	var params = {};
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'poster' :
				params = PagePosterConfig.createCommonPosterParams();
				break;
			default :
				params = PageComplexAConfig.createCommonComplexAParams();
		}
	} else {
		params = PageComplexAConfig.createCommonComplexAParams();
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
function updateShopComplexAModuleContent(id, title, func) {
	var params = {};
	if (MODULE_ADTYPE != null) {
		switch (MODULE_ADTYPE) {
			case 'poster' :
				params = PagePosterConfig.createCommonPosterParams();
				break;
			default :
				params = PageComplexAConfig.createCommonComplexAParams();
		}
	} else {
		params = PageComplexAConfig.createCommonComplexAParams();
	}
	PageUtils.updateModule(id, title, params, function(data) {
				if (func) {
					func(data);
				}
			});
}