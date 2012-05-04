/**
 * 分类模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopChongzhi", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'true'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopChongzhi(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopChongzhiModuleConfig(func) {
	if (func) {
		func();
	}
	return true;
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopChongzhiModuleConfig() {
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
function createShopChongzhiModuleContent(name, title, region, next, func) {
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
function updateShopChongzhiModuleContent(id, title, func) {

	PageUtils.updateModule(id, title, {
				isHd : $('#module-ishd').attr('checked') + ""
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}