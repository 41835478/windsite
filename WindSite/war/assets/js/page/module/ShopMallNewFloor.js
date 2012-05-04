/**
 * 淘宝商城楼层模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopMallNewFloor", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopMallFloor(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopMallNewFloorModuleConfig(func) {
	$('#module-content').load(
			'/assets/js/page/module/ShopMallNewFloorConfig.html?v='
					+ Math.random(), function() {
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.cat) {
						$('#module-content input[name="mallfloor-radio"][value="'
								+ options.cat + '"]').attr('checked', true);
					}
				}
				if (func && typeof(func) == 'function') {
					func();
				}
			});
	return true;
}
/**
 * 校验模块配置
 * 
 * @return {Boolean}
 */
function validateShopMallNewFloorModuleConfig() {
	var checked = $('#module-content input[name="mallfloor-radio"]:checked');
	if (checked.length == 0) {
		alert('您尚未选择分类');
		return false;
	}
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
function createShopMallNewFloorModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				cat : $('#module-content input[name="mallfloor-radio"]:checked')
						.val(),
				layout : $('#page-module-editor').pageModuleEditor('option',
						'layout')
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
function updateShopMallNewFloorModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				cat : $('#module-content input[name="mallfloor-radio"]:checked')
						.val(),
				layout : $('#page-module-editor').pageModuleEditor('option',
						'layout')
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}