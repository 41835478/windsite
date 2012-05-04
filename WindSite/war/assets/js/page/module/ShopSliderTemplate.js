/**
 * 自更新轮播模块
 * 
 * @author fxy
 */
(function($) {
	$.widget("ui.pageShopSliderTemplate", $.ui.pageModule, {
				/**
				 * 参数
				 */
				options : {
					isHd : 'false'
					// 默认不显示标题栏
				},
				_initModule : function() {
					PageModuleUtils.initShopSlider(this.element);
				}
			});
})(jQuery);

/**
 * 初始化模块内容编辑页面
 */
function initShopSliderTemplateModuleConfig(func) {
	$('#module-content').load(
			'/assets/js/page/module/ShopSliderTemplateConfig.html?v='
					+ Math.random(), function() {
				var layout = $('#page-module-editor').pageModuleEditor(
						'option', 'layout');
				$('#module-content .slidertemplate-layout').hide();// 隐藏所有
				$('#module-content .slidertemplate-layout[layout=' + layout
						+ ']').show();// 仅显示适合的布局
				if (MODULE && MODULE.hasClass('J_TBox')) {// 如果存在，并且为编辑模块模式,还原属性
					var options = MODULE['page'
							+ PageModuleUtils
									.getModuleName(MODULE.attr('name'))]('option');
					if (options.cat) {
						$('#module-content input[name="slidertemplate-radio"][value="'
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
function validateShopSliderTemplateModuleConfig() {
	var checked = $('#module-content input[name="slidertemplate-radio"]:checked');
	if (checked.length == 0) {
		alert('您尚未选择指定的轮播模板');
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
function createShopSliderTemplateModuleContent(name, title, region, next, func) {
	PageUtils.addModule(name, title, region, next, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				cat : $('#module-content input[name="slidertemplate-radio"]:checked')
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
function updateShopSliderTemplateModuleContent(id, title, func) {
	PageUtils.updateModule(id, title, {
				isHd : ($('#module-ishd').attr('checked') + ""),
				cat : $('#module-content input[name="slidertemplate-radio"]:checked')
						.val(),
				layout : $('#page-module-editor').pageModuleEditor('option',
						'layout')
			}, function(data) {
				if (func) {
					func(data);
				}
			});
}