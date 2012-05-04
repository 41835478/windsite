/**
 * 淘宝母婴模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopChildLogo", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认不显示标题栏
				},
				_initModule : function() {
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopChildLogoModuleConfig(func) {
	$('#module-content').load(
			'/assets/js/page/module/ShopChildLogoConfig.html?v='
					+ Math.random(), function() {
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.cat) {
						$('#module-content input[name="childlogo-radio"][value="'
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
function validateShopChildLogoModuleConfig() {
	var checked = $('#module-content input[name="childlogo-radio"]:checked');
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
function createShopChildLogoModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				cat : $('#module-content input[name="childlogo-radio"]:checked')
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
function updateShopChildLogoModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				cat : $('#module-content input[name="childlogo-radio"]:checked')
						.val(),
				layout : $('#page-module-editor').pageModuleEditor('option',
						'layout')
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}