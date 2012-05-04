/**
 * 显示组件
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopDetailShop", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopDetailShop(this.element);
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
function initShopDetailShopModuleConfig(func) {
	$('#module-content')
			.empty()
			.append('<div id="shop-detailshop-editor" style="width:400px;" align="center"><div class="help_info" align="left" style="position:relative;"><h3>根据当前商品自动显示所属店铺。</h3></div></div>');
	if (func && typeof(func) == 'function') {
		func();
	}
	return true;
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopDetailShopModuleConfig() {
	return true;
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
function createShopDetailShopModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + "")
			}, function(data) {
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
function updateShopDetailShopModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
				isHd : $('#module-ishd').attr('checked') + ""
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}